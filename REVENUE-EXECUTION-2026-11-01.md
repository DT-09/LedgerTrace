# Caseweft revenue execution — 1 November 2026

Internal operating document. This records verified product status, buyer/partner research, pipeline evidence and the next commercial actions. It does not claim that any listed prospect is a customer or that Caseweft has validated market demand.

## Executive status

- Paid customers evidenced in the reviewed records: **0**
- Paid scopes accepted: **0**
- Payments received: **0 evidenced**
- Qualified buying opportunities: **0 evidenced**
- Outbound prospect threads reviewed: LedgerKin, EarthOne Accounting and LedgerBPO
- Most actionable partner hypothesis: EarthOne Accounting, because its public site explicitly lists accounts payable/accounts receivable services and white-label delivery for UK accounting firms. It is still unqualified; no buyer need or reply is evidenced.
- Initial commercial target: **USD 500 as a hypothesis**, not a fixed or validated price.

## Workstream A — product proof and technical readiness

### Verified on 1 November 2026

Latest GitHub Actions runs for commit `4918d470`:
- Caseweft checks: success.
- Recovery tests: success.
- Live Pages smoke test: success.

The live smoke test verified:
- Production homepage serves expected copy and sample labels.
- Checklist page and sitemap are reachable.
- Recovery engine is reachable and contains currency/payment-excess safeguards.
- Inquiry API responds, rejects cross-origin submissions, and discards honeypot probes.

The recovery regression suite covers source-row preservation, payment allocation, credit treatment, supplier conflicts, currency conflicts, malformed CSV quoting, invalid numeric fields and missing match keys. The current sample benchmark has 7/7 seeded known-answer checks passing. This is regression evidence on synthetic data, **not** independent accuracy validation on customer records.

### Critical live configuration gap

GET https://ledgertrace.pages.dev/api/inquiries/ returned:

`inboxConfigured: false`
`emailNotificationsConfigured: false`

Therefore:
- D1-backed inquiry storage is not configured.
- Email notifications are not configured.
- A valid inquiry cannot currently be claimed as stored in a secure inbox.
- The site must continue to disclose and use its manual WhatsApp/email fallback.
- Owner action required in Cloudflare: create/bind D1, apply `migrations/0001_create_inquiries.sql`, test a legitimate non-honeypot submission, verify the row exists, then configure notification secrets if desired. Do not accept confidential finance records through the public inquiry form.

### Product boundaries to preserve

- Browser-side CSV analysis; selected CSV contents are not uploaded by the current workbench.
- Synthetic sample values only; no customer case study, independent accuracy rate, savings result, security certification or ERP integration claim.
- Flagged values are investigation candidates, not confirmed loss or recoverable cash.
- Payment-excess candidates require payment, credit, currency and allocation evidence plus human review.
- No automated payment blocking, accounting write-back, supplier contact or bank-receipt verification.

### Product proof gate before customer data

1. Run the sample in a clean browser session.
2. Save expected findings and source-row references as a gold-standard test sheet.
3. Export CSV and print/PDF report; inspect the actual output cells and evidence references.
4. Test at least one legitimate variation that must not be flagged, one ambiguous/missing-source case, one supplier conflict and one currency conflict.
5. For a buyer evaluation, agree a human-reviewed reference set and report both false positives and misses.
6. Do not claim a customer-data accuracy rate until this is done on an authorized dataset.

## Workstream B — paid offer and proof package

### Offer

**Supplier Payment Leakage Evidence Review**

A bounded, source-linked investigation of one supplier account or defined invoice backlog. Buyer pays for a reviewable evidence package, not for software access or a promise of recovered money.

### Buyer supplies

- Invoice export.
- Purchase-order export.
- Goods-received export.
- Payment/credit/amendment records only when the agreed question requires them.
- A human-reviewed reference set if accuracy measurement is part of the scope.
- Written authorization to share the selected records and an agreed transfer method.

### Deliverables

1. Prioritized exception worklist in CSV.
2. Evidence report showing triggered rule, compared values and source-row references where supported.
3. Separation of observed facts, candidate discrepancies, confirmed buyer outcomes and unresolved items.
4. Data-quality limitations, unsupported cases, and false positives/misses when a reference set exists.
5. Review handoff against agreed acceptance criteria.

### Scope and pricing

