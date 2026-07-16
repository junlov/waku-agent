# Chapter 2: concurrency (short brief; expanded when you start it)

Two tracks exist for the prep work: `tracks/02-concurrency-ai-engineer.md`
(build the fix) and `tracks/02-concurrency-architect.md` (decide the
shape of the fix). Pick the one that matches what you are practicing, or
read both, in that order, since the architect track's decisions are what
the engineer track implements.

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
