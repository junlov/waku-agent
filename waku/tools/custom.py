"""Load agent-authored local tools from the sandbox workspace."""

from __future__ import annotations

import importlib.util
from pathlib import Path

from waku.tools.registry import Tool


def load_tools(directory: Path, recorder=None) -> list[Tool]:
    tools: list[Tool] = []
    if not directory.is_dir():
        return tools
    for path in sorted(directory.glob("*.py")):
        if path.name.startswith("_"):
            continue
        try:
            spec = importlib.util.spec_from_file_location(f"waku_custom_{path.stem}", path)
            if spec is None or spec.loader is None:
                raise ImportError(f"could not load {path}")
            module = importlib.util.module_from_spec(spec)
            spec.loader.exec_module(module)
            made = module.make_tool()
            candidates = made if isinstance(made, list) else [made]
            if not all(isinstance(tool, Tool) for tool in candidates):
                raise TypeError("make_tool() must return Tool or list[Tool]")
            for tool in candidates:
                tool.source = "custom"
                tools.append(tool)
            if recorder:
                recorder.record(source="custom", integration=path.stem, operation="load",
                                status="ok", message=f"Loaded {len(candidates)} tool(s)")
        except Exception as exc:
            if recorder:
                recorder.record(source="custom", integration=path.stem, operation="load",
                                status="error", category="load", message=str(exc))
    return tools
