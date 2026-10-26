# WORKFLOW.md

## META

name: WORKFLOW.md
canonical_location: /ai/pact/workflow/WORKFLOW.md
layer: PACT / workflow
status: canonical
generated_from: /ai/pact/templates/workflow.tpl.md
generated_from_version: 3.8
content_status: current-data
purpose: Define how agents maintain project work without bypassing SPARC project truth.
updated: 2026-10-26 01:43:31 UTC+00:00

## Lifecycle

shape
-> LOGIC-DRAFT.md
-> TASKS.md
-> STATE.md
-> execution
-> validation
-> project truth update through SPARC when needed
-> cleanup

IDEAS may supply future context but are not a required starting point. Shaping
is optional; selected intent always passes through LOGIC-DRAFT before TASKS.

## Startup

Follow the canonical startup sequence in `PACT-MANIFEST.md`.

### Source update discovery

At session start, when an owner-selected PACT source is available locally or
through the GitHub/repository access already in use, inspect its committed
revision read-only and compare its package/template versions with the local
installation. A source is explicitly selected by the owner/host configuration;
do not infer an update source from the product repository's remote. Compare
template versions too: the package label alone may remain PACT 2.0. Capture
the exact source revision; uncommitted source edits are not published updates.

If newer contracts are available, present the source, current/available
versions, relevant changes and preservation scope. Apply only after explicit
user agreement covering that update proposal; an existing specific upgrade
authorization counts. A read-only lookup is not consent to pull, merge or
replace files. If the source moves beyond the agreed proposal, inspect the
new differences before applying them and obtain agreement for changed scope.
Unreachable, malformed or unverifiable sources mean update status unknown,
not up to date; ordinary project startup is not blocked by a lookup failure.
Checks are bounded and do not run services/tests or create a polling scheduler.
Use the existing INSTALL migration procedure after agreement.

### Pending template updates

At project work-session startup, after reading current STATE and the enabled
file guard, compare each installed target's generated_from_version with its
approved local governing template version. Compare numeric version components,
not lexical strings. New templates are available contracts, not evidence that
active targets have already been migrated. A read-only host reminder may report
this drift; it must not write files, run checks, fetch updates, start services
or change bindings. Missing or ambiguous version/provenance needs inspection.

When the owner has authorized the distributed upgrade, the responsible agent
reconciles affected targets and registered hooks before work that relies on the
changed contract. Use INSTALL's preservation procedure and the template RULES
and complete EXAMPLE; never replace project data with seed examples or the
protocol repository's operational records. Preserve exact active briefs, scope,
reservations, validation references, pending work, immutable published handoffs,
acceptance history, owner models/native efforts, custom hooks and file guards.
Coordinate with any active writer; Prime retains authority decisions and Lead
execution records. A migration does not advance a gate or dispatch work.

Record the applied versions and preservation checks in existing TASKS/STATE.
If authorization, required instructions, compatible package assets or safe
reconciliation is missing, retain the current targets and record the precise
conflict; hold only work dependent on that unresolved contract. Do not silently
run mixed policies. Report templates updated and active workflow migrated as
separate outcomes. Distribution can remain template-only until this startup
step; it requires no project build, service launch or scheduler.

## Resume

Read the selected `LOGIC-DRAFT.md`, `STATE.md` (including the newest Gate
Handoff revision and whether a `PACT-Answers` commit answered it), `TASKS.md`,
and latest cache manifest. Check the
current branch and actual diff before resuming a task;
reconcile any owner changes and outstanding worker results. Resume from the
recorded validation and handoff, without replaying completed work. A blocked
task stays blocked only while its recorded blocking condition still holds.

Read the shared keep-alive registry before service work. Check which host
hooks and schedules are actually installed; Markdown hook files do not prove
runtime activation. No separate handoff file is required.

## Owner Command Aliases

Recognize these only when the whole owner message, after trimming surrounding
whitespace, is one of the listed tokens. Match words case-insensitively.
Embedded prose, quoted tokens, code, and longer punctuation strings are not
aliases. Interpret intent before decomposing or dispatching work; this is a
workflow input rule, not an installed runtime hook.

| Owner message | Meaning |
|---|---|
| `...` (three ASCII dots), `…` (one ellipsis), `continue`, `продовжуй` | Continue the recovered authorized work from STATE/draft/tasks. |
| `!!` (two exclamation marks) | Report current status, actual validation and blockers only; do not start implementation. |
| `!!!` (three exclamation marks), `promt`, `промт` | Stop starting new implementation; prepare a compact next-chat handoff. |

Leading-space forms such as ` ...`, ` …`, ` !!`, and ` !!!` have the
same meaning once delivered to the model. A host may intercept punctuation
before delivery; leading-space handling depends on that host. Use the word
forms for continue/handoff or an explicit status request if necessary.

A handoff records the objective, complete bounded brief and evidence references,
current progress and diff, changed files, actual validation, blockers, relevant
PACT/SPARC gaps, exact needed cache pointers, and the next concrete step in
existing STATE/task/cache records. Return a compact prompt with those pointers;
no extra handoff file is required. Reconcile outstanding Worker results and
reservations before marking STATE handoff; do not discard its original brief.
No alias widens scope, changes bindings, grants merge/publication permission,
or overrides Prime/Lead/Worker authority.

## Statuses

Valid `LOGIC-DRAFT.md` statuses are `none-selected`, `selected`, and
`superseded`.

Valid `TASKS.md` statuses are `no-active-draft`, `active-draft`, and
`complete`.

Valid `STATE.md` statuses are `clear`, `active`, `blocked`, and `handoff`.

Task IDs follow `PACT-YYYYMMDD-NNN`.

For active tasks, `task_phase` values `transferred`, `working`, and `validating`
map to `STATE.md: active`; `blocked` and `handoff` map to their matching
statuses. In a parallel set, derive the aggregate status as specified in
[../context/state/STATE.md](../context/state/STATE.md)'s governing template.
`TASKS.md: complete` and `STATE.md: clear` finish the selected cycle's task
execution; they do not declare gate readiness or acceptance (see Gate
Handoff). Selecting the next draft resets the pending pool without erasing its
predecessor's completion evidence.

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
reason validation was not possible, then remove it from `STATE.md`. A
mutating task moves to Done only after its exact candidate is reachable from
the remote gate branch (see Task candidates); a read-only task completes on
its evidence. `STATE.md` returns to `clear` when no active task remains.

