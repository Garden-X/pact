# 2026-10-26-Pact-Runtime-Spec-Delta.shape.md

## META

name: Pact-Runtime-Spec-Delta
canonical_location: /ai/pact/context/shapes/2026-10-26-Pact-Runtime-Spec-Delta.shape.md
layer: PACT / shape
status: draft
generated_from: /ai/pact/templates/shape.tpl.md
generated_from_version: 1.0
content_status: current-data
updated: 2026-10-26 00:20:41 UTC+00:00


## QUESTION

What is the minimum PACT specification delta that lets two independent
runtime implementations, given the same repository, derive the same authority,
the same lease, the same state transitions and the same conformance verdicts?

Scope: specification only. This shape adds no runtime code, creates no
runtime repository and edits no template. Language, storage engine, Git
library, transport and platform services stay outside PACT.

## CONTEXT

Sources: this repository at `main` `7aec582`; the owner-accepted architecture
baseline "PACT Runtime — architecture baseline v1" (2026-10-26, held by the
owner outside this repository); existing PACT 2.0 semantics. No idea entry
informed this shape: [../IDEAS.md](../IDEAS.md) is empty.

Current contracts this shape builds on:

- [WORKFLOW](../../workflow/WORKFLOW.md) Runtime requirements and host
  adapters: `requires` is host-resolved and grants nothing; adapters narrow
  and never widen; PACT defines no transport, sandbox or provider schema; no
  capability registry exists.
- WORKFLOW Roles, Artifact ownership, Writers on the gate branch, Spawn
  Boundaries (six fields, inherited limits, parent-approved widening).
- WORKFLOW Task candidates, Answer marker and closure, Validation scope and
  evidence reuse; [GateClose](../../agents/hooks/GateClose.md) and
  [PrimeWatch](../../agents/hooks/PrimeWatch.md) keys.
- [state.tpl.md](../../templates/state.tpl.md) active object, reservations
  (`path`, `mode`), task coordinates, Gate Handoff immutability;
  [tasks.tpl.md](../../templates/tasks.tpl.md) readiness and transfer;
  [logic-draft.tpl.md](../../templates/logic-draft.tpl.md) Acceptance entries.
- [PACT.md](../../PACT.md) valid state combinations, Target META Blocks,
  File Guard; [file-guard.tpl.md](../../templates/file-guard.tpl.md) modes and
  operations `read`, `modify`, `create`, `delete`, `aggregator`.
- Host-owned bookkeeping is never PACT truth; PACT requires no database,
  queue, lock service, event bus or daemon.
- [INSTALL](../../INSTALL.md) Sync Existing Installations and Deferred
  activation; WORKFLOW Pending template updates.

Existing validation assets: none are tracked on any branch. TASKS Done
records a document validator (122 checks, 203 links), 41 reference scenarios,
real-Git scenario checks (`check-task-candidates`, RA-RJ), harness scenarios
A-L, close, delivery, interop, trigger and boundary checks, and a migrator
(`migrate.mjs`: explicit target allowlist, plan-only default, source/target
hash guards, snapshots). All of them live in local cache runs, which PACT
itself defines as disposable.

## GAPS

- G1 Authority is implicit. It is spread across Roles, Artifact ownership,
  Spawn Boundaries, reservations and the file guard; no single rule says
  what an actor may change. Two runtimes can disagree on, for example,
  which product paths Lead may touch while integrating.
- G2 No normative lease exists, so conformance has nothing to compare.
- G3 `reservations.mode` has no vocabulary; examples use only `write`, while
  the file guard defines a different operation set.
- G4 Path patterns have no grammar: leading `/`, globs, directory entries
  (TASKS `files: /ai/pact/templates`), case and separators are undefined.
- G5 Records are not strictly parseable. Active objects are indented
  pseudo-YAML; live [STATE](../state/STATE.md) carries narrative and a second,
  non-template `## Historical PACT Routing Gate Handoff` block. Nothing marks
  which part of a record is machine-read.
- G6 GateClose says the project's WORKFLOW supplies acceptance commands, but
  WORKFLOW declares none. Command authority has nothing to name.
- G7 Authority-store semantics exist only as Git command examples
  (`merge-base --is-ancestor`, `origin/...`). The authority remote is
  implicit, rename handling in changed paths is undefined, and Lead's
  integration mechanics have no mechanical bound.
