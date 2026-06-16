# Protocol for Agent Coordination and Tasks

> Version: draft
> Status: refined specification package
> Purpose: project maintenance for AI-assisted development

## Definition

PACT means Protocol for Agent Coordination and Tasks.

PACT is the project-maintenance layer for AI-assisted development. It defines
how agents orient themselves, plan work, use hooks, manage active state,
coordinate handoffs, validate work, and keep maintenance files consistent.

Source repositories:

- PACT: [Garden-X/pact](https://github.com/Garden-X/pact)
- SPARC: [Garden-X/sparc](https://github.com/Garden-X/sparc)

Compatibility:

- PACT expects a SPARC `01.00`-compatible project-truth binding or newer.
- In a PACT-installed Agent OS, SPARC-generated live project-truth docs are
  mounted under `/ai/docs`.
- If an attached SPARC package describes its generated docs root as `/docs`,
  treat that as the SPARC docs root and mount it to `/ai/docs` for this PACT
  installation unless the owner selects a different binding.

Core distinction:

```txt
SPARC purpose = project truth.
PACT purpose  = project maintenance.
```

SPARC defines what the project is and what it should be.
PACT defines how the project is maintained while work is being done.

## Specification Location

PACT's operational specification files live under:

```txt
/ai/pact
```

PACT entry file:

```txt
/ai/pact/PACT.md
```

Agent orientation entry file:

```txt
/ai/pact/agents/AGENTS.md
```

`/ai/pact/agents/AGENTS.md` is an agent rules file. Agents must treat it as
binding PACT maintenance instruction, equivalent in role to native agent
configuration files such as `AGENTS.md`, `CLAUDE.md`, `GEMINI.md`, or other
agent setup files.

Root-level or vendor-specific files such as `AGENTS.md`, `CLAUDE.md`,
`GEMINI.md`, `CODEX.md`, `.cursor/rules/*`, and `.windsurfrules` are legacy
discovery bridges for runtimes that cannot automatically find
`/ai/pact/agents/AGENTS.md`. They should point to the canonical PACT file
instead of duplicating or replacing it.

SPARC package folder:

```txt
/ai/sparc
```

SPARC entry file:

```txt
SPARC.md
```

If SPARC is attached as a binding outside `/ai/sparc`, read `SPARC.md` at that
binding root before creating or changing project-truth docs.

The surrounding `/ai` folder is the AI-related container folder.

## Operating Terms

The `/ai` folder may be called the Agent OS root. In this specification, Agent
OS means the `/ai` container viewed as the operating environment for agents.

A SPARC binding is the resolved project-truth root that contains `SPARC.md`.
It may be the `/ai/sparc` directory, a symlink, a submodule, a copied package,
or another owner-provided directory. Operationally, the binding root is the
directory where agents must read `SPARC.md` before creating or changing
project-truth docs.

A generated target file is a PACT maintenance file governed by a template
mapping.

An installed target file is a generated target file that exists on disk in the
project.

A seed target file is an installed target file shipped with this specification
package in its initial state.

## System Boundaries

| System | Purpose | Responsibility |
|---|---|---|
| SPARC | project truth | contracts, current project truth, docs structure, gaps, logs |
| PACT | project maintenance | workflow, agents, hooks, state, handoff, validation, templates |
| Project | implementation | source code, runtime behavior, product meaning |

SPARC is not an executor.

PACT is not project truth.

Project code is not a coordination protocol.

## Agent OS Layout

PACT uses a broader `/ai` container:

```txt
/ai
  sparc/
  pact/
  docs/
  raw/
```

`/ai/sparc` is reserved for the SPARC package or compatible project-truth
binding. This specification package tracks it as an empty folder.

`/ai/pact` contains PACT maintenance files.

`/ai/docs` contains SPARC-generated human-readable project truth for the actual
project being developed. It is empty until a real project is attached.

`/ai/raw` contains source material and evidence. It is empty until raw material
is intentionally captured.

## PACT Scope

PACT may define:

- agent orientation;
- agent skills;
- workflow lifecycle;
- hooks;
- task decomposition;
- active work state;
- file reservations;
- validation expectations;
- retries after an identified correction;
- handoffs;
- recovery;
- scripts;
- adapters;
- disposable cache;
- maintenance templates for PACT files.

PACT must not define:

- accepted project truth that belongs in SPARC-generated docs;
- permanent app behavior;
- permanent app structure;
- permanent design rules;
- platform invariants;
- business logic;
- hidden memory.

## Authority

PACT work follows this authority order:

1. Current owner instruction.
2. Installed PACT files.
3. Attached SPARC package or compatible project-truth binding.
4. SPARC-generated project truth under `/ai/docs`, when present.
5. PACT operational state.
6. Raw source material.
7. Model suggestions.

If PACT state conflicts with SPARC project truth, expose the conflict. Do not
silently merge the two.

## Core Files

Recommended PACT files:

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

PACT maintenance templates live in:

```txt
/ai/pact/templates
```

## Generated Targets And Templates

PACT uses generated target files such as `AGENTS.md`, `WORKFLOW.md`,
`IDEAS.md`, and the state files under `/ai/pact/context/state`.

In a real project, agents follow generated target files after they are created
or updated from templates.

Templates in `/ai/pact/templates` are maintenance generators and consistency
contracts. They are used when creating or updating generated PACT target files.

Templates are not the active files agents follow during normal execution.

`*.tpl.md` files are immutable template contracts.

Agents may read templates and apply them to generated target files.

Agents must not edit, rename, delete, or create template files during normal
PACT operation.

If a template is missing or appears incorrect, the agent must report the issue
and request template-maintainer action instead of changing the template.

A generated PACT file is an installed target file created or maintained from a
template mapping.

Templates are not generated files.

`PACT.md`, `PACT-MANIFEST.md`, and `INSTALL.md` are specification-level files.
They are maintained by the specification author or maintainer, not generated
from templates.

In this specification package, generated target files may be active followable
target files or seeds with one of these `content_status` values:

| content_status | Meaning |
|---|---|
| `metadata-only` | The seed identifies the target file but does not include generated body content. |
| `current-data` | The target contains current package data or followable package rules that agents may read directly. |
| `current-state` | The seed contains current package state values for the state lifecycle. |

Metadata-only seed target files must not copy template rules or examples.

Active generated target files such as `AGENTS.md` and `WORKFLOW.md` may ship
with followable content when agents need a live entry point before project
installation logic runs.

When a real project requests a generated target file, create or update the
whole target file from the matching template.

When a generated PACT file is created or changed, use the matching template,
then leave the resulting target file as the followable source.

## Wiki-Core Rule

PACT files must remain usable as a plain Markdown wiki-core.

Core Markdown files must have stable filenames, clear headings, and relative
Markdown links from the package index in [PACT-MANIFEST.md](PACT-MANIFEST.md).

Wiki-style links are optional. They are not required for PACT authority,
portability, or agent parsing.

## Workflow Lifecycle

Canonical maintenance lifecycle:

```txt
shape
-> LOGIC-DRAFT.md
-> TASKS.md
-> STATE.md
-> execution
-> validation
-> project truth update through SPARC when needed
-> cleanup
```

`IDEAS.md` may inform work before or during shaping, but ideas are not a
required lifecycle start and do not create tasks directly.

Shapes capture early reasoning.

`IDEAS.md` captures future-facing project ideas.

Ideas may explain why a current decision should leave room for future features
or functionality.

Ideas are not shapes, selected logic, tasks, or active state.

Shapes live in:

```txt
/ai/pact/context/shapes
```

A shape is a pre-draft reasoning artifact.

Shapes may support `LOGIC-DRAFT.md`.

Shapes do not replace `LOGIC-DRAFT.md`.

Tasks must not be created directly from a shape.

Tasks must not be created directly from `IDEAS.md`.

`LOGIC-DRAFT.md` captures selected maintenance logic.

Valid `LOGIC-DRAFT.md` statuses are:

```txt
none-selected
selected
superseded
```

`TASKS.md` lists maintenance tasks derived from the draft.

Valid `TASKS.md` statuses are:

```txt
no-active-draft
active-draft
complete
```

Task IDs follow `PACT-YYYYMMDD-NNN`.

`STATE.md` contains the active execution cursor.

Valid top-level `STATE.md` statuses are:

```txt
clear
active
blocked
handoff
```

Valid state combinations:

| LOGIC-DRAFT.md | TASKS.md | STATE.md | Meaning |
|---|---|---|---|
| `none-selected` | `no-active-draft` | `clear` | No selected maintenance draft exists. |
| `selected` | `no-active-draft` | `clear` | Draft selected; tasks not created yet. |
| `selected` | `active-draft` | `clear` | Tasks exist; no task is active. |
| `selected` | `active-draft` | `active` | Exactly one task is being executed. |
| `selected` | `active-draft` | `blocked` | Exactly one task is blocked. |
| `selected` | `active-draft` | `handoff` | Exactly one task is prepared for handoff. |
| `selected` | `complete` | `clear` | Draft tasks are complete. |
| `superseded` | `no-active-draft` | `clear` | Old draft is retained as a replaced record. |

Invalid combinations include:

- `STATE.md` active, blocked, or handoff without `TASKS.md` set to
  `active-draft`;
- `TASKS.md` set to `active-draft` while `LOGIC-DRAFT.md` is `none-selected`;
- `LOGIC-DRAFT.md` set to `superseded` while any task remains active, blocked,
  handoff, or pending.

Draft abandonment is a cleanup path. To supersede a selected draft before all
tasks are complete, first resolve any active, blocked, or handoff state, then
complete or explicitly cancel every pending task in `TASKS.md`. Canceled tasks
must move out of Pending and record the cancellation reason. After no active or
pending task remains, set `TASKS.md` to `no-active-draft`, set `STATE.md` to
`clear`, and set `LOGIC-DRAFT.md` to `superseded`.

Starting a next draft cycle is allowed when `STATE.md` is `clear` and the
previous `TASKS.md` cycle is `complete`. Before replacing `LOGIC-DRAFT.md` or
resetting `TASKS.md`, preserve the completed cycle's summary and validation
evidence in `TASKS.md` Done, a SPARC daily log, or both. Then write the new
selected logic into `LOGIC-DRAFT.md`, reset `TASKS.md` for the new draft, and
transfer at most one task into `STATE.md`.

`STATE.md` is a project-level active-task mutex. Multiple pending tasks may
exist in `TASKS.md`, but only one task may be transferred into `STATE.md` at a
time. A second agent must wait, help unblock the active task, or receive owner
approval for a separate coordination scope.

SPARC-generated docs are updated only when project truth changes.

The project-truth update step activates when completed work changes or reveals
accepted behavior, architecture, contracts, persistent decisions, documentation
structure, or other durable project meaning. It does not activate for transient
PACT bookkeeping, cache changes, task movement, or future ideas that have not
become accepted project truth.

Cleanup completes the maintenance cycle:

- move completed work from `TASKS.md` Pending to Done;
- set `STATE.md` to `clear` and `active_task` to `none`;
- release file reservations recorded in `STATE.md`;
- record validation evidence or a reason validation was not possible in the
  completed task entry, the relevant SPARC daily log, or both;
- set `TASKS.md` to `complete` when no pending tasks remain;
- keep supporting shape files unless the owner asks for removal;
- clear disposable cache when it is no longer useful;
- leave `LOGIC-DRAFT.md` as `selected` for traceability, set it to
  `superseded` when replaced, or reset it to `none-selected` when the selected
  logic is intentionally cleared.

## PACT Template Discipline

PACT templates are maintenance templates. They keep PACT files consistent when
developers ask for hooks, workflow changes, agent changes, worker files, soul
files, nickname changes, cache-run manifests, or state model changes.

PACT templates are immutable for agents. Agents operate on generated target
files and templated cache artifacts, not on template files themselves.

PACT templates follow this structure:

```txt
META
WHAT
FOR
RULES
EXAMPLE
```

`META` identifies the template.

`WHAT` describes the kind of PACT maintenance file.

`FOR` maps the template to the target path and use case.

`RULES` defines required and forbidden content.

`EXAMPLE` shows a compact valid target file or fragment.

## Target META Blocks

Generated PACT target files should start with a Markdown title followed by a
`## META` block.

Required META fields for all PACT target files:

- `name`;
- `canonical_location`;
- `layer`;
- `status`.

Required META fields for seed target files and recommended fields for any
target that needs template-origin tracking:

- `generated_from`;
- `generated_from_version`;
- `content_status`.

Optional META fields may be added when the target needs them. Current optional
fields include:

- `active_task` for `STATE.md`;
- `purpose` for full generated files or template examples;

Template files use their own META schema:

- `name`;
- `version`;
- `type`;
- `for`.

Template `version` identifies the template contract. Increment it when a
template changes target rules, required fields, lifecycle behavior, or examples
in a way that may change generated target files. Pure typo or formatting fixes
may keep the same version.

## Hooks

Hooks live in:

```txt
/ai/pact/agents/hooks
```

A hook is a named workflow extension point. It may describe a trigger, inputs,
expected action, output, and failure behavior.

Hooks are PACT maintenance files. They do not define project truth.

Hooks are registered in [workflow/WORKFLOW.md](workflow/WORKFLOW.md).

`hook.tpl.md` governs one individual hook file.

`cache-run.tpl.md` governs `CACHE.md` manifests for individual cache runs.
`CACHE.md` files are templated cache artifacts, not installed generated PACT
target files, and follow the cache-run template's META shape.

## Adapters, Scripts, And Cache

Scripts live in:

```txt
/ai/pact/scripts
```

Adapters live in:

```txt
/ai/pact/adapters
```

Cache lives in:

```txt
/ai/pact/cache
```

Scripts and adapters support PACT. They do not govern SPARC project truth.

Scripts and adapters are freeform support artifacts unless a project defines a
local convention for them. There is no canonical `script.tpl.md` or
`adapter.tpl.md` in this package.

When a hook depends on a script or adapter, register the relationship in the
hook file and in [workflow/WORKFLOW.md](workflow/WORKFLOW.md).

Cache is disposable and must not contain irreplaceable decisions.

## Cache Lifecycle

Cache is temporary session memory for work on an addon, a new logic addition,
or another active maintenance task.

Cache is organized by task run, not by topic. Topic-oriented cache folders are
forbidden because they become uncontrolled alternate documentation. Topics
belong in SPARC-generated docs or PACT target files after promotion.

Cache runs live under:

```txt
/ai/pact/cache/runs/YYYY-MM-DDTHH-MM-SSZ--slug/
```

Retained cache runs live under:

```txt
/ai/pact/cache/retained/YYYY-MM-DDTHH-MM-SSZ--slug/
```

Each cache run may contain a `CACHE.md` manifest plus run-local folders such
as:

```txt
CACHE.md
raw-data/
chunks/
summaries/
retrieval/
rag/
rlm/
validation/
artifacts/
promote/
tmp/
```

`CACHE.md` is the manifest, index, and pointer file for one cache run. It
does not replace the cache-run folders and should not contain all cached
material inline. Create `CACHE.md` from
[templates/cache-run.tpl.md](templates/cache-run.tpl.md).

`CACHE.md` must record the cache input basis: user prompts or owner
instructions, internet search queries and source pointers, task state, input
data, `/ai/raw` references when used, and other local file, dataset, project,
or repository references when they inform the task.

`raw-data/` inside a cache run is not `/ai/raw`. Cache `raw-data/` is
session-scoped and disposable. `/ai/raw` is the durable raw/evidence area
outside cache for source material that must survive cache cleanup, such as
cloned Git projects, whole projects selected for transformation, or datasets
for processing.

Cache must not contain accepted project truth, hidden memory, secrets,
credentials, permanent instructions, irreplaceable raw evidence, or durable
decisions. If material would be lost by deleting cache, it belongs somewhere
else before cleanup.

Cache session refresh, previous-cache comparison, promotion, retention, and
cleanup are workflow behavior and are defined in
[workflow/WORKFLOW.md](workflow/WORKFLOW.md).

Agents may use external reasoning, recursive decomposition, or sandbox
libraries as implementation support only when the license and owner policy
allow it. Their intermediate outputs are still cache. They do not become PACT
authority or SPARC project truth until promoted through the proper files.

## Forbidden Mixing

Do not place PACT files in `/ai/docs`.

Do not place SPARC-generated project truth in `/ai/pact`.

Do not place raw source material in `/ai/docs` or `/ai/pact`.

Do not treat cache as source of truth.
