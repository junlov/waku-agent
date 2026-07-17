# Chapter 11: typed agent contracts (short brief; expanded when you start it)

Two tracks prepare this chapter: `tracks/11-typed-agent-contracts-architect.md`
and `tracks/11-typed-agent-contracts-ai-engineer.md`.

**The scar:** prompts, tools, queues, and APIs all describe the same command in
slightly different JSON. A harmless field rename becomes a delayed production
failure, and permissive parsing turns malformed output into plausible work.

**You will reproduce:** `make scale-11` sends missing fields, unknown fields,
wrong types, and an older envelope version through ingress, one tool boundary,
and result serialization. The current system accepts or corrupts cases that
should fail at a named boundary.

**The fix, in shape:** versioned command, result, tool, and event envelopes;
strict validation at every trust boundary; one generated schema source; and an
explicit compatibility policy. Validation failures are typed terminal outcomes,
not strings hidden in logs.

**Traps ahead:** a type hint is not runtime validation; accepting unknown fields
makes migrations invisible; and exposing internal state as the public contract
makes every refactor a breaking change.

**Done when:** invalid messages are rejected at the first boundary with stable
error codes, supported old messages still work, generated schemas match runtime
validation, and `make check-11` passes without a model key.

**Portable lesson:** prompts are probabilistic, but the boundaries around them
can and should be deterministic.
