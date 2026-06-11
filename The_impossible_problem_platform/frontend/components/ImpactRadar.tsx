"use client"

import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from "recharts"
import { ImpactScore } from "@/lib/types"

interface ImpactRadarProps {
  score: ImpactScore
}

export default function ImpactRadar({ score }: ImpactRadarProps) {
  const data = [
    { subject: "Feasibility", value: score.feasibility, fullMark: 10 },
    { subject: "Cost", value: score.cost_efficiency, fullMark: 10 },
    { subject: "Scalability", value: score.scalability, fullMark: 10 },
    { subject: "Environment", value: score.environmental_impact, fullMark: 10 },
  ]

  return (
    <div className="h-[420px] rounded-[1.8rem] border border-white/10 bg-white/5 p-4 shadow-[0_24px_60px_rgba(0,0,0,0.18)]">
      <h3 className="mb-4 text-lg font-semibold text-white">Impact Score Radar</h3>
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart cx="50%" cy="50%" outerRadius="90%" data={data}>
          <PolarGrid stroke="#ffffff20" />
          <PolarAngleAxis dataKey="subject" tick={{ fill: "#cbd5e1" }} />
          <PolarRadiusAxis angle={30} domain={[0, 10]} tick={{ fill: "#cbd5e1" }} />
          <Radar name="Impact" dataKey="value" stroke="#22d3ee" fill="#22d3ee" fillOpacity={0.35} />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  )
}
