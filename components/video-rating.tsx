"use client"

import { useState } from "react"
import { useVideoStore } from "@/lib/store"
import { useUserStore } from "@/lib/store"
import { Star } from "lucide-react"
import { cn } from "@/lib/utils"

interface VideoRatingProps {
  videoId: string
  muscleId: string
}

export default function VideoRating({ videoId, muscleId }: VideoRatingProps) {
  const { user } = useUserStore()
  const { getRatingForVideo, rateVideo } = useVideoStore()
  const videoRating = getRatingForVideo(videoId, muscleId)
  const [hoverRating, setHoverRating] = useState<number | null>(null)

  const averageRating = videoRating?.averageRating || 0
  const totalRatings = videoRating?.totalRatings || 0
  const userRating = videoRating?.userRating || null

  const handleRating = (rating: number) => {
    if (!user) return
    rateVideo(videoId, muscleId, rating)
  }

  return (
    <div className="flex items-center gap-2">
      <div className="flex">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            className={cn("p-0 focus:outline-none transition-colors", !user && "cursor-not-allowed opacity-70")}
            onMouseEnter={() => user && setHoverRating(star)}
            onMouseLeave={() => user && setHoverRating(null)}
            onClick={() => handleRating(star)}
            disabled={!user}
          >
            <Star
              className={cn(
                "h-5 w-5",
                (hoverRating !== null ? star <= hoverRating : star <= (userRating || averageRating))
                  ? "fill-yellow-400 text-yellow-400"
                  : "text-muted-foreground",
              )}
            />
          </button>
        ))}
      </div>
      <div className="text-sm text-muted-foreground">
        {averageRating > 0 ? (
          <span>
            {averageRating.toFixed(1)} ({totalRatings} {totalRatings === 1 ? "rating" : "ratings"})
          </span>
        ) : (
          <span>No ratings yet</span>
        )}
      </div>
      {userRating && <div className="text-xs text-primary ml-2">Your rating: {userRating}</div>}
    </div>
  )
}

