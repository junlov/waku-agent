# Chapter 4 architect track: durable state

Companion to `docs/scale/04-durable-state.md`. Read that brief first for
the scar, the reproduction, the fix in shape, and the done-when criteria.

## By the end of this chapter, you'll be able to

- Separate "query discipline" fixes from "storage engine" fixes, and
  explain why the cheap one should be measured first.
- Explain why connection pool size is derived from the chapter 2 worker
  pool, not chosen on its own.
- Name the one thing FTS5 to Postgres migration cannot do a drop-in
  replacement for, and what "good enough" means for it here.

## Questions to settle before you draft the plan

A design review's opening questions, not a memorization test; a
defensible position is enough to start drafting.

- Two independent fixes are bundled here (query discipline vs. the
  Postgres migration): which do you sequence first, and what evidence
  would justify that order? (The brief hints "cheap, do it first, measure
  the win".)
- Connection pool sizing has to derive from chapter 2's worker pool, not
  be chosen independently. What is that relationship, concretely?
- FTS5 has no drop-in Postgres equivalent (`tsvector` is close). Accept
  the semantic diff in retrieval quality, or invest in closing the gap?
  What does "good enough" mean here?

## Orient yourself on

- `waku/db.py` (schema, indexes or the lack of them) and
  `waku/ops/dashboard.py:205` (`collect()`, which currently re-reads
  whole tables every 5s).
- `waku/memory/semantic/store.py` alongside `waku/memory/semantic/supabase_store.py`:
  this branch already has a Postgres-flavored sibling store to study the
  interface shape from.
- Concepts: SQLite WAL mode limits at scale; index/pagination discipline;
  connection pooling (why an unbounded pool under chapter 2's concurrency
  looks like a hang, not an error); full-text search (`tsvector`) as the
  Postgres analog to FTS5.

## Further reading

- [Designing Data-Intensive Applications](https://www.oreilly.com/library/view/designing-data-intensive-applications/9781491903063/)
  by Martin Kleppmann (official listing). The storage/retrieval and
  partitioning chapters directly back this chapter's tradeoffs.
