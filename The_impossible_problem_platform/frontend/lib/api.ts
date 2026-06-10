const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"

function getAuthHeaders() {
  if (typeof window === "undefined") return {}
  const token = window.localStorage.getItem("tipp_token")
  return token ? { Authorization: `Bearer ${token}` } : {}
}

async function request(path: string, options: RequestInit = {}) {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(options.headers || {}),
    ...getAuthHeaders(),
  }

  const response = await fetch(`${API_URL}${path}`, {
    ...options,
    headers,
  })

  if (!response.ok) {
    const message = await response.text()
    throw new Error(message || response.statusText)
  }

  return response.json()
}

export async function registerUser(payload: { email: string; password: string; full_name: string; role: string }) {
  return request("/api/v1/auth/register", {
    method: "POST",
    body: JSON.stringify(payload),
  })
}

export async function loginUser(payload: { username: string; password: string }) {
  return request("/api/v1/auth/token", {
    method: "POST",
    body: new URLSearchParams(payload),
  })
}

export async function fetchProblems() {
  return request("/api/v1/problems")
}

export async function fetchProblem(problemId: string) {
  return request(`/api/v1/problems/${problemId}`)
}

export async function submitProblem(payload: any) {
  return request("/api/v1/problems", {
    method: "POST",
    body: JSON.stringify(payload),
  })
}

export async function fetchDecomposition(problemId: string) {
  return request(`/api/v1/problems/${problemId}/decompose`)
}

export async function fetchResearch(problemId: string) {
  return request(`/api/v1/problems/${problemId}/research`)
}

export async function fetchSolutions(problemId: string) {
  return request(`/api/v1/problems/${problemId}/solutions`)
}

export async function fetchRoadmap(problemId: string) {
  return request(`/api/v1/problems/${problemId}/roadmap`)
}

export async function fetchImpact(problemId: string) {
  return request(`/api/v1/problems/${problemId}/impact`)
}

export async function fetchKnowledgeGraph(problemId: string) {
  return request(`/api/v1/problems/${problemId}/knowledge-graph`)
}

export async function fetchComments(problemId: string) {
  return request(`/api/v1/problems/${problemId}/comments`)
}

export async function postComment(problemId: string, content: string) {
  return request(`/api/v1/problems/${problemId}/comments`, {
    method: "POST",
    body: JSON.stringify({ content }),
  })
}
