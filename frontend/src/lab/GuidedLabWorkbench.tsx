import React, {
  type ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import type {
  CurriculumChapter,
  LabAction,
  LabHint,
  LabManifest,
  LabStep,
} from "../types.js";
import { postLab } from "./api.js";
import { CodeEditor } from "./CodeEditor.js";
import { LabTerminal } from "./LabTerminal.js";
import "./workbench.css";

type SessionStatus = "in_progress" | "paused" | "proof_ready" | "passed" | "abandoned";

interface LabSession {
  id: string;
  chapter: string;
  workspace_mode: "canonical" | "replay";
  current_step: string;
  status: SessionStatus;
  timer_seconds: number;
  timer_started_at: string | null;
  final_commit?: string | null;
  completion_ref?: string | null;
  updated_at: string;
}

interface LabAttempt {
  id: number;
  step_id: string;
  action_id: string;
  action: string;
  command: string;
  exit_code: number;
  output: string;
  duration_ms: number;
  declared_evidence: boolean;
}

interface LabEvent {
  id: number;
  event_type: string;
  step_id: string | null;
  details: Record<string, unknown>;
}

interface LabCheckpoint {
  name: string;
  git_ref: string;
  commit_sha: string;
}

interface LabSnapshot {
  schema: 1;
  session: LabSession;
  manifest: LabManifest;
  current_step: LabStep;
  attempts: LabAttempt[];
  events: LabEvent[];
  checkpoints: LabCheckpoint[];
  workspace: {
    available: boolean;
    terminal_active: boolean;
    mode: string;
    key?: string | null;
    ref?: string | null;
    git?: {
      commit: string;
      completion_tag: string | null;
      clean: boolean;
      diff_summary: string;
    };
    error?: string;
  };
}

interface WorkspaceFile {
  path: string;
  exists: boolean;
  size: number;
  revision: string;
}

interface OpenWorkspaceFile extends WorkspaceFile {
  content: string;
}

interface PreparedRestore {
  checkpoint: LabCheckpoint;
  token: string;
  diff: string;
  untracked: string[];
}

interface GuidedLabWorkbenchProps {
  chapter: CurriculumChapter;
  journalPanel: ReactNode;
  onSessionChange: (sessionId: string | null) => void;
}

type MobileView = "task" | "workspace" | "terminal" | "coach";

const MAX_DIFF_PREVIEW = 60_000;

const phaseLabels = {
  observe: "Observe",
  explain: "Explain",
  decide: "Decide",
  repair: "Repair",
  prove: "Prove",
};

function errorMessage(caught: unknown, fallback: string): string {
  return caught instanceof Error ? caught.message : fallback;
}

function formatDuration(totalSeconds: number): string {
  const seconds = Math.max(0, Math.floor(totalSeconds));
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainder = seconds % 60;
  return [hours, minutes, remainder].map((value) => String(value).padStart(2, "0")).join(":");
}

function actionFor(manifest: LabManifest, reference: string): LabAction | undefined {
  return manifest.actions?.find((action) => action.id === reference);
}

function boundedDiff(diff: string): string {
  return diff.length > MAX_DIFF_PREVIEW
    ? `${diff.slice(0, MAX_DIFF_PREVIEW)}\n… diff truncated (${diff.length} characters total) …`
    : diff;
}

function workspaceLabel(workspace: LabSnapshot["workspace"] | null | undefined): string {
  if (!workspace) return "the lab workspace";
  if (workspace.mode === "replay") {
    return `the isolated replay clone${workspace.key ? ` ${workspace.key}` : ""}`;
  }
  return "the canonical workspace — the live Git working tree this dashboard serves";
}

function ElapsedTime({
  baseSeconds,
  since,
  running,
}: {
  baseSeconds: number;
  since: number;
  running: boolean;
}) {
  const [, setTick] = useState(0);
  useEffect(() => {
    if (!running) return;
    const timer = window.setInterval(() => setTick((value) => value + 1), 1000);
    return () => window.clearInterval(timer);
  }, [running]);
  const elapsed = baseSeconds + (running ? Math.floor((Date.now() - since) / 1000) : 0);
  return <time>{formatDuration(elapsed)}</time>;
}

function KeyboardResizeHandle({
  orientation,
  label,
  onDelta,
}: {
  orientation: "horizontal" | "vertical";
  label: string;
  onDelta: (amount: number) => void;
}) {
  const coordinate = orientation === "vertical" ? "clientX" : "clientY";
  return (
    <button
      type="button"
      className={`wf-workbench-resizer is-${orientation}`}
      role="separator"
      aria-label={label}
      aria-orientation={orientation}
      onKeyDown={(event) => {
        const negative = orientation === "vertical" ? "ArrowLeft" : "ArrowUp";
        const positive = orientation === "vertical" ? "ArrowRight" : "ArrowDown";
        if (event.key === negative || event.key === positive) {
          event.preventDefault();
          onDelta(event.key === negative ? -24 : 24);
        }
      }}
      onPointerDown={(event) => {
        event.preventDefault();
        const start = event[coordinate];
        let prior = start;
        const move = (next: PointerEvent) => {
          const current = next[coordinate];
          onDelta(current - prior);
          prior = current;
        };
        const stop = () => {
          window.removeEventListener("pointermove", move);
          window.removeEventListener("pointerup", stop);
          window.removeEventListener("pointercancel", stop);
        };
        window.addEventListener("pointermove", move);
        window.addEventListener("pointerup", stop);
        window.addEventListener("pointercancel", stop);
      }}
    >
      <span aria-hidden="true" />
    </button>
  );
}

function MarkerControls({
  disabled,
  onCreate,
}: {
  disabled: boolean;
  onCreate: (kind: string, note: string) => Promise<boolean>;
}) {
  const [kind, setKind] = useState("surprise");
  const [note, setNote] = useState("");
  return (
    <div className="wf-marker-controls">
      <div>
        <span className="wf-workbench-kicker">Creator marker</span>
        <strong>Mark the learning moment</strong>
      </div>
      <select aria-label="Marker kind" value={kind} onChange={(event) => setKind(event.target.value)} disabled={disabled}>
        <option value="failure">Failure</option>
        <option value="surprise">Surprise</option>
        <option value="decision">Decision</option>
        <option value="breakthrough">Breakthrough</option>
        <option value="next_step">Next step</option>
      </select>
      <input aria-label="Marker note" value={note} onChange={(event) => setNote(event.target.value)} placeholder="What changed?" disabled={disabled} />
      <button type="button" disabled={disabled} onClick={() => void onCreate(kind, note).then((created) => {
        if (created) setNote("");
      })}>Add marker</button>
    </div>
  );
}

function ProvePanel({
  snapshot,
  disabled,
  journalPanel,
  onRefresh,
}: {
  snapshot: LabSnapshot | null;
  disabled: boolean;
  journalPanel: ReactNode;
  onRefresh: () => Promise<void>;
}) {
  const completion = snapshot?.manifest.completion;
  const fields = completion?.reflection_fields ?? [];
  const storageKey = snapshot ? `waku-lab-recap:v1:${snapshot.session.id}` : "";
  const [selected, setSelected] = useState<number[]>([]);
  const [reflections, setReflections] = useState<Record<string, string>>({});
  const [preview, setPreview] = useState("");
  const [state, setState] = useState<"ready" | "working" | "exported">("ready");
  const [error, setError] = useState("");
  const evidence = snapshot?.attempts.filter((attempt) => attempt.declared_evidence) ?? [];

  useEffect(() => {
    if (!storageKey) return;
    try {
      const saved = JSON.parse(window.localStorage.getItem(storageKey) || "{}") as {
        selected?: number[];
        reflections?: Record<string, string>;
      };
      setSelected(saved.selected ?? []);
      setReflections(saved.reflections ?? {});
    } catch {
      setSelected([]);
      setReflections({});
    }
  }, [storageKey]);

  useEffect(() => {
    if (!storageKey) return;
    window.localStorage.setItem(storageKey, JSON.stringify({ selected, reflections }));
  }, [reflections, selected, storageKey]);

  const recap = async (kind: "preview" | "export") => {
    if (!snapshot) return;
    setState("working");
    setError("");
    try {
      const result = await postLab<{ content: string; exported?: boolean }>(
        `/api/lab/recap/${kind}`,
        {
          session_id: snapshot.session.id,
          attempt_ids: selected,
          reflections,
        },
      );
      setPreview(result.content);
      setState(result.exported ? "exported" : "ready");
      await onRefresh();
    } catch (caught) {
      setError(errorMessage(caught, "The recap could not be rendered."));
      setState("ready");
    }
  };

  return (
    <section className="wf-prove-panel" aria-labelledby="wf-prove-title">
      <details className="wf-prove-journal" open>
        <summary id="wf-prove-title">1. Review your learning journal</summary>
        {journalPanel}
      </details>
      <fieldset disabled={disabled || state === "working"}>
        <legend>2. Select declared evidence</legend>
        <p>Only manifest-declared attempts can enter the curated recap. Attach to Waku by selecting the evidence you want reviewed.</p>
        <div className="wf-evidence-list">
          {evidence.length ? evidence.map((attempt) => (
            <label key={attempt.id}>
              <input
                type="checkbox"
                checked={selected.includes(attempt.id)}
                onChange={(event) => setSelected((current) => event.target.checked
                  ? [...current, attempt.id]
                  : current.filter((id) => id !== attempt.id))}
              />
              <span className={attempt.exit_code === 0 ? "is-success" : "is-failure"}>exit {attempt.exit_code}</span>
              <code>{attempt.action_id || attempt.action}</code>
              <small>{attempt.duration_ms} ms</small>
            </label>
          )) : <div className="wf-empty-state">Run a declared action to collect selectable evidence.</div>}
        </div>
      </fieldset>
      <fieldset disabled={disabled || state === "working"}>
        <legend>3. Complete required reflections</legend>
        <div className="wf-reflection-grid">
          {fields.map((field, index) => (
            <label key={field}>
              <span>{field.replaceAll("_", " ")}</span>
              <textarea
                rows={3}
                required
                value={reflections[field] ?? ""}
                placeholder={completion?.reflections?.[index] ?? "Write the evidence-backed reflection in your own words."}
                onChange={(event) => setReflections((current) => ({ ...current, [field]: event.target.value }))}
              />
            </label>
          ))}
        </div>
      </fieldset>
      <div className="wf-recap-actions">
        <button type="button" disabled={disabled || state === "working"} onClick={() => void recap("preview")}>Preview recap</button>
        <button className="is-primary" type="button" disabled={disabled || state === "working"} onClick={() => void recap("export")}>
          {state === "exported" ? "Recap exported" : "Export recap"}
        </button>
        <span>{completion?.recap_destination}</span>
      </div>
      {preview ? <details className="wf-recap-preview" open><summary>Recap preview</summary><pre>{preview}</pre></details> : null}
      {error ? <p className="wf-workbench-error" role="alert">{error}</p> : null}
    </section>
  );
}

export function GuidedLabWorkbench({
  chapter,
  journalPanel,
  onSessionChange,
}: GuidedLabWorkbenchProps) {
  const catalogManifest = chapter.lab;
  const executable = Boolean(
    catalogManifest?.state === "runnable"
    && (chapter.status === "current" || chapter.status === "passed"),
  );
  const [snapshot, setSnapshot] = useState<LabSnapshot | null>(null);
  const [sessions, setSessions] = useState<LabSession[]>([]);
  const [snapshotAt, setSnapshotAt] = useState(Date.now());
  const [previewStepId, setPreviewStepId] = useState(catalogManifest?.steps?.[0]?.id ?? "");
  const [files, setFiles] = useState<WorkspaceFile[]>([]);
  const [openedFile, setOpenedFile] = useState<OpenWorkspaceFile | null>(null);
  const [draft, setDraft] = useState("");
  const [dirty, setDirty] = useState(false);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [busy, setBusy] = useState("");
  const [diffOpen, setDiffOpen] = useState(false);
  const [preparedRestore, setPreparedRestore] = useState<PreparedRestore | null>(null);
  const [terminalActive, setTerminalActive] = useState(false);
  const [mobileView, setMobileView] = useState<MobileView>("task");
  const [taskWidth, setTaskWidth] = useState(320);
  const [terminalHeight, setTerminalHeight] = useState(280);
  const mountedRef = useRef(false);
  const chapterRef = useRef(chapter.number);
  const snapshotRequestRef = useRef(0);
  const dirtyRef = useRef(dirty);
  const openedFileRef = useRef(openedFile);
  chapterRef.current = chapter.number;
  dirtyRef.current = dirty;
  openedFileRef.current = openedFile;

  const sessionId = snapshot?.session.id ?? null;
  const manifest = snapshot?.manifest ?? catalogManifest;
  const steps = manifest?.steps ?? [];
  const currentStep = snapshot?.current_step
    ?? steps.find((step) => step.id === previewStepId)
    ?? steps[0];
  const currentIndex = currentStep ? steps.findIndex((step) => step.id === currentStep.id) : -1;
  const sessionWritable = executable && snapshot?.session.status === "in_progress";

  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
    };
  }, []);

  const loadSnapshot = useCallback(async (id: string) => {
    const expectedChapter = chapter.number;
    const request = ++snapshotRequestRef.current;
    const next = await postLab<LabSnapshot>("/api/lab/session/snapshot", { session_id: id });
    if (
      !mountedRef.current
      || request !== snapshotRequestRef.current
      || expectedChapter !== chapterRef.current
      || next.session.id !== id
      || next.session.chapter !== expectedChapter
    ) return next;
    setSnapshot(next);
    setSnapshotAt(Date.now());
    setTerminalActive(next.workspace.terminal_active);
    onSessionChange(id);
    return next;
  }, [chapter.number, onSessionChange]);

  const refreshSnapshot = useCallback(async () => {
    if (sessionId) await loadSnapshot(sessionId);
  }, [loadSnapshot, sessionId]);

  useEffect(() => {
    if (!executable) {
      onSessionChange(null);
      return;
    }
    let active = true;
    setSnapshot(null);
    setSessions([]);
    setBusy("session");
    setError("");
    postLab<{ sessions: LabSession[] }>("/api/lab/session/list", { chapter: chapter.number })
      .then(async (listed) => {
        if (!active) return;
        const resumable = listed.sessions.filter((session) =>
          ["in_progress", "paused", "proof_ready"].includes(session.status));
        setSessions(resumable);
        let session = resumable[0];
        if (!session) {
          session = await postLab<LabSession>("/api/lab/session/start", { chapter: chapter.number });
          if (!active) return;
          setSessions([session]);
        }
        await loadSnapshot(session.id);
      })
      .catch((caught) => active && setError(errorMessage(caught, "The lab session could not start.")))
      .finally(() => active && setBusy(""));
    return () => {
      active = false;
      onSessionChange(null);
    };
  }, [chapter.number, executable, loadSnapshot, onSessionChange]);

  const openFile = useCallback(async (path: string, force = false, focusWorkspace = true) => {
    if (!sessionId) return;
    if (dirtyRef.current && !force && !window.confirm("Discard the unsaved editor changes?")) return;
    setBusy("file-read");
    setError("");
    try {
      const file = await postLab<OpenWorkspaceFile>("/api/lab/file/read", { session_id: sessionId, path });
      setOpenedFile(file);
      setDraft(file.content);
      setDirty(false);
      if (focusWorkspace) setMobileView("workspace");
    } catch (caught) {
      setError(errorMessage(caught, "The file could not be opened."));
    } finally {
      setBusy("");
    }
  }, [sessionId]);

  const refreshFiles = useCallback(async () => {
    if (!sessionId) return;
    const result = await postLab<{ files: WorkspaceFile[] }>("/api/lab/file/list", { session_id: sessionId });
    setFiles(result.files);
    if (!openedFileRef.current && result.files[0]) await openFile(result.files[0].path, true, false);
  }, [openFile, sessionId]);

  useEffect(() => {
    if (!executable || !sessionId || !snapshot?.workspace.available) return;
    void refreshFiles().catch((caught) => setError(errorMessage(caught, "Workspace files are unavailable.")));
  }, [executable, refreshFiles, sessionId, snapshot?.workspace.available]);

  useEffect(() => {
    setFiles([]);
    setOpenedFile(null);
    setDraft("");
    setDirty(false);
    setNotice("");
    setPreparedRestore(null);
    setMobileView("task");
    setPreviewStepId(catalogManifest?.steps?.[0]?.id ?? "");
  }, [chapter.number, catalogManifest]);

  useEffect(() => {
    if (!dirty) return;
    const guard = (event: BeforeUnloadEvent) => {
      event.preventDefault();
    };
    window.addEventListener("beforeunload", guard);
    return () => window.removeEventListener("beforeunload", guard);
  }, [dirty]);

  const saveFile = useCallback(async () => {
    if (!openedFile || !sessionId || !dirty || !sessionWritable) return;
    setBusy("file-save");
    setError("");
    try {
      const saved = await postLab<OpenWorkspaceFile>("/api/lab/file/save", {
        session_id: sessionId,
        path: openedFile.path,
        content: draft,
        expected_revision: openedFile.revision,
      });
      setOpenedFile(saved);
      setDraft(saved.content);
      setDirty(false);
      await refreshFiles();
    } catch (caught) {
      setError(errorMessage(caught, "The file could not be saved. Reload before retrying."));
    } finally {
      setBusy("");
    }
  }, [dirty, draft, openedFile, refreshFiles, sessionId, sessionWritable]);

  const perform = async (
    name: string,
    operation: () => Promise<unknown>,
    describe?: (result: unknown) => string,
  ): Promise<boolean> => {
    setBusy(name);
    setError("");
    setNotice("");
    try {
      const result = await operation();
      if (describe) setNotice(describe(result));
      await refreshSnapshot();
      return true;
    } catch (caught) {
      setError(errorMessage(caught, `The ${name} operation failed.`));
      return false;
    } finally {
      setBusy("");
    }
  };

  const runAction = (action: LabAction) => perform(action.id, async () => {
    if (!sessionId) return;
    await postLab("/api/lab/action", { session_id: sessionId, action_id: action.id });
    if (action.kind === "editor") setMobileView("workspace");
    if (action.kind === "export") setMobileView("task");
  });

  const revealHint = () => perform("hint", async () => {
    if (sessionId) await postLab("/api/lab/hint", { session_id: sessionId });
  });

  const advance = () => {
    const next = steps[currentIndex + 1];
    if (!next || !sessionId) return;
    void perform("advance", () => postLab("/api/lab/session/advance", {
      session_id: sessionId,
      next_step: next.id,
    }));
  };

  const togglePause = () => {
    if (!snapshot) return;
    const resume = snapshot.session.status !== "in_progress";
    void perform(resume ? "resume" : "pause", () => postLab(
      `/api/lab/session/${resume ? "resume" : "pause"}`,
      { session_id: snapshot.session.id },
    ));
  };

  const createCheckpoint = () => {
    if (!sessionId) return;
    const label = window.prompt("Checkpoint label", `${currentStep?.phase ?? "lab"} checkpoint`);
    if (!label?.trim()) return;
    void perform("checkpoint", () => postLab<Partial<LabCheckpoint>>("/api/lab/checkpoint/create", {
      session_id: sessionId,
      label: label.trim(),
    }), (result) => {
      const created = result as Partial<LabCheckpoint>;
      return created.git_ref
        ? `Checkpoint “${created.name ?? label.trim()}” captured at ${created.git_ref}.`
        : `Checkpoint “${label.trim()}” captured.`;
    });
  };

  const restoreCheckpoint = () => {
    const checkpoint = snapshot?.checkpoints.at(-1);
    if (!checkpoint || !sessionId) return;
    if (dirtyRef.current && !window.confirm("Discard the unsaved editor changes?")) return;
    void perform("reset", async () => {
      const prepared = await postLab<{
        token: string;
        diff?: string;
        untracked?: string[];
      }>("/api/lab/checkpoint/prepare", {
        session_id: sessionId,
        checkpoint_ref: checkpoint.git_ref,
      });
      setPreparedRestore({
        checkpoint,
        token: prepared.token,
        diff: prepared.diff ?? "",
        untracked: prepared.untracked ?? [],
      });
    });
  };

  const confirmRestore = () => {
    if (!preparedRestore || !sessionId) return;
    const { checkpoint, token } = preparedRestore;
    void perform("reset", async () => {
      await postLab("/api/lab/checkpoint/confirm", {
        session_id: sessionId,
        checkpoint_ref: checkpoint.git_ref,
        token,
      });
      setPreparedRestore(null);
      setOpenedFile(null);
      setDirty(false);
      await refreshFiles();
    }, () => `Workspace restored to “${checkpoint.name}”; a recovery checkpoint was captured first.`);
  };

  const complete = () => {
    if (!snapshot || !snapshot.workspace.git) return;
    void perform("complete", async () => {
      if (snapshot.session.workspace_mode === "replay") {
        await postLab("/api/lab/session/complete-replay", { session_id: snapshot.session.id });
      } else {
        await postLab("/api/lab/completion/validate", {
          session_id: snapshot.session.id,
          final_commit: snapshot.workspace.git?.commit,
          completion_ref: `learner/chapter-${chapter.number}-passed`,
        });
      }
    });
  };

  const addMarker = async (kind: string, note: string) => {
    if (!sessionId) return false;
    return perform("marker", () => postLab("/api/lab/creator/marker", {
      session_id: sessionId,
      kind,
      note,
    }));
  };

  const handleTerminalActive = useCallback((active: boolean) => setTerminalActive(active), []);
  const handleTerminalClosed = useCallback(() => void refreshSnapshot(), [refreshSnapshot]);
  const selectedHints = useMemo(() => snapshot?.events.filter((event) =>
    event.event_type === "hint_revealed" && event.step_id === currentStep?.id) ?? [], [currentStep?.id, snapshot?.events]);
  const markerEvents = snapshot?.events.filter((event) => event.event_type === "creator_marker") ?? [];
  const previewFiles = catalogManifest?.environment?.editable_files ?? [];
  const shownFiles = executable ? files.map((file) => file.path) : previewFiles;
  const disabledForTerminal = terminalActive || Boolean(busy);
  const canToggleSession = snapshot
    ? ["in_progress", "paused", "proof_ready"].includes(snapshot.session.status)
    : false;
  const canComplete = snapshot
    ? ["in_progress", "proof_ready"].includes(snapshot.session.status)
    : false;

  const busyReason = busy ? `Wait for the ${busy} operation to finish.` : "";
  const terminalReason = terminalActive
    ? "Close the terminal first — the workspace is locked while a PTY is open."
    : "";
  const lockReason = busyReason || terminalReason;
  const checkpointReason = busyReason || terminalReason
    || (!sessionWritable ? `Resume the session first (status: ${snapshot?.session.status.replaceAll("_", " ") ?? "loading"}).` : "");
  const resetReason = busyReason || terminalReason
    || (!snapshot?.checkpoints.length ? "Create a checkpoint before resetting." : "");
  const completeReason = busyReason || terminalReason
    || (snapshot?.session.status === "passed" ? "This session already passed." : "")
    || (!canComplete ? "This session can no longer be completed." : "")
    || (currentStep?.phase !== "prove" ? "Completion runs from the Prove step — continue through the steps first." : "");

  if (!catalogManifest) return null;

  return (
    <section
      data-slot="learning-lab"
      className="wf-guided-workbench"
      style={{ "--wf-task-width": `${taskWidth}px`, "--wf-terminal-height": `${terminalHeight}px` } as React.CSSProperties}
      data-mobile-view={mobileView}
    >
      <header className="wf-workbench-header">
        <div className="wf-workbench-title">
          <span className="wf-workbench-kicker">Guided lab · Chapter {chapter.number}</span>
          <h3>{catalogManifest.state === "preview" ? "Instrument preview" : chapter.title}</h3>
        </div>
        <div className="wf-workbench-session" aria-live="polite">
          <span className={`wf-session-status is-${snapshot?.session.status ?? (executable ? "loading" : "preview")}`}>
            {snapshot?.session.status.replaceAll("_", " ") ?? (executable ? "connecting" : "read-only preview")}
          </span>
          <ElapsedTime
            baseSeconds={snapshot?.session.timer_seconds ?? 0}
            since={snapshotAt}
            running={snapshot?.session.status === "in_progress"}
          />
          {sessions.length > 1 ? (
            <select aria-label="Resume lab session" value={sessionId ?? ""} onChange={(event) => {
              const nextId = event.target.value;
              if (dirtyRef.current && !window.confirm("Discard the unsaved editor changes?")) {
                event.target.value = sessionId ?? "";
                return;
              }
              setFiles([]);
              setOpenedFile(null);
              setDirty(false);
              void loadSnapshot(nextId);
            }}>
              {sessions.map((session) => <option key={session.id} value={session.id}>{session.id.slice(0, 8)} · {session.status}</option>)}
            </select>
          ) : null}
        </div>
        <div className="wf-workbench-actions">
          <button type="button" disabled={!canToggleSession || Boolean(busy)} onClick={togglePause}>{snapshot?.session.status === "in_progress" ? "Pause" : "Resume"}</button>
          <button type="button" disabled={!sessionWritable || disabledForTerminal || Boolean(preparedRestore)} title={checkpointReason || undefined} onClick={createCheckpoint}>Checkpoint</button>
          <button type="button" disabled={!snapshot?.checkpoints.length || disabledForTerminal || Boolean(preparedRestore)} title={resetReason || undefined} onClick={restoreCheckpoint}>Reset</button>
          <button type="button" disabled={!snapshot?.workspace.git} onClick={() => setDiffOpen((open) => !open)}>Diff</button>
          <button className="is-primary" type="button" disabled={!canComplete || currentStep?.phase !== "prove" || disabledForTerminal} title={completeReason || undefined} onClick={complete}>Complete</button>
        </div>
      </header>

      {lockReason || notice ? (
        <div className="wf-workbench-statusrow">
          {lockReason ? <span className="wf-actions-hint">{lockReason}</span> : null}
          {notice ? <span className="wf-workbench-notice" role="status">{notice}</span> : null}
        </div>
      ) : null}

      {diffOpen ? <div className="wf-workbench-diff"><strong>Workspace diff — {workspaceLabel(snapshot?.workspace)}</strong><pre>{snapshot?.workspace.git?.diff_summary ?? "No Git workspace is available."}</pre></div> : null}
      {!executable ? <div className="wf-preview-banner" role="status">This failure instrument is not published yet. Explore the task, files, and staged hints; executable calls stay locked.</div> : null}
      {error ? <p className="wf-workbench-error" role="alert">{error}</p> : null}

      {preparedRestore ? (
        <div className="wf-restore-overlay" role="presentation" onClick={(event) => {
          if (event.target === event.currentTarget) setPreparedRestore(null);
        }}>
          <div
            className="wf-restore-dialog"
            role="dialog"
            aria-modal="true"
            aria-labelledby="wf-restore-title"
            onKeyDown={(event) => {
              if (event.key === "Escape") setPreparedRestore(null);
            }}
          >
            <h3 id="wf-restore-title">Reset to “{preparedRestore.checkpoint.name}”?</h3>
            <p>
              This rewrites {workspaceLabel(snapshot?.workspace)} to match the checkpoint.
              A pre-restore recovery checkpoint is captured before anything changes.
              Saving files after this preview invalidates it.
            </p>
            <pre>{boundedDiff(preparedRestore.diff)}</pre>
            {preparedRestore.untracked.length ? (
              <p className="wf-restore-untracked">Untracked paths the reset removes: {preparedRestore.untracked.join(", ")}</p>
            ) : null}
            <div className="wf-restore-actions">
              <button type="button" autoFocus onClick={() => setPreparedRestore(null)}>Cancel</button>
              <button type="button" className="is-primary" disabled={Boolean(busy)} onClick={confirmRestore}>Create recovery checkpoint and reset</button>
            </div>
          </div>
        </div>
      ) : null}

      <nav className="wf-mobile-tabs" aria-label="Lab panels">
        {(["task", "workspace", "terminal", "coach"] as MobileView[]).map((view) => (
          <button
            type="button"
            key={view}
            aria-current={mobileView === view ? "page" : undefined}
            onClick={() => {
              setMobileView(view);
              if (view === "coach") window.dispatchEvent(new Event("waku-coach-open"));
            }}
          >{view[0].toUpperCase() + view.slice(1)}</button>
        ))}
      </nav>

      <div className="wf-workbench-body">
        <aside className="wf-task-pane" aria-label="Lab task">
          <div className="wf-scenario-card">
            <span className="wf-workbench-kicker">Production scenario</span>
            <p>{catalogManifest.scenario}</p>
          </div>
          <ol className="wf-step-rail">
            {steps.map((step, index) => {
              const active = step.id === currentStep?.id;
              const completeStep = executable && currentIndex > index;
              return (
                <li key={step.id} className={active ? "is-active" : completeStep ? "is-complete" : ""}>
                  <button type="button" disabled={executable} onClick={() => setPreviewStepId(step.id)} aria-current={active ? "step" : undefined}>
                    <span>{completeStep ? "✓" : index + 1}</span>
                    <span><small>{phaseLabels[step.phase]}</small><strong>{step.title}</strong></span>
                  </button>
                </li>
              );
            })}
          </ol>
          {currentStep ? (
            <article className="wf-step-detail">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>{currentStep.body}</ReactMarkdown>
              <div className="wf-success-criteria"><strong>Done when</strong><p>{currentStep.success_criteria}</p></div>
              <div className="wf-declared-actions">
                <span className="wf-workbench-kicker">Declared actions</span>
                {currentStep.actions.map((reference) => {
                  if (typeof reference !== "string") return <div className="wf-planned-action" key={reference.id}>{reference.description}</div>;
                  const action = actionFor(manifest!, reference);
                  if (!action) return null;
                  return (
                    <button
                      type="button"
                      key={action.id}
                      disabled={!sessionWritable || Boolean(busy) || (action.kind === "command" && terminalActive)}
                      title={action.kind === "command" && terminalActive ? "Close the terminal before running a declared command." : undefined}
                      onClick={() => void runAction(action)}
                    >
                      <span>{action.label}</span>
                      {action.command ? <code>{action.command}</code> : <small>{action.kind}</small>}
                    </button>
                  );
                })}
              </div>
              <div className="wf-hints">
                <div><span className="wf-workbench-kicker">Staged hints</span><strong>{selectedHints.length} of {currentStep.hints.length} revealed</strong></div>
                {selectedHints.map((event) => <p key={event.id}><b>Hint {String(event.details.level)}</b>{String(event.details.prompt)}</p>)}
                {!executable ? currentStep.hints.map((hint: LabHint) => <details key={hint.id}><summary>Preview hint {hint.level}</summary><p>{hint.prompt}</p></details>) : null}
                {executable ? <button type="button" disabled={!sessionWritable || selectedHints.length >= currentStep.hints.length || Boolean(busy)} onClick={() => void revealHint()}>Reveal next hint</button> : null}
              </div>
              <div hidden={currentStep.phase !== "prove"}>
                <ProvePanel snapshot={snapshot} disabled={!sessionWritable} journalPanel={journalPanel} onRefresh={refreshSnapshot} />
              </div>
              <MarkerControls disabled={!sessionId || Boolean(busy)} onCreate={addMarker} />
              {markerEvents.length ? <details className="wf-marker-history"><summary>{markerEvents.length} creator marker(s)</summary>{markerEvents.map((event) => <p key={event.id}><b>{String(event.details.kind)}</b> {String(event.details.note || "")}</p>)}</details> : null}
              {executable && currentIndex < steps.length - 1 ? <button className="wf-next-step" type="button" disabled={!sessionWritable || disabledForTerminal} title={lockReason || undefined} onClick={advance}>Continue to {phaseLabels[steps[currentIndex + 1].phase]} →</button> : null}
            </article>
          ) : null}
        </aside>

        <KeyboardResizeHandle orientation="vertical" label="Resize task panel" onDelta={(delta) => setTaskWidth((width) => Math.max(260, Math.min(520, width + delta)))} />

        <section className="wf-workspace-pane" aria-label="Lab workspace">
          <div className="wf-editor-pane">
            <aside className="wf-file-tree" aria-label="Editable files">
              <div><span>Files</span><small>{shownFiles.length} declared</small></div>
              {shownFiles.map((path) => (
                <button
                  type="button"
                  key={path}
                  className={openedFile?.path === path || (!executable && previewFiles[0] === path) ? "is-active" : ""}
                  onClick={() => executable ? void openFile(path) : undefined}
                  disabled={!executable}
                >
                  <span aria-hidden="true">▤</span>{path}
                </button>
              ))}
              {!shownFiles.length ? <p>No editable files are published.</p> : null}
            </aside>
            <div className="wf-editor-shell">
              <header>
                <span>{openedFile?.path ?? previewFiles[0] ?? "No file selected"}{dirty ? " •" : ""}</span>
                <span>
                  <small>{openedFile ? `${openedFile.size} bytes` : "read only"}</small>
                  <button type="button" disabled={!dirty || !sessionWritable || busy === "file-save"} onClick={() => void saveFile()}>{busy === "file-save" ? "Saving…" : "Save"}</button>
                </span>
              </header>
              {openedFile ? (
                <CodeEditor
                  key={openedFile.path}
                  path={openedFile.path}
                  content={draft}
                  readOnly={!sessionWritable}
                  onChange={(content) => { setDraft(content); setDirty(content !== openedFile.content); }}
                  onSave={() => void saveFile()}
                />
              ) : <div className="wf-editor-empty">{executable ? "Opening the declared workspace…" : "File contents unlock with the runnable checkpoint."}</div>}
            </div>
          </div>

          <KeyboardResizeHandle orientation="horizontal" label="Resize terminal" onDelta={(delta) => setTerminalHeight((height) => Math.max(180, Math.min(560, height - delta)))} />

          {executable && sessionId && snapshot?.session.status === "in_progress" ? (
            <LabTerminal
              sessionId={sessionId}
              stepId={currentStep.id}
              enabled
              height={terminalHeight}
              onActiveChange={handleTerminalActive}
              onAttemptClosed={handleTerminalClosed}
            />
          ) : (
            <section className="wf-terminal-placeholder" style={{ height: terminalHeight }}>
              <strong>{snapshot?.session.status === "paused" ? "Terminal paused" : "Terminal preview"}</strong>
              <p>{executable ? "Resume the session to open the bounded PTY." : "Commands remain disabled until this chapter is current or passed."}</p>
            </section>
          )}
        </section>
      </div>
    </section>
  );
}
