import React, { lazy, Suspense, useEffect, useRef, useState } from "react";
import { createRoot, type Root } from "react-dom/client";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import {
  Badge,
  ButtonLink,
  DetailsPanel,
  PanelShell,
} from "@landing-factory/ui";
import type {
  ChapterStatus,
  CurriculumAdapter,
  CurriculumCatalog,
  CurriculumChapter,
  CurriculumTrack,
  LearningContextPayload,
  LearningJournal,
} from "./types.js";
import "./curriculum.css";

// The guided workbench pulls in xterm + CodeMirror (~1.2 MB); keep it out of
// the main bundle and load it only when a learner opens the lab track.
const GuidedLabWorkbench = lazy(() =>
  import("./lab/GuidedLabWorkbench.js").then((module) => ({ default: module.GuidedLabWorkbench })),
);

declare global {
  interface Window {
    WakuCurriculum?: CurriculumAdapter;
  }
}

const roots = new WeakMap<HTMLElement, Root>();
const JOURNAL_STORAGE_PREFIX = "waku-learning-journal:v1";
let activeLearningContext: LearningContextPayload | null = null;
let activeLabSessionId: string | null = null;

type PersistedLearningJournal = LearningJournal & {
  chapter: string;
  track: CurriculumTrack;
};

const emptyJournal = (): LearningJournal => ({
  goal: "",
  hypothesis: "",
  evidence: "",
  decision: "",
  correction: "",
  next_step: "",
  updated_at: "",
});

function loadJournal(chapter: string): LearningJournal {
  try {
    const saved = window.localStorage.getItem(`${JOURNAL_STORAGE_PREFIX}:${chapter}`);
    return saved ? { ...emptyJournal(), ...JSON.parse(saved) } : emptyJournal();
  } catch {
    return emptyJournal();
  }
}

function publishLearningContext(context: LearningContextPayload | null) {
  activeLearningContext = context;
  window.dispatchEvent(new CustomEvent("waku-learning-context", { detail: context }));
}

function publishLabSession(sessionId: string | null) {
  activeLabSessionId = sessionId;
  window.dispatchEvent(new CustomEvent("waku-lab-session", { detail: { sessionId } }));
}

function serverTimestamp(value: string): string {
  return value && !value.endsWith("Z") ? `${value.replace(" ", "T")}Z` : value;
}

