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
  searchQuery = "",
) {
  const normalisedQuery = searchQuery.trim().toLowerCase();
  const practitionersForTier =
    selectedTier === allTiers
      ? practitioners
      : practitioners.filter((practitioner) => practitioner.tier === selectedTier);

  if (selectedSpecialism === allSpecialisms) {
    return rankPractitionersForSpecialism(
      practitionersForTier.filter((practitioner) =>
        matchesSearchQuery(practitioner, normalisedQuery),
      ),
      null,
    );
  }

  return rankPractitionersForSpecialism(
    practitionersForTier.filter((practitioner) =>
      practitioner.specialisms.includes(selectedSpecialism) &&
      matchesSearchQuery(practitioner, normalisedQuery),
    ),
    selectedSpecialism,
  );
}

function matchesSearchQuery(practitioner: Practitioner, normalisedQuery: string) {
  if (!normalisedQuery) {
    return true;
  }

  const searchableValues = [
    practitioner.name,
    practitioner.location,
    practitioner.tier,
    ...practitioner.specialisms,
  ];

  return searchableValues.some((value) =>
    value.toLowerCase().includes(normalisedQuery),
  );
}
