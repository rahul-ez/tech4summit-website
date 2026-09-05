# Tech4Bharat 2026 — Site Structure

Scope: the informational website only. Registration and team-formation flows are intentionally deferred to a later phase (per team decision) — the CTA buttons below should link to a placeholder or external form for now.

Structure: single scrolling landing page. Background treatment (gradient vs. flat) refers to design-system.md.

## Home page — section order

1. **Hero** — *gradient*
   - Nav bar: wordmark/logo, links to About / Timeline / Prizes / Partners
   - Eyebrow: "An initiative of Karnataka Arya Vysya Mahasabha"
   - Headline: Global Accelerator Vision Summit 2026 — India's Biggest Hackathon
   - Sub-headline: Tech4Bharat wordmark + tagline "Scalable innovations for next-gen India"
   - Primary CTA: Register now (placeholder link for now) · Secondary: Explore theme
   - Quick-stat strip: prize pool, dates, venue, format

2. **About Tech4Bharat** — flat navy
   - What Tech4Bharat is, its link to GAVS 2026 and KAVMS
   - *[CONFIGURABLE — see content-config.md: exact positioning copy TBD]*

3. **The Theme** — flat navy
   - "Scalable Innovations for Next-Gen India" explained: why "scalable," what kind of solutions are in scope

4. **Format** — flat navy
   - Visual breakdown: Online preliminary rounds → On-site grand finale

5. **Timeline** — flat navy
   - Registration opens (7 Sept 2026) → Prelims → Grand finale (25–27 Dec 2026)
   - *[CONFIGURABLE: registration closing date not yet confirmed]*

6. **Prizes** — *gradient (bookend)*
   - 1st ₹3,00,000 · 2nd ₹2,00,000 · 3rd ₹1,00,000, styled after the poster's prize cards

7. **Tracks / Problem Statements** — flat navy
   - *[CONFIGURABLE / PLACEHOLDER: not yet confirmed — show a "coming soon" card, not an empty section]*

8. **Rules & Eligibility** — flat navy (readability priority — no gradient, no heavy decoration)
   - *[CONFIGURABLE: team size and eligibility criteria not yet confirmed]*

9. **Organizers & Partners** — flat navy
   - Distinct treatment for: RVCE (Host) · Karnataka Arya Vysya Mahasabha / KAVMS (Organizing initiative) · HackCulture (Platform Partner) · GAVS 2026 (Associated summit)

10. **FAQ** — flat navy

11. **Closing CTA / Footer** — *gradient (bookend) or deep navy `#050B1E`*
    - Final register CTA, contact info, socials, sponsor logo strip, legal

## Explicitly out of scope for this phase
- Registration form / auth flow
- Team creation & management
- Participant dashboard
- Project submission portal
- Admin/organizer panel

These are documented in Overview.md as future site sections but are not part of the current build.

## Content sourcing rule
Any section marked `[CONFIGURABLE]` above must pull from a central config (see content-config.md) rather than being hardcoded in page templates — these values are expected to change before launch.
