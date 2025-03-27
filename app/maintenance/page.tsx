"use client"

import { Button } from "@/components/ui/button"

export default function MaintenancePage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 text-center">
      <h1 className="text-4xl font-bold mb-4">We'll be back soon!</h1>
      <p className="text-lg mb-8 max-w-md mx-auto">
        We're currently performing scheduled maintenance on our servers. We'll be back online shortly. Thank you for
        your patience!
      </p>
      <p className="text-sm text-muted-foreground mb-8">Estimated completion time: {new Date().toLocaleTimeString()}</p>
      <Button onClick={() => window.location.reload()}>Check again</Button>
    </div>
  )
}

