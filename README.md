# Aesthetic Training Hub Directory

Public practitioner directory built for the EQUALS3 AI-Leveraged Full-Stack Developer test.

## Brief Coverage

This project implements the public directory slice for the Aesthetic Training Hub:

- Lists aesthetics trainers with name, specialisms, location, and subscription tier.
- Supports the two requested paid tiers: Standard and Premium.
- Makes Premium trainers stand out through ordering, visual treatment, and richer card emphasis.
- Lets students filter trainers by specialism.
- Includes populated seed data using a typed in-memory dataset.
- Uses Next.js, React, and TypeScript.

The implementation intentionally stays small because the brief asked for a clean, working slice rather than a larger unfinished product.

## Tech Stack

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS
- Typed in-memory data

## How To Run

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Open `http://localhost:3000`.

Run local verification:

```bash
npm run lint
npm run build
```

Run the production build locally:

```bash
npm run start
```

The app expects Node `24.x`, pinned in `package.json`.

## Verification

Checked locally:

- `npm run lint`
- `npm run build`
- Browser smoke test of the directory, specialism filters, reset state, tier ordering, and mobile layout

There is no separate automated test suite in this half-day slice.

## Progress Report

Built:

- A public directory page for vetted UK aesthetics trainers.
- Typed in-memory seed data for 8 fictional practitioners.
- Premium and Standard tiers, with Premium listings ordered first and styled as featured listings.
- Client-side filtering by specialism using accessible filter chips.
- Decision-support fields on each trainer card: best-fit audience, training format, trust signals, and cohort timing.
- A transparent ranking note explaining Premium placement and relevance sorting.
- Responsive card grid with result counts and a resettable empty state.
- Empty-state handling when no trainers match the selected specialism.
- Basic metadata and a polished marketplace-style UI.

Left out:

- Database persistence.
- Trainer profile detail pages.
- Admin onboarding or approval workflow.
- Stripe/subscription status checks.
- Enquiry, booking, or course comparison flows.
- Real LLM API integration.

What I would do next:

- Move practitioners into a database with subscription status, approval state, and canonical specialism tags.
- Add profile pages with trainer credentials, course dates, student outcomes, and enquiry CTAs.
- Define the ranking rules for Premium vs Standard listings so the commercial promise is explicit.
- Add a richer relevance model once there is real student behaviour data.
- Add search across trainer names, locations, specialisms, and course descriptions.
- Add analytics for filter usage and profile click-through so the marketplace can learn what students need.
- Add automated tests around filtering, ranking, and empty-state behaviour.

## Where The Brief Was Unclear

The biggest ambiguity is the word "practitioner". The product description says trainers list themselves and students discover them, but the task asks for a practitioner directory. Those could be the same entity, but in aesthetics they can mean different roles. I treated practitioners as trainers because that matches the marketplace model.

The tier rules are also underspecified. The brief gives prices for Standard and Premium, but not the benefits. I made Premium more prominent through ordering and visual treatment. In a real product I would want the commercial promise defined: always ranked first, larger cards, badges, lead routing priority, richer profiles, or some combination.

The ranking model needs a spec. If Premium always outranks Standard, the directory is commercially simple but may be less useful for students. If quality or relevance can outrank Premium, the business needs to explain what Premium actually buys.

I added a visible ranking note in the interface because paid placement versus student relevance is too important to leave implicit. In production I would want this agreed with the business before launch, especially in a trust-sensitive education marketplace.

The vetting model is central to trust but outside the brief. A real directory needs approval states, credential checks, insurance or qualification fields, and a way to remove or suspend listings.

The student journey after discovery is not defined. The next action could be enquiry, course booking, trainer profile view, or comparison. That decision affects the card content, ranking, and conversion metrics.

The data model is intentionally simplified. For a production marketplace I would want a clear distinction between trainer, training provider, course, location, cohort, subscription, and approval status. Combining those too early would make the directory harder to evolve.

The brief asks for a public directory but does not define what success means. I would want one primary metric agreed upfront, such as profile click-through, enquiry starts, course bookings, or trainer subscription conversion. That would change the UI priorities.

## Optional AI Note

I would not add an LLM call directly to this small slice. The highest-leverage use later would be behind the scenes: normalize trainer-entered specialisms into canonical tags, generate student-friendly summaries from approved profile data, and support semantic search such as "advanced filler complications near Manchester". Those uses should sit behind moderation because this is a regulated, trust-sensitive market.
