import { describe, expect, it } from "vitest";
import {
  allSpecialisms,
  filterAndRankPractitioners,
  getSelectableSpecialism,
} from "./practitioner-search";
import { practitioners, specialisms } from "./practitioners";

describe("practitioner search helpers", () => {
  it("shows every trainer with Premium listings first when no specialism is selected", () => {
    const result = filterAndRankPractitioners(practitioners, allSpecialisms);

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
    const result = filterAndRankPractitioners(practitioners, "Laser and IPL");

    expect(result.map((practitioner) => practitioner.name)).toEqual([
      "Priya Nair",
      "Kiran Shah",
    ]);
  });

  it("returns an empty list when a valid filter has no matching trainers", () => {
    const result = filterAndRankPractitioners(practitioners, "Regenerative Medicine");

    expect(result).toEqual([]);
  });

  it("accepts only known specialisms from a URL parameter", () => {
    expect(getSelectableSpecialism("Laser and IPL", specialisms)).toBe(
      "Laser and IPL",
    );
    expect(getSelectableSpecialism("Unknown", specialisms)).toBe(allSpecialisms);
    expect(getSelectableSpecialism(null, specialisms)).toBe(allSpecialisms);
  });
});
