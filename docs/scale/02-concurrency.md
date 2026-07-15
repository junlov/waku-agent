# Chapter 2: concurrency (short brief; expanded when you start it)

**The scar:** one global lock means one user at a time. Ten users share one
throughput. This is the flat line you measured in chapter 1.

**You will reproduce:** `make scale-02` ramps to 50 concurrent tenants and
fails your `SLO.md` numbers, loudly.

**The fix, in shape:** find the real unit of safe concurrency. Turns within
one session must stay ordered; turns across sessions must not wait on each
other. That means per-session serialization (a lock or queue per session,
not per process), a worker pool sized to the machine, and surviving SQLite's
one-writer rule (WAL mode, busy timeouts, short write transactions, or a
write queue). The GIL is fine here: turns are I/O-bound waiting on the
model.

**Traps ahead:** the shared `Waku` agent object mutates session history in
place; consolidation writes from mid-turn; the dashboard's 5s poll reads
while you write.

**Done when:** chapter 1's SLO holds at 50 tenants, correctness checks still
pass, and a single slow session (sim hang) no longer delays anyone else.

## Architect prep

**By the end of this chapter, you'll be able to:**
- Name the unit of safe concurrency (process, tenant, session, or turn)
  and defend why it is the right one for this system.
- Explain why the GIL is a non-issue here but SQLite's one-writer rule
  is not.
- Describe the difference between a lock-per-session and a queue-per-session
  design, and what each costs under load.

**Questions to settle before you draft the plan** (a design review's
opening questions, not a memorization test; a defensible position is
enough to start drafting):
- What is the actual unit of serialization: a lock per session, a queue per
  session, or something else? What breaks if two turns in the *same*
  session interleave?
- SQLite's one-writer rule: WAL mode plus busy timeouts, or a single
  write-queue thread? What is the failure mode of each once you hit your
  chapter 1 p95 target?
- Worker pool sizing: a fixed count, or scaled to something (cores,
  concurrent sessions)? What happens on exhaustion, and how is that
  different from what happens today under the global lock?

**Read before you start:**
- `waku/ops/dashboard.py:43` and `:512` (the two module-level locks) and
  `:937` (`ThreadingHTTPServer`).
- `waku/loop/agent.py` (`Waku.respond`, the thing the lock is protecting)
  and `waku/db.py` (SQLite connection handling, one file, one writer).
- Concepts: the GIL and why it does not matter for I/O-bound work; lock
  striping / per-key locking; SQLite WAL mode and `busy_timeout`.

**Further reading:**
- [awesome-scalability](https://github.com/binhnguyennus/awesome-scalability),
  a curated list of real engineering talks and writeups on scaling
  patterns, good for browsing analogous "one lock ruined everything"
  postmortems.
- [awesome-distributed-systems](https://github.com/theanalyst/awesome-distributed-systems),
  architecture-first reading rather than code, useful for the "what is
  the unit of concurrency" question this chapter turns on.
