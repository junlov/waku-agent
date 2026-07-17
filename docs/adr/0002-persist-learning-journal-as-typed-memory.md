# ADR-0002: Persist the learning journal as typed curriculum memory

- Status: accepted
- Date: 2026-07-16

## Context

The curriculum journal began as browser-local state passed transiently into a
single model turn. That made Waku context-aware while the lesson was open, but
the journal was absent from `state.db`, invisible in the Memory workspace, and
lost to the agent when another browser or session was used. Saving it as a
semantic fact would be incorrect: hypotheses and misunderstandings are useful
learning state precisely because they may be false.

The isolated container preview also mounted `/var/lib/waku` as tmpfs. That was
appropriate for a throwaway visual preview but would delete SQLite whenever the
container was recreated.

## Decision

Add a structured `learning_journal` table to Waku's existing SQLite database,
with one row per chapter and fields for the most recently used track, goal,
hypothesis, evidence, decision, correction, next step, and timestamps.

The curriculum surface loads from SQLite, retains browser `localStorage` as an
offline/recovery draft, and debounces writes through `/api/learning-journal`.
The server validates chapter and track against the canonical curriculum before
writing. A curriculum chat persists the exact validated journal snapshot before
adding it to model-only system context.

Expose the rows as Memory → Learning Journal and as the raw
`learning_journal` database table. Do not feed these rows into semantic-memory
consolidation. Git checks and tags remain the only completion authority.

Run the Colima preview with the named `waku-training-data` volume mounted at
`/var/lib/waku`. Containers and images remain disposable; `state.db` and the
runtime `.env` survive container recreation inside the Colima VM.

## Consequences

- Waku can coach from explicit learning state across browser and container
  sessions without treating provisional beliefs as facts.
- The journal becomes inspectable beside Waku's other memory types and raw data.
- Browser drafts recover unsent typing when the API is temporarily unavailable.
- Removing the named volume or deleting the Colima VM still removes the data;
  those are explicit data-reset operations, not normal container recreation.
- Runtime keys now persist with the same named volume. The checkout's `.env`
  remains read-only and is not automatically loaded in the container.

## Recovery

Revert the curriculum API calls to browser-only storage and restore the tmpfs
mount. The additive SQLite table can remain unused without affecting facts,
episodes, chat history, or chapter completion.
