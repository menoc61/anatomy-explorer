"use client"

import { createContext, useContext, useEffect, useState, type ReactNode } from "react"
import type { User, Subscription } from "@/types"
import { useRouter } from "next/navigation"

interface AuthContextType {
  user: User | null
  isLoading: boolean
  login: (email: string, password: string) => Promise<boolean>
  logout: () => void
  updateSubscription: (subscription: Subscription) => void
  updateUser: (updatedUser: User) => void
  isAdmin: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const router = useRouter()
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isAdmin, setIsAdmin] = useState(false)

  // Check for existing session on mount
  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      try {
        // Check localStorage for saved user
        const savedUser = localStorage.getItem("user")
        if (savedUser) {
          const parsedUser = JSON.parse(savedUser)
          setUser(parsedUser)
          setIsAdmin(parsedUser.role === "admin")
        }
      } catch (error) {
        console.error("Error loading user:", error)
      } finally {
        setIsLoading(false)
      }
    }, 500) // Simulate a short loading time

    return () => clearTimeout(timer)
  }, [])

  // Login function - simplified for prototype
  const login = async (email: string, password: string) => {
    setIsLoading(true)

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 800))

    try {
      // For prototype, accept any email/password with minimal validation
      if (email && password.length >= 3) {
        // Special case for admin
        const isAdminUser = email === "admin@admin.com" || email.toLowerCase().includes("admin")

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

        // Save to state and localStorage
        setUser(newUser)
        setIsAdmin(isAdminUser)
        localStorage.setItem("user", JSON.stringify(newUser))

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
    setUser(null)
    setIsAdmin(false)
    localStorage.removeItem("user")
    router.push("/login")
  }

  const updateSubscription = (subscription: Subscription) => {
    if (!user) return

    const updatedUser = {
      ...user,
      subscription,
    }

    setUser(updatedUser)
    localStorage.setItem("user", JSON.stringify(updatedUser))
  }

  const updateUser = (updatedUser: User) => {
    setUser(updatedUser)
    setIsAdmin(updatedUser.role === "admin")
    localStorage.setItem("user", JSON.stringify(updatedUser))
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        login,
        logout,
        updateSubscription,
        updateUser,
        isAdmin,
      }}
    >
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

