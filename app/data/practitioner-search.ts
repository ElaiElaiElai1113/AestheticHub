import {
  rankPractitionersForSpecialism,
  type Practitioner,
} from "./practitioners";

export const allSpecialisms = "All";

export function getSelectableSpecialism(
  requestedSpecialism: string | null,
  specialisms: string[],
) {
  if (!requestedSpecialism || !specialisms.includes(requestedSpecialism)) {
    return allSpecialisms;
  }

  return requestedSpecialism;
}

export function filterAndRankPractitioners(
  practitioners: Practitioner[],
  selectedSpecialism: string,
) {
  if (selectedSpecialism === allSpecialisms) {
    return rankPractitionersForSpecialism(practitioners, null);
  }

  return rankPractitionersForSpecialism(
    practitioners.filter((practitioner) =>
      practitioner.specialisms.includes(selectedSpecialism),
    ),
    selectedSpecialism,
  );
}
