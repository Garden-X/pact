# Protocol for Agent Coordination and Tasks

> Version: 02 draft
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

In this specification package, generated target files are metadata/current-data
seeds.

Seed target files must not copy template rules or examples.

When a real project requests a generated target file, create or update the
whole target file from the matching template.

When a generated PACT file is created or changed, use the matching template,
then leave the resulting target file as the followable source.

## Wiki-Core Rule

PACT files must remain usable as a plain Markdown wiki-core.

Core Markdown files must have stable filenames, clear headings, and relative
Markdown links from the package index in [PACT-MANIFEST.md](PACT-MANIFEST.md).

Obsidian-style wiki links are optional. They are not required for PACT
authority, portability, or agent parsing.

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

SPARC-generated docs are updated only when project truth changes.

## PACT Template Discipline

PACT templates are maintenance templates. They keep PACT files consistent when
developers ask for hooks, workflow changes, agent changes, worker files, soul
files, nickname changes, or state model changes.

PACT templates are immutable for agents. Agents operate on generated target
files only.

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

Cache is disposable and must not contain irreplaceable decisions.

## Forbidden Mixing

Do not place PACT files in `/ai/docs`.

Do not place SPARC-generated project truth in `/ai/pact`.

Do not place raw source material in `/ai/docs` or `/ai/pact`.

Do not treat cache as source of truth.
