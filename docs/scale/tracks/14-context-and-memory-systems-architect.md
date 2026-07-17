# Chapter 14 architect track: context and memory systems

## By the end

- Separate working context, retrieval indexes, durable memory, and source records.
- Define provenance, freshness, tenancy, retention, correction, and deletion.
- Choose retrieval and write policy from failure cost.

## Questions to settle

- What is remembered, by whom, for how long, and for which purpose?
- Which source remains authoritative when summaries or embeddings disagree?
- What can the model write directly, propose for review, or never retain?
- How do correction and deletion reach indexes, caches, and derived artifacts?

## Orient yourself on

- Waku memory interfaces and Chapter 3's tenant partitioning.
- Chapter 8's content-safe telemetry and Chapter 10's scratch shadow execution.
- Retrieval quality measures: relevance, groundedness, freshness, and leakage.

Pressure-test the plan against Chapter 15: ephemeral workers cannot use their
local filesystem as durable memory.
