import { Suspense } from "react";
import {
  BadgeCheck,
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

  return (
    <main
      className="min-h-screen bg-[#f7f4ee] text-slate-950"
      id="main-content"
    >
      <section className="mx-auto flex w-full max-w-7xl flex-col px-5 py-8 sm:px-8 lg:px-10 lg:py-12">
        <header className="rounded-lg border border-white/80 bg-white p-6 shadow-sm md:p-8 lg:p-10">
          <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
            <div>
              <p className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.22em] text-amber-700">
                <Sparkles aria-hidden className="size-4" />
                Aesthetic Training Hub
              </p>
              <h1 className="mt-5 max-w-4xl text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl lg:text-6xl">
                Find the right trainer for your next aesthetics course.
              </h1>
              <p className="mt-5 max-w-2xl text-base leading-8 text-slate-600 sm:text-lg">
                Compare vetted UK trainers by specialism, fit, format, and
                subscription tier. Premium partners are highlighted first, with
                paid placement made clear.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 sm:min-w-80">
              <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
                <p className="text-3xl font-semibold text-slate-950">
                  {practitionersByTier.length}
                </p>
                <p className="mt-1 text-sm text-slate-600">listed trainers</p>
              </div>
              <div className="rounded-lg border border-amber-200 bg-amber-50 p-4">
                <p className="text-3xl font-semibold text-amber-800">
                  {premiumCount}
                </p>
                <p className="mt-1 text-sm text-amber-900">premium partners</p>
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
