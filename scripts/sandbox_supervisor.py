"""Seed, run, health-check, and recover the mutable Waku sandbox workspace."""

from __future__ import annotations

import json
import os
import shutil
import signal
import subprocess
import sys
import time
import urllib.request
from pathlib import Path

IGNORED_NAMES = {
    ".beads",
    ".env",
    ".mypy_cache",
    ".pytest_cache",
    ".ruff_cache",
    ".venv",
    ".waku",
    "__pycache__",
    "build",
    "dist",
    "node_modules",
}


def _ignore(_directory: str, names: list[str]) -> set[str]:
    return {name for name in names if name in IGNORED_NAMES or name.endswith(".pyc")}


def copy_tree(source: Path, destination: Path) -> None:
    destination.mkdir(parents=True, exist_ok=True)
    shutil.copytree(source, destination, dirs_exist_ok=True, ignore=_ignore)


def clear_tree(directory: Path) -> None:
    directory.mkdir(parents=True, exist_ok=True)
    for child in directory.iterdir():
        if child.is_dir() and not child.is_symlink():
            shutil.rmtree(child)
        else:
            child.unlink()


def seed_workspace(seed: Path, workspace: Path) -> bool:
    marker = workspace / ".waku-sandbox-seed"
    if marker.exists():
        return False
    clear_tree(workspace)
    copy_tree(seed, workspace)
    marker.write_text(f"seed={seed}\ncreated={time.time()}\n")
    return True


def replace_checkpoint(workspace: Path, checkpoint: Path) -> None:
    temporary = checkpoint.with_name(checkpoint.name + ".new")
    if temporary.exists():
        shutil.rmtree(temporary)
    copy_tree(workspace, temporary)
    if checkpoint.exists():
        shutil.rmtree(checkpoint)
    temporary.replace(checkpoint)


def restore_checkpoint(checkpoint: Path, workspace: Path) -> None:
    clear_tree(workspace)
    copy_tree(checkpoint, workspace)


class Supervisor:
    def __init__(self) -> None:
        self.seed = Path(os.getenv("WAKU_SEED", "/seed"))
        self.workspace = Path(os.getenv("WAKU_WORKSPACE", "/workspace"))
        self.runtime = Path(os.getenv("WAKU_RUNTIME", "/var/lib/waku"))
        self.checkpoint = self.runtime / "checkpoints" / "last-good"
        self.request = self.runtime / "restart.request"
        self.health_url = os.getenv("WAKU_HEALTH_URL", "http://127.0.0.1:7777/api/data")
        self.child: subprocess.Popen | None = None
        self.stopping = False

    def launch(self) -> None:
        env = os.environ.copy()
        env["PYTHONPATH"] = str(self.workspace)
        self.child = subprocess.Popen(
            [sys.executable, "-m", "waku.ops.dashboard"],
            cwd=self.workspace,
            env=env,
        )

    def terminate(self) -> None:
        if self.child is None or self.child.poll() is not None:
            return
        self.child.terminate()
        try:
            self.child.wait(timeout=8)
        except subprocess.TimeoutExpired:
            self.child.kill()
            self.child.wait(timeout=3)

    def healthy(self, timeout: float = 25) -> bool:
        deadline = time.monotonic() + timeout
        while time.monotonic() < deadline:
            if self.child is None or self.child.poll() is not None:
                return False
            try:
                with urllib.request.urlopen(self.health_url, timeout=1) as response:
                    if response.status == 200:
                        return True
            except OSError:
                pass
            time.sleep(0.4)
        return False

    def request_due(self) -> bool:
        if not self.request.exists():
            return False
        try:
            payload = json.loads(self.request.read_text())
            return time.time() >= float(payload.get("not_before", 0))
        except (OSError, ValueError, TypeError):
            return True

    def recover_or_exit(self) -> None:
        print("sandbox supervisor: candidate unhealthy; restoring last-known-good", flush=True)
        self.terminate()
        restore_checkpoint(self.checkpoint, self.workspace)
        self.launch()
        if not self.healthy():
            raise RuntimeError("last-known-good sandbox checkpoint is unhealthy")

    def stop(self, *_args) -> None:
        self.stopping = True
        self.terminate()

    def run(self) -> None:
        if not self.seed.is_dir():
            raise RuntimeError(f"immutable seed missing at {self.seed}")
        self.runtime.mkdir(parents=True, exist_ok=True)
        seeded = seed_workspace(self.seed, self.workspace)
        if seeded or not self.checkpoint.exists():
            replace_checkpoint(self.workspace, self.checkpoint)

        signal.signal(signal.SIGTERM, self.stop)
        signal.signal(signal.SIGINT, self.stop)
        self.launch()
        if not self.healthy():
            self.recover_or_exit()

        while not self.stopping:
            if self.child is not None and self.child.poll() is not None:
                self.recover_or_exit()
            if self.request_due():
                print("sandbox supervisor: validating requested restart", flush=True)
                self.terminate()
                self.launch()
                if self.healthy():
                    replace_checkpoint(self.workspace, self.checkpoint)
                    print("sandbox supervisor: candidate promoted to last-known-good", flush=True)
                else:
                    self.recover_or_exit()
                self.request.unlink(missing_ok=True)
            time.sleep(0.5)


if __name__ == "__main__":
    Supervisor().run()
