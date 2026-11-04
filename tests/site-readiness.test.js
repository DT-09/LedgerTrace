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
const coreProduct = pages[1][1];
const allowedPalette = new Set(['#F3F0E7','#E8E2D6','#D3CCBE','#B9B09F','#1D2925','#526057','#315C52','#203A34','#F8F6F0','#FBF9F4','#A77E48','#A66F52','#68736A']);
for (const [index, [name, html]] of pages.entries()) {
  assert.ok(html.includes('href="/assets/ledgertrace-theme.css?v=20261104-redesign1"'), name + ' must load the repaired shared contrast theme');
  assert.equal(html.split('<style').length - 1, html.split('</style>').length - 1, name + ' style tags must be balanced');
  assert.ok(html.includes('ledgertrace-theme.css'), name + ' must use the central visual system');
}
assert.ok(!home.includes('ont-size:12px}}'), 'homepage must not contain the previously leaked CSS tail');

const theme = fs.readFileSync('assets/ledgertrace-theme.css', 'utf8');

assert.ok(theme.includes('color-scheme:light'), 'shared theme must use the warm-paper light system');
assert.ok(theme.includes('--lt-bg:#F2F0E8') && theme.includes('--lt-green:#203D34') && theme.includes('--lt-panel:#E7E4D9'), 'paper and evergreen surfaces must be defined');
assert.ok(theme.includes('--lt-ivory:#F7F5EC') && theme.includes('--lt-paper:#FBFAF5') && theme.includes('--lt-brass:#B18A50'), 'ivory, paper and brass accents must be defined');
assert.ok(theme.includes('color:var(--lt-ink)!important') && theme.includes('color:var(--lt-body)!important'), 'paper surfaces must use dark, readable text');
assert.ok(theme.includes('background:#FBFAF5!important;border:1px solid #BDBBAF!important;color:var(--lt-ink)!important'), 'form controls must use dark text on light input surfaces');
assert.ok(theme.includes('background:rgba(32,61,52,.94)!important;color:var(--lt-ivory)!important') && theme.includes('background:#203D34!important;color:var(--lt-ivory)!important'), 'dark navigation and footer surfaces must use ivory text');
for (const [name, html] of pages) {
  assert.ok(!html.includes('#FDFBF7-space'), name + ' must not contain the corrupted white-space property');
  assert.ok(!/color-scheme\s*:\s*light/i.test(html), name + ' must not force a light color scheme');

}

const styleOpenCount = home.split('<style').length - 1;
const styleCloseCount = home.split('</style>').length - 1;
assert.equal(styleOpenCount, styleCloseCount, 'homepage style tags must be balanced');
assert.ok(!home.includes('</style>ont-size:12px'), 'homepage must not leak a CSS fragment into visible content');
assert.ok(!home.includes('id="ledgertrace-palette-final"'), 'obsolete green palette override must be removed');
assert.ok(home.includes('ledgertrace-theme.css') && coreProduct.includes('ledgertrace-theme.css'), 'homepage and product page must use the shared visual system');
for (const color of ['#F2F0E8','#E7E4D9','#203D34','#31594C','#F7F5EC','#FBFAF5','#B18A50','#A66F52','#58675F']) {
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
assert.ok(home.includes('Fees are negotiated privately based on queue size, data quality, selected checks and review effort'), 'pricing is negotiated rather than publicly fixed');
assert.ok(!/\$100/.test(home), 'public site must not expose a private minimum fee');
assert.ok(product.includes('href="#evidence-workspace"') && product.includes('Inspect example evidence'), 'product landing page must route buyers to the example evidence workspace');
assert.ok(product.includes('href="/#evaluation"') && product.includes('Discuss a paid Evidence Review'), 'product landing page must provide a clear paid-evaluation route');
assert.ok(product.includes('Synthetic values') || product.includes('SYNTHETIC DATA'), 'product examples must be labelled as synthetic');
assert.ok(product.includes('No automatic message is sent from this page.'), 'product page must not imply an inquiry was sent automatically');

console.log('Site readiness checks passed: unique IDs, valid local anchors, configured buyer inquiry route, transparent pricing, synthetic-data disclosure, and demo-to-evaluation paths.');
