"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { submitProblem } from "@/lib/api"

export default function SubmitProblemClient() {
  const router = useRouter()
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [category, setCategory] = useState("")
  const [country, setCountry] = useState("")
  const [impactLevel, setImpactLevel] = useState("High")
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    setError(null)
    setSubmitting(true)
    try {
      const newProblem = await submitProblem({
        title,
        description,
        category,
        geographic_scope: country,
        impact_level: impactLevel,
      })
      setSuccess("Mission submitted successfully. Redirecting...")
      router.push(`/problems/${newProblem.id}`)
    } catch (err) {
      setError((err as Error).message)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="mx-auto max-w-4xl rounded-[2rem] border border-white/10 bg-white/5 p-8 shadow-[0_40px_120px_rgba(0,0,0,0.22)]">
      <h1 className="text-3xl font-semibold text-white">Submit a new mission</h1>
      <p className="mt-3 text-slate-300">Turn a real-world challenge into a structured AI problem ecosystem.</p>
      <form onSubmit={handleSubmit} className="mt-8 space-y-6">
        <div className="grid gap-6 lg:grid-cols-2">
          <label className="space-y-2 text-sm text-slate-300">
            <span>Title</span>
            <input value={title} onChange={(event) => setTitle(event.target.value)} required className="w-full rounded-3xl border border-white/10 bg-slate-950/70 px-4 py-3 text-white outline-none focus:border-cyan-300" />
          </label>
          <label className="space-y-2 text-sm text-slate-300">
            <span>Category</span>
            <input value={category} onChange={(event) => setCategory(event.target.value)} required className="w-full rounded-3xl border border-white/10 bg-slate-950/70 px-4 py-3 text-white outline-none focus:border-cyan-300" />
          </label>
        </div>
        <div className="grid gap-6 lg:grid-cols-2">
          <label className="space-y-2 text-sm text-slate-300">
            <span>Country</span>
            <input value={country} onChange={(event) => setCountry(event.target.value)} className="w-full rounded-3xl border border-white/10 bg-slate-950/70 px-4 py-3 text-white outline-none focus:border-cyan-300" />
          </label>
          <label className="space-y-2 text-sm text-slate-300">
            <span>Impact Level</span>
            <select value={impactLevel} onChange={(event) => setImpactLevel(event.target.value)} className="w-full rounded-3xl border border-white/10 bg-slate-950/70 px-4 py-3 text-white outline-none focus:border-cyan-300">
              <option>High</option>
              <option>Medium</option>
              <option>Low</option>
            </select>
          </label>
        </div>
        <label className="space-y-2 text-sm text-slate-300">
          <span>Description</span>
          <textarea value={description} onChange={(event) => setDescription(event.target.value)} rows={6} required className="w-full rounded-[1.5rem] border border-white/10 bg-slate-950/70 px-4 py-4 text-white outline-none focus:border-cyan-300" />
        </label>
        {error ? <div className="rounded-3xl border border-rose-400/20 bg-rose-500/10 p-4 text-sm text-rose-100">{error}</div> : null}
        {success ? <div className="rounded-3xl border border-emerald-400/20 bg-emerald-500/10 p-4 text-sm text-emerald-100">{success}</div> : null}
        <button type="submit" disabled={submitting} className="rounded-full bg-cyan-400 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300 disabled:cursor-not-allowed disabled:opacity-60">
          {submitting ? "Submitting mission..." : "Submit mission"}
        </button>
      </form>
    </div>
  )
}
