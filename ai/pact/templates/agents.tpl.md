# agents.tpl.md

## META

name: agents.tpl.md
type: pact maintenance template
for: AGENTS.md
updated: 2026-07-12 18:15:00 UTC+00:00
version: 2.9

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

It tells agents how to route project-truth work through the responsible SPARC
live contract and governing template, including typed schema work through
`SCHEMA.ts` and `app-schema.tpl.md`.

It tells agents how to treat project companion contracts and examples without
importing project-specific policy into PACT core.

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
- require project-truth work to use the SPARC truth map for behavior,
  structure, schema/data shape, design, platform, and accepted history
  contracts;
- require agents to expose conflicts between owner instructions, PACT
  maintenance state, SPARC project truth, and project companion files before
  acting;
- forbid silent rewrites of canonical docs;
- identify project companion file types and naming patterns such as
  `*contract*.*`, `*plan*.md`, `*schema*.*`, `*sample*.*`, and
  `*snapshot*.*` as optional project or PACT companions, not SPARC core
  contracts;
- treat examples and reference folders as evidence, not automatic payloads;
- require agents to pass only relevant slices of large contracts, schemas,
  examples, or datasets unless the owner asks for the full material;
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
- distinguish `host_skill` from `pact_skill` and point skill update logging to
  the `WORKFLOW.md` skill log rule;
- name project engineering conventions as a `pact_skill`, canonically
  `Code-Conventions.md`, rather than as agent rules or project truth;
- require verified-UTC stamping per the canonical `Time-Normalization.md`
  skill: check the local clock against a trusted network source at least
  once per session before writing stamps or date-bearing filenames, and
  annotate entries when verification was impossible;
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
generated_from: /ai/pact/templates/agents.tpl.md
generated_from_version: 2.8
content_status: current-data
purpose: Orient agents inside the `/ai` container and keep SPARC project truth separate from PACT project maintenance.
updated: YYYY-MM-DD HH:mm:ss UTC+00:00

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

## Update Stamps

Maintained PACT Markdown files use a privacy-safe freshness stamp:

```txt
updated: YYYY-MM-DD HH:mm:ss UTC+00:00
```

Refresh `updated` when meaningful Markdown content changes. Do not use local
timezone names, IANA timezone names, city names, or other location-bearing
timezone labels.

Stamps must come from a verified UTC source: check the local clock against a
trusted network time source at least once per session before stamping. On
skew, stamp from the verified source and report to the owner; when
verification is impossible, the affected entry must say so. Procedure:
[skills/Time-Normalization.md](skills/Time-Normalization.md).

## Project Truth Discipline

Owner instructions may authorize work, but accepted project truth belongs in
the responsible SPARC live contract under `/ai/docs`.

PACT files coordinate maintenance. They must not become the durable source for
app behavior, structure, data shape, design rules, platform rules, or accepted
change history.

If owner instructions, PACT state, SPARC docs, project companion files, or
native agent instruction files conflict, expose the conflict before acting.

Do not silently rewrite canonical docs. Update the responsible live contract
for the truth that changed, and keep PACT changes inside `/ai/pact`.

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

## Schema Work

When work touches persistence, migrations, data contracts, dataset schemas,
public schema views, or cross-application data references, read the relevant
SPARC typed schema contract:

```txt
<docs-root>/<app-name-en>/schema/SCHEMA.ts
```

PACT may track the task, cache, validation, and handoff. It does not own
accepted schema truth.

## Companion Contracts And Examples

Projects may include companion files identified by type or naming pattern, such
as `*contract*.*`, `*plan*.md`, `*schema*.*`, `*sample*.*`, or
`*snapshot*.*`; local planning contracts; strict examples; payload samples; or
schema samples.

Read those files when relevant, but do not treat them as SPARC core contracts
or let them silently override SPARC project truth.

Examples and reference folders are evidence. Do not resend or copy full
examples, large schemas, or datasets by default. Pass the relevant slice needed
for the current step unless the owner asks for the full material.

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
project-truth files.

## File Naming

Required/core Markdown files must exist and use uppercase filenames.

Optional artifacts may exist only when needed and use their local naming
pattern.

## Startup

Follow the canonical startup sequence in
[../PACT-MANIFEST.md](../PACT-MANIFEST.md).

Resolve the SPARC folder or binding root and read `SPARC.md` before creating
or changing project-truth files.

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

Skills are `host_skill` (owned by the agent host, IDE, or runtime, outside
`/ai/pact`) or `pact_skill` (owner-added or PACT-extracted, under
`/ai/pact/agents/skills`).

Skill update logging is debug-only and governed by the `## Skill Log` rule in
`WORKFLOW.md`. Never write skill update entries in production mode.

Project engineering conventions, such as code style, file-chunking limits, and
docs-first sequencing, are recorded as a `pact_skill`, canonically
`Code-Conventions.md`, not as agent rules or project truth.

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
