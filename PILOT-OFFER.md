# LedgerTrace — paid evaluation brief

## Buyer
Accounts-payable managers, finance controllers, or AP service partners at distributors that reconcile supplier invoices against purchase orders and goods receipts from CSV exports.

## Buying problem
A team spends recurring staff time checking supplier documents and may miss duplicate invoices, price differences, quantity mismatches, receipt gaps, or missing purchase-order links. LedgerTrace is intended to help prioritize exceptions with source-linked evidence. The evaluation does not assume a discrepancy is a confirmed loss.

## Scope
One agreed workflow, one agreed batch of approved CSV exports, a defined set of checks, and a human-reviewed reference set of expected outcomes. Before work begins, both sides agree the source fields, row limits, exclusions, acceptance criteria, timeline, fee, payment method, and data handling in writing.

## Deliverables
1. Source-linked exception worklist (CSV).
2. Concise findings report with rules triggered and source rows where available.
3. Comparison against the buyer's human-reviewed reference set, including observed true positives, false positives, and missed cases.
4. Limitations and unresolved cases, clearly labeled.
5. 30-minute review handoff.

## Acceptance criteria
Acceptance criteria are specific to the agreed data and checks. At minimum:
- All agreed input files are processed or rejected with an explicit reason.
- Every reported finding includes the rule and source-row references where available.
- Results are compared with the agreed human-reviewed reference set.
- The report records observed false positives, misses, unsupported cases, and calculation limits.
- Both sides know which findings require manual verification.

## Commercial sequence
1. Buyer describes the workflow and intended decision.
2. LedgerTrace checks data suitability and proposes a bounded scope.
3. Both sides approve the written scope, fee, timeline, data handling, and acceptance criteria.
4. An invoice or payment request is issued through an agreed payment method.
5. Work starts after the payment arrangement and approved data transfer are confirmed.
6. Findings are delivered and reviewed against the acceptance criteria.

Fees are negotiated privately based on data volume, complexity, and review effort. No fixed fee is advertised. Do not begin unpaid custom work or treat an inquiry as a confirmed order.

## Data handling
The current website is a browser-side tool; selected CSV files are processed in the user's browser and are not uploaded to a LedgerTrace server by the app. Review notes remain in page memory unless exported. This does not mean the site makes no network requests. For an initial evaluation, use synthetic or client-approved anonymized records unless a separate, explicit data-handling arrangement has been agreed.

## Boundaries
- A flagged amount is not verified loss or recoverable money.
- Payment excess is a candidate until a human verifies the underlying invoice, payment, credits, currency, and allocation.
- A no-finding result means only that the configured rules did not trigger.
- The tool does not automatically block payments, post accounting entries, contact suppliers, or verify bank receipts.
- It does not currently provide production ERP integrations, currency conversion, complete tax/freight treatment, robust supplier master-data resolution, all partial-payment scenarios, or every split/merged-line case.
- Do not claim guaranteed savings, guaranteed recovery, or universal accuracy.

## Success criterion
The buyer can judge whether the evidence is useful, how the checks performed against known outcomes, what manual review remains, and whether the workflow merits a repeat engagement. If the data cannot support a defensible evaluation, narrow or decline the scope rather than overstate the result.
