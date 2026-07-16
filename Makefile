# waku-agent — one command per pillar.
#
# Make is not a framework — it's a 45-year-old command shortcut tool that
# ships with every Mac/Linux. Each target below is just the shell command
# you'd otherwise type. `make run` = "run the python below", nothing more.
#
# PY picks the project venv automatically so you never need to remember
# `source .venv/bin/activate` — both work, this is just fewer steps.
PY := $(shell [ -x .venv/bin/python ] && echo .venv/bin/python || echo python)

.PHONY: run voice telegram brief dashboard trace eval eval-judge gate lint harness-test

run:            ## chat with Waku in the terminal
	$(PY) -m waku

voice:          ## talk to it — push-to-talk, or always-on with WAKU_WAKE_WORD
	$(PY) -m waku voice

telegram:       ## phone → laptop (needs TELEGRAM_BOT_TOKEN in .env)
	$(PY) -m waku telegram

brief:          ## morning briefing from calendar + mail + memory
	$(PY) -m waku brief

dashboard:      ## everything on one page — http://localhost:7777
	$(PY) -m waku.ops.dashboard

trace:          ## deep trace waterfalls (Phoenix) at http://localhost:6006
	$(PY) -m phoenix.server.main serve

eval:           ## deterministic evals (0/1, no judge involved)
	$(PY) -m pytest -q evals/deterministic

eval-judge:     ## LLM-as-judge evals (scored %, needs an API key)
	$(PY) -m pytest -q evals/judge

gate:           ## the release gate: deterministic must pass, judge must clear threshold
	$(PY) -m waku.ops.release_gate

lint:
	$(PY) -m ruff check waku evals scale scripts

harness-test:   ## fast tests for curriculum state and written-artifact gates
	$(PY) -m pytest -q scale/tests/test_curriculum_harness.py

# ---- scale curriculum (docs/scale/README.md) --------------------------------
scale-smoke:    ## chapter 0 instrument check: 5 sim tenants through the harness
	$(PY) -m pytest -q -s scale/tests/test_00_smoke.py

check-00: scale-smoke   ## grade chapter 0

scale-01:       ## chapter 1 baseline ramp: watch one lock flatten throughput
	$(PY) -m pytest -q -s scale/tests/test_01_baseline.py

check-01: scale-01      ## grade chapter 1: measurement plus the learner's SLO contract
	$(PY) scripts/curriculum.py validate 01

check:          ## full health: lint + offline evals + the current chapter's test
	$(PY) -m ruff check waku evals scale scripts
	$(PY) -m pytest -q evals/deterministic
	$(PY) -m pytest -q scale/tests/test_curriculum_harness.py
	@current="$$($(PY) scripts/curriculum.py current --number)"; \
	if [ -n "$$current" ]; then \
	  echo "current chapter: $$current"; $(MAKE) check-$$current; \
	else \
	  $(PY) scripts/curriculum.py current; \
	fi
