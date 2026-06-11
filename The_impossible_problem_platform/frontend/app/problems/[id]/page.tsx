import ProblemDetailClient from "@/components/ProblemDetailClient"

export default function ProblemPage(props: any) {
  return <ProblemDetailClient problemId={props.params?.id} />
}
