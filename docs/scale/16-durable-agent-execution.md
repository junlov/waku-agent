# Chapter 16: durable agent execution (short brief; expanded when you start it)

Use the architect or AI-engineer companion under `docs/scale/tracks/`.

**The scar:** a worker crashes after an external effect but before recording
success. Redelivery repeats the effect; avoiding retries loses the run. Long work
cannot be cancelled or resumed safely, and deployment drains become outages.

**You will reproduce:** `make scale-16` kills workers before work, during model
calls, after side effects, and before acknowledgement; it also duplicates and
reorders deliveries. The unsafe runtime loses progress or repeats effects.

**The fix, in shape:** a minimal versioned command in a durable control store;
atomic claim with lease and fencing; idempotent or deduplicated effects; durable
stage checkpoints; explicit cancellation and terminal results; and replaceable
workers. Model correction, provider transport, activity, and workflow retries
remain distinct layers with distinct budgets.

**Traps ahead:** “exactly once” without an end-to-end proof; leases without
fencing; idempotency keys derived from attempts; and storing large prompt or
artifact payloads in the queue instead of references.

**Done when:** every crash point converges on one terminal result, externally
visible effects occur no more than policy permits, cancellation survives worker
replacement, stale claimants are fenced, and replay is explainable from records.

**Portable lesson:** durability comes from explicit ownership and effect
semantics, not from keeping a process alive.
