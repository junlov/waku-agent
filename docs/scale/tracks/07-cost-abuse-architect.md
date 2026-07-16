# Chapter 7 architect track: cost and abuse control

Companion to `docs/scale/07-cost-abuse.md`. Read that brief first for the
scar, the reproduction, the fix in shape, and the done-when criteria.

## By the end of this chapter, you'll be able to

- Explain why cost attribution has to include retries and fallbacks from
  chapter 6, not just the original call.
- Name the enforcement point for a per-tenant budget (admission vs.
  post-call) and the tradeoff each makes.
- Describe how cheap-task routing to cheap models composes with, or
  conflicts with, chapter 6's fallback chains.

## Questions to settle before you draft the plan

A design review's opening questions, not a memorization test; a
defensible position is enough to start drafting.

- Budget enforcement point: reject at admission (reusing chapter 5's
  shape), or after the model call returns? Retries and fallbacks from
  chapter 6 must count toward the same tenant's spend, since the tenant
  did not ask for the retry: where does that accounting happen without
  blocking the hot path?
- Cheap-task routing (summaries, consolidation) to cheap models: a policy
  table, or hardcoded per call site? Does this interact with chapter 6's
  fallback chains, or run independently of them?
- What is the over-budget UX contract: the same 429-shaped pattern as
  chapter 5, or does cost need its own signal to the user?

## Orient yourself on

- `waku/ops/tracing.py` and `waku/loop/models.py` for what token
  accounting exists on this branch today (the brief references ledger
  plumbing from `main`; confirm what actually exists here before
  assuming it).
- `waku/memory/consolidation.py` (a concrete "cheap task" candidate for
  model-tier routing).
- Concepts: hard vs. soft budget caps; fail-closed-but-message-well as a
  UX pattern; cost attribution across retries.

## Further reading

- [LLM cost governance in production APIs: token budgets, model routing,
  spend guardrails](https://matheuspalma.com/blog/llm-cost-governance-token-budgets-model-routing-spend-guardrails),
  the closest practitioner match to this chapter's exact problem:
  per-tenant token budgets plus cheap-model routing.
