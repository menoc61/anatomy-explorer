"use client"

import type React from "react"
import { AuthProvider } from "@/contexts/auth-context"
import { ThemeProvider } from "@/components/theme-provider"
import { LanguageProvider } from "@/contexts/language-context"
import { Toaster } from "@/components/ui/toaster"
import { I18nProvider } from "@/contexts/i18n-context"
import { useEffect, useState } from "react"
import { AnalyticsProvider } from "@/components/analytics-provider"

export default function ClientLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const [isHydrated, setIsHydrated] = useState(false)
  const [systemTheme, setSystemTheme] = useState<string | null>(null)
  const [browserLanguage, setBrowserLanguage] = useState<string | null>(null)

  // Detect system theme and language
  useEffect(() => {
    if (typeof window !== "undefined") {
      // Detect system theme
      const isDarkMode = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches
      setSystemTheme(isDarkMode ? "dark" : "light")

      // Detect browser language
      const lang = navigator.language.split("-")[0]
      setBrowserLanguage(["en", "fr", "ru"].includes(lang) ? lang : "en")
    }

    setIsHydrated(true)
  }, [])

  // During server rendering and initial client render, don't show anything that might cause hydration mismatch
  if (!isHydrated) {
    return (
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <div className="min-h-screen bg-background"></div>
      </ThemeProvider>
    )
  }

  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <LanguageProvider defaultLanguage={browserLanguage || "en"}>
        <I18nProvider>
          <AuthProvider>
            <AnalyticsProvider>
              {children}
              <Toaster />
            </AnalyticsProvider>
          </AuthProvider>
        </I18nProvider>
      </LanguageProvider>
    </ThemeProvider>
  )
}

