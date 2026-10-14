# workflow.tpl.md

## META

name: workflow.tpl.md
type: pact maintenance template
for: WORKFLOW.md
updated: 2026-10-14 20:40:58 UTC+00:00
version: 3.3

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
- define standalone owner command aliases with surrounding-whitespace tolerance,
  status-only reporting, and handoff preserving full task/cache references;
- define startup, ideas gate, shape gate, draft gate, task creation, task
  transfer, state modes, hooks, validation, completion, and recovery;
- require tasks to derive from `LOGIC-DRAFT.md`, not directly from `IDEAS.md`;
- define valid `STATE.md` top-level statuses;
- define valid `LOGIC-DRAFT.md` and `TASKS.md` statuses or link to their
  state files;
- define the decomposition contract from selected `LOGIC-DRAFT.md` content to
  atomic, verifiable `TASKS.md` entries and one active `STATE.md` task, or
  several active tasks only under the parallel-worker rule of the Execution
  Hierarchy;
- contain a required `## Execution Hierarchy` section that defines the three
  roles (Prime, Lead, Worker), the declared hierarchy fields with
  overridable defaults, the gate and slice model, mandatory PACT and SPARC
  conformance in every role, the parallel-worker rule, resource discipline, and
  the keep-alive rule;
- register portable heartbeat prompt contracts as `host_hook` rows, with actual
  host activation status instead of assuming a configured timer;
- define, inside the `## Execution Hierarchy` section, a "Work optimization"
  subsection with test first, routing, records before push, pin rule, and
  optional measurement; declare `worker_fix_target: none` by default, preserve
  enabled project values during upgrades, and register the `SliceRecordsCheck`
  hook (`pact_hook`) in the `## Hooks` table;
- define how active task `task_phase` maps to `STATE.md` status;
- define cleanup, draft abandonment, next draft cycle start, and valid state
  combinations;
- define task-run cache naming, session refresh, comparison, distillation,
  input-basis references, promotion, retention, and deletion rules;
- require tasks to derive from `LOGIC-DRAFT.md`, not directly from shapes;
- register hooks and script usage in `WORKFLOW.md`, recording each hook's
  class (`pact_hook` or `host_hook`);
- define the skill log gate: skill update entries require SPARC
  `runtime_mode: debug` and a skill log artifact declared in `WORKFLOW.md`;
- define the skill update entry format and forbid automatic skill log
  creation;
- define the optional file guard: an opt-in allowed-operations ledger declared
  by a `file_guard` line, with modes `strict`, `warn`, `off`, precedence
  owner > guard > `STATE.md` reservations, and no automatic creation;
- keep invariant PACT files discoverable with relative Markdown links;
- define when project-truth changes must pass through SPARC;
- route behavior, structure, schema/data shape, design, platform, and accepted
  change-history changes through responsible SPARC live contracts and
  governing templates;
- keep PACT maintenance rules inside `/ai/pact`; the shared host-local
  `KEEP-ALIVE.md` is the explicit external operational target.

`WORKFLOW.md` must not:

- define project business logic;
- invent SPARC docs structure;
- put PACT state into `/ai/docs`;
- treat cache as source of truth;
- replace `AGENTS.md`, `TASKS.md`, or `STATE.md`.

The Execution Hierarchy must also:

- separate roles from model tiers `High`, `Middle`, and `Light` and concrete
  provider/model bindings; Prime architecture and inspection share the High
  tier even when bound to different models;
- express requested effort as 0%-100%, recording the provider-specific mapping
  and any unsupported control without implying equal compute across providers;
- let Lead hire bounded specialist Workers (for example design or coding) and
  choose their tier and effort from the task, within owner constraints;
- declare Prime ownership of the selected draft and acceptance,
  Lead ownership of tasks/state, and bounded worker execution;
- require a parent-issued boundary contract and explicit role/parent/tier context
  before every spawn; preserve inherited restrictions and child autonomy, with
  parent approval for widening and no new role or boundary-file type;
