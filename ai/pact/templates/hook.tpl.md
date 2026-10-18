# hook.tpl.md

## META

name: hook.tpl.md
type: pact maintenance template
for: agent hook files
updated: 2026-10-18 08:51:00 UTC+00:00
version: 1.4

## WHAT

A hook file defines one named PACT agent hook.

Hooks describe when the extension point runs, what it reads, what it may do,
what it writes, and how failure is handled.

Hooks are registered in `WORKFLOW.md`.

Hooks have two classes, mirroring the skill classes:

- `pact_hook` is a Markdown workflow extension point owned by PACT, defined by
  this template and registered in `WORKFLOW.md`. This is the default.
- `host_hook` is a hook owned by the agent host, IDE, or runtime, such as a
  host-native settings or configuration hook. Host hooks are governed by the
  host, not by PACT. PACT does not define their behavior; it only records them in
  `WORKFLOW.md` for visibility and to note any interaction with PACT
  maintenance.

When a `host_hook` and a `pact_hook` would act on the same trigger, expose the
overlap in `WORKFLOW.md` instead of assuming one silently wins.

## FOR

Target path:

```txt
/ai/pact/agents/hooks/[Hook].md
```

Use this template when creating or changing a PACT agent hook.

## RULES

A hook file must contain:

- hook name;
- `class`: `pact_hook` or `host_hook` (default `pact_hook` when omitted);
- trigger;
- inputs;
- allowed action;
- output;
- failure behavior;
- boundaries;
- script references, when scripts are used;
- registration in `/ai/pact/workflow/WORKFLOW.md`, with the actual
  manual/unconfigured/bound status and config/script path for a bound hook;
- for host hooks, the observed runtime status; Markdown alone installs no
  scheduler or enforcement and grants no messaging or Git authorization;
- relative Markdown links to invariant PACT files it depends on.

Optional hook filenames must use CapitalCase:

```txt
[Hook].md
```

Validation hooks, including GateClose and SliceRecordsCheck, follow WORKFLOW's
Validation scope and evidence reuse: inspect all required results, record any
verified reuse with original revision/inputs/environment, and run missing or
invalidated checks. GateClose retains Prime acceptance, immutable handoffs,
record-only answers and separate delivery. Startup host hooks may report
local template/target drift and newer committed versions from an explicitly
configured local or GitHub source, with bounded read-only lookup. They offer
an upgrade for user agreement; they do not apply migrations, execute
project checks or grant authority. During target reconciliation, align existing
named hooks with these rules while preserving custom mandatory checks; report
any unresolved conflict instead of silently replacing a local hook.

A hook file must not:

- define project truth;
- store secrets;
- replace workflow lifecycle rules;
- hide script behavior outside `WORKFLOW.md` and the hook file;
- bypass SPARC when project truth changes;
- write PACT maintenance content into `/ai/docs`.

## EXAMPLE

```md
# ValidateBeforeCompletion.md

## META

name: ValidateBeforeCompletion
canonical_location: /ai/pact/agents/hooks/ValidateBeforeCompletion.md
layer: PACT / agent hook
class: pact_hook
status: draft
updated: YYYY-MM-DD HH:mm:ss UTC+00:00


## TRIGGER

Before an active task is marked done.

## INPUTS

- [../../context/state/STATE.md](../../context/state/STATE.md)
- affected files listed in the active task

## SCRIPTS

None.

## ACTION

Inspect each required validation result for the actual candidate revision.
Use WORKFLOW Validation scope and evidence reuse: a verified prior result may
cover unchanged inputs, with its original tested revision and environment
recorded honestly. Otherwise run the required check; never bypass native hooks.
Missing, interrupted, timed-out, or nonzero results prevent completion; a green
final command does not erase earlier failures. Record the method, command exit
status when applicable, and evidence. Use proportionate inspection for docs.

## OUTPUT

Validation result or blocker.

## FAILURE

Keep the task active and record the blocker in `STATE.md`.

## BOUNDARIES

This check does not run a timer, authorize Git delivery, or waive SPARC rules.
Register it in [WORKFLOW](../../workflow/WORKFLOW.md) as a manual pact_hook.
If a host later binds it, record the actual config and verify execution before
claiming enforcement.
```
