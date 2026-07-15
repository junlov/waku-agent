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

## Architect prep

**By the end of this chapter, you'll be able to:**
- Separate "query discipline" fixes from "storage engine" fixes, and
  explain why the cheap one should be measured first.
- Explain why connection pool size is derived from the chapter 2 worker
  pool, not chosen on its own.
- Name the one thing FTS5 to Postgres migration cannot do a drop-in
  replacement for, and what "good enough" means for it here.

**Questions to settle before you draft the plan** (a design review's
opening questions, not a memorization test; a defensible position is
enough to start drafting):
- Two independent fixes are bundled here (query discipline vs. the
  Postgres migration): which do you sequence first, and what evidence
  would justify that order? (The brief hints "cheap, do it first, measure
  the win".)
- Connection pool sizing has to derive from chapter 2's worker pool, not
  be chosen independently. What is that relationship, concretely?
- FTS5 has no drop-in Postgres equivalent (`tsvector` is close). Accept
  the semantic diff in retrieval quality, or invest in closing the gap?
  What does "good enough" mean here?

**Read before you start:**
- `waku/db.py` (`collect()`-adjacent schema, indexes or the lack of them)
  and `waku/ops/dashboard.py:205` (`collect()`, which currently re-reads
  whole tables every 5s).
- `waku/memory/semantic/store.py` alongside `waku/memory/semantic/supabase_store.py`:
  this branch already has a Postgres-flavored sibling store to study the
  interface shape from.
- Concepts: SQLite WAL mode limits at scale; index/pagination discipline;
  connection pooling (why an unbounded pool under chapter 2's concurrency
  looks like a hang, not an error); full-text search (`tsvector`) as the
  Postgres analog to FTS5.

**Further reading:**
- [Designing Data-Intensive Applications](https://www.oreilly.com/library/view/designing-data-intensive-applications/9781491903063/)
  by Martin Kleppmann (official listing). The storage/retrieval and
  partitioning chapters directly back this chapter's tradeoffs.
