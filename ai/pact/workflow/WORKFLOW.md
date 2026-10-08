# WORKFLOW.md

## META

name: WORKFLOW.md
canonical_location: /ai/pact/workflow/WORKFLOW.md
layer: PACT / workflow
status: canonical
generated_from: /ai/pact/templates/workflow.tpl.md
generated_from_version: 2.7
content_status: current-data
purpose: Define how agents maintain project work without bypassing SPARC project truth.
updated: 2026-10-08 08:40:00 UTC+00:00

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

By default one task is active in `STATE.md` at a time. Several tasks may be
active at once only under the parallel-worker rule in `## Execution Hierarchy`.

When a task completes, move it to `TASKS.md` Done with validation evidence or a
reason validation was not possible, then remove it from `STATE.md`. `STATE.md`
returns to `clear` when no active task remains.

## Execution Hierarchy

Every project that installs or syncs PACT inherits this hierarchy. It defines
who plans, who executes, and who accepts work. The declared fields below are
defaults; a project may override a value in place.

Declared fields:

```txt
primary_model: opus
coordinator_model: sonnet
coordinator_effort: high
worker_model: haiku
worker_effort: medium
heartbeat_primary: 23m
heartbeat_coordinator: 11m
default_branch: main
gate_branch_pattern: gate/<id>
keep_alive_registry: none
heavy_work: sequential
ram_threshold_gb: 5
```

Model fields name capability tiers. A host that lacks a named model uses its
closest equivalent tier and tells the owner once. `keep_alive_registry` is
`none` or the path of the project's service and port registry.

Tiers:

| Tier | Does | Does not |
|---|---|---|
| primary | selects the shape and the `LOGIC-DRAFT.md` for the gate; reviews only gate validation and PACT and SPARC records; runs the full acceptance suite; fast-forwards `gate/<id>` into `default_branch`; closes the gate | write product code; micromanage slices |
| coordinator | decomposes the selected draft into atomic `TASKS.md` entries; transfers tasks into `STATE.md`; writes self-contained worker briefs; reviews every worker diff; checks PACT and SPARC conformance; may fix worker errors; prepares the records; commits and pushes every slice to `gate/<id>` | run the full acceptance suite; push or merge `default_branch`; force-push; skip hooks; deploy |
| worker | executes exactly one atomic task from its brief; reports the diff | write to version control; widen scope; guess when the brief is ambiguous |

A worker that finds its brief ambiguous or contradicted by the code stops and
reports the question. Many worker errors mean the brief was unclear: the
coordinator sharpens the brief, re-dispatches, and records per slice how many
worker results needed a coordinator fix.

Gate and slice:

- A gate is one selected `LOGIC-DRAFT.md` cycle, from selection to acceptance.
- A slice is a coherent, validated commit that carries its own records. Each
  slice stands on its own: it is complete, tested, and pushed to
  `gate_branch_pattern`.
- The coordinator creates `gate/<id>` from `default_branch` on the first slice
  and fetches before each slice to read new commits from the owner or other
  agents. If `default_branch` moves, the coordinator merges it into the gate
  branch instead of rewriting pushed history.
- The primary closes the gate by fast-forwarding the gate branch into
  `default_branch` after the full acceptance suite passes and the records are
  reviewed. Only the primary writes to `default_branch`.
- Design questions the owner has delegated are decided by the coordinator and
  recorded in the project's decision log; they do not block the gate.

Parallel workers:

- Several `STATE.md` tasks may be active at once only when all of these hold:
  one coordinator owns the set; each task is held by a distinct worker; the
  tasks' `reservations` are pairwise disjoint; no task in the set builds or
  runs tests.
- A task that builds or tests, or whose reservations overlap another active
  task, runs alone.
- Without a coordinator, or in a second agent's scope, the single-task
  `STATE.md` mutex applies.

Conformance:

- PACT and SPARC conformance is mandatory at every tier. The coordinator puts
  the applicable PACT and SPARC rules into every worker brief.
- Every slice updates its records in the same commit: `TASKS.md`, `STATE.md`,
  the daily log, and the SPARC live contracts the change touches. A slice
  without its records is not done.
- The primary reviews the gate by its records. A gate with stale or missing
  records is not accepted, regardless of test results.

Resources:

- Heavy work (builds, test suites, checks that need a running service) runs
  strictly one at a time, as `heavy_work` declares.
- Before heavy work, check free memory against `ram_threshold_gb` and state the
  measured value. If the host kills a run for low memory, do not restart it;
  report to the primary.

Keep-alive:

- When `keep_alive_registry` is declared, services run only on ports registered
  there, each in its own long-lived window. They never run as session
  background tasks and never on ad-hoc ports.
- Agents never stop or restart those windows. A new service is registered
  before its first start. If a registered service is down, the coordinator
  reports to the primary, who restarts it.
- When `keep_alive_registry` is `none`, no registry rule applies.

Heartbeats:

- Heartbeats are host hooks that keep the tiers in contact. Register them in
  `## Hooks` as `host_hook` rows, one for the primary at `heartbeat_primary`
  and one for the coordinator at `heartbeat_coordinator`.
- The primary heartbeat fetches the gate branch, reads only the record changes
  in pushed slices, flags gaps to the coordinator, and starts acceptance when
  the coordinator reports the gate ready.
- The coordinator heartbeat asks for a one-line status: current slice, workers
  running, last pushed commit, free memory.
- Routine heartbeats are quiet. Report to the owner only milestones, failures,
  and decisions.

