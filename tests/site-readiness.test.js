const assert = require('node:assert/strict');
const fs = require('node:fs');

const pages = [
  ['index.html', fs.readFileSync('index.html', 'utf8')],
  ['invoice-reconciliation.html', fs.readFileSync('invoice-reconciliation.html', 'utf8')],
  ['invoice-reconciliation-checklist.html', fs.readFileSync('invoice-reconciliation-checklist.html', 'utf8')],
  ['duplicate-supplier-payment-investigation.html', fs.readFileSync('duplicate-supplier-payment-investigation.html', 'utf8')],
  ['missed-supplier-credit-detection.html', fs.readFileSync('missed-supplier-credit-detection.html', 'utf8')],
  ['purchase-order-price-variance.html', fs.readFileSync('purchase-order-price-variance.html', 'utf8')],
  ['supplier-invoice-overcharge-investigation.html', fs.readFileSync('supplier-invoice-overcharge-investigation.html', 'utf8')],
  ['supplier-statement-reconciliation.html', fs.readFileSync('supplier-statement-reconciliation.html', 'utf8')]
];

for (const [name, html] of pages) {
  const ids = [...html.matchAll(/\bid=["']([^"']+)["']/g)].map(match => match[1]);
  const duplicateIds = [...new Set(ids.filter((id, index) => ids.indexOf(id) !== index))];
  assert.deepEqual(duplicateIds, [], name + ' must not contain duplicate IDs');

  const anchors = [...html.matchAll(/\bhref=["']#([^"']+)["']/g)].map(match => match[1]);
  const missingAnchors = [...new Set(anchors.filter(anchor => !ids.includes(anchor)))];
  assert.deepEqual(missingAnchors, [], name + ' has broken same-page anchor links');
}

const home = pages[0][1];
const allowedPalette = new Set(['#1C120C','#2B1D15','#1E293B','#A89F91','#D1C7BD','#EAE3D2','#E07A5F','#3B82F6','#D97706','#FDFBF7']);
for (const [name, html] of pages) {
  assert.ok(html.includes('href="/assets/ledgertrace-theme.css?v=20261101-3"'), name + ' must load the shared palette');
  assert.equal(html.split('<style').length - 1, html.split('</style>').length - 1, name + ' style tags must be balanced');
  const colors = [...new Set([...html.matchAll(/#[0-9a-fA-F]{6}/g)].map(match => match[0].toUpperCase()))];
  assert.deepEqual(colors.filter(color => !allowedPalette.has(color)), [], name + ' contains colors outside the approved palette');
}
assert.ok(!home.includes('ont-size:12px}}'), 'homepage must not contain the previously leaked CSS tail');

const theme = fs.readFileSync('assets/ledgertrace-theme.css', 'utf8');

assert.ok(theme.includes('color-scheme:dark'), 'shared theme must force dark mode');
assert.ok(theme.includes('--espresso:#1C120C') && theme.includes('--roast:#2B1D15') && theme.includes('--slate:#1E293B'), 'dark palette surfaces must be defined');
assert.ok(theme.includes('--cream:#EAE3D2') && theme.includes('--paper:#FDFBF7'), 'ivory and paper text colors must be defined');
assert.ok(!theme.includes('#FFFFFF') && !theme.includes('#ffffff'), 'pure white must not be used');
for (const [name, html] of pages) {
  assert.ok(!html.includes('#FDFBF7-space'), name + ' must not contain the corrupted white-space property');
  assert.ok(!/color-scheme\\s*:\\s*light/i.test(html), name + ' must not force a light color scheme');
  const rgbColors = [...html.matchAll(/rgba?\\(([^)]+)\\)/gi)].map(match => match[1]);
  for (const value of rgbColors) {
    const channels = value.split(',').slice(0,3).map(channel => Math.round(Number(channel.trim())));
    if (channels.length === 3 && channels.every(Number.isFinite)) {
      assert.ok([...allowedPalette].some(hex => {
        const rgb = [1,3,5].map(index => parseInt(hex.slice(index,index+2),16));
        return rgb.every((channel,index) => channel === channels[index]);
      }), name + ' contains an RGB color outside the approved palette: ' + value);
    }
  }
}

const styleOpenCount = home.split('<style').length - 1;
const styleCloseCount = home.split('</style>').length - 1;
assert.equal(styleOpenCount, styleCloseCount, 'homepage style tags must be balanced');
assert.ok(!home.includes('</style>ont-size:12px'), 'homepage must not leak a CSS fragment into visible content');
assert.ok(!home.includes('id="ledgertrace-palette-final"'), 'obsolete green palette override must be removed');
assert.ok(home.includes('href="/assets/ledgertrace-theme.css?v=20261101-3"'), 'authoritative palette stylesheet must load after inline legacy styles');
for (const color of ['#1C120C','#2B1D15','#1E293B','#A89F91','#D1C7BD','#EAE3D2','#E07A5F','#3B82F6','#D97706','#FDFBF7']) {
  assert.ok(theme.toLowerCase().includes(color.toLowerCase()), 'authoritative theme is missing ' + color);
}

const product = pages[1][1];
assert.ok(home.includes('id="product"'), 'interactive reconciliation workbench anchor exists');
assert.ok(home.includes('id="evaluation"'), 'paid evaluation anchor exists');
assert.ok(home.includes('id="contactForm"'), 'buyer inquiry workflow exists');
assert.ok(home.includes("const CONTACT_EMAIL='dhairytopia@gmail.com'"), 'inquiry email destination is configured');
assert.ok(home.includes('function handleContactSubmit'), 'scope inquiry handler exists');
assert.ok(home.includes("fetch('/api/inquiries'"), 'inquiry form must submit to the same-origin capture endpoint');
assert.ok(home.includes('id="contactWebsite"'), 'inquiry form must include the spam honeypot');
assert.ok(home.includes('The secure inbox is unavailable, so no inquiry was stored.'), 'manual fallback must not claim an inquiry was stored');
assert.ok(home.includes('Fees are negotiated privately based on record volume, data quality, selected checks and review effort'), 'pricing is negotiated rather than publicly fixed');
assert.ok(!/\$100/.test(home), 'public site must not expose a private minimum fee');
assert.ok(product.includes('href="#evidence-workspace"') && product.includes('Inspect example evidence'), 'product landing page must route buyers to the example evidence workspace');
assert.ok(product.includes('href="/#evaluation"') && product.includes('Discuss a paid Evidence Review'), 'product landing page must provide a clear paid-evaluation route');
assert.ok(product.includes('Synthetic values') || product.includes('SYNTHETIC DATA'), 'product examples must be labelled as synthetic');
assert.ok(product.includes('No automatic message is sent from this page.'), 'product page must not imply an inquiry was sent automatically');

console.log('Site readiness checks passed: unique IDs, valid local anchors, configured buyer inquiry route, transparent pricing, synthetic-data disclosure, and demo-to-evaluation paths.');
