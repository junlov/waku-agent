from __future__ import annotations

import subprocess

from waku.config import Settings
from waku.db import connect
from waku.tools import build_registry
from waku.tools import curriculum


ACTIVE_CHAPTER_01_TAGS = {
    "chapter-00-start",
    "chapter-00-solution",
    "chapter-01-start",
}


def test_curriculum_tool_runs_only_the_whitelisted_measurement(monkeypatch, tmp_path):
    (tmp_path / "Makefile").write_text("scale-01:\n\t@echo measured\n\ncheck-01:\n\t@echo graded\n")
    calls = []

    def runner(command, **kwargs):
        calls.append((command, kwargs))
        return subprocess.CompletedProcess(command, 0, stdout="10 tenants: p95 19.8s\n", stderr="")

    monkeypatch.setattr(curriculum, "_repository_tags", lambda _root: ACTIVE_CHAPTER_01_TAGS)
    tool = curriculum.make_tool(repo_root=tmp_path, runner=runner)

    output = tool.fn(chapter="01", mode="measure")

    assert calls[0][0] == ["make", "scale-01"]
    assert calls[0][1]["shell"] is False
    assert calls[0][1]["env"]["WAKU_PROVIDER"] == "sim"
    assert "PASS: `make scale-01`" in output
    assert "10 tenants: p95 19.8s" in output


def test_curriculum_tool_refuses_non_current_chapter(monkeypatch, tmp_path):
    monkeypatch.setattr(curriculum, "_repository_tags", lambda _root: ACTIVE_CHAPTER_01_TAGS)
    tool = curriculum.make_tool(
        repo_root=tmp_path,
        runner=lambda *_args, **_kwargs: (_ for _ in ()).throw(AssertionError("must not run")),
    )

    output = tool.fn(chapter="05", mode="grade")

    assert "Refused" in output
    assert "current curriculum chapter is 01" in output


def test_curriculum_tool_reports_missing_instrument_honestly(monkeypatch, tmp_path):
    (tmp_path / "Makefile").write_text("check-01:\n\t@echo graded\n")
    monkeypatch.setattr(curriculum, "_repository_tags", lambda _root: ACTIVE_CHAPTER_01_TAGS)
    tool = curriculum.make_tool(repo_root=tmp_path)

    output = tool.fn(chapter="01", mode="measure")

    assert "not instrumented" in output
    assert "scale-01" in output


def test_curriculum_tool_schema_does_not_offer_arbitrary_commands():
    tool = curriculum.make_tool()

    assert tool.name == "run_curriculum_check"
    assert set(tool.input_schema["properties"]) == {"chapter", "mode"}
    assert tool.input_schema["properties"]["mode"]["enum"] == ["measure", "grade"]


def test_curriculum_tool_is_registered_by_default(tmp_path):
    registry = build_registry(connect(tmp_path), Settings(home=tmp_path, provider="sim"))

    names = {tool["name"] for tool in registry.schemas()}

    assert "run_curriculum_check" in names


def test_embedded_runner_uses_waku_runtime_for_temporary_state(monkeypatch, tmp_path):
    captured = {}

    class StopAfterTempDir(RuntimeError):
        pass

    class TempDirProbe:
        def __init__(self, **kwargs):
            captured.update(kwargs)
            raise StopAfterTempDir

    monkeypatch.setattr(curriculum.tempfile, "TemporaryDirectory", TempDirProbe)

    runtime_home = tmp_path / "runtime" / ".waku"
    try:
        curriculum._embedded_chapter_check(
            tmp_path, "01", "measure", {"WAKU_HOME": str(runtime_home)},
        )
    except StopAfterTempDir:
        pass

    assert captured["dir"] == runtime_home.parent
    assert runtime_home.parent.is_dir()
