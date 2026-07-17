from __future__ import annotations

import json
import urllib.request

from waku.db import connect
from waku.memory.learning_journal import LearningJournalStore


def test_learning_journal_survives_database_reconnect(tmp_path):
    conn = connect(tmp_path)
    store = LearningJournalStore(conn)
    saved = store.upsert(
        chapter="05",
        track="engineer",
        journal={
            "goal": "Understand backpressure.",
            "hypothesis": "The queue accepts expired work.",
            "evidence": "Queue wait rose before model latency.",
        },
    )
    conn.close()

    reopened = connect(tmp_path)
    row = LearningJournalStore(reopened).get("05")

    assert saved["chapter"] == "05"
    assert row is not None
    assert row["track"] == "engineer"
    assert row["goal"] == "Understand backpressure."
    assert row["hypothesis"] == "The queue accepts expired work."
    assert row["evidence"] == "Queue wait rose before model latency."


def test_learning_journal_upsert_keeps_one_record_per_chapter(tmp_path):
    store = LearningJournalStore(connect(tmp_path))
    store.upsert("05", "engineer", {"goal": "First goal"})
    store.upsert("05", "architect", {"goal": "Revised goal", "decision": "Bound admission"})

    rows = store.list()

    assert len(rows) == 1
    assert rows[0]["track"] == "architect"
    assert rows[0]["goal"] == "Revised goal"
    assert rows[0]["decision"] == "Bound admission"


def test_learning_journal_api_round_trip(sim_server):
    payload = {
        "version": 1,
        "chapter": "05",
        "track": "engineer",
        "journal": {
            "goal": "Understand admission control.",
            "hypothesis": "The queue is unbounded.",
        },
    }
    request = urllib.request.Request(
        sim_server + "/api/learning-journal",
        data=json.dumps(payload).encode(),
        headers={"Content-Type": "application/json"},
        method="POST",
    )
    with urllib.request.urlopen(request, timeout=3) as response:
        saved = json.loads(response.read())
    with urllib.request.urlopen(sim_server + "/api/learning-journal?chapter=05", timeout=3) as response:
        loaded = json.loads(response.read())
    with urllib.request.urlopen(sim_server + "/api/data", timeout=3) as response:
        dashboard = json.loads(response.read())

    assert saved["ok"] is True
    assert saved["journal"]["goal"] == "Understand admission control."
    assert loaded["journal"]["hypothesis"] == "The queue is unbounded."
    assert dashboard["learning_journal"][0]["chapter"] == "05"
    assert "learning_journal" in dashboard["db"]["all_tables"]
