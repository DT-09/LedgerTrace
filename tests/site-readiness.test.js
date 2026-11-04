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
for (const [index, [name, html]] of pages.entries()) {
  assert.ok(html.includes('href="/assets/ledgertrace-theme.css?v=20261104-workspace2"'), name + ' must load the unified evidence-workspace theme');
  assert.ok(html.lastIndexOf('ledgertrace-theme.css?v=20261104-workspace2') > html.lastIndexOf('</style>'), name + ' must load the shared theme after all page-level styles');
  assert.equal(html.split('<style').length - 1, html.split('</style>').length - 1, name + ' style tags must be balanced');
  assert.ok(html.includes('ledgertrace-theme.css'), name + ' must use the central visual system');
}
assert.ok(!home.includes('ont-size:12px}}'), 'homepage must not contain the previously leaked CSS tail');

const theme = fs.readFileSync('assets/ledgertrace-theme.css', 'utf8');

assert.ok(theme.includes('color-scheme:light'), 'shared theme must use the light evidence-workspace system');
assert.ok(theme.includes('--lt-bg:#F3F6F8') && theme.includes('--lt-navy:#142C43') && theme.includes('--lt-blue:#2E6F95'), 'cool neutral and navy palette must be defined');
assert.ok(theme.includes('--lt-ink:#142536') && theme.includes('--lt-body:#425466') && theme.includes('--lt-paper:#FFFFFF'), 'workspace text and paper surfaces must be defined');
assert.ok(theme.includes('--lt-amber:#B97825') && theme.includes('--lt-red:#B84A4A') && theme.includes('--lt-green:#2F7865'), 'semantic exception and success colours must be defined');
assert.ok(theme.includes('.case-preview-table-wrap') && theme.includes('.case-preview td'), 'concrete evidence preview must have dedicated presentation rules');
assert.ok(theme.includes('.commercial-entry{background:var(--lt-navy)') && theme.includes('.commercial-entry-output{') , 'commercial offer must distinguish dark positioning panel from light deliverable card');
assert.ok(!theme.includes('html body :is(.scene,.ledger-illustration,.ep-hero-visual'), 'legacy blanket illustration text override must be removed');
for (const [name, html] of pages) {
  assert.ok(!html.includes('#FDFBF7-space'), name + ' must not contain the corrupted white-space property');

}

const styleOpenCount = home.split('<style').length - 1;
const styleCloseCount = home.split('</style>').length - 1;
assert.equal(styleOpenCount, styleCloseCount, 'homepage style tags must be balanced');
assert.ok(!home.includes('</style>ont-size:12px'), 'homepage must not leak a CSS fragment into visible content');
assert.ok(!home.includes('id="ledgertrace-palette-final"'), 'obsolete green palette override must be removed');
assert.ok(home.includes('ledgertrace-theme.css') && coreProduct.includes('ledgertrace-theme.css'), 'homepage and product page must use the shared visual system');
assert.ok(home.includes('Caseweft — Supplier Payment Evidence Review'), 'homepage metadata must use the new product identity');
assert.ok(home.includes('Turn disconnected records into reviewable cases.'), 'homepage must state the product job clearly');
assert.ok(home.includes('/assets/caseweft-monogram.svg'), 'homepage must use the new product mark');
assert.ok(!home.includes('LEDGERTRACE') && !home.includes('LedgerTrace home'), 'homepage must not expose the retired brand');
for (const color of ['#F3F6F8','#EAF0F4','#142536','#425466','#142C43','#2E6F95','#3D9BA8','#2F7865','#B97825','#B84A4A','#FFFFFF']) {
  assert.ok(theme.toLowerCase().includes(color.toLowerCase()), 'authoritative theme is missing ' + color);
}

const product = pages[1][1];
assert.ok(home.includes('id="example-case"'), 'homepage must include the concrete synthetic evidence case preview');
assert.ok(home.includes('INV-1003 · PART-C') && home.includes('20 units at $9.00') && home.includes('$10.00'), 'synthetic example must show a reproducible price variance');
assert.ok(home.includes('Candidate discrepancies are not confirmed losses or recovered amounts.'), 'sample case preview must preserve the candidate-finding boundary');
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
