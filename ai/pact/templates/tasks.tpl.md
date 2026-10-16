# tasks.tpl.md

## META

name: tasks.tpl.md
type: pact maintenance template
for: TASKS.md
updated: 2026-10-16 05:11:21 UTC+00:00
version: 1.12

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
- transfer the exact bounded brief, scope/constraints, reservations, validation
  expectation, applicable tests/baseline references, and any parent-issued
  boundary_contract and role/parent/tier context into its active object;
- remove a transferred task from Pending when it becomes an active task in
  `STATE.md`; several tasks may be transferred at once only as a parallel
  worker set under the `## Execution Hierarchy` rule in `WORKFLOW.md`;
- allow an optional `files:` line on a task entry listing the paths the task
  is expected to touch, so a Lead can show that reservations are
  disjoint before a parallel transfer;
- move canceled tasks out of Pending with an explicit cancellation note;
- require each task entry to include an id, a short action/outcome, trace back
  to `LOGIC-DRAFT.md`, and a validation expectation;
- record validation evidence or a reason validation was not possible when a
  task moves to Done;
- record the result commit when one exists, without inventing a commit or
  claiming validation that was not run; for a mutating task that commit is its
  exact task candidate;
- move a mutating task, whoever executes it, to Done only after its exact
  `task_candidate`, built on its `task_base`, is reachable from the remote gate
  branch (WORKFLOW Task candidates); a read-only task needs no task branch;
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

### Ready pool

While a substantial gate is active, the Lead should aim for WORKFLOW's
declared `ready_pool_target` (default two to four) ready atomic tasks when
enough independent work exists. Do not invent tasks to
fill the pool. Lead selects the Worker specialty, adequate model tier, local
model binding, and effort percentage for each dispatch. Record them as
`specialty:`, `model_tier:`, `model_binding:`, and `effort:` in the ready brief;
these are assignment requirements until an actor takes the task. An optional
`requires:` lists the minimum runtime capabilities from WORKFLOW Runtime
requirements; a task whose requirements no available actor meets stays
`ready: false` or is escalated, and `requires` grants no authority. Each optional
`ready: true` entry requires an exact `brief:`,
`files:`, write `reservations:`, and `validation:`. A read-only task declares
`reservations: none`. Check reservations against active STATE before transfer.

For a task that changes a code invariant, readiness also requires `tests:`
paths and recorded `baseline:` evidence that the tests fail for the intended
missing behavior. For documentation, read-only, or reversible low-impact work,
use proportionate validation and state why invariant tests are unnecessary.
Tests and implementation may share a slice; intentionally failing test-only
commits must not be labelled or pushed as green slices.

An incomplete or blocked brief is `ready: false`. Before any task is dispatched,
not only a ready-pool task, its bounded instructions, scope/constraints,
reservations, validation expectation, and applicable tests/baseline evidence
must be available. Transfer them unchanged into the self-contained STATE
object, resolving the actor and local binding without losing owner settings;
then remove the Pending entry. Do not retain an active duplicate in TASKS or
replace the brief with its title. Missing constraints must be recovered from
existing authorized records or referred to Lead, never invented on resume.
During Lead cover, only pre-briefed ready tasks may be dispatched under
the StallCover policy registered in WORKFLOW.

For every task intended for a spawned agent, readiness additionally requires
all six boundary_contract fields from WORKFLOW Spawn Boundaries and explicit
role, parent, task and model-tier context (Prime function when applicable).
Carry inherited limits into the dispatch; preserve the effective contract on
transfer/restart/handoff. Missing boundaries prevent dispatch. Root tasks are
exempt from the parent-issued contract requirement. This grants no spawn permission.

### Results and measurement

Done entries carry actual outcomes, validation evidence, and a commit when
available. A mutating task moves to Done only after its exact candidate is
reachable from the remote gate branch, and its entry records that candidate;
read-only work has no commit and says so. `worker_fix_target: none` in WORKFLOW
disables correction-rate tracking for fresh installations; preserve an existing
project's enabled value. No metric entries or counts are required when disabled.

