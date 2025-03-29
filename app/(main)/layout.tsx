import type React from "react"
import { SiteHeader } from "@/components/layout/site-header"
import AuthGuard from "@/components/auth-guard"
import UserWidget from "@/components/user-widget"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { HelpCircle } from "lucide-react"

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
        <UserWidget />

        {/* Fixed Help Button - visible on desktop only (mobile in UserWidget) */}
        <div className="fixed bottom-4 left-4 z-50 hidden md:block">
          <Button asChild variant="secondary" className="shadow-md">
            <Link href="/(main)/help">
              <HelpCircle className="h-4 w-4 mr-2" />
              Help Center
            </Link>
          </Button>
        </div>
      </div>
    </AuthGuard>
  )
}