- Initial target: **USD 500**, to be validated with buyers.
- Do not publish it as a fixed website price.
- Quote only after confirming the workflow, decision owner, files, row limit, supported checks, exclusions, handling method and acceptance criteria.
- If the buyer's budget is lower, reduce the scope rather than silently discounting the same work.
- Start only after written scope and lawful payment terms are confirmed.
- Delivery timing is agreed per scope; do not promise a standard turnaround until internal capacity is tested.

### Qualification questions

1. What supplier account or recurring reconciliation queue needs attention now?
2. What decision must the review support?
3. Who performs the check today, and how often?
4. Which invoice, PO, receipt and (if relevant) payment/credit exports exist?
5. What is the approximate volume and period?
6. Who reviews the findings and who can approve a paid evaluation?
7. What would make the result useful enough to repeat?

A lead is qualified only when there is a specific current workflow/problem, an accountable reviewer, a plausible approver, available authorized records and a credible reason to pay.

## Workstream C — prospect and channel research

### Existing outreach — verified Gmail records

| Account | Evidence | Current stage | Next action |
|---|---|---|---|
| EarthOne Accounting | Outbound email to hi@earthoneaccounting.com on 28 Oct 2026; no reply found in searched mailbox. Public site describes UK accounting outsourcing, AP/AR services and white-label work for UK accounting firms. | Relevant channel hypothesis; not qualified | Follow up once with a specific question about a defined supplier-reconciliation backlog or overflow second-pass review. Ask whether they would trial an anonymized sample. Do not pitch a generic platform replacement. |
| LedgerKin | Outbound email to sam@ledgerkin.com on 28 Oct 2026; no reply found. Search did not establish reliable public evidence that the exact company/contact operates a relevant AP service. | Unverified target; not qualified | Verify the exact business and recipient before any follow-up. If not verifiable, park it. |
| LedgerBPO | Outbound email to sales@ledgerbpo.com on 28 Oct 2026. Gmail recorded repeated SMTP connection timeouts/delivery delays on 29–30 Oct. No human reply found. A public LinkedIn result describes LedgerBPO as a new accounting/billing division of SS Support Network. | Delivery problem; not qualified | Do not resend to the same address until verified. Find the parent company's official contact route and confirm the division's AP scope. |
| TrustLayer Labs | Actual correspondence concerns Aurelis Authority / AI-agent security assessment and possible commercial collaboration, not Caseweft. | Separate project; exclude from Caseweft revenue | Do not count as a Caseweft prospect or revenue opportunity. |

### Additional researched accounts — not contacted and not qualified

| Account | Public evidence of relevance | Why it may fit | Risk / next qualification |
|---|---|---|---|
| AcoBloom | https://www.acobloom.com/us/services/accounts-payable-outsourcing/ — publicly offers AP outsourcing to accounting/CPA firms. | Could be a channel if it has a client-specific exception backlog and wants a bounded independent second-pass review. | Direct competitor/service provider; verify whether external specialist capacity is ever used. |
| ARDEM | https://ardem.com/accounts-payable-outsourcing-services/ — describes managed AP operations, invoice validation and exception follow-through. | Has the exact workflow context where evidence-led exception review is relevant. | Mature managed-service competitor; low priority unless a narrow subcontract/overflow need is public or introduced. |
| IBN Technologies | https://www.ibntech.com/accounts-payable-and-accounts-receivable-services/ — describes invoice validation, PO matching, payment reconciliation and AP/AR outsourcing. | Strong category relevance and global service delivery. | Established provider with its own tooling and controls; low probability without a specific partner route. |
| BDI Express | https://www.bdiexpress.com/ — US industrial bearings and mechanical power-transmission distributor. | Direct-buyer segment match. | No public evidence of a current reconciliation issue; identify finance/AP decision owner and live trigger before outreach. |
| Anglia Components | https://www.anglia.com/ — UK electronic components distributor. | Direct-buyer segment match. | No public evidence of a current reconciliation issue; likely mature systems. Research only until a relevant trigger is found. |
| Farnell | https://www.farnell.com/ — global electronic-components distributor. | Direct-buyer segment match. | Large incumbent operation; not a first-sale priority absent a specific pain signal or warm route. |

### Prioritization

1. EarthOne follow-up — strongest existing relevant contact and explicit white-label/AP service fit.
2. LedgerBPO parent-company verification — first fix deliverability, then determine whether the new division has a fit.
3. One smaller/mid-market industrial distributor with a named current supplier issue and reachable AP/finance owner.
4. AcoBloom only if a specific subcontract/overflow or second-pass review route can be identified.
5. Park LedgerKin until exact identity and service fit are verified.
6. Do not spend early sales time pursuing enterprise-scale distributors without a warm introduction or specific trigger.

