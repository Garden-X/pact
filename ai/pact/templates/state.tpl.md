# state.tpl.md

## META

name: state.tpl.md
type: pact maintenance template
for: STATE.md
updated: 2026-07-08 09:24:00 UTC+00:00
version: 1.2

## WHAT

`STATE.md` records the active PACT maintenance task.

It exists so work can be recovered, handed off, validated, or blocked without
depending on chat history.

## FOR

Target path:

```txt
/ai/pact/context/state/STATE.md
```

Use this template when creating or resetting the active state file.

## RULES

`STATE.md` must:

- use one valid top-level status;
- map active work back to one task from `TASKS.md`;
- own the structured active task object;
- record task id, request, task phase, actor, source, affected files,
  reservations, validation, retry, and handoff;
- link related invariant PACT files with relative Markdown links;
- be cleared after completion.

Valid top-level `STATE.md` statuses:

```txt
clear
active
blocked
handoff
```

Status meanings:

- `clear` means no active task exists.
- `active` means exactly one task is being executed.
- `blocked` means exactly one active task exists but cannot proceed without
  owner input, missing access, or an external condition.
- `handoff` means exactly one active task is prepared for another agent or
  session to continue.

`done` is not a valid `STATE.md` status. Completed tasks move to `TASKS.md`
Done and `STATE.md` returns to `clear`.

When `STATE.md` is `clear`:

- `active_task` must be `none`;
- no active task block may be present.

When `STATE.md` is `active`, `blocked`, or `handoff`:

- `active_task` must contain the transferred task id;
- exactly one active task block must be present;
- the same task must not remain pending in `TASKS.md`.

`STATE.md` owns the active task object.

The active task object must include:

- `id`;
- `request`;
- `task_phase`;
- `actor`;
- `created_at` or equivalent timestamp when known;
- `source`;
- `affected_files`;
- `reservations`;
- `validation`;
- `retry`;
- `handoff`.

The `source` field must identify:

- related idea when future context influenced the draft, otherwise `null`;
- supporting shape when a task descends from a shaped draft, otherwise `null`;
- selected draft, usually `LOGIC-DRAFT.md`;
- source task list, usually `TASKS.md`.

Valid `task_phase` values:

```txt
transferred
working
validating
blocked
handoff
```

Task phase maps to top-level `STATE.md` status as follows:

| STATE.md status | Active task `task_phase` |
|---|---|
| `active` | `transferred`, `working`, `validating` |
| `blocked` | `blocked` |
| `handoff` | `handoff` |

Planned tasks stay in `TASKS.md` Pending. Completed tasks move to `TASKS.md`
Done and `STATE.md` returns to `clear`.

Validation must record method, result, and evidence or a reason.

Retry must record attempt count and retry policy.

Reservations must identify claimed files or paths and access mode.

Handoff must record status and notes needed by the next agent or session.

`STATE.md` must not:

- contain accepted project truth;
- replace `TASKS.md`;
- store long-form reasoning;
- hide file reservations.

## EXAMPLE

```md
# STATE.md

## META

name: STATE.md
canonical_location: /ai/pact/context/state/STATE.md
layer: PACT / context / state
status: active
active_task: PACT-YYYYMMDD-001
generated_from: /ai/pact/templates/state.tpl.md
generated_from_version: 1.2
content_status: current-state
updated: YYYY-MM-DD HH:mm:ss UTC+00:00

## Active Task

    id: PACT-YYYYMMDD-001
    request: Create the requested hook file.
    task_phase: working
    actor: Codex
    created_at: YYYY-MM-DD HH:mm:ss UTC+00:00
    source:
      idea: null
      shape: null
      draft: LOGIC-DRAFT.md
      tasks: TASKS.md
    affected_files:
      - /ai/pact/agents/hooks/Example.md
    reservations:
      - path: /ai/pact/agents/hooks/Example.md
        mode: write
    validation:
      method: Not selected
      result: Pending
      evidence: null
    retry:
      attempts: 0
      policy: explicit correction only
    handoff:
      status: none
      notes: null

Related:

- [TASKS.md](TASKS.md)
- [LOGIC-DRAFT.md](LOGIC-DRAFT.md)
```
