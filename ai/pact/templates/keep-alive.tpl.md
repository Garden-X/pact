# keep-alive.tpl.md

## META

name: keep-alive.tpl.md
type: pact maintenance template
for: KEEP-ALIVE.md
updated: 2026-10-26 01:31:28 UTC+00:00
version: 1.2

## WHAT

`KEEP-ALIVE.md` is a host-local operational registry shared by projects that
use the same host port pool. It records service ports, startup dependencies,
launch commands, and profile functions so sibling projects can run together.
Its FOR index lists those projects, with a small operational metadata block for
each absolute project folder and links to its registered services and commands.

It is operational configuration, not SPARC project truth or PACT task state.

## FOR

Default generated target:

```txt
<project-root>/../KEEP-ALIVE.md
```

Keep this template inside `/ai/pact/templates`. Keep the generated registry
one directory above the working project, outside that project's folder.
Sibling projects read and update the same registry.

Nested projects, worktrees, and projects in another workspace directory must
resolve the existing shared registry through an explicit `keep_alive_registry`
path in `WORKFLOW.md` or a parent-level `KEEP-ALIVE.md` pointer. A pointer
contains the canonical registry path, optional freshness metadata, and
discovery instructions. It
must not contain a second port table or independently maintained commands.

If projects on the same host already share a registry, preserve that shared
port pool rather than creating competing registries at different depths.

## RULES

### Naming And Discovery

- Use exactly `keep-alive.tpl.md` for the template and `KEEP-ALIVE.md` for
  the generated registry or a pointer.
- Resolve the project root and check its parent for `KEEP-ALIVE.md` before
  choosing ports or starting services. Follow a pointer to its canonical
  registry and detect missing targets or pointer cycles.
- An explicit project binding may resolve an existing shared registry when
  the parent is a worktree container or a nested project directory. Record
  the resolved canonical path in `WORKFLOW.md`.
- When migrating an existing registry, verify the resolved source and
  destination first. Preserve all service entries, startup dependencies,
  profile functions, raw commands, port reservations, and recorded checks.
  Update references to the canonical path; do not leave a duplicate port
  registry behind.

### Required Content

The canonical registry must contain:

- metadata with `name`, `canonical_location`, `port_scope`,
  `generated_from`, `generated_from_version`, and a verified UTC `updated`
  stamp;
- one `## FOR` project index pointing to the per-project metadata blocks;
- each project's `for:` absolute folder, short operational `description:`,
  registered `service_aliases:` or `none`, and command/dependency references
  when needed. Group services by their existing project folders; a nested
  project or separate launcher may have its own entry;
- each service's unique `dev-*` alias, project name, absolute project or
  launcher path, ports or `none`, raw command, startup dependencies or
  `none`, profile function, and check status;
- port reservations and known conflicts, including services that are
  stopped or blocked;
- the concrete profile functions and raw commands, with the working
  directory and startup order visible.

Existing registries may keep their established tables and command sections
when all required information is discoverable. Do not rewrite working
commands merely to change presentation.

The shared container has no PACT `layer`, `status`, or `content_status`, and
no single-project `for:` value. The small per-project blocks are navigation
metadata, not model bindings, active assignments, or accepted product truth.
Keep ports, startup order, profiles, raw commands, and verification at their
existing authoritative locations; link them rather than copying conflicting
values into the index. Preserve historical entries and describe a missing
folder honestly; an index edit does not authorize removing its reservations.

### Port And Startup Coordination

- Assign ports against the entire canonical registry. Check reservations
  and listeners before assigning a new port; a stopped service's reserved
  port remains reserved.
- Register a new service, its dependencies, and its launch command before
  the first start. Use its registered ports and the owner's keep-alive
  launcher when starting it.
- Follow the owner's instructions and `WORKFLOW.md` for service lifecycle
  actions. Registry maintenance alone does not authorize stopping processes,
  replacing profile functions, installing runtimes, or starting services.
- Store no credentials, private keys, or tokens in this registry. Reference
  the existing local secret mechanism by path or name when required.

### Local Git Exclusion

