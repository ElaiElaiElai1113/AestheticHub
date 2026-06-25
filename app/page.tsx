import { Suspense } from "react";
import {
  BadgeCheck,
  GraduationCap,
  MapPinned,
  ShieldCheck,
} from "lucide-react";
import { PractitionerDirectory } from "@/app/components/practitioner-directory";
import { practitionersByTier, specialisms } from "@/app/data/practitioners";

const trustPoints = [
  {
    icon: ShieldCheck,
    label: "Vetted trainers",
    value: "Reviewed before appearing",
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
    label: "Clear Premium tier",
    value: "Enhanced visibility is marked",
  },
];

export default function Home() {
  const premiumCount = practitionersByTier.filter(
    (practitioner) => practitioner.tier === "premium",
  ).length;
  const standardCount = practitionersByTier.length - premiumCount;

  return (
    <main
      className="min-h-screen bg-[#f7f9fb] text-slate-950"
      id="main-content"
    >
      <header className="border-b border-slate-200 bg-white/90">
        <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-5 sm:px-8 lg:px-10">
          <p className="text-lg font-semibold text-slate-950">
            Aesthetic Training Hub
          </p>
          <nav
            aria-label="Primary"
            className="hidden items-center gap-8 text-sm font-medium text-slate-600 md:flex"
          >
            <a className="border-b-2 border-slate-950 pb-1 text-slate-950" href="#directory-heading">
              Find training
            </a>
            <a className="transition hover:text-slate-950" href="#placement-disclosure">
              How results work
            </a>
            <a className="transition hover:text-slate-950" href="#trainer-listing-note">
              For trainers
            </a>
          </nav>
        </div>
      </header>

      <section className="mx-auto flex w-full max-w-7xl flex-col px-5 py-8 sm:px-8 lg:px-10 lg:py-12">
        <header className="border-b border-slate-200 py-14 text-center lg:py-20">
          <div className="mx-auto max-w-4xl">
            <h1 className="text-4xl font-semibold leading-tight text-slate-950 sm:text-5xl lg:text-6xl">
              Find the right trainer for your next aesthetics course.
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-slate-600 sm:text-lg">
              Compare vetted UK trainers by treatment area, course fit, format,
              and location. Premium trainers are highlighted clearly so you can
              understand how results are ordered.
            </p>

            <div className="mx-auto mt-8 grid max-w-xl grid-cols-3 gap-3">
              <div className="rounded-lg border border-slate-200 bg-white p-4 text-left">
                <p className="text-3xl font-semibold text-slate-950">
                  {practitionersByTier.length}
                </p>
                <p className="mt-1 text-sm text-slate-600">available trainers</p>
              </div>
              <div className="rounded-lg border border-amber-300 bg-amber-50 p-4 text-left">
                <p className="text-3xl font-semibold text-amber-800">
                  {premiumCount}
                </p>
                <p className="mt-1 text-sm text-amber-900">premium</p>
              </div>
              <div className="rounded-lg border border-teal-200 bg-teal-50 p-4 text-left">
                <p className="text-3xl font-semibold text-teal-700">
                  {standardCount}
                </p>
                <p className="mt-1 text-sm text-teal-800">standard</p>
              </div>
            </div>
          </div>
        </header>

        <section
          aria-label="Directory trust signals"
          className="grid gap-3 border-b border-slate-200 py-5 sm:grid-cols-2 lg:grid-cols-4"
        >
          {trustPoints.map(({ icon: Icon, label, value }) => (
            <div
              className="flex items-center gap-3 bg-transparent py-2"
              key={label}
            >
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
          ))}
        </section>

        <Suspense fallback={null}>
          <PractitionerDirectory
            practitioners={practitionersByTier}
            specialisms={specialisms}
          />
        </Suspense>

        <footer
          className="mt-16 grid gap-8 border-t border-slate-200 py-10 lg:grid-cols-[1fr_24rem]"
          id="placement-disclosure"
        >
          <div id="trainer-listing-note">
            <h2 className="text-2xl font-semibold text-slate-950">
              Choose with confidence
            </h2>
            <p className="mt-3 max-w-xl text-sm leading-6 text-slate-600">
              Every trainer in the directory should be vetted before appearing
              publicly. Use the filters, sorting, and shortlist to compare the
              course lead that best fits your training goals.
            </p>
          </div>
          <div className="rounded-lg border border-slate-200 bg-white p-4">
            <h3 className="text-sm font-semibold text-slate-950">
              How Premium works
            </h3>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              Premium is a paid tier that gives trainers enhanced visibility in
              the directory. Vetting standards should remain the same for every
              trainer, regardless of tier.
            </p>
          </div>
        </footer>
      </section>
    </main>
  );
}
