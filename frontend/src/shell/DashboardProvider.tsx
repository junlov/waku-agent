import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  type MutableRefObject,
  type ReactNode,
} from "react";
import type { CurriculumCatalog } from "../types.js";

// The dashboard payload is the backend's /api/data shape (dashboard.py). The
// shell only reads a handful of fields for the nav counts and brand line; the
// rest is pushed verbatim into the legacy render library (app.js).
export interface DashboardData {
  provider: string;
  model: string;
  chat_log?: unknown[];
  stats: { turns: number; tool_errors: number; [key: string]: unknown };
  facts: unknown[];
  episodes: unknown[];
  calendar: unknown[];
  outbox: unknown[];
  db?: { all_tables: string[] };
  eval_report?: unknown;
  [key: string]: unknown;
}

// 450ms /api/events cursor feed. Stored in a ref (not state) on purpose: the
// feed exists for migrated panels (Phase 1 overview), and nothing in the shell
// should re-render at that cadence.
export interface EventsFeed {
  cursor: string | number | null;
  events: unknown[];
}

interface DashboardContextValue {
  D: DashboardData | null;
  curriculum: CurriculumCatalog | null;
  lastFetch: number;
  /** 1s counter so the pagehead subtitle can re-render its "updated Ns ago". */
  tick: number;
  eventsRef: MutableRefObject<EventsFeed>;
}

const DashboardContext = createContext<DashboardContextValue | null>(null);

export function useDashboard(): DashboardContextValue {
  const ctx = useContext(DashboardContext);
  if (!ctx) throw new Error("useDashboard must be used inside DashboardProvider");
  return ctx;
}

declare global {
  interface Window {
    /** Registered by the provider so legacy app.js mutations can re-pull now. */
    WakuRefresh?: () => Promise<void>;
  }
}

export function DashboardProvider({ children }: { children: ReactNode }) {
  const [D, setD] = useState<DashboardData | null>(null);
  const [curriculum, setCurriculum] = useState<CurriculumCatalog | null>(null);
  const [lastFetch, setLastFetch] = useState<number>(Date.now());
  const [tick, setTick] = useState(0);
  const curriculumRef = useRef<CurriculumCatalog | null>(null);
  const eventsRef = useRef<EventsFeed>({ cursor: null, events: [] });

  useEffect(() => {
    let cancelled = false;

    // Same cadence and stale-data-on-error tolerance as the old app.js boot:
    // /api/data every 5s, /api/curriculum only until the first success.
    const refresh = async () => {
      try {
        const requests: Promise<unknown>[] = [fetch("/api/data").then((r) => r.json())];
        if (!curriculumRef.current) {
          requests.push(fetch("/api/curriculum").then((r) => r.json()));
        }
        const results = await Promise.all(requests);
        if (cancelled) return;
        setD(results[0] as DashboardData);
        if (results[1]) {
          curriculumRef.current = results[1] as CurriculumCatalog;
          setCurriculum(curriculumRef.current);
        }
        setLastFetch(Date.now());
      } catch {
        /* server restarting — keep showing last data */
      }
    };
    window.WakuRefresh = refresh;
    refresh();
    const refreshId = setInterval(refresh, 5000);
    const tickId = setInterval(() => setTick((t) => t + 1), 1000);

    // Events cursor poll (drives the legacy overview animation today via
    // app.js's own poller; exposed here for the Phase 1 React overview).
    let evCursor: string | number | null = null;
    const pollEvents = async () => {
      try {
        const r = await (
          await fetch("/api/events" + (evCursor == null ? "" : "?cursor=" + evCursor))
        ).json();
        if (evCursor != null && Array.isArray(r.events) && r.events.length) {
          const feed = eventsRef.current;
          feed.events.push(...r.events);
          if (feed.events.length > 500) feed.events.splice(0, feed.events.length - 500);
        }
        evCursor = r.cursor;
        eventsRef.current.cursor = evCursor;
      } catch {
        /* server busy */
      }
    };
    pollEvents();
    const eventsId = setInterval(pollEvents, 450);

    return () => {
      cancelled = true;
      clearInterval(refreshId);
      clearInterval(tickId);
      clearInterval(eventsId);
      delete window.WakuRefresh;
    };
  }, []);

  return (
    <DashboardContext.Provider value={{ D, curriculum, lastFetch, tick, eventsRef }}>
      {children}
    </DashboardContext.Provider>
  );
}