- G8 Host-local facts (consent, bindings, trust) and runtime activity have no
  stated relation to authority beyond "host-owned bookkeeping".
- G9 The conformance corpus is untracked and can be lost at cache cleanup.
- G10 Platform assumptions became normative in KEEP-ALIVE checks (PowerShell
  parsing in keep-alive.tpl.md RULES, WORKFLOW Keep-alive, INSTALL).
- G11 `requires` is free-form; examples `shell` and `repo-write` overlap with
  authority that the role already implies.

## INVARIANTS

- PACT stays agent-agnostic: a harness that only reads and writes files, runs
  commands and uses Git still follows PACT fully. Runtime enforcement only
  narrows.
- Capability, model tier and host state never create PACT authority.
- Authority is the committed PACT records at an identified revision. Derived
  facts (integrated, ready, closed) stay derived and are never stored.
- PACT 2.x authority remains Git. No database, queue or daemon becomes
  required.
- No new role, status, lifecycle step, state file or handoff file.
- Markdown stays readable by people and agents; a field becomes machine
  structure only when a deterministic PACT rule consumes it.
- Templates stay the versioned contracts; source-repository history is never
  installation data; owner bindings, hooks, guards, active work and
  acceptance history survive migration.

## OPTIONS

- O1 Keep the specification as is; each runtime encodes derivation in code.
- O2 Put derivation, lease and record grammar into the existing contracts
  (workflow, state, tasks and logic-draft templates; PACT.md), and track a
  language-neutral conformance corpus.
- O3 Add a separate spec-level runtime document carrying derivation, lease,
  schemas and store semantics.
- O4 Machine-first records (YAML or JSON state files) with Markdown rendered
  from them.
- O5 An authored `grants:` field inside `boundary_contract` per dispatch.

## REJECTED OPTIONS

- O1: the runtime becomes the real specification, repeating the drift already
  seen where an installed runtime proposed its own ledger profile.
- O3 for authority: two descriptions of role authority would drift, and an
  agent working without a runtime would never read the second one. Only
  authority-store semantics, which agents do not need, go to spec level.
- O4: turns PACT into a YAML database; breaks the readability invariant.
- O5: duplicates reservations and task coordinates, and an authored grant
  list can silently widen authority.
- A separate `schema/` directory: templates are already the versioned
  contracts and drift markers; parallel schemas would need their own
  versioning and would drift from their templates.
- `/ai/pact/scripts/` as the conformance home: it ships into every installed
  project and is defined as freeform support that governs nothing.
- Cache or `/ai/raw` as the conformance home: cache is disposable; raw holds
  evidence, not normative test vectors.

## DECISION

Recommended direction (selection happens in LOGIC-DRAFT): O2.

1. workflow.tpl.md gains "Authority derivation and leases" inside Runtime
   requirements: one deterministic derivation, a base-grant table, the lease
   format, and narrowing by capability and consent.
2. The state, tasks, logic-draft and workflow templates define their
   machine blocks and schemas in their own RULES; PACT.md defines the shared
   block and META grammar.
3. PACT.md gains "Authority store": the Git semantics PACT relies on, stated
   so the kernel is not bound to one Git library.
4. Vocabularies are fixed: reservation modes reuse the file-guard operations;
   one path grammar; one `requires` grammar; named checks declared in
   WORKFLOW.
5. Host state and the runtime journal get rules, not interfaces.
6. A tracked, repository-level `conformance/` holds fixtures and their
   normative format; the cached scenarios are promoted into it.
7. Accidental platform norms become portable semantics with kept examples.
8. Migration reuses INSTALL Sync with plan-only, hash-guarded application.

## AUTHORITY DERIVATION

Terms:

- authority = what PACT records at `contract_rev` allow this actor to do;
- capability = what this host can do now (probe result);
- consent = host-local restriction set by the owner;
- lease = authority ∩ capability ∩ consent.

`derive(records@contract_rev, actor, role, gate, task) → authority`:

1. Load records at `contract_rev`. A parse error or unknown template version
   yields no authority (dispatch holds; WORKFLOW Pending template updates).
