# LedgerTrace buyer proof and sales system — 1 November 2026

## Decision

Stop selling a broad "supplier payment leakage detection" proposition. The first commercial wedge should use the capability LedgerTrace already has:

**Parked Invoice & Three-Way Match Evidence Review**

A bounded, human-reviewed investigation of a defined queue of supplier invoices against approved purchase orders and goods-receipt records. Optional payment and credit records can support a separate payment-excess investigation when the data is complete. The output is an evidence-backed exception register, not an automated accounting action or a promise of recovered cash.

This is a better first offer because the current product already supports invoice, PO and goods-receipt comparisons. Supplier-statement-to-ledger reconciliation is a separate expansion, not a live capability.

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

### Priority 1 — Thompson Waste Ltd (fresh SME trigger; data-fit unknown)

Public evidence: a current Senior Purchase Ledger Clerk listing is described as an immediate-start, temporary/part-time or temp-to-perm role. Duties include processing purchase-ledger invoices, reconciling supplier statements, scanning invoices and delivery notes, and resolving invoice queries. A separate Finance/Accounts Administrator vacancy mentions a busy office, purchase ledger work and Sage 50. The company is a small, family-run waste-management operator; public company data reports 14 employees in 2025. These are staffing and workflow signals, not proof of a backlog or willingness to outsource.

Role evidence: https://www.simplyhired.co.uk/job/NkzB9aa5zZfVWW1rxrWdge97h0_5AHVKLd_1KOh2zRNQHoAiSySy2Q  
Finance/Accounts Administrator listing: https://uk.indeed.com/viewjob?jk=fd099fc862c596b0  
Official contact: https://www.thompsonwaste.co.uk/contact/  
Published email: info@thompsonwaste.co.uk

Qualification needed: Is there a live backlog or recurring supplier invoice queue behind the hiring need? Do invoices carry PO references and do delivery notes/receipt exports exist? Can Sage 50 export the needed fields? Would a bounded second-pass evidence review help the finance team, or are they simply hiring for routine processing? Do not pitch until these questions are answered.

### Priority 2 — Sysco GB (exact product fit; enterprise friction)

Public evidence: AP Account Handler vacancy describes invoices parked because they do not match approved and goods-received purchase orders, plus supplier statement reconciliations and unresolved items. The parked-invoice workflow is a direct fit for the current invoice/PO/receipt engine.

Vacancy: https://jobs.smartrecruiters.com/syscogb/744000149876669

Qualification needed: Is there a defined supplier cohort or recurring parked-invoice queue not already handled by existing SAP/AP controls? Are invoice, PO and receipt exports available? Is an external second-pass review permitted? Who owns the queue and can approve a bounded evaluation?

### Priority 3 — SBFM (volume and improvement signal; data-shape risk)

Public evidence: AP Manager vacancy describes approximately 800 invoices/month, PO/invoice discrepancies, payment delays, supplier statement reconciliation and process improvement.

Official vacancy: https://careers.sb-fm.co.uk/vacancies/23742/accounts-payable-manager.html

Qualification needed: Is this a current vacancy and is the AP workflow still as described? Does the supplier population include itemised POs and receipt/service-entry records that the current engine can reconcile? Is there a specific supplier queue that needs a second-pass review?

### Priority 4 — DDC Foods (strong manual workflow fit; stale signal)

Public evidence: purchase-ledger job description describes invoice/credit/statement handling, pairing delivery paperwork with invoices, supplier-statement reconciliation, a credit-note spreadsheet, Excel and accounting-package data entry. The accessible job page states 80+ staff and £18m turnover but is old; verify that the role/process remains current before treating it as an active trigger.

Official contact: https://www.ddcfoods.co.uk/contact-us  
Published email: info@ddcfoods.co.uk  
Official company page: https://www.ddcfoods.co.uk/our-company/about-us

Qualification needed: Is there a current parked-invoice or PO/receipt mismatch queue that fits the live engine? If the need is only statement-to-ledger reconciliation, defer until that module is built.

### Do not call these customers

All four are researched targets only. No buying intent, decision-maker conversation, approved scope, purchase order or payment has been evidenced.

## Concrete paid offer

### Name

**Parked Invoice & Three-Way Match Evidence Review**

### Initial pilot scope (commercial hypothesis)

