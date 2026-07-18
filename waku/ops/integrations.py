"""Structured, redacted observability for providers, tools, and MCP servers."""

from __future__ import annotations

import json
import re
import sqlite3
from datetime import datetime, timezone
from pathlib import Path
from typing import Any

SECRET_KEYS = re.compile(r"(authorization|api[_-]?key|token|secret|password|credential)", re.I)
BEARER = re.compile(r"(?i)(bearer\s+)[^\s,;]+")
KEY_VALUE = re.compile(
    r"(?i)\b(api[_-]?key|token|secret|password|authorization)\b\s*[:=]\s*([^\s,;]+)"
)
OPAQUE_TOKEN = re.compile(
    r"\b(?:sk-(?:proj-)?|sk-ant-|gh[opsu]_|github_pat_)[A-Za-z0-9_-]{12,}\b"
)


def redact(value: Any, key: str = "") -> Any:
    """Remove common credentials before an event reaches durable storage."""
    if SECRET_KEYS.search(key):
        return "[REDACTED]"
    if isinstance(value, dict):
        return {str(k): redact(v, str(k)) for k, v in value.items()}
    if isinstance(value, (list, tuple)):
        return [redact(v) for v in value]
    if isinstance(value, str):
        value = BEARER.sub(r"\1[REDACTED]", value)
        value = KEY_VALUE.sub(lambda m: f"{m.group(1)}=[REDACTED]", value)
        return OPAQUE_TOKEN.sub("[REDACTED]", value)
    return value


def classify_result(output: str) -> tuple[str, str | None]:
    low = (output or "").lower()
    if "timed out" in low or low.startswith("timeout"):
        return "error", "timeout"
    if "not connected" in low or "connection refused" in low:
        return "error", "transport"
    if "unauthorized" in low or "forbidden" in low or "authentication" in low:
        return "error", "auth"
    if "rate limit" in low or "too many requests" in low:
        return "error", "rate_limit"
    if "failed" in low or low.startswith("error") or re.search(r"\bexit=[1-9]\d*\b", low):
        return "error", "execution"
    if "already exists" in low or "skipped" in low:
        return "warn", None
    return "ok", None


def classify_exception(exc: Exception) -> str:
    _status, category = classify_result(f"Error: {type(exc).__name__}: {exc}")
    return category or "execution"


class IntegrationRecorder:
    """Append integration events with a fresh connection, safe from MCP threads."""

    def __init__(self, home: Path):
        self.home = Path(home)
        self.path = self.home / "state.db"

    def record(
        self,
        *,
        source: str,
        integration: str,
        operation: str,
        status: str,
        message: str = "",
        category: str | None = None,
        latency_ms: int | None = None,
        retryable: bool = False,
        details: dict | None = None,
    ) -> None:
        try:
            safe_message = str(redact(message))[:4000]
            safe_details = json.dumps(redact(details or {}), ensure_ascii=False, default=str)[:12000]
            with sqlite3.connect(self.path, timeout=3) as conn:
                conn.execute(
                    """INSERT INTO integration_events
                       (created_at, source, integration, operation, status, category,
                        latency_ms, retryable, message, details_json)
                       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)""",
                    (
                        datetime.now(timezone.utc).isoformat(timespec="milliseconds"),
                        source,
                        integration,
                        operation,
                        status,
                        category,
                        latency_ms,
                        int(retryable),
                        safe_message,
                        safe_details,
                    ),
                )
        except Exception:
            pass
