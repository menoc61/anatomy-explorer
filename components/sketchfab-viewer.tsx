"use client"

import { useEffect, useRef, useState } from "react"
import { useTheme } from "next-themes"

interface SketchfabViewerProps {
  modelId: string
  onAnnotationSelect?: (annotationId: string) => void
  selectedMuscle?: string | null
  onError?: () => void
  onLoad?: () => void
}

export default function SketchfabViewer({
  modelId,
  onAnnotationSelect,
  selectedMuscle,
  onError,
  onLoad,
}: SketchfabViewerProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null)
  const apiRef = useRef<any>(null)
  const [isInitialized, setIsInitialized] = useState(false)
  const { theme } = useTheme()

  useEffect(() => {
    // Load the Sketchfab API script
    const script = document.createElement("script")
    script.src = "https://static.sketchfab.com/api/sketchfab-viewer-1.12.1.js"
    script.async = true
    document.body.appendChild(script)

    script.onload = initializeViewer
    script.onerror = () => {
      console.error("Failed to load Sketchfab API")
      onError?.()
    }

    return () => {
      document.body.removeChild(script)
      // Clean up any Sketchfab API instances
      if (apiRef.current) {
        apiRef.current.dispose()
      }
    }
  }, [onError])

  const initializeViewer = () => {
    if (!iframeRef.current) return

    // @ts-ignore - Sketchfab is loaded from the script
    const client = new window.Sketchfab(1.12, iframeRef.current)

    client.init(modelId, {
      success: (api: any) => {
        apiRef.current = api
        api.start()
        api.addEventListener("viewerready", () => {
          console.log("Viewer ready")
          setIsInitialized(true)
          onLoad?.()

          // Set lower quality for better performance
          api.setQuality("low")

          // Set background color based on theme
          const bgColor = theme === "dark" ? [0.05, 0.05, 0.1, 1] : [0.9, 0.9, 0.95, 1]
          api.setBackground(...bgColor)

          // Set up annotation click handler
          api.addEventListener("annotationSelect", (index: number) => {
            api.getAnnotation(index, (err: any, annotation: any) => {
              if (!err) {
                const annotationId = annotation.name.toLowerCase().replace(/\s+/g, "-")
                onAnnotationSelect?.(annotationId)
              }
            })
          })
        })

        // Handle errors
        api.addEventListener("error", () => {
          console.error("Sketchfab API error")
          onError?.()
        })
      },
      error: () => {
        console.error("Sketchfab API init error")
        onError?.()
      },
      autostart: 1,
      preload: 1,
      ui_infos: 0,
      ui_controls: 0,
      ui_stop: 0,
      transparent: 1,
    })
  }

  useEffect(() => {
    if (!isInitialized || !apiRef.current || !selectedMuscle) return

    // Focus on the selected muscle annotation
    apiRef.current.getAnnotationList((err: any, annotations: any[]) => {
      if (err) return

      const annotationIndex = annotations.findIndex(
        (annotation) => annotation.name.toLowerCase().replace(/\s+/g, "-") === selectedMuscle,
      )

      if (annotationIndex !== -1) {
        apiRef.current.gotoAnnotation(annotationIndex)
      }
    })
  }, [selectedMuscle, isInitialized])

  useEffect(() => {
    if (!isInitialized || !apiRef.current) return

    // Update background color when theme changes
    const bgColor = theme === "dark" ? [0.05, 0.05, 0.1, 1] : [0.9, 0.9, 0.95, 1]
    apiRef.current.setBackground(...bgColor)
  }, [theme, isInitialized])

  return (
    <iframe
      ref={iframeRef}
      title="Sketchfab Viewer"
      className="w-full h-full border-0"
      allow="autoplay; fullscreen; xr-spatial-tracking"
      loading="eager"
    />
  )
}