## Execution Hierarchy

Every project that installs or syncs PACT inherits this hierarchy. It defines
who plans, who executes, and who accepts work. Prime's Architect and Inspector
functions share the required High tier. Other declared fields below are
defaults and routing hints; a project may override them in place within these
role boundaries.

Declared fields:

```txt
prime_tier: High
lead_tier: Middle
worker_tier_default: Light
prime_effort: 100%
lead_effort: 75%
worker_effort_default: 50%
harness_topology: single
heartbeat_prime: 2h
heartbeat_lead: 11m
heartbeat_watch: none
default_branch: main
authority_remote: origin
gate_branch_pattern: gate/<id>
task_branch_pattern: task/<gate-id>/<task-id>
keep_alive_registry: ../KEEP-ALIVE.md
heavy_work: sequential
ram_threshold_gb: 5
worker_fix_target: none
ready_pool_target: 2-4
prime_stall_policy: ready-only
```

`authority_remote` binds the exact remote used by PACT-GIT reachability checks;
a local remote-tracking ref is never the remote authority.

Roles and model tiers are separate. The capability tiers are
`Light < Middle < High`; their names are exactly `Light`, `Middle`, and
`High`. They express the capability required for the assignment, not a vendor
or model identity. Concrete provider/model bindings are local configuration;
preserve the owner's explicit bindings and configured host model. A missing
capability must be reported with an explicit fallback, never silently lowered.

Capability is selected for the assignment; authority is selected by the
role/function contract. Neither determines the other. `lead_tier` and
`worker_tier_default` are default routing hints, not role classifications: a
Lead, Worker, or Watchdog assignment may use any adequate tier within owner
constraints (a Watchdog may also be a non-model script). A simple Lead
coordinating a few trivial tasks may be Light. A higher tier never adds
authority, and a lower tier never removes authority the role already grants.

Prime has two functions: Architect selects scope and acceptance criteria;
Inspector checks the candidate and acceptance evidence. Both use
`prime_tier: High` and may use the same model or different models.
Their effort percentages may differ; `prime_effort` supplies the default. Sharing a model
does not waive a distinct review pass, and self-review is never labelled
independent. Only Prime holds gate acceptance authority.

Lead is the coordinator role. Prime selects the Lead assignment's adequate tier
for the gate within owner constraints; `lead_tier` is only the default. Lead
hires Workers for the skills the task needs,
such as design, coding, research, documentation, or testing. Workers are
assignments, not a fixed roster or a compulsory lowest-cost model. Lead selects
each Worker's specialty, model tier, concrete model binding, and requested
effort within owner constraints. The default applies only when adequate; a
Worker may need Middle or High capability without gaining Lead/Prime powers.
Each dispatch records that assignment in the task brief and active STATE.
Reusable specialty instructions may be generated from
[../templates/sub-agent.tpl.md](../templates/sub-agent.tpl.md) only when useful.
Do not add current hires to PACT-MANIFEST or a project MAP.

Effort is an integer percentage from 0% to 100% of the selected model's
available effort range. It is independent of capability tier and is not a
cross-provider promise of equal tokens, cost, or reasoning. A local binding
records requested percentage and effective native setting. For an ordered
set of N supported levels, map to the nearest index
`round(percent / 100 * (N - 1))` (ties toward the higher level); one level
always maps to itself. A numeric control uses its documented supported range
and rounding. If effort is unavailable, record `unsupported` and preserve
the model's behavior. Do not send a percentage to an API that expects a native
enum or budget. Preserve explicit existing native settings during migration;
record the corresponding percentage/mapping instead of silently changing them.

A single host may perform roles sequentially when delegation provides no
benefit, keeping the role boundaries and evidence checks. Role defaults do not
authorize switching the owner's active model or spawning unnecessary agents.

`keep_alive_registry` is resolved relative to the project root, never the
workflow folder. Its default is the sibling registry in the project parent's
directory; a nested project or worktree binds to the existing shared registry.
`none` is an explicit opt-out for projects without service work.

Roles:

| Role | Does | Does not |
|---|---|---|
| Prime | as Architect selects the shape and `LOGIC-DRAFT.md`; as Inspector reviews the candidate, gate validation, and PACT/SPARC records; inspects the complete required acceptance evidence and runs checks without reusable evidence; fast-forwards `gate/<id>` into `default_branch`; closes the gate | write product code; micromanage slices |
| Lead | decomposes the selected draft into atomic `TASKS.md` entries; transfers tasks into `STATE.md`; writes self-contained worker briefs; performs the Watchdog function for its Workers; reviews every worker diff; checks PACT and SPARC conformance; may fix worker errors; prepares the records; when executing a mutating task itself, commits and pushes that task's exact candidate only to its assigned task branch before integrating it into the gate; integrates reviewed task candidates into `gate/<id>` preserving their ancestry; commits and pushes validated slices to `gate/<id>` when authorized; publishes `ready` or `escalation` in the Gate Handoff | bypass task-candidate publication for material mutating work; run the full acceptance suite; wake Prime for routine Worker or slice events; push or merge `default_branch`; force-push; skip hooks; deploy |
| Worker | performs one bounded task using its assigned specialty; for a mutating task commits and pushes its exact candidate only to its assigned task branch; returns changes or findings, the candidate commit, and validation evidence to Lead | write to any other branch (gate, `default_branch`, another task); integrate, merge, rebase shared history, or force-push; accept its own task; widen scope; guess when the brief is ambiguous; wake Prime |

