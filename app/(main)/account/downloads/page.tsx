"use client"

import { useState, useEffect } from "react"
import { useAuth } from "@/contexts/auth-context"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Download,
  Trash2,
  FileText,
  Video,
  Play,
  Search,
  Filter,
  SortDesc,
  CheckCircle2,
  XCircle,
  AlertCircle,
  RefreshCw,
  WifiOff,
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

// Mock download history
const mockDownloads = [
  {
    id: "dl-1",
    title: "Biceps Anatomy Overview",
    type: "video",
    date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    size: "45.2 MB",
    isOfflineAvailable: true,
    path: "/videos/biceps-anatomy.mp4",
    muscleId: "biceps",
    thumbnail: "/placeholder.svg?height=300&width=500",
  },
  {
    id: "dl-2",
    title: "Quadriceps Function & Movement",
    type: "video",
    date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    size: "62.8 MB",
    isOfflineAvailable: true,
    path: "/videos/quadriceps-function.mp4",
    muscleId: "quadriceps",
    thumbnail: "/placeholder.svg?height=300&width=500",
  },
  {
    id: "dl-3",
    title: "Biceps Brachii - Detailed Anatomy",
    type: "pdf",
    date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    size: "3.4 MB",
    isOfflineAvailable: true,
    path: "/pdfs/biceps-anatomy.pdf",
    muscleId: "biceps",
  },
  {
    id: "dl-4",
    title: "Deltoid Muscle - Exercise Guide",
    type: "pdf",
    date: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
    size: "2.8 MB",
    isOfflineAvailable: false,
    path: "/pdfs/deltoid-exercises.pdf",
    muscleId: "deltoids",
  },
  {
    id: "dl-5",
    title: "Abdominal Muscles Explained",
    type: "video",
    date: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000).toISOString(),
    size: "58.1 MB",
    isOfflineAvailable: false,
    path: "/videos/abdominals-explained.mp4",
    muscleId: "abdominals",
    thumbnail: "/placeholder.svg?height=300&width=500",
  },
]

