import { PractitionerDirectory } from "@/app/components/practitioner-directory";
import { practitionersByTier, specialisms } from "@/app/data/practitioners";

export default function Home() {
  const premiumCount = practitionersByTier.filter(
    (practitioner) => practitioner.tier === "premium",
  ).length;

  return (
    <main className="min-h-screen bg-[#f6f3ee] text-slate-950">
      <section className="mx-auto flex w-full max-w-7xl flex-col px-5 py-8 sm:px-8 lg:px-10 lg:py-12">
        <header className="flex flex-col gap-8 rounded-[2rem] border border-white/70 bg-white/70 p-6 shadow-sm backdrop-blur md:p-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-amber-700">
              Aesthetic Training Hub
            </p>
            <h1 className="mt-5 max-w-4xl text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl lg:text-6xl">
              Discover vetted UK aesthetics trainers.
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-8 text-slate-600 sm:text-lg">
              Compare trainers by specialism, location, and listing tier.
              Premium partners are highlighted first so students can quickly
              spot featured training providers.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:min-w-80">
            <div className="rounded-2xl border border-slate-200 bg-white p-4">
              <p className="text-3xl font-semibold text-slate-950">
                {practitionersByTier.length}
              </p>
              <p className="mt-1 text-sm text-slate-600">listed trainers</p>
            </div>
            <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4">
              <p className="text-3xl font-semibold text-amber-800">
                {premiumCount}
              </p>
              <p className="mt-1 text-sm text-amber-900">premium partners</p>
            </div>
          </div>
        </header>

        <PractitionerDirectory
          practitioners={practitionersByTier}
          specialisms={specialisms}
        />
      </section>
    </main>
  );
}