Artifact ownership: the Prime owns selected scope and acceptance in
`LOGIC-DRAFT.md`; the Lead owns decomposition, the pending pool in
`TASKS.md`, and execution/handoff in `STATE.md`. Workers return evidence for
the Lead to record. WORKFLOW defines responsibilities; specialist files
narrow a particular assignment. TASKS holds planned briefs and STATE holds
current assignments/reservations. The package manifest remains a stable
protocol index; project MAP remains a project-structure contract.

A worker that finds its brief ambiguous or contradicted by the code stops and
reports the question. Repeated material corrections can indicate an unclear
brief or inadequate routing: the Lead sharpens the brief or assignment and
records actual corrections and validation in the task outcome. Optional
correction-rate reporting follows the Measurement rule below.

### Correction And Capability Routing

The parent reviews the returned work against the original brief and required
checks, then chooses how to finish the residual work. A mostly correct result
does not automatically require a higher-tier child. An approximate "80% good"
description is not a scoring rule, capability threshold or acceptance standard.

- Prefer a bounded local correction when the foundation is sound, the remaining
  changes are understood and localized, their risk is controlled, and the
  parent can validate them within its authority and boundaries. Compare the
  total expected effort of finishing and checking with rebriefing, dispatch,
  review and integration; do not discard useful work simply to rerun it with a
  stronger model. All original acceptance requirements still must pass.
- Clarify or retry at the same adequate tier when missing context, an ambiguous
  brief or an environment/access failure explains the problem. A failed check,
  retry count, correction-rate target or fraction completed alone is not proof
  of insufficient capability. Do not loop retries without an identified fix.
- Raise the child tier when review identifies a concrete capability gap and
  the residual work cannot be safely and economically bounded for local
  correction, or when the assignment's verified complexity/risk requires
  stronger reasoning. Record the remaining problem, supporting evidence and
  revised binding in the existing task/STATE; preserve useful results and
  owner model constraints. Higher capability adds no scope or authority.

Here parent means the authority responsible for the child's work, not merely
the native harness parent. It acts only within its role: Lead may execute a
correction, while Prime routes product execution through Lead rather than
writing product code. A material behavior, code or design correction is a
bounded task with its own published candidate under Task candidates, including
when Lead executes it. Pure integration mechanics remain Lead integration work.
Boundary or acceptance changes follow normal parent/Prime escalation; tier
routing cannot authorize them. Keep the decision and actual validation in
existing records; no new score, threshold, retry ladder or reporting framework.

### External pushes observed by Prime

During normal startup, fetch, synchronization or pre-delivery inspection,
compare observed remote branch tips with the previously observed tips or
known published candidates. When another push advances or rewrites a relevant
branch beyond this session's expected publication, Prime reports the repository,
branch, previous and current revisions, a concise change summary and impact on
current work or acceptance. Lead/Workers surface the observation to Prime
through existing reporting boundaries; no new notification channel is implied.

A first observation without a reliable previous tip establishes a baseline;
it does not prove that somebody just pushed. Commit authorship is not proof of
who pushed: name a person only with reliable provider evidence, otherwise report
the observed remote update. Report each new observed revision once using
existing session context or records; avoid repeating unchanged status.

This notification leaves authorized GitHub/local synchronization and its
automation intact. It grants no merge, overwrite, force-push or deployment
authority. Inspect the incoming changes before continuing affected integration
or acceptance under the existing candidate/ancestry rules. Observation happens
on the next normal repository check; no instant alert, scheduled watcher or
runtime enforcement is implied.

### Spawn Boundaries

Every spawned agent MUST receive an explicit boundary contract from its parent
before acting. This applies to spawned Leads, Workers, and reviewers, including
a child assigned a Prime function. The root agent (Prime) is exempt from the
parent-issued contract requirement: its boundaries come from the project,
SPARC, PACT, and the owner's instruction. Root exemption grants no extra powers.

Each dispatch MUST identify the child's role (Prime, Lead, or Worker), parent
agent, assigned task, and model tier (High, Middle, or Light), with the existing
model/effort binding. For Prime, identify the Architect or Inspector function.
A role-less Watchdog executor records `role: none` and `function: Watchdog`
with the fixed contract of its hook instead. The child must understand its
position, responsibilities, and escalation route before acting. Spawn depth,
model capability, harness, and runtime parenthood do not confer role authority.

The boundary contract defines where the child may act, not how it must solve
the task. Record these six explicit fields as `boundary_contract` in the
existing task brief and preserve them in active STATE and handoff:

- `task_scope`: the bounded outcome;
- `permitted_area`: project paths and permitted access modes;
- `protected_area`: forbidden/protected paths or operations;
- `unchanged_contracts`: contracts/interfaces that must not be changed;
- `allowed_side_effects`: permitted effects, including an explicit `none`
  for read-only assignments;
- `escalation`: conditions requiring a report to the parent before the
  affected action, such as missing/conflicting boundaries or necessary scope
  expansion. Independent work inside the clear boundary may continue.

Use explicit `none` when a category has no additional restriction; applicable
project, SPARC, PACT, role, file-guard and owner constraints still apply.
Reservations identify claimed writes; they do not replace these boundaries.
Reusable profiles supply context but do not replace a parent's dispatch contract.

When spawning a descendant, the parent MUST carry forward its effective inherited
boundaries automatically in the dispatch and state only relevant changes or
narrower scope. The child MAY narrow those boundaries for its descendants; it
MUST NOT widen them without explicit approval from its parent. An immediate
parent cannot authorize beyond its own inherited authority: escalate upstream
until the authorized parent or owner can approve. Record approved changes in
the existing task/STATE before dispatch or the expanded action. No delegation
grants new role powers, permission to spawn, or permission for side effects.

The child chooses its method inside the fence, subject to supplied invariant
tests, acceptance requirements, and applicable contracts. No new boundary file,
role, reporting framework, host hook, or runtime enforcement is required.

Principle: Parent defines the fence. Child chooses how to work inside it.

### Effective PACT authority (PACT-AUTH)

