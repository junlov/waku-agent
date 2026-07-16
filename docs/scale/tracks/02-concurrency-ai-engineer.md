# Chapter 2 AI engineer track: concurrency

Companion to `docs/scale/02-concurrency.md`. Read that brief first, and
read the architect track's decisions before building: this chapter's
correct implementation depends on which unit of concurrency was chosen
(session, tenant, or turn), not just on writing "a" fix.

## By the end of this chapter, you'll be able to

- Implement per-session serialization that does not block unrelated
  sessions, using either a lock-per-session or a queue-per-session.
- Configure SQLite for concurrent access correctly (WAL mode, busy
  timeout, short write transactions) or build a single-writer queue.
- Size and implement a bounded worker pool, and make pool exhaustion fail
  visibly rather than hang.

## Build this

1. Replace the single global `_agent_lock` in `waku/ops/dashboard.py`
   with per-session serialization (a dict of session id to lock, or a
   per-session queue), guarding only the section of `Waku.respond` that
   mutates session history in place.
2. Check `waku/memory/consolidation.py` for background writes that can
   race with an in-flight turn on the same session; the brief flags this
   explicitly as a trap, not a hypothetical.
3. Switch `waku/db.py`'s SQLite connection to WAL mode with a
   `busy_timeout`, or build a dedicated single-writer thread/queue if you
   want a hard guarantee instead of a soft retry-on-lock.
4. Build a bounded worker pool (thread pool, or an asyncio semaphore if
   you're moving that direction) sized to something you can defend, not
   an arbitrary constant.
5. Confirm the dashboard's 5s `collect()` poll doesn't read torn state
   or deadlock against your new per-session locks while a turn is
   writing.
6. Run `make check-02`: chapter 1's SLO must hold at 50 tenants, and a
   single hung session (sim hang) must not delay any other session's
   turns.

## Read before you start

- `waku/ops/dashboard.py:43` and `:512` (the two locks you're replacing)
  and `:937` (`ThreadingHTTPServer`, confirming requests really do arrive
  concurrently).
- `waku/loop/agent.py` (`Waku.respond`, the exact mutation you need to
  guard) and `waku/db.py` (current SQLite connection setup).
- `waku/memory/consolidation.py` (the mid-turn write race named in the
  brief's traps).

## Further reading

- [SQLite: Write-Ahead Logging](https://www.sqlite.org/wal.html), the
  official documentation for the WAL mode this chapter's fix likely
  depends on.
- [Python `threading` module docs](https://docs.python.org/3/library/threading.html),
  for `Lock`, and whether a per-session dict-of-locks or a different
  primitive fits better here.
