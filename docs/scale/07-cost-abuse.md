# Chapter 7: cost and abuse control (short brief; expanded when you start it)

**The scar:** tokens are money, and at a thousand users your model bill is
your COGS. One scripted tenant pasting novels into chat, one runaway
multi-tool loop, one scraper who found your endpoint: any of them can spend
a month's budget in an afternoon while your honest users subsidize it.

**You will reproduce:** `make scale-07` runs 100 normal tenants plus three
abusers (a flooder, a max-context paster, a tool-loop baiter). Watch the
per-tenant cost table you built the plumbing for back on `main`: the
abusers dwarf everyone, and nothing stops them.

**The fix, in shape:** metering you already half-have (the usage ledger
records tokens per model; add tenant), hard per-tenant budgets with a
daily/monthly window and an honest over-budget answer, input limits (max
message and context size), a loop-iteration ceiling per turn with a cost
cap, and routing: the gate already uses a cheap model, now send cheap TASKS
(summaries, consolidation) down cheap models by policy. Caching identical
gate decisions is the free dessert.

**Traps ahead:** budgets need to fail closed but message well (chapter 5's
429 rendering pattern again); cost attribution must include retries and
fallbacks from chapter 6 (the tenant did not ask you to retry); do not
meter in a way that blocks the hot path on the ledger write.

**Done when:** the three abusers hit their caps and stop costing money,
normal tenants' p95 and bills are unaffected, and you can produce a
per-tenant cost report you would be comfortable invoicing from.

## Architect prep

**By the end of this chapter, you'll be able to:**
- Explain why cost attribution has to include retries and fallbacks from
  chapter 6, not just the original call.
- Name the enforcement point for a per-tenant budget (admission vs.
  post-call) and the tradeoff each makes.
- Describe how cheap-task routing to cheap models composes with, or
  conflicts with, chapter 6's fallback chains.

**Questions to settle before you draft the plan** (a design review's
opening questions, not a memorization test; a defensible position is
enough to start drafting):
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

**Read before you start:**
- `waku/ops/tracing.py` and `waku/loop/models.py` for what token
  accounting exists on this branch today (the brief references ledger
  plumbing from `main`; confirm what actually exists here before
  assuming it).
- `waku/memory/consolidation.py` (a concrete "cheap task" candidate for
  model-tier routing).
- Concepts: hard vs. soft budget caps; fail-closed-but-message-well as a
  UX pattern; cost attribution across retries.

**Further reading:**
- [LLM cost governance in production APIs: token budgets, model routing,
  spend guardrails](https://matheuspalma.com/blog/llm-cost-governance-token-budgets-model-routing-spend-guardrails),
  the closest practitioner match to this chapter's exact problem:
  per-tenant token budgets plus cheap-model routing.
