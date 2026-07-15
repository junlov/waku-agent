# Chapter 9: horizontal scale and deploy (short brief; expanded when you start it)

**The scar:** one process has a ceiling: one machine's cores, one GIL, one
crash taking everyone down, one deploy meaning downtime. Past a point you
do not scale the process up, you run more of them, and everything you
secretly kept in process memory becomes a bug.

**You will reproduce:** `make scale-09` runs TWO dashboard workers behind
a tiny proxy and replays chapter 3's leak test plus a mid-run `kill -TERM`
of one worker. On current code, sessions and the agent object live in
process memory: requests bounce between workers, half the conversation
context vanishes, and the killed worker takes its in-flight turns to the
grave.

**The fix, in shape:** make workers stateless. Session state and the
chapter 5 queue move to shared storage (Postgres from chapter 4, or Redis
behind a `[scale-queue]` extra); any worker can serve any turn. Graceful
shutdown: on SIGTERM stop admitting, drain in-flight turns, then exit, so
deploys lose zero work. A docker compose cluster (proxy, 3 workers,
Postgres, Redis) becomes the reference deployment, and rolling one worker
at a time becomes your zero-downtime deploy.

**Traps ahead:** sticky sessions are the tempting shortcut and the wrong
lesson (they turn worker death back into data loss); the per-session
ordering you built in chapter 2 must now hold ACROSS workers (a
distributed lock or a session-to-queue mapping); background consolidation
should run once, not once per worker.

**Done when:** the 3-worker cluster passes chapters 3 and 5's tests,
killing any single worker mid-load loses zero completed turns and leaks
nothing, and a rolling restart happens under load without the loadgen
noticing.

## Architect prep

**By the end of this chapter, you'll be able to:**
- Explain in your own words why sticky sessions turn worker death into
  data loss, not just repeat that they are an anti-pattern.
- Name where session state and the chapter 5 queue move to, and why "any
  worker can serve any turn" depends on that move.
- Describe what "drain in-flight, then exit" means for a turn that is
  mid-tool-call when SIGTERM arrives.

**Questions to settle before you draft the plan** (a design review's
opening questions, not a memorization test; a defensible position is
enough to start drafting):
- Where does session state move (Postgres from chapter 4, Redis behind
  `[scale-queue]`, both)? What is the cutover risk if that migration
  itself has a bug?
- Cross-worker ordering: chapter 2 solved per-session ordering inside one
  process. What mechanism holds when two workers could pick up the same
  session (a distributed lock vs. a session-to-queue mapping)? The brief
  flags sticky sessions as the wrong lesson: can you say why in your own
  words before building anything?
- Graceful shutdown: what exactly does "drain in-flight, then exit" mean
  for a turn that is mid-tool-call when SIGTERM arrives?

**Read before you start:**
- `waku/ops/dashboard.py:39-43` (the module-level `_agent` singleton this
  chapter has to eliminate) and `waku/runtime/session.py`.
- `waku/memory/consolidation.py` (background work that must run once
  cluster-wide, not once per worker).
- Concepts: stateless worker design; the sticky-session anti-pattern and
  why it turns worker death into data loss; SIGTERM draining; distributed
  locks (Postgres advisory locks or Redis-based).

**Further reading:**
- [The Twelve-Factor App: Processes](https://12factor.net/processes),
  the canonical statement of "stateless, share-nothing processes" and
  why sticky sessions are the anti-pattern this brief warns against.