## Hooks

| Hook | Class | File | Trigger | Scripts | Status |
|---|---|---|---|---|---|
| PrimaryHeartbeat | host_hook | host-owned | every `heartbeat_primary` | None | active |
| CoordinatorHeartbeat | host_hook | host-owned | every `heartbeat_coordinator` | None | active |

`Class` is `pact_hook` (Markdown workflow extension point owned by PACT) or
`host_hook` (a hook owned by the agent host, IDE, or runtime). Host hooks are
governed by the host; register them here for visibility only. When a host hook
and a PACT hook share a trigger, expose the overlap here rather than assuming
one wins.

Project truth changes are handled through SPARC.
PACT maintenance changes stay in `/ai/pact`.

When maintained PACT Markdown content changes, refresh that file's privacy-safe
freshness stamp:

```txt
updated: YYYY-MM-DD HH:mm:ss UTC+00:00
```

Do not refresh `updated` for mirror-only or sync-only changes.

## Skill Log

skill_log: none

The skill log records skill update events: a reusable skill was created,
updated, improved, extracted, or deprecated. It never records ordinary skill
use or ordinary task execution.

To enable skill update logging, declare the artifact path:

```txt
skill_log: /ai/pact/agents/skills/SKILL-LOG.md
```

Write a skill update entry only when both gates are true:

1. The attached SPARC binding declares `runtime_mode: debug`. If the binding
   declares `production`, declares nothing, or cannot declare a runtime mode,
   do not write.
2. `skill_log` above declares an artifact path. If it is `none` or missing,
   do not write, even in debug mode.

Do not create the skill log file automatically. Create it only when
`skill_log` declares it and the first loggable event happens.

Skill update entries use this format. Times use `UTC+00:00`:

```md
## YYYY-MM-DD HH:mm — Skill Update

- Event Type: skill_update
- Skill Class: host_skill | pact_skill
- Skill Host: host runtime name, or `none` for a pact_skill
- Skill Name:
- Skill File:
- Change Type: created | updated | improved | extracted | deprecated
- Trigger:
- Improvement:
- Affected Workflow:
```

The skill log is a debug-only PACT diagnostic. It is not project truth, not
project documentation, and must not be written in production mode or into
`/ai/docs`.

## File Guard

file_guard: none

The file guard is an optional allowed-operations ledger for the whole project.
It declares which files agents may read, modify, create, delete, or treat as
an aggregator entry point across tasks, generalizing the per-task reservations
in `STATE.md`.

To enable it, create `FILE-GUARD.md` from `../templates/file-guard.tpl.md` and
declare its path here:

```txt
file_guard: /ai/pact/workflow/FILE-GUARD.md
```

The guard has three modes, declared inside `FILE-GUARD.md`:

- `strict`: unlisted paths are read-only; a disallowed write must not proceed.
- `warn`: writes proceed, but violations are recorded in the current daily log.
- `off`: the guard is inert.

Precedence: current owner instruction overrides the guard; the guard overrides
per-task `STATE.md` reservations. The guard governs PACT write discipline only
and never overrides SPARC live-contract authority.

Do not create `FILE-GUARD.md` automatically. Create it only when the owner asks
and `file_guard` above declares it. When `file_guard` is `none`, there is no
guard and ordinary per-task reservations apply.

## Project Truth Updates

Completed work changes SPARC project truth when it changes or reveals accepted
behavior, structure, schema/data shape, data references, design rules, platform
rules, or accepted change history.

In SPARC `01.03`-compatible bindings, route accepted project truth through
these live contracts:

| Truth category | SPARC live contract | Governing template |
|---|---|---|
| behavior | `<docs-root>/<app-name-en>/logic/LOGIC.md` | `app-logic.tpl.md` |
| structure, inventory, attached parts | `<docs-root>/<app-name-en>/map/MAP.md` | `app-map.tpl.md` |
| schema, data shape, data references | `<docs-root>/<app-name-en>/schema/SCHEMA.ts` | `app-schema.tpl.md` |
| design rules | `<docs-root>/<app-name-en>/design/DESIGN.md` | `design.tpl.md` |
| platform rules | `<docs-root>/PLATFORM-LOGIC.md` | `platform-logic.tpl.md` |
| accepted change history | `<docs-root>/<app-name-en>/changes/LOG.md`; daily request logs use `<docs-root>/<app-name-en>/changes/daily/YYYY-MM-DD.log.md` | `app-log.tpl.md` |

In the standard PACT Agent OS layout, `<docs-root>` is `/ai/docs`.

Use the governing SPARC template when creating, updating, validating, or
resolving gaps in a live contract. For schema work, that template is
`app-schema.tpl.md`.

When behavior work routed through `LOGIC.md` creates or changes entities,
fields, relations, dataset views, data references, or cross-application
references, update or verify `SCHEMA.ts` in the same project-truth update
cycle. When behavior work changes app structure, modules, integrations,
extension points, routes, or contract topology, update or verify `MAP.md` in
the same cycle.

If the relevant SPARC contract is missing, record the missing contract as a
SPARC gap instead of storing project truth in PACT state.

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
`TASKS.md`, and transfer at most one new task into `STATE.md`, or a set of
parallel worker tasks that satisfies the Execution Hierarchy parallel-worker
rule.

Related:

- [../agents/AGENTS.md](../agents/AGENTS.md)
- [../context/IDEAS.md](../context/IDEAS.md)
- [../context/state/STATE.md](../context/state/STATE.md)
