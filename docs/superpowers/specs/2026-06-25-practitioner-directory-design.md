# Practitioner Directory Design

## Purpose

Build the public practitioner directory for the Aesthetic Training Hub take-home test. The goal is a clean, working slice that shows students a populated marketplace directory and makes paid Premium listings visibly more valuable than Standard listings.

The implementation should stay deliberately small: a single public directory page, typed seed data, client-side specialism filtering, and README documentation. It should not attempt admin tools, subscriptions, checkout, trainer onboarding, profile pages, or persistence.

## Product Assumptions

- "Practitioner" in the brief means a vetted UK aesthetics trainer listed in the marketplace.
- Students are the primary public users. Their main job is to find a trainer by relevant training specialism.
- Premium tier should receive visible directory advantage, but the test does not define exact contractual benefits. For this slice, Premium listings appear before Standard listings and receive stronger visual treatment.
- Seed data can be fictional but should feel plausible for the UK aesthetics training market.

## Architecture

Use the existing Next.js App Router starter app and keep the feature in the `app` directory plus a small local data module. The page at `/` should render the directory experience directly instead of a marketing landing page.

The data source will be a typed in-memory array. Filtering should happen client-side because the dataset is small and the brief explicitly allows in-memory data. The server page can import the dataset and pass it into a client component responsible for filter state.

Suggested structure:

- `app/page.tsx`: page shell, metadata-level content, imports seed data and renders the directory.
- `app/data/practitioners.ts`: typed practitioner model, tier union, and seed practitioners.
- `app/components/practitioner-directory.tsx`: client component that owns selected specialism and filtered result rendering.
- `app/components/practitioner-card.tsx`: presentational card with tier-specific visual treatment.
- `app/globals.css`: small global theme adjustments only if Tailwind utility classes are not enough.
- `README.md`: replace starter text with run instructions, progress report, and brief critique.

This is intentionally not a database-backed architecture. The README should call out that a real product would move this to persistent trainer records with ranking, subscription status, moderation, and searchable profile fields.

## UI And UX

Use the Curated Card Grid direction.

The first viewport should clearly communicate that this is the Aesthetic Training Hub practitioner directory, not a generic starter app or marketing splash page. The hierarchy should prioritize:

1. Directory title and short student-focused description.
2. Filter control and result count.
3. Premium-first practitioner cards.

Premium practitioners should stand out through a combination of ordering and styling:

- Premium cards appear before Standard cards.
- Premium cards use a visible "Premium" or "Featured trainer" badge.
- Premium cards receive a warmer accent border, stronger elevation, and slightly richer metadata treatment.
- Standard cards remain professional and usable, but visually quieter.

The interface should feel modern and marketplace-like: restrained color palette, clear spacing, readable typography, no decorative clutter, and responsive cards that work from mobile to desktop. The filter should be obvious and accessible, with an "All specialisms" option and keyboard-friendly native controls or buttons.

## Filtering

Filter by specialism, not location. Specialism is the stronger student-intent filter for a training marketplace and lets the page demonstrate useful discovery with minimal scope.

Derive available specialisms from the seed data to avoid duplicating filter options. Selecting a specialism should update the rendered list immediately. Show the number of matching practitioners. Include a small empty state in case a future dataset/filter combination has no matches.

## Seed Data

Include 6 to 8 fictional UK trainers. Each practitioner should have:

- `id`
- `name`
- `specialisms`
- `location`
- `tier`
- optional short supporting line if useful for visual polish

Suggested specialisms:

- Foundation Botox
- Dermal Fillers
- Skin Boosters
- Complication Management
- Facial Anatomy
- Laser and IPL
- Business Mentoring

Use both tiers, with enough Premium entries to make the differentiated treatment visible without making Standard feel like an afterthought.

## Error Handling And Edge Cases

Because this is static seed data, runtime error handling should stay minimal. The main edge cases are UI states:

- No filter selected: show all practitioners.
- Filter selected: show only practitioners with that specialism.
- No matches: show a calm empty state with a reset control.

Avoid overbuilding validation, loading states, API error states, or database failure handling because they do not exist in this slice.

## Testing And Verification

Before implementation, read the relevant local Next.js 16 documentation in `node_modules/next/dist/docs/` because `AGENTS.md` warns that this version differs from prior conventions.

Verification should include:

- `npm run lint`
- `npm run build`
- Manual browser check of the running app at a local URL
- Responsive sanity check for mobile and desktop widths

The manual check should confirm that Premium cards stand out, filtering changes the list, result counts update, and the README accurately reflects the final implementation.

## README Requirements

The README should include:

1. How to run the app.
2. A short progress report covering what was built, what was left out, and what would come next.
3. A direct critique of unclear or underspecified parts of the brief.

The critique should be frank and useful. It should mention:

- "Practitioner" and "trainer" are used in ways that could imply different user records.
- Premium and Standard benefits are priced but not behaviorally defined.
- Ranking rules are missing, especially whether Premium should always outrank Standard.
- Vetting criteria and listing approval states are outside the brief but central to trust.
- The target student journey is unclear after discovery: enquiry, booking, course comparison, or trainer profile view.

## Out Of Scope

- Real authentication
- Admin practitioner management
- Stripe or subscription billing
- Database persistence
- Search across all fields
- Trainer detail pages
- Booking or enquiry forms
- Real LLM API integration

An optional AI note in the README is enough. A practical suggestion: use an LLM later to normalize trainer-entered specialisms into canonical tags, generate student-friendly summaries for approved profiles, or power semantic search across course/trainer descriptions. Do not add a real API dependency for the test.
