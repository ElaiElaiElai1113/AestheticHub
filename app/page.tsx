import { Suspense } from "react";
import {
  BadgeCheck,
  BookOpenCheck,
  GraduationCap,
  MapPinned,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { PractitionerDirectory } from "@/app/components/practitioner-directory";
import { practitionersByTier, specialisms } from "@/app/data/practitioners";

const trustPoints = [
  {
    icon: ShieldCheck,
    label: "Vetted trainers",
    value: "Reviewed before listing",
  },
  {
    icon: GraduationCap,
    label: "CPD aligned",
    value: "Clear training signals",
  },
  {
    icon: MapPinned,
    label: "UK-wide",
    value: "Regional providers",
  },
  {
    icon: BadgeCheck,
    label: "Paid placement",
    value: "Premium is disclosed",
  },
];

export default function Home() {
  const premiumCount = practitionersByTier.filter(
    (practitioner) => practitioner.tier === "premium",
  ).length;
  const standardCount = practitionersByTier.length - premiumCount;

  return (
    <main
      className="min-h-screen bg-[#f4f0e8] text-slate-950"
      id="main-content"
    >
      <section className="mx-auto flex w-full max-w-7xl flex-col px-5 py-8 sm:px-8 lg:px-10 lg:py-12">
        <header className="overflow-hidden rounded-lg border border-slate-900/10 bg-slate-950 text-white shadow-xl shadow-slate-950/10">
          <div className="grid gap-8 p-6 md:p-8 lg:grid-cols-[1fr_25rem] lg:items-end lg:p-10">
            <div>
              <p className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.22em] text-amber-300">
                <Sparkles aria-hidden className="size-4" />
                Aesthetic Training Hub
              </p>
              <h1 className="mt-5 max-w-4xl text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl">
                Find the right trainer for your next aesthetics course.
              </h1>
              <p className="mt-5 max-w-2xl text-base leading-8 text-slate-300 sm:text-lg">
                Compare vetted UK trainers by specialism, fit, format, and
                subscription tier. Premium partners are highlighted first, with
                paid placement made clear.
              </p>

              <div className="mt-7 flex flex-wrap gap-2">
                <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3.5 py-2 text-sm font-semibold text-white ring-1 ring-white/15">
                  <ShieldCheck aria-hidden className="size-4 text-teal-300" />
                  Vetted before listing
                </span>
                <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3.5 py-2 text-sm font-semibold text-white ring-1 ring-white/15">
                  <BookOpenCheck aria-hidden className="size-4 text-amber-300" />
                  Course-fit signals
                </span>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div className="rounded-lg border border-white/10 bg-white/10 p-4">
                <p className="text-3xl font-semibold text-white">
                  {practitionersByTier.length}
                </p>
                <p className="mt-1 text-sm text-slate-300">listed trainers</p>
              </div>
              <div className="rounded-lg border border-amber-300/40 bg-amber-300/15 p-4">
                <p className="text-3xl font-semibold text-amber-200">
                  {premiumCount}
                </p>
                <p className="mt-1 text-sm text-amber-100">premium</p>
              </div>
              <div className="rounded-lg border border-teal-300/30 bg-teal-300/10 p-4">
                <p className="text-3xl font-semibold text-teal-200">
                  {standardCount}
                </p>
                <p className="mt-1 text-sm text-teal-100">standard</p>
              </div>
            </div>
          </div>
        </header>

        <section
          aria-label="Directory trust signals"
          className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4"
        >
          {trustPoints.map(({ icon: Icon, label, value }) => (
            <div
              className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm"
              key={label}
            >
              <div className="flex items-start gap-3">
                <span className="rounded-full bg-teal-50 p-2 text-teal-700">
                  <Icon aria-hidden className="size-4" />
                </span>
                <div>
                  <h2 className="text-sm font-semibold text-slate-950">
                    {label}
                  </h2>
                  <p className="mt-1 text-sm text-slate-600">{value}</p>
                </div>
              </div>
            </div>
          ))}
        </section>

        <Suspense fallback={null}>
          <PractitionerDirectory
            practitioners={practitionersByTier}
            specialisms={specialisms}
          />
        </Suspense>
      </section>
    </main>
  );
}
