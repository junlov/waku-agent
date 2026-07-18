import { useEffect, useRef } from "react";

// The legacy render library (waku/ops/static/app.js) paints the unmigrated
// evidence panels into this mount. React owns the route + data push; app.js
// owns the panel HTML, the editing guard, and the overview animation guard.
declare global {
  interface Window {
    WakuLegacy?: {
      mount(el: HTMLElement | null): void;
      update(view: string, sub: string | null, data: unknown, curriculum: unknown): void;
      TITLES?: Record<string, string>;
      VIEW_SUBTITLES?: Record<string, string>;
    };
  }
}

export function LegacyView() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    window.WakuLegacy?.mount(ref.current);
    return () => window.WakuLegacy?.mount(null);
  }, []);

  return <div id="view" className="legacy-view" ref={ref} />;
}
