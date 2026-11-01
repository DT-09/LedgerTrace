# LedgerTrace — first-client readiness audit

**Audit date:** 29 October 2026  
**Purpose:** identify why the current site has not yet converted into a paid engagement and distinguish technical defects from unvalidated commercial assumptions.

## Executive finding

LedgerTrace is **not yet proven sales-ready**. The browser-side reconciliation workbench and sample evidence are useful demonstration assets, but no customer results, qualified buyer, accepted scope, or payment has been evidenced. A website cannot manufacture demand or replace a real buyer channel.

The highest-priority defects are conversion-path reliability and the absence of a server-side lead inbox. The highest-priority commercial risk is that the current offer targets a broad category (distributors/AP teams) without a verified buyer who has a live, expensive problem and authority to purchase a bounded review.

## Technical and conversion blockers

### 1. QuickCheck calls to action were inconsistent
- Some homepage CTAs linked to `#quickcheck`, which only scrolled to a section instead of opening the inquiry panel.
- Service-page CTAs used `/?request=quickcheck`, relying on JavaScript inside the main application script to open the panel.
- The form then opened an email draft and depended on the visitor to send it. A blocked/unconfigured mail client could make the handoff appear broken.

**Changes made:** homepage hero/footer CTAs now route through the QuickCheck request route; the main button has an inline opening fallback; a separate small route handler opens and pre-fills the panel independently of the large app script; inquiry submit now prioritizes a prefilled WhatsApp handoff and retains email as a fallback. The user must still review and press Send.

**Verification boundary:** source commits are confirmed. A live interactive browser click-through has not yet been completed, so do not describe the end-to-end click path as browser-verified until it is tested in a real browser.

### 2. There is no server-side lead capture
The static frontend now includes a same-origin Pages Function and D1 schema for inquiry metadata, with origin checks, bounded fields, payload limits, a honeypot, and hashed-IP rate limiting. This code is not a live inbox until the D1 database is created, the migration is applied, and the DB binding is configured in Cloudflare Pages. Optional Resend notifications also require owner-configured secrets. Until that setup is verified, the form must use its clearly disclosed manual WhatsApp/email fallback and must not claim that an inquiry was stored.

**Required before claiming automated lead capture:** connect a legitimate form/email service or a server-side endpoint with configured credentials, test a real submission, and verify that the owner receives it. Do not accept sensitive accounting records through a public form. The current version should continue to request only contact and scope information.

### 3. There is no payment checkout or payment confirmation
The site has no integrated checkout, invoice workflow, or payment status tracking. Fees and terms are agreed privately, then payment must be requested through a lawful, mutually supported method.

**Required:** select a payment method that supports the operator's actual country, age/legal status, and customer; confirm fees, settlement timing, dispute terms, and whether an adult/guardian or legal entity is required. Do not misstate age or use someone else's account without authorization. The site should only claim payment received when it is actually received.

### 4. The buyer sees a capable demo, not independent proof
The examples are synthetic. There are no customer case studies, validated accuracy figures, independent security certification, or production ERP integration. The site already discloses these limits, which is appropriate, but buyers still have to take a chance on an unproven provider.

**Required:** run one tightly bounded, buyer-approved evaluation; define expected results with the buyer; record catches, false positives, misses, limitations and review time; obtain permission before publishing any result. Do not invent case studies or savings.

## Market evidence: the problem exists, but the category is competitive

