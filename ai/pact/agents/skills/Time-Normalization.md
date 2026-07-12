# Time-Normalization.md

## META

name: Time-Normalization
canonical_location: /ai/pact/agents/skills/Time-Normalization.md
layer: PACT / agent skill
status: canonical
generated_from: /ai/pact/templates/skill.tpl.md
generated_from_version: 1.0
content_status: current-data
updated: 2026-07-12 18:15:00 UTC+00:00

## PURPOSE

Guarantee that every timestamp an agent writes into PACT and SPARC files is
true `UTC+00:00`, independent of the local machine clock. Machines in one
project can drift: dual-boot RTC skew, wrong timezone settings, unsynced
hosts. A skewed clock silently corrupts `updated` stamps — the primary
freshness signal of both specifications — and date-bearing filenames.

## WHEN TO USE

Before writing any of:

- `updated:` stamps in PACT or SPARC Markdown files and `schema.meta.updated`;
- daily log filenames (`changes/daily/YYYY-MM-DD.log.md`) and entry `Time:`
  fields;
- cache-run folder names (`cache/runs/YYYY-MM-DDTHH-MM-SSZ--slug/`);
- any other spec-mandated timestamp.

Once per session is enough unless the session spans hours or the machine
sleeps/reboots mid-session.

## INPUTS

- Local clock converted to UTC.
- One trusted network time source, tried in order:
  1. an HTTPS time API returning UTC (for example
     `https://worldtimeapi.org/api/timezone/Etc/UTC`);
  2. the `Date` response header of an HTTPS HEAD request to a major host;
  3. the platform time service query (`w32tm /stripchart` on Windows,
     `sntp` on macOS/Linux) in read-only mode.

## PROCEDURE

1. Read local UTC and network UTC; compute the offset.
2. Offset within ±60 s → local clock is trusted for this session; stamp
   normally.
3. Offset beyond ±60 s → use the network-derived UTC for all stamps this
   session and report the skew to the owner (the system clock itself is
   owner territory — do not change system time or timezone settings).
4. No network source reachable → stamp from the local clock and append
   `(clock unverified)` to the affected daily log entry's `Verified:` field;
   never silently trust an unverifiable clock for date-bearing filenames —
   prefer extending the latest existing daily file over creating a
   new-dated one when in doubt.

## OUTPUTS

- Normalized `UTC+00:00` stamps in all maintained files.
- A skew report to the owner when step 3 triggered.

## BOUNDARIES

This skill governs timestamps in maintained files only. It does not define
project truth, does not modify system clock or timezone settings, and does
not rewrite historical stamps — past entries get annotations, not edits.
