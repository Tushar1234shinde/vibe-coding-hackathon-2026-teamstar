"use client"

import React, { useMemo } from "react"
import ReactFlow, { Background, Controls, Edge, Node } from "reactflow"
import "reactflow/dist/style.css"
import { KnowledgeGraph } from "@/lib/types"

interface KnowledgeGraphProps {
  graph: KnowledgeGraph
}

export default function KnowledgeGraphView({ graph }: KnowledgeGraphProps) {
  const nodes: Node[] = useMemo(() => {
    return graph.nodes.map((node, index) => ({
      id: node.id,
      position: { x: 40 + (index % 3) * 240, y: 40 + Math.floor(index / 3) * 180 },
      data: { label: `${node.label} (${node.node_type})` },
      style: {
        background: node.node_type === "Problem" ? "rgba(79, 70, 229, 0.18)" : "rgba(14, 165, 233, 0.14)",
        color: "#eef2ff",
        border: "1px solid rgba(79,70,229,0.35)",
        width: 220,
      },
    }))
  }, [graph.nodes])

  const edges: Edge[] = useMemo(() => {
    return graph.edges.map((edge, index) => ({
      id: `edge-${index}`,
      source: edge.source,
      target: edge.target,
      animated: true,
      label: edge.relation,
      style: { stroke: "rgba(79,70,229,0.55)" },
      labelBgStyle: { fill: "rgba(15, 23, 42, 0.9)", color: "#fff", fillOpacity: 0.8 },
    }))
  }, [graph.edges])

  return (
    <div className="h-[520px] rounded-[1.8rem] border border-white/10 bg-white/5 p-4 shadow-[0_24px_60px_rgba(0,0,0,0.18)]">
      <ReactFlow nodes={nodes} edges={edges} fitView attributionPosition="bottom-left">
        <Background gap={24} color="#0f172a" />
        <Controls showInteractive={false} />
      </ReactFlow>
    </div>
  )
}
