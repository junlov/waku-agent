"""DETERMINISTIC EVAL — working-memory assembly is pure string logic.

Regression net for a live bug found on the dashboard: the agent had the date
but not the time, so it asked the user "what time is it?" before scheduling
something "in 30 minutes." The system prompt must carry a real clock.
"""

from __future__ import annotations

import re

from waku.config import Settings, load_settings
from waku.runtime.session import Session


def test_system_prompt_includes_current_time():
    settings = load_settings()
    settings.ensure_home()
    system = Session(settings, memory=None).build_system("what should I do in 30 minutes?")
    # a HH:MM clock must be present — not just a date — so the model never has
    # to ask the user for the time (the live bug).
    assert re.search(r"\b\d{2}:\d{2}\b", system), "system prompt is missing a HH:MM time"
    assert "Right now it is" in system


def test_sandbox_authority_is_runtime_context_not_durable_soul(monkeypatch, tmp_path):
    settings = Settings(home=tmp_path)
    (tmp_path / "SOUL.md").write_text("My customized durable soul.")
    monkeypatch.setenv("WAKU_SANDBOX", "1")

    system = Session(settings, memory=None).build_system("repair yourself")

    assert "My customized durable soul." in system
    assert "run_command has full shell and file authority" in system
    assert "restores the last-known-good workspace" in system


def test_session_tags_history_with_its_session_id():
    # sessions are just a session_id label; a fresh Session carries the default.
    settings = load_settings()
    assert Session(settings, memory=None).session_id == "default"
    s = Session(settings, memory=None)
    s.start_new("s-test")
    assert s.session_id == "s-test" and s.history == []
