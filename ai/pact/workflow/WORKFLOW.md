# WORKFLOW.md

## META

name: WORKFLOW.md
canonical_location: /ai/pact/workflow/WORKFLOW.md
layer: PACT / workflow
status: canonical
generated_from: /ai/pact/templates/workflow.tpl.md
generated_from_version: 1.3
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
