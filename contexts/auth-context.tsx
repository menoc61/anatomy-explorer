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
    try {
      const storedUser = localStorage.getItem("user")

      if (storedUser) {
        const parsedUser: User = JSON.parse(storedUser)

        // Ensure parsedUser is a valid object with expected properties
        if (parsedUser && typeof parsedUser === "object" && "email" in parsedUser) {
          setUser(parsedUser)
        } else {
          throw new Error("Invalid user data")
        }
      }
    } catch (error) {
      console.error("Error parsing user data from localStorage:", error)
      localStorage.removeItem("user") // Clear corrupted data
      setUser(null)
    } finally {
      setIsLoading(false)
    }
  }, [])

  // Login function
  const login = async (email: string, password: string) => {
    setIsLoading(true)

    try {
      if (email && password.length >= 6) {
        await new Promise((resolve) => setTimeout(resolve, 1000)) // Simulate API delay

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

        localStorage.setItem("user", JSON.stringify(newUser))
        setUser(newUser)

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

    const updatedUser = { ...user, subscription }

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
