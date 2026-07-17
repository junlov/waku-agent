"""Wiring — builds one Waku from its parts. Gateways call `respond()`.

This file is the assembly diagram in code: config → db → tools → memory →
session → loop. If you want to understand the repo in one place, start here.
"""

from __future__ import annotations

from waku.config import Settings, load_settings
from waku.db import connect
from waku.loop.agent import LoopResult, Observer, run_loop
from waku.loop.models import get_client
from waku.ops.tracing import Tracer, compose
from waku.ops.integrations import IntegrationRecorder, classify_exception
from waku.runtime.learning_context import LearningContext, contextualize_learning_turn
from waku.runtime.session import Session
from waku.tools import build_registry


class Waku:
    def __init__(self, settings: Settings | None = None, client=None, conn=None):
        # `client` and `conn` are injectable: evals swap in a scripted model,
        # the dashboard injects a cross-thread connection. Same seam either way.
        self.settings = settings or load_settings()
        self.settings.ensure_home()
        self.conn = conn or connect(self.settings.home)
        self.client = client or get_client(self.settings)

        # Memory first: the memory-management tools need it.
        from waku.memory import Memory

        self.memory = Memory(self.conn, self.settings, self.client)
        self.integration_recorder = IntegrationRecorder(self.settings.home)
        self.tools = build_registry(
            self.conn, self.settings, self.memory, recorder=self.integration_recorder
        )
        self.mcp_bridge = getattr(self.tools, "mcp_bridge", None)
        self.session = Session(self.settings, memory=self.memory)
        self.tracer = Tracer(self.settings)

    def close(self) -> None:
        """Release external resources (MCP subprocesses). Called when the
        dashboard rebuilds the agent after a settings change."""
        if self.mcp_bridge is not None:
            self.mcp_bridge.close()

    def respond(self, user_message: str, observer: Observer | None = None,
                source: str = "cli", stream: bool = False,
                learning_context: LearningContext | None = None) -> LoopResult:
        """One full turn: assemble working memory → run the loop → persist.
        `source` tags which gateway the message arrived through (cli / voice /
        telegram / dashboard), so the unified chat can show its origin.
        `stream=True` streams the reply text token by token to the observer.
        Everything that happens is both shown (observer) and recorded (tracer)."""
        notify = compose(observer, self.tracer.event)

        with self.tracer.turn(user_message):
            system = self.session.build_system(user_message, notify=notify)
            system, model_message = contextualize_learning_turn(
                system, user_message, learning_context,
            )
            messages = list(self.session.history) + [{"role": "user", "content": model_message}]

            try:
                result = run_loop(
                    client=self.client,
                    model=self.settings.model,
                    system=system,
                    messages=messages,
                    tools=self.tools,
                    max_iterations=self.settings.max_iterations,
                    max_tokens=self.settings.max_tokens,
                    observer=notify,
                    stream=stream,
                )
            except Exception as exc:
                self.integration_recorder.record(
                    source="provider",
                    integration=self.settings.provider,
                    operation=self.settings.model or "model_call",
                    status="error",
                    category=classify_exception(exc),
                    message=f"{type(exc).__name__}: {exc}",
                )
                raise

            self.session.add_exchange(user_message, result.reply, tool_calls=result.tool_calls,
                                      source=source)
            if self.memory is not None:
                self.memory.maybe_consolidate(notify=notify)
                self.memory.export_markdown()   # keep MEMORY.md in sync

        self.tracer.end_turn(result.reply, result.iterations)
        return result
