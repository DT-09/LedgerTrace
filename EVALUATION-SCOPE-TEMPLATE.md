# LedgerTrace — evaluation scope confirmation

> Working template. Adapt to the actual buyer, data, jurisdiction and payment provider. This is a commercial scope checklist, not a substitute for legal or accounting advice.

## 1. Parties and decision owner

- **Customer / legal entity:** [Customer name]
- **Business contact and role:** [Name / role]
- **LedgerTrace contact:** [Name / role]
- **Invoice / purchase reference:** [Reference, if applicable]
- **Decision this evaluation should support:** [Specific AP review decision]

## 2. Agreed workflow

- **Workflow:** Invoice-to-purchase-order and goods-receipt reconciliation
- **Period covered:** [Date range]
- **Input files:** [Invoice export] / [PO export] / [Goods-receipt export] / [Other agreed files]
- **Maximum rows / files:** [Limits]
- **Required fields:** [List]
- **Agreed checks:** [Duplicates, missing references, supplier conflicts, quantity/price differences, receipt gaps, other]
- **Reference outcomes:** [Customer-reviewed expected findings, if available]
- **Data transfer method:** [Approved method]
- **Data classification:** [Synthetic / anonymized / other explicitly approved data]

Do not transfer confidential records until the parties have agreed on the handling method and any required confidentiality or data-processing terms.

## 3. Deliverables

LedgerTrace will provide:
1. A source-linked exception worklist in CSV.
2. A findings report describing triggered rules, compared values, source-row references and unresolved cases where available.
3. A comparison against the agreed human-reviewed reference outcomes, including observed false positives and missed cases.
4. A limitations and assumptions section.
5. One [30]-minute review handoff.

## 4. Acceptance criteria

The evaluation is considered delivered when:
- [ ] The agreed input files have been processed or rejected with a specific reason.
- [ ] Each reported finding includes the triggered rule and source-row references where available.
- [ ] Results have been compared with the agreed reference outcomes, if supplied.
- [ ] The report documents observed false positives, misses, unsupported cases and calculation limits.
- [ ] The handoff has been offered for [date / window].

Acceptance does not mean that every flagged case is a confirmed loss, that every unflagged line is correct, or that LedgerTrace authorizes a payment or accounting entry.

## 5. Commercial terms

- **Evaluation fee:** [Agreed amount and currency]
- **Taxes / applicable charges:** [Agreed treatment]
- **Payment method:** [Method agreed by both parties]
- **Payment due:** [Date or agreed milestone]
- **Start condition:** Work starts after this scope is approved, the payment arrangement is confirmed, and the agreed data is available.
- **Target delivery date:** [Date], subject to timely receipt of complete inputs and reference outcomes.
- **Out-of-scope work:** Requires a separate written scope and fee approval.

No work or payment obligation should be inferred from an inquiry or draft. Confirm the final terms with the buyer before kickoff.

## 6. Exclusions and known limitations

Unless explicitly scoped otherwise, this evaluation does not include:
- production ERP integrations or live accounting-system writes;
- automated payment blocking, supplier contact or bank-receipt verification;
- currency conversion, complete tax/freight treatment or every partial-payment scenario;
- guaranteed savings, guaranteed recovery or a universal accuracy guarantee;
- unsupported split/merged-line matching or resolution of ambiguous source records.

A flagged amount is an investigative candidate, not verified loss or recoverable money. A line with no finding means only that the configured checks did not trigger.

## 7. Data handling and retention

- Use only data the customer is authorized to share.
- Prefer synthetic or anonymized records for an initial evaluation.
- The current LedgerTrace workbench processes selected CSV files in the browser; the app does not upload those selected CSV contents to a LedgerTrace server.
- Any report or export generated from customer records must be handled using the agreed transfer and retention method.
- **Agreed retention / deletion plan:** [Specify]
- **Approved recipient(s):** [Specify]

## 8. Written approval

By replying with written approval or signing below, the parties confirm this scope, fee, payment arrangement, data-handling method, acceptance criteria and delivery target.

- **Customer approver:** [Name / title]
- **Approval:** [Reply / signature / purchase order]
- **Date:** [Date]

- **LedgerTrace approver:** [Name / title]
- **Approval:** [Reply / signature]
- **Date:** [Date]
