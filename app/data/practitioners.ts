export type PractitionerTier = "standard" | "premium";

export type Practitioner = {
  id: string;
  name: string;
  specialisms: string[];
  location: string;
  tier: PractitionerTier;
  summary: string;
  featuredImage?: string;
  yearsTraining: number;
  audience: string;
  bestMatch: string;
  format: string;
  trustSignals: string[];
  nextCohort: string;
};

export const practitioners: Practitioner[] = [
  {
    id: "amara-clinic-academy",
    name: "Dr Amara Hughes",
    specialisms: [
      "Foundation Botox",
      "Facial Anatomy",
      "Complication Management",
    ],
    location: "Manchester",
    tier: "premium",
    summary:
      "Doctor-led training with small clinical cohorts and complication-safe protocols.",
    featuredImage: "/featured-trainers/amara-clinic-academy.png",
    yearsTraining: 8,
    audience: "Advanced injectors",
    bestMatch: "Advanced injectors who want complication-safe protocols.",
    format: "Small group",
    trustSignals: ["Doctor-led", "CPD aligned", "Complications support"],
    nextCohort: "Next cohort: 12 July",
  },
  {
    id: "the-dermal-lab",
    name: "Natalie Price",
    specialisms: ["Dermal Fillers", "Skin Boosters", "Business Mentoring"],
    location: "Birmingham",
    tier: "premium",
    summary:
      "Commercially focused injectable training for practitioners building private clinics.",
    featuredImage: "/featured-trainers/the-dermal-lab.png",
    yearsTraining: 6,
    audience: "Clinic owners",
    bestMatch: "Clinic owners growing a profitable injectable offer.",
    format: "Hands-on models",
    trustSignals: ["Business mentoring", "Live model practice", "Aftercare support"],
    nextCohort: "Monthly intake",
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
    audience: "Skin specialists",
    bestMatch: "Skin specialists adding laser-safe treatment pathways.",
    format: "Blended learning",
    trustSignals: ["Laser safety", "Protocol templates", "CPD aligned"],
    nextCohort: "Next cohort: 19 July",
  },
  {
    id: "harley-aesthetic-institute",
    name: "Olivia Bennett",
    specialisms: ["Foundation Botox", "Dermal Fillers", "Facial Anatomy"],
    location: "London",
    tier: "premium",
    summary:
      "Central London academy specialising in anatomy-led injectable foundations.",
    featuredImage: "/featured-trainers/harley-aesthetic-institute.png",
    yearsTraining: 10,
    audience: "Beginners",
    bestMatch: "Beginners who want anatomy-led injectable foundations.",
    format: "Hands-on models",
    trustSignals: ["Doctor-led", "Live model practice", "Anatomy-first"],
    nextCohort: "Limited July places",
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
    audience: "Skin specialists",
    bestMatch: "Skin specialists moving into skin-quality treatments.",
    format: "Small group",
    trustSignals: ["Post-course mentoring", "Live demos", "CPD aligned"],
    nextCohort: "Next cohort: 26 July",
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
    audience: "Intermediate injectors",
    bestMatch: "Intermediate injectors sharpening assessment and safety.",
    format: "1:1 mentoring",
    trustSignals: ["Complications support", "Assessment framework", "Case reviews"],
    nextCohort: "Private dates available",
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
    audience: "Beginners",
    bestMatch: "New aesthetic practitioners building first-year confidence.",
    format: "Small group",
    trustSignals: ["Starter templates", "Post-course mentoring", "Clinic setup"],
    nextCohort: "Monthly intake",
  },
  {
    id: "bristol-clinical-aesthetics",
    name: "Priya Nair",
    specialisms: [
      "Facial Anatomy",
      "Laser and IPL",
      "Complication Management",
    ],
    location: "Bristol",
    tier: "premium",
    summary:
      "Advanced clinical training for experienced injectors and skin practitioners.",
    yearsTraining: 9,
    audience: "Advanced injectors",
    bestMatch: "Experienced injectors seeking advanced clinical governance.",
    format: "1:1 mentoring",
    trustSignals: ["Complications support", "Cadaver anatomy", "Clinical governance"],
    nextCohort: "Next cohort: 3 August",
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

export function rankPractitionersForSpecialism(
  items: Practitioner[],
  selectedSpecialism: string | null,
) {
  return [...items].sort((first, second) => {
    const tierDifference = tierWeight[first.tier] - tierWeight[second.tier];

    if (tierDifference !== 0) {
      return tierDifference;
    }

    const firstMatches = selectedSpecialism
      ? first.specialisms.includes(selectedSpecialism)
      : false;
    const secondMatches = selectedSpecialism
      ? second.specialisms.includes(selectedSpecialism)
      : false;

    if (firstMatches !== secondMatches) {
      return firstMatches ? -1 : 1;
    }

    return first.name.localeCompare(second.name);
  });
}

export const specialisms = Array.from(
  new Set(practitioners.flatMap((practitioner) => practitioner.specialisms)),
).sort((first, second) => first.localeCompare(second));
