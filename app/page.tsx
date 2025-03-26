import AnatomyExplorer from "@/components/anatomy-explorer"
import AuthGuard from "@/components/auth-guard"
import UserNav from "@/components/user-nav"

export default function Home() {
  return (
    <AuthGuard>
      <main className="flex min-h-screen flex-col items-center justify-between">
        <UserNav />
        <AnatomyExplorer />
      </main>
    </AuthGuard>
  )
}

