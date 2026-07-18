export type ChapterStatus = "passed" | "current" | "available" | "roadmap";

export interface CurriculumPhase {
  id: string;
  name: string;
  promise: string;
  chapters: string[];
}

export interface CurriculumChapter {
  number: string;
  title: string;
  summary: string;
  status: ChapterStatus;
  runnable: boolean;
  check: string;
  phase: string;
  competency: string;
  evidence_view: string;
  knowledge_checks: string[];
  lab?: LabManifest;
  brief: string;
  tracks: {
    architect: string;
    engineer: string;
  };
}

export type LabPhase = "observe" | "explain" | "decide" | "repair" | "prove";

export interface LabHint {
  id: string;
  level: number;
  prompt: string;
}

export interface LabPlannedAction {
  id: string;
  description: string;
}

export interface LabStep {
  id: string;
  phase: LabPhase;
  title: string;
  body: string;
  success_criteria: string;
  actions: Array<string | LabPlannedAction>;
  hints: LabHint[];
}

export interface LabAction {
  id: string;
  step?: string;
  label: string;
  kind: "command" | "journal" | "editor" | "review" | "export";
  command?: string;
}

export interface LabCompletion {
  deterministic_check?: { action: string; command: string };
  decision_artifacts?: Array<{ path: string; type: string }>;
  reflection_fields?: string[];
  reflections?: string[];
  recap_destination: string;
}

export interface LabManifest {
    state: "runnable" | "preview";
    scenario: string;
    objectives: string[];
    measure: string;
    measure_exec?: string;
    verify: string;
    verify_exec?: string;
    prerequisites?: string[];
    outcomes?: string[];
    environment?: {
      editable_files?: string[];
      checkpoint?: string;
      workspace?: string;
    };
    steps?: LabStep[];
    actions?: LabAction[];
    completion?: LabCompletion;
    recap?: { template: string; destination: string };
}

export interface CurriculumCatalog {
  version: number;
  mission: string;
  completion_authority: "git-tags";
  phases: CurriculumPhase[];
  chapters: CurriculumChapter[];
  current: string | null;
  available_through: string | null;
  passed: number;
  total: number;
}

export type CurriculumTrack = "brief" | "architect" | "engineer" | "lab";

export interface LearningJournal {
  goal: string;
  hypothesis: string;
  evidence: string;
  decision: string;
  correction: string;
  next_step: string;
  updated_at: string;
}

export interface LearningContextPayload {
  version: 1;
  chapter: string;
  track: CurriculumTrack;
  journal: LearningJournal;
}

export interface CurriculumAdapter {
  render(element: HTMLElement, catalog: CurriculumCatalog, route: string | null): void;
  unmount(element: HTMLElement): void;
  getLearningContext(): LearningContextPayload | null;
  getLabSessionId(): string | null;
}
