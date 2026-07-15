"""The `sim` provider: a fake model for load tests and chaos drills.

Speaks the exact Anthropic message shape the loop expects, with no network
and no key. Latency and failures are injected from env knobs so a laptop
can simulate a thousand tenants for free, and failure modes reproduce on
demand instead of at 2am. This is the chaos-engineering seam: if the
architecture has clean provider boundaries, breaking things is a config
change.

Knobs (all env, all optional):
  WAKU_SIM_LATENCY_MS      median call latency        (default 300)
  WAKU_SIM_LATENCY_P95_MS  tail latency               (default 1200)
  WAKU_SIM_ERROR_RATE      fraction of calls erroring (default 0)
  WAKU_SIM_RATE_429        fraction rate-limited      (default 0)
  WAKU_SIM_HANG_RATE       fraction that hang to the timeout (default 0)
  WAKU_SIM_SEED            RNG seed, so runs reproduce (default 42)

Scripting: a user message containing [[tool:NAME|{json args}]] makes the
sim "call" that tool, so conversation scripts exercise the full loop (gate,
tool dispatch, memory write) deterministically. Gate prompts answer
retrieve=false unless the message contains [[retrieve]]. Consolidation
prompts return an empty distillation.
"""

from __future__ import annotations

import json
import math
import os
import re
import threading
import time
from itertools import count
from random import Random
from types import SimpleNamespace

_TOOL_MARKER = re.compile(r"\[\[tool:(\w+)\|(\{.*?\})\]\]")


def _env_float(name: str, default: float) -> float:
    try:
        return float(os.getenv(name, "") or default)
    except ValueError:
        return default


class SimClient:
    """Anything with .messages.create(...) in the Anthropic shape, faked."""

    def __init__(self, timeout: float = 120.0):
        self.timeout = timeout
        self.p50 = _env_float("WAKU_SIM_LATENCY_MS", 300) / 1000
        p95 = _env_float("WAKU_SIM_LATENCY_P95_MS", 1200) / 1000
        # lognormal parameterized from the two points people actually know
        self._mu = math.log(max(self.p50, 0.001))
        self._sigma = max(math.log(max(p95, self.p50 + 0.001) / max(self.p50, 0.001)) / 1.645, 0.01)
        self.error_rate = _env_float("WAKU_SIM_ERROR_RATE", 0)
        self.rate_429 = _env_float("WAKU_SIM_RATE_429", 0)
        self.hang_rate = _env_float("WAKU_SIM_HANG_RATE", 0)
        self._rng = Random(int(_env_float("WAKU_SIM_SEED", 42)))
        self._lock = threading.Lock()
        self._ids = count(1)
        self.messages = SimpleNamespace(create=self._create)

    # ---- fault + latency injection, applied to every call
    def _roll(self):
        with self._lock:
            latency = self._rng.lognormvariate(self._mu, self._sigma)
            dice = self._rng.random()
        if dice < self.hang_rate:
            time.sleep(self.timeout)
            raise TimeoutError(f"sim: call exceeded {self.timeout}s (injected hang)")
        time.sleep(min(latency, self.timeout))
        if dice < self.hang_rate + self.rate_429:
            raise RuntimeError("sim: 429 rate limited (injected)")
        if dice < self.hang_rate + self.rate_429 + self.error_rate:
            raise RuntimeError("sim: 500 upstream error (injected)")

    def _create(self, *, model, messages, max_tokens, system=None, tools=None):
        self._roll()
        last = messages[-1]
        content = last.get("content") if isinstance(last, dict) else None

        # tool results came back → close the loop with a text reply
        if isinstance(content, list) and any(
            isinstance(b, dict) and b.get("type") == "tool_result" for b in content
        ):
            return self._respond(text="sim: done.")

        text_in = content if isinstance(content, str) else ""

        # single-purpose prompts from the memory pillar
        if "retrieval gate" in text_in:
            retrieve = "[[retrieve]]" in text_in
            return self._respond(text=json.dumps(
                {"retrieve": retrieve, "query": "sim query" if retrieve else "",
                 "reason": "sim gate"}))
        if '"facts"' in text_in and "chat log" in text_in.lower():
            return self._respond(text='{"facts": [], "episode": ""}')

        # scripted tool calls, only when the loop actually offered tools
        marker = _TOOL_MARKER.search(text_in) if tools else None
        if marker:
            try:
                args = json.loads(marker.group(2))
            except json.JSONDecodeError:
                args = {}
            block = SimpleNamespace(type="tool_use", id=f"sim_{next(self._ids)}",
                                    name=marker.group(1), input=args)
            return self._respond(blocks=[block], stop_reason="tool_use")

        return self._respond(text=f"sim: ok ({len(messages)} messages in context)")

    def _respond(self, text: str | None = None, blocks=None, stop_reason="end_turn"):
        blocks = blocks or [SimpleNamespace(type="text", text=text or "")]
        chars = sum(len(getattr(b, "text", "")) for b in blocks)
        return SimpleNamespace(
            stop_reason=stop_reason,
            usage=SimpleNamespace(input_tokens=200, output_tokens=max(chars // 4, 1)),
            content=blocks,
        )
