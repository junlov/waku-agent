# Chapter 13: multi-agent applications (short brief; expanded when you start it)

Use the architect or AI-engineer companion under `docs/scale/tracks/`.

**The scar:** “specialist agents” hand prose to one another, delegate in loops,
spend independent budgets, and disagree about whether the run finished. More
agents created more nondeterminism, not more capability.

**You will reproduce:** `make scale-13` runs a staged task whose ambiguous
handoff triggers duplicate work, budget overrun, and an orphaned terminal state.

**The fix, in shape:** a deterministic orchestrator first; typed stage inputs and
outputs; an allow-listed delegation graph; one run-level budget; explicit stage
and terminal states; and artifact references instead of growing prose transcripts.

**Traps ahead:** agent count is not capability; shared chat history is not a
handoff contract; recursive delegation hides ownership; and independent retries
can multiply the same side effect.

**Done when:** the same fixture produces the same stage graph, no forbidden or
duplicate delegation occurs, the shared budget stops all stages coherently, and
every run reaches one explainable terminal state.

**Portable lesson:** multi-agent systems are distributed workflows with
probabilistic workers, not group chats.
