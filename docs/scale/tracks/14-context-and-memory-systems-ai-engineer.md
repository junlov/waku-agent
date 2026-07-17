# Chapter 14 AI engineer track: context and memory systems

## By the end

- Enforce provenance and tenant scope through retrieval and memory writes.
- Evaluate retrieval separately from answer quality.
- Correct and delete records across derived storage.

## Build this

1. Define record metadata and authoritative source references.
2. Split working context, durable memory, indexes, and caches behind interfaces.
3. Enforce tenant-scoped retrieval plus independent read and write policy.
4. Add write review, correction, deletion propagation, and scratch replay.
5. Make `make check-14` inject stale, poisoned, conflicting, and cross-tenant data.

Measure retrieved evidence and final answers separately so one cannot hide the
other's failure.
