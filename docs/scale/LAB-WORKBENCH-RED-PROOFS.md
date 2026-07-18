# Guided lab workbench: baseline red proofs

These commands capture the lab-v1 gaps observed on 2026-07-17 before the guided
workbench implementation. They are deliberately narrow and reproducible. A
future implementation should turn each red result into an automated passing
test without changing learner chapter solutions.

Run from the repository root on branch `scale`.

## 1. The curriculum has inline lab cards, not scenario manifests or steps

```bash
.venv/bin/python - <<'PY'
import json
from pathlib import Path

catalog = json.loads(Path("docs/scale/curriculum.json").read_text())
labs = [row.get("lab", {}) for row in catalog["chapters"]]
print("manifest_directory=", Path("docs/scale/labs").is_dir())
print("inline_labs=", sum(bool(lab) for lab in labs))
print("ordered_steps=", sum(isinstance(lab.get("steps"), list) for lab in labs))
PY
```

Red result: `manifest_directory=False`, all chapter lab contracts are embedded
in `curriculum.json`, and `ordered_steps=0`. There is no validator that can
reject duplicate IDs, missing Markdown, invalid references, or executable
fields on a preview.

## 2. There is no browser editor or interactive PTY contract

```bash
.venv/bin/python - <<'PY'
import json
from pathlib import Path

package = json.loads(Path("frontend/package.json").read_text())
deps = package.get("dependencies", {}) | package.get("devDependencies", {})
for name in ("@xterm/xterm", "@xterm/addon-fit", "@codemirror/state", "@codemirror/view"):
    print(f"{name}=", name in deps)
PY

rg -n "pty\.openpty|os\.login_tty|tcsetwinsize|terminal/(stream|input|resize|close)|/api/lab/file" waku frontend/src
```

Red result: every dependency prints `False`, and the search returns no workbench
PTY or file API. `waku/ops/lab.py` runs bounded, non-interactive
`subprocess.run` commands; it cannot accept input, resize, interrupt, or edit a
workspace file with revision conflict detection.

## 3. There is no lab session or step-level experience schema

```bash
.venv/bin/python - <<'PY'
from pathlib import Path

schema = Path("waku/db.py").read_text()
for table in ("lab_sessions", "lab_checkpoints", "lab_events"):
    print(f"{table}=", f"CREATE TABLE IF NOT EXISTS {table}" in schema)
for column in ("session_id", "step_id", "action_id"):
    print(f"lab_attempts.{column}=", column in schema[schema.find("CREATE TABLE IF NOT EXISTS lab_attempts"):])
PY
```

Red result: the session, checkpoint, and event tables are absent, and existing
`lab_attempts` rows cannot identify a session, manifest step, or declared
action.

## 4. Recovery is global last-known-good copying, not a chapter checkpoint

```bash
rg -n "last-good|refs/waku/checkpoints|--no-local|--no-hardlinks|GIT_INDEX_FILE|restore.*(preview|confirm)" scripts waku
```

Red result: only `scripts/sandbox_supervisor.py` names `last-good`; there are no
private checkpoint refs, temporary indexes, pre-restore diff/confirmation, or
standalone replay checkouts. Linked worktrees are rejected because they share
canonical refs and repository configuration. The supervisor checkpoint
protects harness availability and cannot safely serve as a chapter fixture. The
target is a separate Git checkpoint manager; private refs and temporary-index
handling must not move into the supervisor.

## 5. A newly seeded container workspace has no Git metadata

The source proof is immediate:

```bash
rg -n "^\.git$" .dockerignore
rg -n "\.bundle|git (clone|fetch)|rev-parse.*--is-inside-work-tree" Dockerfile scripts
```

The runtime proof builds a disposable image without touching named volumes:

```bash
docker build -t waku-lab-red-proof .
docker run --rm --entrypoint sh waku-lab-red-proof -lc \
  'if test -e /seed/.git; then echo unexpected-git-metadata; exit 1; else echo git-metadata-missing; fi'
```

Red result: `.git` is correctly excluded, but no sanitized bundle is copied and
the image reports `git-metadata-missing`. The supervisor copies `/seed` into
`/workspace`, so a fresh named workspace cannot create commits, learner tags,
private checkpoint refs, or standalone replay checkouts. The target design keeps host
`.git` excluded, seeds from a sanitized Git bundle, bootstraps the persistent
workspace with clone/fetch, and verifies it with
`git rev-parse --is-inside-work-tree`.

## Exit condition

These proofs are green only when manifests validate, Chapter 00–01 expose the
five ordered steps, a fresh container workspace is a sanitized Git repository,
session/checkpoint/event migrations preserve old data, and the bounded file and
interactive-terminal APIs pass their lifecycle and containment tests.
