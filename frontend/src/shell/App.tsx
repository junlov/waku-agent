import { useEffect, useRef, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { CurriculumCatalog } from "../types.js";
import { DashboardProvider, useDashboard, type DashboardData } from "./DashboardProvider";
import { LegacyView } from "./LegacyView";
import { CurriculumIsland } from "./CurriculumIsland";

// Hand-rolled hash router — same parsing and fallback as the old app.js
// render(): unknown views fall back to "learn", sub is everything after the
// first slash (e.g. "01/brief", "semantic", "query").
const KNOWN_VIEWS = [
  "learn",
  "overview",
  "gateway",
  "loop",
  "memory",
  "tools",
  "database",
  "ops",
  "settings",
];

interface Route {
  view: string;
  sub: string | null;
  /** Raw first hash segment — the subtitle lookup used this, not the normalized view. */
  raw: string;
}

function parseHash(): Route {
  const parts = (window.location.hash || "#learn").slice(1).split("/");
  const v = parts.shift() || "learn";
  const sub = parts.join("/") || null;
  return { view: KNOWN_VIEWS.includes(v) ? v : "learn", sub, raw: v };
}

// Nav counts — computed from D exactly as the old render() did.
function navCounts(D: DashboardData | null, curriculum: CurriculumCatalog | null) {
  if (!D) return { learn: "", gw: "", loop: "", mem: "", tools: "", db: "", ops: "" };
  const current = curriculum && curriculum.current;
  return {
    learn: current ? String(current) : "✓",
    gw: String((D.chat_log || []).length),
    loop: String(D.stats.turns),
    mem: String(D.facts.length + D.episodes.length),
    tools: String(D.calendar.length + D.outbox.length),
    db: String((D.db && D.db.all_tables.length) || ""),
    ops: String(D.stats.tool_errors || (D.eval_report ? "" : "!")),
  };
}

// Count chip. shadcn Badge carrying the dashboard's own `.n` styling — the
// overrides strip the kit's pill chrome so the pixels are the old plain-text
// count (style.css's unlayered `#nav .n` rules win over utilities anyway).
function NavCount({ id, children }: { id: string; children: string }) {
  return (
    <>
      {" "}
      <Badge
        variant="secondary"
        id={id}
        className="n rounded-none border-transparent bg-transparent px-0 py-0 font-normal [a&]:hover:bg-transparent hover:bg-transparent"
      >
        {children}
      </Badge>
    </>
  );
}

function NavLink({
  v,
  route,
  label,
  count,
  countId,
}: {
  v: string;
  route: Route;
  label: string;
  count?: string;
  countId?: string;
}) {
  return (
    <a href={`#${v}`} data-v={v} className={route.view === v ? "on" : ""}>
      {label}
      {count !== undefined && countId ? <NavCount id={countId}>{count}</NavCount> : null}
    </a>
  );
}

function Sidebar({ route }: { route: Route }) {
  const { D, curriculum } = useDashboard();
  const counts = navCounts(D, curriculum);
  return (
    <nav id="nav">
      <div className="brand">
        {"Waku わく"}
        <small
          id="model"
          style={{ cursor: "pointer" }}
          title="click to change the model"
          onClick={() => {
            window.location.hash = "#settings";
          }}
        >
          {D ? `${D.provider} · ${D.model}` : ""}
        </small>
        <Button
          variant="ghost"
          size="icon"
          id="nav-toggle"
          title="Hide sidebar"
          aria-label="Hide sidebar"
          className="h-auto w-auto rounded-none font-[650] transition-none focus-visible:ring-0"
        >
          &#10094;
        </Button>
      </div>
      <div className="grp">Learn</div>
      <NavLink v="learn" route={route} label="Curriculum" count={counts.learn} countId="n-learn" />
      <div id="system-nav">
        <div className="grp">Evidence workspace</div>
        <NavLink v="overview" route={route} label="Overview" />
        <NavLink v="gateway" route={route} label="Gateway" count={counts.gw} countId="n-gw" />
        <NavLink v="loop" route={route} label="Loop" count={counts.loop} countId="n-loop" />
        <NavLink v="memory" route={route} label="Memory" count={counts.mem} countId="n-mem" />
        <NavLink v="tools" route={route} label="Tools" count={counts.tools} countId="n-tools" />
        <NavLink v="database" route={route} label="Database" count={counts.db} countId="n-db" />
        <NavLink v="ops" route={route} label="Ops" count={counts.ops} countId="n-ops" />
        <NavLink v="settings" route={route} label="Settings" />
      </div>
    </nav>
  );
}

// Pagehead subtitle — the old tickLive(): rewritten every second, "live ·
// updated Ns ago · <view subtitle>", or the curriculum line on #learn. The
// subtitle map itself stays in app.js (pinned there by the UI contract tests)
// and is read off the legacy adapter.
function Subtitle({ route }: { route: string }) {
  const { D, curriculum, lastFetch, tick } = useDashboard();
  void tick; // re-render once a second
  if (!D) return null;
  const ago = Math.round((Date.now() - lastFetch) / 1000);
  if (route === "learn") {
    return (
      <>
        self-directed · repository-backed progress · current chapter{" "}
        {(curriculum && curriculum.current) || "—"}
      </>
    );
  }
  const subtitles = window.WakuLegacy?.VIEW_SUBTITLES ?? {};
  return (
    <>
      <span className="live">
        <span className="dot"></span>live
      </span>
      {` · updated ${ago}s ago · ${subtitles[route] || "agent evidence workspace"}`}
    </>
  );
}

function Shell() {
  const { D, curriculum } = useDashboard();
  const [route, setRoute] = useState<Route>(parseHash);
  const resizerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onHash = () => setRoute(parseHash());
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  // Drive the legacy render library: every route change and every 5s data
  // poll pushes (view, sub, D, curriculum) into app.js, which paints the
  // unmigrated panels (with its editing + animation guards) and refreshes
  // the vanilla dock. NOT hooked to the 1s tick — panels rebuild on the old
  // 5s cadence only.
  useEffect(() => {
    window.WakuLegacy?.update(route.view, route.sub, D, curriculum);
  }, [route.view, route.sub, D, curriculum]);

  // Sidebar width resizer — the drag the old wireResizer() gave #nav-resizer,
  // same CSS var, key, and bounds. (Width restore + collapse stayed in app.js:
  // the UI contract tests pin that code there, and it runs before first paint.)
  useEffect(() => {
    const el = resizerRef.current;
    if (!el) return;
    const onMouseDown = (e: MouseEvent) => {
      e.preventDefault();
      document.body.classList.add("resizing");
      const move = (ev: MouseEvent) => {
        const w = Math.max(150, Math.min(380, ev.clientX));
        document.documentElement.style.setProperty("--nav-w", w + "px");
        localStorage.setItem("navW", String(w));
      };
      const up = () => {
        document.body.classList.remove("resizing");
        document.removeEventListener("mousemove", move);
        document.removeEventListener("mouseup", up);
      };
      document.addEventListener("mousemove", move);
      document.addEventListener("mouseup", up);
    };
    el.addEventListener("mousedown", onMouseDown);
    return () => el.removeEventListener("mousedown", onMouseDown);
  }, []);

  const titles = window.WakuLegacy?.TITLES ?? {};
  const title = titles[route.view] || route.view[0].toUpperCase() + route.view.slice(1);

  return (
    <>
      <Sidebar route={route} />
      <div className="resizer" id="nav-resizer" title="Drag to resize sidebar" ref={resizerRef} />
      <main>
        <header className="pagehead">
          <h1 id="title">{title}</h1>
          <div className="sub" id="sub">
            <Subtitle route={route.raw} />
          </div>
        </header>
        {route.view === "learn" ? (
          <CurriculumIsland catalog={curriculum} sub={route.sub} />
        ) : (
          <LegacyView />
        )}
      </main>
      <Button
        variant="ghost"
        id="nav-reopen"
        title="Show sidebar"
        aria-label="Show sidebar"
        className="rounded-none px-0 py-0 font-normal transition-none focus-visible:ring-0"
      >
        &#9776;
      </Button>
    </>
  );
}

export function App() {
  return (
    <DashboardProvider>
      <Shell />
    </DashboardProvider>
  );
}
