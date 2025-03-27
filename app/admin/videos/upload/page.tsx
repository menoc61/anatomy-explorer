"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/hooks/use-toast"
import { Upload, Video, LinkIcon, Save, Loader2, X, Play, CheckCircle2, AlertCircle } from "lucide-react"
import Link from "next/link"

export default function VideoUploadPage() {
  const [uploadMethod, setUploadMethod] = useState("file")
  const [videoFile, setVideoFile] = useState<File | null>(null)
  const [videoUrl, setVideoUrl] = useState("")
  const [videoTitle, setVideoTitle] = useState("")
  const [videoDescription, setVideoDescription] = useState("")
  const [videoCategory, setVideoCategory] = useState("")
  const [isPublic, setIsPublic] = useState(true)
  const [isUploading, setIsUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [thumbnailUrl, setThumbnailUrl] = useState("")
  const [uploadError, setUploadError] = useState("")
  const fileInputRef = useRef<HTMLInputElement>(null)
  const { toast } = useToast()

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      if (file.type.startsWith("video/")) {
        setVideoFile(file)
        setVideoTitle(file.name.split(".")[0].replace(/-|_/g, " "))
        setThumbnailUrl("/placeholder.svg?height=720&width=1280") // Placeholder thumbnail
        setUploadError("")
      } else {
        setUploadError("Please select a valid video file")
        setVideoFile(null)
      }
    }
  }

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    const file = e.dataTransfer.files?.[0]
    if (file) {
      if (file.type.startsWith("video/")) {
        setVideoFile(file)
        setVideoTitle(file.name.split(".")[0].replace(/-|_/g, " "))
        setThumbnailUrl("/placeholder.svg?height=720&width=1280") // Placeholder thumbnail
        setUploadError("")
      } else {
        setUploadError("Please select a valid video file")
        setVideoFile(null)
      }
    }
  }

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
  }

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVideoUrl(e.target.value)
    if (e.target.value.includes("youtube.com") || e.target.value.includes("vimeo.com")) {
      setThumbnailUrl("/placeholder.svg?height=720&width=1280") // Placeholder thumbnail
    } else {
      setThumbnailUrl("")
    }
  }

  const handleUpload = async () => {
    if (uploadMethod === "file" && !videoFile) {
      setUploadError("Please select a video file to upload")
      return
    }

    if (uploadMethod === "url" && !videoUrl) {
      setUploadError("Please enter a valid video URL")
      return
    }

    if (!videoTitle) {
      setUploadError("Please enter a title for the video")
      return
    }

    if (!videoCategory) {
      setUploadError("Please select a category for the video")
      return
    }

    setIsUploading(true)
    setUploadError("")

    // Simulate upload progress
    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          return 100
        }
        return prev + 5
      })
    }, 300)

    // Simulate upload completion
    setTimeout(() => {
      clearInterval(interval)
      setUploadProgress(100)
      setIsUploading(false)

      toast({
        title: "Video uploaded successfully",
        description: "Your video has been uploaded and is now being processed.",
      })

      // In a real app, you would redirect to the video management page or show a success screen
      setTimeout(() => {
        window.location.href = "/admin/videos"
      }, 1500)
    }, 6000)
  }

  const resetForm = () => {
    setVideoFile(null)
    setVideoUrl("")
    setVideoTitle("")
    setVideoDescription("")
    setVideoCategory("")
    setThumbnailUrl("")
    setUploadProgress(0)
    setUploadError("")
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  return (
    <div className="container py-10 max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Upload Video</h1>
          <p className="text-muted-foreground">Add new educational videos to the anatomy explorer</p>
        </div>
        <Button variant="outline" asChild>
          <Link href="/admin/videos">Back to Videos</Link>
        </Button>
      </div>

      <Tabs value={uploadMethod} onValueChange={setUploadMethod} className="space-y-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="file" className="flex items-center gap-2">
            <Upload className="h-4 w-4" />
            Upload File
          </TabsTrigger>
          <TabsTrigger value="url" className="flex items-center gap-2">
            <LinkIcon className="h-4 w-4" />
            Video URL
          </TabsTrigger>
        </TabsList>

        <TabsContent value="file" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Upload Video File</CardTitle>
              <CardDescription>Upload a video file from your computer</CardDescription>
            </CardHeader>
            <CardContent>
              <div
                className={`border-2 border-dashed rounded-lg p-12 text-center ${uploadError ? "border-red-300 bg-red-50" : "border-gray-300 hover:border-primary/50 hover:bg-gray-50"}`}
                onDrop={handleDrop}
                onDragOver={handleDragOver}
              >
                {videoFile ? (
                  <div className="space-y-4">
                    <div className="w-full aspect-video bg-gray-100 rounded-md overflow-hidden relative">
                      {thumbnailUrl && (
                        <img
                          src={thumbnailUrl || "/placeholder.svg"}
                          alt="Video thumbnail"
                          className="w-full h-full object-cover"
                        />
                      )}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-16 w-16 rounded-full bg-black/50 text-white hover:bg-black/70"
                        >
                          <Play className="h-8 w-8" />
                        </Button>
                      </div>
                    </div>
                    <div className="text-left">
                      <p className="font-medium">{videoFile.name}</p>
                      <p className="text-sm text-muted-foreground">{(videoFile.size / (1024 * 1024)).toFixed(2)} MB</p>
                    </div>
                    <Button variant="outline" onClick={resetForm}>
                      <X className="mr-2 h-4 w-4" />
                      Remove File
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="mx-auto w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center">
                      <Video className="h-8 w-8 text-gray-400" />
                    </div>
                    <div>
                      <p className="text-lg font-medium">Drag and drop your video file here</p>
                      <p className="text-sm text-muted-foreground mt-1">
                        Or click to browse files (MP4, MOV, or WebM up to 500MB)
                      </p>
                    </div>
                    <Button variant="outline" onClick={() => fileInputRef.current?.click()}>
                      <Upload className="mr-2 h-4 w-4" />
                      Select File
                    </Button>
                    <input
                      type="file"
                      ref={fileInputRef}
                      className="hidden"
                      accept="video/*"
                      onChange={handleFileChange}
                    />
                  </div>
                )}
                {uploadError && (
                  <div className="mt-4 text-red-600 flex items-center justify-center gap-2">
                    <AlertCircle className="h-4 w-4" />
                    <span>{uploadError}</span>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="url" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Add Video URL</CardTitle>
              <CardDescription>Add a video from YouTube, Vimeo, or other sources</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="video-url">Video URL</Label>
                  <Input
                    id="video-url"
                    placeholder="https://www.youtube.com/watch?v=..."
                    value={videoUrl}
                    onChange={handleUrlChange}
                  />
                  <p className="text-sm text-muted-foreground">
                    Supported platforms: YouTube, Vimeo, Wistia, and direct video URLs
                  </p>
                </div>

                {thumbnailUrl && (
                  <div className="w-full aspect-video bg-gray-100 rounded-md overflow-hidden relative">
                    <img
                      src={thumbnailUrl || "/placeholder.svg"}
                      alt="Video thumbnail"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-16 w-16 rounded-full bg-black/50 text-white hover:bg-black/70"
                      >
                        <Play className="h-8 w-8" />
                      </Button>
                    </div>
                  </div>
                )}

                {uploadError && (
                  <div className="text-red-600 flex items-center gap-2">
                    <AlertCircle className="h-4 w-4" />
                    <span>{uploadError}</span>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <Card>
          <CardHeader>
            <CardTitle>Video Details</CardTitle>
            <CardDescription>Add information about the video</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  placeholder="Enter video title"
                  value={videoTitle}
                  onChange={(e) => setVideoTitle(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Enter video description"
                  className="min-h-[120px]"
                  value={videoDescription}
                  onChange={(e) => setVideoDescription(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Select value={videoCategory} onValueChange={setVideoCategory}>
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

              <div className="flex items-center space-x-2">
                <Switch id="public" checked={isPublic} onCheckedChange={setIsPublic} />
                <Label htmlFor="public">Make video public</Label>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" onClick={resetForm}>
              Reset
            </Button>
            <Button onClick={handleUpload} disabled={isUploading}>
              {isUploading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Uploading... {uploadProgress}%
                </>
              ) : (
                <>
                  <Save className="mr-2 h-4 w-4" />
                  Upload Video
                </>
              )}
            </Button>
          </CardFooter>
        </Card>

        {isUploading && (
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div className="bg-primary h-2.5 rounded-full" style={{ width: `${uploadProgress}%` }}></div>
          </div>
        )}

        {uploadProgress === 100 && (
          <div className="flex items-center justify-center gap-2 text-green-600 bg-green-50 p-4 rounded-md border border-green-200">
            <CheckCircle2 className="h-5 w-5" />
            <span>Upload complete! Redirecting to video management...</span>
          </div>
        )}
      </Tabs>
    </div>
  )
}

