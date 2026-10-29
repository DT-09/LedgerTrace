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
The static site does not save inquiries, create a CRM record, or notify an inbox. It cannot recover abandoned forms. The WhatsApp/email handoff only creates a message draft; the visitor must send it.

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
| QuickCheck CTA | Code fallback committed; live interactive test pending | Click every CTA on desktop/mobile; confirm panel opens and is usable |
| Inquiry handoff | WhatsApp-first draft plus email fallback committed | Send a test message to the configured business channel and confirm receipt |
| Lead inbox / CRM | Not implemented | Test that every submitted inquiry is stored or delivered reliably |
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
