import AnatomyExplorer from "@/components/anatomy-explorer"
import CommunityComments from "@/components/community-comments"

export default function HomePage() {
  return (
    <main className="flex min-h-[calc(100vh-4rem)] flex-col">
      <AnatomyExplorer />
      <div className="container max-w-4xl py-10">
        <CommunityComments />
      </div>
    </main>
  )
}

