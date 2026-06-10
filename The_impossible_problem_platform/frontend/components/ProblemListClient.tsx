"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { fetchProblems } from "@/lib/api"
import { Problem } from "@/lib/types"

export default function ProblemListClient() {
  const [problems, setProblems] = useState<Problem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const load = async () => {
      try {
        const data = await fetchProblems()
        setProblems(data)
      } catch (err) {
        setError((err as Error).message)
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  if (loading) {
    return <div className="rounded-[2rem] border border-white/10 bg-white/5 p-8 text-slate-200">Loading active challenges...</div>
  }

  if (error) {
    return <div className="rounded-[2rem] border border-rose-400/15 bg-rose-500/10 p-8 text-rose-100">{error}</div>
  }

  return (
    <div className="space-y-6">
      {problems.length === 0 ? (
        <div className="rounded-[2rem] border border-white/10 bg-white/5 p-8 text-slate-200">No problems yet. Submit the first mission.</div>
      ) : (
        <div className="grid gap-6 lg:grid-cols-2">
          {problems.map((problem) => (
            <Link key={problem.id} href={`/problems/${problem.id}`} className="group rounded-[2rem] border border-white/10 bg-white/5 p-6 transition hover:border-cyan-400/20 hover:bg-white/10">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-sm uppercase tracking-[0.25em] text-cyan-200/80">{problem.category || "General"}</p>
                  <h2 className="mt-2 text-2xl font-semibold text-white">{problem.title}</h2>
                </div>
                <span className="rounded-full bg-white/5 px-3 py-1 text-sm text-slate-200">{problem.impact_level || "High"}</span>
              </div>
              <p className="mt-4 text-sm leading-6 text-slate-300">{problem.description.slice(0, 140)}{problem.description.length > 140 ? "..." : ""}</p>
              <div className="mt-5 flex flex-wrap gap-3 text-xs text-slate-400">
                <span>{problem.geographic_scope || "Global"}</span>
                <span>{problem.status}</span>
                <span>{new Date(problem.created_at).toLocaleDateString()}</span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
