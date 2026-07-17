# Waku production-agent curriculum expansion

Date: 2026-07-16
Status: approved by the learner

## Context

The scale curriculum currently teaches how a single-user agent fails under
shared traffic. That remains necessary, but it stops before several boundaries
that distinguish a scalable demo from a production agent system: typed agent
contracts, trusted execution context, multi-agent application control flow,
context and memory policy, production container parity, and durable execution.

The learner wants Waku itself to teach those competencies. Other projects are
evidence for what matters, not destinations for Waku artifacts and not sources
of product-specific policy.

## Decision

Preserve Chapters 0-10 and append six production-agent chapters:

| # | Module | Failure made visible |
|---|--------|----------------------|
| 11 | Typed agent contracts | prompt-shaped JSON and handwritten schemas drift across runtimes |
| 12 | Trust boundaries and approvals | caller/model data accidentally grants identity, authority, or side effects |
| 13 | Multi-agent applications | prose handoffs, unbounded delegation, and per-agent budgets make the system incoherent |
| 14 | Context and memory systems | stale, poisoned, cross-tenant, or unauthorized context becomes confident output |
| 15 | Production container contract | an image that boots locally fails under non-root, read-only, ephemeral, signal-driven hosting |
| 16 | Durable agent execution | retries duplicate effects, worker loss erases progress, and cancellation cannot cross the boundary |

Each module keeps the existing brief plus architect/AI-engineer track shape.
The brief owns the scar, reproduction, solution shape, traps, and measurable
done criteria. The architect track owns the decision space and the next
module's pressure. The AI-engineer track owns the observable build checklist
and deterministic/failure-injection evidence.

## Strengthen existing modules

The expansion does not postpone every production concern until Chapter 11.
Existing chapters gain explicit preparation for the later modules:

- Chapter 1 distinguishes ingress, execution, and terminal-result SLOs.
- Chapter 3 treats identity as trusted runtime context, never prompt authority.
- Chapter 5 introduces durable command IDs, claims, deduplication, and expiry.
- Chapter 6 separates model correction, provider transport, and activity retries.
- Chapter 7 shares one usage budget across stages, retries, and fallbacks.
- Chapter 8 carries run, tenant, stage, and attempt correlation without content leaks.
- Chapter 9 requires an immutable, stateless worker and evidence-based concurrency.
- Chapter 10 validates typed contracts and side-effect-free shadow execution.

## Portability rules

- Teach contracts and failure modes, not a specific framework or cloud vendor.
- Waku's hand-written loop remains the readable specimen; frameworks may appear
  only as comparison labs or adapters.
- Product policy stays outside the runtime lesson. Tenant plans, pricing,
  domain workflow names, and vendor product IDs never enter the curriculum.
- SQLite, Postgres, Redis, queues, workflow engines, container platforms, and
  telemetry backends are options to evaluate against a contract, not answers
  embedded in the question.
- Every chapter ends in evidence that can be rerun without a paid model call.

## Learner feedback loop

Every module must provide:

1. a deterministic red proof that exhibits the scar;
2. an observable implementation target rather than a reading-only assignment;
3. a green check with correctness and operational evidence;
4. one explanation the learner must be able to give in their own words;
5. a next-module pressure test that prevents locally optimal shortcuts.

## Non-goals

- Rebuilding Waku around PydanticAI, Temporal, or any other framework.
- Turning Waku into a hosted product or a reusable production SDK.
- Copying another project's architecture, product concepts, or deployment plan.
- Publishing reference solutions before the corresponding failing instrument is
  complete and the learner reaches that chapter.

## Completion criteria

- The catalog, design record, competency map, and state machine declare 0-16.
- Chapters 11-16 each have a brief and both learning tracks.
- Existing chapters carry the cross-cutting production-agent preparation above.
- The harness verifies documentation completeness but does not mark an
  uninstrumented chapter runnable; a `chapter-NN-start` tag remains the gate.
- Startup, lint, offline evals, and curriculum harness checks remain green.
