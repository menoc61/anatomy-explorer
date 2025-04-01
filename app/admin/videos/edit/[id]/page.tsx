"use client"

import { useParams, useRouter } from "next/navigation"
import { useEffect, useState, FormEvent } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Skeleton } from "@/components/ui/skeleton"
import { useToast } from "@/hooks/use-toast"
import Link from "next/link"
import { ArrowLeft, Save, AlertCircle } from "lucide-react"
import { Video } from "@/types" // Import the unified type

// --- Placeholder API Functions ---
// Replace these with actual API calls later

// Simulates fetching a single video by ID
async function fetchVideoData(id: string): Promise<Video | null> {
  console.log(`Simulating fetch for video ID: ${id}`)
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 500))

  // Find in a mock dataset (replace with actual API call)
  const mockBackendVideos: Video[] = [
     { id: "video-1", title: "Biceps Brachii Anatomy", description: "Detailed exploration...", url: "...", thumbnail: "...", duration: "12:45", status: "published", category: "upper-limb", views: 1245, uploadDate: "2023-09-15", isPremium: false, muscleId: "muscle-biceps", createdAt: "2023-09-10T10:00:00Z", updatedAt: "2023-09-15T14:30:00Z" },
     { id: "video-2", title: "Quadriceps Function", description: "Analysis of quadriceps...", url: "...", thumbnail: "...", duration: "18:22", status: "published", category: "lower-limb", views: 982, uploadDate: "2023-08-22", isPremium: true, muscleId: "muscle-quads", createdAt: "2023-08-20T11:00:00Z", updatedAt: "2023-08-22T16:00:00Z" },
     { id: "video-3", title: "Abdominal Muscles Overview", description: "Comprehensive overview...", url: "...", thumbnail: "...", duration: "15:10", status: "draft", category: "trunk", views: 0, uploadDate: "2023-10-05", isPremium: false, createdAt: "2023-10-01T09:00:00Z", updatedAt: "2023-10-05T11:45:00Z" },
     // Add more mock videos matching the Video type if needed
  ]
  const video = mockBackendVideos.find(v => v.id === id)

  // Simulate API error
  // if (id === 'video-error') {
  //   throw new Error("Failed to fetch video data from API.");
  // }

  return video || null
}

// Simulates updating video data
async function updateVideoData(id: string, data: Partial<Video>): Promise<{ success: boolean; message?: string }> {
  console.log(`Simulating update for video ID: ${id} with data:`, data)
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 1000))

  // Simulate success/failure
  if (Math.random() > 0.1) { // 90% success rate
    return { success: true }
  } else {
    return { success: false, message: "Simulated API update failed." }
  }
}
// --- End Placeholder API Functions ---

