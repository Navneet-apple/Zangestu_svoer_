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
assert.equal(info.version, '0.3.6');
for (const fn of ['search', 'popular', 'getHome', 'getDetail', 'getEpisodes', 'getVideoSources', 'getSettings']) {
  assert.equal(typeof context[fn], 'function', fn + ' must be exposed');
}
assert.ok(Array.isArray(context.getSettings()));
async function testAllMirrorsAreAttempted() {
  const attempts = [];
  context._ajax = async (path) => {
    const id = decodeURIComponent(path.split('get=')[1] || '');
    return { result: { url: ({
      hd: 'https://megaplay.example/embed/1',
      vidstream: 'https://vidstream.example/embed/2',
      broken: 'https://dead.example/embed/4',
      alias: 'https://rotating-mirror.example/embed/3'
    })[id] } };
  };
  context._extractPlayer = async (url, category, name) => {
    attempts.push(name);
    if (name === 'broken') throw new Error('simulated dead mirror');
    return [{ url: url + '/master.m3u8', kind: category }];
  };

  const sources = await context._tryServersAll([
    { linkId: 'hd', name: 'HD-1' },
    { linkId: 'vidstream', name: 'Vidstream-1' },
    { linkId: 'broken', name: 'broken' },
    { linkId: 'alias', name: 'Alias-1' }
  ], 0, 'sub', []);

  assert.deepEqual(attempts, ['HD-1', 'Vidstream-1', 'broken', 'Alias-1']);
  assert.equal(sources.length, 3, 'all valid mirror hosts should survive; a failed mirror must not stop later mirrors');
  assert.ok(sources.some((s) => s.url.includes('vidstream.example')));
  assert.ok(sources.some((s) => s.url.includes('rotating-mirror.example')));
}

testAllMirrorsAreAttempted().then(() => {
  console.log('PASS: provider contract + mirror resolver regression simulation.');
}).catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
