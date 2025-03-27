"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { toast } from "@/components/ui/use-toast"
import { Loader2, ArrowLeft, Video } from "lucide-react"
import AdminLayout from "@/components/admin/admin-layout"

// Mock video data
const mockVideo = {
  id: "video_1",
  title: "Biceps Brachii Function",
  description: "This video demonstrates the function and movement of the biceps brachii muscle.",
  muscleId: "muscle_1",
  muscleName: "Biceps Brachii",
  duration: "2:45",
  quality: "hd",
  isPublished: true,
  url: "https://example.com/videos/biceps-function.mp4",
  thumbnailUrl: "https://example.com/thumbnails/biceps-function.jpg",
  createdAt: "2023-05-15",
}

// Mock muscles data
const mockMuscles = [
  { id: "muscle_1", name: "Biceps Brachii" },
  { id: "muscle_2", name: "Triceps Brachii" },
  { id: "muscle_3", name: "Deltoid" },
  { id: "muscle_4", name: "Quadriceps" },
]

export default function DuplicateVideoPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const videoId = params.id

  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    muscleId: "",
    quality: "hd",
    isPublished: false,
  })

  useEffect(() => {
    // Simulate fetching video data
    const fetchVideo = async () => {
      try {
        // In a real app, this would be an API call
        await new Promise((resolve) => setTimeout(resolve, 1000))

        // Populate form with video data but change the title to indicate it's a copy
        setFormData({
          title: `${mockVideo.title} (Copy)`,
          description: mockVideo.description,
          muscleId: mockVideo.muscleId,
          quality: mockVideo.quality as "hd",
          isPublished: false, // Default to unpublished for the copy
        })
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to load video data. Please try again.",
          variant: "destructive",
        })
      } finally {
        setIsLoading(false)
      }
    }

    fetchVideo()
  }, [videoId])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSwitchChange = (name: string, checked: boolean) => {
    setFormData((prev) => ({ ...prev, [name]: checked }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.title.trim()) {
      toast({
        title: "Error",
        description: "Video title is required",
        variant: "destructive",
      })
      return
    }

    if (!formData.muscleId) {
      toast({
        title: "Error",
        description: "Please select a muscle",
        variant: "destructive",
      })
      return
    }

    setIsSaving(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      toast({
        title: "Video duplicated",
        description: `Video "${formData.title}" has been created successfully.`,
      })

      router.push("/admin/videos")
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to duplicate video. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSaving(false)
    }
  }

  if (isLoading) {
    return (
      <AdminLayout>
        <div className="container mx-auto py-6">
          <div className="flex items-center justify-center min-h-[60vh]">
            <Loader2 className="h-8 w-8 animate-spin" />
          </div>
        </div>
      </AdminLayout>
    )
  }

  return (
    <AdminLayout>
      <div className="container mx-auto py-6">
        <div className="flex items-center mb-6">
          <Button variant="ghost" size="sm" onClick={() => router.back()} className="mr-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          <h1 className="text-3xl font-bold">Duplicate Video</h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Video Information</CardTitle>
                <CardDescription>Create a duplicate of the selected video with new settings</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Video Title</Label>
                    <Input id="title" name="title" value={formData.title} onChange={handleInputChange} />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      className="min-h-[100px]"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="muscleId">Associated Muscle</Label>
                    <Select value={formData.muscleId} onValueChange={(value) => handleSelectChange("muscleId", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select muscle" />
                      </SelectTrigger>
                      <SelectContent>
                        {mockMuscles.map((muscle) => (
                          <SelectItem key={muscle.id} value={muscle.id}>
                            {muscle.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="quality">Video Quality</Label>
                    <Select value={formData.quality} onValueChange={(value) => handleSelectChange("quality", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select quality" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="sd">Standard Definition (SD)</SelectItem>
                        <SelectItem value="hd">High Definition (HD)</SelectItem>
                        <SelectItem value="4k">Ultra HD (4K)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="isPublished">Published Status</Label>
                      <p className="text-sm text-muted-foreground">Make this video visible to users</p>
                    </div>
                    <Switch
                      id="isPublished"
                      checked={formData.isPublished}
                      onCheckedChange={(checked) => handleSwitchChange("isPublished", checked)}
                    />
                  </div>
                </form>
              </CardContent>
              <CardFooter>
                <Button type="submit" onClick={handleSubmit} disabled={isSaving} className="ml-auto">
                  {isSaving ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Duplicating...
                    </>
                  ) : (
                    "Duplicate Video"
                  )}
                </Button>
              </CardFooter>
            </Card>
          </div>

          <div>
            <Card>
              <CardHeader>
                <CardTitle>Original Video</CardTitle>
                <CardDescription>Source video being duplicated</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="aspect-video bg-muted rounded-md flex items-center justify-center">
                    <Video className="h-12 w-12 text-muted-foreground" />
                  </div>

                  <div>
                    <h3 className="font-medium">{mockVideo.title}</h3>
                    <p className="text-sm text-muted-foreground mt-1">Muscle: {mockVideo.muscleName}</p>
                    <p className="text-sm text-muted-foreground">Duration: {mockVideo.duration}</p>
                    <p className="text-sm text-muted-foreground">Created: {mockVideo.createdAt}</p>
                  </div>

                  <div className="text-sm">
                    <p className="text-muted-foreground">{mockVideo.description}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </AdminLayout>
  )
}

