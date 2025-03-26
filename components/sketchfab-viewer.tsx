"use client"

import { useEffect, useRef, useState } from "react"
import { Loader2, AlertTriangle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/contexts/language-context"
import { useEnvironmentStore } from "@/lib/store"

interface SketchfabViewerProps {
  modelId?: string
  onAnnotationSelect?: (annotationId: string) => void
  selectedMuscle?: string | null
  onError?: () => void
}

export default function SketchfabViewer({
  modelId,
  onAnnotationSelect,
  selectedMuscle,
  onError,
}: SketchfabViewerProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [api, setApi] = useState<any>(null)
  const apiRef = useRef<any>(null)
  const { t } = useLanguage()
  const iframeRef = useRef<HTMLIFrameElement | null>(null) // Move iframeRef to the top level
  const { getApiConfig } = useEnvironmentStore()
  const sketchfabConfig = getApiConfig("sketchfab")

  // Mapping between muscle IDs and annotation indices
  const muscleToAnnotationMap: Record<string, number> = {
    biceps: 0,
    triceps: 1,
    deltoids: 2,
    pectoralis: 3,
    quadriceps: 4,
    hamstrings: 5,
    gastrocnemius: 6,
    trapezius: 7,
    latissimus: 8,
    abdominals: 9,
  }

  // Mapping from annotation indices to muscle IDs
  const annotationToMuscleMap: Record<number, string> = {
    0: "biceps",
    1: "triceps",
    2: "deltoids",
    3: "pectoralis",
    4: "quadriceps",
    5: "hamstrings",
    6: "gastrocnemius",
    7: "trapezius",
    8: "latissimus",
    9: "abdominals",
  }

  // Prevent iframe reload on interactions

  // Update the useEffect to maintain iframe reference and prevent reloads
  useEffect(() => {
    let isComponentMounted = true
    let iframe: HTMLIFrameElement | null = null
    let retryCount = 0
    const maxRetries = 3

    // Create and initialize the iframe only if it doesn't exist
    const initializeViewer = () => {
      if (!containerRef.current) return

      // If we already have an iframe, don't recreate it
      if (iframeRef.current && containerRef.current.contains(iframeRef.current)) {
        return
      }

      // Clear any existing content
      containerRef.current.innerHTML = ""

      // Create iframe
      iframe = document.createElement("iframe")
      iframeRef.current = iframe

      iframe.title = "Sketchfab Viewer"
      iframe.className = "w-full h-full border-0"
      iframe.allow = "autoplay; fullscreen; xr-spatial-tracking"
      iframe.setAttribute("xr-spatial-tracking", "true")
      iframe.setAttribute("execution-while-out-of-viewport", "true")
      iframe.setAttribute("execution-while-not-rendered", "true")
      iframe.setAttribute("web-share", "true")
      iframe.allowFullscreen = true

      // Use the provided modelId or fall back to the one in the environment config
      const effectiveModelId =
        modelId || sketchfabConfig.additionalConfig?.modelId || "31b40fd809b14665b93773936d67c52c"

      // Set the source to the Sketchfab embed URL
      iframe.src = `https://sketchfab.com/models/${effectiveModelId}/embed?autospin=0&autostart=1&ui_infos=0&ui_controls=0&ui_stop=0&transparent=1`

      // Add event listeners
      iframe.addEventListener("load", () => {
        if (isComponentMounted) {
          setIsLoading(false)
        }
      })

      iframe.addEventListener("error", (e) => {
        console.error("Iframe loading error:", e)
        if (isComponentMounted) {
          if (retryCount < maxRetries) {
            retryCount++
            console.log(`Retry attempt ${retryCount}...`)
            setTimeout(initializeViewer, 1000) // Retry after 1 second
          } else {
            setError("Failed to load 3D model. Please try refreshing the page.")
            setIsLoading(false)
            if (onError) onError()
          }
        }
      })

      // Append iframe to container
      containerRef.current.appendChild(iframe)
    }

    // Initialize the viewer
    initializeViewer()

    // Cleanup function
    return () => {
      isComponentMounted = false
      // We don't remove the iframe on cleanup to prevent reloads
    }
  }, [modelId, onError, sketchfabConfig.additionalConfig?.modelId])

  // Handle muscle selection
  useEffect(() => {
    if (!selectedMuscle || !api) return

    try {
      // If we had API access, we would use it to highlight the selected muscle
      console.log(`Selected muscle: ${selectedMuscle}`)
    } catch (err) {
      console.error("Error highlighting muscle:", err)
    }
  }, [selectedMuscle, api])

  const handleRetry = () => {
    setIsLoading(true)
    setError(null)
    // Force re-mount of the component
    const container = containerRef.current
    if (container) {
      container.innerHTML = ""
      setTimeout(() => {
        // Re-initialize after a short delay
        const iframe = document.createElement("iframe")
        iframe.title = "Sketchfab Viewer"
        iframe.className = "w-full h-full border-0"
        iframe.src = `https://sketchfab.com/models/${modelId}/embed?autospin=0&autostart=1&ui_infos=0&ui_controls=0&ui_stop=0&transparent=1`
        iframe.allow = "autoplay; fullscreen; xr-spatial-tracking"
        iframe.allowFullscreen = true
        container.appendChild(iframe)

        iframe.addEventListener("load", () => {
          setIsLoading(false)
        })

        iframe.addEventListener("error", () => {
          setError("Failed to load 3D model. Please try refreshing the page.")
          setIsLoading(false)
          if (onError) onError()
        })
      }, 500)
    }
  }

  return (
    <div className="relative w-full h-full bg-slate-900">
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-slate-900/80 z-10">
          <div className="flex flex-col items-center">
            <Loader2 className="h-8 w-8 animate-spin text-primary mb-2" />
            <p className="text-white/70">Loading 3D Model...</p>
          </div>
        </div>
      )}

      {error && (
        <div className="absolute inset-0 flex items-center justify-center bg-slate-900/90 z-10">
          <div className="flex flex-col items-center text-center max-w-md p-6">
            <AlertTriangle className="h-12 w-12 text-amber-500 mb-4" />
            <h3 className="text-xl font-bold mb-2">Failed to Load 3D Model</h3>
            <p className="text-white/70 mb-6">{error}</p>
            <div className="flex gap-4">
              <Button onClick={handleRetry}>Try Again</Button>
              <Button variant="outline" onClick={() => window.location.reload()}>
                Refresh Page
              </Button>
            </div>
          </div>
        </div>
      )}

      <div
        ref={containerRef}
        className="w-full h-full"
        onClick={(e) => {
          // Handle click events on the model
          // This is a simplified approach since we don't have direct API access
          // In a real implementation, you would use the Sketchfab API to handle annotations
          const muscleId = Object.keys(muscleData)[Math.floor(Math.random() * Object.keys(muscleData).length)]
          onAnnotationSelect?.(muscleId)
        }}
      />
    </div>
  )
}

// Simplified muscle data for the click handler
const muscleData = {
  biceps: {},
  triceps: {},
  deltoids: {},
  pectoralis: {},
  quadriceps: {},
  hamstrings: {},
  gastrocnemius: {},
  trapezius: {},
  latissimus: {},
  abdominals: {},
}

declare global {
  interface Window {
    Sketchfab: any
  }
}

