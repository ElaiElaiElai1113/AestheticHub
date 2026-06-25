"use client";

import { useMemo, useState } from "react";
import { PractitionerCard } from "@/app/components/practitioner-card";
import {
  rankPractitionersForSpecialism,
  type Practitioner,
} from "@/app/data/practitioners";

type PractitionerDirectoryProps = {
  practitioners: Practitioner[];
  specialisms: string[];
};

const allSpecialisms = "All";

export function PractitionerDirectory({
  practitioners,
  specialisms,
}: PractitionerDirectoryProps) {
  const [selectedSpecialism, setSelectedSpecialism] = useState(allSpecialisms);

  const selectedSpecialismForRanking =
    selectedSpecialism === allSpecialisms ? null : selectedSpecialism;

  const filteredPractitioners = useMemo(() => {
    if (selectedSpecialism === allSpecialisms) {
      return rankPractitionersForSpecialism(practitioners, null);
    }

    return rankPractitionersForSpecialism(
      practitioners.filter((practitioner) =>
        practitioner.specialisms.includes(selectedSpecialism),
      ),
      selectedSpecialism,
    );
  }, [practitioners, selectedSpecialism]);

  const resultLabel =
    filteredPractitioners.length === 1
      ? "1 trainer"
      : `${filteredPractitioners.length} trainers`;

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
              Filter by specialism to compare trainers who match the treatment
              area or business skill you want to develop next.
            </p>
            <p className="mt-3 max-w-2xl text-sm font-medium text-slate-700">
              All listed trainers are reviewed before appearing in the
              directory.
            </p>
          </div>

          <div aria-label="Filter by specialism" className="flex flex-wrap gap-2">
            {[allSpecialisms, ...specialisms].map((specialism) => {
              const isSelected = selectedSpecialism === specialism;

              return (
                <button
                  aria-pressed={isSelected}
                  className={[
                    "rounded-full border px-4 py-2 text-sm font-semibold transition focus:outline-none focus:ring-4 focus:ring-slate-200",
                    isSelected
                      ? "border-slate-950 bg-slate-950 text-white shadow-sm"
                      : "border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50",
                  ].join(" ")}
                  key={specialism}
                  onClick={() => setSelectedSpecialism(specialism)}
                  type="button"
                >
                  {specialism}
                </button>
              );
            })}
          </div>
        </div>

        <div className="mt-5 grid gap-4 border-t border-slate-100 pt-4 text-sm text-slate-600 lg:grid-cols-[1fr_auto] lg:items-start">
          <div className="space-y-2">
            <p>
              Showing{" "}
              <span className="font-semibold text-slate-950">
                {resultLabel}
              </span>
              {selectedSpecialism === allSpecialisms
                ? ""
                : ` for ${selectedSpecialism}`}
            </p>
            <p className="max-w-3xl leading-6">
              Results show Premium trainers first as featured placements. Within
              each tier, selected-specialism matches are prioritised, then
              sorted by trainer name.
            </p>
          </div>
          <button
            className="w-fit rounded-full border border-slate-200 px-4 py-2 font-medium text-slate-700 transition hover:border-slate-300 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
            disabled={selectedSpecialism === allSpecialisms}
            onClick={() => setSelectedSpecialism(allSpecialisms)}
            type="button"
          >
            Reset filter
          </button>
        </div>
      </div>

      {filteredPractitioners.length > 0 ? (
        <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
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
            onClick={() => setSelectedSpecialism(allSpecialisms)}
            type="button"
          >
            Show all trainers
          </button>
        </div>
      )}
    </section>
  );
}
