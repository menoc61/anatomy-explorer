"use client"

import { useState } from "react"
import VideoPlayer from "./video-player"
import { muscleData } from "@/lib/muscle-data"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"
import { useLanguage } from "@/contexts/language-context"
import { DownloadButton } from "./download-button"
import VideoRating from "./video-rating"
import VideoComments from "./video-comments"

interface VideoSectionProps {
  selectedMuscle: string | null
}

export default function VideoSection({ selectedMuscle }: VideoSectionProps) {
  const { user } = useAuth()
  const { t } = useLanguage()
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0)

  // If no muscle is selected, show a default message
  if (!selectedMuscle) {
    return (
      <div className="flex flex-col items-center justify-center h-full p-6 text-center">
        <h3 className="text-xl font-medium mb-2">Educational Videos</h3>
        <p className="text-white/70">
          Select a muscle group to view educational videos explaining its structure and function.
        </p>
      </div>
    )
  }

  const muscle = muscleData[selectedMuscle]

  // Mock video data for the selected muscle
  const videos = [
    {
      id: `${selectedMuscle}-anatomy`,
      title: `${muscle.name} - Anatomy Overview`,
      src: "/placeholder.mp4", // Replace with actual video URLs
      thumbnail: "/placeholder.svg?height=300&width=500",
      isPremium: false,
      pdfResource: `/pdfs/${selectedMuscle}-anatomy.pdf`, // Mock PDF path
    },
    {
      id: `${selectedMuscle}-function`,
      title: `${muscle.name} - Function & Movement`,
      src: "/placeholder.mp4",
      thumbnail: "/placeholder.svg?height=300&width=500",
      isPremium: true,
      pdfResource: `/pdfs/${selectedMuscle}-function.pdf`,
    },
    {
      id: `${selectedMuscle}-exercises`,
      title: `${muscle.name} - Exercises & Training`,
      src: "/placeholder.mp4",
      thumbnail: "/placeholder.svg?height=300&width=500",
      isPremium: true,
      pdfResource: `/pdfs/${selectedMuscle}-exercises.pdf`,
    },
  ]

  const currentVideo = videos[currentVideoIndex]
  const isPremiumUser = user?.subscription?.status === "active"

  const nextVideo = () => {
    setCurrentVideoIndex((prev) => (prev + 1) % videos.length)
  }

  const prevVideo = () => {
    setCurrentVideoIndex((prev) => (prev - 1 + videos.length) % videos.length)
  }

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-medium">Educational Videos: {muscle.name}</h3>

      <div className="relative">
        {currentVideo.isPremium && !isPremiumUser ? (
          <div className="aspect-video bg-black rounded-lg flex flex-col items-center justify-center p-6 text-center">
            <div className="bg-primary/20 text-primary px-3 py-1 rounded-full text-sm font-medium mb-4">
              Premium Content
            </div>
            <h4 className="text-lg font-medium mb-2">{currentVideo.title}</h4>
            <p className="text-white/70 mb-4">This video is available exclusively to premium subscribers.</p>
            <Button>Upgrade to Premium</Button>
          </div>
        ) : (
          <VideoPlayer
            src={currentVideo.src}
            title={currentVideo.title}
            poster={currentVideo.thumbnail}
            className="aspect-video"
            allowDownload={isPremiumUser}
          />
        )}

        {videos.length > 1 && (
          <>
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-1/2 left-2 transform -translate-y-1/2 h-8 w-8 rounded-full bg-black/50 text-white hover:bg-black/70"
              onClick={prevVideo}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-1/2 right-2 transform -translate-y-1/2 h-8 w-8 rounded-full bg-black/50 text-white hover:bg-black/70"
              onClick={nextVideo}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </>
        )}
      </div>

      <div className="flex flex-wrap gap-4 items-center justify-between">
        <div className="flex gap-2 overflow-x-auto pb-2 custom-scrollbar">
          {videos.map((video, index) => (
            <div
              key={video.id}
              className={`flex-shrink-0 cursor-pointer rounded-md overflow-hidden border-2 ${
                index === currentVideoIndex ? "border-primary" : "border-transparent"
              }`}
              onClick={() => setCurrentVideoIndex(index)}
            >
              <div className="relative w-32 h-20">
                <img
                  src={video.thumbnail || "/placeholder.svg"}
                  alt={video.title}
                  className="w-full h-full object-cover"
                />
                {video.isPremium && !isPremiumUser && (
                  <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                    <span className="text-xs font-medium text-white">Premium</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {(!currentVideo.isPremium || isPremiumUser) && (
          <div className="flex gap-2">
            <DownloadButton
              url={currentVideo.src}
              filename={`${currentVideo.title.replace(/\s+/g, "-").toLowerCase()}.mp4`}
              type="video"
              variant="outline"
              size="sm"
              isPremiumFeature={true}
              userIsPremium={isPremiumUser}
            />
            <DownloadButton
              url={currentVideo.pdfResource}
              filename={`${currentVideo.title.replace(/\s+/g, "-").toLowerCase()}.pdf`}
              type="pdf"
              variant="outline"
              size="sm"
              isPremiumFeature={true}
              userIsPremium={isPremiumUser}
            />
          </div>
        )}
      </div>

      {/* Video Rating Component */}
      <div className="mt-4 border-t pt-4">
        <VideoRating videoId={currentVideo.id} muscleId={selectedMuscle} />
      </div>

      {/* Video Comments Component */}
      <VideoComments videoId={currentVideo.id} />
    </div>
  )
}

