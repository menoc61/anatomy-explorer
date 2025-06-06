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
import { ArrowLeft, CopyPlus, AlertCircle } from "lucide-react"
import { Video } from "@/types" // Import the unified type

// --- Placeholder API Functions ---
// Assume fetchVideoData is available (defined similarly to edit page or in a shared util)
async function fetchVideoData(id: string): Promise<Video | null> {
  console.log(`(Duplicate Page) Simulating fetch for original video ID: ${id}`)
  await new Promise((resolve) => setTimeout(resolve, 500))
  const mockBackendVideos: Video[] = [
     { id: "video-1", title: "Biceps Brachii Anatomy", description: "Detailed exploration...", url: "...", thumbnail: "...", duration: "12:45", status: "published", category: "upper-limb", views: 1245, uploadDate: "2023-09-15", isPremium: false, muscleId: "muscle-biceps", createdAt: "2023-09-10T10:00:00Z", updatedAt: "2023-09-15T14:30:00Z" },
     { id: "video-2", title: "Quadriceps Function", description: "Analysis of quadriceps...", url: "...", thumbnail: "...", duration: "18:22", status: "published", category: "lower-limb", views: 982, uploadDate: "2023-08-22", isPremium: true, muscleId: "muscle-quads", createdAt: "2023-08-20T11:00:00Z", updatedAt: "2023-08-22T16:00:00Z" },
     { id: "video-3", title: "Abdominal Muscles Overview", description: "Comprehensive overview...", url: "...", thumbnail: "...", duration: "15:10", status: "draft", category: "trunk", views: 0, uploadDate: "2023-10-05", isPremium: false, createdAt: "2023-10-01T09:00:00Z", updatedAt: "2023-10-05T11:45:00Z" },
  ]
  const video = mockBackendVideos.find(v => v.id === id)
  return video || null
}

// Simulates creating a new video
async function createVideo(data: Omit<Video, 'id' | 'createdAt' | 'updatedAt' | 'views'>): Promise<{ success: boolean; newId?: string; message?: string }> {
  console.log("Simulating creation of new video with data:", data)
  await new Promise((resolve) => setTimeout(resolve, 1000))

  if (Math.random() > 0.1) { // 90% success rate
    const newId = `video-${Date.now()}`
    return { success: true, newId: newId }
  } else {
    return { success: false, message: "Simulated API creation failed." }
  }
}
// --- End Placeholder API Functions ---