2. Role is `Prime`, `Lead`, `Worker` or `none` (Watchdog). A task is
   mutating exactly when its `task_branch` is not `none`.
3. Apply the base grants below.
4. Apply the file guard: `strict` intersects path grants with listed
   operations, unlisted paths read-only; `warn` does not narrow but marks
   violations for the daily log; `off` does nothing.
5. A spawned actor's authority must be a subset of its `parent`'s authority
   derived at the same revision; otherwise derivation fails and the dispatch
   escalates.
6. Widening exists only as committed record changes: a Prime approval entry
   is evidence; the mechanical widening is Lead's updated `reservations` or
   `requires`, which yields a new `contract_rev` and a new derivation.
7. `contract_rev` must be a commit the lease subject did not author.

Base grants (`<gate>` and `<task>` expand the declared branch patterns):

| Subject | Paths | Refs | Exec |
|---|---|---|---|
| Worker, mutating | `reservations` modes; never `/ai/pact/context/state/**` or `/ai/pact/templates/**` | `create`, `commit` on its `task_branch` only | named checks in `requires` |
| Worker, read-only | `read` | none | named checks in `requires` |
| Lead, gate | `modify` on TASKS.md and STATE.md | `create` gate from `default_branch`; `commit` records on gate; `integrate` task candidates and `default_branch`; `delete` task branches after reachability | declared `checks` |
| Lead, executing a task | as Worker, mutating | as Worker, mutating | as Worker |
| Prime | `modify` on LOGIC-DRAFT.md and STATE.md decision entries | `commit` record-only on gate with `PACT-Answers`; `deliver` `default_branch` | declared `checks` |
| `none` (Watchdog) | `read` | none | none |

Global: every lease includes `read` on the tree at `contract_rev` (prose
read limits stay agent policy); no grant allows a non-fast-forward update
except an explicit ref `delete`; template paths need recorded owner
authorization; the owner acts outside leases under the existing authority
order.

Ref-update rules the authority store enforces (rule ids assigned at
selection):

- `commit`: the new tip descends from the old tip; changed paths are within
  the lease's path grants; renames count as both paths.
- `integrate`: ancestry-preserving merge of candidates that each passed their
  own lease check; the merge result changes no path outside paths changed by
  either side since the merge base, plus Lead record paths.
- `deliver`: fast-forward only, to a tip that descends from an `accepted`
  candidate, whose changes after that candidate are record-only, and with no
  newer Gate Handoff revision than the answered one.
- A commit carrying `PACT-Answers` is accepted only from a Prime lease and
  only when record-only.
- A copied commit (squash, cherry-pick) never proves reachability.

`requires` grammar: `<namespace>[:<qualifier>]` with `git`, `exec:<check>`,
`toolchain:<name>`, `model:<tier>`, `net:<host>`, `service:<alias>`,
`ui:automation`, `browser`, `mcp:<server>`. It selects and checks
availability; it grants nothing. Exec authority is role-implied but limited
to the declared `checks`; for a task, `requires` narrows it to the checks the
task needs. Legacy `repo-write` is implied by a mutating task; legacy `shell`
stays a host capability identifier and adds no exec grant.

## LEASE CONTRACT

Normative derived lease (the conformance output):

- `actor`, `role`, `gate`, `task` (`none` for gate-level leases),
  `contract_rev`, `grants[]`;
- grant = `kind`, `op`, `scope`:
  - `path`: `read` | `modify` | `create` | `delete`, scope = path pattern;
  - `ref`: `create` | `commit` | `integrate` | `deliver` | `delete`,
    scope = ref name;
  - `exec`: `run`, scope = named check.

Normalization: grants sorted by kind, op, scope; scopes normalized by the
path grammar; canonical JSON. `net`, services and UI automation are host
consent and capability, not PACT authority, until a rule needs them.

Field evaluation:

| Field | Decision | Reason |
|---|---|---|
| `gate` | add | Lead and Prime grants expand branch patterns from the gate id; a task id does not encode its gate |
| `id`, `expires` | host envelope, not normative | no PACT rule consumes them; elapsed time never transfers authority |
| `parent_lease` | reject | narrowing is recomputed from the recorded `parent` at the same `contract_rev` |
| `issued_at` | reject | journal fact; no rule consumes it |
| `authority_hash` | reject | `contract_rev` is already an immutable, content-addressed identity |
| `capability_snapshot` | reject | host fact in the journal; evidence already records its environment |