export default function DownloadsPage() {
  const { user } = useAuth()
  const { toast } = useToast()
  const [downloads, setDownloads] = useState(mockDownloads)
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState("all")
  const [isOnline, setIsOnline] = useState(true)
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [autoDownload, setAutoDownload] = useState(true)
  const [offlineOnly, setOfflineOnly] = useState(false)

  // Check online status
  useEffect(() => {
    const handleOnlineStatus = () => {
      setIsOnline(navigator.onLine)
    }

    window.addEventListener("online", handleOnlineStatus)
    window.addEventListener("offline", handleOnlineStatus)

    // Initial check
    setIsOnline(navigator.onLine)

    return () => {
      window.removeEventListener("online", handleOnlineStatus)
      window.removeEventListener("offline", handleOnlineStatus)
    }
  }, [])

  // Filter downloads based on search and tab
  const filteredDownloads = downloads.filter((download) => {
    // Search filter
    const matchesSearch = download.title.toLowerCase().includes(searchQuery.toLowerCase())

    // Tab filter
    if (activeTab === "all") return matchesSearch
    if (activeTab === "videos") return matchesSearch && download.type === "video"
    if (activeTab === "documents") return matchesSearch && download.type === "pdf"
    if (activeTab === "offline") return matchesSearch && download.isOfflineAvailable

    return matchesSearch
  })

  // Format date
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString()
  }

  // Handle delete download
  const handleDelete = (id: string) => {
    setDownloads(downloads.filter((download) => download.id !== id))
    toast({
      title: "Download removed",
      description: "The download has been removed from your device.",
      duration: 3000,
    })
  }

  // Handle toggle offline availability
  const handleToggleOffline = (id: string) => {
    setDownloads(
      downloads.map((download) =>
        download.id === id ? { ...download, isOfflineAvailable: !download.isOfflineAvailable } : download,
      ),
    )

    const download = downloads.find((d) => d.id === id)
    if (download) {
      toast({
        title: download.isOfflineAvailable ? "Removed from offline storage" : "Saved for offline use",
        description: download.isOfflineAvailable
          ? "This content will no longer be available offline."
          : "This content will now be available when you're offline.",
        duration: 3000,
      })
    }
  }

  // Handle refresh downloads
  const handleRefresh = async () => {
    setIsRefreshing(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    toast({
      title: "Downloads refreshed",
      description: "Your download list has been updated.",
      duration: 3000,
    })

    setIsRefreshing(false)
  }

  // Handle play/open
  const handleOpen = (download: (typeof mockDownloads)[0]) => {
    if (!isOnline && !download.isOfflineAvailable) {
      toast({
        title: "Offline access unavailable",
        description: "This content is not available offline. Please connect to the internet.",
        variant: "destructive",
        duration: 3000,
      })
      return
    }

    toast({
      title: download.type === "video" ? "Playing video" : "Opening document",
      description: `Opening ${download.title}`,
      duration: 3000,
    })
  }

  return (
    <div className="container max-w-6xl py-10">
      <div className="flex flex-col md:flex-row justify-between items-start gap-6 mb-8">
        <div>
          <h1 className="text-3xl font-bold">My Downloads</h1>
          <p className="text-muted-foreground mt-2">Manage your downloaded content for offline access</p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <Button variant="outline" onClick={handleRefresh} disabled={isRefreshing}>
            {isRefreshing ? (
              <>
                <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                Refreshing...
              </>
            ) : (
              <>
                <RefreshCw className="mr-2 h-4 w-4" />
                Refresh
              </>
            )}
          </Button>

          {!isOnline && (
            <Button variant="destructive">
              <WifiOff className="mr-2 h-4 w-4" />
              Offline Mode
            </Button>
          )}
        </div>
      </div>

      {!isOnline && (
        <Alert className="mb-6 bg-amber-50 text-amber-800 border-amber-200">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>You are offline</AlertTitle>
          <AlertDescription>
            Only content saved for offline use will be available. Connect to the internet to access all your content.
          </AlertDescription>
        </Alert>
      )}

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Download Settings</CardTitle>
          <CardDescription>Configure how downloads are managed on your device</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-2">
            <div className="flex items-center justify-between space-x-2">
              <div>
                <Label htmlFor="auto-download" className="font-medium">
                  Automatic Downloads
                </Label>
                <p className="text-sm text-muted-foreground">Automatically download new premium content</p>
              </div>
              <Switch id="auto-download" checked={autoDownload} onCheckedChange={setAutoDownload} />
            </div>

            <div className="flex items-center justify-between space-x-2">
              <div>
                <Label htmlFor="offline-only" className="font-medium">
                  Show Offline Content Only
                </Label>
                <p className="text-sm text-muted-foreground">Only show content available offline</p>
              </div>
              <Switch id="offline-only" checked={offlineOnly} onCheckedChange={setOfflineOnly} />
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search downloads..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-8"
          />
        </div>

        <Button variant="outline" className="md:w-auto w-full">
          <Filter className="mr-2 h-4 w-4" />
          Filter
        </Button>

        <Button variant="outline" className="md:w-auto w-full">
          <SortDesc className="mr-2 h-4 w-4" />
          Sort
        </Button>
      </div>

      <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList>
          <TabsTrigger value="all">All Downloads</TabsTrigger>
          <TabsTrigger value="videos">Videos</TabsTrigger>
          <TabsTrigger value="documents">Documents</TabsTrigger>
          <TabsTrigger value="offline">Offline Available</TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className="space-y-6">
          {filteredDownloads.length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-10">
                <Download className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium mb-2">No downloads found</h3>
                <p className="text-muted-foreground text-center max-w-md">
                  {searchQuery
                    ? "No downloads match your search criteria. Try a different search term."
                    : "You haven't downloaded any content yet. Premium content can be downloaded for offline access."}
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-4">
              {filteredDownloads.map((download) => (
                <Card key={download.id} className="overflow-hidden">
                  <div className="flex flex-col md:flex-row">
                    {download.type === "video" && download.thumbnail && (
                      <div className="md:w-48 h-32 md:h-auto bg-muted">
                        <img
                          src={download.thumbnail || "/placeholder.svg"}
                          alt={download.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}

                    <div className="flex-1 p-4">
                      <div className="flex flex-col md:flex-row justify-between">
                        <div>
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="font-medium">{download.title}</h3>
                            <Badge variant={download.isOfflineAvailable ? "default" : "outline"}>
                              {download.isOfflineAvailable ? "Offline" : "Online Only"}
                            </Badge>
                          </div>

                          <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                            <div className="flex items-center">
                              {download.type === "video" ? (
                                <Video className="h-4 w-4 mr-1" />
                              ) : (
                                <FileText className="h-4 w-4 mr-1" />
                              )}
                              {download.type === "video" ? "Video" : "PDF"}
                            </div>
                            <div>{download.size}</div>
                            <div>Downloaded: {formatDate(download.date)}</div>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 mt-2 md:mt-0">
                          <Button variant="outline" size="sm" onClick={() => handleToggleOffline(download.id)}>
                            {download.isOfflineAvailable ? (
                              <>
                                <XCircle className="h-4 w-4 mr-1" /> Remove Offline
                              </>
                            ) : (
                              <>
                                <CheckCircle2 className="h-4 w-4 mr-1" /> Save Offline
                              </>
                            )}
                          </Button>

                          <Button variant="outline" size="sm" onClick={() => handleDelete(download.id)}>
                            <Trash2 className="h-4 w-4" />
                          </Button>

                          <Button
                            variant="default"
                            size="sm"
                            onClick={() => handleOpen(download)}
                            disabled={!isOnline && !download.isOfflineAvailable}
                          >
                            {download.type === "video" ? (
                              <>
                                <Play className="h-4 w-4 mr-1" /> Play
                              </>
                            ) : (
                              <>
                                <FileText className="h-4 w-4 mr-1" /> Open
                              </>
                            )}
                          </Button>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 mt-2">
                        <div
                          className={`w-3 h-3 rounded-full ${download.isOfflineAvailable ? "bg-green-500" : "bg-amber-500"}`}
                        ></div>
                        <span className="text-xs">
                          {download.isOfflineAvailable
                            ? "Available offline on this device"
                            : "Requires internet connection"}
                        </span>
                        {!isOnline && !download.isOfflineAvailable && (
                          <Badge variant="outline" className="text-red-500 border-red-200 ml-2">
                            <WifiOff className="h-3 w-3 mr-1" /> Not available offline
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}

