# Practitioner Directory Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a polished public practitioner directory for the Aesthetic Training Hub take-home test with seeded trainers, Premium-first card treatment, and specialism filtering.

**Architecture:** Keep `/` as the public directory route in the App Router. Use typed in-memory seed data in a server-imported module, pass serializable data into one Client Component for filtering, and keep cards as a presentational component imported by that client boundary.

**Tech Stack:** Next.js 16 App Router, React 19, TypeScript, Tailwind CSS 4, local in-memory TypeScript data.

---

## Framework Notes From Local Docs

Read before implementation:

- `node_modules/next/dist/docs/01-app/01-getting-started/03-layouts-and-pages.md`
- `node_modules/next/dist/docs/01-app/01-getting-started/05-server-and-client-components.md`
- `node_modules/next/dist/docs/01-app/03-api-reference/01-directives/use-client.md`
- `node_modules/next/dist/docs/01-app/01-getting-started/11-css.md`

Key constraints:

- `app/page.tsx` defines the `/` route by default-exporting a React component.
- App Router pages and layouts are Server Components unless a file begins with `'use client'`.
- Use `'use client'` only at the interactive filter boundary because all imports from that file enter the client module graph.
- Props passed from Server Components to Client Components must be serializable.
- Global CSS is already imported in `app/layout.tsx`; keep global styles limited and use Tailwind utilities for component styling.

## File Structure

- Create: `app/data/practitioners.ts`
  - Owns the `PractitionerTier`, `Practitioner`, seed data, tier ordering, and derived specialism helper.
- Create: `app/components/practitioner-card.tsx`
  - Presentational card for one practitioner. Receives a `Practitioner` object and applies tier-specific visual treatment.
- Create: `app/components/practitioner-directory.tsx`
  - Client Component. Owns selected specialism, filters practitioners, renders filter controls, result count, empty state, and card grid.
- Modify: `app/page.tsx`
  - Replaces starter content with the directory page shell and passes data into the client directory.
- Modify: `app/layout.tsx`
  - Updates metadata for the take-home app while keeping the existing font setup.
- Modify: `app/globals.css`
  - Simplifies the starter globals to a light marketplace theme and removes automatic dark-mode inversion.
- Modify: `README.md`
  - Replaces starter README with run instructions, progress report, AI note, and direct critique of the brief.

---

### Task 1: Seed Data And Types

**Files:**

- Create: `app/data/practitioners.ts`

- [ ] **Step 1: Create the typed seed data module**

Create `app/data/practitioners.ts`:

```ts
export type PractitionerTier = "standard" | "premium";

export type Practitioner = {
  id: string;
  name: string;
  specialisms: string[];
  location: string;
  tier: PractitionerTier;
  summary: string;
  yearsTraining: number;
};

export const practitioners: Practitioner[] = [
  {
    id: "amara-clinic-academy",
    name: "Dr Amara Hughes",
    specialisms: ["Foundation Botox", "Facial Anatomy", "Complication Management"],
    location: "Manchester",
    tier: "premium",
    summary:
      "Doctor-led training with small clinical cohorts and complication-safe protocols.",
    yearsTraining: 8,
  },
  {
    id: "the-dermal-lab",
    name: "Natalie Price",
    specialisms: ["Dermal Fillers", "Skin Boosters", "Business Mentoring"],
    location: "Birmingham",
    tier: "premium",
    summary:
      "Commercially focused injectable training for practitioners building private clinics.",
    yearsTraining: 6,
  },
  {
    id: "northskin-training",
    name: "Kiran Shah",
    specialisms: ["Laser and IPL", "Skin Boosters"],
    location: "Leeds",
    tier: "standard",
    summary:
      "Device-led skin training with practical sessions across laser safety and protocols.",
    yearsTraining: 5,
  },
  {
    id: "harley-aesthetic-institute",
    name: "Olivia Bennett",
    specialisms: ["Foundation Botox", "Dermal Fillers", "Facial Anatomy"],
    location: "London",
    tier: "premium",
    summary:
      "Central London academy specialising in anatomy-led injectable foundations.",
    yearsTraining: 10,
  },
  {
    id: "westcoast-skin-school",
    name: "Eilidh Fraser",
    specialisms: ["Skin Boosters", "Complication Management"],
    location: "Glasgow",
    tier: "standard",
    summary:
      "Supportive hands-on courses for nurses and therapists expanding into skin quality.",
    yearsTraining: 4,
  },
  {
    id: "southampton-injectables",
    name: "Marcus Reed",
    specialisms: ["Dermal Fillers", "Complication Management"],
    location: "Southampton",
    tier: "standard",
    summary:
      "Practical dermal filler training with a focus on assessment and risk reduction.",
    yearsTraining: 7,
  },
  {
    id: "newcastle-face-academy",
    name: "Sofia Martin",
    specialisms: ["Foundation Botox", "Business Mentoring"],
    location: "Newcastle",
    tier: "standard",
    summary:
      "Beginner-friendly toxin courses with mentoring for first-year aesthetic practices.",
    yearsTraining: 3,
  },
  {
    id: "bristol-clinical-aesthetics",
    name: "Priya Nair",
    specialisms: ["Facial Anatomy", "Laser and IPL", "Complication Management"],
    location: "Bristol",
    tier: "premium",
    summary:
      "Advanced clinical training for experienced injectors and skin practitioners.",
    yearsTraining: 9,
  },
];

const tierWeight: Record<PractitionerTier, number> = {
  premium: 0,
  standard: 1,
};

export const practitionersByTier = [...practitioners].sort((first, second) => {
  const tierDifference = tierWeight[first.tier] - tierWeight[second.tier];

  if (tierDifference !== 0) {
    return tierDifference;
  }

  return first.name.localeCompare(second.name);
});

export const specialisms = Array.from(
  new Set(practitioners.flatMap((practitioner) => practitioner.specialisms)),
).sort((first, second) => first.localeCompare(second));
```

