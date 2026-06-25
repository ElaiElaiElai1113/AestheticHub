import {
  BadgeCheck,
  Bookmark,
  BookmarkCheck,
  CalendarDays,
  Clock3,
  MapPin,
  ShieldCheck,
  Sparkles,
  UsersRound,
  type LucideIcon,
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
  const visibleSpecialisms = practitioner.specialisms.slice(0, 2);
  const hiddenSpecialismCount =
    practitioner.specialisms.length - visibleSpecialisms.length;
  const visibleTrustSignals = practitioner.trustSignals.slice(0, 1);
  const hiddenTrustSignalCount =
    practitioner.trustSignals.length - visibleTrustSignals.length;

  return (
    <article
      className={[
        "group relative flex h-full flex-col overflow-hidden rounded-lg border bg-white shadow-sm transition duration-200",
        isPremium
          ? "border-amber-300 ring-1 ring-amber-100 hover:-translate-y-1 hover:shadow-xl hover:shadow-amber-950/10"
          : "border-slate-200 hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-md",
      ].join(" ")}
    >
      {isPremium ? (
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-amber-100 bg-[#fff8e8] px-5 py-3 text-xs font-semibold text-amber-900">
          <span className="inline-flex items-center gap-2 uppercase tracking-wide">
            <Sparkles aria-hidden className="size-4" />
            Featured profile
          </span>
          <span className="text-amber-800">Priority placement</span>
        </div>
      ) : null}

      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="flex items-center gap-1.5 text-sm font-semibold text-teal-700">
              <MapPin aria-hidden className="size-4" />
              {practitioner.location}
            </p>
            <h2 className="mt-2 text-xl font-semibold tracking-tight text-slate-950">
              {practitioner.name}
            </h2>
          </div>
          <span
            className={[
              "shrink-0 rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wide",
              isPremium
                ? "bg-amber-100 text-amber-800"
                : "bg-slate-100 text-slate-600",
            ].join(" ")}
          >
            {tierLabel[practitioner.tier]}
          </span>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          <p className="inline-flex items-center gap-1.5 rounded-full bg-teal-50 px-3 py-1 text-xs font-semibold text-teal-700 ring-1 ring-teal-100">
            <UsersRound aria-hidden className="size-3.5" />
            Best for {practitioner.audience.toLowerCase()}
          </p>

          {isPremium ? (
            <p className="inline-flex items-center gap-1.5 rounded-full bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-800 ring-1 ring-amber-100">
              <BadgeCheck aria-hidden className="size-3.5" />
              Richer profile and priority placement
            </p>
          ) : null}

          {matchesSelectedSpecialism ? (
            <p className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700 ring-1 ring-emerald-100">
              <ShieldCheck aria-hidden className="size-3.5" />
              Matches selected specialism
            </p>
          ) : null}
        </div>

        <p className="mt-4 line-clamp-3 text-sm leading-6 text-slate-600">
          {practitioner.summary}
        </p>

        <div className="mt-4 rounded-lg bg-[#0f3438] px-4 py-3 text-white">
          <p className="text-xs font-semibold uppercase tracking-wide text-teal-100">
            Best match
          </p>
          <p className="mt-1 text-sm font-semibold leading-5">
            {practitioner.bestMatch}
          </p>
        </div>

        <dl className="mt-4 grid grid-cols-3 gap-3 border-y border-slate-100 py-4 text-sm">
          <InfoItem
            icon={UsersRound}
            label="Best for"
            value={practitioner.audience}
          />
          <InfoItem icon={Clock3} label="Format" value={practitioner.format} />
          <InfoItem
            icon={CalendarDays}
            label="Availability"
            value={practitioner.nextCohort}
          />
        </dl>

        <div className="mt-4 flex flex-wrap gap-2">
          {visibleSpecialisms.map((specialism) => (
            <span
              className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-medium text-slate-700"
              key={specialism}
            >
              {specialism}
            </span>
          ))}
          {hiddenSpecialismCount > 0 ? (
            <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-500">
              +{hiddenSpecialismCount} more
            </span>
          ) : null}
        </div>

        <div className="mt-3">
          <p className="flex items-center gap-1.5 text-[0.7rem] font-semibold uppercase tracking-wide text-slate-500">
            <ShieldCheck aria-hidden className="size-3.5" />
            Trust signals
          </p>
          <div className="mt-2 flex flex-wrap gap-2">
            {visibleTrustSignals.map((signal) => (
              <span
                className="rounded-full bg-white px-3 py-1 text-xs font-medium text-slate-700 ring-1 ring-slate-200"
                key={signal}
              >
                {signal}
              </span>
            ))}
            {hiddenTrustSignalCount > 0 ? (
              <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-500">
                +{hiddenTrustSignalCount} more
              </span>
            ) : null}
          </div>
        </div>

        <div className="mt-auto flex items-center justify-between border-t border-slate-100 pt-4 text-sm">
          <span className="font-medium text-slate-950">
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
              "inline-flex min-w-28 items-center justify-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-semibold shadow-sm transition focus:outline-none focus:ring-4",
              isShortlisted
                ? "border-emerald-200 bg-emerald-50 text-emerald-700 focus:ring-emerald-100"
                : "border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:text-slate-950 focus:ring-slate-200",
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

function InfoItem({
  icon: Icon,
  label,
  value,
}: {
  icon: LucideIcon;
  label: string;
  value: string;
}) {
  return (
    <div>
      <dt className="flex items-center gap-1.5 text-[0.68rem] font-semibold uppercase tracking-wide text-slate-500">
        <Icon aria-hidden className="size-3.5" />
        {label}
      </dt>
      <dd className="mt-1 text-xs font-semibold leading-5 text-slate-950 sm:text-sm">
        {value}
      </dd>
    </div>
  );
}
