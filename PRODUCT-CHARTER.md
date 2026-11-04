# Caseweft — Product Charter

**Category:** Supplier payment evidence review  
**Primary user:** Accounts-payable manager or financial controller at an industrial distributor  
**Core promise:** One reviewable case. Every source in view.

## The job

Caseweft helps a finance reviewer investigate whether supplier invoice lines are supported by the purchasing and receiving records available to the business. It connects source records, surfaces rule-triggered differences, explains the comparison, and preserves a human review trail.

It is an evidence workspace—not an ERP, payment system, autonomous auditor, or fraud verdict engine.

## Primary workflow

1. **Load source records** — invoice lines, approved purchase-order lines, and goods-receipt lines as CSV.
2. **Validate inputs** — check required identifiers, quantities, supplier identity, currency consistency, and supported fields before analysis.
3. **Connect records** — compare invoice lines with PO and receipt records using the supported PO + item relationship.
4. **Review exceptions** — inspect the rule, compared values, source CSV row references, missing evidence, and unresolved conflicts.
5. **Record the decision** — a reviewer records status, corrective action, notes, and any claimed outcome.
6. **Export the casework** — produce a review worklist and a print-ready evidence report. The extended investigation workflow also exports case JSON and an investigation package.

## Supported evidence and checks

### Primary three-way match

- Invoice lines against PO lines and goods receipts.
- Possible duplicate invoice-line candidates.
- Missing PO references and missing PO/item matches.
- Supplier identity mismatches or missing identity.
- Unit-price differences where supplier and currency evidence are compatible.
- Invoice quantity above ordered quantity or recorded received quantity.
- Invoice line amount inconsistent with quantity × unit price.
- PO lines without invoice matches and receipts without compatible PO matches.

### Extended payment investigation

The extended workflow accepts supported payment, supplier-credit, and PO-amendment CSVs. It surfaces candidate invoice excess and payment excess separately, links source rows, and records reviewer-entered case outcomes. These are investigation candidates, not confirmed loss or recovered money.

## What the product delivers

- A prioritised exception worklist.
- A case-level explanation of each triggered rule.
- Compared values and calculation notes.
- Source CSV row references for the invoice, PO, receipt, payment, credit, and amendment records used.
- Explicit data-quality conflicts and unresolved evidence gaps.
- Reviewer-entered status, action, notes, and outcome references.
- CSV, JSON, and print-ready report exports.

## Data and operating boundary

- Selected CSV files are parsed and analysed in the browser tab.
- The accounting file contents are not uploaded to the Caseweft inquiry endpoint.
- Review notes and case outcomes remain in browser memory until the user exports them.
- The inquiry workflow stores contact and scope metadata only when the Cloudflare D1 binding is configured; it is not a payment checkout.
- The product is currently a bounded browser-based workbench and paid evaluation service, not a production multi-tenant SaaS.

## Explicit non-claims

Caseweft does not currently provide:

- Supplier-statement-to-AP-ledger reconciliation.
- ERP or accounting-platform integrations.
- Automatic payment holds, approvals, postings, or supplier contact.
- A fraud determination or autonomous accounting decision.
- Verified loss, recovered cash, or guaranteed savings.
- Currency conversion, tax treatment, complete freight/retainage logic, robust supplier-master resolution, or all split/merged-line and partial-payment scenarios.
- Independent verification of reviewer-entered outcomes.

A line with no triggered rule means only that the current configured checks did not flag it. It is not proof that the invoice is correct.

## Commercial delivery

The initial paid offer is a bounded review of one supplier or one defined parked-invoice queue, subject to a file-fit check. Scope, exclusions, data handling, acceptance criteria, delivery date, fee, and payment terms are agreed in writing before work begins. The internal USD 500 target is a hypothesis, not a validated public price.

## Brand rationale

**Caseweft** combines *case* with *weft*: the cross-thread that holds a woven fabric together. The product weaves separate source records into one inspectable exception case. The mark shows several source threads joining a single case file.

The name is a working brand pending proper trademark, company-name, and domain clearance. Search-engine screening is not legal clearance.