- [ ] **Step 2: Run TypeScript/build verification for the new module**

Run:

```powershell
npm run build
```

Expected: build may still render the starter page, but TypeScript should compile without errors from `app/data/practitioners.ts`.

- [ ] **Step 3: Commit**

```powershell
git add app/data/practitioners.ts
git commit -m "feat: add practitioner seed data"
```

---

### Task 2: Practitioner Card Component

**Files:**

- Create: `app/components/practitioner-card.tsx`
- Depends on: `app/data/practitioners.ts`

- [ ] **Step 1: Create the presentational card**

Create `app/components/practitioner-card.tsx`:

```tsx
import type { Practitioner } from "@/app/data/practitioners";

type PractitionerCardProps = {
  practitioner: Practitioner;
};

const tierLabel: Record<Practitioner["tier"], string> = {
  premium: "Premium",
  standard: "Standard",
};

export function PractitionerCard({ practitioner }: PractitionerCardProps) {
  const isPremium = practitioner.tier === "premium";

  return (
    <article
      className={[
        "group flex h-full flex-col rounded-2xl border bg-white p-6 shadow-sm transition duration-200",
        isPremium
          ? "border-amber-300 ring-1 ring-amber-200 hover:-translate-y-1 hover:shadow-xl"
          : "border-slate-200 hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-md",
      ].join(" ")}
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-slate-500">{practitioner.location}</p>
          <h2 className="mt-2 text-xl font-semibold tracking-tight text-slate-950">
            {practitioner.name}
          </h2>
        </div>
        <span
          className={[
            "shrink-0 rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wide",
            isPremium
              ? "bg-amber-100 text-amber-800"
              : "bg-slate-100 text-slate-600",
          ].join(" ")}
        >
          {tierLabel[practitioner.tier]}
        </span>
      </div>

      {isPremium ? (
        <p className="mt-4 w-fit rounded-full bg-slate-950 px-3 py-1 text-xs font-medium text-white">
          Featured trainer
        </p>
      ) : null}

      <p className="mt-5 flex-1 text-sm leading-6 text-slate-600">
        {practitioner.summary}
      </p>

      <div className="mt-6 flex flex-wrap gap-2">
        {practitioner.specialisms.map((specialism) => (
          <span
            className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-medium text-slate-700"
            key={specialism}
          >
            {specialism}
          </span>
        ))}
      </div>

      <div className="mt-6 flex items-center justify-between border-t border-slate-100 pt-4 text-sm">
        <span className="font-medium text-slate-950">
          {practitioner.yearsTraining}+ years training
        </span>
        <span className={isPremium ? "text-amber-700" : "text-slate-500"}>
          {isPremium ? "Priority listing" : "Listed trainer"}
        </span>
      </div>
    </article>
  );
}
```

