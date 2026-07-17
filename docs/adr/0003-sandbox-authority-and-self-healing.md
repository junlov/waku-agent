# ADR-0003: Make the sandbox, not a command allowlist, the authority boundary

- Status: accepted
- Date: 2026-07-16

## Context

Waku is intended to learn how to diagnose and repair its own harness. A
curriculum-only command adapter lets it measure lessons, but cannot inspect an
unknown failure, patch its runtime, run the right test, or reload repaired code.
Giving that authority to a host-side agent would expose the developer checkout.

The training deployment already runs in a Colima Docker VM. That container is
the correct authority boundary if its writable state is explicit and recovery
does not depend on the code being repaired.

## Decision

The container receives three distinct filesystems:

- `/seed`: a sanitized repository copy baked into the image. It is the
  immutable source for first boot and supervisor code; the running container
  has no host filesystem mount.
- `/workspace`: a named volume containing Waku's mutable, persistent code copy.
- `/var/lib/waku`: a separate named volume containing SQLite, provider settings,
  restart requests, and the last-known-good workspace checkpoint.

`run_command` is registered only when `WAKU_SANDBOX=1`. It accepts arbitrary
shell commands, always starts in `/workspace`, bounds time and returned output,
and otherwise does not pretend an allowlist is a sandbox. A normal host-side
Waku process never registers it.

An immutable supervisor seeds `/workspace` without copying `.env`, virtual
environments, caches, or dependency trees. It launches the dashboard from the
mutable workspace. Waku may request a delayed restart after repair and tests.
The supervisor health-checks that candidate: healthy code becomes the new
last-known-good checkpoint; unhealthy code is replaced by the prior checkpoint
and restarted.

The container has a read-only root filesystem, all Linux capabilities dropped,
`no-new-privileges`, and no Docker socket. It retains outbound network access
because Waku must call model providers. Provider credentials inside the runtime
volume are therefore visible to code with sandbox authority; a future provider
proxy is required if credential isolation becomes a goal.

Curriculum authorship remains a separate policy boundary. Full shell authority
may repair harness plumbing, but Waku must not implement an unpassed lesson for
the learner.

## Consequences

- Waku can inspect, edit, test, and reload its own sandbox copy.
- Container deletion does not delete repaired code, journals, SQLite, or keys.
- A bad restart recovers without relying on the mutable harness.
- Host source is neither readable nor writable at runtime; a rebuilt image can
  reseed a fresh workspace.
- This protects the host checkout and container runtime, not secrets or network
  destinations available from inside the sandbox.

## Recovery

Stop the container and run `make docker-reset-workspace`. This deletes only the
mutable code volume; the next `make docker-dashboard` rebuilds the sanitized
image and reseeds the workspace from `/seed`.
The `waku-training-data` volume, including SQLite and provider settings, remains
intact. Delete that data volume separately only when intentionally resetting
all durable agent state.
