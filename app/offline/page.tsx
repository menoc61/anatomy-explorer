"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function OfflinePage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 text-center">
      <h1 className="text-4xl font-bold mb-4">You're offline</h1>
      <p className="text-lg mb-8">
        It looks like you've lost your internet connection. Some features may be unavailable until you're back online.
      </p>
      <div className="space-y-4">
        <Button asChild>
          <Link href="/">Try going home</Link>
        </Button>
        <div>
          <Button variant="outline" onClick={() => window.location.reload()}>
            Retry connection
          </Button>
        </div>
      </div>
    </div>
  )
}