For records at an identified revision, actor, assigned role, task/gate,
operation and its affected paths/refs, determine authority in this order.
This is a decision procedure, not a lease, token, ACL or executable policy.
Use [PACT's record/path/Git grammar](../PACT.md#mechanical-interpretation).

1. Identify the current owner instruction, selected gate and actor's recorded
   assignment. Model identity, native process parenthood, tools, prerequisites
   and elapsed time confer no role. Missing facts give `unresolved`; conflicting
   or malformed mechanical records give `invalid`, which permits no action.
2. Apply the role's operation below. A role-forbidden operation is `deny` even
   if the environment can perform it. A higher capability grants no exception.
3. Intersect task scope/reservations with every inherited boundary, protected
   area, unchanged contract and allowed-side-effect restriction. A child inherits
   scope limits, not its parent's role powers: a Lead may dispatch a Worker
   without acquiring Prime powers or restricting that Worker to Lead record
   edits. Narrowing is valid; widening needs recorded approval from an authority
   whose own inherited scope permits it, before dispatch/action. Unresolved
   semantic boundary text means `unresolved`, not an inferred grant.
4. For each path operation apply reservations and the enabled File Guard using
   PACT-PATH. Matching guard entries union their allowed operations; then strict
   mode narrows writes, warn records violations without adding authority, off
   adds no constraint. Inherited read restrictions still apply. General task
   approval is not a scoped guard override or role transfer.
5. Apply task/ref/transition invariants and required evidence. Every affected
   endpoint must pass; a definite prohibition gives `deny`, otherwise a missing
   required fact gives `unresolved`, and only all satisfied conditions give
   `allow`. Invalid records remain invalid regardless of other conditions.

| Actor / operation | Existing authority and bounds |
|---|---|
| Worker, task mutation/publication | Only reserved operations inside the complete effective brief on its assigned task branch, from exact task_base; no gate/default/other-task ref updates. Protocol template maintenance requires owner source-maintainer authorization. |
| Worker, read-only task | Reads/inspection within inherited read limits; no artificial task branch or repository mutation. |
| Lead, execution records | TASKS decomposition and STATE transfer/progress/reservations/Gate Handoff for its selected gate, preserving Prime decisions. |
| Lead, task execution | Same task-candidate and reservation rules as executor; material implementation/correction cannot bypass them. |
| Lead, integration (PACT-INTEGRATION) | Reviewed exact candidates and default-branch updates through ancestry-preserving integration on its gate. Mechanical resolution stays inside paths changed by the sides since their merge base plus Lead records; this is necessary, not sufficient: material behavior/design changes even within those paths need a task candidate. Unresolved mechanical-versus-material classification holds integration. |
| Prime, selection/decision | Selected scope/acceptance in LOGIC-DRAFT; minimum appended decision in the owning artifact, including a boundary approval in its affected task. No unrelated STATE progress, handoff, reservation or product mutation. |
| Prime, acceptance/delivery | Newest published handoff; complete evidence on exact candidate; durable record-only answer before separately authorized default fast-forward. |
| role none / Watchdog | Observe/classify/wake within read limits; no mutation or authority transfer. |

Owner overrides/transfers must state their scope and be evidenced, not inferred
from a general request. Native permissions may further restrict execution but
never expand PACT authority. Lack of a runtime does not affect this procedure.

Environment prerequisites and optional host adapters (PACT-REQUIRES):

- An assignment may declare `requires`: identifiers of minimum environment
  prerequisites, with grammar `<namespace>[:<qualifier>]`. Namespace matches
  `[a-z][a-z0-9-]*`; a qualifier matches `[A-Za-z0-9][A-Za-z0-9._/-]*`.
  Identifiers are case-sensitive opaque strings; duplicates form a set.
  Examples: `git`, `exec:test-unit`, `toolchain:node`, `model:Light`,
  `browser`, `mcp:server`. Namespaces are open; no registry, probe API or
  provider schema. Legacy `shell` and `repo-write` remain opaque prerequisites,
  never write or execution permissions.
  `role` answers who has authority, `model_tier` the reasoning capability,
  `requires` what environment the work needs, and `boundary_contract` what the actor
  may do. None implies another; `requires` grants nothing.
- The dispatching parent checks each requirement as `satisfied`, `unavailable`
  or `unresolved`, with its environment/evidence basis. No requirements means
  no extra prerequisite. All must be satisfied before transfer; unavailable
  or unresolved keeps the task pending with `ready: false` and the distinct
  reason, or is escalated. One discovered after transfer makes the task
  `blocked`, or is escalated. Neither supplies partial authority. A satisfied
  `exec:<name>` identifies an available check, never grants its execution.
  Never silently switch harness or
  provider, widen permissions, lower requirements, or start partial work outside
  the brief; the parent may choose another already authorized assignment.
- Where a host offers native permission or sandbox controls, the adapter SHOULD
  narrow the runtime to the effective `boundary_contract` where practical.
  Native restrictions MAY narrow PACT authority and MUST NOT widen it: available
  tools, write access, or network never grant authority. Their syntax stays in
  adapters and host configuration.
- Actor and harness/session identities and evidence pointers may be opaque
  host-native or remote references (repository path, Git revision, durable
  file, URL, host artifact or run/session id). PACT does not interpret them;
  each must stay durable and resolvable by the actor that validates or recovers
  the work.
- An adapter (script, host plugin, CLI integration, MCP or A2A bridge, native
  code, or manual binding) maps role, `boundary_contract`, and `requires` to
  host controls. PACT defines no transport, authentication, sandbox, artifact,
  event-stream, or provider schema. A harness that can only read and write
  files, run commands, and commit to Git still follows PACT fully.

Gate and slice:

- A gate is one selected `LOGIC-DRAFT.md` cycle, from selection to acceptance.
- A slice is a coherent, validated commit that carries its own records. Each
  slice stands on its own: it is complete, tested, and pushed to
  `gate_branch_pattern`.
- The Lead creates `gate/<id>` from `default_branch` on the first slice
  and fetches before each slice to read new commits from the owner or other
  agents. If `default_branch` moves, the Lead merges it into the gate
  branch instead of rewriting pushed history.
- The Prime closes the gate through the `GateClose` hook: acceptance must
  pass on the exact handoff `candidate`, and the answer commit is then
  fast-forwarded into `default_branch` as a separate action (see Answer
  marker and closure). Among agents, only the Prime writes to `default_branch`; the
  owner may commit directly, and agents fetch and read those commits.
- Design questions the owner has delegated are decided by the Lead and
  recorded in the project's decision log; they do not block the gate.

Task candidates:

- Publication, integration and acceptance are different operations: a Worker
  publishes a task candidate, Lead integrates it into the gate, and Prime
  accepts the gate into `default_branch`.
- Every mutating task produces an exact task candidate before it is integrated
  into the gate. A task mutates repository state when it changes code, tests,
  configuration, schemas, contracts or documentation. It is dispatched against
  an exact gate revision, `task_base`, and publishes its candidate on
  `task_branch_pattern` using the existing gate and task ids; the active STATE
  object carries `task_base`, `task_branch` and `task_candidate`. A Worker may
  commit and push only its assigned task candidate branch. Integration
  authority remains with Lead. This holds when Lead executes the task itself:
  Lead acting as executor publishes the candidate and Lead acting as
  integrator integrates it, even within one session. A read-only task
  (research, analysis, inspection, review, read-only validation) needs no task
  branch and completes on its evidence.
- Integration mechanics stay Lead's gate work without a task: mechanical
  conflict resolution, import or path reconciliation, record-only integration
  edits, and formatting required solely by the merge. An integration that
  needs a material behavior, code or design change is a correction task with
  its own candidate.
- The executor implements on `task_base`, validates, commits, pushes its task
  branch, and reports the exact candidate commit, which becomes
  `task_candidate`. That exact candidate commit is the handoff identity for
  mutating work; it is not a "done" report, a branch name, a workspace diff,
  uncommitted changes, or a chat message. Lead recovers from the task id,
  `task_base`, `task_branch`, `task_candidate`, records and evidence
  references, without the executor's session.
- Lead fetches the exact candidate, checks
  `git merge-base --is-ancestor <task-base> <task-candidate>`, reviews
  `git diff <task-base> <task-candidate>` and its evidence, and runs the
  required checks. A candidate that does not descend from its `task_base` is
  rejected before integration. Lead integrates by fast-forward or another
  ancestry-preserving merge, never a squash or cherry-pick that leaves the
  original candidate unreachable, and never by force-pushing a shared branch.
  Lead orders integration and resolves conflicts. A task branch adds
  durability and isolation, not authority: reservations, `requires` and
  `boundary_contract` still apply to parallel Workers.
- Integration is derived from Git (PACT-CANDIDATE). Explicitly resolve the
  configured authority_remote's exact `refs/heads/<gate-branch>` and obtain
  sufficient history under PACT-GIT; do not rely on a local remote-tracking ref
  or the clone's default fetch refspec. Proven ancestry from task_candidate to
  that observed remote tip means the candidate is reachable, so
  the task is integrated; no `integrated` field is stored. A mutating task
  moves to Done only after its exact candidate is reachable from the remote
  gate branch; until then it stays in the existing active, validating or
  handoff flow, and a rejected candidate keeps its branch for correction.

Ready pool and stalled roles:

- During a substantial gate, the Lead aims to keep `ready_pool_target`
  atomic tasks ready, without inventing work to fill the pool. Each ready task
  records its files, exact brief, validation, and relevant invariant tests
  with baseline evidence. Small or documentation tasks may use inspection
  instead, with the reason recorded.
- The Prime may preselect subsequent gates in `LOGIC-DRAFT.md` `## Next`,
  with scope, dependencies, and acceptance. They remain selections, not tasks;
  the Lead decomposes one only after the current gate is accepted and the
  Prime advances the selected draft. Keep a bounded `## History` summary or
  pointer when selections advance.
- A Lead stall permits the Prime to dispatch only already-ready pool tasks;
  results stay unintegrated for the Lead's review (a mutating result waits on
  its task branch), and cover grants no review,
  decomposition, or acceptance powers.
