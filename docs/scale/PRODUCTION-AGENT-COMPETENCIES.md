# Production-agent competency map

## Mission

Use a small agent whose entire loop can be understood to learn how production
agent systems fail, how to make the failures reproducible, and how to defend an
architecture with evidence. The objective is transferable engineering judgment,
not memorizing Waku or adopting one framework, database, queue, or cloud.

## How the course teaches

Every chapter follows the same tight feedback loop:

1. **See the scar.** Run a deterministic workload that makes one failure class
   undeniable.
2. **Name the contract.** State which behavior, trust boundary, or service level
   the system must preserve.
3. **Choose deliberately.** Compare viable designs against this chapter and the
   next chapter's pressure.
4. **Build one bounded fix.** Change only the current failure's blast radius.
5. **Prove mastery.** Pass the automated check and explain why the result is not
   merely symptom masking.

The architect and AI-engineer tracks teach the same competency from different
angles. Architecture practice produces a defensible decision and verification
plan. Engineering practice produces the implementation and evidence. Neither
track is a shortcut around understanding the failure.

## Competency sequence

| Phase | Chapters | What becomes trustworthy |
|-------|----------|--------------------------|
| Measure | 0-1 | the instrument, workload, and service promise |
| Isolate | 2-3 | concurrent sessions and tenant authority |
| Operate under pressure | 4-7 | state, admission, providers, and cost |
| Run as a service | 8-10 | telemetry, horizontal deployment, and safe rollout |
| Define agent behavior | 11-13 | contracts, authority, and specialist coordination |
| Survive production reality | 14-16 | context, container hosting, and durable execution |

## Mastery matrix

| # | Competency | Mastery evidence |
|---|------------|------------------|
| 0 | Trust the harness | full simulated conversations traverse the real API and report non-zero measurements |
| 1 | Define useful SLOs | latency, correctness, and error promises are tied to a product scenario and workload boundary |
| 2 | Choose a concurrency unit | independent sessions progress while one slow session remains ordered and isolated |
| 3 | Carry trusted tenant identity | concurrent leak tests cover state, tools, traces, and metering, not just prompt text |
| 4 | Move authority to durable state | indexed shared storage survives realistic data volume and migration |
| 5 | Bound demand | overload sheds honestly, deadlines expire before execution, and retries do not amplify collapse |
| 6 | Contain provider failure | retry budgets, breakers, and fallbacks meet SLOs under deterministic faults |
| 7 | Bound spend and abuse | one run and one tenant cannot exceed their shared token/tool/cost budget |
| 8 | Diagnose from telemetry | a hidden failure is localized by correlated, content-safe evidence |
| 9 | Run stateless workers | worker loss and rolling restart preserve accepted work without sticky-session dependence |
| 10 | Roll out behavior safely | shadow and canary evidence block a worse agent configuration automatically |
| 11 | Version typed contracts | invalid and incompatible agent inputs, outputs, and events fail at explicit boundaries |
| 12 | Separate data from authority | identity and approval cannot be forged through prompts, tool arguments, or model output |
| 13 | Coordinate specialists | typed handoffs, fixed control flow, shared budgets, and terminal states remain inspectable |
| 14 | Govern context and memory | retrieval and writes are scoped, attributable, freshness-aware, and resistant to poisoning |
| 15 | Prove container parity | the immutable image passes non-root, read-only, health, readiness, shutdown, and secret tests |
| 16 | Execute durably | duplicate delivery, worker death, cancellation, and resume preserve each effect's explicitly proved guarantee |

## Transfer test

A lesson is transferable when the learner can take an unfamiliar agent system
and identify:

- its ingress and terminal-result contracts;
- which IDs and capabilities are trusted and where they are constructed;
- which state is authoritative, durable, ephemeral, or generated;
- where concurrency, retries, queues, and budgets multiply work;
- how context enters and leaves the model boundary;
- what happens when a process dies after each possible side effect;
- which evidence would justify deployment or rollback.

If the answer depends on a vendor name instead of an observable contract, the
lesson is not finished.
