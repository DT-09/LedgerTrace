# Caseweft — QuickCheck and Evidence Review

## Positioning

Caseweft is a supplier-payment investigation workbench for distributors and finance teams. A buyer uses it to compare invoice, PO, receipt, payment, credit and amendment records where supported, then receives a source-linked worklist of candidate overcharges, duplicate/excess payments, quantity gaps and missing credits for human verification. The commercial value is a defensible investigation and review handoff—not an AI dashboard, an unverified anomaly score, or a promise of recovered money.

## Best-fit buyer and initial wedge

**Primary route: supplier-payment recovery and AP review specialists** that already investigate overpayments, duplicate disbursements, pricing errors, supplier credits or statement discrepancies. The wedge is a self-service evidence workbench they can test on synthetic data, followed by a bounded second-pass investigation when their team has a specific backlog or difficult case. They may pay for overflow capacity or an auditable evidence package, but this must be validated with an actual workflow.

**Secondary route: distributor finance teams** with a named supplier balance, disputed invoice, suspected duplicate payment, missing credit or payment deadline. Do not target generic AP teams with no current trigger.

A qualified buyer must:
- name the supplier/workflow and the decision the investigation should support;
- identify a responsible finance reviewer and a person who can approve the engagement;
- have invoice, PO and receipt records, plus payment/credit records only where relevant;
- confirm permission to share the selected records and agree a suitable transfer method;
- accept a bounded scope, explicit exclusions, written acceptance criteria and a fee before work begins.

### Why a provider might pay

The proposed value is **additional investigation capacity without asking the provider to replace its accounting platform or change its client-facing process**. Caseweft supplies a structured second-pass comparison and source-linked worklist; the provider keeps the client relationship, validates the findings and decides what action to take. This is worth paying for only if the review saves meaningful staff time, surfaces evidence the provider was not already finding, or helps clear a commercially important backlog. Validate that with a real workflow before pitching it as proven value.

## Step 1 — Free QuickCheck

**Purpose:** establish whether one concrete question is supported by the available records and whether a deeper review is worth scoping.

- One supplier.
- Up to 25 rows in an approved/anonymized or synthetic sample.
- One supported discrepancy question, such as a possible duplicate invoice line/reference or price/quantity mismatch.
- Short fit summary: required fields present/missing, one limited signal if supportable, important limitations, and a recommendation on whether a paid scope is justified.
- No exhaustive audit, full exception worklist, supplier outreach, accounting action, or recovery guarantee.

The QuickCheck is not a claim that a discrepancy is a confirmed loss. If the sample cannot support a defensible conclusion, say so. Do not expand the free scope informally. Do not accept confidential records through the public inquiry form or ordinary email; agree a suitable transfer method first.

## Step 2 — Paid Evidence Review

**Purpose:** complete a bounded, evidence-linked investigation of one supplier account, discrepancy, or defined reconciliation backlog.

The exact fee is agreed privately before work begins. An internal first-sale target is at least USD 100 for a meaningful scope; reduce the scope or decline if the review cannot be delivered responsibly at that level. Do not advertise a fixed fee or begin unpaid custom work.

### Scope agreed in writing

- Supplier/account or workflow being investigated.
- Source files, fields, row limit, currency assumptions, and checks.
- Exclusions and unsupported cases.
- Data-transfer and handling method.
- Deliverables, delivery date, acceptance criteria, fee, and payment arrangement.
- Named buyer/reviewer and intended business decision.

### Deliverables

1. Prioritized exception worklist in CSV, with source-row references and comparison values where supported.
2. Concise evidence report describing each rule triggered and why the item needs review.
3. Clear separation of observed facts, candidate discrepancies, confirmed outcomes entered by the buyer, and unresolved cases.
4. Data-quality limitations, false positives/misses where a human-reviewed reference set exists, and manual verification still required.
5. Review handoff and, if justified, a separately scoped repeat-review proposal.

### Acceptance criteria

Acceptance criteria are specific to the agreed inputs and checks. At minimum:
- agreed input files are processed or rejected with an explicit reason;
- each reported finding has the rule and source-row references where available;
- unsupported calculations and unresolved cases are disclosed;
- results are compared with a human-reviewed reference set when one is agreed and available;
- the buyer can identify what needs verification and what decision remains theirs.

## Commercial sequence

1. Buyer describes one current problem and the decision the review should support.
2. Caseweft confirms whether the QuickCheck or a paid scope fits.
3. For QuickCheck, agree a limited sample and safe transfer method.
4. If further investigation is justified, agree written scope, fee, timeline, data handling, and acceptance criteria.
5. Confirm the payment arrangement and approved data transfer before paid work starts.
6. Deliver the evidence package and review it against the agreed criteria.
7. Discuss repeat reviews only if the first result demonstrates useful, repeatable value.

An inquiry, sample finding, demo, or verbal expression of interest is not a sale. Count revenue only when payment is actually received.

## Data handling and product boundary

The reconciliation and recovery workbenches are browser-side tools: selected CSV files are processed in the user's browser and the app code does not upload those CSV contents to a Caseweft server. Review notes remain in page memory unless exported. The inquiry form is separate: it can store contact and scope metadata through a same-origin Pages Function backed by Cloudflare D1 after the owner configures the DB binding. Until that binding is configured and tested, the form falls back to manual WhatsApp/email handoff and does not claim server-side receipt. The site still makes normal network requests such as loading web fonts; do not claim the entire session is offline or that the product is certified for sensitive data.

For an initial QuickCheck, use synthetic or client-approved anonymized records. Do not promise production-grade security, ERP integration, automatic payment blocking, accounting entries, supplier contact, verified bank receipts, or complete treatment of tax, freight, currency conversion, supplier master-data resolution, partial payments, split/merged lines, or every credit-note scenario.

## Claims and boundaries

- A flagged amount is not verified loss or recoverable money.
- A payment-excess candidate requires human verification of invoices, payments, credits, currency, and allocation.
- A no-finding result means only that configured rules did not trigger.
- Do not promise guaranteed savings, guaranteed recovery, or universal accuracy.
- If the records cannot support a defensible result, narrow the scope or decline it.

## Success criterion

The buyer can decide whether the evidence is useful, what needs manual verification, and whether the work merits a paid full review or a repeat engagement. Commercial validation requires an actual paid engagement; website copy, traffic, and free QuickChecks alone do not validate demand.
