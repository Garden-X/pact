# WORKFLOW.md

## META

name: WORKFLOW.md
canonical_location: /ai/pact/workflow/WORKFLOW.md
layer: PACT / workflow
status: canonical
generated_from: /ai/pact/templates/workflow.tpl.md
generated_from_version: 1.8
content_status: current-data
purpose: Define how agents maintain project work without bypassing SPARC project truth.

## Lifecycle

shape
-> LOGIC-DRAFT.md
-> TASKS.md
-> STATE.md
-> execution
-> validation
-> project truth update through SPARC when needed
-> cleanup

## Startup

Follow the canonical startup sequence in `PACT-MANIFEST.md`.

## Statuses

Valid `LOGIC-DRAFT.md` statuses are `none-selected`, `selected`, and
`superseded`.

Valid `TASKS.md` statuses are `no-active-draft`, `active-draft`, and
`complete`.

Valid `STATE.md` statuses are `clear`, `active`, `blocked`, and `handoff`.

Task IDs follow `PACT-YYYYMMDD-NNN`.

## Hooks

| Hook | File | Trigger | Scripts | Status |
|---|---|---|---|---|
| None | None | None | None | None |

Project truth changes are handled through SPARC.
PACT maintenance changes stay in `/ai/pact`.

## Cache

Cache lives in `/ai/pact/cache`.

Cache is session memory for work on an addon, a new logic addition, or another
active task. It is task-run memory, not topic memory. Use one cache folder per
run:

```txt
/ai/pact/cache/runs/YYYY-MM-DDTHH-MM-SSZ--slug/
```

The timestamp is UTC and the slug names the task run. Retained cache runs
live under `/ai/pact/cache/retained/`. Do not create
topic-oriented folders such as `cache/sparc`, `cache/pact`, or `cache/docs`.

Each cache run may contain folders such as `raw-data/`, `chunks/`,
`summaries/`, `retrieval/`, `rag/`, `rlm/`, `validation/`, `artifacts/`,
`promote/`, and `tmp/`.

`CACHE.md` is the manifest, index, and pointer file for the run. It should
be created from `../templates/cache-run.tpl.md`. It should record purpose,
task reference, input basis, user prompt or owner instruction pointers,
internet search queries and source pointers, `/ai/raw` example or dataset
references when needed, other file, dataset, or project references outside
`/ai/raw` when needed, folder map, allowed contents, promotion targets, and
cleanup decision. It does not replace the run folders.

Cache may contain temporary summaries, `raw-data/` working material, chunks,
retrieval notes, RAG artifacts, validation artifacts, sandbox outputs, and
decomposition traces for the active task.

Cache must not contain accepted project truth, permanent PACT rules, secrets,
credentials, irreplaceable raw evidence, or project documentation.

Do not confuse cache `raw-data/` with `/ai/raw`. Cache `raw-data/` is
session-scoped and disposable. `/ai/raw` is the durable raw/evidence area
outside cache.

The latest cache run remains until the next session refresh. A new session
starts when the owner or agent explicitly starts one, or by default after
about four hours of elapsed work.

At new session start, read `STATE.md` and `TASKS.md`, create a fresh cache
run, and compare it with the latest previous cache. Prefer the fresh cache when
the task changed, the previous cache is too large or noisy, the previous cache
is stale, or new evidence supersedes it.

If the previous cache contains important nuance that the fresh cache did not
recover, distill only that nuance into the fresh cache. Do not copy the old
cache wholesale.

Before cleanup, promote durable material out of cache:

- PACT maintenance changes go to generated PACT target files or
  specification-level PACT files;
- project-truth changes go through SPARC into `/ai/docs`;
- raw evidence goes to `/ai/raw`;
- validation notes and completion summaries go to task state or approved logs;
- previous-session nuance that is still useful but not durable truth goes to
  the new cache as a short summary.

After comparison and any needed distillation, delete the previous cache unless
the owner requests retention or `STATE.md` records an active, blocked, or
handoff task that still needs that exact cache. Retained cache must record the
reason and review point.

## Cleanup

Move completed work to Done, clear `STATE.md`, release reservations, record
validation, and keep or supersede `LOGIC-DRAFT.md` according to the next
selected draft. Keep the latest cache until the next session refresh, promote
durable cache material, then delete or explicitly retain superseded cache
runs. To abandon a draft, resolve active state and cancel or complete pending
tasks before marking `LOGIC-DRAFT.md` superseded.

To start the next draft after completed work, preserve the completed cycle's
summary and validation evidence, then replace `LOGIC-DRAFT.md`, reset
`TASKS.md`, and transfer at most one new task into `STATE.md`.

Related:

- [../agents/AGENTS.md](../agents/AGENTS.md)
- [../context/IDEAS.md](../context/IDEAS.md)
- [../context/state/STATE.md](../context/state/STATE.md)
