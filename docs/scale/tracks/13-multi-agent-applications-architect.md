# Chapter 13 architect track: multi-agent applications

## By the end

- Decide when one agent with tools beats multiple agents.
- Design typed handoffs, bounded delegation, shared budgets, and terminal states.
- Locate orchestration separately from model reasoning.

## Questions to settle

- What measured limitation justifies each specialist?
- Is the flow sequential, parallel, delegated, or graph-shaped?
- Who owns retries, cancellation, budget, artifacts, and final synthesis?
- Which stage outputs are immutable evidence for later stages?

## Orient yourself on

- Chapters 5-8 for queueing, retries, budgets, and correlation.
- Chapter 12 for capability attenuation across delegation.
- Waku's loop as the single-agent baseline you must beat with evidence.

Pressure-test the plan against Chapter 14: context shared between agents needs
provenance and write policy, not merely a common transcript.