- [ ] **Step 2: Run lint**

Run:

```powershell
npm run lint
```

Expected: PASS with no ESLint errors from `practitioner-card.tsx`.

- [ ] **Step 3: Commit**

```powershell
git add app/components/practitioner-card.tsx
git commit -m "feat: add practitioner card"
```

---

### Task 3: Interactive Directory Filter

**Files:**

- Create: `app/components/practitioner-directory.tsx`
- Depends on: `app/components/practitioner-card.tsx`
- Depends on: `app/data/practitioners.ts`

- [ ] **Step 1: Create the client directory component**

Create `app/components/practitioner-directory.tsx`:

```tsx
"use client";

import { useMemo, useState } from "react";
import type { Practitioner } from "@/app/data/practitioners";
import { PractitionerCard } from "@/app/components/practitioner-card";

type PractitionerDirectoryProps = {
  practitioners: Practitioner[];
  specialisms: string[];
};

const allSpecialisms = "All specialisms";

export function PractitionerDirectory({
  practitioners,
  specialisms,
}: PractitionerDirectoryProps) {
  const [selectedSpecialism, setSelectedSpecialism] = useState(allSpecialisms);

  const filteredPractitioners = useMemo(() => {
    if (selectedSpecialism === allSpecialisms) {
      return practitioners;
    }

    return practitioners.filter((practitioner) =>
      practitioner.specialisms.includes(selectedSpecialism),
    );
  }, [practitioners, selectedSpecialism]);

  const resultLabel =
    filteredPractitioners.length === 1 ? "1 trainer" : `${filteredPractitioners.length} trainers`;

  return (
    <section aria-labelledby="directory-heading" className="mt-10">
      <div className="rounded-2xl border border-slate-200 bg-white/85 p-4 shadow-sm backdrop-blur">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-amber-700">
              Find the right course lead
            </p>
            <h2 id="directory-heading" className="mt-2 text-2xl font-semibold text-slate-950">
              Browse vetted UK aesthetics trainers
            </h2>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">
              Filter by specialism to compare trainers who match the treatment area or business skill you want to develop next.
            </p>
          </div>

          <label className="flex min-w-full flex-col gap-2 md:min-w-72">
            <span className="text-sm font-medium text-slate-700">Specialism</span>
            <select
              className="h-12 rounded-xl border border-slate-300 bg-white px-4 text-sm font-medium text-slate-950 shadow-sm outline-none transition focus:border-slate-950 focus:ring-4 focus:ring-slate-200"
              onChange={(event) => setSelectedSpecialism(event.target.value)}
              value={selectedSpecialism}
            >
              <option>{allSpecialisms}</option>
              {specialisms.map((specialism) => (
                <option key={specialism}>{specialism}</option>
              ))}
            </select>
          </label>
        </div>

        <div className="mt-5 flex flex-col gap-3 border-t border-slate-100 pt-4 text-sm text-slate-600 sm:flex-row sm:items-center sm:justify-between">
          <p>
            Showing <span className="font-semibold text-slate-950">{resultLabel}</span>
            {selectedSpecialism === allSpecialisms ? "" : ` for ${selectedSpecialism}`}
          </p>
          <button
            className="w-fit rounded-full border border-slate-200 px-4 py-2 font-medium text-slate-700 transition hover:border-slate-300 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
            disabled={selectedSpecialism === allSpecialisms}
            onClick={() => setSelectedSpecialism(allSpecialisms)}
            type="button"
          >
            Reset filter
          </button>
        </div>
      </div>

      {filteredPractitioners.length > 0 ? (
        <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {filteredPractitioners.map((practitioner) => (
            <PractitionerCard key={practitioner.id} practitioner={practitioner} />
          ))}
        </div>
      ) : (
        <div className="mt-8 rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center">
          <h3 className="text-lg font-semibold text-slate-950">No trainers found</h3>
          <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-600">
            Try clearing the filter to see every vetted trainer currently listed in the directory.
          </p>
          <button
            className="mt-5 rounded-full bg-slate-950 px-5 py-2 text-sm font-semibold text-white transition hover:bg-slate-800"
            onClick={() => setSelectedSpecialism(allSpecialisms)}
            type="button"
          >
            Show all trainers
          </button>
        </div>
      )}
    </section>
  );
}
```

- [ ] **Step 2: Run lint**