Public supplier-statement/AP providers explicitly sell duplicate-invoice checks, supplier-statement reconciliation, missing-credit discovery and exception follow-up. For example, [ARDEM's vendor reconciliation service](https://ardem.com/vendor-statement-reconciliation-services/) describes recurring queues and backlogs; [Liberata's supplier statement service](https://liberata.com/introducing-our-statement-supplier-reconciliation-service/) describes time-consuming, sometimes irregular manual reconciliation; [MetaSource's AP partner page](https://www.metasource.com/partners/accounts-payable/) offers established invoice matching, exception resolution and referral/reseller routes.

**Interpretation:** this supports category-level demand, not demand for LedgerTrace specifically. It also shows why a generic reconciliation tool is difficult to sell: incumbents have operational experience, customer proof, integrations and established delivery teams. LedgerTrace should not compete on broad automation or claim superior recovery. Its credible entry point is a tightly scoped, source-linked second-pass review that a smaller accounting/AP service provider can trial on approved, anonymized data—if the provider has a concrete use case and accepts the limitations. These organizations are research targets, not qualified buyers; no current need or willingness to pay has been confirmed.

## Commercial blockers

### 5. The ideal customer is still too broad
“Distributors and AP teams” is a category, not a qualified prospect. Many teams already have ERP controls, established accounting providers, or no urgent reconciliation backlog. The first buyer should have a named workflow and a live trigger: an unresolved supplier balance, a deadline-driven close, a disputed invoice, or a defined backlog.

### 6. The free step may create work without creating buying intent
A free QuickCheck can be useful, but only when the buyer has already identified a consequential problem and a decision to make. Otherwise it attracts curiosity and free consulting.

**Rule:** do not start a custom QuickCheck until the buyer can name the workflow/problem, available records, responsible reviewer, desired decision, and a plausible route to approving paid work. Keep the free deliverable to a short fit summary—not a full exception report.

### 7. The paid scope must be easier to buy than a platform
Sell one bounded investigation, not “AI” or a platform rollout. Before work starts, agree the supplier/workflow, source files and row limits, supported checks, exclusions, data handling, acceptance criteria, delivery date, fee and payment arrangement in writing. Do not promise recovered cash or guaranteed savings.

### 8. There is no evidenced acquisition engine yet
A polished website does not generate qualified visits by itself. SEO is a long-term channel; public email addresses are not evidence of buying intent; generic outreach alone has already failed to produce a paid client.

**Next acquisition priority:** find overseas distribution/accounting-service partners or named finance teams with a public, specific signal of a current reconciliation problem; prioritize warm introductions and partner channels where a real relationship exists. Each lead must have a source, named role, specific problem signal, likely authority, and a reason the bounded evaluation is relevant. A public contact form alone is not a qualified lead.

## Current readiness status

| Gate | Status | Evidence required to pass |
| --- | --- | --- |
| Working demo | Demonstrable, not independently validated | Run it against a buyer-approved, human-reviewed reference set |
| QuickCheck CTA | Code fallback committed; browser interaction still pending | Click every CTA on desktop/mobile; confirm panel opens and is usable |
| Inquiry handoff | Manual WhatsApp/email fallback tested; D1 storage is not configured | Bind D1 and verify a stored test inquiry before claiming server-side receipt |
| Lead inbox / CRM | D1 endpoint deployed; live health reports `inboxConfigured: false` | Create D1, apply migration, bind DB, submit a real test inquiry, and confirm the row is visible; configure optional notification secrets if needed |
| Paid offer | Defined as a bounded service | Buyer accepts written scope, criteria, timeline and fee |
| Payment collection | Manual, not integrated | Confirm a lawful payment route for operator and buyer; test settlement |
| Customer proof | None established | Complete a paid or explicitly approved evaluation and document results |
| Repeatable acquisition | Not established | Qualified buyer conversations and measured conversion through payment |

## Immediate operating rules

1. Do not spend more time on cosmetic redesign until CTA, handoff, lead receipt and buyer qualification are tested.
2. Do not begin unpaid custom analysis or accept confidential raw financial files through public inquiry channels.
3. Do not call a contact a buyer until they have a specific current problem and a plausible purchase path.
4. Do not count an inquiry, sample result, meeting, or verbal interest as revenue.
5. Do not claim the company is “fully ready” until the unresolved gates above are tested.
6. The near-term goal is one qualified overseas buyer and one paid, bounded Evidence Review—not a general traffic target.


## Engineering update — 1 November 2026

A production-hardening branch now addresses defects found during source inspection:

- The optional `heroSampleBtn` listener is guarded so a missing optional element cannot abort the rest of homepage initialization.
- Primary duplicate detection now distinguishes exact duplicate invoice lines from legitimate multiple lines sharing one invoice number.
- Primary amount aggregation requires explicit, consistent currency evidence.
- Recovery CSV parsing rejects malformed quoting, duplicate/empty headers and excess row fields, and preserves physical source line numbers.
- Recovery amount calculations are withheld when required supplier, PO, receipt, currency, payment or credit evidence is incomplete.
- The inquiry form has a same-origin D1-backed endpoint, a schema migration, payload validation, a honeypot and rate limiting. It requires Cloudflare configuration before it is live.
- CI includes recovery, inline-script, site-readiness and inquiry API tests. The live Pages smoke test still needs a successful post-deployment run.

These changes improve technical controls; they do not establish customer accuracy, a buyer, legal contracting capacity, payment settlement, customer proof or repeatable acquisition. Do not describe LedgerTrace as a fully deployed multi-tenant SaaS. The intended launch scope remains a controlled, bounded Evidence Review service.


## Live acceptance results — 1 November 2026

- Homepage illustrative reconciliation sample ran successfully; the embedded known-answer benchmark returned **7/7 PASS**.
- The primary workbench now labels the illustrative flagged-line metric in USD. It is an exception-line value, not a confirmed overpayment or recovery.
- Recovery sample loaded and ran: 8 invoice lines and 3 flagged candidates. The illustrative invoice-excess and payment-excess totals each display USD 110.50. They are potentially overlapping views and must not be added together.
- Primary CSV and recovery CSV/JSON export actions initiated browser downloads. This pass confirmed download initiation, not independent downstream validation of every exported cell.
- A QA-only review note was saved in the current page session. It is not server-persisted; export the worklist to retain it.
- Commercial inquiry panel opened and closed. Prefilled email and WhatsApp links reflected the current test form details. No message was sent and no inquiry was submitted.
- Live GET health check confirms the inquiry Pages Function is deployed. It currently reports `inboxConfigured: false` and `emailNotificationsConfigured: false`; the form therefore must use the manual handoff and must not claim that a lead was stored.
- CI and live Pages smoke checks pass, including API health, cross-origin rejection and honeypot behavior.

The browser checks used illustrative data only. They do not establish real-world reconciliation accuracy, buyer acceptance, recovered cash, customer references or secure handling of confidential buyer files.
