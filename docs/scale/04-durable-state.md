# Chapter 4: durable state (short brief; expanded when you start it)

**The scar:** SQLite carried you further than people admit, but it is one
file on one disk with one writer. And the dashboard's `collect()` currently
re-reads entire tables every 5 seconds, which nobody notices with one
user's data and everybody notices with a thousand tenants' worth.

**You will reproduce:** `make scale-04` runs chapter 3's load with a fat
pre-seeded database (100k facts, 500k chat rows). Watch turn latency and
the dashboard poll degrade together as reads scan and the single writer
queues.

**The fix, in shape:** two independent halves. First, query discipline:
indexes, pagination, and making `collect()` fetch counts and windows
instead of whole tables (cheap, do it first, measure the win). Second, the
migration: Postgres behind the `[scale-db]` extra with a docker compose
service, a real migration script for existing data, connection pooling
sized against your worker pool, and the store interfaces
(`SqliteFactStore` etc.) growing a Postgres sibling, which is exactly what
those interfaces existed for.

**Traps ahead:** FTS5 has no drop-in Postgres twin (tsvector is close
enough; the diff is a lesson); pool exhaustion under chapter 2's
concurrency looks like a hang, not an error; migrations against live
traffic are their own discipline.

**Done when:** the fat-database load meets SLO on Postgres, the migration
script round-trips a real `.waku/state.db` losslessly, and you can name the
first query you fixed and the number it moved.
