# Chapter 13 AI engineer track: multi-agent applications

## By the end

- Implement deterministic orchestration around probabilistic stages.
- Enforce typed handoffs, graph limits, shared budgets, and terminal semantics.
- Replay a run from durable stage evidence.

## Build this

1. Start with one staged workflow and justify every agent boundary.
2. Define typed inputs, outputs, artifact references, and failure states per stage.
3. Enforce allowed edges, depth, fan-out, and one shared usage budget.
4. Propagate cancellation and correlation through every stage.
5. Make `make check-13` inject duplicate, looping, over-budget, and partial failure.

Do not add a graph framework until the deterministic fixture proves it is needed.
