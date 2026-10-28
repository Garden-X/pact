# PACT semantic conformance

updated: 2026-10-28 22:04:19 UTC+00:00

This tracked corpus tests PACT decisions. It requires no PACT runtime, service,
database, agent harness, operating-system API or shared implementation code.
Humans can inspect each input and expected result against the cited rule.

The normative rules remain in [PACT](../ai/pact/PACT.md),
[WORKFLOW](../ai/pact/workflow/WORKFLOW.md), the state/task templates and
[GateClose](../ai/pact/agents/hooks/GateClose.md). A contradiction is a protocol
maintenance defect to report; a reference implementation cannot redefine PACT.

## Corpus contract

[cases.json](cases.json) is UTF-8 JSON with `format: pact-semantic-cases-1`
and a `cases` array. Every case has:

- `id`: unique stable case identity;
- `operation`: the semantic query;
- `rules`: governing PACT rule references;
- `input`: records and observations needed by that query;
- `expected`: the normalized semantic result.

An independent implementation consumes these inputs and returns `expected` for
that case. Compare JSON values, ignoring object-member order; preserve array
order, exact strings, numbers, booleans and the literal string `unresolved`.
There is no machine, filesystem or programming-language-specific expected text.
Explanatory diagnostics may cite rule IDs and are outside the compared result.

The `answer` query here specifically checks GateClose acceptance answers to a
ready publication. Other Prime authority decisions remain in their existing
owning contracts and are not silently treated as acceptance answers.

Query vocabulary:

| Operation | Input projection | Compared output |
|---|---|---|
| path / overlap | policy pattern, literal target / two patterns, known directories | valid/invalid; normalization and match/overlap |
| parse / parse_tasks | Markdown record, owning record type / current task section | valid/invalid/unresolved and consumed fields |
| authority | assignment/workflow/guard records, queried operation and complete changed-path facts | allow/deny/unresolved; guard warnings when applicable |
| requires | prerequisite identifiers and availability observations, pending/active stage | satisfied/unavailable/unresolved; readiness hold or blocked state |
| candidate | revision graph, base and exact candidate, history completeness | valid/invalid/unresolved ancestry |
| derive | revision graph, queried gate ref and exact remote-ref observation | integrated true/false/unresolved |
| handoff | previous and proposed publication, authorized writer role | valid/invalid/unresolved |
| answer | ready publication, Prime acceptance decision record and commit message/path facts | valid/invalid/unresolved |
| closure / delivery | accepted answer, Git graph, exact remote/default observation and delivery facts | closed true/false/unresolved / allow/deny/unresolved |
| state / transfer | consumed state metadata and task records / before-and-after task projections | valid/invalid/unresolved |

## Input premises and limits

These are bounded semantic projections of a repository snapshot, not a second
canonical record format. Fields omitted from a projection are outside that
query; fixtures do not assert that a partial record is sufficient for every
PACT operation. A `parse` success means the consumed syntax was read, not that
the whole project, brief, authorization or lifecycle is valid. Parsing and
semantic validity are deliberately separate queries.

Authority cases include actual Markdown assignment coordinates, role/actor,
reservations, workflow guard binding and six boundary fields. Those fields are
read from the corpus `## Boundary Contract` projection or from the template
entry's `boundary_contract:` mapping; each occurs exactly once with a value.
Both surfaces in one record are invalid. Unknown required
scope stays unresolved. A boundary interpretation is supplied only as a
recorded parent/owner decision with its fixture-local source and evidence text
in `records.boundary_decisions`. That wrapper is a repository-evidence input,
not a new PACT file or authored grant field. The evaluator does not infer
permissions from arbitrary prose. A responsible authority supplies the human
semantic judgment in the existing owning task/boundary decision record; without
that evidenced interpretation both mechanical readers return unresolved for the
same queried operation. This is an explicit evidence boundary, not permission
for either implementation to invent missing PACT policy. Missing decision evidence cannot authorize
action. Native tools, capability identifiers and model tiers confer nothing.
For these bounded cases the authenticated assignment and decision provenance
are premises; implementations must establish them from their own given records,
not infer role authenticity from Git author names.

