const fs = require('node:fs');
const vm = require('node:vm');
const html = fs.readFileSync('index.html', 'utf8');
const match = html.match(/<script id="ledgertrace-recovery-extension">([\s\S]*?)<\/script>/);
if (!match) throw new Error('Recovery extension script block is missing');
new vm.Script(match[1], { filename: 'ledgertrace-recovery-extension.js' });
const requiredExistingIds = [
  'heroSampleBtn', 'sampleBtn', 'resetBtn', 'invoiceFile', 'poFile',
  'receiptFile', 'runBtn', 'clearBtn', 'results', 'evidencePdfBtn',
  'exportBtn', 'reportExport', 'inspector', 'reviewStatus', 'saveReview',
  'contactForm', 'generateBrief', 'contactFromBuilder'
];
for (const id of requiredExistingIds) {
  if (!html.includes('id="' + id + '"')) throw new Error('Existing engineered feature missing: ' + id);
}
const recoveryIds = [
  'recovery-investigation', 'recInvoices', 'recPos', 'recReceipts',
  'recPayments', 'recCredits', 'recAmendments', 'recRunBtn',
  'recCaseFindings', 'recSaveCase', 'recExportCase', 'recExportAll'
];
for (const id of recoveryIds) {
  if (!html.includes('id="' + id + '"')) throw new Error('Recovery workflow feature missing: ' + id);
}
if (!html.includes('<script src="./recovery-core.js"></script>')) {
  throw new Error('Recovery analysis engine is not loaded by index.html');
}
console.log('HTML checks passed: recovery script parses; original workbench, evidence inspector, report, review workflow, contact builder and recovery workflow are present.');