## MACHINE-READABLE SURFACE

Grammar (PACT.md): a machine block is a fenced block whose info string is
`pact:<type>`, holding a YAML 1.2 subset (mappings, sequences, plain or
quoted scalars; no anchors, tags or multiple documents). CRLF is normalized.
Text outside blocks is narrative and never machine-read. Writers preserve
unknown keys. META keeps its current `key: value` line format.

| Block | Field | Consumed by |
|---|---|---|
| META | `status`, `active_task` | valid state combinations, mutex |
| META | `generated_from`, `generated_from_version` | Pending template updates, loader schema choice |
| META | `updated` | stamp format |
| `pact:workflow` | `default_branch`, `gate_branch_pattern`, `task_branch_pattern` | derivation, ref rules, Done reachability |
| `pact:workflow` | `heavy_work`, `ram_threshold_gb` | resource gate before heavy checks |
| `pact:workflow` | `harness_topology`, `heartbeat_*`, `prime_stall_policy`, `prime_tier` | hook binding, StallCover guard, Prime assignment check |
| `pact:workflow` | `checks` (new: check names only) | exec grants, GateClose required set |
| `pact:task` | `id`, `task_phase`, `ready`, `trace` (TASKS) or `source` (STATE) | mutex, status mapping, transfer, derivation from LOGIC-DRAFT |
| `pact:task` | `role`, `actor`, `parent`, `lead` | derivation, narrowing, parallel set |
| `pact:task` | `reservations` (`path`, `mode`) | path grants, disjointness |
| `pact:task` | `requires` | resolution, exec grants |
| `pact:task` | `task_base`, `task_branch`, `task_candidate` | ref rules, Done reachability |
| `pact:task` | `model_tier`, `model_binding`, `effort`, `effective_effort` | assignment check, effort mapping, resume |
| `pact:gate-handoff` | `gate_id`, `seq`, `signal`, `candidate`, `branch`, `lead`, `recorded_at` | immutability, PrimeWatch keys, GateClose |
| `pact:gate-handoff` | `slices`, `validation`, `records`, `blockers`, `escalation` | immutability only (opaque text) |
| `pact:acceptance` | `decision`, `candidate`, `evidence` | GateClose delivery, PrimeWatch, Lead resume |

The FILE-GUARD entries table keeps its form; its first two columns become
normative grammar. Reservation `mode` uses `read`, `modify`, `create`,
`delete`.

Stays prose: `request`, `brief`, the six `boundary_contract` fields and their
approval entries, `specialty`, validation method and narrative, `tests` and
`baseline` narrative, handoff notes, retry policy, reasoning and decisions.
Transfer completeness checks only that the labelled prose fields exist and
are non-empty; it never parses them.

Rejected as machine fields: `retry.attempts`, `files`, `specialty`,
`created_at` and `handoff.status` (no consuming rule, or redundant with
`task_phase`).

Path grammar: repository-root paths with `/` separators, optional leading
`/`, `*` within a segment, `**` across segments, no `..`, case-sensitive
byte comparison; a trailing `/`, or a path that is a directory in the tree at
`contract_rev`, means `dir/**`.

## AUTHORITY STORE

Contract (PACT.md), independent of any Git library:

- immutable, content-addressed revision identity;
- revision DAG with ordered parents;
- ancestry test between two revisions;
- changed paths between two revisions, renames counted as both paths;
- commit author identity (opaque) and trailers;
- named refs with atomic compare-and-swap update;
- publication to and fetch from the authority remote with the same
  compare-and-swap semantics.

PACT 2.x binds this contract to Git. The authority remote is the remote that
tracks `default_branch` (conventionally `origin`). Authority attaches to ref
updates on the authority remote, not to local commits; worktrees, staging and
local commits are the actor's Git operations, outside the store contract.

## HOST STATE AND JOURNAL

Rules only; PACT defines no port, storage or interface for either.

- Host state (trust, pairing, consent, provider and model bindings, secret
  references, permissions, runtime configuration) may only narrow authority
  or select providers. It never appears in PACT records and never widens a
  lease.