- `prime_stall_policy: ready-only` keeps a ready gate unmerged; during Prime
  absence the Lead may only plan a preselected `## Next` gate read-only in the
  existing cache. Absence or elapsed time never transfers default-branch
  authority; a `close-gate` policy requires explicit owner authorization,
  independent review, and all normal acceptance checks.
- [../agents/hooks/StallCover.md](../agents/hooks/StallCover.md) governs
  recovery. Do not dispatch or review the same task under two owners.

Parallel workers:

- Several `STATE.md` tasks may be active at once only when all of these hold:
  one Lead owns the set; each task is held by a distinct worker; the
  tasks' write `reservations` are pairwise disjoint; read claims do not reserve
  writes; no task in the set builds or
  runs tests.
- A task that builds or tests, or whose reservations overlap another active
  task, runs alone.
- Without a Lead, or in a second agent's scope, the single-task
  `STATE.md` mutex applies.

Conformance:

- PACT and SPARC conformance is mandatory in every role. The Lead puts
  the applicable PACT and SPARC rules into every worker brief.
- Every slice carries its task outcome and validation in `TASKS.md` or
  `STATE.md`. Include the daily log when a SPARC binding or project logging
  policy requires it. Update live SPARC contracts when accepted truth changes;
  otherwise record which contracts were verified and why no truth edit was
  needed. Do not manufacture contract edits or freshness stamps.
- The Prime reviews the gate by its records. A gate with stale or missing
  records is not accepted, regardless of test results.

### Validation scope and evidence reuse

Each selected acceptance check has a stable case-sensitive name and a
resolvable command/procedure, input scope and environment in the selected
LOGIC-DRAFT or its declared WORKFLOW evidence. A name such as `test-unit`
identifies a check, not permission to execute it. Names must be unique in the
required set; missing/ambiguous procedures block acceptance. Commands may differ
by environment while the selected semantic obligation remains the same.

Prime defines the complete required acceptance checks from selected scope,
changed contracts and risk before execution. Lead selects task checks within
that requirement. Classify the actual diff and its effects, not filenames
alone: documentation can change a behavioral contract, and a workflow/script
change can change execution. Keep explicit owner/project mandatory checks;
never reclassify a failure or weaken a test to obtain a pass.

