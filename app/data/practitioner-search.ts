import {
  rankPractitionersForSpecialism,
  type Practitioner,
  type PractitionerTier,
} from "./practitioners";

export const allSpecialisms = "All";
export const allTiers = "All tiers";

export type TierFilter = typeof allTiers | PractitionerTier;

const supportedTierFilters = new Set<string>(["premium", "standard"]);

export function getSelectableSpecialism(
  requestedSpecialism: string | null,
  specialisms: string[],
) {
  if (!requestedSpecialism || !specialisms.includes(requestedSpecialism)) {
    return allSpecialisms;
  }

  return requestedSpecialism;
}

export function getSelectableTier(requestedTier: string | null): TierFilter {
  if (!requestedTier || !supportedTierFilters.has(requestedTier)) {
    return allTiers;
  }

  return requestedTier as PractitionerTier;
}

export function filterAndRankPractitioners(
  practitioners: Practitioner[],
  selectedSpecialism: string,
  selectedTier: TierFilter,
) {
  const practitionersForTier =
    selectedTier === allTiers
      ? practitioners
      : practitioners.filter((practitioner) => practitioner.tier === selectedTier);

  if (selectedSpecialism === allSpecialisms) {
    return rankPractitionersForSpecialism(practitionersForTier, null);
  }

  return rankPractitionersForSpecialism(
    practitionersForTier.filter((practitioner) =>
      practitioner.specialisms.includes(selectedSpecialism),
    ),
    selectedSpecialism,
  );
}
