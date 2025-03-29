"use client"

import { memo } from "react"
import dynamic from "next/dynamic"
import { type SketchfabViewerProps } from "@/components/sketchfab-viewer"

const SketchfabViewer = dynamic(() => import("@/components/sketchfab-viewer"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center bg-gradient-to-b from-slate-900 to-slate-800">
      <div className="flex flex-col items-center">
        <div className="w-12 h-12 rounded-full border-4 border-primary border-t-transparent animate-spin mb-4"></div>
        <p className="text-foreground">Loading 3D Model...</p>
      </div>
    </div>
  ),
})

const SketchfabViewerWrapper = memo(function SketchfabViewerWrapper({
  modelId,
  onAnnotationSelect,
  selectedMuscle,
  onError,
  onLoad,
}: SketchfabViewerProps) {
  return (
    <SketchfabViewer
      modelId={modelId}
      onAnnotationSelect={onAnnotationSelect}
      selectedMuscle={selectedMuscle}
      onError={onError}
      onLoad={onLoad}
    />
  )
});

export default SketchfabViewerWrapper
