"use client"

import { useAuth } from "@/contexts/auth-context"
import type { ReactNode } from "react"
import { useRouter, usePathname } from "next/navigation"
import { useEffect } from "react"
import { Loader2 } from "lucide-react"

export default function AuthGuard({ children }: { children: ReactNode }) {
  const { user, isLoading } = useAuth()
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    // Skip auth check for login and signup pages
    if (pathname === "/login" || pathname === "/signup") {
      return
    }

    // If auth check is complete and user is not logged in, redirect to login
    if (!isLoading && !user) {
      router.push("/login")
    }
  }, [user, isLoading, router, pathname])

  // Show loading state while checking auth
  if (isLoading && pathname !== "/login" && pathname !== "/signup") {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-900 dark:to-slate-800">
        <div className="flex flex-col items-center gap-2 text-foreground">
          <Loader2 className="h-8 w-8 animate-spin" />
          <p>Loading...</p>
        </div>
      </div>
    )
  }

  // If on login/signup page or authenticated, render children
  return <>{children}</>
}

