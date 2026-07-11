# PACT INSTALL

> For: PACT
> Purpose: install or verify the PACT project-maintenance layer
> Updated: 2026-07-11 10:13:59 UTC+00:00

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
owner declares a local clone or working tree, such as `C:\!DEV\2026\sparc`, as
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
- [ ] Agents treat `/ai/pact/agents/AGENTS.md` as a binding agent rules file
      equivalent in role to native agent configuration files.
- [ ] Native agent instruction bridge files exist when required by the target
      agent runtime, and they point to `/ai/pact/agents/AGENTS.md`.
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

## Forbidden Content

Do not put PACT workflow, hooks, agents, state, scripts, adapters, cache, or
maintenance templates into `/ai/docs`.

Do not put SPARC-generated project truth into `/ai/pact`.

Do not put raw source material into `/ai/docs`.
