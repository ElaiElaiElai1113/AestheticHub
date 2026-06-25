import { Suspense } from "react";
import {
  BadgeCheck,
  GraduationCap,
  MapPinned,
  Search,
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
        <header className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-stretch">
          <div className="flex min-h-[420px] flex-col justify-between rounded-lg border border-white/80 bg-white p-6 shadow-sm md:p-8">
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

            <div className="mt-8 grid grid-cols-2 gap-3 sm:max-w-md">
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

          <aside
            aria-label="Student search preview"
            className="rounded-lg border border-slate-200 bg-slate-950 p-5 text-white shadow-sm md:p-6"
          >
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm font-semibold uppercase tracking-wide text-amber-300">
                  Student brief
                </p>
                <h2 className="mt-2 text-2xl font-semibold">
                  Advanced skin training
                </h2>
              </div>
              <div className="rounded-full bg-white/10 p-3">
                <Search aria-hidden className="size-5" />
              </div>
            </div>

            <div className="mt-6 space-y-3">
              <PreviewRow label="Specialism" value="Laser and IPL" />
              <PreviewRow label="Preferred fit" value="Advanced injectors" />
              <PreviewRow label="Format" value="1:1 or small group" />
            </div>

            <div className="mt-6 rounded-lg border border-white/10 bg-white/10 p-4">
              <p className="text-sm font-semibold text-amber-200">
                Recommended match
              </p>
              <p className="mt-2 text-xl font-semibold">Priya Nair</p>
              <p className="mt-2 text-sm leading-6 text-slate-300">
                Premium profile with advanced clinical governance, laser
                training, and complication management.
              </p>
            </div>

            <div className="mt-6 flex flex-wrap gap-2">
              {["Verified", "Premium", "Clinical governance"].map((item) => (
                <span
                  className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-slate-950"
                  key={item}
                >
                  {item}
                </span>
              ))}
            </div>
          </aside>
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

function PreviewRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-white/10 bg-white/[0.06] p-4">
      <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
        {label}
      </p>
      <p className="mt-1 font-semibold text-white">{value}</p>
    </div>
  );
}
