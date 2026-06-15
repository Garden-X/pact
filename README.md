# PACT

**PACT** means **Protocol for Agent Coordination and Tasks**.

PACT is a project-maintenance specification for AI-assisted development.

It gives agents and developers a stable way to coordinate work: orientation,
workflow, hooks, task state, handoffs, validation, and maintenance templates.

Core distinction:

```txt
SPARC purpose = project truth.
PACT purpose  = project maintenance.
```

SPARC describes what the project is and what it should become. PACT describes
how agents maintain the project while work is happening.

## Source Repositories

- PACT: [Garden-X/pact](https://github.com/Garden-X/pact)
- SPARC: [Garden-X/sparc](https://github.com/Garden-X/sparc)

PACT expects a SPARC `01.00`-compatible project-truth binding or newer. In a
PACT-managed Agent OS, SPARC-generated live project-truth docs are mounted
under `/ai/docs`.

## Why PACT Exists

AI-assisted projects need more than code and documentation. They need a shared
maintenance layer that tells agents where they are, what is active, which files
are reserved, how work resumes, and how changes stay inside the right boundary.

PACT keeps that maintenance layer explicit and file-based.

## What PACT Provides

- Agent orientation rules.
- Workflow lifecycle rules.
- Hook, skill, soul, and worker structure.
- Future project idea context for agents and souls.
- Shape, draft, task, and active-state files.
- Handoff and recovery conventions.
- Maintenance templates for PACT files.
- Clear boundaries between project truth and project maintenance.

## Repository Shape

```txt
README.md
ai/
  sparc/
  pact/
  docs/
  raw/
```

`ai/` is the AI-related container folder.

`ai/sparc/` is reserved for the SPARC package or binding used by PACT as the
project-truth standard. It is intentionally empty in this specification
package.

`ai/pact/` contains PACT project-maintenance files: specification, manifest,
install notes, workflow, hooks, agent rules, state, scripts, adapters, cache,
and maintenance templates.

`ai/docs/` is reserved for SPARC-generated human-readable project truth for
the actual project being developed. It is intentionally empty in this package.

`ai/raw/` is reserved for source material and evidence. It is intentionally
empty in this package.

## Repository Contents

| Path | Purpose |
|---|---|
| [ai/pact/PACT.md](ai/pact/PACT.md) | Entry point for the PACT specification |
| [ai/pact/PACT-MANIFEST.md](ai/pact/PACT-MANIFEST.md) | Package manifest and wiki-core index |
| [ai/pact/INSTALL.md](ai/pact/INSTALL.md) | Installation and verification notes |
| [ai/pact/workflow/WORKFLOW.md](ai/pact/workflow/WORKFLOW.md) | Canonical maintenance workflow |
| [ai/pact/agents/AGENTS.md](ai/pact/agents/AGENTS.md) | General agent rules |
| [ai/pact/agents/NICKNAMES.md](ai/pact/agents/NICKNAMES.md) | Agent nickname and soul slug registry |
| [ai/pact/context/IDEAS.md](ai/pact/context/IDEAS.md) | Future project ideas for agents and souls |
| [ai/pact/context/state/LOGIC-DRAFT.md](ai/pact/context/state/LOGIC-DRAFT.md) | Selected maintenance logic state |
| [ai/pact/context/state/TASKS.md](ai/pact/context/state/TASKS.md) | Pending and done maintenance task state |
| [ai/pact/context/state/STATE.md](ai/pact/context/state/STATE.md) | Active execution cursor |
| [ai/pact/templates/](ai/pact/templates/) | PACT maintenance templates |

## Wiki-Core Use

PACT is a plain Markdown wiki-core package.

The repository root may be opened in any Markdown knowledge base or editor.
Local reader configuration remains untracked. PACT authority remains in the
Markdown files.

Use [ai/pact/PACT-MANIFEST.md](ai/pact/PACT-MANIFEST.md) as the package index
when navigating the package.

## PACT Maintenance Templates

PACT templates live in:

```txt
/ai/pact/templates
```

They are used when changing generated PACT target files, for example workflow
rules, hooks, agent rules, skills, workers, souls, nicknames, shape files, or
state files.

In a real project, agents follow generated PACT target files after those files
are created or updated from templates. Templates are not the active workflow,
agent, or state files themselves.

`*.tpl.md` files are immutable template contracts. Agents may read them and
apply them to generated target files, but agents must not edit, rename, delete,
or create template files during normal PACT operation.

In this specification package, generated target files may be active followable
targets or seeds with `metadata-only`, `current-data`, or `current-state`
content status. `AGENTS.md` and `WORKFLOW.md` ship as canonical current-data
entry points so agents can start without generating their own rules first.

PACT templates follow a similar sectioned structure:

```txt
META
WHAT
FOR
RULES
EXAMPLE
```

SPARC templates govern project-truth files in `/ai/docs`.
PACT templates govern project-maintenance files in `/ai/pact`.

## Start Reading

For the current PACT specification package, read:

- [ai/pact/PACT-MANIFEST.md](ai/pact/PACT-MANIFEST.md)
- [ai/pact/PACT.md](ai/pact/PACT.md)
- [ai/pact/workflow/WORKFLOW.md](ai/pact/workflow/WORKFLOW.md)
- [ai/pact/agents/AGENTS.md](ai/pact/agents/AGENTS.md)
- [ai/pact/context/IDEAS.md](ai/pact/context/IDEAS.md)

For SPARC project-truth rules, use the SPARC package or binding attached to the
target project.

## License

PACT is licensed under the [Apache License 2.0](LICENSE).

You may use, modify, and redistribute PACT under the license terms. Keep the
[NOTICE](NOTICE) attribution, including the source repository link.
