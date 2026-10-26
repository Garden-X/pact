# state.tpl.md

## META

name: state.tpl.md
type: pact maintenance template
for: STATE.md
updated: 2026-10-26 01:52:14 UTC+00:00
version: 1.10

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
  constraints, validation expectation, applicable tests/baseline references,
  and parent-issued boundary_contract and execution context when spawned;
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
- write reservations across all blocks must be pairwise disjoint; read claims
  do not reserve writes;
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
- for every spawned assignment, `parent`, the actual spawning agent, plus
  `model_tier`, resolved `model_binding`, requested `effort` and effective
  native setting, and `boundary_contract` with all six WORKFLOW Spawn Boundaries
  fields; use `function: Architect` or `function: Inspector` for a Prime
  assignment. Do not infer authority from depth or capability. Root is exempt
  from a parent-issued contract, not from project/role authority;
- `lead`, required for every Worker assignment and shared by a parallel set;
- `requires`, when the assignment declares runtime prerequisites, copied
  unchanged from the brief; it grants no authority. A requirement found unmet
  after transfer makes the task `blocked` or is escalated;
- `created_at` or equivalent timestamp when known;
- `source`;
- `affected_files`;
- `reservations`;
- `task_base`, `task_branch`, `task_candidate`: coordinates of a mutating
  task. `task_base` is the exact gate revision the task was dispatched
  against, `task_branch` its assigned branch from `task_branch_pattern`, and
  `task_candidate` is `none` until publication, then the exact pushed
  candidate commit. All three are `none` for a read-only task. They are
  coordinates in this object, not another state object; integration is
  derived from Git reachability and never stored;
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
bindings, parent/role/tier context and the complete effective boundary_contract.
An already explicit Pending actor, model tier, local model binding, effort or
effective native setting must remain unchanged on transfer unless an authorized
recorded change precedes dispatch. Previously unassigned actor/local binding,
Lead/source or exact task branch/base coordinates may be resolved at dispatch;
absence is not an explicit binding to overwrite. Record that resolution without
inventing a different owner setting. Preserve every explicitly supplied value.
Approved changes retain their parent approval evidence; a descendant may not
silently widen inherited limits. Keep large evidence at its existing path and
retain its relevant references; do not copy transcripts or long-form reasoning into STATE.

On resume, read that object and check the actual diff and reservation status.
Handoff notes record progress and outstanding work; they do not replace the
original brief, tests, baseline, or validation. If transferred constraints or
evidence are missing, recover them from existing authorized records or ask the
Lead; keep the task blocked when the missing instruction prevents safe work.
Do not reconstruct lost constraints by guessing or widen the assignment.

Validation preserves the supplied expectation and records method, result, and
evidence or a reason. `actor`, harness/session identities, and evidence
pointers may be opaque host-native or remote references, provided the actor
that validates or recovers the work can resolve them.

Retry must record attempt count and retry policy.

Reservations use PACT-PATH operations `read`, `modify`, `create`, `delete`.
Legacy `write` means modify plus create only; bare paths with no mode are
unresolved until reviewed. Read claims are not write reservations. New task
and handoff mechanical fields use PACT-RECORD `pact:task` and
`pact:gate-handoff` blocks; the complete brief and boundary fields stay prose.
PACT-TRANSFER requires exact preservation of the brief, constraints, source,
reservations, validation, applicable tests/baseline and bindings; losing any
required field or leaving a Pending duplicate makes transfer invalid.
PACT-STATE uses the status table and aggregate mapping above, not elapsed time.

Handoff must record status and notes needed by the next agent or session;
candidate identity lives in the task coordinates, not in handoff notes.

### Gate Handoff (PACT-HANDOFF)

An optional `## Gate Handoff` block is the durable Lead -> Prime record for the
current gate, in both harness topologies. It reuses STATE instead of adding a
file type; wake messages only point to it. Absent means `signal: working` with
no Prime-facing publication. It is independent of the task status above:
`ready` normally coexists with `clear`, and `escalation` with any status.

