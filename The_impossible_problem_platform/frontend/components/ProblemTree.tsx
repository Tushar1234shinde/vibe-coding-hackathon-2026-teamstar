"use client"

import React, { useMemo } from "react"
import ReactFlow, { Background, Controls, Edge, Node } from "reactflow"
import "reactflow/dist/style.css"
import { ProblemDecomposition } from "@/lib/types"

interface ProblemTreeProps {
  decomposition: ProblemDecomposition
}

export default function ProblemTree({ decomposition }: ProblemTreeProps) {
  const nodes: Node[] = useMemo(() => {
    const root: Node = {
      id: "root",
      type: "default",
      data: { label: "Problem statement" },
      position: { x: 250, y: 20 },
      style: { background: "rgba(13, 110, 253, 0.16)", color: "#f8fafc", border: "1px solid rgba(121,247,212,0.4)", width: 260 },
    }

    const causeNodes = decomposition.root_causes.map((cause, index) => ({
      id: `cause-${index}`,
      data: { label: cause },
      position: { x: 40 + index * 220, y: 130 },
      style: { background: "rgba(121,247,212,0.1)", color: "#d9f99d", border: "1px solid rgba(121,247,212,0.35)", width: 220 },
    }))

    const subproblemNodes = decomposition.subproblems.map((subproblem, index) => ({
      id: `sub-${index}`,
      data: { label: `${subproblem.title}\n${subproblem.category}` },
      position: { x: 80 + index * 260, y: 300 },
      style: { background: "rgba(79, 70, 229, 0.12)", color: "#e0e7ff", border: "1px solid rgba(79,70,229,0.35)", width: 240 },
    }))

    return [root, ...causeNodes, ...subproblemNodes]
  }, [decomposition])

  const edges: Edge[] = useMemo(() => {
    const rootEdges = decomposition.root_causes.map((_, index) => ({
      id: `edge-root-cause-${index}`,
      source: "root",
      target: `cause-${index}`,
      animated: true,
      style: { stroke: "rgba(121,247,212,0.5)" },
    }))

    const subproblemEdges = decomposition.subproblems.map((_, index) => ({
      id: `edge-root-sub-${index}`,
      source: "root",
      target: `sub-${index}`,
      animated: true,
      style: { stroke: "rgba(79,70,229,0.5)" },
    }))

    return [...rootEdges, ...subproblemEdges]
  }, [decomposition])

  return (
    <div className="h-[520px] rounded-[1.8rem] border border-white/10 bg-white/5 p-4 shadow-[0_24px_60px_rgba(0,0,0,0.18)]">
      <ReactFlow nodes={nodes} edges={edges} fitView attributionPosition="bottom-left">
        <Background gap={24} color="#0f172a" />
        <Controls showInteractive={false} />
      </ReactFlow>
    </div>
  )
}