- One supplier or one clearly defined parked-invoice queue.
- One accounting period or backlog window.
- Up to 500 invoice lines, 500 PO lines and 500 goods-receipt lines, subject to file-fit review.
- Payment, credit and PO-amendment records only when the agreed question requires them.
- One consistent currency per quantified case.
- Delivery target: five business days after approved data receipt and scope sign-off; confirm only after file-fit and capacity review.
- Initial fee hypothesis: **USD 500**, not a fixed public price. Validate willingness to pay before adopting it.

### Inputs

- Invoice export with supplier, invoice reference, PO reference, item/SKU, quantity, unit price, line amount and currency.
- Approved PO export with supplier, PO reference, item/SKU, ordered quantity, price and currency.
- Goods-receipt export with supplier, PO reference, item/SKU, received quantity and date.
- Optional payment, credit-note and amendment records for a separately scoped recovery investigation.
- Buyer-owned expected outcomes or a human-reviewed reference sample if accuracy measurement is required.

### Deliverables

1. Prioritised parked-invoice worklist: price variance, quantity above PO, quantity above receipts, missing PO/receipt, supplier conflict, duplicate candidate and unresolved/ambiguous cases.
2. Source-row references for invoice, PO and receipt evidence.
3. Reconstructed line calculations where inputs support them.
4. Separate optional payment/credit candidate findings when those files are in scope; do not combine overlapping invoice and payment excess totals.
5. Data-quality and scope limitations.
6. Reviewer handoff: buyer confirms, rejects or leaves each candidate unresolved.

### Acceptance criteria

- Every reported exception points to the invoice, PO and/or receipt source row that generated it.
- Processed and excluded row counts tie back to the input population.
- Amount comparisons are withheld for missing, mixed or conflicting currencies.
- Supplier conflicts, duplicate references, shared PO/item allocations and ambiguous quantities are labelled, not silently resolved.
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

### Current product fit

The current browser workbench already compares invoice lines with PO lines and goods-receipt quantities, flags duplicates and missing records, preserves source-row references and exports an exception worklist. The recovery engine adds payment, credit and amendment evidence. The first pilot should stay inside these supported checks and avoid claiming full supplier statement reconciliation.

### Critical marketing gap

The public supplier-statement page is currently a landing page, not a completed statement-to-ledger reconciliation tool. It must be clearly marked as a future capability or removed from active sales navigation until the statement source type, matching logic, exports and tests exist.

### Later expansion requirements

1. Add dedicated supplier-statement and AP-ledger CSV inputs with documented aliases and required fields.
2. Match by supplier, normalized transaction reference, transaction type, amount and currency; expose ambiguity instead of guessing.
3. Classify statement-only, ledger-only, amount mismatch, duplicate candidate, possible unallocated payment and possible missing credit.
4. Support opening/closing balance roll-forward only where sign conventions and fields are explicit.
5. Preserve physical source-row references and original values.
6. Export exception CSV and a printable evidence report.
7. Add fixtures for exact match, alternate reference, missing credit, unallocated payment, amount mismatch, duplicate, mixed currency, missing supplier and malformed CSV.
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

1. Qualify Thompson Waste first: establish whether the current hiring signal reflects a real parked-invoice or PO/receipt exception queue and whether Sage 50 exports fit. This is the most accessible SME lead, not a confirmed buyer.
2. Verify the Sysco parked-invoice workflow and whether a bounded supplier queue can be independently reviewed; this is the strongest explicit product fit, but an enterprise sale may be slow.
3. Verify the SBFM vacancy and data shape; reject if service invoices lack compatible PO/receipt records.
4. Verify whether DDC Foods still has a current PO/receipt exception queue; do not pitch statement reconciliation until the future module is built.
4. Correct or retire the public supplier-statement page so it does not imply an unbuilt tool is live.
5. Resolve the D1 inbox configuration and the legal/payment operating route before accepting real customer data or money.
6. Run a buyer-approved, human-reviewed reference set; report precision, misses, false positives, handling time and confirmed outcomes. Do not fabricate a benchmark.

## Current commercial truth

As of this document's creation: no paid LedgerTrace customer, accepted paid scope, or received payment is evidenced. The public research establishes category and workflow relevance, not buying intent. The next proof must come from a buyer who confirms a current problem and permits a bounded, paid test.