Only the exact current `## Gate Handoff` section is consumed; historical
headings are narrative. The mechanical block and its owning narrative together
form the immutable publication. Duplicated current sections/blocks or conflicting
legacy/new fields are invalid.

Lead is the only writer of this block. It shows the newest published revision;
earlier revisions remain in Git history. `gate_id` + `seq` identifies one
immutable published Prime-facing revision: once committed to the gate branch
(and pushed in `multi` topology) it is never edited in place. Any material
change to its Prime-facing payload, including `signal`, `candidate`,
`escalation`, `blockers`, `validation`, `records`, `slices`, or any other
value that could alter Prime's decision, replaces the block with a new revision
and the next `seq`. Non-semantic differences (timestamp, formatting, a re-read
of the same pointer) create no revision and are not edited into a published
one. Unpublished local drafts may change freely.

Compare the whole owning publication, including material narrative, not only
its mechanical block. A repeated identical observation is a no-op. A seq bump
without a material payload change is invalid, including timestamp-only changes.
Changed material prose at the same seq violates immutability. Where changed
prose could be semantically equivalent, consume the Lead's evidenced materiality
resolution in the existing owning record; absent that interpretation the
comparison is unresolved. Delivery freshness uses the same complete publication
comparison, so changed blockers/validation cannot hide behind unchanged fields.

Fields:

- `gate_id`: the gate selected in `LOGIC-DRAFT.md`;
- `seq`: integer from 1 through 9007199254740991, starting at 1 for a gate,
  incremented by one for every published material
  change; `gate_id#seq` is the notification key;
- `signal`: `working`, `escalation`, or `ready`;
- `candidate`: for `ready`, the exact implementation revision Lead validated
  and Prime accepts; otherwise `none`;
- `branch`: the gate branch holding the candidate and this record;
- `lead`: the Lead actor, naming its harness/session in `multi` topology;
- `slices`, `validation`, `records`, `blockers`: for `ready`, compact
  integration, Lead check, SliceRecordsCheck, and blocker state with pointers
  to TASKS/evidence rather than copies;
- `escalation`: for `escalation`, the exact Prime-level need, affected task IDs,
  and the decision requested; otherwise `none`;
- `recorded_at`: verified-UTC publication time of this revision.

Lead owns mutable execution state: task transfer, progress, reservations,
Worker results, and this block. Prime never writes this block and does not
perform Lead execution-state maintenance. When answering a Prime-facing
revision, Prime may write only the minimum authority-decision entry in the
artifact that owns the affected authority or contract, in a record-only
commit with the trailer `PACT-Answers: <gate_id>#<seq>` (see WORKFLOW Answer marker and closure). A
boundary widening becomes one appended authority-decision entry in the
affected task's `boundary_contract`, touching no other field and leaving
LOGIC-DRAFT unchanged; a gate scope, acceptance or
selected-logic change goes to LOGIC-DRAFT; an acceptance outcome goes to
GateClose evidence and a LOGIC-DRAFT `## Acceptance` entry (`decision`,
`candidate`, evidence), committed before any default-branch delivery;
`accepted` is not closure. Lead preserves those entries unchanged when it
integrates the commit. A key is answered when such a
commit exists; Prime answers only the newest published revision.

`ready` declares that Lead's gate execution responsibility is complete: no
active task object remains, TASKS holds no pending task of the gate, every
selected slice is integrated and passed SliceRecordsCheck, and Lead's fast
checks passed on `candidate`. Commits after `candidate` may change only PACT
state and decision records under `/ai/pact/context/state/`, so the delivered
tip differs from the accepted candidate only in records, including Prime's
durable acceptance answer. These conditions are necessary but
never sufficient; readiness exists only when Lead publishes `ready`. After a
not-accepted outcome or a decision, Lead integrates the answering commit and
publishes `signal: working` with the next `seq`. When Prime advances the draft
after acceptance, the block resets for the next gate; completed outcomes remain
in TASKS Done.

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

````md
# STATE.md

## META