- keep exactly three authority roles (Prime owns the gate, Lead the slice,
  Worker the task) and define operational functions (Architect, Inspector,
  Coordinator, Watchdog, Executor) as work an actor performs, never as roles;
  model identity, capability tier, role, function, and harness stay separate;
- support `single` and `multi` harness topologies without changing authority:
  Lead keeps the Lead layer and its Workers' Watchdog function in either
  topology; runtime parenthood and harness membership confer no authority, and
  inherited boundaries continue across a harness boundary;
- route wakes event-first with heartbeat fallback: Workers report to Lead,
  Lead resolves what its authority allows and wakes Prime only for Prime-level
  events; Prime does not poll Workers;
- record every Prime-facing Lead signal durably in STATE's `## Gate Handoff`
  before notification; message delivery is not the source of truth;
- make each published handoff revision (`gate_id` + `seq`) immutable, with
  Lead as its only writer and owner of mutable execution state; Prime writes
  only a narrow authority-decision entry in the artifact that owns the decision,
  through record-only, non-force commits with a `PACT-Answers` trailer, and
  never answers a superseded revision;
- at gate close, commit the durable acceptance answer on the gate branch
  before verifying the delivery tip and fast-forwarding the default branch,
  and keep decision separate from delivery: an `accepted` answer stays
  recoverable Prime work until its commit is reachable from the default branch;
- require Lead's explicit `ready` signal with an identified candidate for gate
  readiness, never inferred from idle Workers, empty records, or time; the
  delivered tip may differ from the accepted candidate only in PACT state records;
- select capability for the assignment and authority by the role/function
  contract, treating tier fields as default routing hints, never role classes;
- allow an optional role-less Prime-side Watchdog (`PrimeWatch`) that only
  observes, classifies, and wakes Prime once per handoff key or incident key;
- support optional Prime-preselected next gates and a ready task pool
  without requiring invented work, tests, or selected gates; while Prime is
  unavailable, limit Next planning to read-only inspection and existing cache
  notes until the current gate is accepted and Prime advances the draft;
- define `prime_stall_policy`, bounded pool-only coverage, and recovery
  through `StallCover`; absence alone never transfers merge authority;
- inspect every required acceptance result for the accepted revision via
  `GateClose`, then perform any authorized merge as a separate action;
- validate each outgoing commit's records, permitting documented
  verification when an existing SPARC contract remains unchanged;
- resolve the shared parent-level `KEEP-ALIVE.md` or its explicit pointer
  before service work; use `keep-alive.tpl.md` for its external target;
- provide a compact Resume section using existing draft/state/tasks/cache
  rather than requiring a separate handoff artifact.

## EXAMPLE

````md
# WORKFLOW.md

## META

