#!/usr/bin/env python3
"""Lightweight structural checks for the Zangetsu provider manifest."""
import json
import pathlib
import re
import sys

ROOT = pathlib.Path(__file__).resolve().parents[1]
manifest_path = ROOT / "index.json"

def fail(message):
    print(f"FAIL: {message}")
    sys.exit(1)

try:
    data = json.loads(manifest_path.read_text(encoding="utf-8"))
except Exception as exc:
    fail(f"index.json is not valid JSON: {exc}")

if not isinstance(data, dict):
    fail("manifest root must be an object")
if not isinstance(data.get("name"), str) or not data["name"].strip():
    fail("manifest must have a non-empty name")
if not isinstance(data.get("description"), str):
    fail("manifest must have a description")
sources = data.get("sources")
if not isinstance(sources, list):
    fail("'sources' must be a list")

seen = set()
required = ("id", "name", "version", "type", "lang", "file")
for i, source in enumerate(sources):
    if not isinstance(source, dict):
        fail(f"sources[{i}] must be an object")
    for key in required:
        if not isinstance(source.get(key), str) or not source[key].strip():
            fail(f"sources[{i}] is missing a non-empty string '{key}'")
    sid = source["id"]
    if not re.fullmatch(r"[a-z0-9][a-z0-9_-]*", sid):
        fail(f"sources[{i}].id must be lowercase and URL-safe: {sid!r}")
    if sid in seen:
        fail(f"duplicate source id: {sid}")
    seen.add(sid)
    if source["type"] not in ("anime", "movie"):
        fail(f"sources[{i}].type must be 'anime' or 'movie'")
    rel = pathlib.PurePosixPath(source["file"])
    if rel.is_absolute() or ".." in rel.parts:
        fail(f"sources[{i}].file must be a safe relative path")
    if not (ROOT / pathlib.Path(*rel.parts)).is_file():
        fail(f"source file does not exist: {source['file']}")
    if "nsfw" in source and not isinstance(source["nsfw"], bool):
        fail(f"sources[{i}].nsfw must be boolean")
print(f"PASS: manifest valid; {len(sources)} source(s) listed.")
