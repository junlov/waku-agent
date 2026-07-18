"""Sanitized child-process environments and value-aware lab output redaction."""

from __future__ import annotations

import os
from dataclasses import dataclass
from pathlib import Path
from typing import Any, Mapping

from waku.ops.integrations import SECRET_KEYS, redact


SAFE_INHERITED_NAMES = frozenset(
    {
        "LANG",
        "LC_ALL",
        "LC_CTYPE",
        "LOGNAME",
        "NO_COLOR",
        "PATH",
        "PYTHONHASHSEED",
        "SHELL",
        "SSL_CERT_DIR",
        "SSL_CERT_FILE",
        "TERM",
        "TMPDIR",
        "TZ",
        "USER",
        "WAKU_HOME",
        "WAKU_LLM_TIMEOUT",
        "WAKU_RUNTIME",
    }
)
FORCED_NAMES = frozenset(
    {
        "HOME",
        "PYTHONPATH",
        "PYTHONDONTWRITEBYTECODE",
        "PYTHONUNBUFFERED",
        "WAKU_PROVIDER",
        "WAKU_SANDBOX",
        "WAKU_WORKSPACE",
    }
)
NON_SECRET_EXCLUDED_NAMES = frozenset({"_", "OLDPWD", "PWD", "SHLVL", "PS1", "PS2"})
SIMULATOR_NAMES = frozenset(
    {
        "WAKU_SIM_LATENCY_MS",
        "WAKU_SIM_LATENCY_P95_MS",
        "WAKU_SIM_ERROR_RATE",
        "WAKU_SIM_HANG_RATE",
        "WAKU_SIM_RATE_429",
        "WAKU_SIM_SEED",
    }
)


@dataclass(frozen=True)
class LabChildEnvironment:
    """Allowlisted environment plus values that must be removed from evidence."""

    values: dict[str, str]
    redaction_values: tuple[str, ...]

    def redact(self, value: object) -> str:
        return redact_lab_output(value, self.redaction_values)


def build_lab_child_environment(
    workspace: Path,
    *,
    source: Mapping[str, str] | None = None,
) -> LabChildEnvironment:
    """Build the deterministic, credential-free environment used by lab children."""
    workspace = Path(workspace).resolve()
    source_values = dict(os.environ if source is None else source)
    values = {
        key: value
        for key, value in source_values.items()
        if key in SAFE_INHERITED_NAMES or key in SIMULATOR_NAMES
    }
    values.update(
        {
            "HOME": str(workspace),
            "PYTHONDONTWRITEBYTECODE": "1",
            "PYTHONUNBUFFERED": "1",
            "WAKU_PROVIDER": "sim",
            "WAKU_SANDBOX": "1",
            "WAKU_WORKSPACE": str(workspace),
        }
    )
    values.setdefault("PATH", os.defpath)
    values.setdefault("TERM", "xterm-256color")
    runtime_root = Path(source_values.get("WAKU_RUNTIME", "/var/lib/waku"))
    lab_python = runtime_root / "lab-python"
    values["PYTHONPATH"] = os.pathsep.join(
        item for item in (str(workspace), str(lab_python) if lab_python.is_dir() else "") if item
    )

    return LabChildEnvironment(
        values=values,
        redaction_values=configured_redaction_values(source_values),
    )


def configured_redaction_values(
    source: Mapping[str, str] | None = None,
) -> tuple[str, ...]:
    """Return opaque values excluded from learner processes and public evidence."""
    source_values = dict(os.environ if source is None else source)
    retained_names = SAFE_INHERITED_NAMES | FORCED_NAMES
    secrets: set[str] = set()
    for key, value in source_values.items():
        if key in retained_names or key in SIMULATOR_NAMES:
            continue
        candidate = str(value or "")
        if key in NON_SECRET_EXCLUDED_NAMES or not candidate:
            continue
        if key.startswith("WAKU_SIM_") or SECRET_KEYS.search(key) or len(candidate) >= 8:
            secrets.add(candidate)
    return tuple(sorted(secrets, key=len, reverse=True))


def redact_lab_output(value: object, secret_values: tuple[str, ...]) -> str:
    """Apply pattern redaction plus exact configured-value redaction."""
    safe = str(redact(str(value)))
    for secret in secret_values:
        safe = safe.replace(secret, "[REDACTED]")
    return safe


def redact_configured(value: Any) -> Any:
    """Pattern-redact structured evidence, then remove configured opaque values."""
    safe = redact(value)
    secrets = configured_redaction_values()
    return _replace_configured_values(safe, secrets)


def redact_configured_output(value: object) -> str:
    """Redact one model- or Git-facing text value using current configuration."""
    return redact_lab_output(value, configured_redaction_values())


def _replace_configured_values(value: Any, secrets: tuple[str, ...]) -> Any:
    if isinstance(value, dict):
        return {str(key): _replace_configured_values(item, secrets) for key, item in value.items()}
    if isinstance(value, (list, tuple)):
        return [_replace_configured_values(item, secrets) for item in value]
    if isinstance(value, str):
        for secret in secrets:
            value = value.replace(secret, "[REDACTED]")
    return value