Run:

```powershell
npm run lint
```

Expected: PASS. If the long `resultLabel` line trips formatting preference but not lint, leave it unless ESLint reports an issue.

- [ ] **Step 3: Commit**

```powershell
git add app/components/practitioner-directory.tsx
git commit -m "feat: add specialism filtering"
```

---

### Task 4: Public Page Shell And Metadata

**Files:**

- Modify: `app/page.tsx`
- Modify: `app/layout.tsx`
- Depends on: `app/components/practitioner-directory.tsx`
- Depends on: `app/data/practitioners.ts`

- [ ] **Step 1: Replace starter page with the directory shell**

Replace `app/page.tsx` with:

```tsx
import { PractitionerDirectory } from "@/app/components/practitioner-directory";
import { practitionersByTier, specialisms } from "@/app/data/practitioners";

export default function Home() {
  const premiumCount = practitionersByTier.filter(
    (practitioner) => practitioner.tier === "premium",
  ).length;

  return (
    <main className="min-h-screen bg-[#f6f3ee] text-slate-950">
      <section className="mx-auto flex w-full max-w-7xl flex-col px-5 py-8 sm:px-8 lg:px-10 lg:py-12">
        <header className="flex flex-col gap-8 rounded-[2rem] border border-white/70 bg-white/70 p-6 shadow-sm backdrop-blur md:p-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-amber-700">
              Aesthetic Training Hub
            </p>
            <h1 className="mt-5 max-w-4xl text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl lg:text-6xl">
              Discover vetted UK aesthetics trainers.
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-8 text-slate-600 sm:text-lg">
              Compare trainers by specialism, location, and listing tier. Premium partners are highlighted first so students can quickly spot featured training providers.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:min-w-80">
            <div className="rounded-2xl border border-slate-200 bg-white p-4">
              <p className="text-3xl font-semibold text-slate-950">
                {practitionersByTier.length}
              </p>
              <p className="mt-1 text-sm text-slate-600">listed trainers</p>
            </div>
            <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4">
              <p className="text-3xl font-semibold text-amber-800">{premiumCount}</p>
              <p className="mt-1 text-sm text-amber-900">premium partners</p>
            </div>
          </div>
        </header>

        <PractitionerDirectory
          practitioners={practitionersByTier}
          specialisms={specialisms}
        />
      </section>
    </main>
  );
}
```

- [ ] **Step 2: Update metadata**

In `app/layout.tsx`, change only the `metadata` object to:

```tsx
export const metadata: Metadata = {
  title: "Aesthetic Training Hub | Practitioner Directory",
  description:
    "Find vetted UK aesthetics trainers by specialism, location, and subscription tier.",
};
```

- [ ] **Step 3: Run build**

Run:

```powershell
npm run build
```

Expected: PASS. The build should compile the App Router page and client directory boundary.

- [ ] **Step 4: Commit**

```powershell
git add app/page.tsx app/layout.tsx
git commit -m "feat: build directory page shell"
```

---

### Task 5: Global Theme Polish

**Files:**

- Modify: `app/globals.css`

- [ ] **Step 1: Replace starter globals**

Replace `app/globals.css` with:

```css
@import "tailwindcss";

:root {
  --background: #f6f3ee;
  --foreground: #0f172a;
}

@theme inline {
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --font-sans: var(--font-geist-sans);
  --font-mono: var(--font-geist-mono);
}

* {
  box-sizing: border-box;
}

html {
  background: var(--background);
}

body {
  min-height: 100vh;
  background:
    radial-gradient(circle at top left, rgba(245, 158, 11, 0.14), transparent 34rem),
    linear-gradient(180deg, #f8fafc 0%, var(--background) 38%, #ffffff 100%);
  color: var(--foreground);
  font-family: Arial, Helvetica, sans-serif;
}

button,
select {
  font: inherit;
}
```

- [ ] **Step 2: Run lint and build**

Run:

```powershell
npm run lint
npm run build
```

Expected: both commands PASS.

- [ ] **Step 3: Commit**

```powershell
git add app/globals.css
git commit -m "style: polish directory theme"
```

---

### Task 6: README For Submission

**Files:**

- Modify: `README.md`

- [ ] **Step 1: Replace starter README**

Replace `README.md` with:

````md
# Aesthetic Training Hub Directory

