# LOGIC-DRAFT.md

## META

name: LOGIC-DRAFT.md
canonical_location: /ai/pact/context/state/LOGIC-DRAFT.md
layer: PACT / context / state
status: selected
owner_role: Prime
gate_id: PACT-Semantics
generated_from: /ai/pact/templates/logic-draft.tpl.md
generated_from_version: 1.7
content_status: current-state
updated: 2026-10-26 07:18:17 UTC+00:00

## Selected Logic

Prime selects the owner's implementation request: deterministic PACT authority,
transitions and acceptance with manual humans + agents + Markdown + Git use.
Implement only the reduced delta below through task candidates and this gate.
No runtime, new role, lifecycle stage or canonical state file. Main delivery is
not selected; acceptance and delivery remain separate.

## Source / Evidence

- Owner attachment, 2026-10-26, and subsequent instruction to execute the task.
- Baseline: 7aec582761ff7bc398687c147203e22892c2f92b.
- Proposal branch shape/2026-10-26-Pact-Runtime-Spec-Delta, shape blob
  9f94c26c3d4e26e763fe68574b2d26ebba9e7f62: research, not authority.
- Reuse WORKFLOW roles, Spawn Boundaries, task candidates, validation, cleanup;
  state/tasks/logic-draft/file-guard templates; GateClose and PrimeWatch.
- Distill October 14/16/17/18 cache scenarios, not scratch regex policy models.
- ai/sparc, ai/docs and ai/raw are package placeholders; no attached product
  SPARC binding/live contract or REFERENCE-INDEX. No product truth change.

## Decisions

Pre-edit classification: A normative semantics; B minimum consumed machine
representation; C rejected implementation concern; D rejected platform norm.

| Shape item | Class | Selected disposition |
|---|---|---|
| authority derivation | A | One effective PACT authority procedure; role powers and inherited scope are distinct. |
| runtime lease | C | Reject lease/token/expiry and capability-derived authority objects. |
| machine blocks | B | Only consumed mechanical inputs; brief, boundaries, explanations remain prose; preserve legacy history. |
| AuthorityRepository | A/C | Keep exact Git revisions, ancestry, changed paths and explicit remote observations; reject store interface, author-based trust and service requirements. |
| Host state | C | No subsystem; external restrictions never grant PACT authority. |
| Operational journal | C | Reject subsystem and append-only journal requirement. |
| requires grammar | A/B | Portable identifiers and satisfied/unavailable/unresolved results; grants no authority, including execution. |
| path grammar | A/B | One repository-relative interpretation of slash, directories, patterns, case and rename effects. |
| reservation operations | A/B | read/modify/create/delete; explicit legacy write compatibility; aggregator is annotation, not mutation permission. |
| named checks | A/B | Stable selected check identities and resolvable command/environment evidence; no command-authority registry. |
| rule IDs | B | Only stable references needed for conformance. |
| conformance/ | A/B | Tracked language-neutral inputs/results; non-normative runner, no runtime dependency. |
| platform-neutral KEEP-ALIVE | A/D | Generalize launcher validation; retain portable default and useful platform examples. |
| legacy migration | A/B | Plan-only, reviewed, hash/revision guarded, non-destructive; no installation rollout. |

Reject shape-specific blanket Worker template-write prohibition (owner permits
source template maintenance), parent-role power intersection (inherit scope,
not parent role powers), subject-did-not-author revision rule, capability-based
permissions and journal/recovery APIs. Unknown/conflicting mechanical inputs
produce unresolved/invalid verdicts, never inferred permission. Arbitrary prose
boundaries require recorded authority resolution when mechanically unresolved;
do not structure reasoning or pretend natural language is decidable.

## Constraints

Preserve owner model/native effort, project data and immutable historical
handoffs/answers. Prime Architect/Inspector and Lead execution remain separate.
Inherited model, High capability, requested effort 100% mapped to supported
maximum unless explicit native setting is preserved; no model override.
No starts below 20% battery even on AC; measured resource gate/shared heavy
lock and sequential heavy checks. No services, dependencies, infrastructure,
external installation edits, archive refresh, force push, main writes or deploy.
Bump changed templates only; synchronize RULES/full EXAMPLE/active targets.
Keep package 2.0 unless demonstrated compatibility break requires reconsideration.

## Owner correction and delivery authorization

Owner instruction 2026-10-26: correct the reviewed defects and merge the result.
This explicitly authorizes task/gate publication and Prime's separate default
branch fast-forward after successful acceptance. It supersedes the earlier
no-main-delivery scope for this gate; other scope/resource constraints remain.
The previous accepted answer remains immutable history, but its candidate is
not the corrected delivery candidate. Lead must publish a new handoff revision.

Selected correction: make the non-normative evaluator and corpus agree with
existing PACT rules for authoritative remote-tip delivery, inherited delivery
restrictions, fenced guard examples, complete active-task parsing and exact
integer seq validation. Reuse conformance/reference.mjs and cases.json; promote
the nine proven counterexamples from the review into tracked fixtures and add
proportionate adjacent positive/boundary cases. No runtime architecture, external
rollout, host configuration, new dependencies or unrelated redesign.

