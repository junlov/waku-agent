# Progress log (session handoffs)

Newest entry first. One entry per working session, written BEFORE you stop.
The next session (you in a week, or your agent in an hour) resumes from
this file instead of re-deriving state from the diff.

Format per entry:

```
## YYYY-MM-DD / chapter NN / <status: exploring | mid-fix | blocked | passed>
- Did: what actually happened (1-3 lines)
- Learned: the thing worth keeping (optional but usually the point)
- Next: the first concrete action for the next session
```

Keep entries honest and short. "Tried X, it deadlocked, next idea is Y" is
a perfect entry. Marketing copy about progress is not.

---

## 2026-07-16 / chapter 1 / exploring (harness repaired)
- Did: rebuilt the migrated `.venv`; separated learner progress from reference
  tags; added begin/complete state commands, SLO artifact checks, portable
  cross-agent skills, and harness regression tests. Chapter 0 is green again.
- Learned: the copied venv contained an absolute Python symlink from the old
  profile, and published solution tags could falsely advance learner progress.
- Next: review and commit the harness patch, run
  `python scripts/curriculum.py begin 01`, then start the Chapter 1 baseline.

## 2026-07-15 / chapter 0 / passed (chapter 1 armed)
- Did: harness built (sim provider, loadgen, conftest server fixture,
  check-00/check-01 targets). check-00 green: 15/15 turns, 0 errors.
  check-01 baseline measured: 1 to 10 tenants took p95 from 2.4s to 19.8s,
  throughput flat at ~40-49 turns/min. Tags chapter-00-start and
  chapter-00-solution (= chapter-01-start) pushed.
- Learned: the lock's signature is visible even at 5 tenants (p50 3.2s on
  a 100ms sim model). The meltdown demo needs no staging.
- Next: learner runs chapter 1 (make check-01 with the dashboard open),
  answers the brief's three questions, writes docs/scale/SLO.md. Then
  chapter 2's failing test gets encoded against those SLO numbers.
