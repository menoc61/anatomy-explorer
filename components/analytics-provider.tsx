"use client"

import type React from "react"

import { useEffect } from "react"
import { usePathname, useSearchParams } from "next/navigation"
import { useEnvironmentStore } from "@/lib/store"

// This component initializes analytics tracking based on environment configuration
export function AnalyticsProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const { getApiConfig, isApiConfigured } = useEnvironmentStore()

  // Initialize Google Analytics if configured
  useEffect(() => {
    if (!isApiConfigured("googleAnalytics")) return

    const config = getApiConfig("googleAnalytics")
    const measurementId = config.additionalConfig?.measurementId

    if (!measurementId) return

    // Add Google Analytics script
    const script = document.createElement("script")
    script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`
    script.async = true
    document.head.appendChild(script)

    // Initialize gtag
    window.dataLayer = window.dataLayer || []

    // Define gtag function properly without using a function declaration
    window.gtag = () => {
      // @ts-ignore - Arguments is a special array-like object
      window.dataLayer.push(arguments)
    }

    // Initialize gtag
    window.gtag("js", new Date())
    window.gtag("config", measurementId)

    // Cleanup function
    return () => {
      if (script.parentNode) {
        document.head.removeChild(script)
      }
    }
  }, [isApiConfigured, getApiConfig])

  // Track page views
  useEffect(() => {
    if (!isApiConfigured("googleAnalytics") || typeof window.gtag !== "function") return

    const url = pathname + (searchParams.toString() ? `?${searchParams.toString()}` : "")

    window.gtag("event", "page_view", {
      page_path: url,
    })
  }, [pathname, searchParams, isApiConfigured])

  return <>{children}</>
}

// Add this to global.d.ts or a similar file
declare global {
  interface Window {
    dataLayer: any[]
    gtag: (...args: any[]) => void
  }
}

