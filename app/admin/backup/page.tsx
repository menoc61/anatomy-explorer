"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import {
  HardDrive,
  Cloud,
  Calendar,
  Download,
  Upload,
  Loader2,
  CheckCircle2,
  Clock,
  Save,
  RefreshCw,
  FileText,
  AlertCircle,
  ChevronRight,
} from "lucide-react"

export default function BackupPage() {
  const [backupInProgress, setBackupInProgress] = useState(false)
  const [restoreInProgress, setRestoreInProgress] = useState(false)
  const [backupProgress, setBackupProgress] = useState(0)
  const [restoreProgress, setRestoreProgress] = useState(0)
  const [backupSchedule, setBackupSchedule] = useState("daily")
  const [backupTime, setBackupTime] = useState("02:00")
  const [autoBackup, setAutoBackup] = useState(true)
  const [selectedProvider, setSelectedProvider] = useState("google-drive")
  const [compressionEnabled, setCompressionEnabled] = useState(true)
  const [encryptionEnabled, setEncryptionEnabled] = useState(true)
  const [retentionPeriod, setRetentionPeriod] = useState("30")
  const { toast } = useToast()

  const handleBackup = async () => {
    setBackupInProgress(true)
    setBackupProgress(0)
    // Actual backup implementation would go here
    // This is now client-side only
    toast({
      title: "Backup started",
      description: "Backup process has begun.",
    })
  }

  const handleRestore = async () => {
    setRestoreInProgress(true)  
    setRestoreProgress(0)
    // Actual restore implementation would go here
    // This is now client-side only
    toast({
      title: "Restore started",
      description: "Restore process has begun.", 
    })
  }

  const handleConnectGoogleDrive = () => {
    // In a real app, this would open OAuth flow
    toast({
      title: "Google Drive connected",
      description: "Your Google Drive account has been successfully connected.",
    })
  }

  return (
    <div className="container py-10">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Backup & Restore</h1>
          <p className="text-muted-foreground mt-2">Manage backups of your anatomy explorer data and content</p>
        </div>
        <Button variant="outline" onClick={() => window.history.back()}>
          Back to Dashboard
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="md:col-span-2 space-y-6">
          <Tabs defaultValue="backup" className="space-y-6">
            <TabsList className="grid grid-cols-3">
              <TabsTrigger value="backup" className="flex items-center gap-2">
                <Upload className="h-4 w-4" />
                Backup
              </TabsTrigger>
              <TabsTrigger value="restore" className="flex items-center gap-2">
                <Download className="h-4 w-4" />
                Restore
              </TabsTrigger>
              <TabsTrigger value="schedule" className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                Schedule
              </TabsTrigger>
            </TabsList>

            <TabsContent value="backup" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Create Backup</CardTitle>
                  <CardDescription>Backup your data to the selected storage provider</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label>Backup Contents</Label>
                    <div className="grid gap-4 pt-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Switch id="database" defaultChecked />
                          <Label htmlFor="database">Database</Label>
                        </div>
                        <span className="text-sm text-muted-foreground">~45 MB</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Switch id="files" defaultChecked />
                          <Label htmlFor="files">Files & Media</Label>
                        </div>
                        <span className="text-sm text-muted-foreground">~2.3 GB</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Switch id="settings" defaultChecked />
                          <Label htmlFor="settings">Settings & Configuration</Label>
                        </div>
                        <span className="text-sm text-muted-foreground">~1 MB</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Switch id="user-data" defaultChecked />
                          <Label htmlFor="user-data">User Data</Label>
                        </div>
                        <span className="text-sm text-muted-foreground">~120 MB</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Backup Options</Label>
                    <div className="grid gap-4 pt-2">
                      <div className="flex items-center space-x-2">
                        <Switch id="compression" checked={compressionEnabled} onCheckedChange={setCompressionEnabled} />
                        <Label htmlFor="compression">Enable Compression</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Switch id="encryption" checked={encryptionEnabled} onCheckedChange={setEncryptionEnabled} />
                        <Label htmlFor="encryption">Enable Encryption</Label>
                      </div>
                    </div>
                  </div>

                  {backupInProgress && (
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Backup in progress...</span>
                        <span>{backupProgress}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div 
                          className={`bg-primary h-2.5 rounded-full progress-bar`} 
                          data-progress={backupProgress}
                        ></div>
                      </div>
                    </div>
                  )}

                  {backupProgress === 100 && !backupInProgress && (
                    <div className="flex items-center gap-2 text-green-600 bg-green-50 p-4 rounded-md border border-green-200">
                      <CheckCircle2 className="h-5 w-5" />
                      <div>
                        <p className="font-medium">Backup completed successfully</p>
                        <p className="text-sm">Total size: 2.47 GB • Compressed: 1.82 GB</p>
                      </div>
                    </div>
                  )}
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline">View Previous Backups</Button>
                  <Button onClick={handleBackup} disabled={backupInProgress}>
                    {backupInProgress ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Backing Up...
                      </>
                    ) : (
                      <>
                        <Save className="mr-2 h-4 w-4" />
                        Create Backup
                      </>
                    )}
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="restore" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Restore from Backup</CardTitle>
                  <CardDescription>Restore your data from a previous backup</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label>Available Backups</Label>
                    <div className="border rounded-md divide-y">
                      <div className="p-4 flex items-center justify-between hover:bg-gray-50 cursor-pointer">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                            <HardDrive className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <p className="font-medium">Daily Backup</p>
                            <p className="text-sm text-muted-foreground">Today, 02:00 AM • 2.47 GB</p>
                          </div>
                        </div>
                        <Button size="sm">Restore</Button>
                      </div>
                      <div className="p-4 flex items-center justify-between hover:bg-gray-50 cursor-pointer">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                            <Cloud className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <p className="font-medium">Weekly Backup</p>
                            <p className="text-sm text-muted-foreground">Oct 15, 2023 • 2.35 GB</p>
                          </div>
                        </div>
                        <Button size="sm">Restore</Button>
                      </div>
                      <div className="p-4 flex items-center justify-between hover:bg-gray-50 cursor-pointer">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                            <Cloud className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <p className="font-medium">Monthly Backup</p>
                            <p className="text-sm text-muted-foreground">Oct 1, 2023 • 2.28 GB</p>
                          </div>
                        </div>
                        <Button size="sm">Restore</Button>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 bg-amber-50 text-amber-800 rounded-md border border-amber-200">
                    <div className="flex items-start gap-2">
                      <AlertCircle className="h-5 w-5 mt-0.5" />
                      <div>
                        <h4 className="font-medium">Warning: Data Replacement</h4>
                        <p className="text-sm mt-1">
                          Restoring from a backup will replace your current data. This action cannot be undone. Make
                          sure to create a backup of your current data before proceeding.
                        </p>
                      </div>
                    </div>
                  </div>

                  {restoreInProgress && (
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Restore in progress...</span>
                        <span>{restoreProgress}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div 
                          className="bg-primary h-2.5 rounded-full progress-bar" 
                          data-progress-width={restoreProgress}
                        ></div>
                      </div>
                    </div>
                  )}

                  {restoreProgress === 100 && !restoreInProgress && (
                    <div className="flex items-center gap-2 text-green-600 bg-green-50 p-4 rounded-md border border-green-200">
                      <CheckCircle2 className="h-5 w-5" />
                      <div>
                        <p className="font-medium">Restore completed successfully</p>
                        <p className="text-sm">Your data has been restored from the selected backup</p>
                      </div>
                    </div>
                  )}
                </CardContent>
                <CardFooter>
                  <Button className="w-full" variant="outline" onClick={handleRestore} disabled={restoreInProgress}>
                    {restoreInProgress ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Restoring...
                      </>
                    ) : (
                      <>
                        <RefreshCw className="mr-2 h-4 w-4" />
                        Restore System
                      </>
                    )}
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="schedule" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Backup Schedule</CardTitle>
                  <CardDescription>Configure automatic backup schedule</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center space-x-2">
                    <Switch id="auto-backup" checked={autoBackup} onCheckedChange={setAutoBackup} />
                    <Label htmlFor="auto-backup">Enable Automatic Backups</Label>
                  </div>

                  {autoBackup && (
                    <>
                      <div className="grid gap-4 md:grid-cols-2">
                        <div className="space-y-2">
                          <Label htmlFor="schedule">Backup Frequency</Label>
                          <Select value={backupSchedule} onValueChange={setBackupSchedule}>
                            <SelectTrigger id="schedule">
                              <SelectValue placeholder="Select frequency" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="hourly">Hourly</SelectItem>
                              <SelectItem value="daily">Daily</SelectItem>
                              <SelectItem value="weekly">Weekly</SelectItem>
                              <SelectItem value="monthly">Monthly</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="time">Backup Time</Label>
                          <Input
                            id="time"
                            type="time"
                            value={backupTime}
                            onChange={(e) => setBackupTime(e.target.value)}
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="retention">Retention Period (days)</Label>
                        <Select value={retentionPeriod} onValueChange={setRetentionPeriod}>
                          <SelectTrigger id="retention">
                            <SelectValue placeholder="Select retention period" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="7">7 days</SelectItem>
                            <SelectItem value="14">14 days</SelectItem>
                            <SelectItem value="30">30 days</SelectItem>
                            <SelectItem value="90">90 days</SelectItem>
                            <SelectItem value="365">365 days</SelectItem>
                          </SelectContent>
                        </Select>
                        <p className="text-sm text-muted-foreground">
                          Backups older than the retention period will be automatically deleted
                        </p>
                      </div>

                      <div className="p-4 bg-blue-50 text-blue-800 rounded-md border border-blue-200">
                        <div className="flex items-start gap-2">
                          <Clock className="h-5 w-5 mt-0.5" />
                          <div>
                            <h4 className="font-medium">Next Scheduled Backup</h4>
                            <p className="text-sm mt-1">The next backup will run tomorrow at 02:00 AM</p>
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                </CardContent>
                <CardFooter>
                  <Button className="w-full">
                    <Save className="mr-2 h-4 w-4" />
                    Save Schedule
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Storage Providers</CardTitle>
              <CardDescription>Configure backup destinations</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Select Provider</Label>
                <Select value={selectedProvider} onValueChange={setSelectedProvider}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select provider" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="google-drive">Google Drive</SelectItem>
                    <SelectItem value="dropbox">Dropbox</SelectItem>
                    <SelectItem value="s3">Amazon S3</SelectItem>
                    <SelectItem value="local">Local Storage</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {selectedProvider === "google-drive" && (
                <div className="p-4 border rounded-md">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                      <svg className="h-6 w-6" viewBox="0 0 87.3 78" xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="m6.6 66.85 3.85 6.65c.8 1.4 1.95 2.5 3.3 3.3l13.75-23.8h-27.5c0 1.55.4 3.1 1.2 4.5z"
                          fill="#0066da"
                        />
                        <path
                          d="m43.65 25-13.75-23.8c-1.35.8-2.5 1.9-3.3 3.3l-25.4 44a9.06 9.06 0 0 0 -1.2 4.5h27.5z"
                          fill="#00ac47"
                        />
                        <path
                          d="m73.55 76.8c1.35-.8 2.5-1.9 3.3-3.3l1.6-2.75 7.65-13.25c.8-1.4 1.2-2.95 1.2-4.5h-27.502l5.852 11.5z"
                          fill="#ea4335"
                        />
                        <path
                          d="m43.65 25 13.75-23.8c-1.35-.8-2.9-1.2-4.5-1.2h-18.5c-1.6 0-3.15.45-4.5 1.2z"
                          fill="#00832d"
                        />
                        <path
                          d="m59.8 53h-32.3l-13.75 23.8c1.35.8 2.9 1.2 4.5 1.2h50.8c1.6 0 3.15-.45 4.5-1.2z"
                          fill="#2684fc"
                        />
                        <path
                          d="m73.4 26.5-12.7-22c-.8-1.4-1.95-2.5-3.3-3.3l-13.75 23.8 16.15 28h27.45c0-1.55-.4-3.1-1.2-4.5z"
                          fill="#ffba00"
                        />
                      </svg>
                    </div>
                    <div>
                      <p className="font-medium">Google Drive</p>
                      <p className="text-sm text-muted-foreground">Connected as admin@anatomyexplorer.com</p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span>Storage Used</span>
                      <span>12.4 GB / 15 GB</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-blue-500 h-2 rounded-full progress-bar"></div>
                    </div>
                  </div>
                  <div className="mt-4 flex justify-between">
                    <Button variant="outline" size="sm">
                      Disconnect
                    </Button>
                    <Button size="sm" onClick={handleConnectGoogleDrive}>
                      Reconnect
                    </Button>
                  </div>
                </div>
              )}

              {selectedProvider === "dropbox" && (
                <div className="flex items-center justify-center p-8 border rounded-md">
                  <Button>Connect Dropbox</Button>
                </div>
              )}

              {selectedProvider === "s3" && (
                <div className="flex items-center justify-center p-8 border rounded-md">
                  <Button>Configure S3</Button>
                </div>
              )}

              {selectedProvider === "local" && (
                <div className="flex items-center justify-center p-8 border rounded-md">
                  <Button>Select Directory</Button>
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Backup History</CardTitle>
              <CardDescription>Recent backup activities</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                    <CheckCircle2 className="h-4 w-4 text-green-600" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">Daily Backup Completed</p>
                    <p className="text-sm text-muted-foreground">Today, 02:00 AM • 2.47 GB</p>
                  </div>
                  <Button variant="ghost" size="icon">
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                    <CheckCircle2 className="h-4 w-4 text-green-600" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">Weekly Backup Completed</p>
                    <p className="text-sm text-muted-foreground">Oct 15, 2023 • 2.35 GB</p>
                  </div>
                  <Button variant="ghost" size="icon">
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                    <CheckCircle2 className="h-4 w-4 text-green-600" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">Manual Backup Completed</p>
                    <p className="text-sm text-muted-foreground">Oct 10, 2023 • 2.32 GB</p>
                  </div>
                  <Button variant="ghost" size="icon">
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                <FileText className="mr-2 h-4 w-4" />
                View Full History
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  )
}
