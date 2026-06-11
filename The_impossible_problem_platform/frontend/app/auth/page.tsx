import AuthClient from "@/components/AuthClient"

export default function AuthPage() {
  return (
    <main className="min-h-screen px-5 py-8 text-white md:px-8 lg:px-10">
      <div className="mx-auto max-w-6xl">
        <AuthClient />
      </div>
    </main>
  )
}
