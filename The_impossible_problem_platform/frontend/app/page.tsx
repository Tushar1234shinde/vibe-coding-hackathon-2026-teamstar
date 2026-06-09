import Link from 'next/link'

const featuredProblems = [
  {
    title: 'Plastic Waste Crisis',
    domain: 'Circular economy',
    progress: '48% mapped',
    summary: 'AI has decomposed leakage drivers across production, collection, sorting, recycling, and policy reform.',
  },
  {
    title: 'Urban Water Scarcity',
    domain: 'Climate resilience',
    progress: '31% validated',
    summary: 'Mission teams are linking groundwater stress, utility losses, crop patterns, and local governance gaps.',
  },
  {
    title: 'Affordable Housing',
    domain: 'Inclusive growth',
    progress: '62% active',
    summary: 'Cross-functional contributors are comparing modular construction, financing reform, and zoning interventions.',
  },
]

const operatingModules = [
  'AI problem decomposition engine',
  'Research aggregation and evidence synthesis',
  'Knowledge graph for problems, people, and solutions',
  'Collaboration workspace with milestones and workstreams',
  'Simulation and impact evaluation foundation',
  'Reputation, bounties, and innovation marketplace',
]

const controlMetrics = [
  { label: 'Active challenge clusters', value: '128' },
  { label: 'Research artifacts indexed', value: '24.6k' },
  { label: 'Collaborators matched', value: '3,912' },
  { label: 'High-confidence solution paths', value: '74' },
]

const workflow = [
  'Problem intake and mission framing',
  'AI decomposition into root causes and subproblems',
  'Research ingestion, clustering, and graph linking',
  'Collaborative experimentation and solution design',
  'Impact scoring, simulation, and implementation roadmap',
]

