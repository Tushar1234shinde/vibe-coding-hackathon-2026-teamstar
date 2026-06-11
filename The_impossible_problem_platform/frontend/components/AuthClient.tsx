"use client"

import { useState } from "react"
import { loginUser, registerUser } from "@/lib/api"

export default function AuthClient() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [name, setName] = useState("")
  const [role, setRole] = useState("contributor")
  const [mode, setMode] = useState<"login" | "register">("login")
  const [message, setMessage] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    setError(null)
    setMessage(null)

    try {
      if (mode === "register") {
        await registerUser({ email, password, full_name: name, role })
        setMessage("Registration complete. Log in with your credentials.")
        setMode("login")
      } else {
        const data = await loginUser({ username: email, password })
        window.localStorage.setItem("tipp_token", data.access_token)
        setMessage("Login successful. You can now submit missions.")
      }
    } catch (err) {
      setError((err as Error).message)
    }
  }

  return (
    <div className="mx-auto max-w-3xl rounded-[2rem] border border-white/10 bg-white/5 p-8 shadow-[0_40px_120px_rgba(0,0,0,0.22)]">
      <div className="mb-8 flex items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-semibold text-white">{mode === "login" ? "Contributor login" : "Create account"}</h1>
          <p className="mt-2 text-slate-400">Secure access for mission builders, researchers, and collaborators.</p>
        </div>
        <button type="button" onClick={() => setMode(mode === "login" ? "register" : "login")} className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-200 transition hover:bg-white/10">
          {mode === "login" ? "Switch to register" : "Switch to login"}
        </button>
      </div>
      <form onSubmit={handleSubmit} className="space-y-6">
        {mode === "register" ? (
          <label className="space-y-2 text-sm text-slate-300">
            <span>Name</span>
            <input value={name} onChange={(event) => setName(event.target.value)} required className="w-full rounded-3xl border border-white/10 bg-slate-950/70 px-4 py-3 text-white outline-none focus:border-cyan-300" />
          </label>
        ) : null}
        <label className="space-y-2 text-sm text-slate-300">
          <span>Email</span>
          <input type="email" value={email} onChange={(event) => setEmail(event.target.value)} required className="w-full rounded-3xl border border-white/10 bg-slate-950/70 px-4 py-3 text-white outline-none focus:border-cyan-300" />
        </label>
        <label className="space-y-2 text-sm text-slate-300">
          <span>Password</span>
          <input type="password" value={password} onChange={(event) => setPassword(event.target.value)} required className="w-full rounded-3xl border border-white/10 bg-slate-950/70 px-4 py-3 text-white outline-none focus:border-cyan-300" />
        </label>
        {mode === "register" ? (
          <label className="space-y-2 text-sm text-slate-300">
            <span>Role</span>
            <select value={role} onChange={(event) => setRole(event.target.value)} className="w-full rounded-3xl border border-white/10 bg-slate-950/70 px-4 py-3 text-white outline-none focus:border-cyan-300">
              <option value="contributor">Contributor</option>
              <option value="researcher">Researcher</option>
              <option value="student">Student</option>
              <option value="startup_founder">Startup Founder</option>
              <option value="ngo">NGO</option>
              <option value="government">Government</option>
              <option value="enterprise">Enterprise</option>
            </select>
          </label>
        ) : null}
        {error ? <div className="rounded-3xl border border-rose-400/20 bg-rose-500/10 p-4 text-sm text-rose-100">{error}</div> : null}
        {message ? <div className="rounded-3xl border border-emerald-400/20 bg-emerald-500/10 p-4 text-sm text-emerald-100">{message}</div> : null}
        <button type="submit" className="rounded-full bg-cyan-400 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300">
          {mode === "login" ? "Login" : "Register"}
        </button>
      </form>
    </div>
  )
}
