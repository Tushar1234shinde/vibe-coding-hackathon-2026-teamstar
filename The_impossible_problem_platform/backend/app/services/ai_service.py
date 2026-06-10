import json
import os
from typing import List

import openai
from openai.error import OpenAIError

from backend.app.core.config import settings
from backend.app.models.problem import Problem
from backend.app.schemas.problem import (
    KnowledgeGraphEdge,
    KnowledgeGraphNode,
    KnowledgeGraphRead,
    ProblemDecompositionRead,
    RoadmapPhase,
    RoadmapRead,
    ResearchAssistantRead,
    SolutionOption,
    SolutionGeneratorRead,
    SolutionImpactScore,
)


def _openai_client() -> bool:
    return bool(settings.OPENAI_API_KEY)


def _call_openai(prompt: str, system: str = "You are an AI research analyst.", temperature: float = 0.2) -> str:
    if not _openai_client():
        raise RuntimeError("OPENAI_API_KEY is not configured")
    openai.api_key = settings.OPENAI_API_KEY
    try:
        response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "system", "content": system},
                {"role": "user", "content": prompt},
            ],
            temperature=temperature,
            max_tokens=900,
        )
        return response.choices[0].message.content.strip()
    except OpenAIError as exc:
        raise RuntimeError(str(exc))


def _parse_json_response(text: str):
    if not text:
        return None
    try:
        return json.loads(text)
    except json.JSONDecodeError:
        try:
            start = text.index("{")
            end = text.rindex("}") + 1
            return json.loads(text[start:end])
        except Exception:
            return None


def generate_problem_decomposition(problem: Problem) -> ProblemDecompositionRead:
    prompt = (
        f"Analyze the global challenge titled '{problem.title}' and described as '{problem.description}'. "
        "Return JSON with root_causes, stakeholders, dependencies, and subproblems. "
        "Each subproblem should include title, category, urgency, and description."
    )
    if _openai_client():
        output = _call_openai(prompt)
        parsed = _parse_json_response(output)
        if parsed:
            return ProblemDecompositionRead(**parsed)
    return _fallback_problem_decomposition(problem)


def _fallback_problem_decomposition(problem: Problem) -> ProblemDecompositionRead:
    context = f"{problem.title} {problem.description}".lower()
    root_causes = [
        "Stakeholder coordination gaps limit data-driven intervention.",
        "Legacy infrastructure and policy systems are misaligned with emergent needs.",
        "Technical, social and funding constraints are not linked in one mission view.",
    ]
    stakeholders = [
        "Local government agencies",
        "Community operators",
        "Climate and infrastructure researchers",
        "Industry partners",
    ]
    dependencies = [
        "Data availability from civic agencies",
        "Cross-sector funding commitments",
        "Technology adoption and behavior change",
    ]
    subproblems = [
        {
            "title": "Infrastructure and mobility coordination",
            "category": "Urban planning",
            "urgency": "high",
            "description": "Create a shared systems view tying roads, transit, parking, and policy levers.",
        },
        {
            "title": "Real-time signal and routing optimization",
            "category": "Transport intelligence",
            "urgency": "medium",
            "description": "Use sensors, signals and route optimization to reduce congestion pockets.",
        },
        {
            "title": "Public transport adoption and affordability",
            "category": "Demand management",
            "urgency": "high",
            "description": "Close gaps in low-cost transit, first/last mile connectivity, and rider incentives.",
        },
    ]
    return ProblemDecompositionRead(
        problem_id=problem.id or 0,
        root_causes=root_causes,
        stakeholders=stakeholders,
        dependencies=dependencies,
        subproblems=subproblems,
    )


def generate_research_assistant(problem: Problem) -> ResearchAssistantRead:
    prompt = (
        f"For the global problem '{problem.title}', provide JSON with root_causes, existing_solutions, "
        "failed_solutions, and emerging_technologies. Keep responses concise and distinct." 
    )
    if _openai_client():
        output = _call_openai(prompt)
        parsed = _parse_json_response(output)
        if parsed:
            return ResearchAssistantRead(**parsed)
    return ResearchAssistantRead(
        problem_id=problem.id or 0,
        root_causes=[
            "Fragmented incentives across cities and operators.",
            "Limited visibility into supply chain and resource flows.",
            "Regulatory complexity slows experimentation.",
        ],
        existing_solutions=[
            "Smart junction control systems for localized congestion reduction.",
            "Community microtransit pilots that improve first/last mile access.",
            "Plastic-free procurement programs in municipal services.",
        ],
        failed_solutions=[
            "Top-down signal optimization without rider behavior incentives.",
            "One-size-fits-all recycling campaigns lacking localized infrastructure.",
            "Ad-hoc pilot programs without clear scale pathways.",
        ],
        emerging_technologies=[
            "Edge AI for traffic signal coordination.",
            "Digital twin simulation for city transportation demand.",
            "Blockchain-enabled evidence tracking for circular materials.",
        ],
    )


