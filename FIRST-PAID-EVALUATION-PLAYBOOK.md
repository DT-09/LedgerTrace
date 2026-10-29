# LedgerTrace — first paid evaluation operating plan

This is the internal operating plan for converting LedgerTrace from a working reconciliation workbench into a paid service. It is not website copy.

## The commercial objective

Sell one bounded, paid invoice-reconciliation evaluation to a distributor AP team or to a partner that already serves distributor finance teams. Do not sell a vague “AI platform” or promise savings before validating the buyer's data.

**First transaction:** a fixed-scope review of one approved batch of invoice, purchase-order and goods-receipt exports. The fee is negotiated privately, with an internal target floor of USD 100 for a meaningful evaluation. If the work would take too long at that level, reduce the scope or decline; do not silently expand unpaid work.

## Best first buyer

Prioritize teams that:
- process supplier invoices against purchase orders and goods receipts;
- currently export data to CSV/XLSX or work through spreadsheets;
- can name a recurring review task, owner and monthly volume;
- can provide synthetic, anonymized or explicitly approved records;
- have a finance/AP lead who can judge the findings and approve a small paid evaluation.

Avoid teams that require production ERP integration, automated payment blocking, guaranteed recovery, full tax treatment, or enterprise security certification before a first evaluation. Those requirements exceed the current product boundary.

## Offer and deliverables

The buyer supplies one agreed batch and a human-reviewed reference set, where available. LedgerTrace returns:
1. A source-linked exception worklist in CSV.
2. A concise findings report with rule IDs, compared values and source-row references.
3. A comparison against the agreed reference set, including observed false positives and missed cases.
4. A limitations and unresolved-cases section.
5. A 30-minute review handoff.

Before work starts, both parties approve in writing:
- files, fields, row limits and checks;
- exclusions and data-handling method;
- acceptance criteria and delivery date;
- fee and payment method;
- who can approve the work and who receives the deliverables.

Issue an invoice or payment request through an agreed, lawful payment method. Start only after the scope and payment arrangement are confirmed. Never accept sensitive financial records through the public inquiry form.

## How to get the first qualified conversation

### Priority 1 — distribution partners

Approach people who already implement accounting systems, support distributor finance teams, or provide outsourced AP/bookkeeping services. The ask is specific: let LedgerTrace run a bounded, evidence-first evaluation on an approved sample or introduce one AP team with this recurring workflow.

Partner value:
- an additional diagnostic service they can offer their clients;
- evidence-backed exceptions rather than a black-box score;
- a bounded scope with human review and explicit limitations;
- possible referral or delivery terms only after the scope and responsibilities are agreed.

Do not claim an existing partnership, customer, result or revenue share until it is real.

### Priority 2 — buyer-led inbound

Keep the working sample available without a login. Direct every qualified page to the paid evaluation scope. Publish useful, accurate material around invoice-to-PO matching, goods-receipt quantity checks, duplicate invoice review and evidence trails. Search traffic is a long-term channel, not a same-day acquisition guarantee.

### Priority 3 — warm introductions

Ask trusted contacts for one introduction to an AP manager, finance controller, distributor operations lead, or AP service provider who owns this exact workflow. Avoid broad requests to “promote the startup.” Ask for a conversation about a specific process and its current review burden.

## Partner introduction note

Use only when there is a genuine relationship or a warm introduction.

> LedgerTrace is a browser-based invoice-reconciliation workbench for distributor AP teams. It compares invoice lines with purchase orders and goods receipts, then gives reviewers the triggered rule, compared values and source-row references.
>
> We are looking for one bounded paid evaluation of a real workflow—not a production rollout. Scope, fee, acceptance criteria and data handling are agreed in writing before work begins. The initial evaluation can use synthetic or approved anonymized records.
>
> Would this be relevant to a distributor AP team you already support, or to a service you could offer alongside your existing finance work?

## Qualification questions

Ask these before quoting:
1. What recurring invoice checks are done today, and by whom?
2. Roughly how many invoice lines are reviewed in a typical month?
3. Which exports are available: invoices, purchase orders, goods receipts, and optionally payments or credits?
4. What errors or review delays matter most to the team?
5. Is there a human-reviewed sample against which findings can be checked?
6. Who approves a small evaluation, and what would make the result useful enough to repeat?

If the buyer cannot answer the workflow and decision questions, do not rush to quote or ask for files.

## Demonstration sequence

Keep the demo to 8–10 minutes:
1. Load the built-in illustrative sample and state clearly that it is synthetic.
2. Select a duplicate-invoice finding; show the exact invoice ID and source row.
3. Select a unit-price difference; show invoice and PO values and the rule that triggered.
4. Select a receipt shortfall; show invoiced quantity, compatible receipt quantity and source rows.
5. Show a missing reference or unmatched line and explain what the system cannot conclude.
6. Export the exception CSV or print-ready evidence report.
7. Explain that “no rule triggered” is not certification that a line is correct.
8. Close by proposing one bounded paid evaluation with agreed acceptance criteria.

Do not demo the advanced recovery workflow unless the buyer has payment and credit records and specifically needs that workflow.

## Conversion gates

A prospect is not a deal until each gate is complete:

- **Qualified:** named workflow, owner, volume and decision.
- **Feasible:** source files and required fields can support the agreed checks.
- **Scoped:** written inputs, exclusions, deliverables, acceptance criteria and timeline.
- **Commercially agreed:** fee, payment method and terms confirmed in writing.
- **Paid/authorized to start:** payment arrangement confirmed and data transfer approved.
- **Delivered:** report includes evidence, reference comparison, misses, false positives and limitations.
- **Repeat decision:** buyer explicitly chooses a second review or declines.

Do not count page views, friendly feedback, demo requests or verbal interest as revenue.

## Weekly operating metrics

Track these in a simple spreadsheet:
- qualified partner conversations;
- buyer introductions;
- qualified evaluation inquiries;
- scopes sent;
- scopes accepted;
- evaluations paid;
- delivery time per evaluation;
- false positives and misses against reference outcomes;
- repeat engagements or explicit reasons for no repeat.

Diagnose the bottleneck by stage. If there are no qualified conversations, improve distribution. If conversations do not become scopes, improve qualification and the offer. If scopes are rejected, inspect budget, urgency and trust. If evaluations do not repeat, improve evidence quality or choose a narrower workflow.

## Claims and boundaries

- A flagged amount is not verified loss or recoverable money.
- A no-finding result means only that configured rules did not trigger.
- Do not promise universal accuracy, guaranteed savings or guaranteed recovery.
- The current app processes selected CSV files in the browser. It is not a production multi-tenant SaaS and does not upload the selected CSV contents to a LedgerTrace server.
- Do not imply ERP integration, automatic payment blocking, supplier contact or verified bank receipt.
- Never use real customer data without explicit approval and an agreed data-handling arrangement.

## Immediate checklist

- [ ] Run the sample from a clean browser session.
- [ ] Verify each expected sample finding and its source-row references.
- [ ] Export both the exception CSV and print-ready evidence report.
- [ ] Confirm the evaluation inquiry opens a correctly addressed draft and includes the chosen scope.
- [ ] Confirm the buyer-facing offer does not claim fixed pricing, guaranteed outcomes or capabilities that do not exist.
- [ ] Identify one relevant distribution partner or request one warm introduction.
- [ ] Hold the first qualification conversation before requesting any customer files.
- [ ] Send a written scope only after confirming feasibility.
