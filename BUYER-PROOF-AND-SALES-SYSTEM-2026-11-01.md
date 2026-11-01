# LedgerTrace buyer proof and sales system — 1 November 2026

## Decision

Stop selling a broad "supplier payment leakage detection" proposition. The first commercial wedge should be:

**Supplier Account Reconciliation & Credit Recovery Review**

A bounded, human-reviewed investigation of one supplier statement against the buyer's AP ledger, invoice, payment and credit records. The output is an evidence-backed exception register, not an automated accounting action or a promise of recovered cash.

This direction is provisional until a buyer confirms the problem and authorizes a reference dataset.

## Economic problem: evidence and limits

### What public evidence establishes

- APQC reports a cross-industry median cost of **$6 per AP invoice**, based on 5,846 organisations. This is total AP process cost, not avoidable cost or savings attributable to LedgerTrace: https://www.apqc.org/What-Is-the-Average-Cost-to-Process-an-Invoice
- IFOL's 2025 AP leadership survey reports that 84% named efficiency as a top AP priority, 54% reporting/analytics, 34% payment accuracy, and 31% fraud controls. Its research also reports that invoice exception rate was a KPI tracked by 24% of respondents. These are priorities, not the incidence of exceptions: https://acarp-edu.org/wp-content/uploads/2025/04/Accounts-Payable-Leadership-Priorities-Report-2025_US_compressed.pdf
- APQC explicitly treats duplicate or erroneous disbursements as a measurable AP control metric: https://www.apqc.org/resource-library/resource-listing/percentage-duplicate-disbursements-processed
- Capgemini's World Payments Report 2025 describes manual workflows, non-standard invoices, data inaccuracies and reconciliation friction in automotive treasury operations. This is sector-specific evidence, not a universal rate: https://www.capgemini.com/wp-content/uploads/2024/09/WPR_2025_web.pdf

### What buyer-specific job descriptions establish

- DDC Foods' purchase-ledger role describes invoice/credit/statement handling, pairing delivery paperwork with invoices, supplier-statement reconciliation, a credit-note spreadsheet, Excel and an accounting package. The accessible listing states 80+ staff and £18m annual turnover, but the listing is old and its current status must be checked: https://jobs.smartrecruiters.com/DDCFoodsLimited/743999709374592-purchase-ledger-accounts-assistant
- SBFM's AP Manager vacancy describes approximately 800 supplier invoices per month, PO/invoice discrepancies, payment delays, supplier statement reconciliations and process improvement: https://careers.sb-fm.co.uk/vacancies/23742/accounts-payable-manager.html
- Sysco GB's AP Account Handler vacancy describes parked invoices that do not match approved and goods-received POs, supplier statement reconciliations and unresolved items: https://jobs.smartrecruiters.com/syscogb/744000149876669

These sources prove that the workflow exists and that organisations allocate labour to it. They do **not** prove any named company has a current external-service budget, a live backlog, willingness to share data, or willingness to pay LedgerTrace.

### Economic proof required from each buyer

Do not infer leakage from invoice volume or industry benchmarks. Establish the buyer's own baseline:

- Number of supplier statements reconciled per month.
- Number and age of unreconciled statement lines.
- Manual handling minutes per exception and loaded labour cost per hour.
- Value of buyer-confirmed missing credits, duplicate payments or other corrections.
- Current tools and controls; what they already catch.
- Time from statement receipt to signed-off reconciliation.
- Rework, supplier queries and close delays attributable to unresolved items.

Formulas:

- Current monthly exception-handling cost = exception count × average handling minutes ÷ 60 × loaded hourly labour cost.
- Verified financial correction value = sum of buyer-confirmed, source-supported credits/refunds/duplicate payments, counted once.
- Pilot value = measured labour time saved + buyer-confirmed financial corrections, less the fee and internal review cost.

Do not count flagged amounts as recovered cash. Do not add invoice-excess and payment-excess totals where they overlap. Do not use APQC's $6 benchmark as LedgerTrace savings.

## Target account selection

### Priority 1 — DDC Foods (workflow fit; freshness needs verification)

Public evidence: purchase-ledger job description describes statement reconciliation, a credit-note spreadsheet, pairing delivery paperwork to invoices, printed statements/invoices and Excel/accounting-package data entry. Company describes itself as a wholesale distributor. The accessible job page states 80+ staff and £18m turnover but is old; verify that the role/process remains current before treating it as an active trigger.

Official contact: https://www.ddcfoods.co.uk/contact-us  
Published email: info@ddcfoods.co.uk  
Official company page: https://www.ddcfoods.co.uk/our-company/about-us

Qualification needed: Is supplier statement reconciliation still manual? Is there an aged exception queue or missing-credit problem? Which AP export and statement formats exist? Who owns the reconciliation and who can approve a paid test?

