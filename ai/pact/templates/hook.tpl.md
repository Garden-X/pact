# hook.tpl.md

## META

name: hook.tpl.md
version: 1.1
type: pact maintenance template
for: agent hook files

## WHAT

A hook file defines one named PACT agent hook.

Hooks describe when the extension point runs, what it reads, what it may do,
what it writes, and how failure is handled.

Hooks are registered in `WORKFLOW.md`.

## FOR

Target path:

```txt
/ai/pact/agents/hooks/[Hook].md
```

Use this template when creating or changing a PACT agent hook.

## RULES

A hook file must contain:

- hook name;
- trigger;
- inputs;
- allowed action;
- output;
- failure behavior;
- boundaries;
- script references, when scripts are used;
- registration in `/ai/pact/workflow/WORKFLOW.md`;
- relative Markdown links to invariant PACT files it depends on.

Optional hook filenames must use CapitalCase:

```txt
[Hook].md
```

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
status: draft

## TRIGGER

Before an active task is marked done.

## INPUTS

- [../../context/state/STATE.md](../../context/state/STATE.md)
- affected files listed in the active task

## SCRIPTS

None.

## ACTION

Check that validation is recorded.

## OUTPUT

Validation result or blocker.

## FAILURE

Keep the task active and record the blocker in `STATE.md`.
```
