# Directory Standout Enhancement Design

## Purpose

Improve the existing Aesthetic Training Hub directory so it reads as a product-minded marketplace slice, not only a basic filtered list. The enhancement should strengthen two hiring signals:

- Student decision support: help a prospective student understand which trainer fits their stage, preferred training format, and trust needs.
- Marketplace judgment: make Premium placement and ranking behavior explicit instead of leaving commercial rules implied.

The work should remain a small take-home enhancement. Do not add authentication, database persistence, payments, profile pages, search APIs, or real LLM calls.

## Current Baseline

The app already has:

- A public directory page at `/`.
- Typed in-memory practitioner data.
- Premium-first ordering.
- A client-side specialism filter.
- Responsive cards.
- A submission README with run instructions and brief critique.

The current UI satisfies the original brief. This enhancement is about making the slice feel more commercially and UX aware.

## Product Assumptions

- Students do not choose trainers only by specialism and city. They also care about whether the course fits their experience level, whether training is hands-on, and whether the provider has credible trust signals.
- Premium tier can be treated as a paid placement, but the UI should be transparent about that ordering because trust matters in an education marketplace.
- The directory should help students compare options without requiring trainer detail pages.

## Data Model Additions

Extend each practitioner with:

- `audience`: short label such as `Beginners`, `Advanced injectors`, `Clinic owners`, or `Skin specialists`.
- `format`: short label such as `Small group`, `1:1 mentoring`, `Hands-on models`, or `Blended learning`.
- `trustSignals`: two or three short labels such as `Doctor-led`, `CPD aligned`, `Complications support`, `Live model practice`, or `Post-course mentoring`.
- `nextCohort`: short availability note such as `Next cohort: 12 July` or `Monthly intake`.

These values should be fictional but plausible and should stay short enough to fit on mobile cards.

## Filtering And Ranking

Keep specialism filtering as the primary interaction, but improve the control from a plain select to a more modern filter-chip interface.

Requirements:

- Show an `All` chip followed by specialism chips.
- The selected chip should be visually distinct.
- The result count should still update immediately.
- Filtering remains client-side.
- When a specialism is selected, cards that match should show a small `Matches selected specialism` cue.
- Include a concise ranking note in the filter panel:
  - Premium trainers are shown first as featured placements.
  - Within each tier, results are sorted by relevance to the selected specialism and then by trainer name.

Because the seed data is small and every filtered result already matches the selected specialism, relevance can be implemented as a simple score that keeps selected-specialism matches above non-matches inside each tier. The logic should still be explicit because it demonstrates how the model would scale.

## Card UX

Upgrade each card to support faster comparison:

- Preserve name, location, tier, summary, specialisms, and years training.
- Keep Premium visually stronger than Standard.
- Add grouped metadata:
  - `Best for`
  - `Format`
  - `Next cohort`
  - `Trust`
- Make trust signals compact chips.
- Keep cards readable on mobile and avoid nested-card styling.

Premium cards should still stand out, but not look noisy. The design should use restraint: clear badge, warm border, stronger shadow, and featured copy.

## Visual Direction

The UI should remain modern, polished, and marketplace-like:

- Replace the dropdown-heavy feel with tappable chips.
- Improve the filter panel as a decision area: result count, selected filter, reset, and ranking note.
- Add visual hierarchy inside cards using small labels and grouped rows.
- Keep the palette restrained and avoid making the page feel like a landing page.

No new imagery is required; the strongest visual improvement is better information architecture and component polish.

## README Update

Update the README progress report and critique to mention:

- The directory includes decision-support fields beyond the original brief.
- Ranking transparency was added because Premium placement was underspecified.
- A real product would need agreed rules for paid placement versus student relevance.

## Verification

Run:

- `npm run lint`
- `npm run build`
- Browser QA at the local dev URL

Manual QA should confirm:

- Filter chips work.
- Result counts update.
- Premium cards remain first.
- Ranking note is visible.
- New card metadata fits on desktop and mobile.
- No horizontal overflow on mobile.

## Out Of Scope

- Real search
- Multi-select filters
- Location filtering
- Profile pages
- Booking or enquiry CTAs
- Admin management
- Real ranking algorithm backed by analytics
- Real LLM API integration
