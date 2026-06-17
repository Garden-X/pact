# tasks.tpl.md

## META

name: tasks.tpl.md
type: pact maintenance template
for: TASKS.md
updated: 2026-06-17 03:55:16 UTC+00:00
version: 1.4

## WHAT

`TASKS.md` records the pending and done tasks derived from selected maintenance
logic.

It is not the active execution cursor.

## FOR

Target path:

```txt
/ai/pact/context/state/TASKS.md
```

Use this template when creating or resetting the PACT task list.

## RULES

`TASKS.md` must:

- use one valid task-list status;
- derive tasks from `LOGIC-DRAFT.md`;
- never derive tasks directly from `IDEAS.md`;
- never derive tasks directly from shape files;
- keep pending and done tasks separate;
- move active work into `STATE.md`;
- remove a transferred task from Pending when it becomes the active task in
  `STATE.md`;
- move canceled tasks out of Pending with an explicit cancellation note;
- require each task entry to include an id, a short action/outcome, trace back
  to `LOGIC-DRAFT.md`, and a validation expectation;
- record validation evidence or a reason validation was not possible when a
  task moves to Done;
- link related invariant PACT files with relative Markdown links;
- keep task entries compact and traceable.

Valid `TASKS.md` statuses:

```txt
no-active-draft
active-draft
complete
```

Status meanings:

- `no-active-draft` means no selected draft is currently being split into tasks.
- `active-draft` means pending or active tasks exist for the selected draft.
- `complete` means all tasks for the selected draft are done.

Task IDs must follow:

```txt
PACT-YYYYMMDD-NNN
```

`NNN` is a zero-padded sequence number for that date.

`TASKS.md` must not:

- contain project truth;
- duplicate active state;
- store raw evidence;
- replace `STATE.md`.

## EXAMPLE

```md
# TASKS.md

## META

name: TASKS.md
canonical_location: /ai/pact/context/state/TASKS.md
layer: PACT / context / state
status: active-draft
generated_from: /ai/pact/templates/tasks.tpl.md
content_status: current-state
updated: YYYY-MM-DD HH:mm:ss UTC+00:00


## Pending

- [ ] PACT-YYYYMMDD-001 - Create the requested hook file.
  trace: LOGIC-DRAFT.md / Decisions
  outcome: Hook file exists at the selected path.
  validation: Inspect hook file and confirm workflow registration.
- [ ] PACT-YYYYMMDD-002 - Validate template consistency.
  trace: LOGIC-DRAFT.md / Constraints
  outcome: Target files match their governing templates.
  validation: Run `git diff --check` and inspect generated_from versions.

## Done

- PACT-YYYYMMDD-000 - Example completed task.
  trace: LOGIC-DRAFT.md / Selected Logic
  outcome: Example outcome.
  validation: Evidence or reason validation was not possible.

Related:

- [LOGIC-DRAFT.md](LOGIC-DRAFT.md)
- [STATE.md](STATE.md)
```