- Product code, dependency, configuration, test/fixture or pin changes require
  their affected checks; a changed pin always runs its owning suite. Unknown
  impact requires the broader applicable checks.
- Documentation-only changes require appropriate structure, links, examples,
  contract consistency and migration-preservation checks. They do not by
  themselves require unrelated product builds or browser suites.
- Pure progress, acceptance or delivery records require diff/record hygiene,
  evidence resolution and candidate/answer/reachability checks. Confirm that
  no implementation, contract, test or execution setting changed. Every
  required check still needs valid evidence; record-only is not a blanket pass.

An earlier successful command result may satisfy a required check only when
the reviewer can verify its command, actual zero exit, tested revision,
relevant input scope and environment, and resolve its durable evidence. Prove
that all inputs consumed by that check remain unchanged at the candidate: code,
tests/fixtures, dependencies/lockfiles, build and test configuration, toolchain,
relevant runtime settings and external data. Equal Git revisions alone do not
prove equal environments or mutable external inputs. When the input scope is
unknown, compare the entire relevant tree and environment or run the check.

Changed inputs, missing or stale evidence, an unverified environment, a failed
or interrupted prior run, or an explicit requirement for a fresh run prevents
reuse. Record the earlier tested revision, current candidate, evidence pointer
and equivalence basis in existing validation records; do not relabel an old run
as a new execution. A later record-only commit does not invalidate a product
check by itself, but its own records and delivery ancestry must be checked.

Prime inspects the complete required evidence before acceptance. Where reuse
is not established, run every required acceptance command sequentially on
exactly the candidate under resource limits. Acceptance remains separate from
merge. Native hooks remain mandatory: this policy never authorizes bypassing
them. A host Git adapter may implement the same scope/equivalence rules under
its own authorized configuration; if it still mandates a full run, obey it and
report that limitation. No automatic pass cache, age threshold, reporting file
or service is required.

Work optimization:

Worker errors concentrate in subtle invariants inside large tasks, not in
bounded work. These rules keep invariants with the role that owns them;
measurement is an optional routing diagnostic.

- Test first: for a new or changed code invariant, before dispatch the
  Lead establishes failing tests that state it. A worker makes the
  given tests pass and never edits,
  weakens, skips, or conditions them. A test the worker doubts is reported to
  the Lead, not changed. Documentation, read-only research, and
  reversible low-impact edits use proportionate validation; do not write
  tests that merely repeat an edit. Ready briefs may point to uncommitted test
  fixtures; intentionally failing test-only commits are not green slices.
- Routing: Lead hires the specialty and capability needed for one bounded
  outcome. Design, code, research, documentation, and testing are valid Worker
  assignments. Split large outcomes, supply relevant existing evidence, and
  inspect overlapping code/reference material before choosing reuse or a new
  approach. Lead retains integration responsibility and reviews subtle hash/
  identity, cache, validation, determinism, conservation, and concurrency
  invariants; specialist delegation does not transfer that responsibility.
- Records before push: each outgoing slice's committed diff carries its task
  validation, required logs, and changed-or-verified SPARC contracts, with
  verified-UTC stamps on meaningfully changed records (see
  [../agents/skills/Time-Normalization.md](../agents/skills/Time-Normalization.md)).
  Stage intended paths explicitly; the `SliceRecordsCheck` hook owns the check.
- Pin rule: a pinned value is one that a test or contract fixes, such as a
  hash, golden output, snapshot, or schema constant. After any change to a
  pinned value, the suite that holds the pin runs before the slice is pushed.
  Before reporting a gate ready, the Lead supplies the required fast
  non-browser check evidence under Validation scope and evidence reuse. Fresh
  runs are sequential. Complete gate acceptance stays with Prime.
- Measurement: `worker_fix_target: none` disables correction-rate reporting;
  upgrades preserve an enabled 0%-100% target, which also governs reusable
  profiles. [../templates/tasks.tpl.md](../templates/tasks.tpl.md) owns the
  counting rules and the single gate aggregate Prime reviews. The target
  guides briefs and routing, never acceptance; actual failures, corrections,
  and validation remain task evidence when reporting is off.

Resources:

- Heavy work (builds, test suites, checks that need a running service) runs
  strictly one at a time, as `heavy_work` declares.
- Before heavy work, check free memory against `ram_threshold_gb` and state the
  measured value. If the host kills a run for low memory, do not restart it;
  report to the Prime.

Keep-alive:

- The shared host registry is generated from
  [../templates/keep-alive.tpl.md](../templates/keep-alive.tpl.md) one
  directory above sibling projects and stays locally excluded from Git; resolve
  an existing registry or pointer first and never split one host's port pool.
  The template owns registration fields and launcher rules.
- Services use registered ports and launchers that outlive the agent session;
  no ad-hoc verification ports. Preserve owner-running services: a down service
  may be started through its registered launcher when authorized, while stops
  and restarts require owner authorization. Validate edited launcher blocks with
  their declared shell/language parser without executing them; PowerShell
  parsing is the platform example, not a protocol dependency. `keep_alive_registry: none` opts out.

### Functions, Harnesses, And Wake Routing

Core rules:

- Lead is the sole Gate Handoff writer.
- Published handoff revisions are immutable.
- Prime answers through `PACT-Answers` commits.
- Candidate is exact; after it only PACT state records change.
- A gate closes when the accepted answer commit is reachable from remote
  `default_branch`.
- Workers -> Lead; Prime-level events -> Prime.
- Watchdog observes and wakes only.
- Capability never grants authority.

Authority roles are exactly Prime, Lead, and Worker: Prime owns the gate, Lead
owns the slice, and a Worker owns its task. Prime performs the Architect and
Inspector functions, Lead the Coordinator and Watchdog functions, a Worker the
Executor function. Performing a function never grants a role. Model identity,
capability tier, role, function, and harness are separate. A harness is an
execution environment that owns its own sessions, delegation, lifecycle,
messaging, or tool context; a native parent/child link does not define PACT
authority. Crossing a harness neither resets nor widens authority: boundary
contracts travel in durable task/STATE records, and every limit remains
inherited.

