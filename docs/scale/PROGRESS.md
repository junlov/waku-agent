# Progress log (session handoffs)

Newest entry first. One entry per working session, written BEFORE you stop.
The next session (you in a week, or your agent in an hour) resumes from
this file instead of re-deriving state from the diff.

Format per entry:

```
## YYYY-MM-DD / chapter NN / <status: exploring | mid-fix | blocked | passed>
- Did: what actually happened (1-3 lines)
- Learned: the thing worth keeping (optional but usually the point)
- Next: the first concrete action for the next session
```

Keep entries honest and short. "Tried X, it deadlocked, next idea is Y" is
a perfect entry. Marketing copy about progress is not.

---

## 2026-07-17 / chapter 1 / exploring (all-chapter lab platform proven)
- Did: authored lab scenarios and objectives for all 17 chapters, generalized the
  runner and journal evidence seam, promoted Lab to a first-class route, and added
  truthful disabled previews for the 15 instruments that are not published yet.
- Learned: browser dogfood found stale static bundles after a supervised restart;
  `Cache-Control: no-store` now makes the live route match the deployed workspace.
  Chapter 16 preview and Chapter 1 execution both passed desktop/mobile checks.
- Next: complete Chapter 1 through its runnable lab, then publish Chapter 2's
  deterministic `scale-02` instrument and flip only its lab state to runnable.

## 2026-07-17 / chapter 1 / exploring (first container-backed learning lab proven)
- Did: added a Chapter 1 lab with objectives, sandbox command console, canonical
  measurement/verification actions, durable attempt history, and explicit journal attachment.
- Learned: the live baseline ran from the lesson in 79.46s and exposed p95 rising
  from 2.4s at one tenant to 19.68s at ten. The stale image lacks `make`, so canonical
  actions use the equivalent Python commands until an approved image rebuild is available.
- Next: learn through Chapter 1 in the lab, attach only the evidence worth discussing
  with Waku, then publish Chapter 2's lab contract after Chapter 1 is passed.

## 2026-07-16 / chapter 1 / exploring (vendor-neutral MCP transports proven)
- Did: added stdio and Streamable HTTP MCP connections, environment-only secret
  references, a shared sidecar network, an in-UI handshake test, and durable Ops
  evidence without exposing the Docker socket.
- Learned: a temporary HTTP sidecar passed discovery and the Tools handshake in
  12 ms; the generic probe was then removed while its evidence remained in
  SQLite. Waku can author/configure adapters, but the host still launches containers.
- Next: use `configure_mcp` with the first real integration endpoint and token
  environment name, then review its live tool schema and failure behavior.

## 2026-07-16 / chapter 1 / exploring (integration workbench observable)
- Did: added sandbox-only loading for agent-authored tools, idempotent local-tool
  and MCP scaffolds, per-server MCP health, and redacted structured integration
  events shared by Chat, Tools, Ops, and SQLite.
- Learned: the real missing seam was not shell authority but a loadable extension
  convention plus consistent evidence. Cold-start dogfood also found and fixed a
  Tools catalog that hid sandbox capabilities until the first chat.
- Next: rebuild/reseed the Colima container when Docker command approval is
  available, then dogfood a real MCP handshake and supervised restart in port 7777.

## 2026-07-16 / chapter 1 / exploring (sandbox self-healing proven)
- Did: gave containerized Waku full shell authority in a persistent mutable
  workspace, removed host filesystem mounts in favor of a sanitized image seed,
  and added immutable health-check/restart/last-known-good recovery plumbing.
- Learned: the container is the permission boundary; command allowlists are not
  a substitute for isolation. A broken dashboard restart restored byte-for-byte,
  while repaired workspace files and two journal rows survived container recreation.
- Next: dogfood a real Waku-proposed harness improvement through inspect, patch,
  test, supervised restart, and review without touching the Chapter 1 solution.

## 2026-07-16 / chapter 1 / exploring (Waku can run curriculum evidence)
- Did: added the constrained `run_curriculum_check` tool, a canonical Make
  adapter and dependency-free Chapter 1 adapter, deterministic safety tests,
  reviewer guidance, and a visual architecture review for approval-gated
  harness self-improvement.
- Learned: typed curriculum evidence remains useful even though the sandbox now
  also exposes a general terminal; lesson measurement and self-repair are
  different interfaces with different policies.
- Next: use the typed check for lesson evidence and the sandbox terminal only
  for harness inspection and repair.

## 2026-07-16 / chapter 1 / exploring (coaching chat and live map polished)
- Did: gave the chat dock a context-aware coaching welcome, starter prompts,
  clearer message hierarchy, multiline composer, and full-screen mobile mode;
  added a responsive compact request-path map beside the full architecture SVG.
- Learned: the full systems map is useful at overview width but becomes an
  unreadable thumbnail beside chat. A compact live-turn projection can share
  the same node IDs and animation events without creating a second truth.
- Next: use the Chapter 1 journal and coaching prompts during a real learning
  turn; refine message actions only after that session reveals a repeated need.

## 2026-07-16 / chapter 1 / exploring (durable learning journal added)
- Did: added a typed `learning_journal` SQLite store and API, autosave with a
  browser recovery draft, Memory and Database views, model-only coaching
  context, and a persistent `waku-training-data` Colima volume.
- Learned: curriculum hypotheses need durable visibility without becoming
  semantic facts. A named runtime volume preserves `state.db` across disposable
  container recreation while keeping the source checkout read-only.