### Priority 2 — SBFM (volume and improvement signal; data-shape risk)

Public evidence: AP Manager vacancy describes approximately 800 invoices/month, PO/invoice discrepancies, payment delays, supplier statement reconciliation and process improvement.

Official vacancy: https://careers.sb-fm.co.uk/vacancies/23742/accounts-payable-manager.html

Qualification needed: Is this a current vacancy and is the AP workflow still as described? Does the supplier population include itemised POs and receipt/service-entry records that the current engine can reconcile? Is there a specific supplier queue that needs a second-pass review?

### Priority 3 — Sysco GB (explicit parked-invoice workflow; enterprise friction)

Public evidence: AP Account Handler vacancy describes invoices parked for mismatch against approved and goods-received POs, plus supplier statement reconciliation and unresolved items.

Vacancy: https://jobs.smartrecruiters.com/syscogb/744000149876669

Qualification needed: Is there a defined supplier cohort or recurring queue not already handled by existing SAP/AP controls? Is an external specialist permitted? Who owns the process and vendor onboarding?

### Do not call these customers

All three are researched targets only. No buying intent, decision-maker conversation, approved scope, purchase order or payment has been evidenced.

## Concrete paid offer

### Name

**Supplier Account Reconciliation & Credit Recovery Review**

### Initial pilot scope (commercial hypothesis)

- One supplier account.
- One statement period.
- Up to 500 statement lines and 500 buyer-ledger lines, subject to a file-fit check.
- Supporting invoice, payment and credit-note rows only where needed to explain exceptions.
- One agreed currency per case for quantified comparisons.
- Delivery target: five business days after agreed data receipt and scope approval; only confirm after file-fit and capacity review.
- Initial fee hypothesis: **USD 500**, not a fixed public price. Validate willingness to pay before adopting it.

### Inputs

- Supplier statement export with supplier identifier, transaction date, transaction type/reference, amount and currency.
- AP ledger export for the same supplier and period.
- Invoice register and payment/credit records where available.
- Opening/closing balances where the buyer wants a balance roll-forward check.
- Buyer-owned expected outcomes or a human-reviewed reference sample if measurement of accuracy is required.

### Deliverables

1. Reconciliation worklist: matched, statement-only, ledger-only, reference mismatch, amount mismatch, duplicate candidate, and unresolved/ambiguous.
2. Source-row references for each result.
3. A reconciliation bridge from opening balance through listed movements to closing balance, only when the supplied data supports it.
4. A prioritised follow-up queue: potential missing invoices, unallocated payments, missing/unapplied credits, aged differences.
5. Data-quality and scope limitations.
6. A reviewer handoff: buyer confirms, rejects or leaves each candidate unresolved.

### Acceptance criteria

- Every reported exception points to the statement and/or ledger source row that generated it.
- Matched and unmatched counts tie back to the input population.
- Amount comparisons are withheld for missing/mixed/conflicting currencies.
- Duplicate references and ambiguous allocations are labelled, not silently resolved.
- No candidate is called a confirmed loss, debt, credit or recovery until the buyer verifies it.
- No accounting records are changed and no payment or supplier instruction is initiated.

### Exclusions

No ERP write-back, payment approval, bank execution, supplier contact, tax/accounting advice, bank-detail verification, guarantee of recovery, unsupported currency conversion or automatic decision-making.

### Buying process

1. 15-minute written fit exchange: confirm the live supplier queue, urgency, decision owner and current workaround.
2. Synthetic demo using the buyer's exact workflow shape, not their confidential data.
3. File schema and sample-row fit check using synthetic or approved anonymised records.
4. Written scope: supplier, period, row caps, inputs, checks, exclusions, data handling, acceptance, fee and delivery date.
5. Contract and payment arrangement approved through a legally authorised adult/entity where required.
6. Only then receive buyer-authorised records through an agreed secure transfer route.
7. Deliver evidence package; buyer reviews candidates; record confirmed outcomes separately.
8. Request permission before publishing an anonymised case study.

Do not accept confidential financial records through the public inquiry form, ordinary email or WhatsApp.

## Product changes required before this offer can be claimed as ready

### Critical functional gap

The public supplier-statement page is currently a landing page, not a completed statement-to-ledger reconciliation tool. The current recovery engine supports invoice, PO, goods receipt, payment, credit and amendment files, but no supplier-statement source type. Do not represent statement reconciliation as a functioning self-serve feature until implemented and tested.

### Build requirements

