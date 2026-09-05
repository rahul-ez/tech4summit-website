# Code Standards

## 1. Purpose and Scope

This file governs **how** code is written and maintained for the Tech4Bharat 2026 website — TypeScript, React, Next.js App Router, styling implementation, data access, and engineering process. It does not redefine product requirements (`project-overview.md`), unresolved decisions (`tbd.md`), system architecture (`architecture.md`), design values (`ui-tokens.md`), UI composition (`ui-rules.md`), or the reusable component catalogue (`ui-registry.md`). Where a rule belongs to one of those files, this file references it rather than restating it. These standards apply to every implementation agent and contributor working on this codebase.

---

## 2. Core Engineering Principles

- Prefer the simplest solution that correctly solves the problem — this is a hackathon platform, not an enterprise system (per `architecture.md`).
- Reuse existing abstractions (components, query functions, validation schemas) before creating new ones.
- Keep responsibilities separated: UI renders, `actions/` orchestrate, `lib/db` queries, `lib/validation` validates — never blur these.
- Avoid premature abstraction — don't generalize a pattern until it's actually repeated.
- Make invalid states hard to represent (e.g. model a submission's status as a closed set of string literals, not a free-form string plus a separate boolean).
- Prefer explicit, readable behavior over clever or implicit behavior.
- Never silently invent a requirement, hackathon rule, or field that isn't confirmed.
- Never work around an unresolved `tbd.md` decision by making an implementation choice that quietly assumes an answer.
- Keep implementation aligned with `architecture.md`'s layering and folder boundaries at all times.
- Keep UI implementation aligned with `ui-rules.md`'s composition rules and `ui-registry.md`'s component catalogue.

---

## 3. TypeScript Standards

- Strict mode is enabled project-wide (per `architecture.md`) — do not weaken `tsconfig` strictness locally.
- Add explicit types wherever inference is ambiguous or the inferred type is wider than intended; rely on inference for straightforward local variables.
- `any` is not used without a justified, commented exception (see Forbidden Practices). Prefer `unknown` for genuinely untyped external data (Supabase responses before validation, form input, third-party payloads), then narrow it via a `lib/validation` zod schema before use.
- Use discriminated unions to model state with mutually exclusive shapes — e.g. an async operation as `{ status: 'idle' } | { status: 'loading' } | { status: 'success'; data: T } | { status: 'error'; error: string }`, not a pile of independent booleans.
- Model nullable values explicitly (`T | null`), and prefer `null` over `undefined` for "intentionally absent" values coming from the database, matching Postgres semantics.
- Use type narrowing (type guards, discriminant checks) rather than type assertions to resolve union types.
- Prefer `interface` for object shapes that represent entities or component props (may be extended); prefer `type` for unions, intersections, and utility compositions.
- Prefer string-literal union types over TypeScript `enum` for status/kind fields, since they map directly onto the text-based status columns used in the schema (e.g. `'pending' | 'confirmed' | 'cancelled'`).
- Add explicit return types on exported functions in `lib/db`, `lib/auth`, `lib/validation`, and `actions/` — internal component functions can rely on inference.
- Avoid unsafe type assertions (`as`); where one is unavoidable (e.g. a narrow, verified external API shape), add a comment explaining why it's safe.
- Treat all external/untrusted data — form submissions, Supabase query results consumed at a boundary, third-party API responses — as `unknown` until it passes through a validation schema.

This file does not define project-specific domain types (e.g. a `Registration` interface) — those live in `types/` alongside the implementation, shaped by the schema in `architecture.md`.

---

## 4. React Standards

- Functional components only.
- One clear responsibility per component — if a component both fetches/orchestrates data and renders a complex UI tree, split it along the layering in `ui-registry.md`.
- Props are explicit, named, and typed — avoid spreading untyped `...rest` props without a specific reason.
- Favor composition (passing children, slots) over prop-driven variant explosion; where a component genuinely needs variants, model them as a constrained union prop (e.g. `variant: 'primary' | 'secondary' | 'ghost' | 'destructive'`), matching `ui-rules.md`'s Button variants.
- State management: local UI-only state uses `useState`; data that originates from the server is fetched via Server Components or Server Actions, not duplicated into client state unless it needs to change client-side (e.g. optimistic form feedback).
- Form inputs are controlled, consistent with the Forms standards in Section 8.
- Use only standard React hooks and small custom hooks that wrap them — no new global state library is introduced without a documented, specific need (ties to Section 15).
- Avoid `useEffect` where a Server Component fetch, derived value, or event handler achieves the same result — an effect used only to sync state that could be computed inline is a signal to refactor.
- List rendering uses stable, meaningful keys (an entity's id) — never array index for lists that can reorder, filter, or change length.
- Prefer explicit early returns or discriminated-union-driven rendering over deeply nested ternaries for conditional UI.
- Loading, error, and empty states use the registered patterns from `ui-registry.md` (Spinner, Empty State, Pending Confirmation State, Status/Notification Banner) — never a one-off inline spinner or ad hoc "Loading..." string.
- Avoid excessive component abstraction — don't split a component into multiple files for a pattern used exactly once; see `ui-registry.md`'s Component Decision Checklist before introducing a new component.

This file does not maintain the component catalogue — see `ui-registry.md`.

---

## 5. Next.js App Router Standards

- Components are Server Components by default. `"use client"` is added only at the smallest possible subtree that actually needs interactivity, state, or browser APIs (e.g. the FAQ accordion trigger, the mobile nav drawer toggle, form input handling) — not at a whole page or layout level "just in case."
- Route organization follows `architecture.md`'s folder structure exactly, including the `(participant)`/`(admin)` conditional route groups — do not restructure it.
- Shared chrome (root layout, fonts, providers) lives in `layout.tsx` files, not duplicated per page.
- `loading.tsx`/`error.tsx`/`not-found.tsx` are added at a route segment where that segment performs a meaningful server-side data fetch or can meaningfully fail — not added reflexively to every route.
- Metadata (title, description) is defined per route via the App Router metadata API, since the public site's discoverability matters.
- Server-side data reads happen in Server Components via `lib/db/*` functions — never via client-side `fetch`/`useEffect` for data that's available at render time.
- Mutations go through Server Actions in `actions/*`, per `architecture.md`'s Data Flow diagrams — never a client-side direct Supabase mutation.
- Avoid unnecessary client-side fetching — if a Server Component can read the data at request time, it does, rather than shipping a client fetch.
- No Pages Router patterns (`getServerSideProps`, `getStaticProps`, a `pages/` directory) are introduced anywhere in this project.

---

## 6. Component Standards

- One clear responsibility per component, matching its place in the `ui-registry.md` layering: **Primitive → Composed Component → Page Pattern → Page.**
- A Primitive (Button, Input, Card, etc.) only renders and exposes interaction — it holds no business logic or data-fetching.
- A Composed Component (Prize Card, Timeline, Form Section, etc.) combines Primitives and may hold local UI state, but not server-side logic.
- A Page Pattern is a specific, reusable composition of Composed Components for a category of page (per `ui-registry.md`'s Page-Level Patterns section) — it is not itself a registered component.
- A Page (`app/**/page.tsx`) assembles Page Patterns/Composed Components and is responsible for server-side data loading via `lib/db`.
- Predictable prop APIs: components accept the minimum props needed to render their variants/states, not a grab-bag of unrelated configuration flags.
- Composition over duplication — before writing new markup, check `ui-registry.md` for an existing component that already does this.
- Any genuinely reusable component (used or intended for use in more than one place) is added to `ui-registry.md` as part of the same change that introduces it.
- Page-specific composition (a one-off arrangement of existing Composed Components for a single page) stays inline in that page's file — it does not need its own registry entry unless the arrangement itself becomes reused.
- Avoid giant components — if a component's file grows to mix data orchestration, multiple unrelated UI concerns, and deep conditional branching, split it along the layering above.
- Never embed authorization, validation, or database logic inside a UI component — that belongs in `actions/`/`lib/`, per `architecture.md`.
- Avoid duplicated UI implementations — two components that look similar are only merged if they represent the same reusable concept (see `ui-registry.md`'s Composition Rules on this exact point).

---

## 7. Styling Standards

- All styling is done via Tailwind utility classes that resolve to the tokens defined in `ui-tokens.md` (e.g. `bg-surface`, `text-text-primary`, `border-border`) — this file does not restate those values.
- Reuse existing shared UI primitives (`components/ui`) and registered components (`ui-registry.md`) before writing new markup for something that already exists.
- No raw hex/rgb/hsl values in `className` or `style` anywhere in the codebase.
- No arbitrary Tailwind values (`bg-[#e8384f]`, `p-[13px]`) where an existing token or spacing-scale value already covers the need.
- No local, page-specific "design system" — if a page seems to need a color, spacing value, or effect that doesn't exist, that's a proposed change to `ui-tokens.md`, not a local override.
- No duplicated component styles — if the same visual pattern is being hand-rolled in two places, it should be a shared component instead.
- Inline `style` attributes are used only for genuinely dynamic values that can't be expressed as a Tailwind class (e.g. a computed percentage width) — never for color, spacing, or typography that already has a token.
- Follow `ui-rules.md`'s composition rules exactly (hero-only effects, bookend-section gradient usage, card/button/badge composition) — do not reinterpret them per-page.

---

## 8. Forms and Validation

- Form fields are controlled inputs, per Section 4.
- Every form's authoritative validation schema is defined once with zod in `lib/validation`, per `architecture.md`.
- Client-side validation (immediate inline feedback) is optional and additive — it is never the only validation performed. The Server Action always re-validates with the same (or an equivalent, authoritative) schema before touching the database, regardless of what the client already checked.
- Field-level errors render via the Form Field pattern in `ui-registry.md`; form-level errors render via the Status/Notification Banner pattern.
- Submission/loading/success/error states follow the patterns already defined in `ui-rules.md`/`ui-registry.md` (button loading spinner, disabled state during submission, success banner) — no bespoke per-form loading treatment.
- **Do not invent registration fields, eligibility rules, or any other form content beyond what's confirmed.** The registration workflow (what fields exist, whether an account is created first) remains governed by `tbd.md`'s Registration and related entries. Build the Form Field/Form Section shell generically per `ui-registry.md`, and wire it to the actual field set only once that's confirmed — do not scaffold placeholder fields "to be safe."

---

## 9. Data Access and Supabase

Following `architecture.md`'s System Boundaries precisely:

- UI components (`components/`) never import `lib/supabase/server.ts` or any `lib/db/*` module — no exceptions.
- Server Components read data by calling `lib/db/*` functions.
- Mutations go through `actions/*`, which call `lib/validation` → `lib/auth` → `lib/db/*`, in that order, for every write.
- Service-role credentials, if ever introduced, exist only in server-only files never imported by a `"use client"` component, and are never returned in any action's response payload.
- Never trust client-provided authorization information (a hidden field claiming a role or ownership) — every privileged decision is re-derived server-side from the authenticated session and the resource's actual ownership record.
- Validate every input via a `lib/validation` schema before any database write.
- Handle database errors explicitly at the `lib/db` boundary — translate them into a safe, generic message before they reach the UI; never let a raw Supabase/Postgres error surface to the client.
- Keep query functions focused: one function does one clearly named query or mutation; if the same query is needed in two places, it's written once in `lib/db` and imported, not duplicated.
- Row Level Security is treated as defense-in-depth on every table, even though server-side code also enforces authorization in the application layer — RLS is not disabled or bypassed casually.
- Do not invent tables, columns, or relationships beyond what's defined in `architecture.md`'s schema. A genuinely new data need is an `architecture.md` change first, not a silent migration.

---

## 10. Authentication and Authorization

- Authentication (who the user is) is resolved via `lib/auth/session.ts`, per `architecture.md` — never re-implemented ad hoc in a component or action.
- Authorization (what they may do) is a separate, explicit, resource-specific check performed inside every relevant Server Action — e.g. "is this authenticated profile the owner/member of this specific team/registration/submission." It is never inferred from role alone.
- Role-based route gating happens in `middleware.ts` for the `(participant)`/`(admin)` route groups, per `architecture.md` — but this is not sufficient on its own.
- Every mutation re-checks authentication and authorization inside the Server Action itself, regardless of whether the route was already gated — actions can be invoked directly and must not rely solely on middleware.
- **UI visibility is not authorization.** Hiding a button, nav item, or page section for a given role is a UX convenience; it never substitutes for a server-side check.
- The authentication method itself (email/password vs. OTP vs. both) remains subject to `tbd.md`'s Authentication decision until confirmed. Do not invent or hardcode a specific auth workflow beyond the generic Input/Button-based shell described in `ui-registry.md`.

---

## 11. Error Handling

- Distinguish expected errors (validation failure, not-found resource, a duplicate action) from unexpected errors (a database connection failure, an unhandled exception).
- User-facing error messages are plain and non-technical — never a raw stack trace, SQL error, or internal identifier.
- All errors — expected and unexpected — are logged server-side with enough detail to debug, without logging sensitive participant data unnecessarily.
- Validation errors surface at the field level per Section 8.
- Database errors are caught and translated at the `lib/db` boundary, not deep inside a component.
- Failures in non-critical downstream services (e.g. a future Resend email call) fail gracefully without blocking or rolling back an already-successful primary operation, per `architecture.md`'s explicit guidance on email failures.
- Next.js `error.tsx` boundaries are used at the route-segment level to catch genuinely unexpected render errors — they are not a substitute for proper validation and expected-error handling.
- Never swallow an error silently. Every `catch` block either handles the error meaningfully, logs it with context, or re-throws — an empty `catch {}` is not acceptable.

---

## 12. Async and Loading States

- Every async user-triggered operation (form submit, any future team/submission/admin action) shows a loading state on its trigger, per the Spinner pattern in `ui-registry.md`.
- The trigger is disabled during the operation to prevent duplicate submissions.
- Loading states preserve layout stability — no content shift when a spinner appears (the trigger keeps its resting size, per `ui-rules.md`'s button loading-state rule).
- Optimistic updates are used only when the operation is very likely to succeed and reverting on failure is simple and non-confusing to the user; given the current early feature set, this is rarely justified and should default to waiting for server confirmation.
- Where a user could plausibly trigger the same async operation twice in quick succession, guard against a stale response overwriting a newer one (e.g. by ignoring out-of-order responses).

---

## 13. Naming Conventions

| Category | Convention | Example |
|---|---|---|
| Components | PascalCase, named for what they represent (per `ui-registry.md`'s naming rules) | `PrizeCard`, `PageHeader` |
| Component files | PascalCase, matching the component | `PrizeCard.tsx` |
| Route files | Fixed Next.js names | `page.tsx`, `layout.tsx` |
| Folders | kebab-case, matching `architecture.md`'s structure | `components/public` |
| Functions | camelCase, verb-first | `createRegistration`, `getHackathonConfig` |
| Variables | camelCase, descriptive | `registrationStatus` |
| Constants | SCREAMING_SNAKE_CASE only for true fixed constants | `MAX_UPLOAD_SIZE_MB` (if ever needed) |
| Types/interfaces | PascalCase, no `I` prefix | `Registration`, not `IRegistration` |
| DB-access functions | verb + entity | `getRegistrationForProfile` |
| Server Actions | verb-first, user-intent named | `submitRegistration`, not `handleSubmit` |
| Hooks | camelCase, `use` prefix | `useFormState` (if introduced) |
| Utility functions | camelCase, named for one behavior | `formatDate` |

Avoid vague names: `data`, `thing`, `helper`, `stuff`, `temp`, `foo`. Component names must not conflict with — and must exactly match — the names registered in `ui-registry.md`.

---

## 14. File and Folder Organization

- `architecture.md`'s folder tree is authoritative — do not introduce an alternate structure.
- Keep files focused: a component file contains that component and any tightly-coupled small sub-parts, not several unrelated components.
- Colocate small, component-specific types with the component; promote a type to `types/` once it's shared across files.
- Avoid unnecessary nesting — don't create a folder for a single file without a clear reason.
- Server-only code (`lib/db`, `lib/auth`'s server-side pieces, `lib/supabase/server.ts`) is kept clearly separate from anything importable by a `"use client"` component.
- Reusable UI lives in `components/ui` (primitives) and `components/public` (or `components/participant`/`components/admin` once those are confirmed and built), per `ui-registry.md`'s categorization.
- Do not create a second, parallel folder for a responsibility that already has a home (e.g. no ad hoc `helpers/` alongside `lib/utils.ts`).

---

## 15. Imports and Dependencies

- Import order: external packages first, then path-aliased internal imports (`@/lib`, `@/components`, `@/types`), then relative imports — with a blank line between groups.
- Use the `@/...` path alias consistently rather than long relative paths (`../../../lib/...`).
- Avoid circular dependencies — `lib/db` does not import from `actions/`; `components/` does not import from `app/`.
- Check for and reuse an existing utility/component (see `ui-registry.md` and `lib/utils.ts`) before writing a new one.
- Avoid adding a second library that duplicates a capability an existing dependency already provides.
- Add a new dependency only when the stack defined in `architecture.md` doesn't already cover the need, and only with a clear, stated purpose — mirroring `architecture.md`'s "every dependency must have a clear purpose" principle.
- Before using any project-specific third-party library in a non-obvious way, check `library-docs.md` for the established usage pattern rather than inventing one.

---

## 16. Security Standards

- Secrets and environment variables live only in server-only files and `.env.local` (gitignored) locally, and in Vercel's environment variable configuration in deployment — never committed to the repository.
- Never expose service-role keys, private environment variables, internal credentials, or sensitive database information to the client bundle.
- Authentication and authorization follow Section 10 — never rely on client-side-only checks.
- All inputs are validated (Section 8/9) before any database write or external call.
- Database access is exclusively through the Supabase client's parameterized query builder — no raw, string-concatenated SQL.
- Rendering relies on React's default escaping; `dangerouslySetInnerHTML` is not used unless content comes from a fully trusted, sanitized source, which does not currently exist in this project.
- File uploads (once the Submission feature is confirmed) are validated for type and size server-side — a client-declared MIME type is never trusted alone.
- External URLs (e.g. a submitted project link) are rendered as plain links, never auto-embedded or executed.
- Participant PII is never sent to analytics tooling (per `architecture.md`'s PostHog note) and is not logged in plaintext beyond what's operationally necessary.
- Server/client boundaries follow `architecture.md`'s Client Pattern section exactly.

---

## 17. Accessibility Standards

Implementation-level summary — see `ui-rules.md` and `ui-registry.md`'s Accessibility Registry for the full specification, not restated here:

- Use semantic HTML elements (`<nav>`, `<button>`, `<table>`, `<form>`) over generic `<div>` trees.
- Every interactive element is keyboard-operable with a visible `:focus-visible` state via the shared Focus Treatment.
- Every form input has a programmatically associated label.
- ARIA attributes are added only where native semantics fall short.
- Status/state is always communicated with an icon and/or text alongside color, never color alone.
- Motion respects `prefers-reduced-motion`.

---

## 18. Performance Standards

- Default to Server Components; add `"use client"` only to the smallest subtree that needs it.
- Avoid unnecessary re-renders — memoize only where a measured problem exists, not defensively by default.
- Use the Next.js `Image` component for any imagery, for automatic optimization.
- Use dynamic imports for genuinely large, rarely-needed client bundles (e.g. a future dense admin data-table library) rather than loading them on every page.
- Keep database queries focused — select only needed columns, and batch queries rather than looping individual requests where the access pattern allows it.
- Prefer a single server-side data fetch over multiple client-side round trips.
- Keep bundle size reasonable — don't import a large library for a small, easily hand-written need.
- Avoid premature optimization — don't add caching or memoization layers before there's an observed performance problem, consistent with `architecture.md`'s "avoid unnecessary complexity" principle.

---

## 19. Testing Standards

- Testing philosophy: prioritize the things that are expensive to get wrong — validation logic, authorization checks, and critical user flows — over chasing raw coverage numbers.
- Unit tests: `lib/validation` schemas and pure logic in `lib/db`/`lib/utils`.
- Component tests: Composed Components with meaningful interaction logic (e.g. FAQ Item expand/collapse, Form Field validation display).
- Integration tests: Server Actions, covering the full validate → authenticate → authorize → mutate path.
- End-to-end tests: the critical user flow(s) currently in scope (e.g. completing the public registration form as it exists today), expanding as conditional features (team, submission) are confirmed and built.
- Validation testing: both valid and invalid inputs behave correctly, and server-side validation cannot be bypassed by a malformed or direct request that skips the client.
- Authorization testing: a participant cannot read or modify another participant's/team's data; non-admin sessions are rejected by admin routes and actions.
- Regression testing: any bug fix is accompanied by a test that would have caught it.
- The testing framework/tooling is **not yet established** in `architecture.md` — this is a pending tooling decision, not something invented here. Once chosen, it should be recorded in `architecture.md` or a dedicated `library-docs.md` entry, not decided ad hoc per task.

---

## 20. Git and Change Standards

- Commits are focused and single-purpose; commit messages describe what changed and why, not just what.
- Avoid bundling unrelated changes into one commit or pull request.
- Before modifying a file, review its current state and recent history rather than assuming its purpose or authorship intent.
- Do not overwrite another agent's or contributor's work without understanding why it exists.
- Keep branches scoped to one task or decision.
- Resolve merge conflicts by understanding both sides' intent, not by mechanically picking one side.
- Document meaningful architectural changes in the relevant context file (`architecture.md`, `tbd.md`, etc.) as part of the same change — not as a "someday" follow-up.

---

## 21. Multi-Agent Development Rules

Because multiple agents may work on this repository over time:

1. Read the full context chain (`project-overview.md` → `tbd.md` → `architecture.md` → `ui-tokens.md` → `ui-rules.md` → `ui-registry.md`) before implementing anything non-trivial.
2. Check `tbd.md` before implementing anything that depends on an unresolved decision.
3. Check `ui-registry.md` before creating any new UI component.
4. Check `architecture.md` before changing any system boundary or folder structure.
5. Never silently resolve a TBD decision through implementation.
6. Do not modify a context file unless the change genuinely reflects a resolved decision or a documented process step — not as an incidental side effect of unrelated work.
7. When a decision becomes confirmed: update `tbd.md` first, then update any other affected context file, then implement the change — in that order.
8. Update `ui-registry.md` whenever a reusable component is added or materially changed.
9. Update `progress-tracker.md` whenever implementation status changes.
10. Never overwrite another agent's work without first understanding it.
11. Keep changes within the assigned task's scope.

---

## 22. Definition of Done

Before considering a task complete, verify:

- Requirements match `project-overview.md`.
- No `tbd.md` "Not Confirmed" item was silently assumed.
- Architecture boundaries (`architecture.md`) are respected.
- Existing components were reused where appropriate; new reusable components were added to `ui-registry.md`.
- TypeScript has no avoidable unsafe typing (`any`, unchecked assertions).
- Validation exists wherever user input reaches a mutation.
- Authorization is enforced server-side wherever a resource is accessed or changed.
- Loading, error, and empty states are handled using the established patterns.
- Accessibility requirements from `ui-rules.md`/`ui-registry.md` are satisfied.
- Responsive behavior follows `ui-rules.md`.
- No raw visual values were introduced outside the token system.
- Tests are added or updated where the Testing Standards call for them.
- Unrelated files were not changed.
- `progress-tracker.md` is updated when implementation status has changed.

---

## 23. Forbidden Practices

- `any` without a justified, commented exception.
- Hardcoded secrets or credentials anywhere in the repository.
- Client-side-only authorization checks.
- Direct database access from a UI component.
- Invented product requirements or hackathon rules.
- Bypassing `tbd.md` by implementing around an unresolved decision.
- Bypassing `architecture.md`'s system boundaries.
- Raw hex/rgb/hsl colors or arbitrary Tailwind color values in UI code.
- Duplicate components that already exist in `ui-registry.md`.
- Unnecessary dependencies added for convenience.
- Giant, multi-responsibility components.
- Swallowed errors (empty `catch` blocks).
- Unrelated refactors bundled into a task's change.
- Speculative implementation of a conditional feature before its `tbd.md` decision is confirmed.
- Silently changing an architectural, design, or product decision instead of updating the owning context file first.

---

## 24. Standards Hierarchy

1. System/developer instructions
2. `project-overview.md` — product scope and confirmed requirements
3. `tbd.md` — decision status and unresolved constraints
4. `architecture.md` — technical architecture
5. `ui-tokens.md` — design values
6. `ui-rules.md` — UI composition
7. `ui-registry.md` — reusable UI components
8. `code-standards.md` — implementation conventions (this file)
9. `library-docs.md` — project-specific third-party library usage
10. `build-plan.md` — implementation sequencing
11. `progress-tracker.md` — current implementation state

If two context files appear to conflict, do not silently choose one: identify the conflict, follow the higher-priority source for the immediate task, and update the lower-priority or outdated file so the conflict doesn't recur.
