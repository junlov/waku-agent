from __future__ import annotations

import json
import os
import subprocess
import sys
import urllib.request
from pathlib import Path

from waku.ops.dashboard import _settings_env_path, curriculum_catalog


ROOT = Path(__file__).resolve().parents[2]
CURRICULUM_CONTRACT = ROOT / "docs/scale/curriculum.json"


def test_curriculum_catalog_exposes_truthful_progress_and_all_tracks():
    catalog = curriculum_catalog(
        ROOT,
        tags={
            "chapter-00-start",
            "chapter-00-solution",
            "chapter-01-start",
        },
    )

    assert catalog["current"] == "01"
    assert catalog["available_through"] == "01"
    assert len(catalog["chapters"]) == 17
    assert catalog["chapters"][0]["status"] == "passed"
    assert catalog["chapters"][1]["status"] == "current"
    assert catalog["chapters"][1]["lab"]["measure"] == "make scale-01"
    assert catalog["chapters"][2]["status"] == "roadmap"
    assert catalog["chapters"][1]["tracks"]["architect"].startswith("# Chapter 1")
    assert catalog["chapters"][16]["tracks"]["engineer"].startswith("# Chapter 16")


def test_curriculum_contract_covers_every_chapter_with_mastery_metadata():
    contract = json.loads(CURRICULUM_CONTRACT.read_text())

    assert contract["version"] == 1
    assert [chapter["number"] for chapter in contract["chapters"]] == [
        f"{number:02d}" for number in range(17)
    ]
    phase_ids = {phase["id"] for phase in contract["phases"]}
    for chapter in contract["chapters"]:
        assert chapter["phase"] in phase_ids
        assert chapter["competency"]
        assert chapter["evidence_view"]
        assert len(chapter["knowledge_checks"]) >= 2


def test_every_chapter_publishes_a_truthful_learning_lab_contract():
    contract = json.loads(CURRICULUM_CONTRACT.read_text())

    labs = {chapter["number"]: chapter["lab"] for chapter in contract["chapters"]}
    assert set(labs) == {f"{number:02d}" for number in range(17)}
    for number, lab in labs.items():
        assert lab["state"] in {"runnable", "preview"}
        assert lab["scenario"]
        assert len(lab["objectives"]) == 3
        assert lab["measure"] == ("make scale-smoke" if number == "00" else f"make scale-{number}")
        assert lab["verify"] == f"make check-{number}"
    assert {number for number, lab in labs.items() if lab["state"] == "runnable"} == {"00", "01"}


def test_curriculum_design_system_has_semantic_tokens_and_stable_slots():
    css = (ROOT / "waku/ops/static/style.css").read_text()
    app = (ROOT / "waku/ops/static/app.js").read_text()

    for token in (
        "--background", "--foreground", "--card", "--primary",
        "--muted", "--muted-foreground", "--border", "--ring",
        "--success", "--warning", "--destructive", "--radius",
    ):
        assert token in css
    for slot in (
        "course-hero", "course-progress", "course-phase", "lesson-row",
        "status-badge", "lesson-tabs", "lesson-content", "assignment-panel",
        "knowledge-check", "lesson-pagination",
    ):
        assert f'data-slot="{slot}"' in app


def test_curriculum_frontend_has_course_and_lesson_surfaces():
    html = (ROOT / "waku/ops/static/index.html").read_text()
    app = (ROOT / "waku/ops/static/app.js").read_text()

    assert 'href="#learn"' in html
    assert "curriculumHome" in app
    assert "lessonReader" in app
    assert 'fetch("/api/curriculum")' in app


def test_curriculum_routes_reset_scroll_and_sidebar_styles_are_scoped():
    css = (ROOT / "waku/ops/static/style.css").read_text()
    app = (ROOT / "waku/ops/static/app.js").read_text()
    html = (ROOT / "waku/ops/static/index.html").read_text()

    assert "#nav{" in css
    assert "  nav{" not in css
    assert "document.querySelector(\"main\").scrollTop = 0" in app
    assert 'id="system-nav"' in html
    assert "body.learning #system-nav{display:none}" not in css
    assert 'classList.toggle("learning", view === "learn")' not in app
    assert "lesson-contract" in app


def test_factory_curriculum_is_isolated_from_legacy_element_styles():
    css = (ROOT / "waku/ops/static/style.css").read_text()
    curriculum_css = (ROOT / "frontend/src/curriculum.css").read_text()
    app = (ROOT / "waku/ops/static/app.js").read_text()

    assert 'classList.toggle("legacy-view", view !== "learn")' in app
    for selector in ("h2{", "table{", "th{", "code{"):
        assert f"#view.legacy-view {selector}" in css
        assert f"\n  {selector}" not in css
    assert "#view.legacy-view td,#view.legacy-view th{" in css
    assert "\n  td,th{" not in css
    assert "#curriculum-react-root a" in curriculum_css
    assert ".wf-markdown a" in curriculum_css
    assert "text-transform: none" in curriculum_css
    assert "@layer reset{*{box-sizing:border-box;margin:0}}" in css
    assert "\n  *{box-sizing:border-box;margin:0}" not in css


