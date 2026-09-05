# Build Plan

## 1. Build Strategy

The build is **UI-first and progressively enhanced**: the visual foundation (tokens, primitives, composed components) is built before any page, and pages are built with confirmed content before any backend wiring exists. This is deliberate given the project's actual situation — registration opens 7 September 2026, a near-term date, while team structure, submission format, registration fields, and the HackCulture integration model are all still unresolved per `tbd.md`.

- **Confirmed vs. conditional functionality** stays visibly separated throughout the plan. Nothing in Phases 0–3 depends on an unresolved decision. Phases 4–6 are explicitly gated on specific `tbd.md` items becoming Confirmed.
- **Mock-data and configuration-driven content** carry the public site through Phase 2 — confirmed facts (dates, prizes, format) come from `config/site.ts`/`hackathon_config`-shaped static data, not a live database, until Phase 5 actually stands up Supabase.
- **Incremental validation:** each phase ends in a working, deployable state — the site is never "half-broken" between phases, only "missing features that were never promised yet."
- **Progressive enhancement:** the public informational site works correctly with zero backend, then gains registration, then (conditionally) participant and admin functionality — each layer added without restructuring the layer below it, per `architecture.md`'s explicit design goal.

---

## 2. Phase Overview

| Phase | Goal | Main Deliverables | Dependencies | Status |
|---|---|---|---|---|
| 0 — Foundation | Project scaffolding and global configuration | Next.js project, Tailwind/token setup, folder structure, fonts, base config | None | Not started |
| 1 — Design System | Reusable UI primitives and composed components | Button, Input, Card, Badge, etc.; Site Header, Hero, Page Header, FAQ, Timeline, Prize Card, Empty/Pending states | Phase 0 | Not started |
| 2 — Public Website | Confirmed informational pages | Home, About, Timeline, Prizes, Rules, FAQ, Challenges (pending state) | Phase 1 | Not started |
| 3 — Registration Entry | Registration page shell, scoped to what's confirmed | `/register` page, Form Field/Section primitives, mock submit flow | Phase 1, Phase 2 (nav/CTA wiring) | Blocked on field confirmation for full functionality |
| 4 — Participant Experience | Dashboard/team/submission UI | Conditional — none until decisions confirmed | Phase 3 | Conditional / Not started |
| 5 — Backend & Integrations | Supabase, auth, real registration persistence | `lib/supabase`, `lib/auth`, `hackathon_config`, `registrations` table, real Server Action wiring | Phase 0 (config), Phase 3 (UI shell) | Partially blocked on Authentication decision |
| 6 — Admin | Admin data-management UI | Conditional — none until HackCulture integration model confirmed | Phase 5 | Conditional / Not started |
| 7 — QA & Launch | Cross-cutting verification and deployment | Responsive/accessibility/security/performance pass, Vercel deployment | All prior phases relevant to what's shipped | Not started |

---

## 3. Detailed Phase Plans

### Phase 0 — Foundation

**Objective:** Stand up the project skeleton so every later phase has a consistent base to build on.

**Tasks:**
1. Initialize the Next.js App Router project with TypeScript in strict mode, per `architecture.md`.
2. Configure Tailwind CSS and create `globals.css` with the complete token set from `ui-tokens.md`, verbatim.
3. Configure `tailwind.config.ts` to map those tokens (colors, radius, fonts) and to align the `screens` breakpoints with `ui-tokens.md`'s actual breakpoints, per `library-docs.md`'s Tailwind note.
4. Load Sora, Inter, and JetBrains Mono via `next/font/google` in the root layout, per `ui-tokens.md`/`ui-rules.md`.
5. Create the folder structure exactly as specified in `architecture.md` (`app/`, `components/`, `lib/`, `actions/`, `types/`, `config/`, `middleware.ts`), including empty placeholders only where a route/file is already justified by confirmed scope — do not pre-create `(participant)`/`(admin)` route groups yet (Phase 4/6 gated).
6. Create `config/site.ts` populated only with the confirmed facts listed in `tbd.md`'s Confirmed table (name, theme, dates, location, format, prizes, platform partner name, host institution).
7. Set up path aliases (`@/*`) and base ESLint/TypeScript config consistent with `code-standards.md`.
8. Create the root `layout.tsx` with fonts, global providers (none required yet), and the dark-mode-only `<html>`/`<body>` setup — no light-mode toggle, per `ui-tokens.md`.