- The generated registry and pointers are host-local files. Keep them out
  of project commits with exact path entries in each owning repository's
  local `.git/info/exclude`, including linked-worktree Git paths where
  applicable. Resolve repository ownership and its Git information path
  before writing exclusions.
- A registry outside every repository needs no Git exclusion. Record that
  result rather than inventing an owning repository.
- Exclude only the live `KEEP-ALIVE.md` path or pointer. Never exclude
  `keep-alive.tpl.md`, the templates directory, or a broad name pattern that
  would hide the template. Do not add host-local exclusions to tracked
  `.gitignore` files.
- If a live registry is already tracked, report its tracked status before
  changing Git tracking; a local exclude does not untrack it.

### Verification

- Validate edited launcher/profile blocks with the parser for their declared
  shell/language, without executing them. For example, PowerShell uses
  `System.Management.Automation.Language.Parser.ParseInput`; this example
  does not require that shell on another host. Report pre-existing errors
  separately.
- Check reference resolution, service entry preservation, port conflicts,
  and local Git exclusion. Do not execute profile functions just to parse
  them.
- Give check results their actual scope: syntax checks prove syntax;
  builds, port probes, and service checks require separate evidence.
  Use `Not run` when runtime verification was not performed. Preserve the
  dates and scope of older verification records.

## EXAMPLE

The host paths, PowerShell profile and launchers below are illustrative; the
portable requirements are registry resolution, unique service coordinates,
startup dependencies and preservation. They impose no operating system.

````md
# KEEP-ALIVE.md

## META

name: KEEP-ALIVE.md
canonical_location: C:\workspace\KEEP-ALIVE.md
port_scope: shared local host services
generated_from: /ai/pact/templates/keep-alive.tpl.md
generated_from_version: 1.2
updated: YYYY-MM-DD HH:mm:ss UTC+00:00

## FOR

| Project | Folder |
|---|---|
| [example-app](#project-example-app) | `C:\workspace\example-app` |
| [notes-app](#project-notes-app) | `C:\workspace\notes-app` |

## Project Metadata

### Project: example-app

for: C:\workspace\example-app
description: Local application development server.
service_aliases: dev-example
commands: [raw command](#example-app-commands); [profile function](#profile-functions)
dependencies: Installed system Node and existing project dependencies.

### Project: notes-app

for: C:\workspace\notes-app
description: Sibling project's local development server.
service_aliases: dev-notes
commands: [raw command](#notes-app-commands); [profile function](#profile-functions)
dependencies: Installed system Node and existing project dependencies.

## Services

| Alias | Project | Path | Ports | Raw command | Dependencies | Profile function | Check status |
|---|---|---|---|---|---|---|---|
| `dev-example` | example-app | `C:\workspace\example-app` | 4200 | `npm run dev -- --port 4200 --strictPort` | Installed system Node and existing dependencies | `dev-example` below | Not run; illustrative registration |
| `dev-notes` | notes-app | `C:\workspace\notes-app` | 4201 | `npm run dev -- --port 4201 --strictPort` | Installed system Node and existing dependencies | `dev-notes` below | Not run; illustrative registration |

## Profile Functions

The referenced launcher opens the service using the owner's keep-alive
convention; its behavior must be documented before use.

```powershell
function dev-example {
    & 'C:\dev-tools\example-app\start.ps1'
}
function dev-notes {
    & 'C:\dev-tools\notes-app\start.ps1'
}
```

## Raw Commands

### example-app commands

```powershell
Set-Location -LiteralPath 'C:\workspace\example-app'
npm run dev -- --port 4200 --strictPort
```

### notes-app commands

```powershell
Set-Location -LiteralPath 'C:\workspace\notes-app'
npm run dev -- --port 4201 --strictPort
```

## Reservations And Conflicts

4200 is reserved for `dev-example`; 4201 for `dev-notes`.
Runtime and conflict checks: Not run.
````

Pointer example for another project container on the same host:

```md
# KEEP-ALIVE.md

canonical_registry: C:\workspace\KEEP-ALIVE.md

Read and update the canonical registry above before choosing ports or
starting services. This pointer contains no independent port table.
```