`harness_topology`:

- `single` (default): Lead keeps the Lead layer and performs the Watchdog
  function; Prime does not absorb Lead duties because only one harness exists.
  No cross-harness configuration is required.
- `multi`: Prime and Lead run in different harnesses. Lead reaches Prime only
  through the durable Gate Handoff, then a direct event when a reliable channel
  exists; the optional read-only `PrimeWatch` covers it otherwise or as
  fallback.

Wake routing is event-first with heartbeat fallback:

| Event | Route |
|---|---|
| Task completion, ambiguity, failure, or boundary-expansion request | Worker -> Lead |
| Anything inside Lead's inherited authority, including slice completion and validation | resolved by Lead; no Prime wake |
| Required scope expansion, boundary or acceptance-contract conflict, unresolvable architectural decision, or needed owner/Prime authorization | Lead -> Prime as `escalation` |
| Lead's gate execution complete with a validated candidate | Lead -> Prime as `ready` |
| Lead or its harness unavailable with actionable impact, with exact evidence | host or PrimeWatch -> Prime, once per incident |
| Prime decision or GateClose outcome | recorded by Prime in the artifact that owns it; delivery to Lead is only a pointer |

Workers never wake Prime, and Prime does not poll Workers. Heartbeats only
detect missed events; a tick that finds no new durable change wakes nobody.
Message delivery is not the source of truth: Lead publishes the Gate Handoff
revision (committed, and pushed in `multi`) before any Prime-facing wake, so a
missed wake loses nothing. Gate readiness is declared, never inferred: only
Lead's explicit `signal: ready` with a candidate declares it. Idle Workers,
empty TASKS/STATE, absent sessions, branch activity, or elapsed time never do.

Writers on the gate branch. Lead owns mutable execution state, writes the Gate
Handoff, integrates task candidates, and commits integration mechanics and
records on the gate; Workers write only their assigned task candidate branch
(see Task candidates).
Prime does not perform Lead execution-state maintenance. It never reorganizes
or moves tasks, edits Worker progress, manages reservations, rewrites Lead
execution state, writes the Gate Handoff, or edits product files. When
answering a Prime-facing revision, Prime writes only the minimum
authority-decision entry in the artifact that owns the decision. This is a
narrow writer exception, not shared ownership; Prime's only other writes are
StallCover's recorded cover transfer and, after delivery, its LOGIC-DRAFT
advance. PrimeWatch writes nothing. A published revision is never edited in
place; any material Prime-facing change is the next `seq`. Prime decisions are
recorded in the authoritative PACT artifact that owns the affected authority or
contract. [../templates/state.tpl.md](../templates/state.tpl.md) owns the Gate
Handoff fields, immutability detail, and decision destinations.

Both sides push without force and never merge or rebase blindly across an
unseen handoff; a rejected push means fetch, read, and re-evaluate. Prime
answers only the newest published revision, and in a shared working copy
Prime writes only a record file that holds no uncommitted Lead edits. Lead
reads and integrates Prime decision commits without altering their entries and
acts only on their durable records.

Answer marker and closure (PACT-ANSWER / PACT-CLOSURE). A Prime decision commit carries exactly one
canonical trailer in the commit message's final trailer/footer paragraph,
`PACT-Answers: <gate_id>#<seq>`, naming the gate and the
handoff revision it answers. The gate ID is the selected identifier and seq is
a positive decimal integer, without leading zeroes. Distinct answer commits
for the same key are conflicting and invalid; the same commit reached through
several ancestry paths is counted once. Exactly one canonical trailer and its
matching owning decision entry are required; author metadata never proves Prime
authority. An answer applies only to the newest publication at decision and
delivery time; a newer revision before delivery requires re-evaluation.
The trailer is the answer's identity; STATE,
TASKS and other records do not repeat it.
After an `accepted` answer, the Git graph is the delivery truth:

- answer commit not reachable from remote `default_branch`: delivery pending;
- answer commit reachable from remote `default_branch`: gate closed.

Both are derived; no delivery, completion or recovery record exists or is
needed to prove closure. The handoff `candidate` is exact: commits after it may
change only PACT state records under `/ai/pact/context/state/`. Lead does not
treat `accepted` as closure; the next gate starts only after closure and
Prime's advance of LOGIC-DRAFT.
[GateClose](../agents/hooks/GateClose.md) owns the acceptance and delivery
procedure, including answer-commit verification and delivery recovery.

Watchdog. Lead performs it for its Workers; LeadHeartbeat is its fallback. In
`multi`, the optional role-less PrimeWatch observes, classifies, and wakes
Prime, read-only and without authority; its capability is selected for the
observation, and a Watchdog may also be a non-model script.
[PrimeWatch](../agents/hooks/PrimeWatch.md) owns the observation algorithm and
the stable wake keys: handoff key `gate_id#seq`; delivery key
`gate_id#seq@candidate` while the accepted answer commit is not reachable from
remote `default_branch`; and one incident key per unavailability incident,
where observed recovery closes the incident. Delivered-key and open-incident
memory is host-owned bookkeeping, never PACT project truth. PACT requires no
database, queue, lock service, event bus, or daemon.

No timeout, silence, heartbeat, harness failure, or observer run transfers
authority; StallCover governs recovery from unavailable roles.

Heartbeats are host hooks registered in `## Hooks`: `PrimeHeartbeat` (rare
recovery fallback), `LeadHeartbeat` (Lead Watchdog fallback), and, in
`multi`, `PrimeWatch`. Their files own the prompts. A host installs schedules
only under the owner's scheduling authorization; report the actual binding
status, never infer an active timer from a Markdown row. `none` disables a
cadence. Routine heartbeats are quiet; report only milestones, failures, and
decisions.

## Hooks

