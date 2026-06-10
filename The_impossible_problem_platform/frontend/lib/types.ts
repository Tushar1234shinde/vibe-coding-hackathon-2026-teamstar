export interface User {
  id: number
  email: string
  full_name?: string
  role: string
  expertise_areas?: string
  bio?: string
  avatar_url?: string
  is_active: boolean
  created_at: string
}

export interface Problem {
  id: number
  title: string
  description: string
  category?: string
  geographic_scope?: string
  impact_level?: string
  existing_solutions?: string
  supporting_documents?: string
  status: string
  urgency: string
  stakeholders?: string
  success_metrics?: string
  ai_summary?: string
  owner_id?: number
  created_at: string
  updated_at: string
}

export interface ProblemSubProblem {
  title: string
  category: string
  urgency: string
  description: string
}

export interface ProblemDecomposition {
  problem_id: number
  root_causes: string[]
  stakeholders: string[]
  dependencies: string[]
  subproblems: ProblemSubProblem[]
}

export interface ResearchAssistant {
  problem_id: number
  root_causes: string[]
  existing_solutions: string[]
  failed_solutions: string[]
  emerging_technologies: string[]
}

export interface SolutionOption {
  title: string
  description: string
  solution_type: string
  cost_estimate: string
  difficulty: string
  impact_rating: number
  time_to_implement: string
}

export interface SolutionGenerator {
  problem_id: number
  solutions: SolutionOption[]
}

export interface RoadmapPhase {
  name: string
  tasks: string[]
  resources: string[]
  timeline: string
  risks: string
}

export interface Roadmap {
  problem_id: number
  phases: RoadmapPhase[]
}

export interface ImpactScore {
  problem_id: number
  feasibility: number
  cost_efficiency: number
  scalability: number
  environmental_impact: number
}

export interface KnowledgeNode {
  id: string
  label: string
  node_type: string
}

export interface KnowledgeEdge {
  source: string
  target: string
  relation: string
}

export interface KnowledgeGraph {
  problem_id: number
  nodes: KnowledgeNode[]
  edges: KnowledgeEdge[]
}

export interface Comment {
  id: number
  problem_id: number
  user_id: number
  content: string
  upvotes: number
  created_at: string
}
