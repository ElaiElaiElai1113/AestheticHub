# Card UI/UX Refinement Design

## Purpose

Refine the directory UI from a UX designer perspective without expanding product scope. The current directory works and is verified, but the cards are dense on mobile and Premium styling can feel more highlighted than refined.

This pass should make the directory easier to scan, make Premium feel more polished, and reinforce trust in the vetted marketplace.

## Scope

Change only the public directory presentation:

- Simplify trainer cards.
- Refine Premium styling.
- Add small trust microcopy near the directory intro.
- Preserve all current data, filtering, ranking, and README content.

Do not add new routes, forms, profile pages, API calls, databases, or dependencies.

## UX Changes

### Card Density

Cards should prioritize the information a student needs first:

1. Name, location, tier.
2. Short summary.
3. Best for, format, availability.
4. Specialisms.
5. A smaller trust row.

Trust signals should be visually lighter and limited to the first two signals, with a compact `+N more` label if more exist. This reduces mobile card length while keeping trust visible.

### Premium Styling

Premium should feel featured but not loud:

- Softer amber border/ring.
- Subtle top accent line.
- Refined `Featured` pill using amber/cream instead of dark heavy styling.
- Keep Premium ordering and priority-listing copy.

Standard cards should remain credible and balanced.

### Directory Trust Microcopy

Add a small sentence in the filter/intro area:

`All listed trainers are reviewed before appearing in the directory.`

This reinforces the marketplace's vetted positioning without adding a new feature.

## Verification

Run:

- `npm run lint`
- `npm run build`
- Browser QA at desktop and mobile widths

Manual QA should confirm:

- Premium cards still stand out.
- Cards are less visually dense.
- Mobile has no horizontal overflow.
- Filtering and ranking still work.
