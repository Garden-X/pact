# workflow.tpl.md

## META

name: workflow.tpl.md
type: pact maintenance template
for: WORKFLOW.md
updated: 2026-06-17 03:55:16 UTC+00:00
version: 2.0

## WHAT

`WORKFLOW.md` defines how PACT maintenance work moves from ideas and shapes to
draft, tasks, active state, execution, validation, project-truth update when
needed, and cleanup.

## FOR

Target path:

```txt
/ai/pact/workflow/WORKFLOW.md
```

Use this template when creating or changing the canonical PACT workflow.

## RULES

`WORKFLOW.md` must:

- preserve the distinction between SPARC project truth and PACT project maintenance;
- define startup, ideas gate, shape gate, draft gate, task creation, task
  transfer, state modes, hooks, validation, completion, and recovery;
- require tasks to derive from `LOGIC-DRAFT.md`, not directly from `IDEAS.md`;
- define valid `STATE.md` top-level statuses;
- define valid `LOGIC-DRAFT.md` and `TASKS.md` statuses or link to their
  state files;
- define the decomposition contract from selected `LOGIC-DRAFT.md` content to
  atomic, verifiable `TASKS.md` entries and one active `STATE.md` task;
- define how active task `task_phase` maps to `STATE.md` status;
- define cleanup, draft abandonment, next draft cycle start, and valid state
  combinations;
- define task-run cache naming, session refresh, comparison, distillation,
  input-basis references, promotion, retention, and deletion rules;
- require tasks to derive from `LOGIC-DRAFT.md`, not directly from shapes;
- register hooks and script usage in `WORKFLOW.md`;
- keep invariant PACT files discoverable with relative Markdown links;
- define when project-truth changes must pass through SPARC;
- route data-shape, persistence, migration, dataset schema, public schema
  view, and cross-service data-reference changes through SPARC `SCHEMA.md`;
- keep PACT maintenance changes inside `/ai/pact`.

`WORKFLOW.md` must not:

- define project business logic;
- invent SPARC docs structure;
- put PACT state into `/ai/docs`;
- treat cache as source of truth;
- replace `AGENTS.md`, `TASKS.md`, or `STATE.md`.

## EXAMPLE

```md
# WORKFLOW.md

## META

name: WORKFLOW.md
canonical_location: /ai/pact/workflow/WORKFLOW.md
layer: PACT / workflow
status: canonical
purpose: Define how agents maintain project work without bypassing SPARC project truth.
updated: YYYY-MM-DD HH:mm:ss UTC+00:00

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

## Decomposition

Decomposition is allowed only when `LOGIC-DRAFT.md` has `status: selected`.

Tasks are created from the selected logic, decisions, constraints, and
source/evidence in `LOGIC-DRAFT.md`.

`IDEAS.md` and shape files may provide trace context, but tasks must not derive
directly from them.

Each task must be atomic, verifiable, and describe a clear outcome. If one task
has multiple independent outcomes, split it before adding it to `TASKS.md`.

When a task transfers into `STATE.md`, remove it from `TASKS.md` Pending so
active work is not duplicated.

When a task completes, move it to `TASKS.md` Done with validation evidence or a
reason validation was not possible, then clear `STATE.md`.

## Hooks

| Hook | File | Trigger | Scripts | Status |
|---|---|---|---|---|
| None | None | None | None | None |

Project truth changes are handled through SPARC.
PACT maintenance changes stay in `/ai/pact`.

When maintained PACT Markdown content changes, refresh that file's privacy-safe
freshness stamp:

```txt
updated: YYYY-MM-DD HH:mm:ss UTC+00:00
```

Do not refresh `updated` for mirror-only or sync-only changes.

## Project Truth Updates

Completed work changes SPARC project truth when it changes or reveals accepted
behavior, structure, schema/data shape, data references, design rules, platform
rules, or accepted change history.

When completed work touches persistence, migrations, data contracts, dataset
schemas, public schema views, or cross-application data references, update or
verify the relevant SPARC schema contract before cleanup:

```txt
<docs-root>/<app-name-en>/schema/SCHEMA.md
```

If the relevant schema contract is missing, record the missing contract as a
SPARC gap instead of storing schema truth in PACT state.

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
```
