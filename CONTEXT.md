# Waku curriculum domain

## Curriculum catalog

The repository-backed description of phases, chapters, tracks, competencies,
knowledge checks, and evidence destinations. Markdown and
`docs/scale/curriculum.json` are authoritative; `/api/curriculum` is its runtime
interface.

## Curriculum surface

The learner-facing path and lesson reader. It presents the curriculum catalog
but never decides completion. Completion remains derived from chapter checks and
Git state.

## System workspace

The operational dashboard for the running agent: overview, gateway, loop,
memory, tools, database, Ops, settings, and chat. Its React shell owns routing,
navigation, page framing, and polling while unmigrated evidence panels remain
behind the legacy view adapter.

## Factory adapter

The tagged `@landing-factory/ui` dependency, shadcn primitives, and Waku theme
used by the React dashboard shell and curriculum surface. Waku owns composition
and brand values; Factory owns reusable UI behavior, semantic token roles, and
public slots.

## Learning journal

Learner-authored, per-chapter working memory: goals, hypotheses, evidence,
decisions, corrections, and next steps. SQLite's `learning_journal` table is the
durable authority; browser storage is only a draft/recovery cache. Journal
hypotheses remain separate from semantic facts, and Git checks remain the
completion authority.

## Curriculum coaching context

The canonical chapter material plus the active learning-journal snapshot sent
to Waku for one coaching turn. The server validates curriculum metadata and
persists the journal before injecting it into model-only system context. The
learner's visible question, chat history, and trace remain unmodified.

## Curriculum check runner

The constrained repository instrument Waku can execute as a curriculum
reviewer. It accepts only the active chapter plus `measure` or `grade`, forces
the offline simulation provider, refuses later chapters, bounds runtime and
output, and never marks completion. Make and dependency-free execution are two
adapters behind the same tool interface.
