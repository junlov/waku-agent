# Chapter 12 architect track: trust boundaries and approvals

## By the end

- Draw the trust boundary around caller, model, retrieval, tools, and control plane.
- Define proposal, approval, execution, and audit as separate states.
- Choose capability scope and approval expiry from risk, not convenience.

## Questions to settle

- Where is tenant identity authenticated and bound to a run?
- Which actions need no approval, policy approval, or explicit human approval?
- What exact payload is displayed, hashed, approved, and later executed?
- How are revocation, expiry, denial, and partial failure represented?

## Orient yourself on

- Chapter 3's tenant boundary and Chapter 11's contracts.
- Every Waku tool that can read or mutate external state.
- OWASP's least-privilege and prompt-injection guidance as threat-model inputs.

Pressure-test the plan against Chapter 13: delegated agents must not gain the
orchestrator's full authority by inheritance.