- Next: continue the Chapter 1 learner run and use Memory → Learning Journal to
  review goals, evidence, and corrections before each recorded session.

## 2026-07-16 / chapter 1 / exploring (curriculum regressions repaired)
- Did: isolated legacy dashboard element styles from the Factory curriculum,
  restored stable curriculum slots, and made the learning shell usable at phone
  widths with a collapsed overlay sidebar and non-overlapping page header. Moved
  the universal margin reset into a low-priority CSS layer so curriculum spacing
  utilities render their intended vertical rhythm.
- Learned: Factory components own their internal `data-slot` values, so Waku's
  curriculum contracts need wrapper slots. Unlayered legacy resets also outrank
  layered Tailwind utilities; full `make check` currently reaches live evals
  because the configured OpenRouter credential returns HTTP 401.
- Next: replace or clear the stale local OpenRouter key, rerun `make check`, then
  continue the Chapter 1 learner run from the verified curriculum surface.

## 2026-07-16 / chapter 1 / exploring (Factory curriculum adapter shipped)
- Did: added a React/Vite curriculum module pinned to Factory `ui-v1.1.0`,
  mounted it behind `/api/curriculum`, preserved every System route and the
  legacy curriculum rollback adapter, and shipped compiled static assets.
- Learned: Factory's published tag trails its local checkout, so Waku must use
  only tag exports; production React also needs an explicit Vite NODE_ENV define.
  Apple container builds cannot resolve npm reliably, so the image consumes the
  verified release artifact instead of installing frontend dependencies.
- Next: use the Factory-backed Chapter 1 surface for the learner run; harvest
  any proven curriculum primitive back to Factory only after real use.

## 2026-07-16 / chapter 1 / exploring (curriculum visual audit fixed)
- Did: scoped sidebar navigation styles so lesson pagination sizes to content;
  reset the main pane on curriculum route changes; added focused learning
  navigation, stronger dark-mode secondary contrast, and a lesson contract.
- Learned: the fixed-column shell needs component-scoped selectors because a
  semantic child `<nav>` is otherwise indistinguishable from the app sidebar.
- Next: use the Chapter 1 lesson contract and knowledge check in the learner run;
  keep reflection artifact-backed rather than inventing browser completion.

## 2026-07-16 / chapter 1 / exploring (curriculum contract added)
- Did: adopted Factory's semantic design-system and governance patterns without
  importing its React stack; added a versioned curriculum contract, stable UI
  slots, mastery competencies, knowledge checks, and accessible focus states.
- Learned: curriculum metadata needs one machine-readable authority while lesson
  prose stays in Markdown and completion stays in Git. This prevents the course
  path, evidence links, and reader UI from drifting independently.
- Next: use the Chapter 1 knowledge check during the learner run, then extend
  component contract tests only when a new curriculum interaction is introduced.

## 2026-07-16 / chapter 1 / exploring (learner UI added)
- Did: made Curriculum the dashboard's learner-first entry; added a repository-
  backed course path, phase progress, lesson reader, architect/AI-engineer track
  tabs, assignment state, and links to live evidence without faking completion.
- Learned: the useful Odin pattern is structured path + lesson context + work +
  knowledge check. Waku's equivalent must derive completion from Git tags and
  keep uninstrumented roadmap chapters visibly non-runnable.
- Next: use the course UI for Chapter 1, then add each chapter's knowledge-check
  prompts and instrument links as its deterministic load test is published.

## 2026-07-16 / chapter 1 / exploring (production-agent curriculum mapped)
- Did: extended the declared curriculum from 0-10 to 0-16; added briefs and
  architect/AI-engineer tracks for contracts, trust, orchestration, context,
  containers, and durable execution; strengthened Chapters 1-10 prerequisites.
- Learned: the portable training spine is contracts and failure semantics, not
  a framework or cloud. OrganicOps remains evidence only; no product policy or
  implementation was transferred.
- Next: keep Chapter 1 as the active learner assignment. Instrument Chapters
  2-16 incrementally, adding each failing load test only when its start tag is
  ready to publish.

## 2026-07-16 / chapter 1 / exploring (harness repaired)
- Did: rebuilt the migrated `.venv`; separated learner progress from reference
  tags; added begin/complete state commands, SLO artifact checks, portable
  cross-agent skills, and harness regression tests. Chapter 0 is green again.
- Learned: the copied venv contained an absolute Python symlink from the old
  profile, and published solution tags could falsely advance learner progress.
- Next: review and commit the harness patch, run
  `python scripts/curriculum.py begin 01`, then start the Chapter 1 baseline.

## 2026-07-15 / chapter 0 / passed (chapter 1 armed)
- Did: harness built (sim provider, loadgen, conftest server fixture,
  check-00/check-01 targets). check-00 green: 15/15 turns, 0 errors.
  check-01 baseline measured: 1 to 10 tenants took p95 from 2.4s to 19.8s,
  throughput flat at ~40-49 turns/min. Tags chapter-00-start and
  chapter-00-solution (= chapter-01-start) pushed.
- Learned: the lock's signature is visible even at 5 tenants (p50 3.2s on
  a 100ms sim model). The meltdown demo needs no staging.
- Next: learner runs chapter 1 (make check-01 with the dashboard open),
  answers the brief's three questions, writes docs/scale/SLO.md. Then
  chapter 2's failing test gets encoded against those SLO numbers.
