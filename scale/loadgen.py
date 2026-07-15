"""Load generator: N simulated tenants having real conversations.

Stdlib only. Each tenant is a thread running a conversation script against
the dashboard HTTP API (the same door the browser uses), with think-time
jitter between turns. Output is the numbers production engineers argue
about: p50/p95/p99 latency, throughput, error rate, plus per-turn
correctness flags.

Meant to run against the `sim` provider (WAKU_PROVIDER=sim): free,
deterministic, and honest about SHAPE (latency, errors) without real model
calls. Usable as a CLI or imported by the chapter tests:

    python -m scale.loadgen --base-url http://127.0.0.1:7777 --tenants 10
"""

from __future__ import annotations

import argparse
import json
import threading
import time
import urllib.error
import urllib.request
from dataclasses import dataclass, field
from random import Random

# The default conversation script. {t} is the tenant id. Markers like
# [[tool:...]] script the sim provider's tool calls so a turn exercises the
# whole loop (gate, tool dispatch, memory write), not just a text reply.
DEFAULT_SCRIPT = [
    "Hi, I'm tenant {t}. Remember that {t}'s favorite color is teal-{t}.",
    "What is {t}'s favorite color? [[retrieve]]",
    '[[tool:create_event|{"title": "{t} sync", "start": "2026-07-20T09:00:00"}]] book my sync',
]


@dataclass
class Turn:
    tenant: str
    latency_s: float
    ok: bool
    error: str = ""


@dataclass
class Report:
    turns: list[Turn] = field(default_factory=list)
    wall_s: float = 0.0

    def _lats(self):
        return sorted(t.latency_s for t in self.turns if t.ok)

    def pct(self, p: float) -> float:
        lats = self._lats()
        return lats[min(len(lats) - 1, int(len(lats) * p))] if lats else 0.0

    @property
    def errors(self):
        return [t for t in self.turns if not t.ok]

    def summary(self) -> dict:
        ok = [t for t in self.turns if t.ok]
        return {
            "turns": len(self.turns), "ok": len(ok), "errors": len(self.errors),
            "error_rate": round(len(self.errors) / len(self.turns), 4) if self.turns else 0,
            "p50_s": round(self.pct(0.50), 2), "p95_s": round(self.pct(0.95), 2),
            "p99_s": round(self.pct(0.99), 2),
            "throughput_turns_min": round(len(ok) / self.wall_s * 60, 1) if self.wall_s else 0,
            "wall_s": round(self.wall_s, 1),
        }

    def print_summary(self, label: str = "") -> None:
        s = self.summary()
        print(f"[loadgen{f' {label}' if label else ''}] "
              f"turns={s['turns']} ok={s['ok']} err={s['errors']} ({s['error_rate']:.1%}) "
              f"p50={s['p50_s']}s p95={s['p95_s']}s p99={s['p99_s']}s "
              f"throughput={s['throughput_turns_min']}/min wall={s['wall_s']}s")


def _post_chat(base_url: str, message: str, timeout: float) -> tuple[bool, str]:
    req = urllib.request.Request(
        base_url.rstrip("/") + "/api/chat",
        data=json.dumps({"message": message}).encode(),
        headers={"Content-Type": "application/json"},
    )
    try:
        with urllib.request.urlopen(req, timeout=timeout) as resp:
            body = json.loads(resp.read())
    except (urllib.error.URLError, TimeoutError, OSError) as exc:
        return False, f"transport: {exc}"
    if body.get("error"):
        return False, str(body["error"])
    if not (body.get("reply") or "").strip():
        return False, "empty reply"
    return True, ""


def _tenant_worker(name: str, base_url: str, script: list[str], think_ms: int,
                   timeout: float, rng: Random, report: Report, lock: threading.Lock):
    for line in script:
        message = line.replace("{t}", name)
        start = time.monotonic()
        ok, err = _post_chat(base_url, message, timeout)
        turn = Turn(tenant=name, latency_s=time.monotonic() - start, ok=ok, error=err)
        with lock:
            report.turns.append(turn)
        time.sleep(rng.uniform(0, think_ms / 1000))


def run(base_url: str, tenants: int, script: list[str] | None = None,
        think_ms: int = 500, timeout: float = 120.0, seed: int = 7) -> Report:
    """Run `tenants` concurrent conversations; return the measured Report."""
    script = script or DEFAULT_SCRIPT
    report, lock = Report(), threading.Lock()
    rng = Random(seed)
    threads = [
        threading.Thread(
            target=_tenant_worker,
            args=(f"t{i}", base_url, script, think_ms, timeout, Random(rng.random()), report, lock),
            daemon=True,
        )
        for i in range(tenants)
    ]
    start = time.monotonic()
    for t in threads:
        t.start()
    for t in threads:
        t.join()
    report.wall_s = time.monotonic() - start
    return report


def main() -> None:
    ap = argparse.ArgumentParser(description=__doc__)
    ap.add_argument("--base-url", default="http://127.0.0.1:7777")
    ap.add_argument("--tenants", type=int, default=5)
    ap.add_argument("--think-ms", type=int, default=500)
    ap.add_argument("--timeout", type=float, default=120)
    ap.add_argument("--json", action="store_true", help="emit the summary as JSON")
    args = ap.parse_args()
    report = run(args.base_url, args.tenants, think_ms=args.think_ms, timeout=args.timeout)
    if args.json:
        print(json.dumps(report.summary()))
    else:
        report.print_summary()
        for t in report.errors[:5]:
            print(f"  error ({t.tenant}): {t.error[:120]}")


if __name__ == "__main__":
    main()
