"""Ask the immutable sandbox supervisor to restart the mutable harness."""

from __future__ import annotations

import argparse
import json
import os
import time
from pathlib import Path


def request_restart(runtime: Path, delay: int) -> Path:
    runtime.mkdir(parents=True, exist_ok=True)
    target = runtime / "restart.request"
    temporary = runtime / "restart.request.tmp"
    payload = {
        "requested_at": time.time(),
        "not_before": time.time() + max(1, delay),
    }
    temporary.write_text(json.dumps(payload))
    temporary.replace(target)
    return target


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__)
    subparsers = parser.add_subparsers(dest="command", required=True)
    restart = subparsers.add_parser("restart")
    restart.add_argument("--delay", type=int, default=15)
    args = parser.parse_args()

    runtime = Path(os.getenv("WAKU_RUNTIME", "/var/lib/waku"))
    path = request_restart(runtime, args.delay)
    print(f"Restart requested via {path}; supervisor will validate and roll back if unhealthy.")


if __name__ == "__main__":
    main()
