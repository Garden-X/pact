# PACT INSTALL

> For: PACT 2.0
> Purpose: install or verify the PACT project-maintenance layer
> Updated: 2026-10-15 01:23:13 UTC+00:00

## Purpose

Installation means creating or verifying the PACT maintenance environment under
`/ai/pact` and binding SPARC when project-truth files are needed.

When this package is copied into a target project repository, `/ai` means the
target project's `ai/` folder.

Core distinction:

```txt
SPARC purpose = project truth.
PACT purpose  = project maintenance.
```

Installing PACT does not create project-truth files by itself.

## Source Repositories

- PACT: [Garden-X/pact](https://github.com/Garden-X/pact)
- SPARC: [Garden-X/sparc](https://github.com/Garden-X/sparc)

Compatibility:

- PACT expects a SPARC `01.03`-compatible project-truth binding or newer.
- PACT-managed installations mount SPARC-generated live project-truth files at
  `/ai/docs`.

When an agent is asked to run or apply this `INSTALL.md`, treat this file as an
installation procedure for the target project, not only as reading material.

## SPARC Binding

`/ai/sparc` is reserved for the SPARC package or binding used by PACT.

This specification package tracks `/ai/sparc` as an empty folder.

A SPARC binding is the resolved project-truth root that contains `SPARC.md`.

Before creating or changing project-truth files, attach or resolve a real SPARC
package or compatible project-truth binding. In SPARC `01.03`-compatible
bindings, accepted project truth routes through these live contracts:

| Truth category | SPARC live contract | Governing template |
|---|---|---|
| behavior | `<docs-root>/<app-name-en>/logic/LOGIC.md` | `app-logic.tpl.md` |
| structure, inventory, attached parts | `<docs-root>/<app-name-en>/map/MAP.md` | `app-map.tpl.md` |
| schema, data shape, data references | `<docs-root>/<app-name-en>/schema/SCHEMA.ts` | `app-schema.tpl.md` |
| design rules | `<docs-root>/<app-name-en>/design/DESIGN.md` | `design.tpl.md` |
| platform rules | `<docs-root>/PLATFORM-LOGIC.md` | `platform-logic.tpl.md` |
| accepted change history | `<docs-root>/<app-name-en>/changes/LOG.md`; daily request logs use `<docs-root>/<app-name-en>/changes/daily/YYYY-MM-DD.log.md` | `app-log.tpl.md` |

## SPARC Bootstrap

Install the latest available SPARC package into `/ai/sparc` during PACT
installation unless the owner explicitly selects another SPARC binding.

Latest SPARC means the current `HEAD` of the SPARC repository default branch,
or an owner-selected tag, branch, or commit when the owner pins one.

An owner-provided local SPARC package is a first-class binding source. When the
owner declares a local clone or working tree, such as `C:\workspace\sparc`, as
the source of truth, copy or reference that package instead of cloning from
GitHub. This is the correct path when the machine is offline or when the local
package is intentionally ahead of the published repository. Verify `SPARC.md`
exists at the provided root and record the package version.

If `/ai/sparc` is missing, empty, or contains only a package placeholder such as
`.gitkeep`, initialize it from:

```txt
https://github.com/Garden-X/sparc.git
```

Repo-relative command pattern:

```sh
git clone --depth 1 https://github.com/Garden-X/sparc.git ai/sparc
```

Remove the `.gitkeep` placeholder before cloning.

If `/ai/sparc` is already a Git checkout of the SPARC repository, fetch the
default branch and update only by fast-forward. Do not overwrite local SPARC
changes.

Repo-relative update pattern:

```sh
git -C ai/sparc pull --ff-only
```

If `/ai/sparc` is non-empty and is not a SPARC checkout, treat it as an
owner-provided binding and verify that `SPARC.md` exists at its root.

If the attached SPARC package describes its generated docs root as `/docs`,
treat that as the SPARC docs root and mount it to `/ai/docs` in this PACT
installation unless the owner selects a different docs root.

If network access is unavailable and no local SPARC package is provided, leave
`/ai/sparc` unresolved, record the blocker, and do not create project-truth
files until SPARC is attached.

Record the resolved binding choice during installation: the binding source
(GitHub clone, local package path, or owner-provided directory), the resolved
root, and the SPARC package version. A later reader must be able to tell which
SPARC the project was bound to without guessing.

## Agent Rules Installation

`/ai/pact/agents/AGENTS.md` is an agent rules file. Agents must treat it as
binding PACT maintenance instruction, not as optional documentation.

Treat `/ai/pact/agents/AGENTS.md` as the same class of instruction file as
native agent configuration files such as `AGENTS.md`, `CLAUDE.md`,
`GEMINI.md`, or equivalent agent setup files.

If an agent runtime only auto-discovers a root-level or vendor-specific
instruction file, that file should point agents to
`/ai/pact/agents/AGENTS.md` instead of duplicating PACT rules.

Root-level `AGENTS.md`, `CLAUDE.md`, `GEMINI.md`, `CODEX.md`,
`.cursor/rules/*`, `.windsurfrules`, and similar files are legacy discovery
bridges for agent-runtime compatibility. They are not the canonical PACT rule
location.

During installation, create or update native agent instruction bridge files
when the target project or agent runtime expects them. Examples include
project-root `AGENTS.md`, `CLAUDE.md`, `GEMINI.md`, or another owner-selected
agent configuration file.

When native or vendor-specific agent instruction files already exist, inspect
them before writing bridge content. Preserve owner-specific instructions that
do not conflict with PACT. If they contradict `/ai/pact/agents/AGENTS.md`,
report the conflict instead of silently merging or overwriting rules.

Bridge files should be minimal. Recommended bridge content:

```md
# Agent Instructions

Follow `/ai/pact/agents/AGENTS.md` for PACT maintenance rules before starting
work in this project.
```

If `/ai/pact/agents/AGENTS.md` is a `metadata-only` seed, generate the active
rules file from `/ai/pact/templates/agents.tpl.md` during installation before
agent work begins.

If `/ai/pact/workflow/WORKFLOW.md` is a `metadata-only` seed, generate the
active workflow file from `/ai/pact/templates/workflow.tpl.md` during
installation before agent work begins.

If `AGENTS.md` or `WORKFLOW.md` is already shipped with `content_status:
current-data` and `status: canonical`, agents may follow it directly.

Generated active files must keep their `generated_from` and
`generated_from_version` META fields so later template drift can be detected.

Maintained PACT Markdown files must include a privacy-safe update stamp:

```txt
updated: YYYY-MM-DD HH:mm:ss UTC+00:00
```

Refresh `updated` when meaningful Markdown content changes. Do not use local
timezone names, IANA timezone names, city names, or other location-bearing
timezone labels.

## Spawn-boundary migration

Sync WORKFLOW, AGENTS, task/state and reusable sub-agent contracts together.
Before the next spawn, record the parent-issued boundary_contract (scope,
permitted/protected areas, unchanged interfaces, allowed side effects and
escalation) and explicit role/parent/tier context in the existing brief.
Preserve effective inherited limits through transfer, restart and handoff.
Recover missing limits from authorized project evidence or the parent; do not
invent approval or dispatch an incomplete child assignment. Root tasks need
no parent-issued contract. Existing role powers, bindings, reservations and
acceptance remain authoritative. Profiles do not replace a dispatch contract.

## Harness-topology migration

Sync WORKFLOW 3.3, AGENTS 3.4, state 1.7 and sub-agent 2.2 together, add the
`PrimeWatch` hook contract, and refresh the PrimeHeartbeat, LeadHeartbeat,
GateClose and StallCover contracts. Authority roles, ownership, boundaries and
explicit owner model/effort bindings do not change.

- Add `harness_topology: single` and `heartbeat_watch: none` unless the owner
  declares a multi-harness deployment. Single-harness projects need no other
  configuration; Lead keeps the Lead layer and the Watchdog function.
- Preserve existing `heartbeat_prime` and `heartbeat_lead` values. Under
  event-first routing the Prime heartbeat is a recovery fallback; the owner
  may lengthen it or set `none`, but the migration does not change it.
- Register PrimeWatch as `unconfigured` until a host binding is installed and
  verified. Its executor is role-less; never bind it as Lead or Prime.
- Existing STATE needs no Gate Handoff block until Lead publishes a
  Prime-facing signal. Do not infer `ready` for an in-flight gate from its
  current records; Lead publishes it explicitly with the validated candidate.
- Lead heartbeat prompts stop relaying routine status to Prime. Host
  schedules, channels and delivered-key/incident memory remain host
  configuration.
- Lead owns mutable execution state and is the only writer of the Gate
  Handoff; each published `gate_id#seq` revision is immutable, and material
  changes publish the next `seq`. Prime does not maintain execution state; it
  writes only narrow authority-decision entries in the owning artifact
  (boundary approvals appended to the affected `boundary_contract`, gate
  scope/acceptance in LOGIC-DRAFT) through record-only, non-force commits with
  a `PACT-Answers` trailer.
- Acceptance names the exact `candidate`; the delivered tip may differ from it
  only under `/ai/pact/context/state/`. GateClose commits the acceptance
  answer on the gate branch, re-verifies the tip, and only then fast-forwards
  the default branch.
- Refresh LOGIC-DRAFT from logic-draft.tpl.md 1.6: `## Acceptance` entries
  record `decision`, `candidate` and evidence in a `PACT-Answers` commit;
  delivery is derived from whether that commit is reachable from the default
  branch. Existing acceptance prose stays; do not backfill invented entries
  for already closed gates.
- `requires` (workflow 3.4, tasks 1.11, state 1.8) is optional; existing
  assignments need no change.
- Task candidates (workflow 3.5, tasks 1.12, state 1.9, cache-run 1.1): add
  `task_branch_pattern: task/<gate-id>/<task-id>` and the runtime-cache
  exclusion above. In-flight Worker results need no rewrite; new mutating
  Worker tasks publish on their task branch. Do not delete existing task or
  gate branches until their candidates are reachable from the next level. Host-native permission or sandbox settings stay
  in local adapter configuration and only narrow the boundary_contract.
- Treat existing `lead_tier`/`worker_tier_default` values as routing hints;
  do not add a Watchdog tier field. Preserve explicit owner model bindings.

## Required PACT Package

Verify that `/ai/pact` contains:

- [PACT.md](PACT.md)
- [PACT-MANIFEST.md](PACT-MANIFEST.md)
- [INSTALL.md](INSTALL.md)
- [workflow/WORKFLOW.md](workflow/WORKFLOW.md)
- [agents/AGENTS.md](agents/AGENTS.md)
- [agents/NICKNAMES.md](agents/NICKNAMES.md)
- [context/IDEAS.md](context/IDEAS.md)
- [context/state/LOGIC-DRAFT.md](context/state/LOGIC-DRAFT.md)
- [context/state/TASKS.md](context/state/TASKS.md)
- [context/state/STATE.md](context/state/STATE.md)
- [templates/](templates/)

Required folders:

```txt
agents/hooks/
agents/skills/
agents/souls/
agents/workers/
context/shapes/
scripts/
adapters/
cache/
```

Runtime cache stays untracked. Ensure `/ai/pact/cache/runs/` and
`/ai/pact/cache/retained/` are excluded from Git: append those two lines to
the project's `.gitignore`, preserving its existing content, or to
`.git/info/exclude` when the owner keeps `.gitignore` unchanged. Keep
`ai/pact/cache/.gitkeep` and `ai/pact/templates/cache-run.tpl.md` tracked;
never ignore all of `/ai/pact/cache/`.
## Fresh Project State

Install specification files, templates, shipped hook contracts, and the active
AGENTS/WORKFLOW entry targets. Template EXAMPLE sections demonstrate complete
generated files; their scenario content is not the target project's history.
Use the current templates to initialize fresh project data:

- LOGIC-DRAFT: `status: none-selected`, no selected or next gates;
- TASKS: `status: no-active-draft`, empty Pending and Done;
- STATE: `status: clear`, `active_task: none`, no active blocks;
- IDEAS and NICKNAMES: empty project entries until real data exists.

Fresh WORKFLOW defaults `worker_fix_target` to `none`. Correction tracking is
an optional project diagnostic; preserve an existing enabled percentage during
upgrades. Do not enable counting merely because an example profile mentions
correction reports. Real task outcomes, failures, fixes and validation remain
required whether or not the diagnostic is enabled.

Do not copy this protocol source repository's selected maintenance draft,
completed tasks, session identifiers, host paths, cache, or active worker hires.
Create reusable role/specialty files from sub-agent.tpl.md only when needed.
An upgrade preserves the target project's actual state and profiles; it must
not reset them to these fresh-install defaults.

## Docs And Raw

`/ai/docs` is reserved for SPARC-generated project truth for the actual target
project.

In the standard PACT Agent OS layout, `<docs-root>` in SPARC live-contract
paths is `/ai/docs`.

PACT installation does not populate `/ai/docs`.

`/ai/raw` is reserved for raw source material and evidence.

PACT installation does not populate `/ai/raw`.

## PACT Maintenance Templates

PACT templates are used when maintaining generated PACT target files and
templated cache artifacts.

`*.tpl.md` files are immutable template contracts.

Agents may read templates and apply them to generated target files or cache
artifacts.

Agents must not edit, rename, delete, or create template files during normal
PACT operation.

If a template is missing or appears incorrect, agents must report the issue and
request template-maintainer action instead of changing the template.

Use the matching template before creating or changing generated target files or
templated cache artifacts:

- workflow files;
- hook files;
- cache-run manifests;
- skill files;
- agent rules;
- nickname files;
- soul files;
- worker files;
- future ideas;
- shape files;
- draft logic;
- tasks;
- active state;
- file guard, when the owner opts in.
- shared host-local keep-alive registry, outside the working project.

In this specification package, generated target files may be active followable
targets or seeds with `metadata-only`, `current-data`, or `current-state`
content status. Metadata-only seed files must not copy template rules or
examples.

PACT templates must follow:

```txt
META
WHAT
FOR
RULES
EXAMPLE
```

## Shared Keep-Alive Installation

Resolve the target project root's parent `KEEP-ALIVE.md` before service work.
Follow any pointer to the existing canonical host registry. For nested projects
or worktrees, bind `keep_alive_registry` to that shared file; never generate
another independent port table for the same host services.

When a registry is needed and none exists, generate the parent-level
`KEEP-ALIVE.md` from [templates/keep-alive.tpl.md](templates/keep-alive.tpl.md).
The template remains inside PACT. Its FOR index lists project folders and short
descriptions; each project has its own small metadata block and service/command
references. The container does not impose one project META on all entries.
Preserve existing registry entries during
migration; verify resolved source/target paths before renaming or relocating
the file, and synchronize known instruction/launcher pointers. A pointer file
contains only the canonical path and discovery instructions.

Keep the generated file/pointer host-local with the owning repository's exact
`.git/info/exclude` entry. A registry outside all repositories needs no
exclusion; a local exclude does not remove an already tracked file. Do not
exclude the template or change tracked ignore rules for host-only files.

Register aliases, paths, raw commands, unique ports, dependencies, profile
functions, and actual check status. Parse edited PowerShell blocks/profile
before declaring completion. Registry migration does not authorize restarting
services or rewriting working launch commands.

## Validation Checklist

- [ ] `/ai/sparc/` exists as the reserved SPARC folder.
- [ ] `/ai/sparc/` is initialized from the latest SPARC repository default
      branch, or an owner-selected SPARC binding is documented.
- [ ] If `/ai/sparc/` or another binding root contains a SPARC package,
      `SPARC.md` exists at that root.
- [ ] The attached SPARC binding is `01.03`-compatible or newer.
- [ ] SPARC-generated live project-truth files are mounted at `/ai/docs`.
- [ ] Project-truth work can resolve the relevant SPARC live contract from
      the truth map above, or the missing contract is recorded as a SPARC gap
      before implementation proceeds.
- [ ] `/ai/pact/PACT.md` exists.
- [ ] `/ai/pact/PACT-MANIFEST.md` exists.
- [ ] `/ai/pact/workflow/WORKFLOW.md` exists.
- [ ] `/ai/pact/agents/AGENTS.md` exists.
- [ ] `/ai/pact/agents/AGENTS.md` has been generated from
      `agents.tpl.md` if it was installed as a `metadata-only` seed, or is
      already shipped as `status: canonical` with `content_status:
      current-data`.
- [ ] `/ai/pact/workflow/WORKFLOW.md` has been generated from
      `workflow.tpl.md` if it was installed as a `metadata-only` seed, or is
      already shipped as `status: canonical` with `content_status:
      current-data`.
- [ ] WORKFLOW is synchronized with workflow.tpl.md 3.3 or newer and declares
      Prime, Lead, Worker roles; High/Middle/Light tiers; percentage efforts;
      gate/heartbeat/registry/resource fields; ready pool and recovery policy;
      harness topology and event-first wake routing.
- [ ] Watchdog and other operational functions are not roles. Prime-facing
      Lead signals are recorded in STATE Gate Handoff before any notification;
      readiness is only Lead's explicit `ready` with a candidate.
- [ ] Prime Architect and Inspector both use High; their model bindings may
      match or differ. Explicit owner models and effective efforts are preserved.
- [ ] Lead selects the Worker specialty, adequate tier, model binding, and
      effort for each brief; TASKS/STATE own assignments. No fixed Worker files
      or manifest/MAP roster are required.
- [ ] SliceRecordsCheck, GateClose, StallCover, PrimeHeartbeat, LeadHeartbeat,
      and PrimeWatch contracts are discoverable through WORKFLOW with matching hook filenames.
- [ ] Hook rows show actual manual/unconfigured/bound status. Automatic
      scheduling and executable enforcement are not inferred from Markdown.
- [ ] Required acceptance results identify their revision/environment and all
      exit statuses; a missing/nonzero result prevents closure before a
      separate merge action.
- [ ] Slice records allow documented verification of unchanged SPARC truth
      instead of requiring needless live-contract edits or stamp refreshes.
- [ ] `keep-alive.tpl.md` is tracked, and `keep_alive_registry` resolves the
      parent-level `KEEP-ALIVE.md` or the existing shared pointer/binding.
- [ ] Live registries/pointers remain host-local, service entries and startup
      dependencies are preserved, and edited PowerShell blocks parse.
- [ ] `/ai/pact/agents/AGENTS.md` contains an `## Execution Hierarchy` pointer
      section to `WORKFLOW.md`.
- [ ] Agents treat `/ai/pact/agents/AGENTS.md` as a binding agent rules file
      equivalent in role to native agent configuration files.
- [ ] Native agent instruction bridge files exist when required by the target
      agent runtime, and they point to `/ai/pact/agents/AGENTS.md`.
- [ ] Bridge files such as `CLAUDE.md` point to `/ai/pact/agents/AGENTS.md`,
      so the Execution Hierarchy reaches agents that read only the bridge.
- [ ] Native or vendor-specific bridge files are treated as legacy discovery
      bridges, not as competing PACT rule authorities.
- [ ] Existing native or vendor-specific agent instruction files were inspected
      and either synchronized with PACT or reported as conflicts.
- [ ] `/ai/pact/templates/*.tpl.md` contains the required PACT templates.
- [ ] `/ai/pact/templates/cache-run.tpl.md` exists.
- [ ] Agents treat `/ai/pact/templates/*.tpl.md` as immutable.
- [ ] Generated target files use valid `content_status` values and contain no
      accepted project truth.
- [ ] `/ai/pact/context/IDEAS.md` exists.
- [ ] `/ai/pact/templates/ideas.tpl.md` exists.
- [ ] `/ai/pact/templates/shape.tpl.md` exists.
- [ ] `/ai/pact/context/state/LOGIC-DRAFT.md` exists.
- [ ] `/ai/pact/context/state/TASKS.md` exists.
- [ ] `/ai/pact/context/state/STATE.md` exists.
- [ ] Every active task preserves its complete brief, scope, reservations,
      validation and applicable test/baseline references; no active task remains
      Pending. Missing essential recovered instructions block continuation.
- [ ] Fresh project state is empty and contains no package-maintainer history;
      upgrades preserve actual target project state and profile bindings.
- [ ] No skill log exists unless the attached SPARC binding declares
      `runtime_mode: debug` and `WORKFLOW.md` declares the skill log artifact.
- [ ] No `FILE-GUARD.md` exists unless the owner opted in and `WORKFLOW.md`
      declares it in its `## File Guard` section.
- [ ] `/ai/docs` contains no PACT files.
- [ ] `/ai/raw` contains no accepted project truth.
- [ ] PACT core Markdown links resolve from `PACT-MANIFEST.md` when checked by
      a Markdown link checker or opened in a Markdown wiki reader.
- [ ] The repository root can be opened as a Markdown wiki or editor workspace.
- [ ] Hooks that use scripts expose those scripts through hook files and
      `WORKFLOW.md`.

## Sync Existing Installations

Compare each target's generated_from_version with its template's version.
Upgrade the contract and complete example structure, then reapply the target's
actual settings and state. PACT 2.0 is the package version; do not reset template
versions to 2.0 or overwrite target files with this repository's operational data.

1. Synchronize WORKFLOW from workflow.tpl.md 3.5 and AGENTS from agents.tpl.md
   3.4. Preserve local hooks, file_guard, skill_log, resource limits, owner
   bindings, and project-specific rules. Preserve an existing enabled
   `worker_fix_target` percentage; `none` disables the diagnostic and is the
   fresh-install default. Report unresolved conflicts. A metric threshold
   affects routing, not gate acceptance.
2. Rename legacy responsibility names Primary to Prime and Coordinator to Lead,
   including role titles, heartbeat files/registrations, and recovery fields:

   | Existing field or file | PACT 2.0 contract |
   |---|---|
   | heartbeat_primary / PrimaryHeartbeat.md | heartbeat_prime / PrimeHeartbeat.md |
   | heartbeat_coordinator / CoordinatorHeartbeat.md | heartbeat_lead / LeadHeartbeat.md |
   | primary_stall_policy | prime_stall_policy |
   | draft owner_tier: primary | owner_role: Prime |
   | active-task coordinator | lead |
   | profile tier: coordinator or worker | role: Lead or Worker |

   Check references and host bindings before removing a replaced filename;
   preserve local profile content and update names without creating a fixed team.
3. Separate old model fields from roles. Retain concrete provider/model IDs in
   local bindings; use High/Middle/Light for capability fields. Prime architecture
   and inspection share High. lead_tier: Middle and worker_tier_default: Light
   are default routing hints only: an actual Lead, Worker, or Watchdog
   assignment may use Light, Middle, or High when adequate, and no tier changes
   role authority. Do not silently relabel a model whose capability has not been assessed.

   | Legacy model field | Binding destination |
   |---|---|
   | primary_model | Prime Architect and Inspector local binding(s); both High |
   | coordinator_model | Lead local binding; lead_tier declares capability |
   | worker_model | Worker default local binding; worker_tier_default declares capability |

   Retire the legacy fields after preserving their concrete IDs. An old field
   containing a capability label instead of a model ID is not a concrete
   binding; resolve it locally before dispatch. Distinct Architect/Inspector
   models remain distinct. Worker assignments may override their local default
   within owner constraints; do not create unrequested agents during migration.
4. Convert native effort names to percentages only after checking the selected
   model's actual supported levels/range. Record requested percentage and the
   effective native value using WORKFLOW's mapping. Preserve explicit settings;
   unsupported effort is recorded as unsupported. Different providers need not
   have the same number of levels. No protocol name implies an API enum.

   Map optional primary_effort to prime_effort, coordinator_effort to
   lead_effort, and worker_effort to worker_effort_default. These new workflow
   fields contain percentages, while the binding retains the effective native
   value. For N ordered levels and an existing index i, a corresponding
   percentage is round(100 * i / (N - 1)); record and verify the round trip.
   A single fixed level or unavailable control has no inferred percentage;
   preserve it and mark the mapping fixed/unsupported until a requested
   percentage is chosen. Retire the old native-effort keys after preservation.
5. Refresh reusable profiles from sub-agent.tpl.md 2.2, drafts from
   logic-draft.tpl.md 1.6, task lists from tasks.tpl.md 1.12, and active objects
   from state.tpl.md 1.9. Preserve selected scope, completed evidence, active
   actors/reservations, and pending work. Add specialty/binding/effort details to
   actual Worker assignments; do not fabricate hires or measurements.
   Preserve the exact bounded `brief`, scope, reservations, validation, and
   applicable `tests`/`baseline` references when transferring a task to STATE.
   For an older active object missing instructions, recover them from the
   project's existing task/draft evidence or recorded brief; keep a complete
   existing `request` as evidence rather than replacing it with an example.
   If essential constraints cannot be recovered, mark that task blocked,
   record precisely what is missing, and obtain the missing brief before
   continuing. Do not invent instructions, erase progress, or duplicate the
   active task in Pending. Prime alone advances the selected gate after the
   current gate's acceptance; Lead's Next preparation is planning only.
6. Refresh hooks from hook.tpl.md 1.3 and the shipped workflow contracts,
   including PrimeWatch and the harness-topology migration above.
   Inspect every required acceptance exit status on the candidate revision,
   including failures masked by later commands. Merge separately after reading
   results, only when authorized. Bind/verify host execution separately;
   copying Markdown is not activation. Keep actual host trust and config local.
7. Resolve the shared external KEEP-ALIVE.md using keep-alive.tpl.md 1.1 as
   described above. Preserve launch commands, ports, startup dependencies,
   pointers, and local Git exclusions. Never duplicate the host port registry.
   The external registry follows its own template metadata, not installed
   PACT-target `layer`, `status`, or `content_status` requirements.
8. Synchronize IDEAS from ideas.tpl.md 1.2 while preserving actual idea entries;
   use empty for no ideas and current for populated content. WORKFLOW recognizes
   standalone trimmed owner shortcuts; no runtime prehook or new handoff file
   is required. Check host punctuation delivery separately if used.
9. Validate relative links, role/field renames, template versions, and generated
   examples. Update native instruction bridges and host context reminders that
   would inject obsolete policy. Record validation in TASKS and required logs;
   refresh stamps only where meaningful content changed.

## Release Preparation

A distributable archive contains the protocol, current templates/examples,
followable entry targets, shipped hooks, license/notice, and fresh state as
defined above. Exclude repository-local cache, host configuration, current hires,
and maintainer task history. Validate the extracted archive as a fresh install
and retain its checksum. Preparing files does not publish or tag a release.

## Forbidden Content

Do not put PACT workflow, hooks, agents, state, scripts, adapters, cache, or
maintenance templates into `/ai/docs`.

Do not put SPARC-generated project truth into `/ai/pact`.

Do not put raw source material into `/ai/docs`.
