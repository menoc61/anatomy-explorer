"use client"

import { useState } from "react"
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
import {
  Search,
  Plus,
  MoreHorizontal,
  Edit,
  Trash,
  Eye,
  Download,
  Filter,
  ArrowUpDown,
  Play,
  Pause,
  X,
} from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import Link from "next/link"

// Mock video data
const mockVideos = [
  {
    id: "video-1",
    title: "Biceps Brachii Anatomy",
    description: "Detailed exploration of the biceps brachii muscle anatomy and function",
    duration: "12:45",
    status: "published",
    category: "upper-limb",
    views: 1245,
    uploadDate: "2023-09-15",
    thumbnail: "/placeholder.svg?height=720&width=1280",
    url: "https://example.com/videos/biceps-brachii.mp4",
  },
  {
    id: "video-2",
    title: "Quadriceps Function and Movement",
    description: "Analysis of quadriceps muscle group function during various movements",
    duration: "18:22",
    status: "published",
    category: "lower-limb",
    views: 982,
    uploadDate: "2023-08-22",
    thumbnail: "/placeholder.svg?height=720&width=1280",
    url: "https://example.com/videos/quadriceps.mp4",
  },
  {
    id: "video-3",
    title: "Abdominal Muscles Overview",
    description: "Comprehensive overview of the abdominal muscle groups",
    duration: "15:10",
    status: "draft",
    category: "trunk",
    views: 0,
    uploadDate: "2023-10-05",
    thumbnail: "/placeholder.svg?height=720&width=1280",
    url: "https://example.com/videos/abdominals.mp4",
  },
  {
    id: "video-4",
    title: "Shoulder Anatomy Deep Dive",
    description: "In-depth exploration of shoulder joint anatomy and surrounding muscles",
    duration: "22:35",
    status: "published",
    category: "upper-limb",
    views: 756,
    uploadDate: "2023-07-12",
    thumbnail: "/placeholder.svg?height=720&width=1280",
    url: "https://example.com/videos/shoulder.mp4",
  },
  {
    id: "video-5",
    title: "Ankle Joint Biomechanics",
    description: "Analysis of ankle joint movement and associated muscle actions",
    duration: "14:18",
    status: "published",
    category: "lower-limb",
    views: 543,
    uploadDate: "2023-06-28",
    thumbnail: "/placeholder.svg?height=720&width=1280",
    url: "https://example.com/videos/ankle.mp4",
  },
  {
    id: "video-6",
    title: "Spinal Muscles and Posture",
    description: "Exploration of spinal muscles and their role in maintaining posture",
    duration: "19:47",
    status: "review",
    category: "trunk",
    views: 0,
    uploadDate: "2023-10-01",
    thumbnail: "/placeholder.svg?height=720&width=1280",
    url: "https://example.com/videos/spine.mp4",
  },
]