def test_factory_components_preserve_curriculum_level_slots():
    source = (ROOT / "frontend/src/curriculum.tsx").read_text()

    assert '<span data-slot="status-badge"' in source
    assert '<section data-slot="lesson-contract"' in source
    assert '<aside data-slot="assignment-panel"' in source
    assert 'data-slot="learning-journal"' in source
    assert 'waku-learning-journal:v1' in source
    assert 'waku-learning-context' in source


def test_curriculum_chat_carries_transient_learning_context():
    source = (ROOT / "frontend/src/curriculum.tsx").read_text()
    app = (ROOT / "waku/ops/static/app.js").read_text()
    html = (ROOT / "waku/ops/static/index.html").read_text()

    assert 'window.addEventListener("waku-learning-context"' in app
    assert "learning_context: LEARNING_CONTEXT" in app
    assert 'id="learning-context"' in html
    assert "useEffect(() => () => publishLearningContext(null), [chapter.number])" in source


def test_learning_journal_autosaves_to_sqlite_and_is_visible_in_memory():
    source = (ROOT / "frontend/src/curriculum.tsx").read_text()
    app = (ROOT / "waku/ops/static/app.js").read_text()

    assert 'fetch("/api/learning-journal?chapter=' in source
    assert 'postLearningJournal' in source
    assert '["journal","Learning Journal"' in app
    assert "function memLearningJournal" in app


def test_learning_journal_is_a_collapsible_end_of_lesson_reflection():
    source = (ROOT / "frontend/src/curriculum.tsx").read_text()

    panel = source.index('<section data-slot="learning-journal"')
    lesson = source.index('<div className="mt-8 grid grid-cols-1 items-start')
    placement = source.rindex("<LearningJournalPanel")
    pagination = source.index('<nav data-slot="lesson-pagination"')

    assert "<details>" in source[panel:panel + 500]
    assert '<summary className="wf-journal-summary">' in source
    assert "Reflect and capture" in source
    assert lesson < placement < pagination


def test_chapter_one_has_an_executable_learning_lab_surface():
    source = (ROOT / "frontend/src/curriculum.tsx").read_text()

    assert 'data-slot="learning-lab"' in source
    assert 'fetch("/api/lab?chapter=' in source
    assert 'fetch("/api/lab/run"' in source
    assert 'fetch("/api/lab/attach"' in source
    assert "Run measurement" in source
    assert "Run verification" in source
    assert "Attach to Waku" in source


def test_learning_lab_is_a_first_class_route_with_truthful_preview_state():
    source = (ROOT / "frontend/src/curriculum.tsx").read_text()

    assert '["lab", "Lab"]' in source
    assert 'requested === "lab"' in source
    assert 'href={`#learn/${chapter.number}/lab`}' in source
    assert "Open lab workspace" in source
    assert 'lab.state === "preview"' in source
    assert "Instrument preview" in source
    assert "This failure instrument is not published yet" in source
    assert 'track === "lab" ? "Lab"' in source


def test_chat_and_architecture_have_responsive_coaching_surfaces():
    html = (ROOT / "waku/ops/static/index.html").read_text()
    app = (ROOT / "waku/ops/static/app.js").read_text()
    css = (ROOT / "waku/ops/static/style.css").read_text()

    assert 'class="coach-identity"' in html
    assert 'id="dock-model"' in html
    assert 'id="dmsg"' in html and "<textarea" in html
    assert "function chatWelcome" in app
    assert "function seedChat" in app
    assert "function archCompact" in app
    assert 'class="arch-compact"' in app
    assert "@media(max-width:900px){.arch-full{display:none}.arch-compact{display:block}" in css
    assert "body:not(.dock-closed) #dock{display:flex!important}" in css
    assert "const CHAT_CONTEXTS" in app
    assert 'overview:"live system map and latest turn"' in app


def test_mobile_shell_gives_curriculum_the_full_viewport():
    css = (ROOT / "waku/ops/static/style.css").read_text()
    app = (ROOT / "waku/ops/static/app.js").read_text()

    assert "#dock-resizer{display:none!important}" in css
    assert "#dock{display:none;position:fixed" in css
    assert "#nav{position:fixed" in css
    assert "#nav-resizer{display:none}" in css
    assert "main{padding-left:16px;padding-right:16px}" in css
    assert "body.nav-hidden .pagehead{padding-left:44px}" in css
    assert 'const narrowNav = window.matchMedia("(max-width:650px)")' in app
    assert 'setNav(narrowNav.matches || localStorage.getItem("navHidden") === "1", false)' in app
    assert 'const narrowDock = window.matchMedia("(max-width:900px)")' in app
    assert "height:min(86dvh,760px)" in css
    assert "border-radius:20px 20px 0 0" in css
    assert 'if (narrowNav.matches) setNav(true, false)' in app


