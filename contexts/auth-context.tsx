"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import type { User, Subscription } from "@/types"
import { useRouter } from "next/navigation"

interface AuthContextType {
  user: User | null
  isLoading: boolean
  login: (email: string, password: string) => Promise<boolean>
  logout: () => void
  updateSubscription: (subscription: Subscription) => void
  isAdmin: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()
  const isAdmin = user?.role === "admin"

  // Check for existing session on mount
  useEffect(() => {
    const storedUser = localStorage.getItem("user")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
    setIsLoading(false)
  }, [])

  // Login function
  const login = async (email: string, password: string) => {
    setIsLoading(true)

    try {
      // In a real app, you would validate credentials against a backend
      // This is just a simple demo implementation
      if (email && password.length >= 6) {
        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 1000))

        // Create a mock user with subscription data
        // For demo purposes, if email contains "admin", make them an admin
        const isAdminUser = email.toLowerCase().includes("admin")

        const newUser: User = {
          id: `user-${Date.now()}`,
          name: email.split("@")[0],
          email,
          role: isAdminUser ? "admin" : "user",
          subscription: {
            id: `sub-${Date.now()}`,
            status: "trial",
            plan: "basic",
            startDate: new Date().toISOString(),
            expiresAt: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString(), // 14 days from now
            autoRenew: false,
          },
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        }

        // Store user in localStorage (not secure, just for demo)
        localStorage.setItem("user", JSON.stringify(newUser))
        setUser(newUser)

        // Redirect admin users to admin dashboard
        if (isAdminUser) {
          router.push("/admin")
        }

        return true
      }
      return false
    } catch (error) {
      console.error("Login error:", error)
      return false
    } finally {
      setIsLoading(false)
    }
  }

  const logout = () => {
    localStorage.removeItem("user")
    setUser(null)
    router.push("/login")
  }

  const updateSubscription = (subscription: Subscription) => {
    if (!user) return

    const updatedUser = {
      ...user,
      subscription,
    }

    localStorage.setItem("user", JSON.stringify(updatedUser))
    setUser(updatedUser)
  }

  return (
    <AuthContext.Provider value={{ user, isLoading, login, logout, updateSubscription, isAdmin }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

