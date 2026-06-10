import Link from 'next/link'

const featuredProblems = [
  {
    title: 'Mumbai Traffic Congestion',
    domain: 'Urban mobility',
    progress: 'AI decomposed',
    summary: 'A machine-assisted mission maps root causes across transit, signals, demand and parking behavior.',
  },
  {
    title: 'Plastic Waste Crisis',
    domain: 'Circular economy',
    progress: 'Solution prototypes',
    summary: 'Adaptive materials, collection intelligence, and policy incentives are surfaced as high-value intervention tracks.',
  },
  {
    title: 'Water Access Equity',
    domain: 'Climate resilience',
    progress: 'Evidence-backed',
    summary: 'The platform synthesizes leakage drivers, community distribution, and governance gaps into a launchable roadmap.',
  },
]

const operatingModules = [
  'AI problem decomposition',
  'Interactive mission tree',
  'Research assistant & knowledge graph',
  'Solution generator with scoring',
  'Roadmap creation and collaboration',
  'Dark-mode mission control UI',
]

const controlMetrics = [
  { label: 'Demo-ready missions', value: '12' },
  { label: 'AI workflows built', value: '7' },
  { label: 'Collaboration threads', value: '58' },
  { label: 'Impact models created', value: '24' },
]

const workflow = [
  'Submit mission challenge',
  'AI decomposes root causes',
  'Generate solutions and research',
  'Score impact and timeline',
  'Visualize graph and roadmap',
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
                HackIndia Vibe Mission
              </div>
              <div className="space-y-5">
                <h1 className="max-w-4xl font-[var(--font-display)] text-5xl font-bold leading-[1.02] tracking-[-0.04em] text-white md:text-6xl lg:text-7xl">
                  Solving humanity&apos;s hardest problems through collective intelligence.
                </h1>
                <p className="max-w-3xl text-lg leading-8 text-slate-300 md:text-xl">
                  The Impossible Problem Platform turns broad social challenges into AI-powered missions with decomposition, solution scoring, knowledge graphs, and a demo-ready collaboration workspace.
                </p>
              </div>
              <div className="flex flex-wrap gap-4">
                <Link href="/submit" className="rounded-full bg-[#79f7d4] px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-[#9af9e0]">
                  Submit a mission
                </Link>
                <Link href="/problems" className="rounded-full border border-white/15 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition hover:border-white/40 hover:bg-white/10">
                  Explore missions
                </Link>
                <Link href="/auth" className="rounded-full border border-white/15 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition hover:border-white/40 hover:bg-white/10">
                  Join the platform
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
                    <p className="text-xs uppercase tracking-[0.3em] text-cyan-200/80">Live demo signal</p>
                    <h2 className="mt-2 font-[var(--font-display)] text-2xl font-semibold">Mumbai Traffic Mission</h2>
                  </div>
                  <div className="rounded-full border border-emerald-300/25 bg-emerald-300/10 px-3 py-1 text-xs text-emerald-200">
                    Demo-ready
                  </div>
                </div>
                <div className="mt-6 grid gap-3">
                  {['Infrastructure issues', 'Traffic signal gaps', 'Transit adoption', 'Parking inefficiency', 'Urban planning'].map((node, index) => (
                    <div key={node} className="flex items-center gap-4 rounded-2xl border border-white/8 bg-white/[0.03] px-4 py-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-cyan-300/15 text-xs text-cyan-100">{index + 1}</div>
                      <span className="text-sm text-slate-200">{node}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="rounded-[1.8rem] border border-amber-300/20 bg-[rgba(11,23,39,0.78)] p-6">
                <p className="text-xs uppercase tracking-[0.3em] text-amber-100/80">Core judging features</p>
                <div className="mt-4 grid gap-4 md:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
                  {['Decomposition tree', 'Impact scoring', 'AI roadmap'].map((signal) => (
                    <div key={signal} className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 text-sm text-slate-200">
                      {signal}
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
                <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Mission portfolio</p>
                <h2 className="mt-2 font-[var(--font-display)] text-3xl font-semibold text-white">Demo challenges</h2>
              </div>
              <span className="text-sm text-slate-400">Built for impact, AI, and judge wow factor</span>
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
            <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Platform capabilities</p>
            <h2 className="mt-2 font-[var(--font-display)] text-3xl font-semibold">Built for the hackathon demo</h2>
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
              <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Demo workflow</p>
              <h2 className="mt-2 font-[var(--font-display)] text-3xl font-semibold text-white">From problem submission to judge-ready roadmap</h2>
              <p className="mt-4 max-w-xl text-sm leading-7 text-slate-300">
                Build a polished demonstration using a single platform flow: submit a challenge, generate AI insights, visualize a problem tree, and display scored solutions and timelines.
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
