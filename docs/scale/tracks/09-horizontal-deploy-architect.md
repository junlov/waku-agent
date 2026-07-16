# Chapter 9 architect track: horizontal scale and deploy

Companion to `docs/scale/09-horizontal-deploy.md`. Read that brief first
for the scar, the reproduction, the fix in shape, and the done-when
criteria.

## By the end of this chapter, you'll be able to

- Explain in your own words why sticky sessions turn worker death into
  data loss, not just repeat that they are an anti-pattern.
- Name where session state and the chapter 5 queue move to, and why "any
  worker can serve any turn" depends on that move.
- Describe what "drain in-flight, then exit" means for a turn that is
  mid-tool-call when SIGTERM arrives.

## Questions to settle before you draft the plan

A design review's opening questions, not a memorization test; a
defensible position is enough to start drafting.

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

## Orient yourself on

- `waku/ops/dashboard.py:39-43` (the module-level `_agent` singleton this
  chapter has to eliminate) and `waku/runtime/session.py`.
- `waku/memory/consolidation.py` (background work that must run once
  cluster-wide, not once per worker).
- Concepts: stateless worker design; the sticky-session anti-pattern and
  why it turns worker death into data loss; SIGTERM draining; distributed
  locks (Postgres advisory locks or Redis-based).

## Further reading

- [The Twelve-Factor App: Processes](https://12factor.net/processes),
  the canonical statement of "stateless, share-nothing processes" and
  why sticky sessions are the anti-pattern this brief warns against.
