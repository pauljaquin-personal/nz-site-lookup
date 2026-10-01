const { test } = require('node:test');
const assert = require('node:assert/strict');
const { readFileSync } = require('node:fs');
const { join } = require('node:path');
const vm = require('node:vm');

const html = readFileSync(join(__dirname, '../dist/index.html'), 'utf8');
function section(start, end) {
  const from = html.indexOf(start);
  const to = html.indexOf(end, from);
  assert.ok(from >= 0 && to > from, `Missing source section: ${start}`);
  return html.slice(from, to);
}
function harness({ national = { appellation: 'Lot 1 DP 123', source: 'LINZ' }, linzFails = false, localFails = false } = {}) {
  const calls = [];
  const context = vm.createContext({
    getLinzParcel: async () => { if (linzFails) throw new Error('LINZ offline'); return national; },
    queryParcelLayer: async (url) => { calls.push(url); if (localFails) throw new Error('Council offline'); return [{ appellation: 'Lot 1 DP 123' }]; },
    preferParcel: (rows, source) => rows.length ? { appellation: rows[0].appellation, source, match: 'Parcel polygon contains selected point' } : null,
  });
  vm.runInContext([
    section('    const PARCEL_CROSS_CHECKS=', '    function parcelParts'),
    section('    function normaliseAuthority(', '    function h1ZoneForAuthority'),
    section('    async function getCouncilParcelCheck(', '    async function getBranzSymbol'),
  ].join('\n'), context);
  return { calls, getParcel: (authority) => context.getParcel(-45.249, 169.375, authority) };
}

test('Alexandra inside old QLDC rectangle does not query QLDC', async () => {
  const h = harness();
  const result = await h.getParcel(Promise.resolve({ authority: 'Central Otago District' }));
  assert.deepEqual(h.calls, []);
  assert.equal(result.council, 'Not currently connected for Central Otago District Council');
  assert.equal(result.source, 'LINZ');
});
for (const authority of ['Queenstown Lakes District', 'Christchurch City', 'Wellington City']) {
  test(`matching parcel API selected for ${authority}`, async () => {
    const h = harness();
    const result = await h.getParcel(Promise.resolve({ authority }));
    assert.equal(h.calls.length, 1);
    assert.ok(result.council.startsWith(`${authority} Council:`));
    assert.ok(result.council.endsWith('(agrees with LINZ)'));
  });
}
test('unmatched boundary retains LINZ without choosing a council', async () => {
  const h = harness();
  const result = await h.getParcel(Promise.resolve(null));
  assert.deepEqual(h.calls, []);
  assert.equal(result.source, 'LINZ');
  assert.equal(result.council, 'Not checked — no territorial authority boundary match');
});
test('boundary outage retains LINZ without choosing a council', async () => {
  const h = harness();
  const result = await h.getParcel(Promise.reject(new Error('Boundary offline')));
  assert.deepEqual(h.calls, []);
  assert.equal(result.source, 'LINZ');
  assert.equal(result.council, 'Not checked — territorial authority unavailable');
});
test('council outage retains LINZ', async () => {
  const h = harness({ localFails: true });
  const result = await h.getParcel(Promise.resolve({ authority: 'Queenstown Lakes District' }));
  assert.equal(result.source, 'LINZ');
  assert.equal(result.council, 'Queenstown Lakes District Council: unavailable');
});
test('council fallback never claims agreement when LINZ fails', async () => {
  const h = harness({ linzFails: true });
  const result = await h.getParcel(Promise.resolve({ authority: 'Queenstown Lakes District' }));
  assert.equal(result.source, 'Queenstown Lakes District Council');
  assert.ok(result.council.endsWith('(LINZ comparison unavailable)'));
});
test('no parcel still reports the confirmed council check status', async () => {
  const h = harness({ national: null });
  const result = await h.getParcel(Promise.resolve({ authority: 'Central Otago District' }));
  assert.equal(result.appellation, null);
  assert.equal(result.council, 'Not currently connected for Central Otago District Council');
});
