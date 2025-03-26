"use client"

import { useState } from "react"
import { useAuth } from "@/contexts/auth-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import {
  Loader2,
  Save,
  Dumbbell,
  Activity,
  Heart,
  Brain,
  Globe,
  Palette,
  SettingsIcon,
  Users,
  FileText,
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { Separator } from "@/components/ui/separator"

export default function AdminSettingsPage() {
  const { user } = useAuth()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)

  const [appSettings, setAppSettings] = useState({
    appName: "Anatomy Explorer",
    appIcon: "dumbbell",
    primaryColor: "#3b82f6",
    secondaryColor: "#f59e0b",
    defaultLanguage: "en",
    allowUserRegistration: true,
    requireEmailVerification: true,
    maintenanceMode: false,
    analyticsEnabled: true,
    maxUploadSize: "10",
    defaultSubscriptionPlan: "trial",
    termsOfService: "Standard terms of service text...",
    privacyPolicy: "Standard privacy policy text...",
  })

  if (!user || user.role !== "admin") {
    return (
      <div className="container py-10">
        <h1 className="text-2xl font-bold">Access Denied</h1>
        <p className="text-muted-foreground mt-2">You don't have permission to access this page.</p>
      </div>
    )
  }

  const handleSaveSettings = async () => {
    setIsLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    toast({
      title: "Settings updated",
      description: "Application settings have been saved successfully.",
      duration: 3000,
    })

    setIsLoading(false)
  }

  return (
    <div className="container py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Admin Settings</h1>
        <p className="text-muted-foreground mt-2">Configure global application settings and appearance</p>
      </div>

      <Tabs defaultValue="branding" className="space-y-6">
        <TabsList className="w-full justify-start overflow-x-auto">
          <TabsTrigger value="branding">Branding</TabsTrigger>
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="users">Users & Subscriptions</TabsTrigger>
          <TabsTrigger value="content">Content</TabsTrigger>
          <TabsTrigger value="legal">Legal</TabsTrigger>
        </TabsList>

        <TabsContent value="branding" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Palette className="h-5 w-5 text-muted-foreground" />
                <div>
                  <CardTitle>Application Branding</CardTitle>
                  <CardDescription>Customize the application name, icon, and colors</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="app-name">Application Name</Label>
                  <Input
                    id="app-name"
                    value={appSettings.appName}
                    onChange={(e) => setAppSettings({ ...appSettings, appName: e.target.value })}
                  />
                </div>

                <div className="grid gap-2">
                  <Label>Application Icon</Label>
                  <div className="grid grid-cols-4 gap-3">
                    {["dumbbell", "activity", "heart", "brain"].map((icon) => (
                      <div
                        key={icon}
                        className={`flex flex-col items-center justify-center p-4 border rounded-md cursor-pointer transition-colors ${
                          appSettings.appIcon === icon ? "border-primary bg-primary/10" : "border-border hover:bg-muted"
                        }`}
                        onClick={() => setAppSettings({ ...appSettings, appIcon: icon })}
                      >
                        {icon === "dumbbell" && <Dumbbell className="h-8 w-8 mb-2" />}
                        {icon === "activity" && <Activity className="h-8 w-8 mb-2" />}
                        {icon === "heart" && <Heart className="h-8 w-8 mb-2" />}
                        {icon === "brain" && <Brain className="h-8 w-8 mb-2" />}
                        <span className="text-xs">{icon.charAt(0).toUpperCase() + icon.slice(1)}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <Separator />

                <div className="grid gap-2">
                  <Label htmlFor="primary-color">Primary Color</Label>
                  <div className="flex items-center gap-2">
                    <Input
                      id="primary-color"
                      type="color"
                      value={appSettings.primaryColor}
                      onChange={(e) => setAppSettings({ ...appSettings, primaryColor: e.target.value })}
                      className="w-12 h-10 p-1"
                    />
                    <Input
                      value={appSettings.primaryColor}
                      onChange={(e) => setAppSettings({ ...appSettings, primaryColor: e.target.value })}
                      className="flex-1"
                    />
                  </div>
                  <div className="h-10 rounded-md" style={{ backgroundColor: appSettings.primaryColor }}></div>
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="secondary-color">Secondary Color</Label>
                  <div className="flex items-center gap-2">
                    <Input
                      id="secondary-color"
                      type="color"
                      value={appSettings.secondaryColor}
                      onChange={(e) => setAppSettings({ ...appSettings, secondaryColor: e.target.value })}
                      className="w-12 h-10 p-1"
                    />
                    <Input
                      value={appSettings.secondaryColor}
                      onChange={(e) => setAppSettings({ ...appSettings, secondaryColor: e.target.value })}
                      className="flex-1"
                    />
                  </div>
                  <div className="h-10 rounded-md" style={{ backgroundColor: appSettings.secondaryColor }}></div>
                </div>

                <div className="pt-4">
                  <Button variant="outline" className="w-full">
                    Reset to Default
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="general" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <SettingsIcon className="h-5 w-5 text-muted-foreground" />
                <div>
                  <CardTitle>General Settings</CardTitle>
                  <CardDescription>Configure global application settings</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="default-language">Default Language</Label>
                  <Select
                    value={appSettings.defaultLanguage}
                    onValueChange={(value) => setAppSettings({ ...appSettings, defaultLanguage: value })}
                  >
                    <SelectTrigger id="default-language">
                      <SelectValue placeholder="Select language" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="en">English</SelectItem>
                      <SelectItem value="fr">French</SelectItem>
                      <SelectItem value="ru">Russian</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="maintenance-mode">Maintenance Mode</Label>
                    <p className="text-sm text-muted-foreground">Put the application in maintenance mode</p>
                  </div>
                  <Switch
                    id="maintenance-mode"
                    checked={appSettings.maintenanceMode}
                    onCheckedChange={(checked) => setAppSettings({ ...appSettings, maintenanceMode: checked })}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="analytics-enabled">Analytics</Label>
                    <p className="text-sm text-muted-foreground">Enable usage analytics</p>
                  </div>
                  <Switch
                    id="analytics-enabled"
                    checked={appSettings.analyticsEnabled}
                    onCheckedChange={(checked) => setAppSettings({ ...appSettings, analyticsEnabled: checked })}
                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="max-upload-size">Maximum Upload Size (MB)</Label>
                  <Input
                    id="max-upload-size"
                    type="number"
                    value={appSettings.maxUploadSize}
                    onChange={(e) => setAppSettings({ ...appSettings, maxUploadSize: e.target.value })}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="users" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5 text-muted-foreground" />
                <div>
                  <CardTitle>User & Subscription Settings</CardTitle>
                  <CardDescription>Configure user registration and subscription options</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="allow-registration">Allow User Registration</Label>
                    <p className="text-sm text-muted-foreground">Enable new user registration</p>
                  </div>
                  <Switch
                    id="allow-registration"
                    checked={appSettings.allowUserRegistration}
                    onCheckedChange={(checked) => setAppSettings({ ...appSettings, allowUserRegistration: checked })}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="email-verification">Require Email Verification</Label>
                    <p className="text-sm text-muted-foreground">Require users to verify their email address</p>
                  </div>
                  <Switch
                    id="email-verification"
                    checked={appSettings.requireEmailVerification}
                    onCheckedChange={(checked) => setAppSettings({ ...appSettings, requireEmailVerification: checked })}
                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="default-plan">Default Subscription Plan</Label>
                  <Select
                    value={appSettings.defaultSubscriptionPlan}
                    onValueChange={(value) => setAppSettings({ ...appSettings, defaultSubscriptionPlan: value })}
                  >
                    <SelectTrigger id="default-plan">
                      <SelectValue placeholder="Select plan" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="trial">Free Trial</SelectItem>
                      <SelectItem value="basic">Basic</SelectItem>
                      <SelectItem value="premium">Premium</SelectItem>
                      <SelectItem value="professional">Professional</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="content" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Globe className="h-5 w-5 text-muted-foreground" />
                <div>
                  <CardTitle>Content Settings</CardTitle>
                  <CardDescription>Configure content and media settings</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label>Content Management</Label>
                  <p className="text-sm text-muted-foreground">
                    Content management settings will be available in a future update.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="legal" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-muted-foreground" />
                <div>
                  <CardTitle>Legal Documents</CardTitle>
                  <CardDescription>Configure terms of service and privacy policy</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="terms-of-service">Terms of Service</Label>
                  <Textarea
                    id="terms-of-service"
                    rows={6}
                    value={appSettings.termsOfService}
                    onChange={(e) => setAppSettings({ ...appSettings, termsOfService: e.target.value })}
                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="privacy-policy">Privacy Policy</Label>
                  <Textarea
                    id="privacy-policy"
                    rows={6}
                    value={appSettings.privacyPolicy}
                    onChange={(e) => setAppSettings({ ...appSettings, privacyPolicy: e.target.value })}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="mt-8 flex justify-end">
        <Button onClick={handleSaveSettings} disabled={isLoading}>
          {isLoading ? (
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
      </div>
    </div>
  )
}

