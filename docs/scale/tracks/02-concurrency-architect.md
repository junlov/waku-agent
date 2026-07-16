# Chapter 2 architect track: concurrency

Companion to `docs/scale/02-concurrency.md`. Read that brief first for the
scar, the reproduction, the fix in shape, and the done-when criteria.

## By the end of this chapter, you'll be able to

- Name the unit of safe concurrency (process, tenant, session, or turn)
  and defend why it is the right one for this system.
- Explain why the GIL is a non-issue here but SQLite's one-writer rule
  is not.
- Describe the difference between a lock-per-session and a queue-per-session
  design, and what each costs under load.

## Questions to settle before you draft the plan

A design review's opening questions, not a memorization test; a
defensible position is enough to start drafting.

- What is the actual unit of serialization: a lock per session, a queue per
  session, or something else? What breaks if two turns in the *same*
  session interleave?
- SQLite's one-writer rule: WAL mode plus busy timeouts, or a single
  write-queue thread? What is the failure mode of each once you hit your
  chapter 1 p95 target?
- Worker pool sizing: a fixed count, or scaled to something (cores,
  concurrent sessions)? What happens on exhaustion, and how is that
  different from what happens today under the global lock?

## Orient yourself on

- `waku/ops/dashboard.py:43` and `:512` (the two module-level locks) and
  `:937` (`ThreadingHTTPServer`), enough to reason about where contention
  currently lives, not to modify yet.
- `waku/loop/agent.py` (`Waku.respond`, the thing the lock is protecting)
  and `waku/db.py` (SQLite connection handling, one file, one writer).
- Concepts: the GIL and why it does not matter for I/O-bound work; lock
  striping / per-key locking; SQLite WAL mode and `busy_timeout`.

## Further reading

- [awesome-scalability](https://github.com/binhnguyennus/awesome-scalability),
  a curated list of real engineering talks and writeups on scaling
  patterns, good for browsing analogous "one lock ruined everything"
  postmortems.
- [awesome-distributed-systems](https://github.com/theanalyst/awesome-distributed-systems),
  architecture-first reading rather than code, useful for the "what is
  the unit of concurrency" question this chapter turns on.
