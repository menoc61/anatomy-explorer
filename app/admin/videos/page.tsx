"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Checkbox } from "@/components/ui/checkbox"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Video, Pencil, Trash2, MoreVertical, Plus, FileUp, Search } from "lucide-react"
import type { Video as VideoType } from "@/types"

export default function AdminVideosPage() {
  const [videos, setVideos] = useState<VideoType[]>([
    {
      id: "video-1",
      title: "Biceps Anatomy Overview",
      description: "A detailed overview of the biceps brachii muscle anatomy",
      url: "/videos/biceps-anatomy.mp4",
      thumbnail: "/placeholder.svg?height=300&width=500",
      duration: 325, // in seconds
      isPremium: true,
      muscleId: "biceps",
      createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
      updatedAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: "video-2",
      title: "Quadriceps Function & Movement",
      description: "Learn about the function and movement patterns of the quadriceps muscle group",
      url: "/videos/quadriceps-function.mp4",
      thumbnail: "/placeholder.svg?height=300&width=500",
      duration: 412, // in seconds
      isPremium: true,
      muscleId: "quadriceps",
      createdAt: new Date(Date.now() - 25 * 24 * 60 * 60 * 1000).toISOString(),
      updatedAt: new Date(Date.now() - 25 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: "video-3",
      title: "Abdominal Muscles Explained",
      description: "A comprehensive explanation of the abdominal muscle group",
      url: "/videos/abdominals-explained.mp4",
      thumbnail: "/placeholder.svg?height=300&width=500",
      duration: 278, // in seconds
      isPremium: false,
      muscleId: "abdominals",
      createdAt: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000).toISOString(),
      updatedAt: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: "video-4",
      title: "Deltoid Training Techniques",
      description: "Advanced training techniques for the deltoid muscle",
      url: "/videos/deltoid-training.mp4",
      thumbnail: "/placeholder.svg?height=300&width=500",
      duration: 345, // in seconds
      isPremium: true,
      muscleId: "deltoids",
      createdAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
      updatedAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: "video-5",
      title: "Pectoralis Major Anatomy",
      description: "Detailed anatomy of the pectoralis major muscle",
      url: "/videos/pectoralis-anatomy.mp4",
      thumbnail: "/placeholder.svg?height=300&width=500",
      duration: 298, // in seconds
      isPremium: false,
      muscleId: "pectoralis",
      createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
      updatedAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
    },
  ])

  const [searchQuery, setSearchQuery] = useState("")
  const [isAddVideoDialogOpen, setIsAddVideoDialogOpen] = useState(false)
  const [newVideo, setNewVideo] = useState<Partial<VideoType>>({
    title: "",
    description: "",
    url: "",
    thumbnail: "",
    duration: 0,
    isPremium: false,
    muscleId: "",
  })

  const filteredVideos = videos.filter(
    (video) =>
      video.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      video.description.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const handleAddVideo = () => {
    const videoToAdd: VideoType = {
      id: `video-${Date.now()}`,
      title: newVideo.title || "Untitled Video",
      description: newVideo.description || "",
      url: newVideo.url || "/videos/placeholder.mp4",
      thumbnail: newVideo.thumbnail || "/placeholder.svg?height=300&width=500",
      duration: newVideo.duration || 0,
      isPremium: newVideo.isPremium || false,
      muscleId: newVideo.muscleId || "biceps",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    setVideos([videoToAdd, ...videos])
    setNewVideo({
      title: "",
      description: "",
      url: "",
      thumbnail: "",
      duration: 0,
      isPremium: false,
      muscleId: "",
    })
    setIsAddVideoDialogOpen(false)
  }

  const handleDeleteVideo = (id: string) => {
    setVideos(videos.filter((video) => video.id !== id))
  }

  const formatDuration = (seconds: number) => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString()
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Videos</h1>
          <p className="text-muted-foreground">Manage educational videos for the anatomy explorer</p>
        </div>
        <Dialog open={isAddVideoDialogOpen} onOpenChange={setIsAddVideoDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Video
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Add New Video</DialogTitle>
              <DialogDescription>Upload a new educational video for the anatomy explorer</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="title" className="text-right">
                  Title
                </Label>
                <Input
                  id="title"
                  value={newVideo.title}
                  onChange={(e) => setNewVideo({ ...newVideo, title: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="description" className="text-right">
                  Description
                </Label>
                <Textarea
                  id="description"
                  value={newVideo.description}
                  onChange={(e) => setNewVideo({ ...newVideo, description: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="muscle" className="text-right">
                  Muscle Group
                </Label>
                <Select
                  value={newVideo.muscleId}
                  onValueChange={(value) => setNewVideo({ ...newVideo, muscleId: value })}
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select muscle group" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="biceps">Biceps Brachii</SelectItem>
                    <SelectItem value="triceps">Triceps Brachii</SelectItem>
                    <SelectItem value="deltoids">Deltoid Muscle</SelectItem>
                    <SelectItem value="pectoralis">Pectoralis Major</SelectItem>
                    <SelectItem value="quadriceps">Quadriceps</SelectItem>
                    <SelectItem value="hamstrings">Hamstrings</SelectItem>
                    <SelectItem value="gastrocnemius">Gastrocnemius</SelectItem>
                    <SelectItem value="trapezius">Trapezius</SelectItem>
                    <SelectItem value="latissimus">Latissimus Dorsi</SelectItem>
                    <SelectItem value="abdominals">Abdominal Muscles</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="duration" className="text-right">
                  Duration (seconds)
                </Label>
                <Input
                  id="duration"
                  type="number"
                  value={newVideo.duration || ""}
                  onChange={(e) => setNewVideo({ ...newVideo, duration: Number.parseInt(e.target.value) || 0 })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="video-file" className="text-right">
                  Video File
                </Label>
                <div className="col-span-3">
                  <Button variant="outline" className="w-full">
                    <FileUp className="h-4 w-4 mr-2" />
                    Upload Video
                  </Button>
                </div>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="thumbnail" className="text-right">
                  Thumbnail
                </Label>
                <div className="col-span-3">
                  <Button variant="outline" className="w-full">
                    <FileUp className="h-4 w-4 mr-2" />
                    Upload Thumbnail
                  </Button>
                </div>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="premium" className="text-right">
                  Premium Content
                </Label>
                <div className="flex items-center space-x-2 col-span-3">
                  <Checkbox
                    id="premium"
                    checked={newVideo.isPremium}
                    onCheckedChange={(checked) => setNewVideo({ ...newVideo, isPremium: checked as boolean })}
                  />
                  <label
                    htmlFor="premium"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Restrict to premium subscribers only
                  </label>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddVideoDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleAddVideo}>Add Video</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex items-center gap-2">
        <Search className="h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search videos..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="max-w-sm"
        />
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[250px]">Title</TableHead>
              <TableHead>Muscle Group</TableHead>
              <TableHead>Duration</TableHead>
              <TableHead>Premium</TableHead>
              <TableHead>Added</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredVideos.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="h-24 text-center">
                  No videos found.
                </TableCell>
              </TableRow>
            ) : (
              filteredVideos.map((video) => (
                <TableRow key={video.id}>
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-2">
                      <div className="w-10 h-6 bg-muted rounded flex items-center justify-center">
                        <Video className="h-3 w-3" />
                      </div>
                      {video.title}
                    </div>
                  </TableCell>
                  <TableCell>{video.muscleId.charAt(0).toUpperCase() + video.muscleId.slice(1)}</TableCell>
                  <TableCell>{formatDuration(video.duration)}</TableCell>
                  <TableCell>
                    {video.isPremium ? (
                      <span className="inline-flex items-center rounded-full bg-amber-100 px-2.5 py-0.5 text-xs font-medium text-amber-800">
                        Premium
                      </span>
                    ) : (
                      <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                        Free
                      </span>
                    )}
                  </TableCell>
                  <TableCell>{formatDate(video.createdAt)}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <span className="sr-only">Open menu</span>
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem>
                          <Pencil className="h-4 w-4 mr-2" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => handleDeleteVideo(video.id)}>
                          <Trash2 className="h-4 w-4 mr-2" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

