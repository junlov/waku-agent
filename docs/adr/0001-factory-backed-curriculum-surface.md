# ADR-0001: Introduce a Factory-backed curriculum surface incrementally

- Status: accepted
- Date: 2026-07-16

## Context

The dashboard currently implements the curriculum surface and the system
workspace in one build-free HTML/CSS/JavaScript implementation. The curriculum
has begun recreating token, slot, navigation, interaction, and visual-quality
work already maintained by Factory's `@landing-factory/ui` package. Replacing
the entire system workspace at once would put working chat, memory, tools,
database, and Ops behavior inside the same migration blast radius.

The existing `/api/curriculum` response is already a deep module interface: it
hides Markdown discovery, Git-derived progress, track loading, and curriculum
metadata behind one catalog response.

## Decision

Add a React/Vite curriculum module that consumes
`@landing-factory/ui` from the immutable `ui-v1.1.0` Git tag. Mount its compiled
browser adapter only for `#learn` routes. Preserve the existing system workspace
and its static implementation for every other route.

The Factory adapter owns reusable UI behavior and semantic styling. Waku owns
the curriculum surface composition, Waku theme values, Markdown rendering,
chapter state, and evidence semantics. The Python catalog interface and Git
completion authority do not change.

The legacy curriculum renderer remains as a temporary rollback adapter until
the Factory-backed module passes catalog, route, accessibility, and browser
regression checks. It is not the long-term implementation.

## Consequences

- Waku becomes a real versioned Factory consumer without copying Factory source.
- The curriculum surface gains locality while the system workspace remains
  stable.
- Frontend builds require Node, pnpm, and network access when installing the
  pinned Git dependency. `make frontend-check` is the source-to-artifact gate.
- Compiled curriculum assets are versioned release artifacts. The production
  image copies them with `waku/`, stays network-free during its build, and ships
  only the Python runtime. This is required because the supported Apple
  container builder cannot resolve public package registries reliably.
- A later ADR may migrate the system workspace after the curriculum adapter has
  proved the integration seam. This decision does not assume that migration.

## Recovery

Disable the compiled curriculum script in `static/index.html`; the existing
JavaScript curriculum renderer continues to use the same catalog interface.
Reverting the frontend build does not change curriculum content, learner Git
state, or the system workspace.
