"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { toast } from "@/components/ui/use-toast"
import { Loader2, ArrowLeft, Upload, X } from "lucide-react"
import AdminLayout from "@/components/admin/admin-layout"

export default function AddMusclePage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    latinName: "",
    category: "upper",
    description: "",
    isActive: true,
    isPublished: false,
  })

  const [modelFile, setModelFile] = useState<File | null>(null)
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [videoFile, setVideoFile] = useState<File | null>(null)

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

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, fileType: "model" | "image" | "video") => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]

      switch (fileType) {
        case "model":
          setModelFile(file)
          break
        case "image":
          setImageFile(file)
          break
        case "video":
          setVideoFile(file)
          break
      }
    }
  }

  const handleRemoveFile = (fileType: "model" | "image" | "video") => {
    switch (fileType) {
      case "model":
        setModelFile(null)
        break
      case "image":
        setImageFile(null)
        break
      case "video":
        setVideoFile(null)
        break
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.name.trim()) {
      toast({
        title: "Error",
        description: "Muscle name is required",
        variant: "destructive",
      })
      return
    }

    if (!modelFile) {
      toast({
        title: "Error",
        description: "3D model file is required",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000))

      toast({
        title: "Muscle created",
        description: `Muscle ${formData.name} has been created successfully.`,
      })

      router.push("/admin/muscles")
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create muscle. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <AdminLayout>
      <div className="container mx-auto py-6">
        <div className="flex items-center mb-6">
          <Button variant="ghost" size="sm" onClick={() => router.back()} className="mr-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          <h1 className="text-3xl font-bold">Add New Muscle</h1>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Muscle Information</CardTitle>
            <CardDescription>Add a new muscle to the anatomy explorer</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Muscle Name</Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Biceps Brachii"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="latinName">Latin Name</Label>
                  <Input
                    id="latinName"
                    name="latinName"
                    value={formData.latinName}
                    onChange={handleInputChange}
                    placeholder="Biceps brachii"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Select value={formData.category} onValueChange={(value) => handleSelectChange("category", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="upper">Upper Body</SelectItem>
                      <SelectItem value="lower">Lower Body</SelectItem>
                      <SelectItem value="core">Core</SelectItem>
                      <SelectItem value="head">Head & Neck</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    placeholder="Enter muscle description..."
                    className="min-h-[100px]"
                  />
                </div>

                <div className="space-y-2">
                  <Label>3D Model File</Label>
                  {modelFile ? (
                    <div className="flex items-center justify-between p-2 border rounded-md">
                      <span className="text-sm truncate max-w-[200px]">{modelFile.name}</span>
                      <Button size="sm" variant="ghost" onClick={() => handleRemoveFile("model")}>
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center p-4 border border-dashed rounded-md">
                      <label className="flex flex-col items-center justify-center cursor-pointer">
                        <Upload className="h-6 w-6 mb-2" />
                        <span className="text-sm">Upload 3D model (GLB/GLTF)</span>
                        <input
                          type="file"
                          accept=".glb,.gltf"
                          className="hidden"
                          onChange={(e) => handleFileChange(e, "model")}
                        />
                      </label>
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <Label>Thumbnail Image</Label>
                  {imageFile ? (
                    <div className="flex items-center justify-between p-2 border rounded-md">
                      <span className="text-sm truncate max-w-[200px]">{imageFile.name}</span>
                      <Button size="sm" variant="ghost" onClick={() => handleRemoveFile("image")}>
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center p-4 border border-dashed rounded-md">
                      <label className="flex flex-col items-center justify-center cursor-pointer">
                        <Upload className="h-6 w-6 mb-2" />
                        <span className="text-sm">Upload image (JPG/PNG)</span>
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => handleFileChange(e, "image")}
                        />
                      </label>
                    </div>
                  )}
                </div>

                <div className="space-y-2 md:col-span-2">
                  <Label>Video File (Optional)</Label>
                  {videoFile ? (
                    <div className="flex items-center justify-between p-2 border rounded-md">
                      <span className="text-sm truncate max-w-[200px]">{videoFile.name}</span>
                      <Button size="sm" variant="ghost" onClick={() => handleRemoveFile("video")}>
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center p-4 border border-dashed rounded-md">
                      <label className="flex flex-col items-center justify-center cursor-pointer">
                        <Upload className="h-6 w-6 mb-2" />
                        <span className="text-sm">Upload video (MP4)</span>
                        <input
                          type="file"
                          accept="video/mp4"
                          className="hidden"
                          onChange={(e) => handleFileChange(e, "video")}
                        />
                      </label>
                    </div>
                  )}
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="isActive">Active Status</Label>
                    <p className="text-sm text-muted-foreground">Make this muscle available in the explorer</p>
                  </div>
                  <Switch
                    id="isActive"
                    checked={formData.isActive}
                    onCheckedChange={(checked) => handleSwitchChange("isActive", checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="isPublished">Published Status</Label>
                    <p className="text-sm text-muted-foreground">Make this muscle visible to users</p>
                  </div>
                  <Switch
                    id="isPublished"
                    checked={formData.isPublished}
                    onCheckedChange={(checked) => handleSwitchChange("isPublished", checked)}
                  />
                </div>
              </div>
            </form>
          </CardContent>
          <CardFooter>
            <Button type="submit" onClick={handleSubmit} disabled={isLoading} className="ml-auto">
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creating...
                </>
              ) : (
                "Create Muscle"
              )}
            </Button>
          </CardFooter>
        </Card>
      </div>
    </AdminLayout>
  )
}

