"use client"

import { useAuth } from "@/contexts/auth-context"
import type { ReactNode } from "react"
import LoginForm from "./login-form"
import { Loader2 } from "lucide-react"

export default function AuthGuard({ children }: { children: ReactNode }) {
  const { user, isLoading } = useAuth()

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-900 to-slate-800">
        <div className="flex flex-col items-center gap-2 text-white">
          <Loader2 className="h-8 w-8 animate-spin" />
          <p>Loading...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-900 to-slate-800">
        <LoginForm />
      </div>
    )
  }

  return <>{children}</>
}

