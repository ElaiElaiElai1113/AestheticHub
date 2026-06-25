"use client";

import { MapPin, Search, Sparkles } from "lucide-react";
import Image from "next/image";
import { useMemo, useState, useSyncExternalStore } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { PractitionerCard } from "@/app/components/practitioner-card";
import {
  allSpecialisms,
  allTiers,
  filterAndRankPractitioners,
  getSelectableSort,
  getSelectableSpecialism,
  getSelectableTier,
  recommendedSort,
  type SortOption,
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

const sortOptions: { label: string; value: SortOption; description: string }[] = [
  {
    label: "Recommended",
    value: recommendedSort,
    description: "Highlighted trainers first, then relevance and name",
  },
  {
    label: "Most experienced",
    value: "experience",
    description: "Highest years training first",
  },
  {
    label: "A-Z",
    value: "name",
    description: "Trainer name alphabetical",
  },
];

const initialVisibleTrainerCount = 6;
const shortlistStorageKey = "aesthetic-training-hub-shortlist";
const shortlistChangeEvent = "aesthetic-training-hub-shortlist-change";
const emptyShortlistSnapshot: string[] = [];
let cachedShortlistRaw: string | null = null;
let cachedShortlistIds: string[] = [];

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
  const selectedSort = getSelectableSort(searchParams.get("sort"));
  const searchQuery = searchParams.get("q") ?? "";
  const activeSearchQuery = searchQuery.trim();
  const resultSetKey = [
    selectedSpecialism,
    selectedTier,
    selectedSort,
    activeSearchQuery,
  ].join("|");
  const [visibleTrainerState, setVisibleTrainerState] = useState({
    count: initialVisibleTrainerCount,
    resultSetKey: "",
  });

  const selectedSpecialismForRanking =
    selectedSpecialism === allSpecialisms ? null : selectedSpecialism;

  const filteredPractitioners = useMemo(() => {
    return filterAndRankPractitioners(
      practitioners,
      selectedSpecialism,
      selectedTier,
      searchQuery,
      selectedSort,
    );
  }, [practitioners, searchQuery, selectedSort, selectedSpecialism, selectedTier]);

  const resultLabel =
    filteredPractitioners.length === 1
      ? "1 trainer"
      : `${filteredPractitioners.length} trainers`;
  const hasActiveFilters =
    selectedSpecialism !== allSpecialisms ||
    selectedTier !== allTiers ||
    selectedSort !== recommendedSort ||
    activeSearchQuery !== "";
  const selectedTierLabel =
    selectedTier === allTiers
      ? null
      : tierFilters.find((tier) => tier.value === selectedTier)?.label;
  const storedShortlistedIds = useSyncExternalStore(
    subscribeToShortlist,
    getStoredShortlistSnapshot,
    getServerShortlistSnapshot,
  );
  const validPractitionerIds = useMemo(
    () => new Set(practitioners.map((practitioner) => practitioner.id)),
    [practitioners],
  );
  const shortlistedIds = useMemo(
    () => storedShortlistedIds.filter((id) => validPractitionerIds.has(id)),
    [storedShortlistedIds, validPractitionerIds],
  );
  const featuredPractitioners = useMemo(
    () =>
      filteredPractitioners
        .filter((practitioner) => practitioner.tier === "premium")
        .slice(0, 3),
    [filteredPractitioners],
  );
  const shortlistLabel =
    shortlistedIds.length === 1
      ? "1 shortlisted"
      : `${shortlistedIds.length} shortlisted`;
  const selectedSortLabel =
    sortOptions.find((sortOption) => sortOption.value === selectedSort)?.label ??
    "Recommended";
  const visibleTrainerCount =
    visibleTrainerState.resultSetKey === resultSetKey
      ? visibleTrainerState.count
      : initialVisibleTrainerCount;
  const visiblePractitioners = filteredPractitioners.slice(
    0,
    visibleTrainerCount,
  );
  const canShowMore = visibleTrainerCount < filteredPractitioners.length;

  function updateUrlFilter(
    key: "specialism" | "tier" | "q" | "sort",
    value: string,
  ) {
    const params = new URLSearchParams(searchParams.toString());

    if (
      (key === "specialism" && value === allSpecialisms) ||
      (key === "tier" && value === allTiers) ||
      (key === "q" && value.trim() === "") ||
      (key === "sort" && value === recommendedSort)
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
    params.delete("q");
    params.delete("sort");

    const queryString = params.toString();
    window.history.pushState(null, "", queryString ? `${pathname}?${queryString}` : pathname);
  }

  function toggleShortlist(practitionerId: string) {
    const nextIds = shortlistedIds.includes(practitionerId)
      ? shortlistedIds.filter((id) => id !== practitionerId)
      : [...shortlistedIds, practitionerId];

    saveStoredShortlist(
      nextIds.filter((id) => validPractitionerIds.has(id)),
    );
  }

  return (
    <section aria-labelledby="directory-heading" className="mt-10 pb-20">
      <div>
        <div className="border-b border-slate-200 pb-4">
          <div className="grid gap-4 lg:grid-cols-[minmax(18rem,1fr)_minmax(24rem,40rem)] lg:items-start">
            <div>
              <p className="text-sm font-semibold uppercase text-teal-700">
                Find a course lead
              </p>
              <h2
                className="mt-2 max-w-xl text-2xl font-semibold leading-tight text-slate-950"
                id="directory-heading"
              >
                Browse vetted UK aesthetics trainers
              </h2>
              <div
                className="mt-3 space-y-1 text-sm text-slate-600"
                id="directory-results-summary"
              >
                <p>
                  Showing{" "}
                  <span className="font-semibold text-slate-950">
                    {resultLabel}
                  </span>
                  {selectedSpecialism === allSpecialisms
                    ? ""
                    : ` for ${selectedSpecialism}`}
                  {selectedTierLabel ? ` in ${selectedTierLabel}` : ""}
                  {activeSearchQuery ? ` matching "${activeSearchQuery}"` : ""}
                </p>
                <p className="text-xs leading-5 text-slate-500">
                  {selectedSort === recommendedSort
                    ? "Highlighted Premium trainers appear first, then results sort by relevance and name."
                    : `Sorted by ${selectedSortLabel.toLowerCase()}. Premium trainers remain clearly marked.`}
                  <span className="ml-2 font-semibold text-slate-700">
                    {shortlistLabel}.
                  </span>
                </p>
              </div>
            </div>

            <label className="relative block">
              <span className="sr-only">Search trainers</span>
              <Search
                aria-hidden
                className="pointer-events-none absolute left-3 top-1/2 size-5 -translate-y-1/2 text-slate-400"
              />
              <input
                className="h-12 w-full rounded-lg border border-slate-300 bg-white pl-10 pr-4 text-base font-medium text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-slate-950 focus:ring-0"
                onChange={(event) => updateUrlFilter("q", event.target.value)}
                placeholder="Search treatment, city, trainer, or tier"
                type="search"
                value={searchQuery}
              />
            </label>
          </div>

          <div className="mt-4 flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
            <div className="grid min-w-0 flex-1 gap-3">
              <FilterGroup
                headingId="tier-filter-heading"
                label="Tier"
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
                label="Specialism"
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
            <button
              className="w-fit shrink-0 rounded-lg border border-slate-300 bg-white px-3.5 py-2 text-sm font-medium text-slate-700 transition hover:border-slate-500 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40 lg:mt-5"
              disabled={!hasActiveFilters}
              onClick={resetFilters}
              type="button"
            >
              Reset filters
            </button>
          </div>
        </div>
      </div>

      {filteredPractitioners.length > 0 ? (
        <>
          {selectedTier !== "standard" && featuredPractitioners.length > 0 ? (
            <FeaturedTrainerStrip practitioners={featuredPractitioners} />
          ) : null}

          <div className="mt-6 flex flex-col gap-3 rounded-lg border border-slate-200 bg-white px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm font-medium text-slate-600">
              Showing{" "}
              <span className="font-semibold text-slate-950">
                {visiblePractitioners.length}
              </span>{" "}
              of{" "}
              <span className="font-semibold text-slate-950">
                {filteredPractitioners.length}
              </span>{" "}
              matching trainers
            </p>

            <label className="flex items-center gap-2 text-sm font-semibold text-slate-700">
              <span>Sort by</span>
              <select
                className="h-10 rounded-lg border border-slate-300 bg-white px-3 text-sm font-semibold text-slate-950 outline-none transition focus:border-slate-950 focus:ring-0"
                onChange={(event) => updateUrlFilter("sort", event.target.value)}
                value={selectedSort}
              >
                {sortOptions.map((sortOption) => (
                  <option key={sortOption.value} value={sortOption.value}>
                    {sortOption.label}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <div
            aria-describedby="directory-results-summary"
            className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3"
          >
            {visiblePractitioners.map((practitioner) => (
              <PractitionerCard
                isShortlisted={shortlistedIds.includes(practitioner.id)}
                key={practitioner.id}
                matchesSelectedSpecialism={
                  selectedSpecialismForRanking
                    ? practitioner.specialisms.includes(selectedSpecialismForRanking)
                    : false
                }
                onToggleShortlist={() => toggleShortlist(practitioner.id)}
                practitioner={practitioner}
              />
            ))}
          </div>

          {canShowMore ? (
            <div className="mt-6 flex justify-center">
              <button
                className="rounded-lg border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-800 transition hover:border-slate-500 hover:bg-slate-50 focus:outline-none focus:ring-4 focus:ring-slate-200"
                onClick={() =>
                  setVisibleTrainerState((currentState) => {
                    const currentCount =
                      currentState.resultSetKey === resultSetKey
                        ? currentState.count
                        : initialVisibleTrainerCount;

                    return {
                      count: Math.min(
                        currentCount + initialVisibleTrainerCount,
                        filteredPractitioners.length,
                      ),
                      resultSetKey,
                    };
                  })
                }
                type="button"
              >
                Show more trainers
              </button>
            </div>
          ) : null}
        </>
      ) : (
        <div className="mt-6 rounded-lg border border-dashed border-slate-300 bg-white p-10 text-center">
          <h3 className="text-lg font-semibold text-slate-950">
            No trainers found
          </h3>
          <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-600">
            Try clearing the filter to see every vetted trainer currently
            available in the directory.
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

      {shortlistedIds.length > 0 ? (
        <ShortlistBar
          count={shortlistedIds.length}
          onClear={() => saveStoredShortlist([])}
        />
      ) : null}
    </section>
  );
}

function FeaturedTrainerStrip({
  practitioners,
}: {
  practitioners: Practitioner[];
}) {
  return (
    <section
      aria-label="Premium trainer spotlight"
      className="mt-8 rounded-lg border border-amber-200 bg-white p-4 shadow-sm"
    >
      <div className="flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase text-amber-800">
            <Sparkles aria-hidden className="size-4" />
            Premium spotlight
          </p>
          <h3 className="mt-1 text-lg font-semibold text-slate-950">
            Highlighted trainers
          </h3>
        </div>
        <p className="text-sm text-slate-600">
          Premium trainers receive enhanced visibility and are clearly marked.
        </p>
      </div>

      <div className="mt-4 grid gap-3 lg:grid-cols-3">
        {practitioners.map((practitioner) => (
          <article
            className="overflow-hidden rounded-lg border border-slate-200 bg-slate-50"
            key={practitioner.id}
          >
            <div className="relative aspect-[16/9] overflow-hidden bg-slate-200">
              {practitioner.featuredImage ? (
                <Image
                  alt=""
                  className="object-cover"
                  fill
                  sizes="(max-width: 1024px) 100vw, 33vw"
                  src={practitioner.featuredImage}
                />
              ) : (
                <div className="flex h-full items-center justify-center bg-slate-900 text-3xl font-semibold text-white">
                  {getInitials(practitioner.name)}
                </div>
              )}
              <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-slate-950/65 to-transparent" />
              <span className="absolute left-3 top-3 rounded-lg bg-white/95 px-2.5 py-1 text-[0.68rem] font-semibold uppercase text-amber-800 shadow-sm">
                Premium
              </span>
            </div>

            <div className="p-4">
              <h4 className="text-base font-semibold text-slate-950">
                {practitioner.name}
              </h4>
              <p className="mt-1 flex items-center gap-1.5 text-sm font-medium text-slate-500">
                <MapPin aria-hidden className="size-4" />
                {practitioner.location}
              </p>
              <p className="mt-3 text-sm font-semibold leading-5 text-slate-800">
                {practitioner.bestMatch}
              </p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function getInitials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

function ShortlistBar({
  count,
  onClear,
}: {
  count: number;
  onClear: () => void;
}) {
  return (
    <div
      aria-live="polite"
      className="fixed inset-x-4 bottom-4 z-40 mx-auto flex max-w-xl items-center justify-between gap-3 rounded-lg border border-slate-800/10 bg-slate-950 px-4 py-3 text-white shadow-2xl shadow-slate-950/25"
    >
      <p className="text-sm font-semibold">
        {count === 1 ? "1 trainer shortlisted" : `${count} trainers shortlisted`}
      </p>
      <button
        className="rounded-lg bg-white px-3 py-1.5 text-xs font-semibold text-slate-950 transition hover:bg-slate-100 focus:outline-none focus:ring-4 focus:ring-white/20"
        onClick={onClear}
        type="button"
      >
        Clear
      </button>
    </div>
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
    <div aria-labelledby={headingId} className="min-w-0" role="group">
      <h3
        className="mb-1.5 px-0.5 text-[0.68rem] font-semibold uppercase text-slate-500"
        id={headingId}
      >
        {label}
      </h3>
      <div className="relative -mx-1 max-w-full overflow-hidden">
        <div className="flex max-w-full snap-x gap-1.5 overflow-x-auto px-1 pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden lg:flex-wrap lg:overflow-visible lg:pb-0">
          {children}
        </div>
        <div className="pointer-events-none absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-[#f7f9fb] to-transparent lg:hidden" />
      </div>
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
        "snap-start whitespace-nowrap rounded-lg border px-3 py-1.5 text-sm font-semibold transition focus:outline-none focus:ring-4 focus:ring-slate-200",
        isSelected
          ? "border-slate-950 bg-slate-950 text-white shadow-sm"
          : "border-slate-200 bg-white/80 text-slate-700 hover:border-slate-300 hover:bg-white",
      ].join(" ")}
      onClick={onClick}
      type="button"
    >
      {label}
    </button>
  );
}

function subscribeToShortlist(onStoreChange: () => void) {
  window.addEventListener("storage", onStoreChange);
  window.addEventListener(shortlistChangeEvent, onStoreChange);

  return () => {
    window.removeEventListener("storage", onStoreChange);
    window.removeEventListener(shortlistChangeEvent, onStoreChange);
  };
}

function getServerShortlistSnapshot() {
  return emptyShortlistSnapshot;
}

function getStoredShortlistSnapshot() {
  const rawShortlist = window.localStorage.getItem(shortlistStorageKey) ?? "[]";

  if (rawShortlist === cachedShortlistRaw) {
    return cachedShortlistIds;
  }

  try {
    const parsedShortlist = JSON.parse(rawShortlist) as unknown;

    cachedShortlistIds = Array.isArray(parsedShortlist)
      ? parsedShortlist.filter((id): id is string => typeof id === "string")
      : [];
  } catch {
    cachedShortlistIds = [];
  }

  cachedShortlistRaw = rawShortlist;
  return cachedShortlistIds;
}

function saveStoredShortlist(shortlistedIds: string[]) {
  const nextRawShortlist = JSON.stringify(shortlistedIds);
  window.localStorage.setItem(shortlistStorageKey, nextRawShortlist);
  cachedShortlistRaw = nextRawShortlist;
  cachedShortlistIds = shortlistedIds;
  window.dispatchEvent(new Event(shortlistChangeEvent));
}
