"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { fetchComments, fetchDecomposition, fetchImpact, fetchKnowledgeGraph, fetchProblem, fetchResearch, fetchRoadmap, fetchSolutions, postComment } from "@/lib/api"
import { ImpactScore, KnowledgeGraph, Problem, ProblemDecomposition, ProblemList, Roadmap, ResearchAssistant, SolutionGenerator, Comment } from "@/lib/types"
import ProblemTree from "@/components/ProblemTree"
import KnowledgeGraphView from "@/components/KnowledgeGraph"
import ImpactRadar from "@/components/ImpactRadar"

interface ProblemDetailClientProps {
  problemId: string
}

export default function ProblemDetailClient({ problemId }: ProblemDetailClientProps) {
  const [problem, setProblem] = useState<Problem | null>(null)
  const [decomposition, setDecomposition] = useState<ProblemDecomposition | null>(null)
  const [research, setResearch] = useState<ResearchAssistant | null>(null)
  const [solutions, setSolutions] = useState<SolutionGenerator | null>(null)
  const [roadmap, setRoadmap] = useState<Roadmap | null>(null)
  const [impact, setImpact] = useState<ImpactScore | null>(null)
  const [graph, setGraph] = useState<KnowledgeGraph | null>(null)
  const [comments, setComments] = useState<Comment[]>([])
  const [commentText, setCommentText] = useState("")
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  useEffect(() => {
    const load = async () => {
      try {
        const [problemData, decompositionData, researchData, solutionsData, roadmapData, impactData, graphData, commentsData] = await Promise.all([
          fetchProblem(problemId),
          fetchDecomposition(problemId),
          fetchResearch(problemId),
          fetchSolutions(problemId),
          fetchRoadmap(problemId),
          fetchImpact(problemId),
          fetchKnowledgeGraph(problemId),
          fetchComments(problemId),
        ])
        setProblem(problemData)
        setDecomposition(decompositionData)
        setResearch(researchData)
        setSolutions(solutionsData)
        setRoadmap(roadmapData)
        setImpact(impactData)
        setGraph(graphData)
        setComments(commentsData)
      } catch (err) {
        setError((err as Error).message)
      }
    }
    load()
  }, [problemId])

  const canComment = typeof window !== "undefined" && !!window.localStorage.getItem("tipp_token")

  const handleComment = async () => {
    if (!commentText.trim()) return
    try {
      const created = await postComment(problemId, commentText)
      setComments((prev) => [created, ...prev])
      setCommentText("")
    } catch (err) {
      setError((err as Error).message)
    }
  }

  const navigateBack = () => router.back()

  if (error) {
    return <div className="mx-auto max-w-6xl rounded-[2rem] border border-rose-400/15 bg-rose-500/10 p-8 text-rose-100">Error loading mission: {error}</div>
  }

  if (!problem) {
    return <div className="mx-auto max-w-6xl rounded-[2rem] border border-white/10 bg-white/5 p-8 text-slate-200">Loading mission data...</div>
  }

  return (
    <div className="mx-auto max-w-7xl space-y-8 py-8">
      <button onClick={navigateBack} className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-200 transition hover:bg-white/10">
        ← Back to mission list
      </button>
      <section className="rounded-[2rem] border border-white/10 bg-[rgba(5,12,22,0.9)] p-8 shadow-[0_28px_80px_rgba(0,0,0,0.22)]">
        <h1 className="text-4xl font-semibold text-white">{problem.title}</h1>
        <p className="mt-4 max-w-3xl text-slate-300">{problem.description}</p>
        <div className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          {[
            { label: "Category", value: problem.category || "General" },
            { label: "Country", value: problem.geographic_scope || "Global" },
            { label: "Impact", value: problem.impact_level || "High" },
            { label: "Status", value: problem.status },
          ].map((item) => (
            <div key={item.label} className="rounded-3xl border border-white/10 bg-white/5 p-4 text-sm text-slate-200">
              <div className="font-semibold text-white">{item.label}</div>
              <div className="mt-2 text-sm text-slate-300">{item.value}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="grid gap-6 xl:grid-cols-[0.95fr_0.85fr]">
        <div className="space-y-6">
          <div className="rounded-[2rem] border border-white/10 bg-white/5 p-6">
            <h2 className="text-2xl font-semibold text-white">AI Problem Decomposition</h2>
            {decomposition ? (
              <>
                <div className="mt-4 grid gap-4 sm:grid-cols-2">
                  <div className="rounded-3xl border border-white/10 bg-slate-950/40 p-4">
                    <h3 className="font-semibold text-white">Root causes</h3>
                    <ul className="mt-3 space-y-2 text-slate-300">
                      {decomposition.root_causes.map((cause) => (
                        <li key={cause}>• {cause}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="rounded-3xl border border-white/10 bg-slate-950/40 p-4">
                    <h3 className="font-semibold text-white">Stakeholders</h3>
                    <ul className="mt-3 space-y-2 text-slate-300">
                      {decomposition.stakeholders.map((stakeholder) => (
                        <li key={stakeholder}>• {stakeholder}</li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="mt-6">
                  <ProblemTree decomposition={decomposition} />
                </div>
              </>
            ) : (
              <p className="mt-4 text-slate-400">AI decomposition is loading...</p>
            )}
          </div>

          <div className="rounded-[2rem] border border-white/10 bg-white/5 p-6">
            <div className="flex items-center justify-between gap-4">
              <h2 className="text-2xl font-semibold text-white">AI Research Assistant</h2>
            </div>
            {research ? (
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                {[
                  { title: "Existing solutions", items: research.existing_solutions },
                  { title: "Failed solutions", items: research.failed_solutions },
                  { title: "Emerging technologies", items: research.emerging_technologies },
                ].map((section) => (
                  <div key={section.title} className="rounded-3xl border border-white/10 bg-slate-950/40 p-4">
                    <h3 className="font-semibold text-white">{section.title}</h3>
                    <ul className="mt-3 space-y-2 text-slate-300">
                      {section.items.map((item) => (
                        <li key={item}>• {item}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            ) : (
              <p className="mt-4 text-slate-400">Research summary is loading...</p>
            )}
          </div>

          <div className="rounded-[2rem] border border-white/10 bg-white/5 p-6">
            <h2 className="text-2xl font-semibold text-white">AI Solution Generator</h2>
            {solutions ? (
              <div className="mt-5 space-y-4">
                {solutions.solutions.map((solution) => (
                  <div key={solution.title} className="rounded-3xl border border-white/10 bg-slate-950/40 p-4">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <h3 className="text-lg font-semibold text-white">{solution.title}</h3>
                      <span className="rounded-full bg-cyan-400/10 px-3 py-1 text-xs text-cyan-100">{solution.solution_type}</span>
                    </div>
                    <p className="mt-3 text-slate-300">{solution.description}</p>
                    <div className="mt-4 grid gap-2 sm:grid-cols-2 xl:grid-cols-4">
                      <span className="rounded-2xl bg-slate-900/70 px-3 py-2 text-xs text-slate-300">Cost: {solution.cost_estimate}</span>
                      <span className="rounded-2xl bg-slate-900/70 px-3 py-2 text-xs text-slate-300">Difficulty: {solution.difficulty}</span>
                      <span className="rounded-2xl bg-slate-900/70 px-3 py-2 text-xs text-slate-300">Impact: {solution.impact_rating}/10</span>
                      <span className="rounded-2xl bg-slate-900/70 px-3 py-2 text-xs text-slate-300">Timeline: {solution.time_to_implement}</span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="mt-4 text-slate-400">Solution generation is loading...</p>
            )}
          </div>
        </div>

        <div className="space-y-6">
          {impact ? <ImpactRadar score={impact} /> : <div className="rounded-[2rem] border border-white/10 bg-white/5 p-6 text-slate-300">Loading impact scoring...</div>}

          <div className="rounded-[2rem] border border-white/10 bg-white/5 p-6">
            <h2 className="text-2xl font-semibold text-white">Project Roadmap</h2>
            {roadmap ? (
              <div className="mt-5 space-y-4">
                {roadmap.phases.map((phase) => (
                  <div key={phase.name} className="rounded-3xl border border-white/10 bg-slate-950/40 p-4">
                    <h3 className="text-lg font-semibold text-white">{phase.name}</h3>
                    <p className="mt-3 text-slate-300">Timeline: {phase.timeline}</p>
                    <div className="mt-3 space-y-2">
                      <div className="text-sm text-slate-400">Tasks:</div>
                      <ul className="list-disc pl-5 text-slate-300">
                        {phase.tasks.map((task) => (<li key={task}>{task}</li>))}
                      </ul>
                    </div>
                    <div className="mt-3 text-sm text-slate-300">Risks: {phase.risks}</div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="mt-4 text-slate-400">Roadmap is loading...</p>
            )}
          </div>

          <div className="rounded-[2rem] border border-white/10 bg-white/5 p-6">
            <h2 className="text-2xl font-semibold text-white">Knowledge Graph</h2>
            {graph ? <KnowledgeGraphView graph={graph} /> : <p className="mt-4 text-slate-400">Graph data is loading...</p>}
          </div>
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-[0.65fr_0.35fr]">
        <div className="rounded-[2rem] border border-white/10 bg-white/5 p-6">
          <h2 className="text-2xl font-semibold text-white">Community Collaboration</h2>
          <p className="mt-3 text-slate-400">Comments, upvotes, and live feedback from mission contributors.</p>
          {canComment ? (
            <div className="mt-5 space-y-3">
              <textarea
                value={commentText}
                onChange={(event) => setCommentText(event.target.value)}
                className="w-full rounded-3xl border border-white/10 bg-slate-950/70 p-4 text-sm text-slate-100 outline-none focus:border-cyan-400"
                rows={4}
                placeholder="Add a contribution or idea..."
              />
              <button onClick={handleComment} className="rounded-full bg-cyan-400 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300">
                Post comment
              </button>
            </div>
          ) : (
            <p className="mt-5 text-slate-400">Log in to contribute comments and upvotes.</p>
          )}
          <div className="mt-6 space-y-4">
            {comments.map((comment) => (
              <div key={comment.id} className="rounded-3xl border border-white/10 bg-slate-950/40 p-4">
                <div className="flex items-center justify-between gap-3 text-sm text-slate-400">
                  <span>Contributor #{comment.user_id}</span>
                  <span>Upvotes: {comment.upvotes}</span>
                </div>
                <p className="mt-3 text-slate-200">{comment.content}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-[2rem] border border-white/10 bg-white/5 p-6">
          <h2 className="text-2xl font-semibold text-white">Mission signals</h2>
          <div className="mt-4 grid gap-3">
            <div className="rounded-3xl bg-slate-950/50 p-4 text-slate-300">Stakeholder alignment: moderate</div>
            <div className="rounded-3xl bg-slate-950/50 p-4 text-slate-300">Research readiness: high</div>
            <div className="rounded-3xl bg-slate-950/50 p-4 text-slate-300">Implementation velocity: medium</div>
            <div className="rounded-3xl bg-slate-950/50 p-4 text-slate-300">Impact potential: high</div>
          </div>
        </div>
      </section>
    </div>
  )
}
