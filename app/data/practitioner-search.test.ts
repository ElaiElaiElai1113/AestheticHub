import { describe, expect, it } from "vitest";
import {
  allSpecialisms,
  allTiers,
  filterAndRankPractitioners,
  getSelectableSpecialism,
  getSelectableTier,
} from "./practitioner-search";
import { practitioners, specialisms } from "./practitioners";

describe("practitioner search helpers", () => {
  it("shows every trainer with Premium listings first when no specialism is selected", () => {
    const result = filterAndRankPractitioners(
      practitioners,
      allSpecialisms,
      allTiers,
    );

    expect(result).toHaveLength(practitioners.length);
    expect(result.slice(0, 4).map((practitioner) => practitioner.tier)).toEqual([
      "premium",
      "premium",
      "premium",
      "premium",
    ]);
    expect(result.at(-1)?.tier).toBe("standard");
  });

  it("filters by selected specialism while keeping Premium listings ahead of Standard listings", () => {
    const result = filterAndRankPractitioners(
      practitioners,
      "Laser and IPL",
      allTiers,
    );

    expect(result.map((practitioner) => practitioner.name)).toEqual([
      "Priya Nair",
      "Kiran Shah",
    ]);
  });

  it("returns an empty list when a valid filter has no matching trainers", () => {
    const result = filterAndRankPractitioners(
      practitioners,
      "Regenerative Medicine",
      allTiers,
    );

    expect(result).toEqual([]);
  });

  it("filters by Premium tier", () => {
    const result = filterAndRankPractitioners(
      practitioners,
      allSpecialisms,
      "premium",
    );

    expect(result).toHaveLength(4);
    expect(result.every((practitioner) => practitioner.tier === "premium")).toBe(
      true,
    );
    expect(result.map((practitioner) => practitioner.name)).toEqual([
      "Dr Amara Hughes",
      "Natalie Price",
      "Olivia Bennett",
      "Priya Nair",
    ]);
  });

  it("combines tier and specialism filters", () => {
    const result = filterAndRankPractitioners(
      practitioners,
      "Laser and IPL",
      "standard",
    );

    expect(result.map((practitioner) => practitioner.name)).toEqual([
      "Kiran Shah",
    ]);
  });

  it("accepts only known specialisms from a URL parameter", () => {
    expect(getSelectableSpecialism("Laser and IPL", specialisms)).toBe(
      "Laser and IPL",
    );
    expect(getSelectableSpecialism("Unknown", specialisms)).toBe(allSpecialisms);
    expect(getSelectableSpecialism(null, specialisms)).toBe(allSpecialisms);
  });

  it("accepts only supported tier filters from a URL parameter", () => {
    expect(getSelectableTier("premium")).toBe("premium");
    expect(getSelectableTier("standard")).toBe("standard");
    expect(getSelectableTier("vip")).toBe(allTiers);
    expect(getSelectableTier(null)).toBe(allTiers);
  });
});