| Hook | Class | File | Trigger | Scripts | Status |
|---|---|---|---|---|---|
| PrimeHeartbeat | host_hook | [../agents/hooks/PrimeHeartbeat.md](../agents/hooks/PrimeHeartbeat.md) | every `heartbeat_prime` as recovery fallback, when scheduled | None | unconfigured |
| LeadHeartbeat | host_hook | [../agents/hooks/LeadHeartbeat.md](../agents/hooks/LeadHeartbeat.md) | every `heartbeat_lead` as Lead Watchdog fallback, when scheduled | None | unconfigured |
| PrimeWatch | host_hook | [../agents/hooks/PrimeWatch.md](../agents/hooks/PrimeWatch.md) | every `heartbeat_watch` in `multi` topology, when scheduled | None | unconfigured |
| SliceRecordsCheck | pact_hook | [../agents/hooks/SliceRecordsCheck.md](../agents/hooks/SliceRecordsCheck.md) | before committing or pushing a slice | None | manual |
| GateClose | pact_hook | [../agents/hooks/GateClose.md](../agents/hooks/GateClose.md) | unanswered `ready` handoff (acceptance path), or an `accepted` answer not yet reachable from `default_branch` (delivery-recovery path) | None | manual |
| StallCover | pact_hook | [../agents/hooks/StallCover.md](../agents/hooks/StallCover.md) | a recorded execution tier stalls | None | manual |

`Class` is `pact_hook` (Markdown workflow extension point owned by PACT) or
`host_hook` (a hook owned by the agent host, IDE, or runtime). Host hooks are
governed by the host; register them here for visibility only. When a host hook
and a PACT hook share a trigger, expose the overlap here rather than assuming
one wins.

For a bound host hook, record its configuration/script path and verified
runtime status. Keep required checks explicit when a host cannot enforce them.
Automatic post-commit pushing must never outrun `SliceRecordsCheck` or
`GateClose`. Register only integrations that are actually installed.

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

The latest cache run remains until the next session refresh while its task is
active or unaccepted; for an accepted mutating task the task-level cleanup
point below takes precedence over session retention. A new session
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
reason and review point. When relocating retained cache, coordinate the move
with updates to every active STATE/handoff/cache pointer. Verify references
at the resolved destination before removing the original run or resuming work;
never delete a run still required by those records.

Task-level cleanup point: once an accepted mutating task's candidate is
reachable from the remote gate branch, inspect its task-local cache, promote
what must survive by the rules above, repair durable pointers, and then, in
the Cleanup GC order, delete the disposable rest (tmp, chunks, temporary RAG
indexes, retrieval notes, transformed copies, sandbox outputs, local
validation dumps). Do not keep
cache just because it exists or because no new session has started.

Any evidence required by a later authority that may run in another harness
MUST be promoted to a durable reference resolvable by that authority before
task-local cleanup. Such a reference may be a repository path, Git revision,
approved project log, shared `/ai/raw`, durable remote artifact, URL, or host
artifact/run reference that authority resolves; PACT defines no transport for
it. Retained cache serves same-host recovery, local optimization, or evidence
awaiting promotion; it is not a cross-harness handoff, and another harness
may rely on it only through a durable shared reference. Material that stays
retained records its reason, for example
`reason: required-for-gate-acceptance`, and a bounded review point such as
`review_point: gate-close`. At gate close,
remaining gate-retained cache is reviewed and then promoted or deleted.

Runtime cache never enters Git: `/ai/pact/cache/runs/` and
`/ai/pact/cache/retained/` stay excluded, while `ai/pact/cache/.gitkeep` and
the cache-run template stay tracked; do not ignore all of `/ai/pact/cache/`.
A portable installation SHOULD use tracked `.gitignore` entries for these
paths when project policy permits, because they travel with the repository.
Use clone-local `.git/info/exclude` only when owner or project policy forbids
changing tracked ignore rules; every participating clone or harness then
establishes that exclusion itself.

## Cleanup

Move completed work to Done, clear `STATE.md`, release reservations, record
validation, and keep or supersede `LOGIC-DRAFT.md` according to the next
selected draft. Keep the latest cache until the next session refresh unless
the task-level cleanup point applies, promote
durable cache material, then delete or explicitly retain superseded cache
runs. To abandon a draft, resolve active state and cancel or complete pending
tasks before marking `LOGIC-DRAFT.md` superseded.

Durability order. Lower-level candidate resources may be removed only after
the exact accepted candidate is reachable from the durable higher-level branch.

```txt
task candidate  -> reachable from ->  gate branch  -> reachable from ->  default branch
```

An accepted lower-level candidate may be garbage-collected only after it
becomes reachable from the durable branch owned by the next authority level.
The levels are Worker candidate -> Lead gate and Lead gate -> Prime default
branch.

GC occurs only after durable records no longer depend on the resource being
collected. A resource that meets these conditions is eligible for cleanup, not
required to be deleted; actual deletion follows project or host retention
policy.

- Task level, GC order for a mutating task: fetch; verify the exact
  `task_candidate` is reachable from the remote gate branch; promote all
  evidence and material that must survive; repair durable references and
  pointers; record the task Done with its candidate and validation; clear or
  update STATE and release reservations; commit and push those records to the
  gate; verify the remote gate contains them; only then delete task cache,
  worktree and task branch, never before. A crash resumes at the first
  unfinished step without re-integrating; a copied commit (squash,
  cherry-pick) never proves reachability.
- Gate level: after closure is proven (the accepted answer commit is reachable
  from remote `default_branch`), cleanup may remove the remote gate branch,
  the local gate branch or worktree, remaining gate-retained cache, task
  branches of that gate whose candidates are reachable from remote
  `default_branch`, and gate-only temporaries; never while the answer is
  unreachable.

To start the next draft after completed work, preserve the completed cycle's
summary and validation evidence, then replace `LOGIC-DRAFT.md`, reset
`TASKS.md`, and transfer at most one new task into `STATE.md`, or a set of
parallel worker tasks that satisfies the Execution Hierarchy parallel-worker
rule.

Related:

- [../agents/AGENTS.md](../agents/AGENTS.md)
- [../context/IDEAS.md](../context/IDEAS.md)
- [../context/state/STATE.md](../context/state/STATE.md)