name: WORKFLOW.md
canonical_location: /ai/pact/workflow/WORKFLOW.md
layer: PACT / workflow
status: canonical
generated_from: /ai/pact/templates/workflow.tpl.md
generated_from_version: 3.3
content_status: current-data
purpose: Define how agents maintain project work without bypassing SPARC project truth.
updated: YYYY-MM-DD HH:mm:ss UTC+00:00

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
reason validation was not possible, then remove it from `STATE.md`. `STATE.md`
returns to `clear` when no active task remains.

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
gate_branch_pattern: gate/<id>
keep_alive_registry: ../KEEP-ALIVE.md
heavy_work: sequential
ram_threshold_gb: 5
worker_fix_target: none
ready_pool_target: 2-4
prime_stall_policy: ready-only
```

Roles and model tiers are separate. The capability tiers are
`Light < Middle < High`; their names are exactly `Light`, `Middle`, and
`High`. They express the capability required for the assignment, not a vendor
or model identity. Concrete provider/model bindings are local configuration;
preserve the owner's explicit bindings and configured host model. A missing
capability must be reported with an explicit fallback, never silently lowered.

Capability is selected for the assignment; authority is selected by the
role/function contract. Neither determines the other. `lead_tier` and
`worker_tier_default` are default routing hints, not role classifications:
an actual Lead, Worker, or Watchdog assignment may use Light, Middle, or High
(a Watchdog may also be a non-model script) when that capability is adequate
for the work and owner/provider/model constraints permit it. A simple Lead
coordinating a few trivial tasks may be Light; subtle cross-cutting integration
may need Middle or High; a Worker may be High for one hard bounded task. A
higher tier never adds authority, and a lower tier never removes authority the
role already grants. `prime_tier: High` is the required capability for Prime's
Architect and Inspector assignments, not a source of authority.

Prime has two functions: Architect selects scope and acceptance criteria;
Inspector checks the candidate and acceptance evidence. Both use the same
`prime_tier: High`. They may use the same model or different models, with
separate local bindings when useful. Their effort percentages may differ;
`prime_effort` supplies the default. Sharing a model does not waive inspection:
review the candidate against the recorded criteria in a distinct review pass.
If independent review is required, assign a separate reviewer/context; do not
label self-review independent. Neither function creates another management
level or requires two permanently running agents. Only Prime holds gate
acceptance authority.

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
| Prime | as Architect selects the shape and `LOGIC-DRAFT.md`; as Inspector reviews the candidate, gate validation, and PACT/SPARC records; runs the full acceptance suite; fast-forwards `gate/<id>` into `default_branch`; closes the gate | write product code; micromanage slices |
| Lead | decomposes the selected draft into atomic `TASKS.md` entries; transfers tasks into `STATE.md`; writes self-contained worker briefs; performs the Watchdog function for its Workers; reviews every worker diff; checks PACT and SPARC conformance; may fix worker errors; prepares the records; commits and pushes validated slices to `gate/<id>` when authorized; publishes `ready` or `escalation` in the Gate Handoff | run the full acceptance suite; wake Prime for routine Worker or slice events; push or merge `default_branch`; force-push; skip hooks; deploy |
| Worker | performs one bounded task using its assigned specialty; returns changes or findings and validation evidence to Lead | write to version control; widen scope; guess when the brief is ambiguous; wake Prime |

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

Gate and slice:

- A gate is one selected `LOGIC-DRAFT.md` cycle, from selection to acceptance.
- A slice is a coherent, validated commit that carries its own records. Each
  slice stands on its own: it is complete, tested, and pushed to
  `gate_branch_pattern`.
- The Lead creates `gate/<id>` from `default_branch` on the first slice
  and fetches before each slice to read new commits from the owner or other
  agents. If `default_branch` moves, the Lead merges it into the gate
  branch instead of rewriting pushed history.
- The Prime closes the gate by fast-forwarding `default_branch` to the
  verified gate tip after the full acceptance suite passes, the records are
  reviewed, and the durable acceptance answer is committed on the gate branch,
  in the order of the `GateClose` hook. Read every required command's exit
  status against the revision being accepted, the handoff `candidate`:
  missing, failed, killed, or timed-out checks prevent closure. A final
  successful command does not erase an earlier failure. The delivered tip may
  differ from that candidate only in PACT state and decision records, including
  the acceptance answer (see Candidate identity and Gate close order). Merging is a separate action after the results have been
  inspected. Among agents, only the Prime writes to `default_branch`; the
  owner may commit directly, and agents fetch and read those commits.
- Design questions the owner has delegated are decided by the Lead and
  recorded in the project's decision log; they do not block the gate.

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
- A Lead stall permits the Prime to dispatch only already-ready pool
  tasks. Results remain uncommitted for the Lead's review on return;
  cover does not grant code review, new decomposition, or acceptance powers.
  If the pool is empty, wait. Record coverage and transfer ownership once.
  Across harnesses, cover also requires that covered results stay reachable
  for the Lead's review without an unauthorized Git write; otherwise wait.
- `prime_stall_policy: ready-only` keeps a ready gate unmerged. The
  Lead may inspect existing evidence for a Prime-preselected `## Next` gate
  read-only and record planning/dependency notes in the existing cache. It must
  not activate or decompose that gate, dispatch its Workers, replace the current
  LOGIC-DRAFT/TASKS/STATE, or change the ready candidate. Execution waits for
  current-gate acceptance and Prime advancement; an empty Next supplies no new
  gate to plan. Absence or elapsed time never transfers default-branch authority.
  A `close-gate` policy requires explicit owner authorization of the acceptance-
  role transfer, independent review, and all normal acceptance checks.
