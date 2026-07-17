# Chapter 14: context and memory systems (short brief; expanded when you start it)

Use the two companion tracks under `docs/scale/tracks/`.

**The scar:** retrieved text is treated as truth. Stale instructions, poisoned
documents, and another tenant's memory become confident answers; useful facts
cannot be traced or safely forgotten.

**You will reproduce:** `make scale-14` seeds conflicting, stale, poisoned, and
cross-tenant records. The unsafe agent selects them without provenance or writes
unverified model output into long-term memory.

**The fix, in shape:** separate working context from durable memory; attach
tenant scope, source, timestamp, confidence, and policy to every record; make
retrieval an explicit ranked decision; and authorize reads and writes separately.
High-impact memory writes require review or deterministic evidence.

**Traps ahead:** more context can reduce quality; vector similarity is not
authority; summarization can erase provenance; and deletion is incomplete if
caches and derived artifacts retain the record.

**Done when:** poisoned and cross-tenant records cannot affect output, stale
evidence is visible and ranked by policy, memory writes are attributable and
reversible, and a scratch replay cannot mutate production memory.

**Portable lesson:** memory is a governed data system, not a longer prompt.
