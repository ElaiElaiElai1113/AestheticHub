"use client";

import { useMemo } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { PractitionerCard } from "@/app/components/practitioner-card";
import {
  allSpecialisms,
  allTiers,
  filterAndRankPractitioners,
  getSelectableSpecialism,
  getSelectableTier,
  type TierFilter,
} from "@/app/data/practitioner-search";
import {
  type Practitioner,
} from "@/app/data/practitioners";

type PractitionerDirectoryProps = {
  practitioners: Practitioner[];
  specialisms: string[];
};

const tierFilters: { label: string; value: TierFilter }[] = [
  { label: allTiers, value: allTiers },
  { label: "Premium", value: "premium" },
  { label: "Standard", value: "standard" },
];

export function PractitionerDirectory({
  practitioners,
  specialisms,
}: PractitionerDirectoryProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const selectedSpecialism = getSelectableSpecialism(
    searchParams.get("specialism"),
    specialisms,
  );
  const selectedTier = getSelectableTier(searchParams.get("tier"));

  const selectedSpecialismForRanking =
    selectedSpecialism === allSpecialisms ? null : selectedSpecialism;

  const filteredPractitioners = useMemo(() => {
    return filterAndRankPractitioners(
      practitioners,
      selectedSpecialism,
      selectedTier,
    );
  }, [practitioners, selectedSpecialism, selectedTier]);

  const resultLabel =
    filteredPractitioners.length === 1
      ? "1 trainer"
      : `${filteredPractitioners.length} trainers`;
  const hasActiveFilters =
    selectedSpecialism !== allSpecialisms || selectedTier !== allTiers;
  const selectedTierLabel =
    selectedTier === allTiers
      ? null
      : tierFilters.find((tier) => tier.value === selectedTier)?.label;

  function updateUrlFilter(key: "specialism" | "tier", value: string) {
    const params = new URLSearchParams(searchParams.toString());

    if (
      (key === "specialism" && value === allSpecialisms) ||
      (key === "tier" && value === allTiers)
    ) {
      params.delete(key);
    } else {
      params.set(key, value);
    }

    const queryString = params.toString();
    window.history.pushState(null, "", queryString ? `${pathname}?${queryString}` : pathname);
  }

  function resetFilters() {
    const params = new URLSearchParams(searchParams.toString());
    params.delete("specialism");
    params.delete("tier");

    const queryString = params.toString();
    window.history.pushState(null, "", queryString ? `${pathname}?${queryString}` : pathname);
  }

  return (
    <section aria-labelledby="directory-heading" className="mt-10">
      <div className="rounded-2xl border border-slate-200 bg-white/85 p-4 shadow-sm backdrop-blur">
        <div className="flex flex-col gap-5">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-amber-700">
              Find the right course lead
            </p>
            <h2
              className="mt-2 text-2xl font-semibold text-slate-950"
              id="directory-heading"
            >
              Browse vetted UK aesthetics trainers
            </h2>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">
              Filter by specialism and listing tier to compare trainers who
              match the treatment area or business skill you want to develop
              next.
            </p>
            <p className="mt-3 max-w-2xl text-sm font-medium text-slate-700">
              All listed trainers are reviewed before appearing in the
              directory.
            </p>
          </div>

          <div className="grid gap-4">
            <FilterGroup
              headingId="tier-filter-heading"
              label="Filter trainers by listing tier"
            >
              {tierFilters.map((tier) => (
                <FilterButton
                  isSelected={selectedTier === tier.value}
                  key={tier.value}
                  label={tier.label}
                  onClick={() => updateUrlFilter("tier", tier.value)}
                />
              ))}
            </FilterGroup>

            <FilterGroup
              headingId="specialism-filter-heading"
              label="Filter trainers by specialism"
            >
              {[allSpecialisms, ...specialisms].map((specialism) => (
                <FilterButton
                  isSelected={selectedSpecialism === specialism}
                  key={specialism}
                  label={specialism}
                  onClick={() => updateUrlFilter("specialism", specialism)}
                />
              ))}
            </FilterGroup>
          </div>
        </div>

        <div
          className="mt-5 grid gap-4 border-t border-slate-100 pt-4 text-sm text-slate-600 lg:grid-cols-[1fr_auto] lg:items-start"
          id="directory-results-summary"
        >
          <div className="space-y-2">
            <p>
              Showing{" "}
              <span className="font-semibold text-slate-950">
                {resultLabel}
              </span>
              {selectedSpecialism === allSpecialisms
                ? ""
                : ` for ${selectedSpecialism}`}
              {selectedTierLabel ? ` in ${selectedTierLabel}` : ""}
            </p>
            <p className="max-w-3xl leading-6">
              Results show Premium trainers first as featured placements. Within
              each tier, selected-specialism matches are prioritised, then
              sorted by trainer name. Tier filters narrow the list without
              changing those ranking rules.
            </p>
          </div>
          <button
            className="w-fit rounded-full border border-slate-200 px-4 py-2 font-medium text-slate-700 transition hover:border-slate-300 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
            disabled={!hasActiveFilters}
            onClick={resetFilters}
            type="button"
          >
            Reset filters
          </button>
        </div>
      </div>

      {filteredPractitioners.length > 0 ? (
        <div
          aria-describedby="directory-results-summary"
          className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3"
        >
          {filteredPractitioners.map((practitioner) => (
            <PractitionerCard
              key={practitioner.id}
              matchesSelectedSpecialism={
                selectedSpecialismForRanking
                  ? practitioner.specialisms.includes(selectedSpecialismForRanking)
                  : false
              }
              practitioner={practitioner}
            />
          ))}
        </div>
      ) : (
        <div className="mt-8 rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center">
          <h3 className="text-lg font-semibold text-slate-950">
            No trainers found
          </h3>
          <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-600">
            Try clearing the filter to see every vetted trainer currently
            listed in the directory.
          </p>
          <button
            className="mt-5 rounded-full bg-slate-950 px-5 py-2 text-sm font-semibold text-white transition hover:bg-slate-800"
            onClick={resetFilters}
            type="button"
          >
            Show all trainers
          </button>
        </div>
      )}
    </section>
  );
}

function FilterGroup({
  children,
  headingId,
  label,
}: {
  children: React.ReactNode;
  headingId: string;
  label: string;
}) {
  return (
    <div aria-labelledby={headingId} role="group">
      <h3 className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-500" id={headingId}>
        {label}
      </h3>
      <div className="flex flex-wrap gap-2">{children}</div>
    </div>
  );
}

function FilterButton({
  isSelected,
  label,
  onClick,
}: {
  isSelected: boolean;
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      aria-pressed={isSelected}
      className={[
        "rounded-full border px-4 py-2 text-sm font-semibold transition focus:outline-none focus:ring-4 focus:ring-slate-200",
        isSelected
          ? "border-slate-950 bg-slate-950 text-white shadow-sm"
          : "border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50",
      ].join(" ")}
      onClick={onClick}
      type="button"
    >
      {label}
    </button>
  );
}
