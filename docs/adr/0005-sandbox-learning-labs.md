# ADR 0005: Container-backed curriculum labs

- Status: superseded
- Date: 2026-07-17
- Superseded by: ADR-0006

## Context

The curriculum explains production-agent failures and already provides deterministic checks, but the learner has to leave the lesson UI to run commands and manually carry evidence back into the learning journal. That breaks the learning loop and gives Waku no explicit, structured view of the experiment the learner chose to preserve.

The training app already runs in a constrained container with a persistent `/workspace` volume. Waku has full command ability inside that boundary, while the host Docker socket and host filesystem remain unavailable.

## Decision

Publish a lab contract for every curriculum chapter. Each contract contains a failure scenario, three objectives, and canonical measurement and verification commands. Its state is explicit:

- `runnable` means the deterministic instrument exists and may execute.
- `preview` means the lab workspace is authored, but the instrument is not published; every execution control remains disabled.

The dashboard exposes three lab operations:

1. Run a bounded command inside `WAKU_WORKSPACE` when `WAKU_SANDBOX=1`.
2. Persist redacted command results in SQLite as `lab_attempts`.
3. Attach a selected attempt to the chapter learning journal only after an explicit learner action.

The lesson UI exposes Lab as a first-class route beside the lesson and role tracks. Normal lesson pages link to it immediately below the tabs. The lab presents objectives, command console, canonical actions, and recent attempt history together. Git-backed chapter checks remain the only completion authority. Lab execution never writes a solution, advances a chapter, or converts terminal history into durable agent memory automatically.

Chapters 00 and 01 are runnable. Chapters 02 through 16 are authored previews because their briefs name future `make scale-NN` commands but the repository does not yet contain those instruments. Promoting a preview requires publishing the deterministic instrument and changing the contract state; the UI and API need no new chapter-specific code.

Local curriculum bundles use `Cache-Control: no-store` so a restarted self-healing workspace cannot leave an already-open lesson on stale JavaScript.

## Consequences

- The learner can reproduce, inspect, and discuss a failure without leaving the lesson.
- Waku receives only evidence the learner deliberately attaches to the journal.
- Lab history survives container restarts through the existing persistent data volume.
- Arbitrary lab commands have full workspace authority inside the container, but no Docker socket or host access.
- This is a bounded command console, not a full interactive PTY. Long-running or interactive terminal sessions need a separate terminal protocol if the curriculum later requires them.
- A complete lab surface does not imply a complete failure instrument. Preview state makes that distinction visible instead of presenting a fake runnable check.
