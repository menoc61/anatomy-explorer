"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useAuth } from "@/contexts/auth-context"
import { Cloud, Database, FileUp, HardDrive, Upload } from "lucide-react"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"

export default function ContentStorageManager() {
  const { user } = useAuth()
  const { toast } = useToast()
  const [selectedStorage, setSelectedStorage] = useState<string>("vercel-blob")
  const [isUploading, setIsUploading] = useState(false)

  const isAdmin = user?.role === "admin"

  const handleUpload = async () => {
    setIsUploading(true)

    // Simulate upload
    await new Promise((resolve) => setTimeout(resolve, 2000))

    toast({
      title: "File uploaded successfully",
      description: "Your file has been uploaded to the selected storage provider.",
      duration: 3000,
    })

    setIsUploading(false)
  }

  if (!isAdmin) {
    return (
      <div className="p-4 border rounded-md bg-muted/30">
        <p className="text-sm text-muted-foreground">
          You don't have permission to manage content storage. Please contact an administrator.
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <Tabs defaultValue="upload" className="w-full">
        <TabsList className="w-full justify-start bg-transparent">
          <TabsTrigger
            value="upload"
            className="rounded-md data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
          >
            Upload Content
          </TabsTrigger>
          <TabsTrigger
            value="manage"
            className="rounded-md data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
          >
            Manage Storage
          </TabsTrigger>
          <TabsTrigger
            value="configure"
            className="rounded-md data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
          >
            Configure
          </TabsTrigger>
        </TabsList>

        <TabsContent value="upload" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Upload Content</CardTitle>
              <CardDescription>Upload images, videos, and other content for the anatomy explorer</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="storage-provider">Storage Provider</Label>
                  <Select value={selectedStorage} onValueChange={setSelectedStorage}>
                    <SelectTrigger id="storage-provider">
                      <SelectValue placeholder="Select a storage provider" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="vercel-blob">
                        <div className="flex items-center">
                          <Cloud className="h-4 w-4 mr-2" />
                          Vercel Blob
                        </div>
                      </SelectItem>
                      <SelectItem value="s3">
                        <div className="flex items-center">
                          <Database className="h-4 w-4 mr-2" />
                          Amazon S3
                        </div>
                      </SelectItem>
                      <SelectItem value="supabase">
                        <div className="flex items-center">
                          <Database className="h-4 w-4 mr-2" />
                          Supabase Storage
                        </div>
                      </SelectItem>
                      <SelectItem value="local">
                        <div className="flex items-center">
                          <HardDrive className="h-4 w-4 mr-2" />
                          Local Storage
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="content-type">Content Type</Label>
                  <Select defaultValue="image">
                    <SelectTrigger id="content-type">
                      <SelectValue placeholder="Select content type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="image">Image</SelectItem>
                      <SelectItem value="video">Video</SelectItem>
                      <SelectItem value="pdf">PDF Document</SelectItem>
                      <SelectItem value="model">3D Model</SelectItem>
                      <SelectItem value="audio">Audio</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="category">Category</Label>
                  <Select defaultValue="muscle">
                    <SelectTrigger id="category">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="muscle">Muscle</SelectItem>
                      <SelectItem value="bone">Bone</SelectItem>
                      <SelectItem value="organ">Organ</SelectItem>
                      <SelectItem value="system">Body System</SelectItem>
                      <SelectItem value="condition">Medical Condition</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="associated-item">Associated Item</Label>
                  <Select defaultValue="biceps">
                    <SelectTrigger id="associated-item">
                      <SelectValue placeholder="Select item" />
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

                <div className="grid gap-2">
                  <Label>File Upload</Label>
                  <div className="border-2 border-dashed rounded-md p-6 flex flex-col items-center justify-center">
                    <FileUp className="h-8 w-8 mb-2 text-muted-foreground" />
                    <div className="text-sm text-center text-muted-foreground mb-4">
                      <p className="font-medium">Click to upload or drag and drop</p>
                      <p>SVG, PNG, JPG, GIF, MP4, PDF, GLB, or MP3 (max 10MB)</p>
                    </div>
                    <Button>
                      <Upload className="h-4 w-4 mr-2" />
                      Select File
                    </Button>
                  </div>
                </div>

                <div className="grid gap-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="is-premium">Premium Content</Label>
                    <Switch id="is-premium" />
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Mark as premium to restrict access to premium subscribers only
                  </p>
                </div>
              </div>
            </CardContent>
            <CardFooter className="justify-between">
              <Button variant="outline">Cancel</Button>
              <Button onClick={handleUpload} disabled={isUploading}>
                {isUploading ? "Uploading..." : "Upload Content"}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="manage" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Manage Storage</CardTitle>
              <CardDescription>View and manage your uploaded content</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-center h-[300px] border rounded-md bg-muted/10">
                <div className="text-center">
                  <Database className="h-10 w-10 mx-auto mb-4 text-muted-foreground" />
                  <h3 className="text-lg font-medium mb-1">Content Management</h3>
                  <p className="text-sm text-muted-foreground max-w-md">
                    The content management interface allows you to browse, search, and manage all uploaded files across
                    different storage providers.
                  </p>
                  <Button className="mt-4" onClick={() => (window.location.href = "/admin/content-storage")}>
                    Open Content Management
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="configure" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Storage Configuration</CardTitle>
              <CardDescription>Configure storage providers and permissions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-center h-[300px] border rounded-md bg-muted/10">
                <div className="text-center">
                  <HardDrive className="h-10 w-10 mx-auto mb-4 text-muted-foreground" />
                  <h3 className="text-lg font-medium mb-1">Storage Providers</h3>
                  <p className="text-sm text-muted-foreground max-w-md">
                    Configure multiple storage providers, set up access permissions, and manage content distribution
                    settings.
                  </p>
                  <Button className="mt-4" onClick={() => (window.location.href = "/admin/content-storage")}>
                    Configure Storage
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

