# PACT 2.0

Title: improved workflow and project syncronization

updated: 2026-10-15 01:23:13 UTC+00:00
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
- One authority hierarchy works in single- and multi-harness deployments.
  Prime owns the gate, Lead the slice, Worker the task; Architect, Inspector,
  Coordinator, Watchdog and Executor are operational functions, not roles.
  Model, tier, role, function and harness stay separate, and crossing a harness
  neither resets nor widens inherited boundaries. A single harness keeps the
  Lead layer, with Lead also acting as Watchdog for its Workers.
- Wakes are event-first with heartbeat fallback. Workers report to Lead; Lead
  wakes Prime only for `escalation` or an explicit `ready` candidate, recorded
  first in STATE's optional Gate Handoff block. Message delivery is not the
  source of truth, and readiness is never inferred from idle Workers, empty
  records or time. The Prime heartbeat becomes a rare recovery fallback.
- Lead is the only Gate Handoff writer; each published `gate_id` + `seq`
  revision is immutable and any material change is the next `seq`. Prime
  records decisions where the affected authority lives (boundary approvals in
  the task's boundary_contract, gate scope/acceptance in LOGIC-DRAFT) through
  record-only, non-force commits with a `PACT-Answers` trailer, answering only
  the newest revision. Lead owns mutable execution state; Prime's writes are
  narrow authority-decision entries. Acceptance names the exact candidate; the
  delivered tip may differ from it only in PACT state records. GateClose makes
  the acceptance answer durable on the gate branch before it fast-forwards the
  default branch. Accepted is not delivered: an `accepted` answer stays
  recoverable Prime work until its commit is reachable from the default
  branch; PrimeWatch and the Prime heartbeat wake for that pending delivery
  once per key, and GateClose recovers it without rerunning acceptance.
- The optional role-less PrimeWatch host hook observes the durable handoff
  across harnesses and wakes Prime once per handoff key or stable incident key.
  It has no Prime or Lead authority; dedup memory and schedules stay host-owned.
- Harness interoperability without absorption: an optional assignment
  `requires` names minimum runtime capabilities (separate from tiers and
  authority; unmet means blocked or escalated); host-native enforcement may
  narrow but never widen the boundary_contract; session and evidence references
  may be opaque. Transport, auth, sandbox and artifact schemas stay outside PACT.
- Capability is selected for the assignment and authority by the role/function
  contract. `lead_tier` and `worker_tier_default` are routing hints: Lead,
  Worker, and Watchdog assignments may use Light, Middle, or High (a Watchdog
  also a non-model script) without any change in authority.
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
| workflow.tpl.md | 3.4 |
| agents.tpl.md | 3.4 |
| sub-agent.tpl.md | 2.2 |
| state.tpl.md | 1.8 |
| tasks.tpl.md | 1.11 |
| logic-draft.tpl.md | 1.6 |
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
