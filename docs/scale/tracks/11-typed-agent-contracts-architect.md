# Chapter 11 architect track: typed agent contracts

Read `docs/scale/11-typed-agent-contracts.md` first.

## By the end

- Separate public contracts from runtime implementation types.
- Choose strictness, versioning, compatibility, and error semantics deliberately.
- Explain which component owns each schema and migration.

## Questions to settle

- Which boundaries require commands, results, events, or tool schemas?
- Are unknown fields rejected, ignored, or quarantined, and why?
- How long must an older producer interoperate with a newer consumer?
- Which failures are retryable, terminal, or operator-actionable?

## Orient yourself on

- `waku/loop/` and `waku/tools/`: find every place structured data enters or exits.
- `evals/dataset.jsonl`: distinguish an evaluation fixture from a runtime contract.
- [JSON Schema Draft 2020-12](https://json-schema.org/draft/2020-12).

Pressure-test the plan against Chapter 12: validated caller data is still not
trusted authority.