export default function DuplicateVideoPage() {
  const params = useParams()
  const router = useRouter()
  const { toast } = useToast()
  const originalVideoId = params.id as string

  const [newVideoData, setNewVideoData] = useState<Partial<Omit<Video, 'id' | 'createdAt' | 'updatedAt'>>>({})
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [originalTitle, setOriginalTitle] = useState<string>("")

  useEffect(() => {
    async function loadOriginalVideo() {
      if (!originalVideoId) {
        setError("Original Video ID is missing.")
        setIsLoading(false)
        return
      }
      setIsLoading(true)
      setError(null)
      try {
        const data = await fetchVideoData(originalVideoId)
        if (data) {
          setOriginalTitle(data.title)
          // Pre-populate new video data based on the original
          const { id, createdAt, updatedAt, views, ...rest } = data // Exclude fields not needed for creation
          setNewVideoData({
            ...rest,
            title: `${data.title} (Copy)`, // Modify title
            status: "draft", // Default status for duplicates
            uploadDate: new Date().toISOString().split("T")[0], // Set upload date
          })
        } else {
          setError("Original video not found.")
          toast({
            title: "Error",
            description: "Original video not found.",
            variant: "destructive",
          })
        }
      } catch (err) {
        console.error("Failed to load original video:", err)
        setError(err instanceof Error ? err.message : "An unknown error occurred while fetching original video data.")
        toast({
          title: "Loading Error",
          description: "Could not load original video data.",
          variant: "destructive",
        })
      } finally {
        setIsLoading(false)
      }
    }
    loadOriginalVideo()
  }, [originalVideoId, router, toast])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setNewVideoData((prev) => ({ ...prev, [name]: value }))
  }

   const handleSwitchChange = (checked: boolean) => {
     setNewVideoData((prev) => ({ ...prev, isPremium: checked }))
   }

  const handleSelectChange = (name: keyof Omit<Video, 'id' | 'createdAt' | 'updatedAt' | 'views'>) => (value: string) => {
    setNewVideoData((prev) => ({ ...prev, [name]: value as any })) // Use 'as any' carefully or refine type for select handler
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setIsSaving(true)
    setError(null)

    // Basic validation (add more as needed)
    if (!newVideoData.title || !newVideoData.url || !newVideoData.thumbnail) {
       setError("Title, Video URL, and Thumbnail URL are required.");
       setIsSaving(false);
       toast({ title: "Missing Information", description: "Please fill in all required fields.", variant: "destructive" });
       return;
    }

    try {
      // Ensure all required fields for creation are present
      const creationData = {
        title: newVideoData.title,
        description: newVideoData.description || "",
        url: newVideoData.url,
        thumbnail: newVideoData.thumbnail,
        duration: newVideoData.duration || "00:00",
        status: newVideoData.status || "draft",
        category: newVideoData.category || "general",
        isPremium: newVideoData.isPremium || false,
        muscleId: newVideoData.muscleId || undefined,
        uploadDate: newVideoData.uploadDate || new Date().toISOString().split("T")[0],
      }

      const result = await createVideo(creationData)

      if (result.success) {
        toast({
          title: "Video Duplicated",
          description: `New video "${creationData.title}" created successfully with ID ${result.newId}.`,
        })
        router.push("/admin/videos") // Redirect back to the list
      } else {
        throw new Error(result.message || "Failed to create video.")
      }
    } catch (err) {
      console.error("Failed to create duplicate video:", err)
      const errorMessage = err instanceof Error ? err.message : "An unknown error occurred."
      setError(`Creation failed: ${errorMessage}`)
      toast({
        title: "Creation Error",
        description: `Could not create duplicate video: ${errorMessage}`,
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
             <Skeleton className="h-10 w-36" />
           </CardFooter>
         </Card>
       </div>
     )
   }

  // Error State (after loading attempt)
   if (error && !originalTitle) { // Show full page error if original video couldn't be loaded
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

  // Render Form
  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">Duplicate Video</h1>
        <Button variant="outline" type="button" asChild>
          <Link href="/admin/videos">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Videos
          </Link>
        </Button>
      </div>

       {/* Display Save Error Inline */}
       {error && originalTitle && (
          <div className="bg-destructive/10 border border-destructive/50 text-destructive p-3 rounded-md flex items-center gap-2">
            <AlertCircle className="h-5 w-5" />
            <p className="text-sm">{error}</p>
          </div>
        )}

      <Card>
        <CardHeader>
          <CardTitle>Create New Video From Existing</CardTitle>
          <CardDescription>
            Creating a new video based on "{originalTitle}" (ID: {originalVideoId}). Modify details below and save.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-6 md:grid-cols-2">
          {/* Form fields bound to newVideoData */}
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              name="title"
              value={newVideoData.title || ""}
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
              value={newVideoData.duration || ""}
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
              value={newVideoData.description || ""}
              onChange={handleInputChange}
              rows={4}
              disabled={isSaving}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="status">Status</Label>
            <Select
              name="status"
              value={newVideoData.status || "draft"}
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
              value={newVideoData.category || ""}
              onValueChange={handleSelectChange("category")}
              disabled={isSaving}
            >
              <SelectTrigger id="category">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
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
              value={newVideoData.thumbnail || ""}
              onChange={handleInputChange}
              placeholder="https://example.com/thumb.jpg"
              required
              disabled={isSaving}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="url">Video URL</Label>
            <Input
              id="url"
              name="url"
              value={newVideoData.url || ""}
              onChange={handleInputChange}
              placeholder="https://example.com/video.mp4"
              required
              disabled={isSaving}
            />
          </div>
           <div className="space-y-2">
             <Label htmlFor="muscleId">Associated Muscle ID (Optional)</Label>
             <Input
               id="muscleId"
               name="muscleId"
               value={newVideoData.muscleId || ""}
               onChange={handleInputChange}
               placeholder="e.g., muscle-biceps"
               disabled={isSaving}
             />
           </div>
           <div className="flex items-center space-x-2 pt-6">
             <Switch
               id="isPremium"
               checked={newVideoData.isPremium || false}
               onCheckedChange={handleSwitchChange}
               disabled={isSaving}
             />
             <Label htmlFor="isPremium">Premium Content</Label>
           </div>
        </CardContent>
        <CardFooter className="flex justify-end">
          <Button type="submit" disabled={isSaving || isLoading}>
            {isSaving ? "Creating..." : <><CopyPlus className="mr-2 h-4 w-4" /> Create Duplicate</>}
          </Button>
        </CardFooter>
      </Card>
    </form>
  )
}