Handoff materiality compares stable mechanical payload plus the raw owning
narrative; it does not parse natural-language meaning. An unchanged payload or
a timestamp-only change cannot create a new sequence. A same-sequence owning
narrative edit is invalid. Where only narrative changed and materiality is not
mechanically evident, `materiality` is a fixture projection of Lead's existing
owning-record interpretation with `result`, `source` and `evidence`. Missing
interpretation remains unresolved. It is not a new canonical state field.
Delivery freshness compares the entire owning publication, including narrative.
Sequence values are integers from 1 through 9007199254740991 inclusive.

Transfer compares every already explicit actor, coordinate and model/native
effort binding without alteration or loss. An absent pending actor, local
binding, lead/source or task coordinate may resolve at dispatch; absence is not
an instruction to overwrite an already assigned value. Brief and boundary prose
remain preserved as prose: the Brief, Boundary Contract, Validation and Tests /
Baseline projection headings, or the template entry labels `brief`,
`boundary_contract`, `validation`, `tests` and optional `baseline`, compare as
exact text relative to their label indentation. Their surface form does not
change at transfer; later progress uses its own labels such as
`validation_result`. JSON token whitespace is only space, tab, LF and CR;
non-ASCII whitespace inside quoted JSON strings remains ordinary string data.

`changes`, `changed_fields`, integration-review classification and candidate
path deltas are complete observations of the queried Git/record diff. They are
not permissions. A mechanically unresolved review remains unresolved. Integration
path containment does not authorize material changes within an existing path;
the material-versus-mechanical classification is separately evidenced.

Graph node names in static cases are synthetic, syntactically full object IDs.
The graph is the case's supplied immutable Git history; it is not a claim those
objects exist in this source repository. `history_complete: false` never turns
failure to find an ancestor into proof of non-ancestry. Remote observations name
an exact remote/ref and observed tip; local tracking refs are cache inputs only.
The query, never the observation, supplies the coordinate. Delivery and closure
default to `origin` and `refs/heads/main`; derive defaults its remote to
`origin` and requires `expected_ref`, the queried gate branch. Another remote
or ref, or an unnamed derive ref, is unresolved rather than a negative.
Closure fixtures include the handoff and complete candidate-to-answer path diff
at delivery. Later ordinary commits or gates do not retroactively reopen a gate.

Delivery queries use the exact configured remote/ref observation and its tip
for fast-forward ancestry. `current_default` is a legacy cache hint, never the
authority. Standalone queries default to `origin` and `refs/heads/main`;
authority queries bind these coordinates to WORKFLOW's remote/default branch,
so a nested caller hint cannot replace them. Delivery still passes inherited
boundaries and File Guard, retaining warn-mode diagnostics. A ref operation
does not invent a repository-path reservation requirement.

`parse_tasks` scopes new blocks to their exact Active Task or Pending entry.
It reads the complete original entry, including task-local typed model/native
fields outside the machine fence. Parallel entries do not share those fields;
cross-surface duplicates and unclosed task fences are invalid. Fenced examples
are ignored when reading both task fields and File Guard table rows.
Indented continuations of scalar prose remain opaque, including consumed-looking
role, actor, model or id labels. Task segmentation uses the same hierarchy-aware
field reading, so documentation examples cannot create an assignment or task.
Legacy active objects split on same-root-indentation `id:` lines. Duplicate IDs,
consumed keys, contradictory formats, quoted headings and unknown essential
syntax never silently overwrite or acquire permission. Historical headings and
code examples do not become current state. New block lines are key + one JSON
value, not YAML; duplicate nested JSON keys are invalid.
Consumed `seq` values are validated from their exact numeric token before
floating-point conversion. Mathematically integral JSON decimal/exponent forms
within the selected range remain valid; rounded fractions do not become valid
integers. This does not prohibit fractional JSON values in unrelated fields.

The reference evaluator covers the operations and projections above. Passing it
is evidence for this corpus, not a claim to implement all human PACT reasoning,
host enforcement, identity authentication or every legacy narrative dialect.
Unsupported essential legacy constructs require explicit review and an unresolved
result; historical immutable records are not rewritten to placate this runner.

