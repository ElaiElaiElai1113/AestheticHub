# Card UI/UX Refinement Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Reduce card density and make Premium styling feel more refined while preserving the current directory behavior.

**Architecture:** Keep the same data and component boundaries. Modify only `PractitionerCard` for card hierarchy and `PractitionerDirectory` for the trust microcopy line.

**Tech Stack:** Next.js 16 App Router, React 19, TypeScript, Tailwind CSS 4.

---

## Tasks

### Task 1: Refine Card UI

**Files:**
- Modify: `app/components/practitioner-card.tsx`

- [ ] Limit visible trust signals to two and show `+N more` when needed.
- [ ] Replace the heavy dark Premium featured pill with a softer amber treatment.
- [ ] Add a subtle Premium top accent line.
- [ ] Tighten metadata spacing and make the card feel less dense on mobile.
- [ ] Run `npm run lint`.
- [ ] Commit `style: refine practitioner cards`.

### Task 2: Add Trust Microcopy

**Files:**
- Modify: `app/components/practitioner-directory.tsx`

- [ ] Add `All listed trainers are reviewed before appearing in the directory.` near the directory intro copy.
- [ ] Run `npm run lint`.
- [ ] Commit `copy: add directory trust microcopy`.

### Task 3: Verify

- [ ] Run `npm run lint`.
- [ ] Run `npm run build`.
- [ ] Browser QA desktop and mobile:
  - Premium cards remain visually distinct.
  - Filter chips still work.
  - `Laser and IPL` filters to Priya Nair then Kiran Shah.
  - Cards have no visible text overlap.
  - Mobile has no horizontal overflow.

## Self-Review

This plan does not change behavior, data, routing, dependencies, or deployment settings. It only refines presentation and trust copy.
