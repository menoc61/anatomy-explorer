import type React from "react"
import { SiteHeader } from "@/components/layout/site-header"
import AuthGuard from "@/components/auth-guard"

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <AuthGuard>
      <div className="relative flex min-h-screen flex-col">
        <SiteHeader />
        <div className="flex-1">{children}</div>
      </div>
    </AuthGuard>
  )
}

