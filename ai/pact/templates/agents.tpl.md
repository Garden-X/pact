# agents.tpl.md

## META

name: agents.tpl.md
version: 2.0
type: pact maintenance template
for: AGENTS.md

## WHAT

`AGENTS.md` is the canonical agent-facing rules and orientation file for PACT.

It tells agents how to locate SPARC, PACT, docs, raw material, workflow, state,
and templates.

It states that agents must follow PACT for project maintenance and SPARC for
project truth.

It names the required lookup folders and entry files for PACT and SPARC.

It is equivalent in role to native agent instruction files such as `AGENTS.md`,
`CLAUDE.md`, `GEMINI.md`, or other agent setup files.

It tells agents how to keep PACT agent rules synchronized with native or
vendor-specific agent instruction files.

It treats root-level and vendor-specific agent instruction files as legacy
discovery bridges, not as competing PACT rule authorities.

## FOR

Target path:

```txt
/ai/pact/agents/AGENTS.md
```

Use this template when creating or changing the general rules for all agents.

## RULES

`AGENTS.md` must:

- define the SPARC project-truth and PACT project-maintenance boundary;
- state that `AGENTS.md` is a binding agent rules file, not optional
  documentation;
- state that agent runtimes should treat `AGENTS.md` as equivalent in role to
  native agent instruction or configuration files;
- require agents to discover native or vendor-specific agent instruction files
  when installing or changing agent rules;
- identify root-level and vendor-specific agent instruction files as legacy
  discovery bridges kept for backward compatibility with agent runtimes;
- require native or vendor-specific agent instruction files to point to
  `/ai/pact/agents/AGENTS.md` instead of duplicating PACT rules by default;
- require agents to expose conflicts when another agent instruction file
  contradicts PACT authority;
- require agents to keep bridge files synchronized when PACT agent rule
  location or authority changes;
- state that agents must follow generated PACT target files for project
  maintenance after those files are created or updated from templates;
- state that agents must follow SPARC for project truth when project truth is
  needed;
- identify `/ai/pact` as the PACT maintenance folder;
- identify `/ai/pact/PACT.md` as the PACT specification entry file;
- identify `/ai/pact/agents/AGENTS.md` as the agent orientation entry file;
- identify `/ai/sparc` or the attached SPARC binding root as the SPARC folder;
- identify `SPARC.md` at the SPARC folder or binding root as the SPARC entry
  file;
- require agents to expose conflicts between PACT maintenance state and SPARC
  project truth;
- distinguish required/core files from optional artifacts;
- identify startup order;
- require agents and souls to read `IDEAS.md`;
- point agents to workflow and state files;
- identify shapes as pre-draft reasoning under `/ai/pact/context/shapes`;
- identify cache location, input-basis requirements, forbidden cache contents,
  and the workflow/template files that govern cache operation;
- link to agent skills when agent orientation, souls, or workers use skills;
- distinguish identity-level soul files from role-level worker files;
- define how remembered what/how behavior becomes a skill, soul update, worker
  update, all-souls rule, or hook;
- list hooks and script usage when hooks are registered;
- keep invariant PACT files discoverable with relative Markdown links;
- point to the wiki-core index in `PACT-MANIFEST.md`;
- explain template use for PACT maintenance;
- forbid PACT files in `/ai/docs`.

`AGENTS.md` must not:

- contain project-specific truth;
- replace SPARC;
- define permanent app behavior;
- store hidden memory;
- treat cache as source of truth;
- contradict `WORKFLOW.md`.

## EXAMPLE

