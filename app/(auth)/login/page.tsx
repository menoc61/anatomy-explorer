"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useAuth } from "@/contexts/auth-context"
import { useLanguage } from "@/contexts/language-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Loader2, Info } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Separator } from "@/components/ui/separator"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export default function LoginPage() {
  const { login, isLoading, user } = useAuth()
  const { t } = useLanguage()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const router = useRouter()

  // Redirect if already logged in
  useEffect(() => {
    if (user) {
      router.push("/")
    }
  }, [user, router])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (!email) {
      setError("Email is required")
      return
    }

    if (!password) {
      setError("Password is required")
      return
    }

    const success = await login(email, password)
    if (!success) {
      setError("Invalid credentials. Please try again.")
    } else {
      // Redirect to home on successful login
      router.push("/")
    }
  }

  const handleAdminLogin = async () => {
    setEmail("admin@admin.com")
    setPassword("admin")
    await login("admin@admin.com", "admin")
    router.push("/admin")
  }

  // If already logged in, show loading while redirecting
  if (user) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-900 dark:to-slate-800">
        <div className="flex flex-col items-center gap-2">
          <Loader2 className="h-8 w-8 animate-spin" />
          <p>Redirecting...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-900 dark:to-slate-800 p-4">
      <div className="w-full max-w-md space-y-6">
        <Card className="border-none shadow-lg">
          <CardHeader className="space-y-1 pb-4">
            <div className="flex items-center justify-center mb-2">
              <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-primary-foreground">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-dumbbell"
                >
                  <path d="m6.5 6.5 11 11"></path>
                  <path d="m21 21-1-1"></path>
                  <path d="m3 3 1 1"></path>
                  <path d="m18 22 4-4"></path>
                  <path d="m2 6 4-4"></path>
                  <path d="m3 10 7-7"></path>
                  <path d="m14 21 7-7"></path>
                </svg>
              </div>
            </div>
            <CardTitle className="text-2xl font-bold text-center">{t("auth.login")}</CardTitle>
            <CardDescription className="text-center">Enter your credentials to access your account</CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">{t("auth.email")}</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={isLoading}
                  required
                  className="h-11"
                />
              </div>
              <div className="space-y-2">
                <div className="flex items-center">
                  <Label htmlFor="password">{t("auth.password")}</Label>
                  <Link href="/forgot-password" className="ml-auto inline-block text-sm underline">
                    {t("auth.forgotPassword")}
                  </Link>
                </div>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={isLoading}
                  required
                  className="h-11"
                />
              </div>
              {error && <div className="text-sm text-red-500">{error}</div>}

              <Alert className="bg-amber-50 text-amber-800 border-amber-200">
                <Info className="h-4 w-4" />
                <AlertTitle className="text-sm font-medium">Admin Login</AlertTitle>
                <AlertDescription className="text-xs">
                  Use <strong>admin@admin.com</strong> and password <strong>admin</strong> to access admin features.
                  <Button
                    variant="outline"
                    size="sm"
                    className="mt-2 w-full border-amber-300 bg-amber-100/50 hover:bg-amber-100"
                    onClick={handleAdminLogin}
                  >
                    Login as Admin
                  </Button>
                </AlertDescription>
              </Alert>

              <div className="relative w-full">
                <div className="absolute inset-0 flex items-center">
                  <Separator className="w-full" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <Button variant="outline" className="h-11 w-full" type="button">
                  <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
                    <path
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      fill="#4285F4"
                    />
                    <path
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      fill="#34A853"
                    />
                    <path
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                      fill="#FBBC05"
                    />
                    <path
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                      fill="#EA4335"
                    />
                  </svg>
                  Google
                </Button>

                <Button variant="outline" className="h-11 w-full" type="button">
                  <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M11.9999 0.894531C5.85991 0.894531 0.894531 5.85991 0.894531 11.9999C0.894531 18.1399 5.85991 23.1053 11.9999 23.1053C18.1399 23.1053 23.1053 18.1399 23.1053 11.9999C23.1053 5.85991 18.1399 0.894531 11.9999 0.894531ZM17.4177 16.4647C17.3613 16.5493 17.2881 16.6223 17.2022 16.6789C17.1163 16.7354 17.0195 16.7742 16.9177 16.7929C16.8159 16.8116 16.7114 16.8097 16.6104 16.7874C16.5094 16.7651 16.4144 16.7228 16.3309 16.6633C13.5789 14.8863 11.7789 14.5553 10.4999 14.4993C9.22091 14.5553 7.42091 14.8863 4.66891 16.6633C4.58547 16.7228 4.49045 16.7651 4.38943 16.7874C4.28841 16.8097 4.18391 16.8116 4.08211 16.7929C3.98031 16.7742 3.88351 16.7354 3.79761 16.6789C3.71171 16.6223 3.63851 16.5493 3.58211 16.4647C3.46891 16.2913 3.43991 16.0793 3.50391 15.8833C3.56791 15.6873 3.71691 15.5273 3.90691 15.4413C6.94091 13.5073 9.01491 13.1053 10.4999 13.0493C11.9849 13.1053 14.0589 13.5073 17.0929 15.4413C17.1834 15.4842 17.2635 15.5452 17.3278 15.6203C17.3921 15.6954 17.4391 15.7829 17.4658 15.8773C17.4924 15.9718 17.4981 16.0709 17.4825 16.1679C17.4669 16.2648 17.4304 16.3572 17.3757 16.4393L17.4177 16.4647Z"
                      fill="#0077FF"
                    />
                  </svg>
                  VK
                </Button>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col space-y-4 pt-0">
              <Button type="submit" className="h-11 w-full" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Logging in...
                  </>
                ) : (
                  t("auth.login")
                )}
              </Button>

              <div className="text-center text-sm">
                {t("auth.dontHaveAccount")}{" "}
                <Link href="/signup" className="underline font-medium text-primary">
                  {t("auth.signup")}
                </Link>
              </div>
            </CardFooter>
          </form>
        </Card>

        <div className="text-center text-xs text-muted-foreground">
          <p>© 2023 Anatomy Explorer. All rights reserved.</p>
        </div>
      </div>
    </div>
  )
}

