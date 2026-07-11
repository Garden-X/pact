# file-guard.tpl.md

## META

name: file-guard.tpl.md
type: pact maintenance template
for: FILE-GUARD.md
updated: 2026-07-11 10:13:59 UTC+00:00
version: 1.0

## WHAT

`FILE-GUARD.md` is an optional, project-level allowed-operations ledger for
PACT maintenance work.

It declares which files or path patterns agents may `read`, `modify`, `create`,
`delete`, or treat as an `aggregator` entry point, and what happens when an
unlisted or forbidden write is attempted.

It generalizes the per-task file reservations in `STATE.md` into a standing,
whole-project write-discipline surface. `STATE.md` reserves files for one
active task; `FILE-GUARD.md` declares the allowed-operation policy for the
whole project across tasks.

`FILE-GUARD.md` is a PACT maintenance file. It is not project truth, not a
SPARC contract, and must never live in `/ai/docs`.

## FOR

Target path:

```txt
/ai/pact/workflow/FILE-GUARD.md
```

Use this template when creating or changing the project file guard.

`FILE-GUARD.md` is optional and opt-in. It is never created automatically. It
exists only when the owner asks for a file guard, and `WORKFLOW.md` must
declare it in its `## File Guard` section before agents enforce it.

## RULES

`FILE-GUARD.md` must:

- declare one `mode`: `strict`, `warn`, or `off`;
- list entries as a path or glob pattern with allowed operations;
- use the operation vocabulary `read`, `modify`, `create`, `delete`,
  `aggregator`;
- define aggregator entries as entry-point files that wire modules together
  and should stay thin;
- state the precedence rule: current owner instruction overrides the guard;
  the guard overrides per-task `STATE.md` reservations; reservations still
  claim a listed file for one active task;
- be registered in `/ai/pact/workflow/WORKFLOW.md` under `## File Guard`;
- link related invariant PACT files with relative Markdown links.

Mode meanings:

- `strict`: a write to a path that is not listed, or not permitted the needed
  operation, must not proceed. Unlisted paths are read-only. The agent records
  the blocked attempt and asks the owner.
- `warn`: writes proceed, but any write outside the listed permissions is
  recorded as a violation in the current daily log so drift stays visible.
- `off`: the guard is inert. The file may exist for reference but is not
  enforced.

If `mode` is missing or unclear, treat it as `off` and record a gap.

The guard governs PACT write discipline only. It does not change SPARC
authority. When project truth changes, the SPARC live contract is still
canonical and the guard must not be used to block a required contract update
the owner has authorized.

`FILE-GUARD.md` must not:

- contain project truth;
- override SPARC live contracts;
- replace `STATE.md` per-task reservations;
- store secrets;
- live in `/ai/docs`.

## EXAMPLE

```md
# FILE-GUARD.md

## META

name: FILE-GUARD.md
canonical_location: /ai/pact/workflow/FILE-GUARD.md
layer: PACT / workflow / file guard
status: active
mode: strict
updated: YYYY-MM-DD HH:mm:ss UTC+00:00

## Precedence

1. Current owner instruction.
2. This file guard.
3. Per-task reservations in `STATE.md`.

## Entries

| Path or pattern | Operations | Notes |
|---|---|---|
| `backend/models.py` | read, modify | SCHEMA.ts mirror; contract changes first. |
| `backend/main.py` | read, aggregator | Thin entry point; wire modules only. |
| `backend/services/*.py` | read, modify, create | Service layer. |
| `frontend/src/schema.ts` | read, modify | SCHEMA.ts mirror. |
| `migrations/*` | read, create | Never modify or delete an applied migration. |

## Unlisted Paths

In `strict` mode, any path not listed above is read-only. To write it, ask the
owner to add an entry first.

Related:

- [WORKFLOW.md](WORKFLOW.md)
- [../context/state/STATE.md](../context/state/STATE.md)
```