export default function Home() {
  return (
    <main className="min-h-screen overflow-hidden px-5 py-6 text-white md:px-8 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <section className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-[linear-gradient(135deg,rgba(7,17,31,0.86),rgba(10,29,48,0.92))] p-8 shadow-[0_30px_80px_rgba(2,8,23,0.45)] backdrop-blur md:p-10 lg:p-12">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(121,247,212,0.14),transparent_28%),radial-gradient(circle_at_bottom_left,rgba(93,154,255,0.14),transparent_32%)]" />
          <div className="relative grid gap-8 lg:grid-cols-[1.35fr_0.95fr]">
            <div className="space-y-8">
              <div className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs uppercase tracking-[0.35em] text-[#79f7d4]">
                Mission Control
              </div>
              <div className="space-y-5">
                <h1 className="max-w-4xl font-[var(--font-display)] text-5xl font-bold leading-[1.02] tracking-[-0.04em] text-white md:text-6xl lg:text-7xl">
                  Solving humanity&apos;s hardest problems through collective intelligence.
                </h1>
                <p className="max-w-3xl text-lg leading-8 text-slate-300 md:text-xl">
                  The Impossible Problem Platform turns vague, high-stakes global challenges into structured AI-assisted missions with research evidence, expert collaboration, and implementation-ready solution pathways.
                </p>
              </div>
              <div className="flex flex-wrap gap-4">
                <Link href="#challenges" className="rounded-full bg-[#79f7d4] px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-[#9af9e0]">
                  Explore active missions
                </Link>
                <Link href="#workflow" className="rounded-full border border-white/15 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition hover:border-white/40 hover:bg-white/10">
                  See the operating model
                </Link>
              </div>
              <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                {controlMetrics.map((metric) => (
                  <div key={metric.label} className="rounded-[1.6rem] border border-white/10 bg-white/[0.04] p-5">
                    <div className="text-3xl font-semibold text-white">{metric.value}</div>
                    <div className="mt-2 text-sm text-slate-400">{metric.label}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="grid gap-4 self-start">
              <div className="rounded-[1.8rem] border border-cyan-400/20 bg-[rgba(6,18,33,0.72)] p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs uppercase tracking-[0.3em] text-cyan-200/80">AI decomposition</p>
                    <h2 className="mt-2 font-[var(--font-display)] text-2xl font-semibold">Plastic Waste Crisis</h2>
                  </div>
                  <div className="rounded-full border border-emerald-300/25 bg-emerald-300/10 px-3 py-1 text-xs text-emerald-200">
                    Live analysis
                  </div>
                </div>
                <div className="mt-6 grid gap-3">
                  {['Production systems', 'Collection networks', 'Sorting intelligence', 'Recycling economics', 'Consumer behavior', 'Policy reform'].map((node, index) => (
                    <div key={node} className="flex items-center gap-4 rounded-2xl border border-white/8 bg-white/[0.03] px-4 py-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-cyan-300/15 text-xs text-cyan-100">{index + 1}</div>
                      <span className="text-sm text-slate-200">{node}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="rounded-[1.8rem] border border-amber-300/20 bg-[rgba(11,23,39,0.78)] p-6">
                <p className="text-xs uppercase tracking-[0.3em] text-amber-100/80">Collaboration signal</p>
                <div className="mt-4 grid gap-4 md:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
                  {['Researcher, India', 'Materials Scientist, Germany', 'Founder, Singapore'].map((profile) => (
                    <div key={profile} className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 text-sm text-slate-200">
                      {profile}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="challenges" className="mt-8 grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="rounded-[1.8rem] border border-white/10 bg-[rgba(8,20,36,0.8)] p-7">
            <div className="flex items-end justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Priority challenges</p>
                <h2 className="mt-2 font-[var(--font-display)] text-3xl font-semibold text-white">Global problem portfolio</h2>
              </div>
              <span className="text-sm text-slate-400">Cross-sector, research-backed, action-oriented</span>
            </div>
            <div className="mt-6 grid gap-4">
              {featuredProblems.map((problem) => (
                <article key={problem.title} className="rounded-[1.5rem] border border-white/10 bg-white/[0.04] p-5 transition hover:border-cyan-300/30 hover:bg-white/[0.06]">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <p className="text-sm uppercase tracking-[0.25em] text-[#79f7d4]">{problem.domain}</p>
                      <h3 className="mt-1 text-2xl font-semibold text-white">{problem.title}</h3>
                    </div>
                    <div className="rounded-full border border-white/10 px-3 py-1 text-sm text-slate-300">{problem.progress}</div>
                  </div>
                  <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-300">{problem.summary}</p>
                </article>
              ))}
            </div>
          </div>

          <div className="rounded-[1.8rem] border border-white/10 bg-[rgba(9,24,43,0.88)] p-7">
            <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Platform modules</p>
            <h2 className="mt-2 font-[var(--font-display)] text-3xl font-semibold">Operating system capabilities</h2>
            <div className="mt-6 grid gap-3">
              {operatingModules.map((module, index) => (
                <div key={module} className="flex gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                  <div className="text-sm text-[#ffc857]">{String(index + 1).padStart(2, '0')}</div>
                  <div className="text-sm leading-6 text-slate-200">{module}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="workflow" className="mt-8 rounded-[1.8rem] border border-white/10 bg-[rgba(6,18,33,0.76)] p-7">
          <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Mission workflow</p>
              <h2 className="mt-2 font-[var(--font-display)] text-3xl font-semibold text-white">From vague challenge to implementation roadmap</h2>
              <p className="mt-4 max-w-xl text-sm leading-7 text-slate-300">
                The platform orchestrates AI agents, human experts, research inputs, and impact evaluation so teams can move from raw problem framing to measurable execution without losing context.
              </p>
            </div>
            <div className="grid gap-4 md:grid-cols-5">
              {workflow.map((step, index) => (
                <div key={step} className="rounded-[1.5rem] border border-white/10 bg-white/[0.04] p-4">
                  <div className="text-sm text-cyan-200">0{index + 1}</div>
                  <div className="mt-4 text-sm leading-6 text-slate-200">{step}</div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}
