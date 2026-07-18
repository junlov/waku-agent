# Waku at scale and in production

Part two of the waku-agent teaching repo. Upstream teaches the skeleton of
an agent harness: the loop, the memory, the gate, the evals. This branch
teaches what breaks when thousands of users hit that skeleton and when the
agent crosses real production boundaries, one reproducible failure at a time.

Built to be learned by anyone, self-service, in the spirit of The Odin
Project: written lessons first, checkable completion, no instructor
required. (There is also a video series of the original learner going
through it; the writing stands alone.)

## Two tracks per chapter

Each chapter's brief (`docs/scale/NN-*.md`) covers the shared context: the
scar, how to reproduce it, the fix's shape, and the done-when criteria.
Beyond that, chapters 1 through 16 split into two companion files under
`docs/scale/tracks/`:

- `NN-*-architect.md`: learning outcomes, the design questions to settle
  before drafting a plan, and reading aimed at the tradeoff space.
- `NN-*-ai-engineer.md`: learning outcomes, a concrete build checklist,
  and reading aimed at the implementation itself.

Read the architect track first if you are practicing solution-architecture
and planning skill rather than hands-on coding: its decisions (where does
state live, what is the unit of concurrency) are inputs the engineer
track's checklist depends on. Read only the engineer track if you are
here to write the fix yourself and already know the shape you want.

Several of the architect track's questions are not engineering questions
at all, they are product, security, cost, or incident-response judgment
wearing an engineering costume. [`DECISION-LENSES.md`](DECISION-LENSES.md)
is a standalone framework for noticing which discipline's mental model a
given question actually needs, worth reading once before chapter 1 and
re-checking whenever a question feels easier than it should.

## Before chapter 1: pick a product scenario

The chapter briefs never say who these tenants are or what you promised
them, on purpose. [`PRODUCT-SCENARIO.md`](PRODUCT-SCENARIO.md) is where
you fix that once, deliberately, before drafting chapter 1's `SLO.md`:
pick an archetype (consumer freemium, embedded B2B, internal tool,
regulated vertical, or your own), write it into `docs/scale/SCENARIO.md`,
and commit it alongside your SLOs. Every later chapter's product-shaped
question (chapter 3's isolation model, chapter 5's shedding order,
chapter 7's budget policy) should trace back to that choice rather than
being decided fresh each time. It's a judgment call, not code, so nothing
stops you from re-running the curriculum under a different scenario later
to see how differently the same technical fixes get justified.

## How a chapter works

1. **Read the brief** (`docs/scale/NN-*.md`): the concept, and the failure
   you are about to reproduce.
2. **Record your learner baseline** while staying on `scale`:
   `python scripts/curriculum.py begin NN`. This creates a learner-owned tag
   at the current clean commit. Do not check out an old reference tag during
   the normal run; older tags may predate improvements to the teaching harness.
3. **Run the failing test and watch it melt**: `make scale-NN` runs the
   load, `make dashboard` in another terminal shows the meltdown live.
4. **Fix it.** The test encodes the chapter's SLO; `make check-NN` is the
   grade. No instructor in the loop: green inside SLO means done.
5. **Finish honestly**: update `PROGRESS.md`, commit the result, then run
   `python scripts/curriculum.py complete NN`. It reruns the check and records
   the pass. A review uses `git diff learner/chapter-NN-start`.
6. **Compare only after your attempt**: `git diff chapter-NN-solution` shows
   the maintainer's reference fix. Stuck is allowed, but looking early trades
   away the lesson.

## Tags

| Tag | Meaning |
|-----|---------|
| `chapter-NN-start` | published code baseline; also means the chapter is runnable |
| `chapter-NN-solution` | maintainer's reference fix |
| `learner/chapter-NN-start` | this learner's clean review baseline |
| `learner/chapter-NN-passed` | this learner passed the real check |

Reference solutions exist so the curriculum is reproducible; your own
solution is the one that teaches you. Diff them.

The state tool deliberately ignores reference-solution tags when deciding
whether you passed. A cloned repository can contain every reference without
claiming that the learner completed anything.

## Setup

```bash
git clone <your fork> && cd waku-agent && git checkout scale
./scripts/session-init.sh   # env + fast checks + where you are (run every session)
make check-00               # instrument check: needs no API key, ever
```

Working with an AI assistant? It should read `AGENTS.md` first (Claude Code
and most agents do this automatically). It encodes the reviewer-not-author
rule below, the one-chapter scope, and the session lifecycle, so your agent
behaves like a coach out of the box. Session handoffs live in
[PROGRESS.md](PROGRESS.md); reviews use the `chapter-review` skill.

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

The dashboard UI is implemented in `frontend/`. Its React/Vite shell owns the
learner surface, router, navigation, page framing, and data polling; unmigrated
evidence panels remain behind the legacy view adapter. It consumes Factory's
immutable `ui-v1.1.0` tag; `make frontend-check` typechecks and regenerates the
versioned assets under `waku/ops/static/react/`. The Python runtime and
container only serve those assets and do not install Node dependencies.

**Runnable now:** chapters 0 and 1. Chapters 2 through 16 already have briefs
and track-specific preparation, but their load tests and `make check-NN`
targets are added as the curriculum reaches them. The startup command will not
advance into a chapter until its `chapter-NN-start` tag exists.

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
| 11 | [Typed agent contracts](11-typed-agent-contracts.md) | schema drift and permissive boundaries | `make check-11` |
| 12 | [Trust boundaries & approvals](12-trust-boundaries-and-approvals.md) | model-controlled identity, authority, and effects | `make check-12` |
| 13 | [Multi-agent applications](13-multi-agent-applications.md) | incoherent handoffs, delegation, and budgets | `make check-13` |
| 14 | [Context & memory systems](14-context-and-memory-systems.md) | stale, poisoned, or cross-tenant context | `make check-14` |
| 15 | [Production container contract](15-production-container-contract.md) | works-local images that fail hosted constraints | `make check-15` |
| 16 | [Durable agent execution](16-durable-agent-execution.md) | lost progress and duplicate side effects | `make check-16` |

Chapters 2 and 3 are the heart of "thousands of users". Chapters 4 to 10
build the operating system around that traffic. Chapters 11 to 16 teach the
production-agent boundaries that transfer across frameworks and cloud vendors.
Use the [competency map](PRODUCTION-AGENT-COMPETENCIES.md) to see how the
sequence prepares you to design a new system without copying Waku's stack.
Chapters 2+ carry short briefs now and get their full assignment
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
