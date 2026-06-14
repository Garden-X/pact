# PACT INSTALL

> For: PACT 02
> Purpose: install or verify the PACT project-maintenance layer

## Purpose

Installation means creating or verifying the PACT maintenance environment under
`/ai/pact` and binding SPARC when project-truth docs are needed.

Core distinction:

```txt
SPARC purpose = project truth.
PACT purpose  = project maintenance.
```

Installing PACT does not create project-truth docs by itself.

## SPARC Binding

`/ai/sparc` is reserved for the SPARC package or binding used by PACT.

This specification package tracks `/ai/sparc` as an empty folder.

Before creating or changing project-truth docs, attach or resolve a real SPARC
package or compatible project-truth binding.

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

## Docs And Raw

`/ai/docs` is reserved for SPARC-generated project truth for the actual target
project.

PACT installation does not populate `/ai/docs`.

`/ai/raw` is reserved for raw source material and evidence.

PACT installation does not populate `/ai/raw`.

## PACT Maintenance Templates

PACT templates are used when maintaining generated PACT target files.

`*.tpl.md` files are immutable template contracts.

Agents may read templates and apply them to generated target files.

Agents must not edit, rename, delete, or create template files during normal
PACT operation.

If a template is missing or appears incorrect, agents must report the issue and
request template-maintainer action instead of changing the template.

Use the matching template before creating or changing generated target files:

- workflow files;
- hook files;
- skill files;
- agent rules;
- nickname files;
- soul files;
- worker files;
- future ideas;
- shape files;
- draft logic;
- tasks;
- active state.

In this specification package, generated target files are metadata/current-data
seeds. They must not copy template rules or examples.

PACT templates must follow:

```txt
META
WHAT
FOR
RULES
EXAMPLE
```

## Validation Checklist

- [ ] `/ai/sparc/` exists as the reserved SPARC folder.
- [ ] `/ai/pact/PACT.md` exists.
- [ ] `/ai/pact/PACT-MANIFEST.md` exists.
- [ ] `/ai/pact/workflow/WORKFLOW.md` exists.
- [ ] `/ai/pact/agents/AGENTS.md` exists.
- [ ] `/ai/pact/templates/*.tpl.md` contains the required PACT templates.
- [ ] Agents treat `/ai/pact/templates/*.tpl.md` as immutable.
- [ ] Generated target files contain metadata/current data only.
- [ ] `/ai/pact/context/IDEAS.md` exists.
- [ ] `/ai/pact/templates/ideas.tpl.md` exists.
- [ ] `/ai/pact/templates/shape.tpl.md` exists.
- [ ] `/ai/pact/context/state/LOGIC-DRAFT.md` exists.
- [ ] `/ai/pact/context/state/TASKS.md` exists.
- [ ] `/ai/pact/context/state/STATE.md` exists.
- [ ] `/ai/docs` contains no PACT files.
- [ ] `/ai/raw` contains no accepted project truth.
- [ ] PACT core Markdown links resolve from `PACT-MANIFEST.md` when checked by
      a Markdown link checker or opened in a Markdown wiki reader.
- [ ] The repository root can be opened as a Markdown wiki or Obsidian vault.
- [ ] Hooks that use scripts expose those scripts through hook files and
      `WORKFLOW.md`.

## Forbidden Content

Do not put PACT workflow, hooks, agents, state, scripts, adapters, cache, or
maintenance templates into `/ai/docs`.

Do not put SPARC-generated project truth into `/ai/pact`.

Do not put raw source material into `/ai/docs`.
