"use client"

import { useAuth } from "@/contexts/auth-context"
import { Button } from "@/components/ui/button"
import { LogOut, User } from "lucide-react"

export default function UserNav() {
  const { user, logout } = useAuth()

  if (!user) return null

  return (
    <div className="absolute top-4 left-4 z-10 flex items-center gap-2">
      <div className="flex items-center gap-2 rounded-full bg-black/30 backdrop-blur-sm px-3 py-1.5 text-white">
        <User className="h-4 w-4" />
        <span className="text-sm font-medium">{user.name}</span>
      </div>
      <Button
        variant="outline"
        size="icon"
        className="bg-black/30 backdrop-blur-sm border-white/20 hover:bg-black/50"
        onClick={logout}
        title="Logout"
      >
        <LogOut className="h-4 w-4" />
      </Button>
    </div>
  )
}

