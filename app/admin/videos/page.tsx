"use client"

import { useState, useEffect, useMemo } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import {
  Search,
  Plus,
  MoreHorizontal,
  Edit,
  Trash,
  Eye,
  Download,
  Filter,
  ArrowUpDown, // Consider adding sorting logic later
  Play,
  Pause,
  X,
  Copy,
  AlertCircle,
} from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import Link from "next/link"
import { Video } from "@/types" // Import the unified type

// --- Placeholder API Functions ---
async function fetchVideos(): Promise<Video[]> {
  console.log("Simulating fetch for all videos")
  await new Promise((resolve) => setTimeout(resolve, 700)) // Simulate network delay
  // Replace with actual API call
  const mockBackendVideos: Video[] = [
     { id: "video-1", title: "Biceps Brachii Anatomy", description: "Detailed exploration...", url: "...", thumbnail: "/placeholder.svg?height=720&width=1280", duration: "12:45", status: "published", category: "upper-limb", views: 1245, uploadDate: "2023-09-15", isPremium: false, muscleId: "muscle-biceps", createdAt: "2023-09-10T10:00:00Z", updatedAt: "2023-09-15T14:30:00Z" },
     { id: "video-2", title: "Quadriceps Function", description: "Analysis of quadriceps...", url: "...", thumbnail: "/placeholder.svg?height=720&width=1280", duration: "18:22", status: "published", category: "lower-limb", views: 982, uploadDate: "2023-08-22", isPremium: true, muscleId: "muscle-quads", createdAt: "2023-08-20T11:00:00Z", updatedAt: "2023-08-22T16:00:00Z" },
     { id: "video-3", title: "Abdominal Muscles Overview", description: "Comprehensive overview...", url: "...", thumbnail: "/placeholder.svg?height=720&width=1280", duration: "15:10", status: "draft", category: "trunk", views: 0, uploadDate: "2023-10-05", isPremium: false, createdAt: "2023-10-01T09:00:00Z", updatedAt: "2023-10-05T11:45:00Z" },
     { id: "video-4", title: "Shoulder Anatomy Deep Dive", description: "In-depth exploration...", url: "...", thumbnail: "/placeholder.svg?height=720&width=1280", duration: "22:35", status: "published", category: "upper-limb", views: 756, uploadDate: "2023-07-12", isPremium: false, muscleId: "muscle-shoulder", createdAt: "2023-07-10T08:00:00Z", updatedAt: "2023-07-12T12:15:00Z" },
     { id: "video-5", title: "Ankle Joint Biomechanics", description: "Analysis of ankle joint...", url: "...", thumbnail: "/placeholder.svg?height=720&width=1280", duration: "14:18", status: "published", category: "lower-limb", views: 543, uploadDate: "2023-06-28", isPremium: false, createdAt: "2023-06-25T14:00:00Z", updatedAt: "2023-06-28T10:30:00Z" },
     { id: "video-6", title: "Spinal Muscles and Posture", description: "Exploration of spinal muscles...", url: "...", thumbnail: "/placeholder.svg?height=720&width=1280", duration: "19:47", status: "review", category: "trunk", views: 0, uploadDate: "2023-10-01", isPremium: true, createdAt: "2023-09-28T15:00:00Z", updatedAt: "2023-10-01T11:00:00Z" },
  ]
  // Simulate API error
  // if (Math.random() < 0.1) throw new Error("Failed to fetch videos from API.");
  return mockBackendVideos;
}

async function deleteVideo(id: string): Promise<{ success: boolean; message?: string }> {
  console.log(`Simulating delete for video ID: ${id}`)
  await new Promise((resolve) => setTimeout(resolve, 500))
  // Simulate success/failure
  if (Math.random() > 0.1) { // 90% success rate
    return { success: true }
  } else {
    return { success: false, message: "Simulated API delete failed." }
  }
}
// --- End Placeholder API Functions ---


