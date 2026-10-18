# Zangestu_svoer_

Extra provider sources for [Zangetsu](https://github.com/Spyou/Zangetsu).

## Available source

- **AniKoto (Svoer)** — anime catalogue, episode list, sub/dub selection, and multi-server stream resolution. Provider version: `0.3.9`.

Availability depends on the external website, its servers, and Zangetsu's current runtime. This provider has upstream offline contract tests, but this repository's commit has **not** been live-tested on your phone or TV. A provider cannot guarantee that every title or stream will work.

## Install

1. Open **Settings → Sources → Add repo** in Zangetsu.
2. Add this manifest URL:

   `https://raw.githubusercontent.com/Navneet-apple/Zangestu_svoer_/main/index.json`

3. Refresh the repository and install **AniKoto**.

## Attribution and licensing

The AniKoto adapter is derived from the Apache-2.0-licensed `Serenity-MIST/zangetsu-sources` provider bundle, which credits the Yuzono anime-extensions project. The local source ID was adapted for this repository. See [THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md) and [LICENSE-APACHE-2.0](LICENSE-APACHE-2.0).

The repository's own scaffolding remains under the MIT License in [LICENSE](LICENSE). The provider's code license does **not** grant rights to any website, logo, metadata, or media. Use the source only where access and viewing are lawful in your location, and respect the website's terms.

## Layout

- `index.json` — source manifest
- `providers/anikoto.js` — installable AniKoto provider
- `tests/validate_manifest.py` — manifest/path checks
- `tests/anikoto-smoke.js` — provider contract smoke test
- `THIRD_PARTY_NOTICES.md` and `LICENSE-APACHE-2.0` — upstream attribution and license

## Tests

Requires Python 3.9+ and Node.js:

```sh
python tests/validate_manifest.py
node tests/anikoto-smoke.js
```