1. Add a dedicated statement CSV input and AP-ledger input with documented aliases and required fields.
2. Match by supplier, normalized transaction reference, transaction type, amount, currency and date; expose ambiguity instead of guessing.
3. Classify statement-only, ledger-only, amount mismatch, duplicate candidate, possible unallocated payment and possible missing credit.
4. Support optional opening/closing balance roll-forward only where sign conventions and fields are explicit.
5. Preserve physical source-row references and original values.
6. Export exception CSV and a printable evidence report.
7. Add fixtures for exact match, alternate reference, missing credit, unallocated payment, amount mismatch, duplicate, mixed currency, missing supplier, malformed CSV and opening/closing balance mismatch.
8. Test false positives and misses against a human-reviewed reference set before making any accuracy claim.

### Trust and operational blockers

- Cloudflare inquiry endpoint is deployed but live health previously reported D1 inbox not configured and email notifications not configured. The site must not claim server-side inquiry storage until the account owner binds D1, applies the migration and verifies a real test record.
- The workbench reads selected CSV files in the browser; it does not currently upload accounting CSVs to LedgerTrace. This is a useful data-minimisation property, not a security certification or a complete data-processing programme.
- No customer dataset, independent accuracy rate, customer case study, verified savings or recovered-cash result is evidenced.
- No payment checkout or payment confirmation exists.
- Before any paid cross-border engagement, the user's age/legal capacity must be handled lawfully with an appropriately authorised adult/entity. Do not misstate age or use another person's payment account without authority.

## Automated sales operating system

### Trigger-led account discovery

Search for public signals, not generic company lists:
- AP/purchase-ledger roles mentioning parked/blocked invoices, supplier statement reconciliation, aged balances, missing credits, backlog or month-end close.
- Temporary AP clean-up assignments or explicit backlog recovery.
- Public process-change, acquisition, ERP migration or shared-service transition signals when they directly affect supplier reconciliation.

### Account score (0–100)

- 25: specific public evidence of a supplier reconciliation/exception workflow.
- 20: evidence of a current backlog, temporary clean-up need, parked invoices or process-change trigger.
- 15: compatible statement/AP-ledger exports and usable references are plausible.
- 15: identifiable AP/finance owner and a route to the budget approver.
- 15: a time-bound decision or close deadline.
- 10: credible path to authorised data access and paid procurement.

A public vacancy alone cannot score as a qualified opportunity. Require direct confirmation of a live problem, owner, data, urgency and approval path before marking Qualified.

### Pipeline stages

Identified → Evidence verified → Workflow fit → Qualified (problem + owner + data + urgency + approver) → Discovery → Data-fit check → Scope issued → Written acceptance → Contract/payment authorised → Paid → Delivered → Buyer-verified outcome → Repeat/referral.

Email sent is an activity, not a stage. A reply is not a qualified opportunity. Verbal interest is not written agreement. A proposal is not revenue. Revenue is recorded only after payment is actually received through a lawful route.

### Automated sequence

1. Discover accounts from current public trigger signals.
2. Create an account dossier with exact source URLs, source dates, relevant workflow quote/paraphrase, role and caveats.
3. Score and reject weak-fit accounts before outreach.
4. Draft one account-specific message that references the actual signal and asks one operational question.
5. Follow up once only when there is no response and the signal remains current.
6. On a positive response, ask the qualification questions; do not send a generic deck.
7. If qualified, prepare a synthetic proof run and a one-page scope.
8. Track decision, objection, procurement and payment evidence.
9. Stop sequences after an explicit decline, invalid contact, or stale signal.
10. Never auto-send, invent a relationship, scrape private contact data, or treat automated research as buyer consent.

### Weekly funnel metrics

- New accounts with a source-backed trigger.
- Evidence-verified accounts.
- Workflow-fit accounts.
- Qualified opportunities.
- Discovery replies.
- Data-fit checks completed.
- Scopes issued.
- Written acceptances.
- Paid pilots and actual cash received.
- Confirmed financial corrections and measured labour time saved.

The target is not email volume. It is conversion from verified trigger to qualified workflow to paid, authorised review.

## Immediate next actions

1. Verify whether DDC Foods still has the described manual reconciliation workflow; it is the best narrow workflow match but its public job listing is stale.
2. Verify the SBFM vacancy and data shape; reject if its service invoices lack compatible PO/receipt evidence.
3. Approach Sysco only if a bounded exception cohort and external review route can be identified.
4. Build and test the actual supplier-statement reconciliation module before promoting it as a product feature.
5. Resolve the D1 inbox configuration and the legal/payment operating route before accepting real customer data or money.
6. Run a buyer-approved, human-reviewed reference set; report precision, misses, false positives, handling time and confirmed outcomes. Do not fabricate a benchmark.

## Current commercial truth

As of this document's creation: no paid LedgerTrace customer, accepted paid scope, or received payment is evidenced. The public research establishes category and workflow relevance, not buying intent. The next proof must come from a buyer who confirms a current problem and permits a bounded, paid test.
