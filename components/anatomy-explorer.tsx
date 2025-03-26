"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Info, X, Maximize2, Minimize2, Dumbbell, Share } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { muscleData } from "@/lib/muscle-data"
import SketchfabViewer from "@/components/sketchfab-viewer"
import FallbackModel from "@/components/fallback-model"
import VideoSection from "@/components/video-section"
import SubscriptionBanner from "@/components/subscription-banner"
import { useLanguage } from "@/contexts/language-context"
import { DownloadButton } from "./download-button"
import { useTheme } from "next-themes"

export default function AnatomyExplorer() {
  const [selectedMuscle, setSelectedMuscle] = useState<string | null>(null)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [activeTab, setActiveTab] = useState("overview")
  const [use3DModel, setUse3DModel] = useState(true)
  const [modelError, setModelError] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const { t } = useLanguage()
  const { theme } = useTheme()

  const handleMuscleSelect = (muscleId: string) => {
    setSelectedMuscle(muscleId)
    setActiveTab("overview")
  }

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      containerRef.current?.requestFullscreen().catch((err) => {
        console.error(`Error attempting to enable fullscreen: ${err.message}`)
      })
    } else {
      document.exitFullscreen()
    }
    setIsFullscreen(!isFullscreen)
  }

  const handleModelError = () => {
    setModelError(true)
    setUse3DModel(false)
  }

  const toggleModelType = () => {
    setUse3DModel(!use3DModel)
  }

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement)
    }

    document.addEventListener("fullscreenchange", handleFullscreenChange)
    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange)
    }
  }, [])

  return (
    <div
      ref={containerRef}
      className="w-full h-screen flex flex-col md:flex-row bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-900 dark:to-slate-800 text-foreground overflow-hidden"
    >
      {/* 3D Viewer Section */}
      <div className="relative w-full h-[50vh] md:h-full md:w-2/3 flex-shrink-0">
        <div className="absolute top-4 right-4 z-10 flex gap-2">
          <Button
            variant="outline"
            size="icon"
            className="bg-background/30 backdrop-blur-sm border-border/20 hover:bg-background/50"
            onClick={toggleFullscreen}
          >
            {isFullscreen ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
          </Button>
          {modelError && (
            <Button
              variant="outline"
              className="bg-background/30 backdrop-blur-sm border-border/20 hover:bg-background/50 text-xs"
              onClick={toggleModelType}
            >
              {use3DModel ? "Use 2D Model" : "Try 3D Model"}
            </Button>
          )}
          <Button
            variant="outline"
            size="icon"
            className="bg-background/30 backdrop-blur-sm border-border/20 hover:bg-background/50"
            onClick={() => setSelectedMuscle(null)}
          >
            <Info className="h-4 w-4" />
          </Button>
        </div>

        {use3DModel ? (
          <SketchfabViewer
            modelId="31b40fd809b14665b93773936d67c52c"
            onAnnotationSelect={handleMuscleSelect}
            selectedMuscle={selectedMuscle}
            onError={handleModelError}
          />
        ) : (
          <FallbackModel onMuscleSelect={handleMuscleSelect} />
        )}
      </div>

      {/* Information Panel */}
      <div className="w-full md:w-1/3 h-[50vh] md:h-full overflow-y-auto bg-background/30 backdrop-blur-md border-l border-border/10">
        <AnimatePresence mode="wait">
          {selectedMuscle ? (
            <motion.div
              key="muscle-details"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
              className="p-6 h-full flex flex-col"
            >
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                    <Dumbbell className="h-5 w-5 text-primary" />
                  </div>
                  <h2 className="text-2xl font-bold">{muscleData[selectedMuscle]?.name || "Selected Muscle"}</h2>
                </div>
                <Button variant="ghost" size="icon" onClick={() => setSelectedMuscle(null)}>
                  <X className="h-5 w-5" />
                </Button>
              </div>

              <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col">
                <TabsList className="grid grid-cols-4 mb-4">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="function">Function</TabsTrigger>
                  <TabsTrigger value="conditions">Conditions</TabsTrigger>
                  <TabsTrigger value="videos">Videos</TabsTrigger>
                </TabsList>

                <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar">
                  <TabsContent value="overview" className="mt-0 h-full">
                    <Card className="border-none bg-card/50">
                      <CardContent className="p-4 space-y-4">
                        <div className="aspect-video rounded-lg overflow-hidden bg-muted mb-4 relative group">
                          <img
                            src={muscleData[selectedMuscle]?.image || "/placeholder.svg?height=300&width=500"}
                            alt={muscleData[selectedMuscle]?.name}
                            className="w-full h-full object-cover transition-transform group-hover:scale-105"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-start p-4">
                            <Button variant="secondary" size="sm" className="gap-1">
                              <Maximize2 className="h-3 w-3" />
                              <span>View Larger</span>
                            </Button>
                          </div>
                        </div>

                        <div className="bg-primary/5 border border-primary/10 rounded-lg p-3 mb-2">
                          <p className="italic text-sm">{muscleData[selectedMuscle]?.shortDescription}</p>
                        </div>

                        <p>{muscleData[selectedMuscle]?.description}</p>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
                          <div className="bg-muted/50 p-3 rounded-lg">
                            <h4 className="font-medium text-muted-foreground mb-1">Origin</h4>
                            <p>{muscleData[selectedMuscle]?.origin}</p>
                          </div>
                          <div className="bg-muted/50 p-3 rounded-lg">
                            <h4 className="font-medium text-muted-foreground mb-1">Insertion</h4>
                            <p>{muscleData[selectedMuscle]?.insertion}</p>
                          </div>
                        </div>

                        <div className="flex justify-between items-center pt-2">
                          <Button variant="outline" size="sm" className="gap-1">
                            <Share className="h-3 w-3" />
                            Share
                          </Button>
                          <DownloadButton
                            url={`/pdfs/${selectedMuscle}-anatomy.pdf`}
                            filename={`${muscleData[selectedMuscle]?.name.replace(/\s+/g, "-").toLowerCase()}-anatomy.pdf`}
                            type="pdf"
                            variant="outline"
                            size="sm"
                          />
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  <TabsContent value="function" className="mt-0">
                    <Card className="border-none bg-card/50">
                      <CardContent className="p-4 space-y-4">
                        <h3 className="text-lg font-medium">Primary Functions</h3>
                        <ul className="list-disc pl-5 space-y-2">
                          {muscleData[selectedMuscle]?.functions.map((func, index) => (
                            <li key={index}>{func}</li>
                          ))}
                        </ul>

                        <h3 className="text-lg font-medium mt-6">Movements</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          {muscleData[selectedMuscle]?.movements.map((movement, index) => (
                            <div key={index} className="bg-muted/50 p-3 rounded-lg">
                              <p>{movement}</p>
                            </div>
                          ))}
                        </div>

                        <div className="flex justify-end">
                          <DownloadButton
                            url={`/pdfs/${selectedMuscle}-function.pdf`}
                            filename={`${muscleData[selectedMuscle]?.name.replace(/\s+/g, "-").toLowerCase()}-function.pdf`}
                            type="pdf"
                            variant="outline"
                            size="sm"
                          />
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  <TabsContent value="conditions" className="mt-0">
                    <Card className="border-none bg-card/50">
                      <CardContent className="p-4 space-y-4">
                        <h3 className="text-lg font-medium">Common Conditions</h3>
                        <div className="space-y-4">
                          {muscleData[selectedMuscle]?.conditions.map((condition, index) => (
                            <div key={index} className="bg-muted/50 p-3 rounded-lg">
                              <h4 className="font-medium mb-1">{condition.name}</h4>
                              <p className="text-sm">{condition.description}</p>
                            </div>
                          ))}
                        </div>

                        <div className="flex justify-end">
                          <DownloadButton
                            url={`/pdfs/${selectedMuscle}-conditions.pdf`}
                            filename={`${muscleData[selectedMuscle]?.name.replace(/\s+/g, "-").toLowerCase()}-conditions.pdf`}
                            type="pdf"
                            variant="outline"
                            size="sm"
                          />
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  <TabsContent value="videos" className="mt-0">
                    <Card className="border-none bg-card/50">
                      <CardContent className="p-4">
                        <VideoSection selectedMuscle={selectedMuscle} />
                      </CardContent>
                    </Card>
                  </TabsContent>
                </div>
              </Tabs>
            </motion.div>
          ) : (
            <motion.div
              key="muscle-selection"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="p-6 h-full flex flex-col"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground">
                  <Dumbbell className="h-5 w-5" />
                </div>
                <h2 className="text-2xl font-bold">Human Muscular System</h2>
              </div>
              <p className="text-muted-foreground mb-6">
                Explore the human muscular system by selecting a muscle group from the {use3DModel ? "3D" : "2D"} model
                or from the list below. Click on any highlighted area in the model to view detailed information.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 overflow-y-auto pr-2 custom-scrollbar">
                {Object.entries(muscleData).map(([id, muscle]) => (
                  <motion.div
                    key={id}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="bg-card/50 hover:bg-card/80 rounded-lg p-4 cursor-pointer transition-colors"
                    onClick={() => handleMuscleSelect(id)}
                  >
                    <h3 className="font-medium">{muscle.name}</h3>
                    <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{muscle.shortDescription}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Subscription Banner */}
      <SubscriptionBanner />
    </div>
  )
}

