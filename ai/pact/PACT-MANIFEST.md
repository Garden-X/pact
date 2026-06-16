# PACT-MANIFEST

> For: PACT package
> Status: canonical package manifest
> Purpose: describe the installed PACT maintenance environment

## Purpose

This manifest describes the `/ai` container used by PACT.

It answers:

```txt
What is /ai for?
Where does SPARC live?
Where does PACT live?
Where do project-truth docs live?
Where does raw evidence live?
Where are agents, workflow, hooks, ideas, state, templates, scripts, adapters, and cache?
```

Core distinction:

```txt
SPARC purpose = project truth.
PACT purpose  = project maintenance.
```

Source repositories:

- PACT: [Garden-X/pact](https://github.com/Garden-X/pact)
- SPARC: [Garden-X/sparc](https://github.com/Garden-X/sparc)

Compatibility:

- PACT expects a SPARC `01.00`-compatible project-truth binding or newer.
- PACT-managed installations mount SPARC-generated live project-truth docs at
  `/ai/docs`.

## License And Notice

PACT package identity, license, notice, and attribution obligations are defined
by the repository license and notice files.

Changing file routes, bridge filenames, or package layout does not remove
license or notice obligations for PACT-derived packages.

## Agent OS Root

The Agent OS root is:

```txt
/ai
```

Agent OS means the `/ai` container viewed as the operating environment for
agents. It separates project truth, project maintenance, package standards, and
raw evidence.

Recommended structure:

```txt
/ai
  sparc/
  pact/
  docs/
  raw/
```

## Root Domains

### /ai/sparc

`/ai/sparc` is reserved for the SPARC package or binding used by PACT.

A SPARC binding is the resolved project-truth root that contains `SPARC.md`.

SPARC source repository:

```txt
https://github.com/Garden-X/sparc
```

This specification package tracks it as an empty folder.

SPARC governs project-truth contracts and the structure of SPARC-generated docs.

If an attached SPARC package describes generated docs under `/docs`, interpret
that path as the SPARC docs root and mount it to `/ai/docs` for this PACT
installation unless the owner selects a different binding.

SPARC entry file:

```txt
SPARC.md
```

Read `SPARC.md` at the SPARC package folder or attached binding root before
creating or changing project-truth docs.

SPARC templates govern:

```txt
/ai/docs
```

### /ai/pact

`/ai/pact` contains PACT project-maintenance files.

PACT source repository:

```txt
https://github.com/Garden-X/pact
```

PACT entry file:

```txt
/ai/pact/PACT.md
```

PACT governs:

- workflow;
- hooks;
- agent rules;
- skills;
- nicknames;
- soul files;
- worker files;
- future ideas;
- draft logic;
- tasks;
- active state;
- scripts;
- adapters;
- cache;
- PACT maintenance templates.

PACT templates govern:

```txt
/ai/pact
```

### /ai/docs

`/ai/docs` is reserved for SPARC-generated human-readable project truth for the
actual project being developed.

It must not contain:

- PACT workflow;
- hooks;
- agent rules;
- task state;
- scripts;
- adapters;
- cache;
- raw evidence.

This package leaves `/ai/docs` empty.

### /ai/raw

`/ai/raw` is reserved for raw source material and evidence.

Raw material is not accepted project truth by itself.

This package leaves `/ai/raw` empty.

## PACT Layout

```txt
/ai/pact
  PACT.md
  PACT-MANIFEST.md
  INSTALL.md
  workflow/
    WORKFLOW.md
  agents/
    AGENTS.md
    NICKNAMES.md
    hooks/
    skills/
    souls/
    workers/
  templates/
  context/
    IDEAS.md
    shapes/
    state/
      LOGIC-DRAFT.md
      TASKS.md
      STATE.md
  scripts/
  adapters/
  cache/
```

## Wiki-Core Index

PACT core files are plain Markdown notes and should be navigable in Markdown
readers, GitHub, and other wiki-like tools.

Core package files:

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

PACT maintenance templates:

- [templates/workflow.tpl.md](templates/workflow.tpl.md)
- [templates/hook.tpl.md](templates/hook.tpl.md)
- [templates/cache-run.tpl.md](templates/cache-run.tpl.md)
- [templates/agents.tpl.md](templates/agents.tpl.md)
- [templates/agent-nicknames.tpl.md](templates/agent-nicknames.tpl.md)
- [templates/skill.tpl.md](templates/skill.tpl.md)
- [templates/agent-soul.tpl.md](templates/agent-soul.tpl.md)
- [templates/sub-agent.tpl.md](templates/sub-agent.tpl.md)
- [templates/ideas.tpl.md](templates/ideas.tpl.md)
- [templates/shape.tpl.md](templates/shape.tpl.md)
- [templates/logic-draft.tpl.md](templates/logic-draft.tpl.md)
- [templates/tasks.tpl.md](templates/tasks.tpl.md)
- [templates/state.tpl.md](templates/state.tpl.md)

Local reader configuration does not create PACT authority and should remain
untracked.

## Generated Targets And Templates

The wiki-core index lists package docs, generated target files, and templates.

`PACT.md`, `PACT-MANIFEST.md`, and `INSTALL.md` are specification-level files.
They are not generated target files and do not have template mappings.

In this specification package, generated target files may be active followable
targets or seeds with `metadata-only`, `current-data`, or `current-state`
content status.

In a real project, agents follow generated target files after those files are
created, updated, or shipped with active followable content.

Templates in `/ai/pact/templates` are used to create or update installed
generated target files and templated cache artifacts.

Templates do not replace the installed files they describe.

`*.tpl.md` files are immutable template contracts.

Agents may read templates and apply their rules to generated target files and
templated cache artifacts.

Agents must not edit, rename, delete, or create template files during normal
PACT operation.

If a template is missing or appears incorrect, agents must report the issue and
request template-maintainer action instead of changing the template.

Generated files and templated cache artifacts are the target paths in the
mapping below.

Templates are not generated files.

Metadata-only seed target files must not copy template rules or examples.

Rules and full target examples stay in `/ai/pact/templates/*.tpl.md`.

Active generated target files such as `AGENTS.md` and `WORKFLOW.md` may ship
with followable content when they are needed as immediate agent entry points.

When a real project requests a generated target file, create or update the
whole target file from the matching template.

When changing a generated PACT target file or creating a templated cache
artifact, use the mapping below to choose the matching template, apply the
template rules, and write the result to the target path.

## Template Mappings

```txt
workflow.tpl.md         -> /ai/pact/workflow/WORKFLOW.md
hook.tpl.md             -> /ai/pact/agents/hooks/[Hook].md
cache-run.tpl.md        -> /ai/pact/cache/runs/YYYY-MM-DDTHH-MM-SSZ--slug/CACHE.md
agents.tpl.md           -> /ai/pact/agents/AGENTS.md
agent-nicknames.tpl.md  -> /ai/pact/agents/NICKNAMES.md
skill.tpl.md            -> /ai/pact/agents/skills/[Skill].md
agent-soul.tpl.md       -> /ai/pact/agents/souls/[AI]-[Slug].md
sub-agent.tpl.md        -> /ai/pact/agents/workers/[WorkerName].md
ideas.tpl.md            -> /ai/pact/context/IDEAS.md
shape.tpl.md            -> /ai/pact/context/shapes/YYYY-MM-DD-[Shape-Slug].shape.md
logic-draft.tpl.md      -> /ai/pact/context/state/LOGIC-DRAFT.md
tasks.tpl.md            -> /ai/pact/context/state/TASKS.md
state.tpl.md            -> /ai/pact/context/state/STATE.md
```

Scripts and adapters are freeform support artifacts in this package. They do
not have canonical template mappings unless a project defines local ones.

Cache-run manifests are templated cache artifacts. They are not installed
generated PACT target files and do not use `content_status`.

Root-level and vendor-specific agent instruction files such as `AGENTS.md`,
`CLAUDE.md`, `GEMINI.md`, `CODEX.md`, `.cursor/rules/*`, and `.windsurfrules`
are legacy discovery bridges when created by an installer. They should point to
`/ai/pact/agents/AGENTS.md`; they are not generated PACT targets and are not
separate PACT rule authorities.

## Startup Sequence

This is the canonical PACT startup sequence.

Default agent startup:

1. Locate `/ai`.
2. Read `/ai/pact/agents/AGENTS.md`.
3. Read `/ai/pact/PACT.md`.
4. Read `/ai/pact/PACT-MANIFEST.md`.
5. Read `/ai/pact/workflow/WORKFLOW.md`.
6. Read `/ai/pact/context/IDEAS.md` for future project ideas.
7. Locate the SPARC folder or attached binding root when project truth is
   needed.
8. Read `SPARC.md` at the SPARC folder or binding root before creating or
   changing project-truth docs.
9. If a real project is attached, read SPARC-generated project truth in
   `/ai/docs`.
10. Read `/ai/pact/context/state/STATE.md`.
11. If state is active, blocked, or handoff, resume, unblock, or hand off the
   active task.
12. If state is clear, read `/ai/pact/context/state/TASKS.md`.
13. At work-session start, follow cache rules in
   `/ai/pact/workflow/WORKFLOW.md`: inspect the latest cache run, create or
   refresh `/ai/pact/cache/runs/YYYY-MM-DDTHH-MM-SSZ--slug/CACHE.md` from
   `/ai/pact/templates/cache-run.tpl.md`, and record the current input basis.

## Non-Goals

This manifest must not define:

- project business logic;
- accepted project truth;
- app structure;
- design tokens;
- runtime implementation code;
- hidden memory.

Those concerns belong to their responsible layer.
