import type { Practitioner } from "@/app/data/practitioners";

type PractitionerCardProps = {
  practitioner: Practitioner;
};

const tierLabel: Record<Practitioner["tier"], string> = {
  premium: "Premium",
  standard: "Standard",
};

export function PractitionerCard({ practitioner }: PractitionerCardProps) {
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

      <p className="mt-5 flex-1 text-sm leading-6 text-slate-600">
        {practitioner.summary}
      </p>

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
