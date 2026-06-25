import type { Practitioner } from "@/app/data/practitioners";

type PractitionerCardProps = {
  matchesSelectedSpecialism: boolean;
  practitioner: Practitioner;
};

const tierLabel: Record<Practitioner["tier"], string> = {
  premium: "Premium",
  standard: "Standard",
};

export function PractitionerCard({
  matchesSelectedSpecialism,
  practitioner,
}: PractitionerCardProps) {
  const isPremium = practitioner.tier === "premium";

  return (
    <article
      className={[
        "group flex h-full flex-col rounded-2xl border bg-white p-6 shadow-sm transition duration-200",
        isPremium
          ? "border-amber-300 ring-1 ring-amber-200 hover:-translate-y-1 hover:shadow-xl"
          : "border-slate-200 hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-md",
      ].join(" ")}
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-slate-500">
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

      {isPremium ? (
        <p className="mt-4 w-fit rounded-full bg-slate-950 px-3 py-1 text-xs font-medium text-white">
          Featured trainer
        </p>
      ) : null}

      {matchesSelectedSpecialism ? (
        <p className="mt-3 w-fit rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700 ring-1 ring-emerald-100">
          Matches selected specialism
        </p>
      ) : null}

      <p className="mt-5 flex-1 text-sm leading-6 text-slate-600">
        {practitioner.summary}
      </p>

      <dl className="mt-6 grid gap-3 rounded-xl border border-slate-100 bg-slate-50/80 p-4 text-sm sm:grid-cols-3">
        <div>
          <dt className="text-xs font-semibold uppercase tracking-wide text-slate-500">
            Best for
          </dt>
          <dd className="mt-1 font-semibold text-slate-950">
            {practitioner.audience}
          </dd>
        </div>
        <div>
          <dt className="text-xs font-semibold uppercase tracking-wide text-slate-500">
            Format
          </dt>
          <dd className="mt-1 font-semibold text-slate-950">
            {practitioner.format}
          </dd>
        </div>
        <div>
          <dt className="text-xs font-semibold uppercase tracking-wide text-slate-500">
            Availability
          </dt>
          <dd className="mt-1 font-semibold text-slate-950">
            {practitioner.nextCohort}
          </dd>
        </div>
      </dl>

      <div className="mt-6 flex flex-wrap gap-2">
        {practitioner.specialisms.map((specialism) => (
          <span
            className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-medium text-slate-700"
            key={specialism}
          >
            {specialism}
          </span>
        ))}
      </div>

      <div className="mt-5">
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
          Trust signals
        </p>
        <div className="mt-2 flex flex-wrap gap-2">
          {practitioner.trustSignals.map((signal) => (
            <span
              className="rounded-full bg-white px-3 py-1 text-xs font-medium text-slate-700 ring-1 ring-slate-200"
              key={signal}
            >
              {signal}
            </span>
          ))}
        </div>
      </div>

      <div className="mt-6 flex items-center justify-between border-t border-slate-100 pt-4 text-sm">
        <span className="font-medium text-slate-950">
          {practitioner.yearsTraining}+ years training
        </span>
        <span className={isPremium ? "text-amber-700" : "text-slate-500"}>
          {isPremium ? "Priority listing" : "Listed trainer"}
        </span>
      </div>
    </article>
  );
}
