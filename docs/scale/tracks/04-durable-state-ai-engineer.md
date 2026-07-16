# Chapter 4 AI engineer track: durable state

Companion to `docs/scale/04-durable-state.md`. Read that brief first, and
read the architect track's sequencing decision (query discipline first,
then migration) before building, since doing the migration first makes it
harder to isolate which fix moved the number.

## By the end of this chapter, you'll be able to

- Fix the specific queries that scan whole tables, with indexes and
  pagination, and measure the win before touching the storage engine.
- Write a Postgres store sibling to an existing `Sqlite*Store` interface,
  and a migration script that round-trips real data losslessly.
- Size a connection pool correctly against the chapter 2 worker pool
  instead of picking an arbitrary number.

## Build this

1. Profile `waku/ops/dashboard.py:205`'s `collect()` and the query paths
   under chapter 3's load; find the queries doing full-table scans.
2. Add indexes and rewrite `collect()` to fetch counts and windows
   instead of whole tables. Measure the win on its own, before touching
   Postgres, so you can name the number this step alone moved.
3. Stand up Postgres behind the `[scale-db]` extra with a docker compose
   service.
4. Write a Postgres sibling to `SqliteFactStore` (and any other
   `Sqlite*Store`), using `waku/memory/semantic/supabase_store.py` as a
   reference for the interface shape, since it's already a Postgres-family
   store in this codebase.
5. Write a migration script for existing `.waku/state.db` data and verify
   it round-trips losslessly against a real database, not just a fixture.
6. Size the connection pool against the chapter 2 worker pool's
   concurrency, not independently; verify pool exhaustion fails
   visibly rather than hanging.
7. Decide what to do about FTS5 having no drop-in Postgres equivalent
   (`tsvector` is the closest analog) and implement whichever the
   architect track's tradeoff call was.
8. Run `make check-04`: the fat-database load must meet chapter 1's SLO
   on Postgres, and the migration script must round-trip a real
   `.waku/state.db` losslessly.

## Read before you start

- `waku/db.py` (schema and current indexing) and
  `waku/ops/dashboard.py:205` (`collect()`).
- `waku/memory/semantic/store.py` and
  `waku/memory/semantic/supabase_store.py` (the interface to extend).

## Further reading

- [SQLite: Write-Ahead Logging](https://www.sqlite.org/wal.html), for
  understanding the limits you're migrating away from.
- [PostgreSQL: Full Text Search](https://www.postgresql.org/docs/current/textsearch.html),
  the `tsvector` mechanics that replace FTS5.