Public practitioner directory built for the EQUALS3 AI-Leveraged Full-Stack Developer test.

## How To Run

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

For a production check:

```bash
npm run lint
npm run build
npm run start
```

## Progress Report

Built:

- A public directory page for vetted UK aesthetics trainers.
- Typed in-memory seed data for 8 fictional practitioners.
- Premium and Standard tiers, with Premium listings ordered first and styled as featured listings.
- Client-side filtering by specialism.
- Responsive card grid with result counts and a resettable empty state.
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
- Add search across trainer names, locations, specialisms, and course descriptions.
- Add analytics for filter usage and profile click-through so the marketplace can learn what students need.

## Where The Brief Was Unclear

The biggest ambiguity is the word "practitioner". The product description says trainers list themselves and students discover them, but the task asks for a practitioner directory. Those could be the same entity, but in aesthetics they can mean different roles. I treated practitioners as trainers because that matches the marketplace model.

The tier rules are also underspecified. The brief gives prices for Standard and Premium, but not the benefits. I made Premium more prominent through ordering and visual treatment. In a real product I would want the commercial promise defined: always ranked first, larger cards, badges, lead routing priority, richer profiles, or some combination.

The ranking model needs a spec. If Premium always outranks Standard, the directory is commercially simple but may be less useful for students. If quality or relevance can outrank Premium, the business needs to explain what Premium actually buys.

The vetting model is central to trust but outside the brief. A real directory needs approval states, credential checks, insurance or qualification fields, and a way to remove or suspend listings.

The student journey after discovery is not defined. The next action could be enquiry, course booking, trainer profile view, or comparison. That decision affects the card content, ranking, and conversion metrics.

## Optional AI Note

I would not add an LLM call directly to this small slice. The highest-leverage use later would be behind the scenes: normalize trainer-entered specialisms into canonical tags, generate student-friendly summaries from approved profile data, and support semantic search such as "advanced filler complications near Manchester". Those uses should sit behind moderation because this is a regulated, trust-sensitive market.
````

- [ ] **Step 2: Run README sanity check**

Run:

```powershell
rg -n "Create Next App|Generated by" README.md
```

Expected: no output and exit code `1`, meaning no starter text remains.

- [ ] **Step 3: Commit**

```powershell
git add README.md
git commit -m "docs: update submission readme"
```

---

### Task 7: Final Verification And Manual QA

**Files:**

- Verify current app and docs

- [ ] **Step 1: Run full static verification**

Run:

```powershell
npm run lint
npm run build
```

Expected: both commands PASS.

- [ ] **Step 2: Start the development server**

Run:

```powershell
npm run dev
```

Expected: Next dev server starts and prints a local URL, normally `http://localhost:3000`. If port `3000` is taken, use the URL printed by Next.

- [ ] **Step 3: Manual browser QA**

Open the local URL and verify:

- The first viewport says `Aesthetic Training Hub`.
- The page title reads `Discover vetted UK aesthetics trainers.`
- There are 8 listed trainers.
- Premium cards appear before Standard cards.
- Premium cards have the Premium badge and Featured trainer pill.
- The specialism dropdown contains `All specialisms`, `Dermal Fillers`, `Foundation Botox`, `Skin Boosters`, `Complication Management`, `Facial Anatomy`, `Laser and IPL`, and `Business Mentoring`.
- Selecting `Laser and IPL` filters the list to 2 trainers.
- Selecting `All specialisms` restores 8 trainers.
- At a narrow mobile width, cards stack in one column and no text overlaps.

- [ ] **Step 4: Stop the development server**

Stop the server with `Ctrl+C` in the terminal session running `npm run dev`.

- [ ] **Step 5: Check final git state**

Run:

```powershell
git status --short --branch
git log --oneline -6
```

Expected: working tree is clean except for any user-approved local artifacts. Recent commits include the task commits from this plan.

---

## Plan Self-Review

Spec coverage:

- Public practitioner directory: Task 4.
- Name, specialisms, location, tier: Tasks 1 and 2.
- Premium differentiation: Tasks 2 and 4.
- Filter by specialism: Task 3.
- Seed practitioners: Task 1.
- README run instructions, progress report, critique: Task 6.
- Optional AI note: Task 6.
- Next 16 docs check: framework notes and Task 7 verification.

No planned task adds a database, auth, payments, profile pages, or API calls. The implementation stays inside the approved half-day slice.