## Running the non-normative checks

Use the installed Node.js and Git; no dependency installation is needed.

```text
node conformance/self-test.mjs
node conformance/reference.mjs
node conformance/check-git.mjs
node conformance/source-check.mjs
node conformance/migration-check.mjs
```

[reference.mjs](reference.mjs) exports the evaluator for another runner or can
compare the complete corpus. [self-test.mjs](self-test.mjs) was authored before
the evaluator; the recorded red baseline first lacked the module, then failed
specifically on unresolved prerequisites incorrectly lacking `ready: false`.
[check-git.mjs](check-git.mjs) constructs tiny disposable Git repositories using
Git plumbing and exercises full, shallow, single-branch and worktree contexts,
explicit remote resolution/fetch/deepening, absent refs and copied-commit
non-ancestry. It creates no project refs, invokes no network service, and
verifies its own temporary cleanup target before removing it. These commands are
maintainer aids, not required PACT execution mechanisms or normative code.
[source-check.mjs](source-check.mjs) verifies complete contract examples/targets,
transfer preservation, record ownership, versions and links.
[migration-check.mjs](migration-check.mjs) tests a deliberately bounded synthetic
fixture mapping and all guards before its test writer, plus a read-only current
record plan. It never applies changes to an installed project and is not a
general-purpose Markdown migrator.

## Recovered evidence

The corpus distills these earlier disposable scenarios; it does not copy their
regex assertions, implementation classes, doc-gated policy models or scratch
force-update operations:

| Cache evidence | Durable scenario families |
|---|---|
| October 17 `tmp/scenarios.mjs` | exact transfer; lost brief, reservations and baseline; Pending/Active duplication |
| October 17 `tmp/check-task-candidates.mjs`, A-G and RA-RE | own task publication, role integration separation, base ancestry, copied candidates |
| October 17 `tmp/check-close.mjs` and `check-delivery.mjs` | answer before delivery, stale handoff, record-only delivery, historical closure |
| October 17 `tmp/check-harness.mjs`, A-L | immutable publication, newest revision, narrow Prime decision writes |
| October 17 `tmp/check-interop.mjs` and `check-boundaries.mjs` | prerequisite holds, no capability grants, inherited scope restrictions |
| Owner-reported shallow single-branch failure | missing tracking ref versus explicitly observed remote ref; incomplete history |

The common local source prefix was
`ai/pact/cache/runs/2026-10-17T20-50-41Z--tier-routing-forge-closeout/`.
Those paths document provenance, not required future evidence dependencies.
All selected inputs and expected decisions needed by this corpus are tracked
here. Cache-only cleanup/recovery policy models were declined as implementation
code; existing normative cleanup remains in WORKFLOW and can gain further
fixtures without making disposable cache authoritative.

The nine 2026-10-26 `review-*` correction cases were promoted unchanged from
the owner-reviewed nine-failure counterexample set against `a19136c`. Adjacent
positive/boundary cases and complete generated STATE-example assertions protect
the same invariants. That correction changed only `remote.tip` in five earlier
delivery cases, each keeping its expected result. The fast-forward positive
`delivery-fast-forward-record-only` had a contradictory tip; its original
divergence is preserved as `review-delivery-rejects-stale-default`.
`delivery-product-after-candidate`, `delivery-newer-handoff` and
`delivery-owning-prose-freshness` received the same non-diverged tip, so they
still deny for their own reason rather than a non-fast-forward.
`delivery-moved-default` carries its moved default in the authoritative
observation instead of only the `current_default` cache hint.
The original review cache is no longer required to run these tracked cases.

The 2026-10-28 review of `ac431f0` added the counterexamples
`review-closure-binds-authority-remote`, `review-derive-binds-authority-coordinate`,
`review-authority-template-boundary-mapping` and
`review-transfer-template-entry-labels`, with adjacent cases and source checks
that run authority and transfer on the complete template examples. Because
derive now requires its queried gate ref, six earlier derive cases gained
`expected_ref: refs/heads/gate/G`, the ref each already observed. Their other
inputs and every earlier expected result are unchanged.