- [../agents/hooks/StallCover.md](../agents/hooks/StallCover.md) governs
  recovery. Do not dispatch or review the same task under two owners.

Parallel workers:

- Several `STATE.md` tasks may be active at once only when all of these hold:
  one Lead owns the set; each task is held by a distinct worker; the
  tasks' `reservations` are pairwise disjoint; no task in the set builds or
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
- Records before push: inspect each outgoing slice's committed diff, not a
  possibly empty or unrelated staging area. It carries task validation,
  required logs, and changed-or-verified SPARC contracts as above, with
  verified-UTC stamps on meaningfully changed records (see
  [../agents/skills/Time-Normalization.md](../agents/skills/Time-Normalization.md)).
  A slice without them is not pushed. Stage intended paths explicitly, without
  sweeping unrelated state or cache into the commit. The `SliceRecordsCheck`
  hook defines this check; automation must be bound and verified separately.
- Pin rule: a pinned value is one that a test or contract fixes, such as a
  hash, golden output, snapshot, or schema constant. After any change to a
  pinned value, the suite that holds the pin runs before the slice is pushed.
  Before reporting a gate ready, the Lead runs the project's fast
  non-browser suites, sequentially. The full acceptance suite stays with the
  Prime.
- Measurement: `worker_fix_target: none` disables correction-rate reporting.
  A project may enable a numeric target from 0% to 100%; upgrades preserve an
  existing enabled value. This policy also governs measurement instructions in
  reusable profiles: `none` imposes no counting or metric-reporting requirement;
  enabled profile reporting follows this WORKFLOW policy. Count each reviewed
  Worker task ID once per gate when enabled.
  Count a correction only when returned work needed a material change to meet
  its original bounded brief. Retries do not add counts; exclude cosmetic edits,
  integration work, and changes to the requested scope. When enabled, the Lead
  records one gate aggregate at readiness in existing TASKS, or in a required
  daily log with a TASKS pointer: reviewed task count, materially corrected task
  count, and a rate only when the denominator is nonzero. Prime reviews the same
  aggregate at acceptance; no duplicate report is required. Use the target to
  improve briefs and routing, never as an acceptance gate. Actual failures,
  corrections, and validation remain part of task evidence when reporting is off.

Resources:

- Heavy work (builds, test suites, checks that need a running service) runs
  strictly one at a time, as `heavy_work` declares.
- Before heavy work, check free memory against `ram_threshold_gb` and state the
  measured value. If the host kills a run for low memory, do not restart it;
  report to the Prime.

Keep-alive:

- Generate the shared `KEEP-ALIVE.md` from
  [../templates/keep-alive.tpl.md](../templates/keep-alive.tpl.md), outside the
  working project, one directory above sibling projects. Resolve an existing
  registry or explicit shared pointer before creating one; never split one
  host's port pool into independent project copies. The template stays inside
  PACT; the host registry remains locally excluded from Git.
- Register the `dev-*` alias, project path, raw launch command, unique ports,
  startup dependencies, profile function, and validation before first start.
  Services use registered ports and a host-owned long-lived process or window
  that survives the agent session. Do not start ad-hoc verification ports.
- Preserve owner-running services. A down service may be started through its
  registered launcher when authorized; stopping or restarting an owner process
  requires owner authorization. Do not expose an interactive window unless
  the owner requests one. Validate edited PowerShell blocks without executing
  them.
- When `keep_alive_registry` is `none`, no registry rule applies.

### Functions, Harnesses, And Wake Routing

Core rules, detailed below:

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
owns the slice, and a Worker owns its task. An operational function is work an
actor performs: Prime performs Architect and Inspector, Lead performs
Coordinator and the Watchdog function for its Workers, and a Worker performs
Executor in its specialty. Performing a function never grants a role. Model
identity, capability tier, role, function, and harness are separate; concrete
provider/model names are local bindings only.