**Dependencies:** None.

**Outputs:** A runnable, deployable Next.js app with the correct folder structure, tokens, and fonts in place — no pages beyond a placeholder yet.

**Validation:** `npm run build` succeeds; the token CSS variables are visible in browser dev tools on any rendered element; strict TypeScript reports no errors.

**Completion Criteria:** Project builds and deploys to a Vercel preview with the correct dark-navy background and fonts loading correctly, with zero product pages required yet.

**Deferred / Conditional Work:** Any Supabase setup (Phase 5), any route group for participant/admin (Phase 4/6).

---

### Phase 1 — Design System

**Objective:** Implement every UI primitive and composed component that `ui-registry.md` justifies for the confirmed public scope, so no later page-building work duplicates markup.

**Tasks:**
1. Add shadcn/ui primitives one at a time, only for what's registered as Planned in `ui-registry.md`: Button, Input, Textarea, Select, Checkbox, Radio, Badge, Card, Drawer, Separator. Customize each immediately with token classes per `library-docs.md`.
2. Implement Spinner and the shared Focus Treatment as described in `ui-registry.md`.
3. Implement Composed Components needed for the confirmed public site: Site Header, Mobile Navigation Drawer, Page Header, Hero, FAQ Item/Accordion, Timeline, Prize Card, Prize Display, Empty State, Pending Confirmation State.
4. Wire up the hero's ignition-glow and circuit-texture background exactly as scoped in `ui-rules.md` — hero-only, no reuse elsewhere yet.
5. Verify responsive behavior for every implemented component against `ui-rules.md`'s Responsive Behavior table.
6. Verify accessibility for every implemented component against `ui-rules.md`'s and `ui-registry.md`'s Accessibility sections (focus-visible, labels, ARIA, reduced motion).
7. Update `ui-registry.md`: move every implemented component's status from Planned to Active, per `code-standards.md`'s maintenance rule.

**Dependencies:** Phase 0's token/font setup.

**Outputs:** A working component library, visually verifiable in isolation (e.g. a temporary internal preview route, removed before launch, or Storybook-equivalent if one is later justified — not required for launch).

**Validation:** Each component matches its `ui-rules.md` composition rules under manual inspection; keyboard navigation and focus states work; `ui-registry.md` accurately reflects Active status for everything built.

**Completion Criteria:** Every primitive/composed component needed for Phase 2's pages exists, is token-driven, and is registered as Active.

**Deferred / Conditional Work:** Form Field/Form Section (built in Phase 3, since their only current consumer is `/register`); Table/Table Empty State (deferred entirely — only needed by conditional participant/admin surfaces); Dialog/Modal (deferred until a concrete flow needs it, per `ui-registry.md`).

---

### Phase 2 — Public Website

**Objective:** Ship the confirmed informational site — the part of the product that has no dependency on any unresolved `tbd.md` decision.

