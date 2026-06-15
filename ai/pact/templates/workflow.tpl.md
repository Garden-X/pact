# workflow.tpl.md

## META

name: workflow.tpl.md
version: 1.3
type: pact maintenance template
for: WORKFLOW.md

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
- define how active task `task_phase` maps to `STATE.md` status;
- define cleanup, draft abandonment, next draft cycle start, and valid state
  combinations;
- require tasks to derive from `LOGIC-DRAFT.md`, not directly from shapes;
- register hooks and script usage in `WORKFLOW.md`;
- keep invariant PACT files discoverable with relative Markdown links;
- define when project-truth changes must pass through SPARC;
- keep PACT maintenance changes inside `/ai/pact`.

`WORKFLOW.md` must not:

- define project business logic;
- invent SPARC docs structure;
- put PACT state into `/ai/docs`;
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

## Cleanup

Move completed work to Done, clear `STATE.md`, release reservations, record
validation, and keep or supersede `LOGIC-DRAFT.md` according to the next
selected draft. To abandon a draft, resolve active state and cancel or complete
pending tasks before marking `LOGIC-DRAFT.md` superseded.

To start the next draft after completed work, preserve the completed cycle's
summary and validation evidence, then replace `LOGIC-DRAFT.md`, reset
`TASKS.md`, and transfer at most one new task into `STATE.md`.

Related:

- [../agents/AGENTS.md](../agents/AGENTS.md)
- [../context/IDEAS.md](../context/IDEAS.md)
- [../context/state/STATE.md](../context/state/STATE.md)
```
