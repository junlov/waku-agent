# Chapter 7 AI engineer track: cost and abuse control

Companion to `docs/scale/07-cost-abuse.md`. Read that brief first, and
read the architect track's decision on budget enforcement point before
building: reject-at-admission and reject-after-call are different
implementations.

## By the end of this chapter, you'll be able to

- Extend the existing token metering to record tenant, and enforce a
  hard per-tenant budget without blocking the hot path on the ledger
  write.
- Implement input limits (max message size, max context size) and a
  loop-iteration ceiling with a cost cap per turn.
- Implement policy-based routing of cheap tasks to cheap models, and
  cache identical gate decisions.

## Build this

1. Confirm what token accounting actually exists on this branch (check
   `waku/ops/tracing.py` and `waku/loop/models.py`; the brief references
   ledger plumbing from `main` that may not be fully present here) before
   building on top of it.
2. Add tenant to the metering so every recorded token count is
   attributable, including tokens spent on retries and fallbacks from
   chapter 6.
3. Implement hard per-tenant budgets with a daily/monthly window, at the
   enforcement point the architect track chose, with an honest
   over-budget response using chapter 5's fail-closed-but-message-well
   pattern.
4. Add input limits: max message size and max context size, rejected
   before they reach the model.
5. Add a loop-iteration ceiling per turn with an associated cost cap, to
   stop a runaway multi-tool loop.
6. Implement policy-based routing so cheap tasks (summaries via
   `waku/memory/consolidation.py`, gate decisions) go to cheap models,
   and cache identical gate decisions instead of recomputing them.
7. Make sure the ledger write itself is off the hot path (async, batched,
   or otherwise non-blocking) so metering doesn't become its own latency
   problem.
8. Run `make check-07`: the three scripted abusers (flooder, max-context
   paster, tool-loop baiter) must hit their caps and stop costing money,
   while normal tenants' p95 and bills stay unaffected.

## Read before you start

- `waku/ops/tracing.py` and `waku/loop/models.py` (current token
  accounting, if any).
- `waku/memory/consolidation.py` (a concrete cheap-task routing target).

## Further reading

- [LLM cost governance in production APIs: token budgets, model routing,
  spend guardrails](https://matheuspalma.com/blog/llm-cost-governance-token-budgets-model-routing-spend-guardrails),
  concrete implementation patterns for per-tenant metering and routing.