**Tasks:**
1. Build `/` (Home): Hero + About/Theme/Format summary sections + Timeline bookend + Prizes bookend + closing CTA, per `site-structure.md`'s section order and `ui-rules.md`'s bookend gradient placement.
2. Build `/about`: Page Header + confirmed description of Tech4Bharat and its relationship to GAVS 2026.
3. Build `/timeline`: Page Header + Timeline component, rendering only the two confirmed milestones (registration opens 7 Sept 2026; event 25–27 Dec 2026) — any further milestone node uses the Timeline's pending-date state, never a fabricated date.
4. Build `/prizes`: Page Header + full Prize Display (three confirmed tiers + total pool) — no additional/track prize content.
5. Build `/rules`: Page Header + confirmed structural content only; wrap eligibility/team-size/other unconfirmed subsections in the Pending Confirmation State pattern.
6. Build `/challenges`: Page Header + Pending Confirmation State for the entire page body, since no problem statement or track content is confirmed.
7. Build `/faq`: Page Header + FAQ Accordion, populated only with genuinely answerable questions about confirmed facts — do not invent FAQ content about unconfirmed processes.
8. Wire the Site Header and Mobile Navigation Drawer across all public pages, with the Register CTA linking to `/register`.
9. Populate every page's confirmed facts from `config/site.ts` — no hardcoded duplicate strings.

**Dependencies:** Phase 1's component library.

**Outputs:** A fully navigable, fully responsive public informational site with zero backend dependency.

**Validation:** Every confirmed fact displayed matches `tbd.md`'s Confirmed table exactly; every unconfirmed item renders via Pending Confirmation State, not fabricated content or a broken-looking blank section; Lighthouse/manual accessibility pass on each page.

**Completion Criteria:** All seven public pages are live, responsive, accessible, and contain no invented hackathon information.

**Deferred / Conditional Work:** Any real challenge/rules content (waits on organizer confirmation, then is a content update, not a rebuild); any database-backed content (Phase 5).

---

### Phase 3 — Registration Entry

**Objective:** Give the site a registration entry point without inventing the registration workflow, fields, or eligibility that `tbd.md` marks unresolved.

**Tasks:**
1. Implement the Form Field and Form Section composed components generically, per `ui-registry.md` — no specific fields hardcoded into the component itself.
2. Build the `/register` page shell: Page Header + a form container.
3. **Branch on confirmation status at build time:**
   - If the registration field set/workflow has been confirmed in `tbd.md` by the time this phase is implemented, build the actual form using exactly those confirmed fields, wired to a mock (non-persisting) submit handler that shows the Status/Notification Banner success state.
   - If it has not been confirmed, render the Pending Confirmation State pattern in place of the form itself (e.g. "Registration opens 7 September 2026 — the registration form will be available here once finalized"), using only the confirmed opening date. Do not scaffold placeholder fields "to be ready."
4. Ensure the Hero's and Site Header's Register CTA link to `/register` regardless of which branch above applies — the entry point exists even if the form itself is pending.
5. Add the Status/Notification Banner for the mock success state (branch 1 only).

**Dependencies:** Phase 1 (Card, Input, Button, Badge, Status Banner), Phase 2 (Page Header, nav wiring).

**Outputs:** A working, honest `/register` page — either a real (mock-submitting) form or a clearly-pending page, never a fabricated form.

**Validation:** No field on the page corresponds to an invented requirement; if the pending branch is used, the messaging matches the Pending/Unconfirmed Content rules in `ui-rules.md` exactly (no "broken page" impression).

**Completion Criteria:** `/register` is reachable from every entry point on the site and communicates the correct state (functional mock form, or honest pending message) as of the current `tbd.md` status.

**Deferred / Conditional Work:** Real database persistence of registrations (Phase 5); account creation/authentication tied to registration (Phase 5, gated on the Authentication decision); team formation as part of registration (Phase 4, gated on Team Structure).

---

### Phase 4 — Participant Experience

**Objective:** Not started under this plan unless and until the relevant `tbd.md` decisions are confirmed. This phase exists in the roadmap to hold the eventual work, not to authorize it now.

**Tasks:** None yet. When the "Participant Experience," "Team Structure," and/or "Submission" decisions in `tbd.md` become Confirmed:
1. Move the relevant Conditional Components in `ui-registry.md` (Team components, Participant dashboard components, Submission components, Upload component, Participant status panels) to Planned.
2. Build the `(participant)` route group per `architecture.md`'s folder structure.
3. Implement Table/Table Empty State if the confirmed workflow requires tabular participant data.
4. Follow Phases 1–3's same UI-first, token-driven approach for any new components this introduces.