- The runtime journal (lease issuance, sessions, attempts, intents and
  outcomes, checks, wake keys, probes, recovery events) is append-only host
  bookkeeping. It never changes a PACT fact.
- Recovery decisions must be derivable from the authority store alone; the
  journal may only locate where to look.
- Evidence a later authority needs is promoted to a durable reference before
  cleanup, as today.

Keeping them as two categories matters for conformance: consent is a fixture
input that may only shrink the lease; the journal never appears in expected
outputs.

## CONFORMANCE

Home: repository-level `conformance/`, outside `/ai/pact`, so installs do not
copy it and release archives can exclude it.

```txt
conformance/
  README.md                normative fixture format, runner contract, rule ids
  cases/<area>/<case-id>/
    case.json              operation, inputs, rule references
    repo.bundle            Git bundle with every ref the case needs
    host.json              capability and consent fixture, when relevant
    expected.json          normalized expected output
```

Operations: `parse`, `derive_authority`, `effective_lease`, `transition`,
`ref_update`, `derive_facts`, `recover`. Expected outputs are normalized
JSON: authority or lease, `allow` or `deny` with rule id, transition result,
ref result, and derived facts (integrated candidates, ready-unanswered key,
closed, STATE status). A runner adapter per implementation reads `case.json`
and prints the output; comparison is exact after canonicalization. Runners
are non-normative.

Rule ids: every mechanical rule in the templates and shipped hooks gets a
stable id, so two implementations cannot pass a deny case for different
reasons.

Minimum coverage, each area with at least one allow and one deny case: lease
derivation per role; child narrowing; Worker reservations and task branch;
Lead gate branch and integration bound; Prime record-only authority and
`deliver`; force-push rejection; transfer completeness; Done reachability and
copied-commit rejection; Gate Handoff immutability and newer-revision voiding;
`PACT-Answers` forgery; GateClose closure; `requires` unavailable before
(`ready: false`) and after (`blocked`) transfer; file guard `strict`, `warn`,
`off`; invalid state combinations; parse errors and legacy grammar; path
grammar and renames; consent that tries to widen.

Seed corpus: promote the cached real-Git scenarios (RA-RJ, A-L, close,
delivery, interop, trigger, boundaries) into fixtures. The document
validator and reference scenarios remain maintainer tools, not conformance.

## PLATFORM NEUTRALITY