A harness is an execution environment that owns its own agent sessions,
delegation primitives, lifecycle, messaging, or tool context. A PACT parent may
live in another harness than its child, and a native parent/child link does not
define PACT authority. Crossing a harness boundary neither resets nor widens
authority: the parent's boundary_contract travels in the durable task/STATE
records, not in chat history or a native spawn, and remains inherited.

`harness_topology` declares the deployment:

- `single` (default): one harness holds Prime, Lead, and Workers. Lead keeps
  the Lead layer and performs the Watchdog function; Prime does not absorb Lead
  duties because only one harness exists. Consolidating roles into one session
  follows the sequential-role rule above and keeps each role's boundaries.
  No cross-harness configuration is required.
- `multi`: Prime and Lead run in different harnesses. Lead and its Workers
  coordinate natively inside the Lead harness. Lead reaches Prime only through
  the durable Gate Handoff, then a direct event when a reliable channel exists;
  the optional `PrimeWatch` observer covers the handoff when no such channel
  exists, or as fallback.

Wake routing is event-first with heartbeat fallback:

| Event | Route |
|---|---|
| Task completion, ambiguity, failure, or boundary-expansion request | Worker -> Lead |
| Anything inside Lead's inherited authority, including slice completion and validation | resolved by Lead; no Prime wake |
| Required scope expansion, boundary or acceptance-contract conflict, unresolvable architectural decision, or needed owner/Prime authorization | Lead -> Prime as `escalation` |
| Lead's gate execution complete with a validated candidate | Lead -> Prime as `ready` |
| Lead or its harness unavailable with actionable impact, with exact evidence | host or PrimeWatch -> Prime, once per incident |
| Prime decision or GateClose outcome | recorded by Prime in the artifact that owns it; delivery to Lead is only a pointer |

Workers never wake Prime, Prime does not poll Workers, and routine Worker or
slice events stay with Lead. Native completion and message mechanisms are the
primary wake path when reliable; heartbeats detect missed events. A tick that
finds no new durable change wakes nobody.

Message delivery is not the source of truth. Wake events, chat or harness
messages, and scheduler signals only deliver attention; the durable PACT
records are canonical. Before any Prime-facing wake, Lead publishes a handoff
revision in STATE's `## Gate Handoff`: committed to the gate branch and, in
`multi`, pushed there (or to another declared location both harnesses read)
before notification. A missed wake loses no truth: a later Prime, Lead, or
observer reconstructs pending attention from these records.

Gate readiness is declared, never inferred. A finished Worker is not a task
accepted by Lead; all Workers finished is not a validated slice; committed
slices are not completed gate execution; all known slices finished is not an
accepted gate; a ready candidate is not an accepted gate. Only Lead's explicit
`signal: ready` with an identified candidate declares readiness. Idle Workers,
empty TASKS/STATE, absent sessions, branch activity, or elapsed time never do.
Only Prime accepts the gate, through GateClose.

Writers on the gate branch, in either topology:

- Lead owns mutable execution state. Lead decomposes, transfers tasks,
  updates task progress, manages reservations, records Worker results, edits
  normal TASKS/STATE execution content, writes the Gate Handoff, and commits
  product changes. Workers write nothing to version control.
- Prime does not perform Lead execution-state maintenance. It never
  reorganizes or moves tasks, edits Worker progress, manages reservations,
  rewrites Lead execution state, writes the Gate Handoff, or edits product
  files. When answering a Prime-facing handoff, Prime may write only the
  minimum authority-decision entry into the artifact that owns the decision
  (below). This is a narrow writer exception, not shared ownership. The other
  exceptions are StallCover's recorded cover transfer while Lead is
  unavailable and, after delivery, Prime's LOGIC-DRAFT advance on
  `default_branch`. PrimeWatch writes nothing.

