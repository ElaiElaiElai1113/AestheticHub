import {
  BadgeCheck,
  Bookmark,
  BookmarkCheck,
  CalendarDays,
  Clock3,
  MapPin,
  ShieldCheck,
  UsersRound,
} from "lucide-react";
import type { Practitioner } from "@/app/data/practitioners";

type PractitionerCardProps = {
  isShortlisted: boolean;
  matchesSelectedSpecialism: boolean;
  onToggleShortlist: () => void;
  practitioner: Practitioner;
};

const tierLabel: Record<Practitioner["tier"], string> = {
  premium: "Premium",
  standard: "Standard",
};

export function PractitionerCard({
  isShortlisted,
  matchesSelectedSpecialism,
  onToggleShortlist,
  practitioner,
}: PractitionerCardProps) {
  const isPremium = practitioner.tier === "premium";
  const ShortlistIcon = isShortlisted ? BookmarkCheck : Bookmark;
  const initials = getInitials(practitioner.name);
  const visibleSpecialisms = practitioner.specialisms.slice(0, 2);
  const hiddenSpecialismCount =
    practitioner.specialisms.length - visibleSpecialisms.length;
  const visibleTrustSignals = practitioner.trustSignals.slice(0, 1);

  return (
    <article
      className={[
        "group relative flex h-full flex-col overflow-hidden rounded-lg border bg-white shadow-sm transition duration-200",
        isPremium
          ? "border-amber-300 hover:border-amber-400 hover:shadow-lg hover:shadow-amber-950/10"
          : "border-slate-200 hover:border-slate-300 hover:shadow-md",
      ].join(" ")}
    >
      {isPremium ? (
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-amber-100 bg-amber-50 px-4 py-2 text-xs font-semibold text-amber-900">
          <span className="inline-flex items-center gap-2">
            <BadgeCheck aria-hidden className="size-3.5" />
            Premium profile
          </span>
          <span className="text-amber-800">Enhanced visibility</span>
        </div>
      ) : null}

      <div className="flex flex-1 flex-col p-4">
        <div className="flex items-start gap-4">
          <div
            aria-hidden
            className={[
              "grid size-16 shrink-0 place-items-center rounded-lg border text-lg font-semibold",
              isPremium
                ? "border-amber-200 bg-amber-50 text-amber-800"
                : "border-teal-100 bg-teal-50 text-teal-700",
            ].join(" ")}
          >
            {initials}
          </div>

          <div className="min-w-0 flex-1">
            <div className="flex items-start justify-between gap-3">
              <div>
                <h2 className="text-lg font-semibold leading-6 text-slate-950">
                  {practitioner.name}
                </h2>
                <p className="mt-1 flex items-center gap-1.5 text-sm font-medium text-slate-500">
                  <MapPin aria-hidden className="size-4" />
                  {practitioner.location}
                </p>
              </div>
              <span
                className={[
                  "shrink-0 rounded-full px-2.5 py-1 text-[0.68rem] font-semibold uppercase",
                  isPremium
                    ? "bg-amber-100 text-amber-800"
                    : "bg-slate-100 text-slate-600",
                ].join(" ")}
              >
                {tierLabel[practitioner.tier]}
              </span>
            </div>
          </div>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          {visibleSpecialisms.map((specialism) => (
            <span
              className="rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs font-medium text-slate-700"
              key={specialism}
            >
              {specialism}
            </span>
          ))}
          {hiddenSpecialismCount > 0 ? (
            <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-500">
              +{hiddenSpecialismCount} more
            </span>
          ) : null}
        </div>

        <p className="mt-4 line-clamp-2 text-sm leading-6 text-slate-600">
          {practitioner.summary}
        </p>

        <div className="mt-4 rounded-lg border border-slate-200 bg-slate-50 p-3">
          <p className="text-xs font-semibold uppercase text-slate-500">
            Good fit for
          </p>
          <p className="mt-1 text-sm font-semibold leading-5 text-slate-950">
            {practitioner.bestMatch}
          </p>
        </div>

        <dl className="mt-4 grid grid-cols-2 gap-3 border-y border-slate-100 py-4 text-sm">
          <InfoItem icon={Clock3} label="Format" value={practitioner.format} />
          <InfoItem
            icon={CalendarDays}
            label="Next cohort"
            value={practitioner.nextCohort.replace("Next cohort: ", "")}
          />
        </dl>

        <div className="mt-3 flex flex-wrap items-center gap-2">
          <p className="inline-flex items-center gap-1.5 rounded-full bg-teal-50 px-2.5 py-1 text-xs font-semibold text-teal-700 ring-1 ring-teal-100">
            <UsersRound aria-hidden className="size-3.5" />
            {practitioner.audience}
          </p>
          {visibleTrustSignals.map((signal) => (
            <span
              className="inline-flex items-center gap-1.5 rounded-full bg-white px-2.5 py-1 text-xs font-medium text-slate-700 ring-1 ring-slate-200"
              key={signal}
            >
              <ShieldCheck aria-hidden className="size-3.5 text-teal-700" />
              {signal}
            </span>
          ))}
          {matchesSelectedSpecialism ? (
            <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700 ring-1 ring-emerald-100">
              <ShieldCheck aria-hidden className="size-3.5" />
              Matches filter
            </span>
          ) : null}
        </div>

        <div className="mt-auto flex items-center justify-between border-t border-slate-100 pt-4 text-sm">
          <span className="font-medium text-slate-700">
            {practitioner.yearsTraining}+ years training
          </span>
          <button
            aria-label={
              isShortlisted
                ? `Remove ${practitioner.name} from shortlist`
                : `Add ${practitioner.name} to shortlist`
            }
            aria-pressed={isShortlisted}
            className={[
              "inline-flex min-w-28 items-center justify-center gap-1.5 rounded-lg border px-3 py-2 text-xs font-semibold transition focus:outline-none focus:ring-4",
              isShortlisted
                ? "border-teal-200 bg-teal-50 text-teal-700 focus:ring-teal-100"
                : "border-teal-700 bg-white text-teal-700 hover:bg-teal-50 focus:ring-teal-100",
            ].join(" ")}
            onClick={onToggleShortlist}
            type="button"
          >
            <ShortlistIcon aria-hidden className="size-3.5" />
            {isShortlisted ? "Saved" : "Shortlist"}
          </button>
        </div>
      </div>
    </article>
  );
}

function getInitials(name: string) {
  return name
    .split(" ")
    .map((part) => part.at(0))
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

function InfoItem({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof CalendarDays;
  label: string;
  value: string;
}) {
  return (
    <div>
      <dt className="flex items-center gap-1.5 text-[0.68rem] font-semibold uppercase text-slate-500">
        <Icon aria-hidden className="size-3.5" />
        {label}
      </dt>
      <dd className="mt-1 text-sm font-semibold leading-5 text-slate-950">
        {value}
      </dd>
    </div>
  );
}
