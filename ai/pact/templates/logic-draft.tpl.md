# logic-draft.tpl.md

## META

name: logic-draft.tpl.md
type: pact maintenance template
for: LOGIC-DRAFT.md
updated: 2026-10-14 19:55:32 UTC+00:00
version: 1.6

## WHAT

`LOGIC-DRAFT.md` records selected maintenance logic before it is split into
tasks.

It is the bridge between early reasoning and executable PACT tasks.

## FOR

Target path:

```txt
/ai/pact/context/state/LOGIC-DRAFT.md
```

Use this template when creating or resetting the PACT draft state file.

## RULES

`LOGIC-DRAFT.md` must:

- use one valid draft status;
- describe selected maintenance logic;
- cite source or owner instruction when known;
- link supporting ideas when an idea influenced the draft;
- link supporting shape files when a shape was used;
- record decisions and constraints;
- state explicit acceptance conditions when status is `selected`;
- link related invariant PACT files with relative Markdown links;
- stay outside `/ai/docs`.

Valid `LOGIC-DRAFT.md` statuses:

```txt
none-selected
selected
superseded
```

Status meanings:

- `none-selected` means no maintenance logic has been selected.
- `selected` means selected maintenance logic may be split into tasks.
- `superseded` means the draft was replaced by a newer selected draft.

When status is `none-selected`, `LOGIC-DRAFT.md` may use a compact `## CURRENT`
stub with empty values such as `selected_logic: none`. When status is
`selected`, use full content sections such as `## Selected Logic`,
`## Source / Evidence`, `## Decisions`, `## Constraints`, and `## Acceptance`.

Under the Execution Hierarchy, the Prime owns selection and acceptance in
this file; the Lead derives tasks from that selection. Optional META
fields `owner_role: Prime` and `gate_id:` make this ownership and the current
gate explicit. A draft for a previous gate is stale; refresh its selection
before deriving tasks for another gate.

An optional `## Next` holds only gates already selected by the Prime, each
with a scope, acceptance conditions, and dependencies. It is a bounded lookahead
(normally one to three gates), not a worker task list. Empty lookahead means no
next gate has been selected; agents must not invent one during a stall.

`## Acceptance` also holds Prime's durable acceptance decisions for the gate:
one entry per answered handoff key, committed alone with the trailer
`PACT-Answers: <gate_id>#<seq>`. An entry records `decision` (`accepted` or
`not-accepted`), `candidate` (the exact implementation revision), and an
evidence pointer. Delivery is not recorded but derived from Git: the gate is
closed only when the accepted answer commit is reachable from the remote
`default_branch`. Until then an `accepted` answer is a pending delivery and
remains Prime-level work; Lead and Next activation never treat `accepted`
alone as closure.

An optional `## History` keeps short superseded-selection summaries and
pointers to their evidence or preserved versions. Do not copy old drafts
wholesale or move execution history into the current draft. Empty generated
seeds remain `none-selected`, without invented current or future gates.

`LOGIC-DRAFT.md` must not:

- contain accepted project truth;
- replace SPARC docs;
- contain task lists;
- contain active execution state.

Tasks must derive from `LOGIC-DRAFT.md`, not directly from a shape.

Tasks must not derive directly from `IDEAS.md`.

## EXAMPLE

```md
# LOGIC-DRAFT.md

## META

name: LOGIC-DRAFT.md
canonical_location: /ai/pact/context/state/LOGIC-DRAFT.md
layer: PACT / context / state
status: selected
generated_from: /ai/pact/templates/logic-draft.tpl.md
generated_from_version: 1.6
content_status: current-state
owner_role: Prime
gate_id: <project-specific gate id>
updated: YYYY-MM-DD HH:mm:ss UTC+00:00


## Selected Logic

Add a validation hook for PACT completion.

## Source / Evidence

Owner request.

Supporting idea:

- [../IDEAS.md](../IDEAS.md)

Supporting shape:

- `/ai/pact/context/shapes/2026-06-15-Example.shape.md`

## Decisions

The hook belongs in `/ai/pact/agents/hooks`.

## Constraints

Follow [../../agents/AGENTS.md](../../agents/AGENTS.md) and
[../../workflow/WORKFLOW.md](../../workflow/WORKFLOW.md).

Do not modify `/ai/docs`.

## Acceptance

- The completion hook follows the hook template and is registered in WORKFLOW.
- Its failure action keeps an unvalidated task active.
- Changed Markdown links resolve and template metadata is consistent.

## Next

None.

## History

None.
```

An acceptance decision entry in `## Acceptance`:

```txt
decision: accepted
candidate: <full accepted implementation revision>
evidence: <acceptance evidence path>
```

It is committed alone on the gate branch with
`PACT-Answers: <gate_id>#7`. A rejected revision records
`decision: not-accepted` and its evidence the same way.
