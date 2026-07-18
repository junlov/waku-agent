# ADR-0006: Build a guided, Git-backed lab workbench

- Status: accepted
- Date: 2026-07-17
- Supersedes: ADR-0005

## Context

ADR-0005 made a bounded lab console and durable attempts available inside the
container. That proves the first execution seam, but it does not define a
complete learning session: there are no ordered steps, editable workspace,
interactive terminal, chapter checkpoint, safe restore, replay isolation, or
Git metadata in a newly seeded workspace.

Waku is a break-first curriculum. Its learner must observe a real failure,
explain the evidence, make a defensible decision, repair the actual system, and
prove the result. The workbench must support that loop without writing an
unpassed chapter's repair, manufacturing future failure states, or treating UI
state as completion authority.

## Decision

### Scenario manifests orchestrate Markdown

Versioned `LabManifestV2` documents live under `docs/scale/labs/`. A manifest
declares identity, prerequisites, outcomes, environment, ordered `observe`,
`explain`, `decide`, `repair`, and `prove` steps, staged hints, completion
requirements, and recap destination. Chapter briefs and track documents remain
the prose authorities; manifests link to them and do not duplicate their text.

Runnable manifests may declare a checkpoint, service profiles, actions, and a
deterministic grader. Preview manifests must omit executable setup, checkpoint,
and grader fields. Publishing a future chapter requires its cumulative start
checkpoint and deterministic red instrument to exist first.

### SQLite owns experience; Git owns completion

SQLite stores lab sessions, step attempts, hint reveals, timer and creator
events, checkpoint metadata, and the private autosaved learning journal.
Migrations are additive and preserve existing journal and attempt rows.

Git commits, required decision artifacts, deterministic checks, curated recap,
and learner-owned pass tags remain completion authority. A green command or a
SQLite status cannot independently claim completion. Terminal history is not
silently promoted into journal, chat history, semantic memory, or evidence.

### A sanitized Git bundle seeds the persistent workspace

The image contains a sanitized Git bundle and curriculum ref, not the host
checkout's `.git` directory or Git configuration. First boot clones or fetches
that bundle into the persistent `/workspace` volume. Image upgrades create a
pre-upgrade checkpoint and merge the new curriculum ref safely. Dirty or
conflicted learner work becomes `update pending`; it is never overwritten.
Secrets and runtime databases remain outside source restoration.

Lab checkpoints use private `refs/waku/checkpoints/*` and temporary Git indexes
so capturing a checkpoint does not disturb the learner's index. Restore is a
three-part operation: show the proposed diff, create a pre-restore checkpoint,
then require explicit confirmation. Destructive `git reset --hard` is not an
implementation mechanism. Passed chapters replay in persistent standalone Git
checkouts created with `git clone --no-local --no-hardlinks` at the manifest
checkpoint. The replay clone removes its source remote and uses an empty Git
template, so its object store, refs, repository config, and hooks are
independent from the canonical workspace. Linked Git worktrees were considered
and rejected: their shared Git common directory lets a replay mutate canonical
refs and repository configuration even when its files live outside
`/workspace`.

The supervisor's last-known-good filesystem checkpoint remains crash recovery
for the mutable harness. It is not reused as a chapter fixture or learner
checkpoint.

### The browser receives bounded file and terminal protocols

The backend is split into manifest/session orchestration, workspace file
access, terminal management, Git checkpoint management, and thin dashboard
routing.

Workspace file APIs list, read, and save only declared, non-symlink files under
the active workspace. They reject traversal, binaries, oversized files,
protected Git internals, and stale content revisions.

The terminal uses locally bundled `@xterm/xterm` and its fit addon. Code editing
uses locally bundled CodeMirror 6. The Python server starts a bounded PTY with
`pty.openpty`, a helper using `os.login_tty`, and
`subprocess.Popen(pass_fds=...)`; resize uses `termios.tcsetwinsize`. Output is
POST-response streamed as base64 frames, while input, resize, and close are
separate POST requests. Buffering, backpressure, redaction, cleanup, Ctrl-C,
disconnect, and process exit are explicit lifecycle concerns.

WebSockets, `pty.fork()` in the threaded server, `preexec_fn`, runtime CDN
assets, and `innerHTML` rendering are excluded.

### Waku coaches but does not author the learner's repair

Transient coaching context may include the current step, recent declared
attempts, explicitly revealed hints, a journal summary, and a Git diff summary.
Waku may inspect, run diagnostics, explain evidence, and review plans or diffs.
It may not write an unpassed chapter's repair.

Hints unlock only on learner request: first a concept question, then a
diagnostic or file pointer, then approach and tradeoff guidance. Reference
solutions require a pass or explicit abandonment and are never applied
automatically. Recaps contain only learner-selected, redacted evidence,
reflection fields, commit/tag metadata, and optional creator markers.

### The workbench preserves the curriculum shell

`#learn/NN/lab` becomes a resizable three-pane workbench while the global
sidebar remains visible: task rail and hints on the left, editor and terminal
in the center, and Waku coaching plus selected evidence on the right. Closing
chat returns its width to the workspace. The header owns timer, session,
checkpoint, reset, diff, and completion controls. The final step exposes a
collapsible journal, proof checklist, and recap preview/export. Mobile uses
keyboard-accessible task, workspace, terminal, and coach tabs.

The creator companion is deliberately small: a pauseable timer and optional
failure, surprise, decision, breakthrough, and next-step markers. It is not a
recording studio, editor, LMS, or leaderboard.

### Real dependencies are controlled by a restricted sidecar

Before Chapter 04 becomes runnable, a separate `labd` controller owns container
dependency lifecycle. It accepts only immutable, manifest-declared profiles
with fixed image digests, networks, resource limits, environment allowlists,
labels, health checks, and ephemeral lab volumes. Its API is limited to start,
stop, reset, status, and logs.

Waku receives a scoped authenticated API, never the Colima or container-engine
socket. Arbitrary images, commands, host paths, privileged mode, host
networking, undeclared mounts, and unrelated containers are outside its
authority. Idle lab services stop automatically while source, Git, SQLite, and
checkpoints remain persistent.

## Consequences

- A chapter becomes an inspectable, recoverable session in the real repository
  rather than a command card beside prose.
- Content can evolve independently from React because the UI renders validated
  manifests and authoritative Markdown.
- Git and SQLite have explicit, non-competing responsibilities.
- Replay refs, config, hooks, objects, commits, and private checkpoints are
  physically independent from canonical Git metadata.
- File, PTY, Git, and container orchestration add meaningful security and
  lifecycle test surfaces.
- Future chapters remain honest previews until their deterministic incident and
  cumulative checkpoint are published.
- Container recreation can preserve learner work, sessions, evidence, and
  completion without exposing the Mac checkout or engine socket.

## Recovery

Each implementation phase lands as a focused commit. A lab restore first
creates a named recovery ref; a failed curriculum upgrade remains pending; a
passed-chapter standalone replay is disposable after explicit abandonment and
remains resumable in the persistent runtime volume before then. The existing
supervisor may recover a broken harness from last-known-good state, while named
volumes retain the Git workspace and SQLite experience data. Volumes are never
deleted automatically.
