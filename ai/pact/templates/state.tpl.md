# state.tpl.md

## META

name: state.tpl.md
type: pact maintenance template
for: STATE.md
updated: 2026-10-10 22:06:24 UTC+00:00
version: 1.5

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
- map each active task back to one task from `TASKS.md`;
- own the structured active task objects;
- preserve the transferred task's exact bounded brief, including its scope,
  constraints, validation expectation, and applicable tests/baseline references;
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
- `active` means exactly one task is being executed; in a parallel worker set,
  at least one task is being executed.
- `blocked` means exactly one active task exists but cannot proceed without
  owner input, missing access, or an external condition; in a parallel worker
  set, no task can proceed and at least one is blocked.
- `handoff` means exactly one active task is prepared for another agent or
  session to continue; in a parallel worker set, no task can proceed or is
  blocked and the remaining tasks are prepared for handoff.

`done` is not a valid `STATE.md` status. Completed tasks move to `TASKS.md`
Done and `STATE.md` returns to `clear`.

When `STATE.md` is `clear`:

- `active_task` must be `none`;
- no active task block may be present.

When `STATE.md` is `active`, `blocked`, or `handoff`:

- `active_task` must contain the transferred task id;
- exactly one active task block must be present;
- the same task must not remain pending in `TASKS.md`.

Parallel worker set. The single-task rule above is the default. Several active
task blocks may be present only under the parallel-worker rule of the
`## Execution Hierarchy` in `WORKFLOW.md`:

- `active_task` lists every active task id, separated by commas;
- exactly one active task block must be present per listed id;
- every block records `lead`, the one Lead that owns the set,
  and `actor`, the distinct worker that holds the task;
- reservations across all blocks must be pairwise disjoint;
- no task in the set builds or runs tests;
- the top-level status is `active` while any task is in `transferred`,
  `working`, or `validating`; otherwise `blocked` while any task is in
  `blocked`; otherwise `handoff`;
- a completed task leaves the set and moves to `TASKS.md` Done, and `STATE.md`
  returns to `clear` when the set is empty.

A second Lead or agent outside the set must wait, help unblock a task,
or receive owner approval for a separate coordination scope.

`STATE.md` owns the active task objects.

Each active task object must include:

- `id`;
- `request`;
- `brief`: the exact bounded task instructions, scope, and constraints from
  TASKS or the authorized dispatch; a short request is not a replacement;
- `task_phase`;
- `actor`;
- `role`: Prime, Lead, or Worker;
- for a Worker assignment, `specialty`, `model_tier` (High, Middle, or Light),
  resolved local `model_binding`, and requested `effort` percentage; record the
  effective native setting or unsupported control with that binding;
- `lead`, required for every Worker assignment and shared by a parallel set;
- `created_at` or equivalent timestamp when known;
- `source`;
- `affected_files`;
- `reservations`;
- `tests` and `baseline` references/evidence when the task changes a code
  invariant; otherwise record why invariant tests are unnecessary;
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

For a parallel worker set, apply this mapping per task, then derive the
top-level status as stated above.

Planned tasks stay in `TASKS.md` Pending. Completed tasks move to `TASKS.md`
Done and `STATE.md` returns to `clear` when no active task remains.

On transfer, copy the complete bounded brief, files/scope, reservations and
validation expectation, with applicable tests and baseline evidence, into the
active object before removing its Pending entry. STATE must suffice to resume
without the deleted entry or chat history. Preserve explicit actor/model/effort
bindings. Keep large evidence at its existing path and retain its relevant
references; do not copy transcripts or long-form reasoning into STATE.

On resume, read that object and check the actual diff and reservation status.
Handoff notes record progress and outstanding work; they do not replace the
original brief, tests, baseline, or validation. If transferred constraints or
evidence are missing, recover them from existing authorized records or ask the
Lead; keep the task blocked when the missing instruction prevents safe work.
Do not reconstruct lost constraints by guessing or widen the assignment.

Validation preserves the supplied expectation and records method, result, and
evidence or a reason.

Retry must record attempt count and retry policy.

Reservations must identify claimed files or paths and access mode.

Handoff must record status and notes needed by the next agent or session.

`STATE.md` must not:

- contain accepted project truth;
- replace `TASKS.md`;
- store long-form reasoning;
- hide file reservations.

## EXAMPLE

This snapshot follows transfer of task 001 from TASKS: its Pending entry has
been removed, and its brief, reserved files, and validation move into STATE.

The illustrative `ValidateBeforeCompletion.md` target comes from
[hook.tpl.md](hook.tpl.md)'s example; it is not a shipped hook or a missing
template. Keep the actual task's selected target name on transfer.

```md
# STATE.md

## META

name: STATE.md
canonical_location: /ai/pact/context/state/STATE.md
layer: PACT / context / state
status: active
active_task: PACT-YYYYMMDD-001
generated_from: /ai/pact/templates/state.tpl.md
generated_from_version: 1.5
content_status: current-state
updated: YYYY-MM-DD HH:mm:ss UTC+00:00

## Active Task

    id: PACT-YYYYMMDD-001
    request: Create the requested hook file.
    brief: Create ValidateBeforeCompletion.md from hook.tpl.md for the selected completion check;
      register its trigger and failure action in WORKFLOW. Do not bind a runtime.
    task_phase: working
    actor: <assigned agent/session>
    role: Worker
    lead: <responsible Lead agent/session>
    specialty: documentation
    model_tier: Light
    model_binding: <resolved owner-approved provider/model>
    effort: 50%
    effective_effort: <native setting or unsupported>
    created_at: YYYY-MM-DD HH:mm:ss UTC+00:00
    source:
      idea: null
      shape: null
      draft: LOGIC-DRAFT.md
      tasks: TASKS.md
    affected_files:
      - /ai/pact/agents/hooks/ValidateBeforeCompletion.md
      - /ai/pact/workflow/WORKFLOW.md
    reservations:
      - path: /ai/pact/agents/hooks/ValidateBeforeCompletion.md
        mode: write
      - path: /ai/pact/workflow/WORKFLOW.md
        mode: write
    tests: none - documentation-only task; inspect its governing contract.
    validation:
      method: Inspect hook file and confirm workflow registration.
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

For a code-invariant assignment, use the same active object with the task's
actual id, scope, reservations, binding and source. Copy its instructions and
test/baseline references unchanged. For example, these fields may replace the
documentation-only fields above; they are not another active task or file type:

```txt
task_phase: handoff
brief: Reject an empty identifier in the reserved validator. Preserve all other
  valid identifier behavior; make the supplied tests pass without editing them.
tests: <supplied invariant test path>
baseline: <recorded failing command, actual exit status, and evidence path>
validation:
  method: Run the supplied invariant checks sequentially against this candidate.
  result: Pending
  evidence: null
handoff:
  status: ready
  notes: Resume from this brief and its referenced baseline; verify the current
    diff and reservations before continuing. Required validation remains pending.
```

Derive the top-level status from the task phases as above. The original bounded
brief and test/baseline references remain in the object during handoff/resume.
