# Curriculum design-system contract

Waku owns the curriculum experience. Factory is the pattern authority for the
small set of design-system conventions shared here; its React and Tailwind
implementation is not a dependency of this build-free dashboard.

## Ownership

- The product owns brand expression, course voice, lesson content, and the
  warmer curriculum accent.
- The system owns semantic roles, component contracts, interaction states,
  accessibility rules, and validation.
- `docs/scale/curriculum.json` owns machine-readable phase and mastery metadata.
- Markdown briefs and track documents remain the teaching source. Git tags
  remain the only completion authority.

## Semantic vocabulary

Components consume roles rather than palette names: `background`, `foreground`,
`card`, `primary`, `muted`, `muted-foreground`, `border`, `ring`, `success`,
`warning`, and `destructive`. Curriculum-specific brand values use the
`curriculum-*` namespace. Light and dark themes may change values without
changing those contracts.

## Stable curriculum primitives

The following `data-slot` values are a public rendering and test contract:

- `course-hero`, `course-progress`, `course-phase`, `lesson-row`, `status-badge`
- `lesson-tabs`, `lesson-content`, `assignment-panel`, `knowledge-check`
- `lesson-pagination`

Core primitives support the course path and lesson reader. Existing agent
dashboard views are product/system surfaces. New visual experiments stay local
until they have a stable role, state model, accessibility proof, and learner
use case.

## Required states

Interactive course components account for default, hover, focus-visible,
current, passed, available, roadmap, and disabled states where applicable.
Focus uses the semantic ring and cannot depend on color alone. Heading order,
navigation labels, native disclosure controls, readable contrast, keyboard
operation, and `prefers-reduced-motion` are part of correctness.

## Change rule

A curriculum UI change is complete when contract tests pass, the no-build
browser path renders, keyboard focus remains visible, and status still derives
from repository evidence. A frontend-framework migration requires a separate
architecture decision; it is not implied by adopting these conventions.
