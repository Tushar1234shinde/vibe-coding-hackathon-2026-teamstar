import ProblemListClient from "@/components/ProblemListClient"

export default function ProblemListPage() {
  return (
    <main className="min-h-screen px-5 py-8 text-white md:px-8 lg:px-10">
      <div className="mx-auto max-w-7xl space-y-6">
        <section className="rounded-[2rem] border border-white/10 bg-[rgba(7,17,31,0.88)] p-8 shadow-[0_28px_90px_rgba(0,0,0,0.24)]">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.35em] text-cyan-200/80">Active global missions</p>
              <h1 className="mt-3 text-4xl font-semibold text-white">Explore current problems and AI-generated solution ecosystems</h1>
            </div>
            <a href="/submit" className="inline-flex items-center justify-center rounded-full bg-cyan-400 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300">
              Submit a new mission
            </a>
          </div>
        </section>
        <ProblemListClient />
      </div>
    </main>
  )
}