export default function VideosPage() {
  const [videos, setVideos] = useState<Video[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [previewVideo, setPreviewVideo] = useState<Video | null>(null)
  const [isPlaying, setIsPlaying] = useState(false) // For preview dialog
  const { toast } = useToast()

  // Fetch videos on mount
  useEffect(() => {
    async function loadVideos() {
      setIsLoading(true)
      setError(null)
      try {
        const data = await fetchVideos()
        setVideos(data)
      } catch (err) {
        console.error("Failed to load videos:", err)
        const message = err instanceof Error ? err.message : "An unknown error occurred."
        setError(`Failed to load videos: ${message}`)
        toast({
          title: "Loading Error",
          description: "Could not load video list. Please try again later.",
          variant: "destructive",
        })
      } finally {
        setIsLoading(false)
      }
    }
    loadVideos()
  }, [toast]) // Dependency array includes toast for error reporting

  // Filter videos based on search query and filters
  const filteredVideos = useMemo(() => {
    return videos.filter((video) => {
      const lowerSearch = searchQuery.toLowerCase()
      const matchesSearch =
        video.title.toLowerCase().includes(lowerSearch) ||
        (video.description && video.description.toLowerCase().includes(lowerSearch)) ||
        video.id.toLowerCase().includes(lowerSearch)

      const matchesStatus = statusFilter === "all" || video.status === statusFilter
      const matchesCategory = categoryFilter === "all" || video.category === categoryFilter

      return matchesSearch && matchesStatus && matchesCategory
    })
  }, [videos, searchQuery, statusFilter, categoryFilter])

  const handleDeleteVideo = async (videoId: string, videoTitle: string) => {
     // Basic confirmation - consider using AlertDialog for better UX
     if (!confirm(`Are you sure you want to delete the video "${videoTitle}"?`)) {
       return;
     }

    try {
      const result = await deleteVideo(videoId)
      if (result.success) {
        setVideos((prevVideos) => prevVideos.filter((video) => video.id !== videoId))
        toast({
          title: "Video Deleted",
          description: `Video "${videoTitle}" has been successfully deleted.`,
        })
      } else {
        throw new Error(result.message || "Failed to delete video.")
      }
    } catch (err) {
      console.error("Failed to delete video:", err)
      toast({
        title: "Deletion Error",
        description: `Could not delete video: ${err instanceof Error ? err.message : "Unknown error"}`,
        variant: "destructive",
      })
    }
  }

  const handlePreviewVideo = (video: Video) => {
    setPreviewVideo(video)
    setIsPlaying(true) // Auto-play on open? Or wait for user click?
  }

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying)
    // Add logic here to control actual video playback if using a real player
  }

  const closePreview = () => {
    setPreviewVideo(null)
    setIsPlaying(false)
  }

  // Format category string for display (e.g., "upper-limb" -> "Upper Limb")
  const formatCategory = (category: string) => {
     if (!category) return "N/A";
     return category
       .split("-")
       .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
       .join(" ");
   }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Videos</h1>
          <p className="text-muted-foreground">Manage educational videos for the anatomy explorer</p>
        </div>
        <div className="flex gap-2">
          {/* Add Upload/Add Video functionality later */}
          <Button asChild>
            <Link href="/admin/videos/upload"> {/* Assuming an upload page exists or will be created */}
              <Plus className="mr-2 h-4 w-4" />
              Add Video
            </Link>
          </Button>
        </div>
      </div>

      {/* Display Loading Error */}
       {error && (
         <div className="bg-destructive/10 border border-destructive/50 text-destructive p-4 rounded-md flex items-center gap-3">
           <AlertCircle className="h-6 w-6" />
           <div>
             <h3 className="font-semibold">Loading Error</h3>
             <p className="text-sm">{error}</p>
           </div>
         </div>
       )}

      <Card>
        <CardHeader>
          <CardTitle>Video Management</CardTitle>
          <CardDescription>View, filter, and manage all educational videos</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4">
            {/* Filter Controls */}
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by title, description, ID..."
                  className="pl-8"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  disabled={isLoading}
                />
              </div>
              <div className="flex flex-wrap gap-2">
                <Select value={statusFilter} onValueChange={setStatusFilter} disabled={isLoading}>
                  <SelectTrigger className="w-auto min-w-[130px]">
                    <Filter className="mr-2 h-4 w-4" />
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="published">Published</SelectItem>
                    <SelectItem value="draft">Draft</SelectItem>
                    <SelectItem value="review">In Review</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={categoryFilter} onValueChange={setCategoryFilter} disabled={isLoading}>
                  <SelectTrigger className="w-auto min-w-[150px]">
                    <Filter className="mr-2 h-4 w-4" />
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    {/* Dynamically populate categories from data if possible */}
                    <SelectItem value="upper-limb">Upper Limb</SelectItem>
                    <SelectItem value="lower-limb">Lower Limb</SelectItem>
                    <SelectItem value="trunk">Trunk</SelectItem>
                    <SelectItem value="head-neck">Head & Neck</SelectItem>
                    <SelectItem value="general">General Anatomy</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Video Table */}
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Duration</TableHead>
                    <TableHead>Views</TableHead>
                    <TableHead>Premium</TableHead>
                    <TableHead>Upload Date</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {isLoading ? (
                    // Skeleton Loader Rows
                    [...Array(5)].map((_, i) => (
                      <TableRow key={`skel-${i}`}>
                        <TableCell><Skeleton className="h-5 w-3/4" /></TableCell>
                        <TableCell><Skeleton className="h-5 w-20" /></TableCell>
                        <TableCell><Skeleton className="h-5 w-24" /></TableCell>
                        <TableCell><Skeleton className="h-5 w-16" /></TableCell>
                        <TableCell><Skeleton className="h-5 w-12" /></TableCell>
                        <TableCell><Skeleton className="h-5 w-10" /></TableCell>
                        <TableCell><Skeleton className="h-5 w-20" /></TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Skeleton className="h-8 w-8" />
                            <Skeleton className="h-8 w-8" />
                            <Skeleton className="h-8 w-8" />
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : filteredVideos.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={8} className="text-center py-8 text-muted-foreground">
                        {videos.length === 0 && !error ? "No videos found." : "No videos match your current filters."}
                      </TableCell>
                    </TableRow>
                  ) : (
                    // Actual Data Rows
                    filteredVideos.map((video) => (
                      <TableRow key={video.id}>
                        <TableCell className="font-medium max-w-xs truncate" title={video.title}>{video.title}</TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              video.status === "published" ? "default"
                              : video.status === "review" ? "destructive"
                              : "outline"
                            }
                            className="capitalize"
                          >
                            {video.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge variant="secondary">{formatCategory(video.category)}</Badge>
                        </TableCell>
                        <TableCell>{video.duration}</TableCell>
                        <TableCell>{video.views?.toLocaleString() ?? 'N/A'}</TableCell>
                        <TableCell>{video.isPremium ? "Yes" : "No"}</TableCell>
                        <TableCell>{video.uploadDate ? new Date(video.uploadDate).toLocaleDateString() : 'N/A'}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-1">
                            <Button variant="ghost" size="icon" onClick={() => handlePreviewVideo(video)} title="Preview">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon" asChild title="Duplicate">
                              <Link href={`/admin/videos/duplicate/${video.id}`}>
                                <Copy className="h-4 w-4" />
                              </Link>
                            </Button>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon" title="More actions">
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                <DropdownMenuItem asChild>
                                  <Link href={`/admin/videos/edit/${video.id}`}>
                                    <Edit className="mr-2 h-4 w-4" />
                                    Edit
                                  </Link>
                                </DropdownMenuItem>
                                {/* Add Download functionality if needed */}
                                {/* <DropdownMenuItem>
                                  <Download className="mr-2 h-4 w-4" />
                                  Download
                                </DropdownMenuItem> */}
                                <DropdownMenuSeparator />
                                <DropdownMenuItem
                                  className="text-red-600 focus:text-red-700 focus:bg-red-100"
                                  onClick={() => handleDeleteVideo(video.id, video.title)}
                                >
                                  <Trash className="mr-2 h-4 w-4" />
                                  Delete
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>

            {/* Footer Info & Pagination (Add pagination controls later) */}
            {!isLoading && (
              <div className="flex items-center justify-between pt-2">
                <div className="text-sm text-muted-foreground">
                  Showing <strong>{filteredVideos.length}</strong> of <strong>{videos.length}</strong> videos
                </div>
                {/* Placeholder for pagination */}
                 <div className="flex items-center gap-2">
                   <Button variant="outline" size="sm" disabled>Previous</Button>
                   <Button variant="outline" size="sm" disabled>Next</Button>
                 </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Video Preview Dialog */}
      <Dialog open={previewVideo !== null} onOpenChange={(open) => !open && closePreview()}>
        <DialogContent className="sm:max-w-[800px] p-0 overflow-hidden">
          <DialogHeader className="p-6 pb-0">
             <DialogTitle>{previewVideo?.title}</DialogTitle>
           </DialogHeader>
          <div className="relative bg-black aspect-video">
            {/* Replace with actual video player component */}
            <div className="w-full h-full flex items-center justify-center bg-secondary text-muted-foreground">
              {previewVideo?.thumbnail ? (
                 <img
                   src={previewVideo.thumbnail}
                   alt={previewVideo.title}
                   className="w-full h-full object-contain"
                 />
              ) : (
                 <span>No Thumbnail</span>
              )}
              {/* Overlay Play/Pause - Needs integration with actual player */}
              <div className="absolute inset-0 flex items-center justify-center">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-16 w-16 rounded-full bg-black/50 text-white hover:bg-black/70"
                  onClick={togglePlayPause}
                >
                  {isPlaying ? <Pause className="h-8 w-8" /> : <Play className="h-8 w-8" />}
                </Button>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-2 right-2 h-8 w-8 rounded-full bg-black/50 text-white hover:bg-black/70"
              onClick={closePreview}
              title="Close preview"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          <div className="p-6 space-y-4">
             <div className="flex justify-between items-start gap-4">
               <div>
                 <p className="text-sm text-muted-foreground">
                   {previewVideo?.duration} • {previewVideo?.views?.toLocaleString() ?? 'N/A'} views • Uploaded: {previewVideo?.uploadDate ? new Date(previewVideo.uploadDate).toLocaleDateString() : 'N/A'}
                 </p>
                 <p className="mt-2">{previewVideo?.description || "No description available."}</p>
               </div>
               <div className="flex-shrink-0 flex flex-col gap-2 items-end">
                  <Badge variant="secondary">{formatCategory(previewVideo?.category || '')}</Badge>
                  {previewVideo?.isPremium && <Badge variant="default">Premium</Badge>}
               </div>
             </div>
            <div className="flex justify-end gap-2 pt-2">
              {/* Add Download/Edit buttons if needed in preview */}
              <Button variant="outline" size="sm" onClick={closePreview}>Close</Button>
               <Button size="sm" asChild>
                 <Link href={`/admin/videos/edit/${previewVideo?.id}`}>
                   <Edit className="mr-2 h-4 w-4" /> Edit Video
                 </Link>
               </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