When enabled, Lead records unique Lead-reviewed Worker task IDs and which needed a
material correction to satisfy the original bounded brief. Count each task
once, regardless of retries or slices. Exclude cosmetic changes, normal
integration, and changed scope/requirements; a retry is not another result.
Keep one gate aggregate here, or a compact pointer to required project logs,
using `100% * corrected task count / reviewed task count`. No reviewed Workers means
`not applicable`; do not invent a denominator or estimates. The target guides
routing and brief improvements, never gate acceptance or a substitute for
validation. Prime reviews that same aggregate; do not duplicate metric reports
or require per-slice totals.

`TASKS.md` must not:

- contain project truth;
- duplicate active state;
- store raw evidence;
- replace `STATE.md`.

## EXAMPLE

The illustrative `ValidateBeforeCompletion.md` filename comes from
[hook.tpl.md](hook.tpl.md)'s example. It names a generated hook target, not a
shipped hook or a missing template. Use the requested target name in real work.

```md
# TASKS.md

## META

name: TASKS.md
canonical_location: /ai/pact/context/state/TASKS.md
layer: PACT / context / state
status: active-draft
generated_from: /ai/pact/templates/tasks.tpl.md
generated_from_version: 1.12
content_status: current-state
updated: YYYY-MM-DD HH:mm:ss UTC+00:00


## Pending

- [ ] PACT-YYYYMMDD-001 - Create the requested hook file.
  trace: LOGIC-DRAFT.md / Decisions
  outcome: Hook file exists at the selected path.
  files: /ai/pact/agents/hooks/ValidateBeforeCompletion.md, /ai/pact/workflow/WORKFLOW.md
  reservations: /ai/pact/agents/hooks/ValidateBeforeCompletion.md, /ai/pact/workflow/WORKFLOW.md
  ready: true
  parent: <responsible Lead agent/session>
  role: Worker
  boundary_contract:
    task_scope: Create and register the selected completion-check hook.
    permitted_area: Read governing PACT contracts; write only the two reserved files.
    protected_area: No template edits, product code, SPARC truth, host configuration or other state writes.
    unchanged_contracts: Preserve PACT/SPARC authority and all existing hook interfaces.
    allowed_side_effects: Reserved Markdown edits; commit and push only task/<gate-id>/PACT-YYYYMMDD-001; no other Git write, runtime binding, services or external messages.
    escalation: Report missing/conflicting limits or needed scope/interface/side-effect expansion to parent before acting.
  specialty: documentation
  model_tier: Light
  model_binding: <owner-approved local binding, resolved before dispatch>
  requires: [repo-write]
  effort: 50%
  brief: Create ValidateBeforeCompletion.md from hook.tpl.md for the selected completion check;
    register its trigger and failure action in WORKFLOW. Do not bind a runtime.
  tests: none - documentation-only task; inspect its governing contract.
  validation: Inspect hook file and confirm workflow registration.
- [ ] PACT-YYYYMMDD-002 - Validate template consistency.
  trace: LOGIC-DRAFT.md / Constraints
  outcome: Target files match their governing templates.
  files: /ai/pact/templates, /ai/pact/agents/hooks/ValidateBeforeCompletion.md
  reservations: none
  ready: false - depends on PACT-YYYYMMDD-001.
  validation: Run `git diff --check` and inspect generated_from versions.

## Done

None yet. Completed entries record actual outcome, validation and, for a
mutating task, the exact candidate commit reachable from the gate (read-only
tasks: `none`).

Related:

- [LOGIC-DRAFT.md](LOGIC-DRAFT.md)
- [STATE.md](STATE.md)
```

An invariant task uses the same entry fields, with its actual id, reserved
implementation/test paths, binding and trace. For example, its bounded fields
may be:

```txt
brief: Reject an empty identifier in the reserved validator. Preserve all other
  valid identifier behavior; make the supplied tests pass without editing them.
tests: <supplied invariant test path>
baseline: <recorded failing command, actual exit status, and evidence path>
validation: Run the supplied invariant checks sequentially against this candidate.
```

Copy these fields, the parent-issued boundary_contract and execution context,
and the original scope/reservations into the active STATE
object before removing the Pending entry. The matching invariant-field example
in [state.tpl.md](state.tpl.md) shows the same object during handoff, retaining the task's
instructions and baseline references for resume.
