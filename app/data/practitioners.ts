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
    specialisms: [
      "Foundation Botox",
      "Facial Anatomy",
      "Complication Management",
    ],
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
