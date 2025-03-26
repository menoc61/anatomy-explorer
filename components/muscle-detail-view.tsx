"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Dumbbell, X, Maximize2, Share, Heart, Bookmark } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { muscleData } from "@/lib/muscle-data"
import { DownloadButton } from "./download-button"
import { useAuth } from "@/contexts/auth-context"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"

interface MuscleDetailViewProps {
  muscleId: string
  onClose: () => void
}

export default function MuscleDetailView({ muscleId, onClose }: MuscleDetailViewProps) {
  const [activeTab, setActiveTab] = useState("overview")
  const [isSaved, setIsSaved] = useState(false)
  const [isLiked, setIsLiked] = useState(false)
  const { user } = useAuth()
  const isPremiumUser = user?.subscription?.status === "active"

  const muscle = muscleData[muscleId]

  if (!muscle) return null

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.3 }}
      className="h-full flex flex-col"
    >
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
            <Dumbbell className="h-5 w-5 text-primary" />
          </div>
          <h2 className="text-2xl font-bold">{muscle.name}</h2>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full" onClick={() => setIsLiked(!isLiked)}>
            <Heart className={`h-4 w-4 ${isLiked ? "fill-red-500 text-red-500" : ""}`} />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full" onClick={() => setIsSaved(!isSaved)}>
            <Bookmark className={`h-4 w-4 ${isSaved ? "fill-primary text-primary" : ""}`} />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full" onClick={onClose}>
            <X className="h-5 w-5" />
          </Button>
        </div>
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
                <Dialog>
                  <DialogTrigger asChild>
                    <div className="aspect-video rounded-lg overflow-hidden bg-muted mb-4 relative group cursor-pointer">
                      <img
                        src={muscle.image || "/placeholder.svg?height=300&width=500"}
                        alt={muscle.name}
                        className="w-full h-full object-cover transition-transform group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-start p-4">
                        <Button variant="secondary" size="sm" className="gap-1">
                          <Maximize2 className="h-3 w-3" />
                          <span>View Larger</span>
                        </Button>
                      </div>
                    </div>
                  </DialogTrigger>
                  <DialogContent className="max-w-3xl">
                    <img
                      src={muscle.image || "/placeholder.svg?height=600&width=800"}
                      alt={muscle.name}
                      className="w-full h-auto rounded-lg"
                    />
                  </DialogContent>
                </Dialog>

                <div className="bg-primary/5 border border-primary/10 rounded-lg p-3 mb-2">
                  <p className="italic text-sm">{muscle.shortDescription}</p>
                </div>

                <p>{muscle.description}</p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
                  <div className="bg-muted/50 p-3 rounded-lg">
                    <h4 className="font-medium text-muted-foreground mb-1">Origin</h4>
                    <p>{muscle.origin}</p>
                  </div>
                  <div className="bg-muted/50 p-3 rounded-lg">
                    <h4 className="font-medium text-muted-foreground mb-1">Insertion</h4>
                    <p>{muscle.insertion}</p>
                  </div>
                </div>

                <div className="flex justify-between items-center pt-2">
                  <Button variant="outline" size="sm" className="gap-1">
                    <Share className="h-3 w-3" />
                    Share
                  </Button>
                  <DownloadButton
                    url={`/pdfs/${muscleId}-anatomy.pdf`}
                    filename={`${muscle.name.replace(/\s+/g, "-").toLowerCase()}-anatomy.pdf`}
                    type="pdf"
                    variant="outline"
                    size="sm"
                    isPremiumFeature={true}
                    userIsPremium={isPremiumUser}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Other tabs remain the same */}
        </div>
      </Tabs>
    </motion.div>
  )
}

