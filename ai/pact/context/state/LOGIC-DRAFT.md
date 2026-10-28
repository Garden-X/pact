# LOGIC-DRAFT.md

## META

name: LOGIC-DRAFT.md
canonical_location: /ai/pact/context/state/LOGIC-DRAFT.md
layer: PACT / context / state
status: selected
owner_role: Prime
gate_id: PACT-Review-20261028
generated_from: /ai/pact/templates/logic-draft.tpl.md
generated_from_version: 1.7
content_status: current-state
updated: 2026-10-28 22:03:17 UTC+00:00

## Selected Logic

Prime selects the owner's request to review published PACT 2 work and correct demonstrated defects. The exact reviewed baseline is ac431f05c2f00836d7632244751d96f5daabf29d; no newer local or authoritative remote candidate was visible. Correct only the non-normative conformance evaluator's demonstrated interpretation defects and the release template-version table. Publish task candidates and the reviewed gate for review; default-branch merge, external rollout and protocol migration are not selected.

## Source / Evidence

- Owner: "перевір чи клод зробив ок. якщо треба виправ"; prior request to push when documentation is ready.
- Root fresh baseline: self-test 21, corpus 250/250, real Git 15, source 211 checks/165 links, migration 30 checks/11 preservation items; every actual exit 0.
- Six counterexamples failed before implementation (two reproduction commands, actual exits 1): valid Pending tilde fences rejected; fenced None treated as an empty Pending pool; closure and derive accept an unbound foreign remote; material indented handoff prose discarded; delivery permits an answer not descended from its candidate.
- Current RELEASE-NOTES Template Versions table disagrees with six actual template versions and its own release introduction.
- Local temporary reproductions: C:/!DEV/2026/pact/ai/pact/cache/runs/2026-10-28T21-59-18Z--pact2-owner-review/. Promote required cases and evidence to tracked conformance and task records; cache is not a cross-harness handoff.
- Reuse existing [PACT record/Git rules](../../PACT.md), [workflow](../../workflow/WORKFLOW.md), [GateClose](../../agents/hooks/GateClose.md), tracked conformance corpus and source-check. The older accepted review already fixes other cases and must remain preserved.

## Decisions

- Extend existing tests/cases before evaluator changes; preserve all original 250 inputs and expected results.
- Read Pending fences and visible None through the existing structural scanner, including supported Markdown fence forms, without promoting examples into state.
- Bind standalone closure and integration observations to the configured/explicit remote or documented origin default; retain selected gate-ref projection semantics rather than silently treating integration as main.
- Preserve opaque nested and fenced handoff prose; only actual mechanical payload/root field declarations may be excluded from narrative comparison.
- Require the accepted answer to descend from the exact candidate before delivery; complete contrary ancestry cannot allow, and incomplete history stays unresolved.
- Align release table with workflow 3.8, state 1.10, tasks 1.13, logic-draft 1.7, file-guard 1.1 and keep-alive 1.2; add a meaningful owning source check.
- Full-document selection among historical acceptance entries is outside this correction. Existing selected-entry projections remain explicit; no new canonical record grammar is introduced.

## Constraints

Follow [AGENTS](../../agents/AGENTS.md) and [WORKFLOW](../../workflow/WORKFLOW.md). Root acts as Prime Architect/Inspector; Lead owns execution/task records and assigns bounded implementation. Preserve native Git hooks, configured model/native effort, existing protocol/template versions, historical handoffs/answers, original corpus expectations, and source working copy.

Allowed implementation area: conformance/reference.mjs, cases.json, self-test.mjs, source-check.mjs, conformance/README.md only when documenting corrected projection behavior, and ai/pact/RELEASE-NOTES.md. Lead may maintain TASKS/STATE. Root owns this draft. No product/SPARC changes, host settings, services, dependencies, runtime installations, outside-project migration, history rewrite or force push. The independent source checkout remains on its original clean main.

Use installed system Node 24. Heavy runs are sequential under C:/!DEV/2026/pact/ai/pact/cache/HEAVY-LOCK; battery >=20% even on AC and free RAM >=5 GiB. Host clock was verified against supplied UTC within one second for this session. The shared host registry remains C:/!DEV/2026/KEEP-ALIVE.md; this gate starts no services.

## Acceptance

- Every selected counterexample has a tracked test with inspected failing baseline and passing correction; adjacent positive and incomplete-history cases protect the same invariants.
- All original 250 corpus case inputs/expectations remain unchanged.
- Lead provides affected/fast checks and exact task-to-authoritative-remote-gate ancestry; Prime separately reviews exact code and runs complete required checks once on the integrated candidate.
- Required complete commands: node conformance/self-test.mjs; reference.mjs; check-git.mjs; source-check.mjs; migration-check.mjs; git diff --check. Inspect every actual exit and required result on the accepted revision.
- Release-version table agrees with actual templates; no normative policy, template-version, host-runtime or external-installation change is claimed.
- Acceptance, gate publication and default-branch delivery stay distinct. Prepare a reviewable PR after validated gate publication; do not merge main under this selection.

## Next

None.

## History

Previous PACT-Semantics selection, both immutable Prime acceptance entries, their full evidence and completed task records are preserved at ac431f05c2f00836d7632244751d96f5daabf29d. This gate neither rewrites that history nor reopens that delivered gate. Original TASKS Done history is retained; STATE's prior handoff is preserved in Git and may be labeled historical when this new gate starts.