def generate_solution_options(problem: Problem) -> SolutionGeneratorRead:
    prompt = (
        f"For the challenge '{problem.title}', return JSON with four solutions. "
        "Each solution must include title, description, type, cost_estimate, difficulty, impact_rating, time_to_implement."
    )
    if _openai_client():
        output = _call_openai(prompt)
        parsed = _parse_json_response(output)
        if parsed:
            solutions = [SolutionOption(**item) for item in parsed.get("solutions", [])]
            return SolutionGeneratorRead(problem_id=problem.id or 0, solutions=solutions)
    return SolutionGeneratorRead(
        problem_id=problem.id or 0,
        solutions=[
            SolutionOption(
                title="Adaptive traffic signal network",
                description="Deploy an AI-managed signal network that prioritizes transit and emergency vehicles while smoothing flow.",
                solution_type="Technical",
                cost_estimate="Medium",
                difficulty="Medium",
                impact_rating=8,
                time_to_implement="6-9 months",
            ),
            SolutionOption(
                title="Policy-backed transit incentives",
                description="Introduce congestion pricing and subsidized transit passes to shift demand away from private vehicles.",
                solution_type="Policy",
                cost_estimate="Low",
                difficulty="High",
                impact_rating=7,
                time_to_implement="4-6 months",
            ),
            SolutionOption(
                title="Community ride-share network",
                description="Launch neighborhood-led shared mobility pods with local coordination and app-based matching.",
                solution_type="Community",
                cost_estimate="Low",
                difficulty="Medium",
                impact_rating=6,
                time_to_implement="3-5 months",
            ),
            SolutionOption(
                title="Mobility innovation lab",
                description="Create a cross-sector lab to prototype sensors, pricing, and public transport pilots with rapid evaluation.",
                solution_type="Business",
                cost_estimate="High",
                difficulty="High",
                impact_rating=9,
                time_to_implement="9-12 months",
            ),
        ],
    )


def generate_project_roadmap(problem: Problem) -> RoadmapRead:
    prompt = (
        f"Generate a 3-phase roadmap for the challenge '{problem.title}'. "
        "Return JSON with phases, tasks, resources, timeline, and risks." 
    )
    if _openai_client():
        output = _call_openai(prompt)
        parsed = _parse_json_response(output)
        if parsed and "phases" in parsed:
            phases = [RoadmapPhase(**phase) for phase in parsed["phases"]]
            return RoadmapRead(problem_id=problem.id or 0, phases=phases)
    return RoadmapRead(
        problem_id=problem.id or 0,
        phases=[
            RoadmapPhase(
                name="Phase 1: Diagnose and Mobilize",
                tasks=[
                    "Map root causes and stakeholders.",
                    "Collect existing research and case studies.",
                    "Assemble a cross-functional rapid response team.",
                ],
                resources=["AI research assistant", "City operations data", "Partner network"],
                timeline="0-3 months",
                risks="Incomplete data and stakeholder misalignment.",
            ),
            RoadmapPhase(
                name="Phase 2: Prototype and Validate",
                tasks=[
                    "Develop pilot solution prototypes.",
                    "Run user and operator trials.",
                    "Measure cost, impact and feasibility.",
                ],
                resources=["Pilot budget", "Technical team", "Monitoring dashboards"],
                timeline="4-8 months",
                risks="Pilot results may not generalize across regions.",
            ),
            RoadmapPhase(
                name="Phase 3: Scale and Institutionalize",
                tasks=[
                    "Refine governance and funding models.",
                    "Scale winning solutions across districts.",
                    "Embed evaluation and improvement loops.",
                ],
                resources=["Partner agreements", "Policy support", "Impact scoring tools"],
                timeline="9-15 months",
                risks="Regulatory delays and resource constraints.",
            ),
        ],
    )


def generate_knowledge_graph(problem: Problem) -> KnowledgeGraphRead:
    return KnowledgeGraphRead(
        problem_id=problem.id or 0,
        nodes=[
            KnowledgeGraphNode(id="p1", label=problem.title, node_type="Problem"),
            KnowledgeGraphNode(id="s1", label="Signal optimization", node_type="Subproblem"),
            KnowledgeGraphNode(id="s2", label="Public transit adoption", node_type="Subproblem"),
            KnowledgeGraphNode(id="sol1", label="Adaptive traffic AI", node_type="Solution"),
            KnowledgeGraphNode(id="r1", label="Smart city research", node_type="Research"),
        ],
        edges=[
            KnowledgeGraphEdge(source="p1", target="s1", relation="HAS_SUBPROBLEM"),
            KnowledgeGraphEdge(source="p1", target="s2", relation="HAS_SUBPROBLEM"),
            KnowledgeGraphEdge(source="s1", target="sol1", relation="ADDRESSED_BY"),
            KnowledgeGraphEdge(source="sol1", target="r1", relation="SUPPORTED_BY"),
        ],
    )


def score_solution_options(problem: Problem, solution_options: SolutionGeneratorRead) -> SolutionImpactScore:
    high_score = max([solution.impact_rating for solution in solution_options.solutions] or [8])
    return SolutionImpactScore(
        problem_id=problem.id or 0,
        feasibility=round(min(10, max(1, 9 - len(solution_options.solutions))), 1),
        cost_efficiency=round(max(1, 10 - (len(problem.description) // 120)), 1),
        scalability=round(min(10, 6 + (len(problem.title) // 10)), 1),
        environmental_impact=round(min(10, high_score * 1.0), 1),
    )
