# PACT 2.0

Title: improved workflow and project syncronization

updated: 2026-10-14 06:23:51 UTC+00:00
status: prepared for release

PACT 2.0 makes coordination policy portable through template RULES and full
EXAMPLE sections, with synchronized installed entry files and migration guidance.

- Roles are Prime, Lead, and Worker. Prime's Architect and Inspector functions
  share High capability and may use the same or different models. Lead hires
  Workers for needed specialties and chooses adequate capability per task.
- Model tiers are High, Middle, and Light. Effort uses percentages with explicit
  provider mappings; existing owner model/native-effort bindings are preserved.
- The package manifest indexes protocol files and template routes. TASKS/STATE
  hold real assignments; neither the manifest nor a project MAP is a live roster.
- Every spawned agent receives explicit parent-issued boundaries and knows its
  role, parent and capability tier. Descendants inherit effective limits, may
  narrow them, and need parent approval to widen; methods remain autonomous
  inside the fence. Existing TASKS/STATE preserve the contract on recovery.
- Ready briefs, bounded recovery, and resume guidance preserve ownership.
  Acceptance checks every required result on the candidate before a separate
  authorized merge. Records distinguish changed truth from verified unchanged
  SPARC contracts, and tests/logs remain proportionate to the work.
- keep-alive.tpl.md generates the shared parent-level KEEP-ALIVE.md. Sibling
  projects follow the same host registry/pointers for ports and startup
  dependencies; live files remain locally Git-excluded.
- Hook examples include boundaries and activation status. Portable Markdown
  contracts remain distinct from installed host execution and schedules.
- Fresh installation initializes empty state; upgrades preserve project work.
  Reusable role examples are optional, with no mandatory fixed worker team.
- Task transfer preserves exact bounded briefs, scope, reservations, validation,
  and relevant tests/baseline evidence for restart. Missing essential older
  instructions must be recovered from project evidence or explicitly blocked.
- Next-gate preparation during Prime absence is planning only; the current
  candidate and execution state remain intact until acceptance and Prime
  advancement. Planning uses the existing cache, not another state-file type.
- Correction tracking is optional (`worker_fix_target: none` on fresh installs).
  Enabled upgrade settings remain enabled. Count reviewed tasks once and only
  material original-brief corrections; one gate aggregate guides routing and
  does not block acceptance. Ordinary task/validation evidence remains required.
- External KEEP-ALIVE metadata follows its own template; installed PACT-target
  metadata does not apply. Record checks follow the real target project's
  binding/log policy and contain no source-repository-specific exemption.

- Standalone owner shortcuts preserve continue/status/handoff intent with
  whitespace tolerance; handoff reuses existing STATE/task/cache records.
- KEEP-ALIVE has a FOR project index and per-project path/description metadata;
  service commands, ports, pointers and local exclusions are preserved.
- Populated IDEAS examples use current status; shaping stays optional and only
  selected draft intent can become tasks. Hook examples name their illustrative
  target, and the manifest groups hook contracts separately from core files.

## Template Versions

Package and template versions are independent. Unlisted templates retain their
existing versions; no unrelated contract change is required for this release.

| Template | Version |
|---|---|
| workflow.tpl.md | 3.2 |
| agents.tpl.md | 3.3 |
| sub-agent.tpl.md | 2.1 |
| state.tpl.md | 1.6 |
| tasks.tpl.md | 1.10 |
| logic-draft.tpl.md | 1.5 |
| hook.tpl.md | 1.3 |
| keep-alive.tpl.md | 1.1 |
| ideas.tpl.md | 1.2 |

## Migration

Follow [INSTALL](INSTALL.md#sync-existing-installations) for field and
filename renames, tier/effort mapping, profile refresh, and state preservation.
An existing model binding is not silently replaced by a template default.
No SPARC schema or project-truth contract change is required by these workflow
changes. SPARC remains a separately resolved compatible binding.

## Validation

Release validation is recorded in this repository's TASKS.md. The distributable
uses fresh state instead of that maintenance history. Host-specific hooks and
services require verification on the installation host.
