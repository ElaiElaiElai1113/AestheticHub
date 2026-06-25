# Trust-First UI Polish Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make the practitioner directory feel more like a polished, trust-sensitive education marketplace without adding large product scope.

**Architecture:** Keep the existing single-page directory and in-memory data. Add presentation-focused data fields for best-match copy, enhance the hero and cards, keep filtering/ranking logic unchanged, and refresh README screenshots after production verification.

**Tech Stack:** Next.js 16, React 19, TypeScript, Tailwind CSS, Vitest, Playwright.

---

### Task 1: Data And Card Messaging

**Files:**
- Modify: `app/data/practitioners.ts`
- Modify: `app/components/practitioner-card.tsx`

- [ ] Add a `bestMatch: string` field to the `Practitioner` type.
- [ ] Add a short best-match line to each seed trainer.
- [ ] Render the best-match line in each card below the summary.
- [ ] Keep existing specialism and tier fields unchanged so current tests continue to pass.

### Task 2: Marketplace Hero And Trust Strip

**Files:**
- Modify: `app/page.tsx`

- [ ] Replace the plain hero with a stronger split composition: left-side headline and right-side student search preview.
- [ ] Add a trust strip below the hero with four compact proof points: vetted trainers, CPD-aligned, UK-wide, and transparent Premium placement.
- [ ] Keep the directory as the first real product surface after the hero/trust strip.

### Task 3: Card Visual Hierarchy

**Files:**
- Modify: `app/components/practitioner-card.tsx`

- [ ] Make Premium cards feel like featured profiles with a distinct top label.
- [ ] Add lightweight icon-like symbols for location, fit, format, availability, and trust signals using accessible text and CSS.
- [ ] Improve contrast and spacing while keeping cards scannable.

### Task 4: Documentation And Verification

**Files:**
- Modify: `README.md`
- Modify: `docs/screenshots/directory-desktop.png`
- Modify: `docs/screenshots/directory-filtered.png`
- Modify: `docs/screenshots/directory-mobile.png`

- [ ] Update README progress/design notes to mention the trust-first UI pass.
- [ ] Run `npm test`, `npm run lint`, and `npm run build`.
- [ ] Start the production build locally and regenerate screenshots with Playwright.
- [ ] Confirm filtered URL state still returns `Priya Nair` then `Kiran Shah`.
- [ ] Confirm mobile layout has no horizontal overflow.