export default function EditVideoPage() {
  const params = useParams()
  const router = useRouter()
  const { toast } = useToast()
  const videoId = params.id as string

  const [videoData, setVideoData] = useState<Partial<Video>>({})
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function loadVideo() {
      if (!videoId) {
        setError("Video ID is missing.")
        setIsLoading(false)
        return
      }
      setIsLoading(true)
      setError(null)
      try {
        const data = await fetchVideoData(videoId)
        if (data) {
          setVideoData(data)
        } else {
          setError("Video not found.")
          toast({
            title: "Error",
            description: "Video not found.",
            variant: "destructive",
          })
          // Consider redirecting only after a delay or user action
          // router.push("/admin/videos");
        }
      } catch (err) {
        console.error("Failed to load video:", err)
        setError(err instanceof Error ? err.message : "An unknown error occurred while fetching video data.")
        toast({
          title: "Loading Error",
          description: "Could not load video data. Please try again later.",
          variant: "destructive",
        })
      } finally {
        setIsLoading(false)
      }
    }
    loadVideo()
  }, [videoId, router, toast])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setVideoData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSwitchChange = (checked: boolean) => {
    setVideoData((prev) => ({ ...prev, isPremium: checked }))
  }

  const handleSelectChange = (name: keyof Video) => (value: string) => {
    setVideoData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (!videoId) {
      toast({ title: "Error", description: "Video ID is missing.", variant: "destructive" })
      return
    }
    setIsSaving(true)
    setError(null) // Clear previous errors

    try {
      const result = await updateVideoData(videoId, videoData)
      if (result.success) {
        toast({
          title: "Video Updated",
          description: `Video "${videoData.title || 'Untitled'}" has been successfully updated.`,
        })
        router.push("/admin/videos") // Redirect back to the list
      } else {
        throw new Error(result.message || "Failed to update video.")
      }
    } catch (err) {
      console.error("Failed to save video:", err)
      const errorMessage = err instanceof Error ? err.message : "An unknown error occurred."
      setError(`Save failed: ${errorMessage}`)
      toast({
        title: "Save Error",
        description: `Could not save video changes: ${errorMessage}`,
        variant: "destructive",
      })
    } finally {
      setIsSaving(false)
    }
  }

  // Loading State
  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <Skeleton className="h-9 w-48" />
          <Skeleton className="h-10 w-36" />
        </div>
        <Card>
          <CardHeader>
            <Skeleton className="h-6 w-1/3 mb-2" />
            <Skeleton className="h-4 w-2/3" />
          </CardHeader>
          <CardContent className="grid gap-6 md:grid-cols-2">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="space-y-2">
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-10 w-full" />
              </div>
            ))}
          </CardContent>
          <CardFooter className="flex justify-end">
            <Skeleton className="h-10 w-28" />
          </CardFooter>
        </Card>
      </div>
    )
  }

  // Error State (after loading attempt)
  if (error && !videoData.id) { // Show full page error if video couldn't be loaded at all
     return (
       <div className="space-y-6 text-center py-10">
         <AlertCircle className="mx-auto h-12 w-12 text-destructive" />
         <h1 className="text-2xl font-bold text-destructive">Loading Failed</h1>
         <p className="text-muted-foreground">{error}</p>
         <Button variant="outline" asChild>
           <Link href="/admin/videos">
             <ArrowLeft className="mr-2 h-4 w-4" />
             Back to Videos
           </Link>
         </Button>
       </div>
     )
   }

  // Render Form (if loaded successfully or partially)
  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">Edit Video</h1>
        <Button variant="outline" type="button" asChild>
          <Link href="/admin/videos">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Videos
          </Link>
        </Button>
      </div>

      {/* Display Save Error Inline */}
      {error && videoData.id && (
         <div className="bg-destructive/10 border border-destructive/50 text-destructive p-3 rounded-md flex items-center gap-2">
           <AlertCircle className="h-5 w-5" />
           <p className="text-sm">{error}</p>
         </div>
       )}

      <Card>
        <CardHeader>
          <CardTitle>Video Details</CardTitle>
          <CardDescription>Update the information for video ID: {videoId}</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-6 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              name="title"
              value={videoData.title || ""}
              onChange={handleInputChange}
              required
              disabled={isSaving}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="duration">Duration (mm:ss)</Label>
            <Input
              id="duration"
              name="duration"
              value={videoData.duration || ""}
              onChange={handleInputChange}
              placeholder="e.g., 15:30"
              disabled={isSaving}
            />
          </div>
          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              name="description"
              value={videoData.description || ""}
              onChange={handleInputChange}
              rows={4}
              disabled={isSaving}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="status">Status</Label>
            <Select
              name="status"
              value={videoData.status || ""}
              onValueChange={handleSelectChange("status")}
              disabled={isSaving}
            >
              <SelectTrigger id="status">
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="published">Published</SelectItem>
                <SelectItem value="draft">Draft</SelectItem>
                <SelectItem value="review">In Review</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="category">Category</Label>
            <Select
              name="category"
              value={videoData.category || ""}
              onValueChange={handleSelectChange("category")}
              disabled={isSaving}
            >
              <SelectTrigger id="category">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {/* Add more predefined categories as needed */}
                <SelectItem value="upper-limb">Upper Limb</SelectItem>
                <SelectItem value="lower-limb">Lower Limb</SelectItem>
                <SelectItem value="trunk">Trunk</SelectItem>
                <SelectItem value="head-neck">Head & Neck</SelectItem>
                <SelectItem value="general">General Anatomy</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="thumbnail">Thumbnail URL</Label>
            <Input
              id="thumbnail"
              name="thumbnail"
              value={videoData.thumbnail || ""}
              onChange={handleInputChange}
              placeholder="https://example.com/thumb.jpg"
              disabled={isSaving}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="url">Video URL</Label>
            <Input
              id="url"
              name="url"
              value={videoData.url || ""}
              onChange={handleInputChange}
              placeholder="https://example.com/video.mp4"
              disabled={isSaving}
            />
          </div>
           <div className="space-y-2">
             <Label htmlFor="muscleId">Associated Muscle ID (Optional)</Label>
             <Input
               id="muscleId"
               name="muscleId"
               value={videoData.muscleId || ""}
               onChange={handleInputChange}
               placeholder="e.g., muscle-biceps"
               disabled={isSaving}
             />
           </div>
           <div className="flex items-center space-x-2 pt-6">
             <Switch
               id="isPremium"
               checked={videoData.isPremium || false}
               onCheckedChange={handleSwitchChange}
               disabled={isSaving}
             />
             <Label htmlFor="isPremium">Premium Content</Label>
           </div>
        </CardContent>
        <CardFooter className="flex justify-end">
          <Button type="submit" disabled={isSaving || isLoading}>
            {isSaving ? "Saving..." : <><Save className="mr-2 h-4 w-4" /> Save Changes</>}
          </Button>
        </CardFooter>
      </Card>
    </form>
  )
}
