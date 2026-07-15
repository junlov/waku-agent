# Waku at scale

Part two of the waku-agent teaching repo. Upstream teaches the skeleton of
an agent harness: the loop, the memory, the gate, the evals. This branch
teaches what breaks when thousands of users hit that skeleton, one
reproducible failure at a time.

## How this works

Every chapter is a scar from production, packaged:

1. **A brief** (this folder): one page on the concept and the failure you
   are about to reproduce.
2. **A failing load test** (`scale/tests/`): run it, watch the dashboard
   melt. It fails on purpose. It encodes the chapter's SLO.
3. **Your fix.** You implement it. The test passing inside SLO is done.
4. **A tag** (`chapter-NN-done`) so any chapter can be diffed against the
   simpler version of Waku that came before it.

Nothing here calls a real LLM. The `sim` provider fakes the model with
tunable latency, errors, rate limits, and hangs, so a laptop can simulate a
thousand tenants for free, and failure modes reproduce on demand instead of
at 2am.

## The rule that makes it teaching, not just infrastructure

Each chapter stays readable in one sitting. Real dependencies are allowed
(Postgres is Postgres), but they arrive one chapter at a time behind
optional extras, and every abstraction added must be explainable in the
brief in one paragraph.

## Curriculum

| # | Chapter | You will fix |
|---|---------|--------------|
| 0 | [The harness](00-harness.md) | nothing: this builds the instruments |
| 1 | [Baseline & SLOs](01-baseline-slos.md) | nothing yet: this measures honestly |
| 2 | [Concurrency](02-concurrency.md) | one global lock serializing every user |
| 3 | [Multi-tenancy](03-multi-tenancy.md) | every user sharing one brain and one memory |
| 4 | [Durable state](04-durable-state.md) | SQLite tapping out; queries that read whole tables |
| 5 | [Queueing & backpressure](05-queueing-backpressure.md) | meltdown under burst instead of graceful shedding |
| 6 | [Provider reliability](06-provider-reliability.md) | one flaky upstream taking down every turn |
| 7 | [Cost & abuse control](07-cost-abuse.md) | one hot tenant spending everyone's budget |
| 8 | [Observability](08-observability.md) | debugging by vibes |
| 9 | [Horizontal scale & deploy](09-horizontal-deploy.md) | the process that cannot be two processes |
| 10 | [Evals at scale](10-evals-at-scale.md) | shipping regressions to 100% of traffic |

Chapters 2 and 3 are the heart of "thousands of users". Chapters 4 to 7 are
the professional middle. Chapters 8 to 10 are polish; defer them freely.

Chapters 2 to 10 carry short briefs now (the scar, the reproduction, the
shape of the fix, done-when). Each gets expanded into its full assignment,
with the failing load test, when you reach it, so it can react to how you
actually solved the chapter before.