**Dependencies:** Phase 3 (registration must exist first, conceptually); the specific `tbd.md` decisions listed above.

**Outputs:** None until triggered.

**Validation:** N/A until triggered.

**Completion Criteria:** N/A until triggered.

**Deferred / Conditional Work:** Everything in this phase, by definition, until `tbd.md` changes.

---

### Phase 5 — Backend & Integrations

**Objective:** Replace the mock/config-driven data layer with real Supabase-backed persistence, starting with what's already confirmed to be needed.

**Tasks:**
1. Provision the Supabase project; set `NEXT_PUBLIC_SUPABASE_URL`/`NEXT_PUBLIC_SUPABASE_ANON_KEY` per `architecture.md`/`library-docs.md`.
2. Implement `lib/supabase/client.ts` and `lib/supabase/server.ts` exactly per `architecture.md`'s Client Pattern.
3. Create the `hackathon_config` table and seed it with the confirmed facts from `tbd.md`'s Confirmed table (dates, prizes, etc.) as `jsonb` values; leave unconfirmed keys `null`.
4. Migrate `config/site.ts`-driven pages (Phase 2) to read from `hackathon_config` via `lib/db/config.ts`, replacing the static config source without changing any rendered content.
5. Create the `profiles` table (mirroring `auth.users`) and the `registrations` table, per `architecture.md`'s schema — only with the columns architecture.md already defines, plus any additional field explicitly confirmed via `tbd.md` in the meantime.
6. Implement `lib/auth/session.ts` and `middleware.ts`'s baseline (even with no protected routes yet, the pattern should exist for Phase 4/6 to extend).
7. **Gated on the Authentication decision in `tbd.md`:** implement the actual sign-in method (email/password and/or OTP) once confirmed. Do not implement a guessed method beforehand.
8. **Gated on Phase 3's branch:** if `/register` shipped as a real mock-submitting form, replace the mock submit with `actions/register.ts` performing real validation → auth check (if applicable) → database write, per `architecture.md`'s Registration Flow.
9. **Gated on their respective `tbd.md` decisions:** implement Supabase Storage (Submission), Resend (Email/Notifications), and/or PostHog (Analytics) only if and when each is confirmed as needed — none is implemented speculatively.

**Dependencies:** Phase 0 (config baseline), Phase 3 (registration UI, if built).

**Outputs:** A real Supabase-backed data layer for everything already confirmed; registration either fully functional (if fields/auth are confirmed) or still honestly pending.

**Validation:** RLS is enabled on every table (even if policies start permissive-and-explicit rather than complex); no service-role key appears in any client-importable file; `lib/db` functions are the only place any table is queried.

**Completion Criteria:** Confirmed data (hackathon facts) is served from Supabase, not static config; registration either persists real submissions or the page still honestly reflects pending status — never a form that silently discards input.

**Deferred / Conditional Work:** Storage/Resend/PostHog until their decisions are confirmed; the actual auth method's full UI/UX until confirmed; anything gated by Phase 4/6.

---

### Phase 6 — Admin

**Objective:** Not started under this plan unless and until the HackCulture integration model and Admin decisions in `tbd.md` are confirmed.

**Tasks:** None yet. Note that `tbd.md` already recommends manual Supabase-dashboard content editing for launch — meaning **this phase may never be required for the confirmed launch scope at all.** When the Admin/HackCulture decisions become Confirmed:
1. Determine from the confirmed decision whether a custom `/admin` is being built at all, or whether HackCulture's tooling is the system of record.
2. If custom: build the `(admin)` route group per `architecture.md`, gated by `middleware.ts` role checks, following the same UI-first approach as prior phases.
3. Move relevant Conditional Components (Admin data-management components) in `ui-registry.md` to Planned, then Active as implemented.

**Dependencies:** Phase 5 (auth/db must exist); the HackCulture Integration and Admin decisions in `tbd.md`.