| Location | Current text | Classification | Action |
|---|---|---|---|
| keep-alive.tpl.md Verification | parse every PowerShell block with `ParseInput` | normative by accident | parse launcher blocks with their declared shell's parser; keep PowerShell as the example |
| WORKFLOW Keep-alive; INSTALL Shared Keep-Alive and checklist | validate edited PowerShell blocks | normative by accident | same generalization |
| keep-alive.tpl.md EXAMPLE | `C:\` paths, PowerShell profile functions | platform example | keep |
| keep-alive.tpl.md FOR; INSTALL | registry at `<project-root>/../KEEP-ALIVE.md` | portable default stated as a required step | keep the default; INSTALL defers to the existing `keep_alive_registry` binding when no parent is usable |
| Time-Normalization.md | `w32tm` / `sntp` source | platform example in a portable procedure | keep; allow a host-provided verified UTC source |
| WORKFLOW declared fields | `heartbeat_lead: 11m`, `heartbeat_prime: 2h` | overridable defaults | keep; binding status may record the effective cadence |
| GateClose step 8 | not "in one shell command" | portable semantic in shell wording | say "separate actions" |
| INSTALL SPARC Bootstrap | `C:\workspace\sparc` | example | keep |
| WORKFLOW Task candidates | `origin/gate/<gate-id>` | Git example | keep; the authority remote is defined in PACT.md |
| `.gitignore`, `.git/info/exclude` rules | Git mechanics | normative under PACT 2.x | keep |

## MIGRATION

Reuse INSTALL Sync Existing Installations, Deferred activation, WORKFLOW
Pending template updates, and the recorded migrator pattern.

1. Detect drift through `generated_from_version`; never act on detection
   alone.
2. Plan-only pass: parse old records; list per file the blocks to create,
   field mappings, narrative kept verbatim, and conflicts.
3. Verify the plan preserves active tasks, reservations, Gate Handoff,
   acceptance history, model bindings and native efforts, custom hooks, the
   file guard, the current draft, pending tasks and validation references,
   by comparing extracted values before and after.
4. Apply only after explicit user agreement, under per-file blob-hash guards,
   with snapshots; abort on any guard mismatch.
5. Map `mode: write` to `modify` and `create` (not `delete`) and record the
   mapping; any other unknown mode is a conflict that holds the task.
6. Never rewrite a published Gate Handoff revision or a committed acceptance
   entry. Loaders accept their legacy `key: value` grammar; the next
   published `seq` or the next answer uses the new block. A non-template
   historical handoff heading becomes narrative and stays in Git history.
7. Never fill records from this repository's examples or history.

## FILES AFFECTED

Likely, for the later gate; none is edited by this shape.

| File | Expected change | Version |
|---|---|---|
| PACT.md | Authority store; block and META grammar; path grammar; host state and journal rules | package 2.1 |
| PACT-MANIFEST.md | index `conformance/`; template versions | package 2.1 |
| INSTALL.md | migration steps; KEEP-ALIVE wording; checklist | package 2.1 |
| templates/workflow.tpl.md, WORKFLOW.md | Authority derivation and leases; `checks`; `requires` grammar; `pact:workflow`; KEEP-ALIVE wording | 3.7 → 3.8 |
| templates/state.tpl.md, STATE.md | `pact:task`, `pact:gate-handoff`; reservation modes; single handoff block | 1.9 → 2.0 |
| templates/tasks.tpl.md, TASKS.md | `pact:task` entries | 1.12 → 2.0 |
| templates/logic-draft.tpl.md, LOGIC-DRAFT.md | `pact:acceptance` | 1.6 → 1.7 |
| templates/file-guard.tpl.md | table grammar; shared operations; path grammar | 1.0 → 1.1 |
| templates/keep-alive.tpl.md | launcher parsing generalized | 1.1 → 1.2 |
| agents/hooks/GateClose.md, SliceRecordsCheck.md, PrimeWatch.md | rule ids; "separate actions" wording | content only |
| agents/skills/Time-Normalization.md | host-provided UTC source | content only |
| `conformance/` (new) | README and fixtures | new asset |

Expected unchanged: sub-agent.tpl.md (profiles are dispatch context), hook,
ideas, shape, soul, nicknames, skill, agents and cache-run templates.

## RISKS

- The base-grant table is a reading of current prose; the Lead integration
  bound and Prime's STATE writes need explicit owner confirmation.
- workflow.tpl.md (1197 lines) and WORKFLOW.md (1049 lines) already exceed the
  1000-line split threshold; this delta grows them. A split is a separate
  decision.
- The cached scenarios can be lost before promotion; recovering them is the
  first dependency.
- Live records mix narrative and fields; migration conflicts are likely and
  must hold work rather than guess.
- Machine fields can creep; every addition must name its consuming rule.
- Fixture bundles add binary files; keep synthetic repositories small.

## ACCEPTANCE

For the gate that implements this delta:

- every base grant and ref rule cites the existing PACT sentence it
  formalizes, or an explicitly selected new rule;
- every machine field names its consuming rule; no new role, status, state
  file or handoff file;
- each coverage area has allow and deny fixtures that pass on at least one
  reference runner;
- a plan-only migration of this repository's records and one installed
  project preserves the listed items, verified by extracted-value hashes;
- promoted scenario checks and existing document checks exit 0; relative
  links resolve.

## PROMOTION

Ready for promotion into [LOGIC-DRAFT](../state/LOGIC-DRAFT.md): yes, as a
new gate selected by Prime. The current gate `PACT-Maintenance` is closed
(its answer commit is `main`), and `## Next` is empty.

Decisions for selection:

1. confirm the Lead integration bound and Prime's STATE write scope;
2. named checks: names in WORKFLOW, command lines in host state;
3. rule-id scheme and placement;
4. legacy grammar for published Gate Handoff and acceptance entries;
5. whether to split WORKFLOW before or after this delta.

Related:

- [../../PACT.md](../../PACT.md)
- [../../workflow/WORKFLOW.md](../../workflow/WORKFLOW.md)
- [../state/LOGIC-DRAFT.md](../state/LOGIC-DRAFT.md)
