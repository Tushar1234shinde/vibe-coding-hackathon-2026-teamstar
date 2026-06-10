import ProblemDetailClient from "@/components/ProblemDetailClient"

interface ProblemPageProps {
  params: { id: string }
}

export default function ProblemPage({ params }: ProblemPageProps) {
  return <ProblemDetailClient problemId={params.id} />
}