## Workstream D — closing process and pipeline controls

### Pipeline stages

1. Identified — account exists; no need established.
2. Relevant — public evidence shows workflow fit.
3. Qualified — current problem, owner, approver, data availability and buying reason established.
4. Discovery — buyer has described the workflow and desired decision.
5. Scope drafted — deliverables, limits, criteria, handling and fee prepared.
6. Scope accepted — written approval by authorized buyer.
7. Commercially agreed — payment terms and lawful contracting route confirmed.
8. Paid / authorized to start — payment received or agreed milestone confirmed, and data transfer approved.
9. Delivered — report and handoff accepted.
10. Repeat / closed-lost — explicit buyer decision and reason recorded.

Do not promote an account because an email was sent. Do not count verbal interest as written agreement. Do not count a proposal as revenue. Count revenue only when payment is actually received.

### Immediate actions

- EarthOne: send one concise follow-up after the original 28 Oct message has had a reasonable response window. Ask whether there is one supplier reconciliation queue that would benefit from an anonymized second-pass evidence review.
- LedgerBPO: verify parent-company route and email deliverability before another attempt.
- LedgerKin: verify identity or park.
- Direct buyers: research named AP/finance decision owners and public signals such as a supplier dispute, reconciliation backlog, finance transformation, or a hiring need tied to AP controls. No signal, no personalized claim.
- Prepare a one-page synthetic demonstration pack with a gold-standard expected-results sheet.
- In every discovery conversation, ask for a specific workflow and decision before presenting a price.
- Prepare a written scope using `EVALUATION-SCOPE-TEMPLATE.md`; do not send it before buyer qualification.
- Do not send prospect messages or make contractual commitments without the user's explicit approval.

### Draft follow-up — EarthOne

Subject: Re: Caseweft reconciliation review pilot

Respected Ketul,

I am following up on my note about a possible fit with EarthOne's accounts-payable work.

The relevant use case is narrow: a second-pass review of one supplier account or exception backlog where invoice, PO and goods-received exports need to be compared and each candidate finding traced to its source rows.

This would not replace EarthOne's accounting workflow. The question is whether a bounded evidence review could help your team investigate a specific queue or provide an additional review layer for a client. An initial walkthrough can use synthetic or anonymized records.

Is there a current workflow where this would be useful, or is it outside your present service needs?

Regards,
Caseweft

### Draft follow-up — LedgerBPO (only after verifying a working official contact route)

Subject: AP reconciliation evaluation — correct contact?

Respected LedgerBPO team,

I previously sent a note proposing a bounded evaluation of one AP reconciliation workflow. The message to sales@ledgerbpo.com was delayed by a recipient-server connection timeout, so I am checking the correct contact route before resending.

If your team handles supplier invoice-to-PO/receipt reconciliation, could you direct this to the person responsible for AP operations or service delivery?

Regards,
Caseweft

## Daily operating dashboard

Update these counts from evidence, not estimates:

- Accounts identified:
- Relevant accounts:
- Qualified buyers:
- Qualified channel partners:
- Discovery conversations:
- Scopes sent:
- Scopes accepted:
- Payments received:
- Reviews delivered:
- Repeat engagements:
- Oldest unanswered follow-up:
- Next action with owner and due date:

### Current baseline from reviewed records

- Qualified buyers: 0 evidenced.
- Qualified channel partners: 0 evidenced.
- Scopes sent: 0 evidenced.
- Scopes accepted: 0 evidenced.
- Payments received: 0 evidenced.
- EarthOne: relevant, unqualified, one outbound email, no reply found.
- LedgerKin: unverified, one outbound email, no reply found.
- LedgerBPO: one outbound email with delivery timeouts; recipient route unverified.

## External configuration dependency

The live inquiry endpoint currently reports `inboxConfigured=false` and `emailNotificationsConfigured=false`. A repository commit cannot complete this Cloudflare account configuration. The account owner must bind D1, apply the migration and verify a real valid submission before Caseweft claims secure lead capture.

## Decision rule

Until one buyer pays for a bounded review, do not add features or redesign pages unless they directly fix a verified product defect, improve evidence quality, close a trust gap or remove a specific conversion blocker.