export default function VideosPage() {
  const [videos, setVideos] = useState(mockVideos)
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [previewVideo, setPreviewVideo] = useState<any>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const { toast } = useToast()

  // Filter videos based on search query and filters
  const filteredVideos = videos.filter((video) => {
    const matchesSearch =
      video.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      video.description.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesStatus = statusFilter === "all" || video.status === statusFilter
    const matchesCategory = categoryFilter === "all" || video.category === categoryFilter

    return matchesSearch && matchesStatus && matchesCategory
  })

  const handleDeleteVideo = (videoId: string) => {
    setVideos(videos.filter((video) => video.id !== videoId))
    toast({
      title: "Video deleted",
      description: "The video has been successfully deleted.",
    })
  }

  const handlePreviewVideo = (video: any) => {
    setPreviewVideo(video)
    setIsPlaying(true)
  }

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying)
  }

  const closePreview = () => {
    setPreviewVideo(null)
    setIsPlaying(false)
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Videos</h1>
          <p className="text-muted-foreground">Manage educational videos for the anatomy explorer</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => window.history.back()}>
            Back
          </Button>
          <Button asChild>
            <Link href="/admin/videos/upload">
              <Plus className="mr-2 h-4 w-4" />
              Add Video
            </Link>
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Video Management</CardTitle>
          <CardDescription>View and manage all educational videos</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search videos..."
                  className="pl-8"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div className="flex flex-wrap gap-2">
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-[130px]">
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

                <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                  <SelectTrigger className="w-[150px]">
                    <Filter className="mr-2 h-4 w-4" />
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    <SelectItem value="upper-limb">Upper Limb</SelectItem>
                    <SelectItem value="lower-limb">Lower Limb</SelectItem>
                    <SelectItem value="trunk">Trunk</SelectItem>
                    <SelectItem value="head-neck">Head & Neck</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead>
                      <div className="flex items-center">
                        Status
                        <ArrowUpDown className="ml-1 h-3 w-3" />
                      </div>
                    </TableHead>
                    <TableHead>
                      <div className="flex items-center">
                        Category
                        <ArrowUpDown className="ml-1 h-3 w-3" />
                      </div>
                    </TableHead>
                    <TableHead>Duration</TableHead>
                    <TableHead>
                      <div className="flex items-center">
                        Views
                        <ArrowUpDown className="ml-1 h-3 w-3" />
                      </div>
                    </TableHead>
                    <TableHead>Upload Date</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredVideos.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                        No videos found matching your filters
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredVideos.map((video) => (
                      <TableRow key={video.id}>
                        <TableCell className="font-medium">{video.title}</TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              video.status === "published"
                                ? "success"
                                : video.status === "review"
                                  ? "warning"
                                  : "outline"
                            }
                          >
                            {video.status.charAt(0).toUpperCase() + video.status.slice(1)}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">
                            {video.category
                              .split("-")
                              .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                              .join(" ")}
                          </Badge>
                        </TableCell>
                        <TableCell>{video.duration}</TableCell>
                        <TableCell>{video.views.toLocaleString()}</TableCell>
                        <TableCell>{video.uploadDate}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button variant="ghost" size="icon" onClick={() => handlePreviewVideo(video)}>
                              <Eye className="h-4 w-4" />
                            </Button>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon">
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                <DropdownMenuItem>
                                  <Edit className="mr-2 h-4 w-4" />
                                  Edit
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <Download className="mr-2 h-4 w-4" />
                                  Download
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem className="text-red-600" onClick={() => handleDeleteVideo(video.id)}>
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

            <div className="flex items-center justify-between">
              <div className="text-sm text-muted-foreground">
                Showing <strong>{filteredVideos.length}</strong> of <strong>{videos.length}</strong> videos
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm">
                  Previous
                </Button>
                <Button variant="outline" size="sm">
                  Next
                </Button>
                <Button variant="outline" size="sm">
                  <Download className="mr-2 h-4 w-4" />
                  Export
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Video Preview Dialog */}
      <Dialog open={previewVideo !== null} onOpenChange={(open) => !open && closePreview()}>
        <DialogContent className="sm:max-w-[800px] p-0 overflow-hidden">
          <div className="relative bg-black aspect-video">
            {/* Video player would go here - using placeholder for demo */}
            <div className="w-full h-full flex items-center justify-center">
              <img
                src={previewVideo?.thumbnail || "/placeholder.svg"}
                alt={previewVideo?.title}
                className="w-full h-full object-contain"
              />
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
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          <div className="p-6">
            <h2 className="text-xl font-semibold">{previewVideo?.title}</h2>
            <p className="text-sm text-muted-foreground mt-1">
              {previewVideo?.duration} • {previewVideo?.views.toLocaleString()} views
            </p>
            <p className="mt-4">{previewVideo?.description}</p>
            <div className="flex justify-between items-center mt-6">
              <Badge variant="outline">
                {previewVideo?.category
                  .split("-")
                  .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                  .join(" ")}
              </Badge>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Download className="mr-2 h-4 w-4" />
                  Download
                </Button>
                <Button size="sm">
                  <Edit className="mr-2 h-4 w-4" />
                  Edit
                </Button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