def test_curriculum_uses_pinned_factory_frontend_adapter():
    package = json.loads((ROOT / "frontend/package.json").read_text())
    html = (ROOT / "waku/ops/static/index.html").read_text()
    app = (ROOT / "waku/ops/static/app.js").read_text()
    source = (ROOT / "frontend/src/curriculum.tsx").read_text()

    assert package["dependencies"]["@landing-factory/ui"] == (
        "github:juniorlovestmh/landing-factory#ui-v1.1.0&path:/packages/ui"
    )
    assert 'src="/static/react/curriculum.js"' in html
    assert "window.WakuCurriculum" in app
    assert 'from "@landing-factory/ui"' in source
    assert (ROOT / "waku/ops/static/react/curriculum.js").is_file()
    assert (ROOT / "waku/ops/static/react/curriculum.css").is_file()


def test_live_dashboard_serves_curriculum_and_learner_first_shell(sim_server):
    with urllib.request.urlopen(sim_server + "/api/curriculum", timeout=3) as response:
        catalog = json.loads(response.read())
    with urllib.request.urlopen(sim_server, timeout=3) as response:
        html = response.read().decode()

    assert catalog["current"] == "01"
    assert catalog["chapters"][1]["check"] == "make check-01"
    assert len(catalog["chapters"][1]["knowledge_checks"]) >= 2
    assert '<a href="#learn" data-v="learn">' in html


def test_live_dashboard_does_not_serve_stale_curriculum_bundles(sim_server):
    with urllib.request.urlopen(
        sim_server + "/static/react/curriculum.js", timeout=3,
    ) as response:
        response.read(1)
        cache_control = response.headers.get("Cache-Control")

    assert cache_control == "no-store"


def test_docker_preview_is_read_only_with_persistent_runtime_volume():
    makefile = (ROOT / "Makefile").read_text()
    dockerfile = (ROOT / "Dockerfile").read_text()

    assert "docker-dashboard:" in makefile
    assert "type=bind" not in makefile
    assert "docker volume create waku-training-data" in makefile
    assert "docker volume create waku-training-workspace" in makefile
    assert "src=waku-training-workspace,dst=/workspace" in makefile
    assert "src=waku-training-data,dst=/var/lib/waku" in makefile
    assert "--read-only --cap-drop=ALL --security-opt=no-new-privileges" in makefile
    assert "/var/run/docker.sock" not in makefile
    assert "--tmpfs /var/lib/waku" not in makefile
    assert "--rm --name waku-training" in makefile
    assert "WAKU_DASHBOARD_HOST=0.0.0.0" in dockerfile
    assert "WAKU_PROVIDER=sim" in dockerfile
    assert "WAKU_ENV_FILE=/var/lib/waku/.env" in dockerfile
    assert "WAKU_SANDBOX=1" in dockerfile
    assert "WORKDIR /seed" in dockerfile
    assert "apt-get install -y --no-install-recommends git make" in dockerfile
    assert "RUN python -m pip install --no-cache-dir '.[dev,mcp]'" in dockerfile
    assert "FROM node:" not in dockerfile
    assert "COPY waku ./waku" in dockerfile
    assert "frontend-check:" in makefile


def test_compose_exposes_a_shared_integration_network_without_docker_socket():
    compose = (ROOT / "compose.yaml").read_text()

    assert "waku-integrations" in compose
    assert "host.docker.internal:host-gateway" in compose
    assert "waku-training-data" in compose
    assert "waku-training-workspace" in compose
    assert "/var/run/docker.sock" not in compose
    assert "cap_drop:" in compose and "ALL" in compose


def test_open_chat_keeps_full_architecture_on_desktop():
    css = (ROOT / "waku/ops/static/style.css").read_text()

    assert "body:not(.dock-closed) .arch-full" not in css
    assert "@media(max-width:900px){.arch-full{display:none}.arch-compact{display:block}" in css


def test_settings_env_path_can_live_outside_the_read_only_checkout(tmp_path, monkeypatch):
    runtime_env = tmp_path / "runtime" / ".env"
    monkeypatch.setenv("WAKU_ENV_FILE", str(runtime_env))

    assert _settings_env_path() == runtime_env
    assert runtime_env.parent.is_dir()


def test_explicit_runtime_env_file_prevents_checkout_env_discovery(tmp_path):
    runtime_env = tmp_path / "runtime.env"
    runtime_env.write_text("WAKU_TEST_DOTENV_SENTINEL=runtime-only\n")
    env = dict(os.environ, WAKU_ENV_FILE=str(runtime_env), PYTHONPATH=str(ROOT))
    env.pop("WAKU_TEST_DOTENV_SENTINEL", None)

    result = subprocess.run(
        [sys.executable, "-c", "import os, waku.config; "
         "print(os.getenv('WAKU_TEST_DOTENV_SENTINEL', 'missing'))"],
        cwd=tmp_path,
        env=env,
        check=True,
        capture_output=True,
        text=True,
    )

    assert result.stdout.strip() == "runtime-only"
