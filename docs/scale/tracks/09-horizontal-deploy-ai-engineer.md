# Chapter 9 AI engineer track: horizontal scale and deploy

Companion to `docs/scale/09-horizontal-deploy.md`. Read that brief first,
and read the architect track's decision on where session state moves
before building: this determines whether you're building against
Postgres, Redis, or both.

## By the end of this chapter, you'll be able to

- Eliminate the module-level `_agent` singleton and make workers
  stateless, with session state in shared storage.
- Implement cross-worker session ordering (a distributed lock or a
  session-to-queue mapping), not sticky routing.
- Implement graceful shutdown: stop admitting on SIGTERM, drain
  in-flight turns, then exit.

## Build this

1. Eliminate the module-level `_agent` singleton in
   `waku/ops/dashboard.py:39-43`; move session state into the shared
   storage the architect track chose (Postgres from chapter 4, Redis
   behind `[scale-queue]`, or both).
2. Move the chapter 5 queue to the same shared storage so any worker can
   pick up any turn.
3. Implement cross-worker ordering for a single session: a distributed
   lock (Postgres advisory lock or Redis-based) or a session-to-queue
   mapping that guarantees one worker at a time per session, not sticky
   routing to one worker.
4. Make `waku/memory/consolidation.py`'s background work run once
   cluster-wide (e.g., a leader-elected job or a dedicated worker role),
   not once per process.
5. Implement graceful shutdown: on SIGTERM, stop admitting new work,
   drain in-flight turns to completion, then exit, so a rolling deploy
   loses zero completed turns.
6. Stand up the docker compose reference cluster: proxy, 3 workers,
   Postgres, Redis.
7. Run `make check-09`: the 3-worker cluster must pass chapters 3 and
   5's tests, killing any single worker mid-load must lose zero
   completed turns and leak nothing, and a rolling restart under load
   must go unnoticed by the loadgen.

## Read before you start

- `waku/ops/dashboard.py:39-43` (the singleton to eliminate) and
  `waku/runtime/session.py` (what state needs to move).
- `waku/memory/consolidation.py` (background work to make run
  cluster-wide).

## Further reading

- [Redis: Distributed Locks](https://redis.io/docs/latest/develop/use/patterns/distributed-locks/),
  if Redis is the chosen shared-state backend for cross-worker locking.
