# Chapter 9: horizontal scale and deploy (short brief; expanded when you start it)

Two tracks exist for the prep work: `tracks/09-horizontal-deploy-ai-engineer.md`
(build the fix) and `tracks/09-horizontal-deploy-architect.md` (decide the
shape of the fix). Pick the one that matches what you are practicing, or
read both, in that order.

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
