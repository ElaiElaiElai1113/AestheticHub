import {
  rankPractitionersForSpecialism,
  type Practitioner,
  type PractitionerTier,
} from "./practitioners";

export const allSpecialisms = "All";
export const allTiers = "All tiers";
export const recommendedSort = "recommended";

export type TierFilter = typeof allTiers | PractitionerTier;
export type SortOption = typeof recommendedSort | "experience" | "name";

const supportedTierFilters = new Set<string>(["premium", "standard"]);
const supportedSortOptions = new Set<string>(["experience", "name"]);

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

export function getSelectableSort(requestedSort: string | null): SortOption {
  if (!requestedSort || !supportedSortOptions.has(requestedSort)) {
    return recommendedSort;
  }

  return requestedSort as SortOption;
}

export function filterAndRankPractitioners(
  practitioners: Practitioner[],
  selectedSpecialism: string,
  selectedTier: TierFilter,
  searchQuery = "",
  sortOption: SortOption = recommendedSort,
) {
  const normalisedQuery = searchQuery.trim().toLowerCase();
  const practitionersForTier =
    selectedTier === allTiers
      ? practitioners
      : practitioners.filter((practitioner) => practitioner.tier === selectedTier);

  const filteredPractitioners =
    selectedSpecialism === allSpecialisms
      ? practitionersForTier.filter((practitioner) =>
          matchesSearchQuery(practitioner, normalisedQuery),
        )
      : practitionersForTier.filter((practitioner) =>
          practitioner.specialisms.includes(selectedSpecialism) &&
          matchesSearchQuery(practitioner, normalisedQuery),
        );

  const rankedPractitioners = rankPractitionersForSpecialism(
    filteredPractitioners,
    selectedSpecialism === allSpecialisms ? null : selectedSpecialism,
  );

  return sortPractitioners(rankedPractitioners, sortOption);
}

function sortPractitioners(
  practitioners: Practitioner[],
  sortOption: SortOption,
) {
  if (sortOption === "experience") {
    return [...practitioners].sort((first, second) => {
      const experienceDifference = second.yearsTraining - first.yearsTraining;

      if (experienceDifference !== 0) {
        return experienceDifference;
      }

      return first.name.localeCompare(second.name);
    });
  }

  if (sortOption === "name") {
    return [...practitioners].sort((first, second) =>
      first.name.localeCompare(second.name),
    );
  }

  return practitioners;
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