Review basis: a19136c171cd67bc9cf1422a0080d2234cb4a0f6; nine counterexamples
at ai/pact/cache/runs/2026-10-26T06-29-00Z--semantic-review/validation/counterexamples.json
ran through the tracked runner with actual exit 1 (nine failures). Preserve
their semantic expectations. Also validate complete generated task examples,
not only synthetic block fragments. Any necessary adjacent correction must
have a demonstrated failing case and stay inside the same existing contracts.

Prime retains selection/acceptance/delivery; Lead owns task006 records and its
candidate publication/integration. Owner-configured models/native efforts remain
unchanged. Fresh exact-candidate acceptance requires self-test, full corpus,
source checks, real-Git scenarios, migration preservation and diff hygiene,
with each actual exit inspected sequentially under the existing resource policy.
Independent Inspector reviews the correction diff before Prime acceptance.

## Acceptance

Prime inspects these complete required checks on the exact candidate:

- semantic-conformance: positive/negative language-neutral fixtures for roles,
  reservations, guard, inherited narrowing, transfer/state combinations, task
  ancestry/reachability, integration, handoff/answer/closure, force push,
  unavailable/unresolved requires, remote refs and legacy parsing. New material
  runner invariants have failing tests before implementation.
- source-contracts: RULES/full EXAMPLE/target equality, versions, links, consumed
  grammar and runtime-free policy consistency.
- git-remote-scenarios: real synthetic full/shallow/single-branch/worktree cases;
  missing tracking ref is not remote absence; copied commits are not ancestry;
  incomplete history remains unresolved.
- migration-preservation: read-only plan and extracted-value preservation for
  active/pending state, immutable handoffs/answers, guards/hooks and explicit
  native bindings; stale hash/revision fails before mutation. No external apply.
- scope-and-platform: portable rule/default/platform-example audit and manual
  use walkthrough; no second authority ledger or runtime subsystem.
- record-hygiene: actual exits, candidate evidence, SliceRecordsCheck, intended
  diff and task-to-remote-gate reachability; native hooks remain mandatory.

Acceptance is separate from merge. An accepted answer may remain delivery
pending; never claim closure or change main under this selection.

### Prime acceptance

```pact:acceptance
decision: "accepted"
candidate: "84b2c03b33969b8ce693807684dabe5613196d1c"
evidence: "Prime fresh exact-candidate results below; TASKS Done PACT-20261026-001 through 005; tracked conformance inputs, expected verdicts and checks."
```

Prime Inspector /root inspected the complete selected delta and published ready
handoff. Fresh checks ran sequentially in a detached checkout of exactly the
candidate above, with matching tracked working files, system Node v24.18.0 and
Git 2.46.2.windows.1. Battery 98%, free RAM 12.95 GiB and the owned heavy-work
lock satisfied the existing resource policy. Every actual exit was inspected:

| Command | Result | Exit |
|---|---|---|
| node conformance/self-test.mjs | 21 invariant assertions | 0 |
| node conformance/reference.mjs | 181 of 181 semantic cases | 0 |
| node conformance/source-check.mjs | 207 checks, 165 relative links, no failures | 0 |
| node conformance/check-git.mjs | 15 real-Git assertions | 0 |
| node conformance/migration-check.mjs | 30 checks, 11 preservation items; real three-file plan only, applied false | 0 |
| git diff --check | clean candidate diff | 0 |

All four exact mutating task candidates and this candidate were independently
proven ancestors of the explicitly fetched remote gate tip (each actual exit
0). The published ready revision changes only STATE after the candidate.
TASKS is complete, Pending is empty, STATE is clear, and readiness is explicit.
No old local command result substitutes for this fresh acceptance run.

Independent read-only Inspector review of correction 5329cb194e08cb4e5d0b544fcbc502079cd677c7
resolved all identified transfer, handoff and JSON defects with no remaining
actionable issue in its bounded review. Only TASKS/STATE records differ between
that reviewed correction and the tested candidate. Root separately inspected
the scope classification, platform audit, complete examples, migration procedure,
record provenance and manual Markdown/Git use. No runtime/OS mechanism, second
ledger, new role or lifecycle stage was introduced. Prose judgments require the
responsible authority's evidenced resolution; missing facts have the defined
unresolved verdict rather than invented permissions.

No attached product SPARC binding or live project-truth contract exists here;
the package separation was verified and no product truth edit was justified.
Historical records, owner bindings and external installations were preserved.
These are specification/conformance checks on this host, not an execution of
two independent implementations on two operating systems. The corpus is bounded.
Acceptance does not authorize a main merge, external rollout or release archive.

## Next

None.

## History

Previous PACT-Maintenance selection/decisions are preserved at
7aec582761ff7bc398687c147203e22892c2f92b:ai/pact/context/state/LOGIC-DRAFT.md.
Its accepted answer is on main. Existing TASKS Done/STATE historical records
remain intact. Installed-project rollout is outside this gate.
