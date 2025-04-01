"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Loader2, Save, Database, Cloud, HardDrive } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { useAuth } from "@/contexts/auth-context"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function ContentStoragePage() {
  const { user } = useAuth()
  const { toast } = useToast()
  const [activeTab, setActiveTab] = useState("general")
  const [isSaving, setIsSaving] = useState(false)

  const [storageConfig, setStorageConfig] = useState({
    provider: "vercel-blob",
    imageOptimization: true,
    cacheControl: "public, max-age=31536000, immutable",
    imageFormats: ["webp", "avif", "jpg"],
    maxFileSize: 10, // in MB
    contentTypes: {
      images: true,
      videos: true,
      documents: true,
      audio: false,
      models: true,
    },
  })

  const [blobConfig, setBlobConfig] = useState({
    readWriteToken: "",
    storeId: "",
    region: "auto",
  })

  const [s3Config, setS3Config] = useState({
    accessKeyId: "",
    secretAccessKey: "",
    region: "us-east-1",
    bucket: "",
    endpoint: "",
  })

  const [supabaseConfig, setSupabaseConfig] = useState({
    projectUrl: "",
    apiKey: "",
    bucketName: "content",
  })

  // Only allow admin to access
  const isAdmin = user?.role === "admin"

  const handleSaveConfig = async () => {
    setIsSaving(true)
    try {
      // Actual API call would go here
      toast({
        title: "Storage configuration saved",
        description: "Your content storage settings have been updated successfully.",
        duration: 3000,
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save storage configuration",
        variant: "destructive",
      })
    } finally {
      setIsSaving(false)
    }
  }

  if (!isAdmin) {
    return (
      <div className="container py-10">
        <h1 className="text-2xl font-bold">Access Denied</h1>
        <p className="text-muted-foreground mt-2">You don't have permission to configure content storage.</p>
      </div>
    )
  }

  return (
    <div className="container py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Content Storage Configuration</h1>
        <p className="text-muted-foreground mt-2">Configure where and how to store content for your anatomy explorer</p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="w-full justify-start overflow-x-auto">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="vercel-blob">Vercel Blob</TabsTrigger>
          <TabsTrigger value="s3">Amazon S3</TabsTrigger>
          <TabsTrigger value="supabase">Supabase</TabsTrigger>
          <TabsTrigger value="local">Local Storage</TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>General Storage Settings</CardTitle>
              <CardDescription>Configure global content storage settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="provider">Default Storage Provider</Label>
                  <Select
                    value={storageConfig.provider}
                    onValueChange={(value) => setStorageConfig({ ...storageConfig, provider: value })}
                  >
                    <SelectTrigger id="provider">
                      <SelectValue placeholder="Select provider" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="vercel-blob">Vercel Blob</SelectItem>
                      <SelectItem value="s3">Amazon S3</SelectItem>
                      <SelectItem value="supabase">Supabase Storage</SelectItem>
                      <SelectItem value="local">Local File System</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="max-file-size">Maximum File Size (MB)</Label>
                  <Input
                    id="max-file-size"
                    type="number"
                    value={storageConfig.maxFileSize}
                    onChange={(e) =>
                      setStorageConfig({
                        ...storageConfig,
                        maxFileSize: Number.parseInt(e.target.value) || 10,
                      })
                    }
                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="cache-control">Cache Control</Label>
                  <Input
                    id="cache-control"
                    value={storageConfig.cacheControl}
                    onChange={(e) => setStorageConfig({ ...storageConfig, cacheControl: e.target.value })}
                  />
                  <p className="text-xs text-muted-foreground">HTTP cache control header for stored content</p>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="image-optimization">Image Optimization</Label>
                    <p className="text-sm text-muted-foreground">Automatically optimize images on upload</p>
                  </div>
                  <Switch
                    id="image-optimization"
                    checked={storageConfig.imageOptimization}
                    onCheckedChange={(checked) => setStorageConfig({ ...storageConfig, imageOptimization: checked })}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Allowed Content Types</Label>
                  <div className="grid grid-cols-2 gap-4 mt-2">
                    <div className="flex items-center space-x-2">
                      <Switch
                        id="allow-images"
                        checked={storageConfig.contentTypes.images}
                        onCheckedChange={(checked) =>
                          setStorageConfig({
                            ...storageConfig,
                            contentTypes: { ...storageConfig.contentTypes, images: checked },
                          })
                        }
                      />
                      <Label htmlFor="allow-images">Images</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch
                        id="allow-videos"
                        checked={storageConfig.contentTypes.videos}
                        onCheckedChange={(checked) =>
                          setStorageConfig({
                            ...storageConfig,
                            contentTypes: { ...storageConfig.contentTypes, videos: checked },
                          })
                        }
                      />
                      <Label htmlFor="allow-videos">Videos</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch
                        id="allow-documents"
                        checked={storageConfig.contentTypes.documents}
                        onCheckedChange={(checked) =>
                          setStorageConfig({
                            ...storageConfig,
                            contentTypes: { ...storageConfig.contentTypes, documents: checked },
                          })
                        }
                      />
                      <Label htmlFor="allow-documents">Documents</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch
                        id="allow-audio"
                        checked={storageConfig.contentTypes.audio}
                        onCheckedChange={(checked) =>
                          setStorageConfig({
                            ...storageConfig,
                            contentTypes: { ...storageConfig.contentTypes, audio: checked },
                          })
                        }
                      />
                      <Label htmlFor="allow-audio">Audio</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch
                        id="allow-models"
                        checked={storageConfig.contentTypes.models}
                        onCheckedChange={(checked) =>
                          setStorageConfig({
                            ...storageConfig,
                            contentTypes: { ...storageConfig.contentTypes, models: checked },
                          })
                        }
                      />
                      <Label htmlFor="allow-models">3D Models</Label>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleSaveConfig} disabled={isSaving}>
                {isSaving ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="mr-2 h-4 w-4" />
                    Save Settings
                  </>
                )}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="vercel-blob" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Cloud className="h-5 w-5 text-muted-foreground" />
                <div>
                  <CardTitle>Vercel Blob Storage</CardTitle>
                  <CardDescription>Configure Vercel Blob for serverless content storage</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="blob-token">Blob Read/Write Token</Label>
                  <Input
                    id="blob-token"
                    type="password"
                    value={blobConfig.readWriteToken}
                    onChange={(e) => setBlobConfig({ ...blobConfig, readWriteToken: e.target.value })}
                  />
                  <p className="text-xs text-muted-foreground">
                    Create this in your Vercel dashboard under Project Settings → Storage
                  </p>
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="blob-store-id">Store ID (Optional)</Label>
                  <Input
                    id="blob-store-id"
                    value={blobConfig.storeId}
                    onChange={(e) => setBlobConfig({ ...blobConfig, storeId: e.target.value })}
                    placeholder="Optional, auto-generated if blank"
                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="blob-region">Region</Label>
                  <Select
                    value={blobConfig.region}
                    onValueChange={(value) => setBlobConfig({ ...blobConfig, region: value })}
                  >
                    <SelectTrigger id="blob-region">
                      <SelectValue placeholder="Select region" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="auto">Auto (recommended)</SelectItem>
                      <SelectItem value="iad1">US East (N. Virginia)</SelectItem>
                      <SelectItem value="sfo1">US West (San Francisco)</SelectItem>
                      <SelectItem value="sin1">Asia Pacific (Singapore)</SelectItem>
                      <SelectItem value="fra1">EU (Frankfurt)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center justify-between pt-4">
                  <Button variant="outline">Test Connection</Button>
                  <Button>Upload Test File</Button>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleSaveConfig} disabled={isSaving}>
                {isSaving ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="mr-2 h-4 w-4" />
                    Save Settings
                  </>
                )}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="s3" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Database className="h-5 w-5 text-muted-foreground" />
                <div>
                  <CardTitle>Amazon S3 Storage</CardTitle>
                  <CardDescription>Configure Amazon S3 or compatible storage service</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="s3-access-key">Access Key ID</Label>
                    <Input
                      id="s3-access-key"
                      value={s3Config.accessKeyId}
                      onChange={(e) => setS3Config({ ...s3Config, accessKeyId: e.target.value })}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="s3-secret-key">Secret Access Key</Label>
                    <Input
                      id="s3-secret-key"
                      type="password"
                      value={s3Config.secretAccessKey}
                      onChange={(e) => setS3Config({ ...s3Config, secretAccessKey: e.target.value })}
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="s3-region">Region</Label>
                    <Select
                      value={s3Config.region}
                      onValueChange={(value) => setS3Config({ ...s3Config, region: value })}
                    >
                      <SelectTrigger id="s3-region">
                        <SelectValue placeholder="Select region" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="us-east-1">US East (N. Virginia)</SelectItem>
                        <SelectItem value="us-east-2">US East (Ohio)</SelectItem>
                        <SelectItem value="us-west-1">US West (N. California)</SelectItem>
                        <SelectItem value="us-west-2">US West (Oregon)</SelectItem>
                        <SelectItem value="eu-west-1">EU (Ireland)</SelectItem>
                        <SelectItem value="eu-central-1">EU (Frankfurt)</SelectItem>
                        <SelectItem value="ap-south-1">Asia Pacific (Mumbai)</SelectItem>
                        <SelectItem value="ap-northeast-1">Asia Pacific (Tokyo)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="s3-bucket">Bucket Name</Label>
                    <Input
                      id="s3-bucket"
                      value={s3Config.bucket}
                      onChange={(e) => setS3Config({ ...s3Config, bucket: e.target.value })}
                    />
                  </div>
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="s3-endpoint">Custom Endpoint (Optional)</Label>
                  <Input
                    id="s3-endpoint"
                    value={s3Config.endpoint}
                    onChange={(e) => setS3Config({ ...s3Config, endpoint: e.target.value })}
                    placeholder="For S3-compatible services like MinIO or DigitalOcean Spaces"
                  />
                  <p className="text-xs text-muted-foreground">
                    Leave blank for Amazon S3. Use a full URL for S3-compatible services (e.g.
                    https://nyc3.digitaloceanspaces.com)
                  </p>
                </div>

                <div className="flex items-center justify-between pt-4">
                  <Button variant="outline">Test Connection</Button>
                  <Button>Upload Test File</Button>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleSaveConfig} disabled={isSaving}>
                {isSaving ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="mr-2 h-4 w-4" />
                    Save Settings
                  </>
                )}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="supabase" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Database className="h-5 w-5 text-muted-foreground" />
                <div>
                  <CardTitle>Supabase Storage</CardTitle>
                  <CardDescription>Configure Supabase Storage for content</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="supabase-url">Project URL</Label>
                  <Input
                    id="supabase-url"
                    value={supabaseConfig.projectUrl}
                    onChange={(e) => setSupabaseConfig({ ...supabaseConfig, projectUrl: e.target.value })}
                    placeholder="https://your-project.supabase.co"
                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="supabase-key">API Key</Label>
                  <Input
                    id="supabase-key"
                    type="password"
                    value={supabaseConfig.apiKey}
                    onChange={(e) => setSupabaseConfig({ ...supabaseConfig, apiKey: e.target.value })}
                  />
                  <p className="text-xs text-muted-foreground">
                    Use the anon public key for client-side access or service role key for server operations
                  </p>
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="supabase-bucket">Bucket Name</Label>
                  <Input
                    id="supabase-bucket"
                    value={supabaseConfig.bucketName}
                    onChange={(e) => setSupabaseConfig({ ...supabaseConfig, bucketName: e.target.value })}
                    placeholder="content"
                  />
                </div>

                <div className="flex items-center justify-between pt-4">
                  <Button variant="outline">Test Connection</Button>
                  <Button>Upload Test File</Button>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleSaveConfig} disabled={isSaving}>
                {isSaving ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="mr-2 h-4 w-4" />
                    Save Settings
                  </>
                )}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="local" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <HardDrive className="h-5 w-5 text-muted-foreground" />
                <div>
                  <CardTitle>Local File Storage</CardTitle>
                  <CardDescription>
                    Configure local file system storage (not recommended for production)
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="p-4 bg-yellow-50 text-yellow-800 rounded-md border border-yellow-200">
                <h3 className="font-medium">Warning: Development Use Only</h3>
                <p className="text-sm mt-1">
                  Local file storage is intended for development purposes only. In production, files will be lost when
                  your application is redeployed. We strongly recommend using Vercel Blob, S3, or Supabase for
                  production.
                </p>
              </div>

              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="local-path">Storage Directory</Label>
                  <Input id="local-path" value="./public/uploads" readOnly />
                  <p className="text-xs text-muted-foreground">
                    Files will be stored in the public directory and accessible via the /uploads path
                  </p>
                </div>

                <div className="flex items-center justify-between pt-4">
                  <Button variant="outline">Check Permissions</Button>
                  <Button>Upload Test File</Button>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleSaveConfig} disabled={isSaving}>
                {isSaving ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="mr-2 h-4 w-4" />
                    Save Settings
                  </>
                )}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
