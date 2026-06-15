# tasks.tpl.md

## META

name: tasks.tpl.md
version: 1.3
type: pact maintenance template
for: TASKS.md

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
- move canceled tasks out of Pending with an explicit cancellation note;
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

## Pending

- [ ] PACT-YYYYMMDD-001 - Create the requested hook file.
- [ ] PACT-YYYYMMDD-002 - Validate template consistency.

## Done

None.

Related:

- [LOGIC-DRAFT.md](LOGIC-DRAFT.md)
- [STATE.md](STATE.md)
```
