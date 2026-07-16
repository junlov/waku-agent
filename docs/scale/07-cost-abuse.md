# Chapter 7: cost and abuse control (short brief; expanded when you start it)

Two tracks exist for the prep work: `tracks/07-cost-abuse-ai-engineer.md`
(build the fix) and `tracks/07-cost-abuse-architect.md` (decide the shape
of the fix). Pick the one that matches what you are practicing, or read
both, in that order.

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