async function postLearningJournal(payload: LearningContextPayload): Promise<PersistedLearningJournal> {
  const response = await fetch("/api/learning-journal", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  const result = await response.json();
  if (!response.ok || result.error || !result.journal) {
    throw new Error(result.error || "Journal save failed");
  }
  return result.journal as PersistedLearningJournal;
}

const journalFields: Array<{
  name: Exclude<keyof LearningJournal, "updated_at">;
  label: string;
  prompt: string;
}> = [
  { name: "goal", label: "Session goal", prompt: "What would count as meaningful progress today?" },
  { name: "hypothesis", label: "Current hypothesis", prompt: "What do you think is happening, and why?" },
  { name: "evidence", label: "Evidence collected", prompt: "Commands, measurements, screenshots, and surprising results." },
  { name: "decision", label: "Decision made", prompt: "What did you choose, and which alternatives remain?" },
  { name: "correction", label: "What I misunderstood", prompt: "What changed in your mental model during this session?" },
  { name: "next_step", label: "Next session", prompt: "The exact unresolved question or next experiment." },
];

function LearningJournalPanel({ chapter, track }: { chapter: CurriculumChapter; track: CurriculumTrack }) {
  const [journal, setJournal] = useState<LearningJournal>(() => loadJournal(chapter.number));
  const [hydrated, setHydrated] = useState(false);
  const [saveState, setSaveState] = useState<"ready" | "saving" | "saved" | "offline">("ready");
  const saveQueueRef = useRef<Promise<void>>(Promise.resolve());
  const saveRevisionRef = useRef(0);

  useEffect(() => {
    window.localStorage.setItem(`${JOURNAL_STORAGE_PREFIX}:${chapter.number}`, JSON.stringify(journal));
    publishLearningContext({ version: 1, chapter: chapter.number, track, journal });
  }, [chapter.number, journal, track]);

  useEffect(() => () => publishLearningContext(null), [chapter.number]);

  useEffect(() => {
    let active = true;
    const draft = loadJournal(chapter.number);
    setJournal(draft);
    setHydrated(false);
    setSaveState("ready");
    fetch("/api/learning-journal?chapter=" + encodeURIComponent(chapter.number))
      .then((response) => response.json())
      .then((result) => {
        if (!active) return;
        const row = result.journal as PersistedLearningJournal | null;
        if (row) {
          const stored = {
            ...emptyJournal(),
            ...row,
            updated_at: serverTimestamp(row.updated_at),
          };
          const draftTime = Date.parse(draft.updated_at || "") || 0;
          const storedTime = Date.parse(stored.updated_at || "") || 0;
          if (storedTime >= draftTime) setJournal(stored);
        }
        setHydrated(true);
        setSaveState("saved");
      })
      .catch(() => {
        if (!active) return;
        setHydrated(true);
        setSaveState("offline");
      });
    return () => { active = false; };
  }, [chapter.number]);

  useEffect(() => {
    const refresh = () => {
      fetch("/api/learning-journal?chapter=" + encodeURIComponent(chapter.number))
        .then((response) => response.json())
        .then((result) => {
          const row = result.journal as PersistedLearningJournal | null;
          if (row) setJournal({ ...emptyJournal(), ...row, updated_at: serverTimestamp(row.updated_at) });
        })
        .catch(() => setSaveState("offline"));
    };
    window.addEventListener("waku-journal-refresh", refresh);
    return () => window.removeEventListener("waku-journal-refresh", refresh);
  }, [chapter.number]);

  useEffect(() => {
    if (!hydrated) return;
    const revision = ++saveRevisionRef.current;
    const payload = { version: 1 as const, chapter: chapter.number, track, journal };
    setSaveState("saving");
    const timer = window.setTimeout(() => {
      const save = saveQueueRef.current
        .catch(() => undefined)
        .then(() => postLearningJournal(payload));
      saveQueueRef.current = save.then(() => undefined, () => undefined);
      save
        .then((saved) => {
          if (revision !== saveRevisionRef.current) return;
          setJournal((current) => ({ ...current, updated_at: serverTimestamp(saved.updated_at) }));
          setSaveState("saved");
        })
        .catch(() => {
          if (revision === saveRevisionRef.current) setSaveState("offline");
        });
    }, 450);
    return () => window.clearTimeout(timer);
  }, [
    chapter.number,
    hydrated,
    journal.goal,
    journal.hypothesis,
    journal.evidence,
    journal.decision,
    journal.correction,
    journal.next_step,
    track,
  ]);

  const updateField = (name: Exclude<keyof LearningJournal, "updated_at">, value: string) => {
    saveRevisionRef.current += 1;
    setJournal((current) => ({ ...current, [name]: value, updated_at: new Date().toISOString() }));
  };
  const trackLabel = track === "engineer"
    ? "AI-engineer"
    : track === "architect"
      ? "Architect"
      : track === "lab" ? "Lab" : "Lesson";
  const savedLabel = saveState === "saving"
    ? "Saving to Waku…"
    : saveState === "offline"
      ? "Offline draft"
      : journal.updated_at
        ? `Saved ${new Date(journal.updated_at).toLocaleTimeString([], { hour: "numeric", minute: "2-digit" })}`
        : "Ready for this session";
  const populatedFields = journalFields.filter((field) => journal[field.name].trim()).length;

  return (
    <section data-slot="learning-journal" className="wf-learning-journal mt-10 max-w-3xl rounded-xl border border-border bg-card">
      <details>
        <summary className="wf-journal-summary">
          <span className="min-w-0">
            <span className="wf-eyebrow">Reflect and capture</span>
            <strong className="mt-2 block text-xl tracking-tight text-foreground">Learning journal</strong>
            <span className="mt-1 block text-sm leading-6 text-muted-foreground">
              {populatedFields
                ? `${populatedFields} of ${journalFields.length} prompts captured for Chapter ${chapter.number}.`
                : "Open when you are ready to record what changed in your thinking."}
            </span>
          </span>
          <span className="flex shrink-0 items-center gap-3">
            <span className="wf-journal-status" aria-live="polite">
              <span className="wf-journal-status-dot" />{savedLabel}
            </span>
            <span className="wf-journal-chevron" aria-hidden="true">⌄</span>
          </span>
        </summary>

        <div className="wf-journal-body">
          <div className="border-b border-border pb-5">
            <div className="wf-eyebrow">Chapter {chapter.number} · {trackLabel} track</div>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">
              Capture what you believed, what the evidence changed, and what you will try next. Waku receives these notes with chat so it can coach in context.
            </p>
          </div>

          <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-2">
            {journalFields.map((field) => (
              <label key={field.name} className="flex min-w-0 flex-col gap-2">
                <span className="text-xs font-bold text-foreground">{field.label}</span>
                <textarea
                  value={journal[field.name]}
                  onChange={(event) => updateField(field.name, event.target.value)}
                  placeholder={field.prompt}
                  rows={3}
                  className="wf-journal-input"
                />
              </label>
            ))}
          </div>

          <p className="mt-5 border-t border-border pt-4 text-xs leading-5 text-muted-foreground">
            Saved in Waku's SQLite learning journal, with a browser draft for recovery. Journal context is sent to your configured model provider only when you chat with Waku. It does not mark a chapter complete; Git-backed checks remain the record.
          </p>
        </div>
      </details>
    </section>
  );
}

const statusLabel: Record<ChapterStatus, string> = {
  passed: "Passed",
  current: "Current",
  available: "Available",
  roadmap: "Roadmap",
};

const statusTone: Record<ChapterStatus, "success" | "warning" | "primary" | "neutral"> = {
  passed: "success",
  current: "warning",
  available: "primary",
  roadmap: "neutral",
};

function StatusBadge({ chapter }: { chapter: CurriculumChapter }) {
  return <span data-slot="status-badge" className="inline-flex"><Badge tone={statusTone[chapter.status]}>{statusLabel[chapter.status]}</Badge></span>;
}

function CurriculumHome({ catalog }: { catalog: CurriculumCatalog }) {
  useEffect(() => publishLearningContext(null), []);
  const current = catalog.chapters.find((chapter) => chapter.number === catalog.current);
  const percent = catalog.total ? Math.round((catalog.passed / catalog.total) * 100) : 0;

  return (
    <div data-slot="curriculum-surface" className="pb-8">
      <section data-slot="course-hero" className="wf-course-hero">
        <div className="wf-eyebrow">Production agent engineering · {catalog.total} chapters</div>
        <h2 className="relative z-1 mt-5 max-w-3xl text-4xl font-bold leading-[1.02] tracking-[-0.035em] sm:text-5xl">
          Build the agent.<br />Break it at scale.<br />Prove the repair.
        </h2>
        <p className="relative z-1 mt-6 max-w-2xl text-[0.94rem] leading-7 text-white/80">
          A self-directed path through the failures that separate an agent demo from a production system.
          Every runnable lesson starts with a scar and ends with evidence.
        </p>
        <div data-slot="course-progress" className="relative z-1 mt-7 flex max-w-md items-center gap-4">
          <div className="min-w-24">
            <strong className="block text-base">{catalog.passed} of {catalog.total}</strong>
            <span className="text-[0.65rem] uppercase tracking-[0.08em] text-white/60">chapters passed</span>
          </div>
          <div className="wf-progress-track flex-1" aria-label={`${percent}% complete`}>
            <span style={{ width: `${percent}%` }} />
          </div>
        </div>
        {current ? (
          <ButtonLink
            className="relative z-1 mt-7 bg-[var(--wf-accent)] text-[#242019] hover:bg-[var(--wf-accent)]/90"
            href={`#learn/${current.number}`}
          >
            Continue · Chapter {current.number} <span aria-hidden="true">→</span>
          </ButtonLink>
        ) : null}
      </section>

      <aside className="mt-5 border-l-4 border-[var(--wf-accent)] bg-card px-4 py-3 text-sm text-muted-foreground">
        <strong className="text-foreground">How this path works.</strong> Read the scar, choose the architect or
        AI-engineer track, reproduce the failure, then make the real check green. Git tags—not browser
        checkboxes—are the progress record.
      </aside>

      <div className="mt-8 grid grid-cols-1 gap-5 xl:grid-cols-2">
        {catalog.phases.map((phase, phaseIndex) => {
          const chapters = phase.chapters
            .map((number) => catalog.chapters.find((chapter) => chapter.number === number))
            .filter((chapter): chapter is CurriculumChapter => Boolean(chapter));
          const passed = chapters.filter((chapter) => chapter.status === "passed").length;
          return (
            <section key={phase.id} data-slot="course-phase" className="wf-phase-card rounded-xl border border-border bg-card p-5">
              <div className="wf-eyebrow pt-1">{String(phaseIndex + 1).padStart(2, "0")}</div>
              <div className="min-w-0">
                <div className="font-mono text-[0.6rem] font-bold uppercase tracking-[0.1em] text-muted-foreground">
                  {passed} of {chapters.length} passed
                </div>
                <h3 className="mt-1 text-xl font-bold tracking-tight text-foreground">{phase.name}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{phase.promise}</p>
                <div className="mt-4 border-t border-border">
                  {chapters.map((chapter) => (
                    <a
                      key={chapter.number}
                      data-slot="lesson-row"
                      href={`#learn/${chapter.number}`}
                      className="grid grid-cols-[2rem_minmax(0,1fr)_auto] items-center gap-2 border-b border-border py-3 text-foreground no-underline hover:text-primary"
                    >
                      <span className="font-mono text-xs text-muted-foreground">{chapter.number}</span>
                      <span className="min-w-0 text-sm font-semibold">{chapter.title}</span>
                      <StatusBadge chapter={chapter} />
                    </a>
                  ))}
                </div>
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}

function MarkdownLesson({ markdown }: { markdown: string }) {
  return (
    <article data-slot="lesson-content" className="wf-markdown">
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{markdown}</ReactMarkdown>
    </article>
  );
}

function LessonReader({ catalog, route }: { catalog: CurriculumCatalog; route: string }) {
  const [number, requested = "brief"] = route.split("/");
  const index = catalog.chapters.findIndex((chapter) => chapter.number === number);
  if (index < 0) return <CurriculumHome catalog={catalog} />;

  const chapter = catalog.chapters[index];
  const previous = catalog.chapters[index - 1];
  const next = catalog.chapters[index + 1];
  const phase = catalog.phases.find((candidate) => candidate.id === chapter.phase);
  const track: CurriculumTrack = requested === "architect" || requested === "engineer" || requested === "lab" ? requested : "brief";
  const markdown = track === "brief" ? chapter.brief : track === "lab" ? "" : chapter.tracks[track];
  const assignment = chapter.status === "current"
    ? "This is the active assignment. Run the failure first; only green evidence advances the course."
    : chapter.status === "passed"
      ? "Your repository records this chapter as passed. Revisit the evidence or compare approaches."
      : chapter.status === "available"
        ? "The instrument exists, but an earlier chapter is still active. Read ahead without fixing ahead."
        : "This module is designed but its deterministic failure instrument is not published yet. Preview it; do not treat it as runnable.";

  const tabs = [
    ["brief", "Lesson"],
    ...(chapter.tracks.architect ? [["architect", "Architect track"]] : []),
    ...(chapter.tracks.engineer ? [["engineer", "AI-engineer track"]] : []),
    ["lab", "Lab"],
  ];

  return (
    <div data-slot="curriculum-surface" className="pb-8">
      <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-muted-foreground">
        <a className="text-primary no-underline" href="#learn">Curriculum</a><span>/</span><span>Chapter {chapter.number}</span>
      </nav>
      <header className="mt-7">
        <div className="wf-eyebrow flex items-center gap-2">Chapter {chapter.number} · <StatusBadge chapter={chapter} /></div>
        <h2 className="mt-5 max-w-4xl text-4xl font-bold leading-[1.04] tracking-[-0.035em] text-foreground sm:text-5xl">{chapter.title}</h2>
        <p className="mt-4 max-w-3xl text-[0.94rem] leading-7 text-muted-foreground">{chapter.summary}</p>
        <div className="wf-eyebrow mt-4">Competency · {chapter.competency}</div>
        <section data-slot="lesson-contract">
          <DetailsPanel
            className="wf-lesson-contract mt-6"
            items={[
              { term: "Phase", value: phase?.name ?? chapter.phase },
              { term: "Sequence", value: `${index + 1} of ${catalog.chapters.length}` },
              { term: "Prerequisite", value: previous ? `Chapter ${previous.number} · ${previous.title}` : "Working harness" },
              { term: "Required evidence", value: chapter.runnable ? chapter.check : "Failure instrument pending" },
            ]}
          />
        </section>
      </header>

      <nav data-slot="lesson-tabs" aria-label="Lesson tracks" className="mt-7 flex gap-1 overflow-x-auto border-b border-border">
        {tabs.map(([key, label]) => (
          <a
            key={key}
            href={`#learn/${chapter.number}/${key}`}
            aria-current={track === key ? "page" : undefined}
            className={`whitespace-nowrap border-b-3 px-4 py-3 text-sm font-semibold no-underline ${
              track === key ? "border-[var(--wf-accent)] text-[var(--wf-accent-strong)]" : "border-transparent text-muted-foreground hover:text-foreground"
            }`}
          >{label}</a>
        ))}
      </nav>

      {track === "lab" ? (
        <Suspense fallback={<p className="mt-10 text-sm text-muted-foreground" role="status">Loading the lab workbench…</p>}>
          <GuidedLabWorkbench
            chapter={chapter}
            journalPanel={<LearningJournalPanel key={chapter.number} chapter={chapter} track={track} />}
            onSessionChange={publishLabSession}
          />
        </Suspense>
      ) : (
        <a className="wf-lab-callout" href={`#learn/${chapter.number}/lab`}>
          <span>
            <span className="wf-eyebrow">{chapter.lab?.state === "preview" ? "Lab preview" : "Hands-on lab"}</span>
            <strong>Open lab workspace</strong>
            <small>{chapter.lab?.scenario}</small>
          </span>
          <span aria-hidden="true">→</span>
        </a>
      )}

      {track !== "lab" ? <div className="mt-8 grid grid-cols-1 items-start gap-10 xl:grid-cols-[minmax(0,1fr)_15.5rem]">
        <div className="min-w-0 max-w-3xl">
          <MarkdownLesson markdown={markdown} />
          <section data-slot="knowledge-check" aria-labelledby="wf-knowledge-title" className="mt-9 rounded-lg border border-border border-l-4 border-l-[var(--wf-accent)] bg-card p-6">
            <div className="wf-eyebrow">Mastery reflection</div>
            <h3 id="wf-knowledge-title" className="mt-3 text-xl font-bold text-foreground">Knowledge check</h3>
            <ol className="mt-4 list-decimal space-y-3 pl-5 text-sm leading-6 text-foreground">
              {chapter.knowledge_checks.map((question) => <li key={question}>{question}</li>)}
            </ol>
            <p className="mt-4 text-xs text-muted-foreground">Answer these in your own words before treating a green check as mastery.</p>
          </section>
        </div>

        <aside data-slot="assignment-panel" className="sticky top-24">
          <PanelShell className="border-t-3 border-t-[var(--wf-accent)]" padding="md">
            <div className="wf-eyebrow">Your assignment</div>
            <p className="mt-3 text-sm leading-6 text-muted-foreground">{assignment}</p>
            <div className="mt-4">
              {chapter.runnable
                ? <code className="block rounded border border-border bg-background px-3 py-2 text-xs">{chapter.check}</code>
                : <Badge tone="neutral">Reading preview</Badge>}
            </div>
            {chapter.runnable ? <ButtonLink className="mt-3 w-full" size="sm" href={`#${chapter.evidence_view}`}>Open live evidence →</ButtonLink> : null}
            <div className="mt-5 border-t border-border pt-4">
              <strong className="text-xs text-foreground">AI rule</strong>
              <p className="mt-1 text-xs leading-5 text-muted-foreground">Use your assistant as reviewer and rubber duck. You write the chapter solution.</p>
            </div>
          </PanelShell>
        </aside>
      </div> : null}

      {track !== "lab" ? <LearningJournalPanel key={chapter.number} chapter={chapter} track={track} /> : null}

      <nav data-slot="lesson-pagination" aria-label="Adjacent lessons" className="mt-11 grid grid-cols-2 gap-4 border-t border-border pt-6">
        {previous ? <a className="rounded-lg border border-border bg-card p-4 text-foreground no-underline hover:border-primary" href={`#learn/${previous.number}`}><span className="block text-[0.62rem] uppercase tracking-wider text-muted-foreground">← Previous</span><strong className="mt-1 block text-sm">{previous.title}</strong></a> : <span />}
        {next ? <a className="rounded-lg border border-border bg-card p-4 text-right text-foreground no-underline hover:border-primary" href={`#learn/${next.number}`}><span className="block text-[0.62rem] uppercase tracking-wider text-muted-foreground">Next →</span><strong className="mt-1 block text-sm">{next.title}</strong></a> : <span />}
      </nav>
    </div>
  );
}

function CurriculumApp({ catalog, route }: { catalog: CurriculumCatalog; route: string | null }) {
  return route ? <LessonReader catalog={catalog} route={route} /> : <CurriculumHome catalog={catalog} />;
}

window.WakuCurriculum = {
  render(element, catalog, route) {
    let root = roots.get(element);
    if (!root) {
      root = createRoot(element);
      roots.set(element, root);
    }
    root.render(<CurriculumApp catalog={catalog} route={route} />);
  },
  unmount(element) {
    const root = roots.get(element);
    if (root) {
      root.unmount();
      roots.delete(element);
    }
  },
  getLearningContext() {
    return activeLearningContext;
  },
  getLabSessionId() {
    return activeLabSessionId;
  },
};

window.dispatchEvent(new Event("waku-curriculum-ready"));