name: STATE.md
canonical_location: /ai/pact/context/state/STATE.md
layer: PACT / context / state
status: active
active_task: PACT-YYYYMMDD-001
generated_from: /ai/pact/templates/state.tpl.md
generated_from_version: 1.10
content_status: current-state
updated: YYYY-MM-DD HH:mm:ss UTC+00:00

## Active Task

```pact:task
id: "PACT-YYYYMMDD-001"
role: "Worker"
actor: "<assigned agent/session>"
parent: "<responsible Lead agent/session>"
lead: "<responsible Lead agent/session>"
task_phase: "working"
requires: ["git"]
reservations: [{"path":"ai/pact/agents/hooks/ValidateBeforeCompletion.md","mode":"create"},{"path":"ai/pact/workflow/WORKFLOW.md","mode":"modify"}]
task_base: "<full gate revision at dispatch>"
task_branch: "task/<gate-id>/PACT-YYYYMMDD-001"
task_candidate: "none"
trace: "LOGIC-DRAFT.md / Decisions"
source: {"idea":null,"shape":null,"draft":"LOGIC-DRAFT.md","tasks":"TASKS.md"}
```

request: Create the requested hook file.
brief: Create ValidateBeforeCompletion.md from hook.tpl.md for the selected completion check; register its trigger and failure action in WORKFLOW. Do not bind a runtime.
boundary_contract:
  task_scope: Create and register the selected completion-check hook.
  permitted_area: Read governing PACT contracts; write only the two reserved files.
  protected_area: No template edits, product code, SPARC truth, host configuration or other state writes.
  unchanged_contracts: Preserve PACT/SPARC authority and all existing hook interfaces.
  allowed_side_effects: Reserved Markdown edits; commit and push only task/<gate-id>/PACT-YYYYMMDD-001; no other Git write, runtime binding, services or external messages.
  escalation: Report missing/conflicting limits or needed scope/interface/side-effect expansion to parent before acting.
specialty: documentation
model_tier: Light
model_binding: <resolved owner-approved provider/model>
effort: 50%
effective_effort: <native setting or unsupported>
created_at: YYYY-MM-DD HH:mm:ss UTC+00:00
affected_files: the two reserved paths
tests: none - documentation-only task; inspect its governing contract.
validation: Inspect hook file and confirm workflow registration.
validation_result: Pending
validation_evidence: null
retry: attempts 0; explicit correction only
handoff: status none; notes none

Related:

- [TASKS.md](TASKS.md)
- [LOGIC-DRAFT.md](LOGIC-DRAFT.md)
````

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

When Lead later finishes the gate's execution, STATE returns to `clear` and
Lead publishes readiness in the same file. This block is the durable record a
native wake, `PrimeWatch`, or Prime's fallback heartbeat points to; the earlier
active object is not part of this later snapshot:

````md
## Gate Handoff

```pact:gate-handoff
gate_id: "<selected gate id>"
seq: 4
signal: "ready"
candidate: "<full revision Lead validated>"
branch: "gate/<selected gate id>"
lead: "<Lead actor; harness/session in multi topology>"
recorded_at: "YYYY-MM-DD HH:mm:ss UTC+00:00"
```

slices: all selected slices integrated and pushed; see TASKS Done
validation: Lead fast non-browser checks exited 0 on candidate; <evidence path>
records: SliceRecordsCheck pass on every outgoing slice
blockers: none
escalation: none
````

An escalation is a new revision of the same block with `signal: escalation`,
`candidate: none`, and an exact `escalation:` such as `Required scope expansion:
<need>; blocked: <task ids>; decision requested: <choice>`. If the request then
changes materially, for example to a wider path set, Lead publishes it as the
next `seq` rather than editing the published one. Prime answers in the owning
artifact, for example an approval entry in the affected `boundary_contract`:

```txt
approval: write /ai/pact/workflow/WORKFLOW.md added to permitted_area; Prime
```

committed alone as a state-record change with `PACT-Answers: <selected gate id>#5`.
