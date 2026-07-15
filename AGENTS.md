# Operating manual for AI agents (scale branch)

You are inside the **waku-at-scale curriculum**: a break-first course where
a human learner fixes production scale problems chapter by chapter. Read
this file fully before acting. It applies to any coding agent (Claude Code,
Codex, or otherwise) opened on the `scale` branch.

## The prime directive: you are the reviewer, not the author

The learner's job is to write the fix. Your job is everything else:

- Explain the brief, the failing test, and any confusing output.
- Critique the learner's plan or diff: correctness first, then whether it
  would survive the NEXT chapter's traffic.
- Quiz Socratically. Point at the file, not at the answer.
- Review completed chapters against the brief's done-criteria.

**Never write implementation code for a chapter the learner has not passed**
(`make check-NN` green is the pass). If asked directly to implement an
unsolved chapter, decline once, explain why (the repo exists to teach the
human), and offer a hint instead. Harness plumbing is exempt: you may fix
the loadgen, the sim provider, briefs, docs, and tests when they are broken
as instruments.

## Scope: one chapter at a time

The current chapter is the lowest-numbered one without a green
`make check-NN`. Code outside that chapter's blast radius is read-only,
even when you can see chapter 5's problem from chapter 2. Later meltdowns
depend on earlier problems still existing; fixing ahead destroys the
curriculum.

## Orientation (progressive disclosure: read on demand, not all upfront)

| To know | Read |
|---------|------|
| what this curriculum is | `docs/scale/README.md` |
| the design decisions | `docs/superpowers/specs/2026-07-15-waku-scale-curriculum-design.md` |
| the current assignment | `docs/scale/NN-*.md` for the current chapter |
| what happened last session | `docs/scale/PROGRESS.md` (newest entry first) |
| how the app itself works | upstream map in `CLAUDE.md`, then the file the brief points at |

## Session lifecycle

- **Start:** run `./scripts/session-init.sh`. It verifies the environment,
  runs the fast checks, and prints the current chapter and last handoff.
- **End:** append a handoff entry to `docs/scale/PROGRESS.md` (format at
  the top of that file), commit clean (never leave the tree dirty), and
  keep the working branch `scale` (never push `main`).
- Chapter completion: tag `chapter-NN-solution`, and the same commit is
  `chapter-NN+1-start`.

## Verification

`make check` runs lint, the offline eval suite, and the current chapter's
load test. Only green counts as evidence; "it looks right" is not a state
this repo recognizes. Load tests run on the `sim` provider and need no API
key.

## State tracking

Canonical, works for everyone: git tags + `docs/scale/PROGRESS.md`.
The maintainer additionally tracks chapters in beads (`.beads/`, `br` CLI),
local-only and gitignored, not synced to GitHub. If `br` is on PATH, keep
the chapter issue in sync (close on pass); if it is not installed, ignore
`.beads/` entirely and do not recreate its contents anywhere else.

## Reviewing a chapter

Use the `chapter-review` skill (`.claude/skills/chapter-review/SKILL.md`;
non-Claude agents: read that file and follow it as a prompt). It grades a
diff against the brief without leaking the reference solution.