```md
# AGENTS.md

## META

name: AGENTS.md
canonical_location: /ai/pact/agents/AGENTS.md
layer: PACT / agent orientation
status: canonical
purpose: Orient agents inside the `/ai` container and keep SPARC project truth separate from PACT project maintenance.

## Core Distinction

SPARC purpose = project truth.
PACT purpose = project maintenance.

## Agent Rule Authority

`/ai/pact/agents/AGENTS.md` is an agent rules file, not optional
documentation.

Treat this file as equivalent in role to native agent instruction files such as
root `AGENTS.md`, `CLAUDE.md`, `GEMINI.md`, or other agent setup files.

When a native agent configuration file exists, it should point agents to this
file instead of duplicating PACT rules.

Root-level and vendor-specific instruction files are legacy discovery bridges.
They exist so older or vendor-specific agent runtimes can find the canonical
PACT rules. They are not separate PACT authorities.

## Instruction Sync

When installing or changing agent rules, inspect native or vendor-specific
agent instruction files in the project, such as root `AGENTS.md`, `CLAUDE.md`,
`GEMINI.md`, `CODEX.md`, `.cursor/rules/*`, `.windsurfrules`, or other
owner-selected agent setup files.

Those files should stay minimal and point agents to
`/ai/pact/agents/AGENTS.md` for PACT maintenance rules.

Do not duplicate the full PACT rule set into multiple agent instruction files
unless the owner explicitly asks for duplication.

If another agent instruction file contradicts PACT authority, expose the
conflict before acting and update the bridge only with owner approval when the
conflict changes behavior.

When this file's location, authority, or required startup path changes,
synchronize the bridge files that point agents here.

Agents must follow PACT for project maintenance.

Agents must follow SPARC for project truth.

If PACT maintenance state conflicts with SPARC project truth, expose the
conflict before acting.

## Lookup Entries

PACT maintenance folder:

```txt
/ai/pact
```

PACT specification entry file:

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

If SPARC is attached as a binding outside `/ai/sparc`, use that binding root as
the SPARC folder.

SPARC entry file:

```txt
SPARC.md
```

Read `SPARC.md` at the SPARC folder or binding root before creating or changing
project-truth docs.

## File Naming

Required/core Markdown files must exist and use uppercase filenames.

Optional artifacts may exist only when needed and use their local naming
pattern.

## Startup

Follow the canonical startup sequence in
[../PACT-MANIFEST.md](../PACT-MANIFEST.md).

Resolve the SPARC folder or binding root and read `SPARC.md` before creating
or changing project-truth docs.

## Ideas

Ideas live in `/ai/pact/context/IDEAS.md`.

Ideas are future project context for agents and souls.

Ideas are not shapes, selected logic, tasks, or active state.

Keep `IDEAS.md` as project context entries. Do not fill it with template rules,
workflow rules, or agent instructions.

## Shapes

Shapes live under `/ai/pact/context/shapes`.

Shape files use `YYYY-MM-DD-[Shape-Slug].shape.md`.

`Shape-Slug` uses readable CapitalCase words separated by hyphens.

Shapes may inform `LOGIC-DRAFT.md`, but tasks must not derive directly from
shape files.

## Cache

Cache lives in `/ai/pact/cache`.

Use cache only for temporary session memory while working on an addon, a new
logic addition, or another active task.

Create cache by task run:

```txt
/ai/pact/cache/runs/YYYY-MM-DDTHH-MM-SSZ--slug/
```

Retained cache runs live under `/ai/pact/cache/retained/`. Do not create
topic cache folders such as `cache/sparc`, `cache/pact`, or `cache/docs`.

`CACHE.md` is the manifest, index, and pointer file for one cache run. It
should be created from `../templates/cache-run.tpl.md`. It does not replace
the folders that hold cache artifacts.

When creating `CACHE.md`, record the input basis: user prompts or owner
instructions, internet search queries and source pointers, `STATE.md`,
`TASKS.md`, input data, any `/ai/raw` example or dataset references, and any
other file, dataset, or project references outside `/ai/raw` needed to solve
the task.

Cache may hold session-scoped working material such as `raw-data/`, chunks,
retrieval notes, RAG artifacts, sandbox outputs, validation artifacts, and
decomposition traces.

Cache must not hold accepted project truth, permanent PACT instructions,
durable raw evidence that belongs in `/ai/raw`, project docs that belong in
`/ai/docs`, secrets, credentials, or hidden memory.

Distinguish cache `raw-data/` from `/ai/raw`. Cache `raw-data/` is disposable
session input. `/ai/raw` is the durable raw/evidence area outside cache.

Follow `WORKFLOW.md` for cache session refresh, previous-cache comparison,
promotion, retention, and cleanup.

## Wiki-Core Navigation

Use [../PACT-MANIFEST.md](../PACT-MANIFEST.md) as the package index.

## Skills

If agent orientation, soul files, or worker files use skills, link the skill
files from the files that use them:

- `/ai/pact/agents/skills/StructureReview.md`

When the owner asks to remember what or how to do something, classify the
scope before writing files. Ask whether it is for the current soul, all souls,
a worker, or a hook when scope is unclear.

If the remembered behavior is a lifecycle trigger or executable helper, update
`WORKFLOW.md` and create or update a hook under `/ai/pact/agents/hooks` when
needed.

## Hooks

Hook registration is maintained in `WORKFLOW.md`.

Hook files live under `/ai/pact/agents/hooks/[Hook].md`.
```