Handoff revisions are immutable. `gate_id` + `seq` identifies one published
Prime-facing handoff revision; published means committed to the gate branch,
and in `multi` pushed. A published revision is never edited in place. Any
material change to its Prime-facing payload (`signal`, `candidate`,
`escalation`, `blockers`, `validation`, `records`, `slices`, or any value that
could alter Prime's decision) is published as a new revision with the next
`seq`. Non-semantic differences, such as a timestamp, formatting, or a
re-read of the same pointer, create no revision and are not edited into a
published one. Unpublished local drafts may change freely.

Prime decisions are recorded in the authoritative PACT artifact that owns the
affected authority or contract; the commit's `PACT-Answers` trailer names the
answered key:

- boundary widening for a Lead or Worker task: one authority-decision entry
  appended to that task's `boundary_contract` in TASKS or STATE, touching no
  other field; LOGIC-DRAFT stays unchanged;
- gate scope, acceptance criteria, selected logic, or a gate-owned
  architectural decision: LOGIC-DRAFT;
- acceptance outcome: GateClose evidence and a LOGIC-DRAFT `## Acceptance`
  entry with `decision`, `candidate`, and evidence;
- a decision needing owner authorization: obtained from the owner, then
  recorded where the authorized change is owned.

Prime answers only the newest published revision; a superseded `seq` is never
answered. A Prime decision commit changes only PACT state records
(`/ai/pact/context/state/`), carries the trailer
`PACT-Answers: <gate_id>#<seq>`, and is based on a freshly fetched gate-branch
tip whose newest handoff is that `seq`. Push it without force. A rejected push
means the other harness moved: fetch, read every new commit, and re-evaluate,
answering the newest revision on the new tip; never merge or rebase blindly
across an unseen handoff. In a shared working copy, Prime writes only a record
file that holds no uncommitted Lead edits. Lead fetches before every commit,
push, or handoff publication, reads and integrates Prime decision commits
without altering their entries, pushes without force, and on rejection
fetches, reads, integrates, and re-checks any unpublished revision. Lead acts
on a decision only from its durable record; a message only points to it.

Candidate identity: the handoff `candidate` is the exact implementation
revision Lead validated and Prime's acceptance checks run on. Commits after it
may change only PACT state and decision records under
`/ai/pact/context/state/`. Before delivery, Prime proves with
`git diff --name-only <candidate> <delivery-tip>` that only those records
differ, and records both revisions. Any implementation, configuration, runtime,
or product change after `candidate` invalidates readiness; Lead must publish a
new candidate. The delivered tip is the accepted candidate plus allowed record
commits plus the durable acceptance answer.

Gate close order: durable decision precedes delivery. Prime fetches and
confirms the newest unanswered `ready` revision; runs every acceptance check on
exactly `candidate`; inspects all results; decides; records the decision in a
record-only `PACT-Answers` commit pushed to the gate branch without force; fetches again and verifies that no newer handoff
revision exists, that the tip descends from `candidate`, and that the path diff
is records-only; then fast-forwards `default_branch` exactly to that verified
tip; and verifies that the remote `default_branch` now contains the answer
commit. A not-accepted decision is committed and pushed the same way before
Lead is notified, and nothing merges. If a newer
handoff appears before the fast-forward, the earlier answer does not close the
gate: reread and re-evaluate. Never merge then record the answer later.

Accepted is not delivered. The decision (`accepted` or `not-accepted`) is
recorded; delivery is derived from Git: the gate is closed only when the
accepted answer commit is reachable from the remote `default_branch`. An
`accepted` answer whose commit is not yet reachable is a pending delivery, so
durable state distinguishes accepted-but-undelivered from closed after any
crash or restart. `PACT-Answers` alone never proves closure. Lead does not
treat `accepted` as closure, and the next gate starts only after closure and
Prime's advance of LOGIC-DRAFT. Recovery of a pending delivery follows
GateClose without rerunning acceptance when candidate, evidence, and branches
are unchanged.

Watchdog function:

- Lead Watchdog, in either topology: under its own Lead authority, Lead
  observes active Workers, processes completions, notices blocked Workers,
  maintains the ready pool, reviews returned work, decides what remains in the
  slice, and escalates beyond its authority. `LeadHeartbeat` is its fallback
  when native completion events are missing or unreliable.
- Prime-side observer, `multi` only and optional: a role-less, read-only
  executor of `PrimeWatch`. Its capability is selected for the observation: a
  deterministic script or Light model for mechanical state checks, Middle or
  High to interpret ambiguous failures, stale evidence, or complex recovery
  conditions. Its contract stays observe, classify, and wake at any capability.
  It reads only the minimal records for the current gate and wakes Prime
  through an authorized host channel for the newest unanswered handoff key, a
  pending delivery, or a new unavailability incident; otherwise it stays
  silent. It holds no Prime, Lead, or Worker authority and
  inherits none. It never selects or changes a gate, decomposes, creates or
  dispatches tasks, reviews or integrates work, edits code or records, changes
  boundaries, accepts slices or gates, or writes any branch.

Duplicate wakes are avoided by stable keys, not by new machinery:

- Handoff key: `gate_id#seq` of the newest published revision with `signal`
  `ready` or `escalation`. It is answered once a gate-branch commit carries
  `PACT-Answers` for it; answered or superseded keys never wake Prime for the
  handoff itself.
- Delivery key: `gate_id#seq@candidate` while that `accepted` answer commit
  is not reachable from remote `default_branch`. It wakes Prime for delivery
  recovery even though `PACT-Answers` exists, once per key; reachability ends
  it.
- Incident key, for unavailability: `gate_id`, the affected role and its
  actor/harness/session identity, the failure kind, and an incident id (the
  host's error or session id, or the first observation that opened the
  incident). Repeated observations of one open incident wake Prime at most
  once until its kind or impact materially changes; changing timestamps or
  liveness details do not. Observed recovery closes the incident, and a later
  failure opens a new incident and a new wake.

Delivered-key and open-incident memory is host-owned bookkeeping (scheduler
state or a host-local file), never PACT project truth. It is updated only
after successful delivery; if it is lost, at most one repeated wake occurs and
Prime finds the key answered or in progress in the records. When a direct
event and an observer both deliver, the host shares one memory. PACT requires
no database, queue, lock service, event bus, or daemon.

No timeout, silence, heartbeat, harness failure, or observer run transfers
authority; StallCover governs recovery from unavailable roles.

Heartbeats:

- Heartbeats are host hooks registered in `## Hooks` as `host_hook` rows:
  `PrimeHeartbeat` at `heartbeat_prime`, `LeadHeartbeat` at `heartbeat_lead`,
  and, in `multi`, `PrimeWatch` at `heartbeat_watch`. Portable prompt
  contracts live in the linked hook files; a host installs schedules only
  under the owner's scheduling authorization. Report the actual binding
  status, never infer an active timer from a Markdown row. `none` disables a
  cadence.
- The Prime heartbeat is a rare recovery fallback for missed wakes and
  unavailable observers. It reads the durable Gate Handoff and availability
  evidence, acts only on the newest unanswered handoff key, a pending delivery
  of an accepted gate, or a new incident, and does not review slices or poll
  Workers.
- The Lead heartbeat is the fallback of Lead's Watchdog function: Worker
  completions and blocks, the ready pool, slice validation and records, new
  Prime decision commits, and resource evidence. It records status in STATE
  and does not relay routine status to Prime.
- Routine heartbeats are quiet. Report to the owner only milestones, failures,
  and decisions.

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

The latest cache run remains until the next session refresh. A new session
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

## Cleanup

Move completed work to Done, clear `STATE.md`, release reservations, record
validation, and keep or supersede `LOGIC-DRAFT.md` according to the next
selected draft. Keep the latest cache until the next session refresh, promote
durable cache material, then delete or explicitly retain superseded cache
runs. To abandon a draft, resolve active state and cancel or complete pending
tasks before marking `LOGIC-DRAFT.md` superseded.

To start the next draft after completed work, preserve the completed cycle's
summary and validation evidence, then replace `LOGIC-DRAFT.md`, reset
`TASKS.md`, and transfer at most one new task into `STATE.md`, or a set of
parallel worker tasks that satisfies the Execution Hierarchy parallel-worker
rule.

Related:

- [../agents/AGENTS.md](../agents/AGENTS.md)
- [../context/IDEAS.md](../context/IDEAS.md)
- [../context/state/STATE.md](../context/state/STATE.md)
````
