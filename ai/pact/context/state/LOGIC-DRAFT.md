# LOGIC-DRAFT.md

## META

name: LOGIC-DRAFT.md
canonical_location: /ai/pact/context/state/LOGIC-DRAFT.md
layer: PACT / context / state
status: selected
owner_role: Prime
gate_id: PACT-Conformance
generated_from: /ai/pact/templates/logic-draft.tpl.md
generated_from_version: 1.7
content_status: current-state
updated: 2026-10-28 21:58:39 UTC+00:00

## Selected Logic

Prime selects the owner's correction request after the 2026-10-28 review of
the delivered PACT-Semantics correction diff
a19136c171cd67bc9cf1422a0080d2234cb4a0f6..ac431f05c2f00836d7632244751d96f5daabf29d.
Make the non-normative evaluator, corpus, source checks and conformance README
agree with existing PACT rules where that review demonstrated a gap. Implement
only the delta below through one bounded task candidate and this gate. No
normative PACT/WORKFLOW/template change, runtime, dependency, role, lifecycle
stage or canonical state file.

## Source / Evidence

- Owner instruction 2026-10-28 in this session: fix the reported review
  remarks. It authorizes this correction; it does not by itself authorize
  task/gate branch publication outside the session branch or default-branch
  delivery.
- Review basis: main ac431f05c2f00836d7632244751d96f5daabf29d, where
  PACT-Semantics#3 is accepted and its answer is reachable from origin/main.
- Counterexamples demonstrated on that revision with the tracked evaluator:
  1. `closure` of `accepted-delivered` with observation remote `fork` returns
     `closed: true`; `derive` of `candidate-integrated` with observation
     `fork` + `refs/heads/unrelated` returns `integrated: true`. PACT-GIT binds
     reachability to `(authority_remote, refs/heads/<expanded-branch>)`.
  2. The complete STATE template example, as a parented `publish_task`
     authority query, returns `unresolved`; the same record plus a copied
     `## Boundary Contract` heading returns `allow`. The exact TASKS-to-STATE
     template example transfer returns `invalid`. The evaluator reads only
     corpus projection headings, never the templates' entry labels
     `boundary_contract`, `brief`, `tests`, `baseline` and `validation`.
  3. conformance/README discloses one corrected delivery observation, while
     five pre-existing delivery cases changed `remote.tip` in that diff.
- Reuse conformance/reference.mjs, cases.json, source-check.mjs and README;
  PACT.md PACT-GIT/PACT-FACT/PACT-RECORD, WORKFLOW and the state/tasks
  templates. No cache evidence is required; all inputs become tracked cases.
- ai/sparc, ai/docs and ai/raw remain package placeholders; no product truth.

## Decisions

| Review item | Disposition |
|---|---|
| closure/derive remote binding | Correct. Closure binds the exact standalone `origin` + `refs/heads/main` coordinate like delivery; derive binds remote `origin` by default and requires its named gate ref. An unnamed or mismatched coordinate is unresolved. |
| template entry prose surfaces | Correct. Authority and transfer also read the owning entry's root labels relative to their indentation; the existing heading projection stays readable. Two surfaces for one record are invalid. Presence and exact comparison only; no prose interpretation. |
| README case-change disclosure | Correct. Name all five changed delivery inputs and every input completed by this gate; expectations stay unchanged. |
| seq integral decimal/exponent tokens | Decline. No demonstrated defect: PACT-RECORD requires exact integers and README documents the accepted spellings. A canonical-token rule needs a separate owner selection. |

## Constraints

This cloud session performs Prime and Lead sequentially on one host, keeping
role boundaries and evidence checks; its same-host review is not independent.
Preserve every existing case expectation and the owner-configured session
model/effort; no model override. Change existing case inputs only to supply a
coordinate that a corrected query now requires, and disclose each one. No
services, dependencies, host configuration, external installations, archive,
force push or template/spec version bump. The session may push only
`ccr-abb685be-lsyzzj`; task/gate branch publication and main delivery need
explicit owner permission and remain Prime-level follow-up until granted.

## Acceptance

Prime inspects these complete required checks on the exact candidate:

- semantic-conformance: new cases fail on the review basis before the
  implementation, then the full corpus passes with prior expectations intact.
- source-contracts: source-check passes, including reference authority and
  transfer on the complete template examples.
- runner-invariants, git-remote-scenarios and migration-preservation pass;
  the migration stays plan-only with `applied: false`.
- record-hygiene: `git diff --check`, intended paths only (`conformance/**`
  and PACT state records), actual exits inspected sequentially.

Acceptance is separate from delivery. Never claim closure or change main
under this selection without the owner's explicit delivery permission.

## Next

None.

## History

PACT-Semantics selection, decisions and its accepted answers #1 and #3 are
preserved at ac431f05c2f00836d7632244751d96f5daabf29d:ai/pact/context/state/LOGIC-DRAFT.md.
Answer #3 is on main, so that gate is closed. Previous PACT-Maintenance
selection/decisions remain preserved at
7aec582761ff7bc398687c147203e22892c2f92b:ai/pact/context/state/LOGIC-DRAFT.md.
Existing TASKS Done/STATE historical records remain intact.
