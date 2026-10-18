#!/usr/bin/env node
const fs = require('node:fs');
const vm = require('node:vm');
const assert = require('node:assert/strict');

const code = fs.readFileSync(require('node:path').join(__dirname, '..', 'providers', 'anikoto.js'), 'utf8');
const context = { fetch: async () => ({ status: 200, body: '' }), console };
vm.createContext(context);
vm.runInContext(code, context, { timeout: 5000 });

const info = context.getInfo();
assert.equal(info.name, 'AniKoto (Svoer)');
assert.equal(info.type, 'anime');
assert.equal(info.version, '0.3.2');
for (const fn of ['search', 'popular', 'getHome', 'getDetail', 'getEpisodes', 'getVideoSources', 'getSettings']) {
  assert.equal(typeof context[fn], 'function', fn + ' must be exposed');
}
assert.ok(Array.isArray(context.getSettings()));
console.log('PASS: AniKoto provider contract smoke test.');
