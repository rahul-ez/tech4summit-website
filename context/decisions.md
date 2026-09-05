# Decisions

This file is a running log of meaningful **implementation** decisions made while building Tech4Bharat 2026 — the kind of choice where multiple valid approaches existed and someone had to pick one. It does not duplicate `architecture.md`, `ui-tokens.md`, `ui-rules.md`, or `code-standards.md`, and it does not replace `tbd.md`. Those files remain authoritative for requirements, architecture, design, and unresolved product decisions.

**Log an entry here for things like:** a significant architectural change made mid-implementation, a meaningful third-party dependency choice (see `library-docs.md`'s own documentation rule for the dependency itself — log here if the *decision* was non-obvious), a choice that affects multiple parts of the codebase, or a call made to resolve an ambiguity that came up during coding.

**Do not log here:** routine coding choices with only one reasonable approach, anything already decided in another context file, or a new product/requirements decision — those belong in `tbd.md` (once confirmed) or the file that owns that kind of decision.

If a decision resolves an item in `tbd.md`, update `tbd.md` as part of the same change. If a decision changes something `architecture.md` describes, update `architecture.md` as part of the same change. This file records that the decision happened; it doesn't substitute for updating the file that owns it.

## Format

```
## DEC-XXX — [Decision title]
**Status:** Accepted | Superseded | Reverted
**Date:** YYYY-MM-DD
**Owner:** [person/agent]

**Decision:**
What was decided.

**Reason:**
Why this approach was chosen over the alternatives.

**Impact:**
What parts of the project are affected.
```

---

## Log

No entries yet. Per `progress-tracker.md`, no implementation has begun on this project — every existing context file (`architecture.md`, `ui-tokens.md`, `ui-rules.md`, `code-standards.md`, `library-docs.md`, `build-plan.md`) reflects planning and design decisions made *before* coding started, not implementation-time decisions. The first entry here should be added once actual development produces a decision meeting the criteria above — not before.
