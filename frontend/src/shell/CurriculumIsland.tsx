import { useEffect, useRef } from "react";
import type { CurriculumCatalog } from "../types.js";

// #learn/* keeps rendering through the existing window.WakuCurriculum island
// adapter (registered by curriculum.tsx, which main.tsx imports). The island
// itself is unchanged; React just took over the mount/unmount timing that
// app.js's render() used to own.
export function CurriculumIsland({
  catalog,
  sub,
}: {
  catalog: CurriculumCatalog | null;
  sub: string | null;
}) {
  const hostRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const host = hostRef.current;
    if (!host || !catalog || !window.WakuCurriculum) return;
    window.WakuCurriculum.render(host, catalog, sub);
  }, [catalog, sub]);

  useEffect(
    () => () => {
      const host = hostRef.current;
      if (host && window.WakuCurriculum) window.WakuCurriculum.unmount(host);
    },
    [],
  );

  return (
    <div id="view">
      {catalog ? (
        <div id="curriculum-react-root" ref={hostRef} />
      ) : (
        <div className="card empty">loading the curriculum…</div>
      )}
    </div>
  );
}
