# Waku at scale

Part two of the waku-agent teaching repo. Upstream teaches the skeleton of
an agent harness: the loop, the memory, the gate, the evals. This branch
teaches what breaks when thousands of users hit that skeleton, one
reproducible failure at a time.

Built to be learned by anyone, self-service, in the spirit of The Odin
Project: written lessons first, checkable completion, no instructor
required. (There is also a video series of the original learner going
through it; the writing stands alone.)

## How a chapter works

1. **Read the brief** (`docs/scale/NN-*.md`): the concept, and the failure
   you are about to reproduce.
2. **Start from the chapter's start tag** so everyone begins from the same
   known-good state, whatever happened in your previous chapter:
   `git checkout chapter-NN-start -b my-chapter-NN`
3. **Run the failing test and watch it melt**: `make scale-NN` runs the
   load, `make dashboard` in another terminal shows the meltdown live.
4. **Fix it.** The test encodes the chapter's SLO; `make check-NN` is the
   grade. No instructor in the loop: green inside SLO means done.
5. **Compare**: `git diff chapter-NN-solution` shows the reference fix.
   Stuck is allowed; the next chapter's start tag IS the reference
   solution, so you can always move on and come back.

## Tags

| Tag | Meaning |
|-----|---------|
| `chapter-NN-start` | the exact code a chapter begins from |
| `chapter-NN-solution` | the reference fix (identical to `chapter-NN+1-start`) |

Reference solutions exist so the curriculum is reproducible; your own
solution is the one that teaches you. Diff them.

## Setup

```bash
git clone <your fork> && cd waku-agent && git checkout scale
uv venv && uv pip install -e '.[eval]'
make check-00        # instrument check: needs no API key, ever
```

Load tests run on the `sim` provider: a fake model with tunable latency
and injected failures (see `waku/loop/sim_client.py`). No key, no cost,
and failures reproduce on demand. Real model keys are only for playing
with the assistant itself.

## The AI-assistance rule

You will have an AI assistant open while you do this; so did the person
who wrote it. The rule that keeps the learning yours:

**AI as rubber duck and reviewer, not author.** Ask it to explain the
brief, critique your plan, review your diff, explain a failure. Do not ask
it to write the fix. The moment it writes the code, the chapter taught it,
not you. (Corollary: pasting the failing test output and asking "why" is
great; pasting the brief and asking "implement this" defeats the repo.)

## Curriculum

| # | Chapter | You will fix | Check |
|---|---------|--------------|-------|
| 0 | [The harness](00-harness.md) | nothing: instrument check | `make check-00` |
| 1 | [Baseline & SLOs](01-baseline-slos.md) | nothing: measure, then write `SLO.md` | `make check-01` |
| 2 | [Concurrency](02-concurrency.md) | one global lock serializing every user | `make check-02` |
| 3 | [Multi-tenancy](03-multi-tenancy.md) | every user sharing one brain and one memory | `make check-03` |
| 4 | [Durable state](04-durable-state.md) | SQLite tapping out; queries that read whole tables | `make check-04` |
| 5 | [Queueing & backpressure](05-queueing-backpressure.md) | meltdown under burst instead of graceful shedding | `make check-05` |
| 6 | [Provider reliability](06-provider-reliability.md) | one flaky upstream taking down every turn | `make check-06` |
| 7 | [Cost & abuse control](07-cost-abuse.md) | one hot tenant spending everyone's budget | `make check-07` |
| 8 | [Observability](08-observability.md) | debugging by vibes | `make check-08` |
| 9 | [Horizontal scale & deploy](09-horizontal-deploy.md) | the process that cannot be two processes | `make check-09` |
| 10 | [Evals at scale](10-evals-at-scale.md) | shipping regressions to 100% of traffic | `make check-10` |

Chapters 2 and 3 are the heart of "thousands of users". Chapters 4 to 7
are the professional middle. Chapters 8 to 10 are polish; defer them
freely. Chapters 2+ carry short briefs now and get their full assignment
(expanded brief + failing test) as the curriculum reaches them.

## The rule that keeps it teaching, not just infrastructure

Each chapter stays readable in one sitting. Real dependencies are allowed
(Postgres is Postgres), but they arrive one chapter at a time behind
optional extras, and every abstraction added must be explainable in its
brief in one paragraph.

## Sharing your run

Passed a chapter? Open a GitHub Discussion with your `make check-NN`
output and (optionally) a link to your branch: solutions are diffable
against each other by design, and reading three strangers' chapter 2 is a
lesson chapter 2 itself cannot teach.