**Outputs:** None until triggered.

**Validation / Completion Criteria:** N/A until triggered.

**Deferred / Conditional Work:** Everything in this phase, by definition, until `tbd.md` changes. Do not build any admin UI "just in case" — this is explicitly the highest-risk phase for duplicating HackCulture functionality prematurely.

---

### Phase 7 — QA and Launch

**Objective:** Verify the shipped scope (whatever that turns out to be — Phases 0–3/5 at minimum) is production-ready.

**Tasks:**
1. Full responsive pass across mobile/tablet/desktop/large-desktop for every shipped page, per `ui-rules.md`'s Responsive Behavior.
2. Full accessibility pass: keyboard navigation, focus visibility, contrast, ARIA correctness, reduced-motion behavior, per `ui-rules.md`.
3. Security review: confirm no secrets are exposed client-side, RLS is enabled, every mutation re-validates and re-authorizes server-side, per `code-standards.md`.
4. Performance pass: confirm Server Components are used by default, images (if any) are optimized, bundle size is reasonable.
5. Content review: re-verify every rendered fact against `tbd.md`'s Confirmed table — nothing invented should have slipped in during implementation.
6. Deploy to Vercel production, connected to the production Supabase project.
7. Final registration-flow smoke test end-to-end (including the pending-state branch, if that's what shipped).

**Dependencies:** Every phase that's actually in scope for this launch.

**Outputs:** A deployed, production-ready site.

**Validation:** Manual QA checklist below (Section 7) fully passes.

**Completion Criteria:** Site is live at the production domain before or at the 7 September 2026 registration-open date, with all shipped functionality verified.

**Deferred / Conditional Work:** Anything still gated in Phase 4/6 — launch does not wait on conditional features that aren't confirmed.

---

## 4. Dependency Order

```
Phase 0 (Foundation)
  → Phase 1 (Design System)
    → Phase 2 (Public Website)
      → Phase 3 (Registration Entry)
        → Phase 5 (Backend & Integrations) — partially parallel with Phase 3
          → Phase 7 (QA & Launch)

Phase 4 (Participant Experience) — branches off after Phase 3, only if triggered by tbd.md
Phase 6 (Admin) — branches off after Phase 5, only if triggered by tbd.md
```

Phase 5 can begin in parallel with the later part of Phase 3 (e.g. standing up `hackathon_config` while the registration UI is still being built), but registration cannot be *fully* wired to real persistence until both the UI shell (Phase 3) and the auth/db layer (Phase 5) exist. Phases 4 and 6 are intentionally not forced into the main chain — they are conditional branches, not sequential steps, and the project can reach a complete, launchable state (Phase 7) without ever executing them.

---

## 5. Mock Data Strategy

- **Static confirmed event information:** sourced from `config/site.ts` (Phase 0–2) and later `hackathon_config` (Phase 5) — never hardcoded per-component.
- **Mock timeline data:** only the two confirmed milestones are ever mocked or seeded; do not add a placeholder "Submission Deadline: TBD" row with a fake date — use the Timeline's pending-date state instead, which is a real UI state, not mock data pretending to be real.
- **Mock prize data:** the three confirmed tiers and total pool — no mock "bonus prize" categories.
- **Pending/unconfirmed content:** never mocked as if real. The Pending Confirmation State is the correct tool here, not placeholder copy.
- **Conditional challenges:** no mock challenge cards are created. `/challenges` uses Pending Confirmation State for its entire body until real content exists.
- **Participant mock states (Phase 4, once triggered):** if dashboard/team mock states are needed for UI development before the backend is wired, they must be clearly fake data used only in local development, never deployed to production before real data exists.
- **Submission mock states (Phase 4/5, once triggered):** same rule — mock only for local development, never shipped as if real.

The overriding rule: **mock data speeds up UI development; it never becomes a substitute for an honest Pending Confirmation State on a real page.**

---

## 6. Configuration Strategy

- All confirmed, relatively stable event facts live in one place: `config/site.ts` initially, then `hackathon_config` once Phase 5 stands up Supabase — never duplicated as literal strings across components.
- Unconfirmed values are represented as `null` in `hackathon_config`, per `architecture.md` — this is the single mechanism for "we don't know this yet," not a scattered set of `// TODO` comments or hardcoded placeholder text.
- Feature flags for conditional functionality (participant dashboard, team, submission, admin) live alongside this configuration once Phase 4/6 are triggered — a flag being off is what keeps a route group from existing/rendering, not a runtime UI check.
- The HackCulture integration is not represented as configuration at all until `tbd.md`'s HackCulture Integration decision is confirmed — there's nothing to configure about an integration model that doesn't exist yet.
- Do not create a second, parallel configuration mechanism (e.g. a separate JSON file, a separate admin-editable table) alongside `hackathon_config` — one mechanism, per `architecture.md`.

---

## 7. Definition of Done (Project-Wide)

- Functionality matches the confirmed scope in `project-overview.md` for whatever phase was completed.
- Every page is fully responsive per `ui-rules.md`'s Responsive Behavior.
- Accessibility requirements (keyboard nav, focus-visible, contrast, ARIA, reduced motion) are met on every shipped page.
- Visual consistency: every component traces to `ui-tokens.md`/`ui-rules.md`; no raw values.
- TypeScript strict mode passes with no unjustified `any`.
- Validation exists wherever user input reaches a mutation (Zod schemas, server-side enforced).
- Loading/error/empty/pending states are handled using the registered patterns, not ad hoc treatments.
- Authorization is enforced server-side wherever a resource is accessed or changed (once any such resource exists).
- No UI component performs direct database access.
- No secret or service-role credential is exposed client-side.
- No hackathon information beyond `tbd.md`'s Confirmed table appears anywhere as if it were fact.
- No functionality duplicates what HackCulture may already provide, ahead of its integration model being confirmed.
- `ui-registry.md`, `tbd.md`, and `progress-tracker.md` are updated to reflect the actual implementation state.

---

## 8. Context Maintenance

- **`ui-registry.md`:** update immediately whenever a component moves from Planned to Active, is materially changed, or is deprecated/removed — as part of the same change, not a follow-up.
- **`tbd.md`:** update the moment any decision moves from Not Confirmed to Confirmed, or when a new unresolved question is discovered during implementation — record it there rather than deciding it silently in code.
- **`progress-tracker.md`:** update after any meaningful implementation milestone (a phase task completed, a page shipped, a decision unblocking new work) so the next agent knows the actual current state without re-deriving it from the code.
- **`architecture.md`:** update only when an actual architectural boundary, schema, or pattern genuinely changes — not for routine implementation work that already fits the existing architecture.
- **Other context files** (`ui-tokens.md`, `ui-rules.md`, `code-standards.md`, `library-docs.md`): updated only when the underlying value/rule/convention genuinely changes, following the same file's own maintenance section.

No coding agent silently changes an architectural, design, or product decision instead of updating the file that owns it first.

---

## 9. Implementation Rules

- Build confirmed functionality before conditional functionality, every time.
- Never implement a `tbd.md` "Not Confirmed" item as though it were settled.
- Prefer a reusable component (per `ui-registry.md`) over a page-specific duplicate.
- Keep conditional functionality (Phases 4 and 6) fully isolated behind their own route groups and decision gates — never half-built into the confirmed public site.
- Use mock/config-driven data until the corresponding backend behavior is actually confirmed and implemented.
- Validate each phase's Completion Criteria before starting the next phase's tasks.
- Update `progress-tracker.md` after meaningful implementation work, not just at phase boundaries.
- Update `ui-registry.md` the moment a component moves from Planned to Active.
- If a new unresolved decision is discovered mid-implementation, record it in `tbd.md` immediately rather than making a silent call to keep moving.
