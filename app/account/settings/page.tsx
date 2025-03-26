"use client"

import { useState, useEffect } from "react"
import { useAuth } from "@/contexts/auth-context"
import { useLanguage } from "@/contexts/language-context"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Loader2, Save, Bell, Eye, Shield, Smartphone, Palette } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function SettingsPage() {
  const { user } = useAuth()
  const { t, language, setLanguage, availableLanguages } = useLanguage()
  const { theme, setTheme } = useTheme()
  const { toast } = useToast()

  const [isLoading, setIsLoading] = useState(false)
  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    newContent: true,
    updates: true,
    reminders: true,
    marketing: false,
  })
  const [accessibility, setAccessibility] = useState({
    highContrast: false,
    largeText: false,
    reducedMotion: false,
    screenReader: false,
  })
  const [privacy, setPrivacy] = useState({
    shareUsageData: true,
    allowCookies: true,
    showProfileToOthers: true,
  })
  const [display, setDisplay] = useState({
    showThumbnails: true,
    autoplayVideos: false,
    defaultView: "3d",
  })

  // Detect system language on first load
  useEffect(() => {
    if (typeof window !== "undefined" && !localStorage.getItem("language")) {
      const browserLang = navigator.language.split("-")[0]
      if (browserLang === "fr") setLanguage("fr" as any)
      else if (browserLang === "ru") setLanguage("ru" as any)
    }
  }, [setLanguage])

  if (!user) return null

  const handleSaveSettings = async () => {
    setIsLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    toast({
      title: t("app.success"),
      description: "Your preferences have been updated successfully.",
      duration: 3000,
    })

    setIsLoading(false)
  }

  return (
    <div className="container max-w-4xl py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">{t("settings.title")}</h1>
        <p className="text-muted-foreground mt-2">Manage your account settings and preferences</p>
      </div>

      <Tabs defaultValue="preferences" className="space-y-6">
        <TabsList className="w-full justify-start overflow-x-auto">
          <TabsTrigger value="preferences">Preferences</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="accessibility">Accessibility</TabsTrigger>
          <TabsTrigger value="privacy">Privacy</TabsTrigger>
          <TabsTrigger value="display">Display</TabsTrigger>
          <TabsTrigger value="mobile">Mobile</TabsTrigger>
        </TabsList>

        <TabsContent value="preferences" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>{t("settings.language")}</CardTitle>
              <CardDescription>Choose your preferred language for the interface</CardDescription>
            </CardHeader>
            <CardContent>
              <RadioGroup value={language} onValueChange={(value: any) => setLanguage(value)}>
                <div className="grid gap-4 md:grid-cols-3">
                  {availableLanguages.map((lang) => (
                    <div key={lang.code} className="flex items-center space-x-2">
                      <RadioGroupItem value={lang.code} id={`lang-${lang.code}`} />
                      <Label htmlFor={`lang-${lang.code}`}>{lang.name}</Label>
                    </div>
                  ))}
                </div>
              </RadioGroup>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>{t("settings.theme")}</CardTitle>
              <CardDescription>Choose your preferred theme for the interface</CardDescription>
            </CardHeader>
            <CardContent>
              <RadioGroup value={theme || "system"} onValueChange={setTheme}>
                <div className="grid gap-4 md:grid-cols-3">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="light" id="theme-light" />
                    <Label htmlFor="theme-light">{t("theme.light")}</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="dark" id="theme-dark" />
                    <Label htmlFor="theme-dark">{t("theme.dark")}</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="system" id="theme-system" />
                    <Label htmlFor="theme-system">{t("theme.system")}</Label>
                  </div>
                </div>
              </RadioGroup>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Bell className="h-5 w-5 text-muted-foreground" />
                <div>
                  <CardTitle>{t("settings.notifications")}</CardTitle>
                  <CardDescription>Configure how you want to receive notifications</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-sm font-medium">Notification Channels</h3>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="flex items-center justify-between space-x-2">
                    <Label htmlFor="notify-email">Email notifications</Label>
                    <Switch
                      id="notify-email"
                      checked={notifications.email}
                      onCheckedChange={(checked) => setNotifications({ ...notifications, email: checked })}
                    />
                  </div>
                  <div className="flex items-center justify-between space-x-2">
                    <Label htmlFor="notify-push">Push notifications</Label>
                    <Switch
                      id="notify-push"
                      checked={notifications.push}
                      onCheckedChange={(checked) => setNotifications({ ...notifications, push: checked })}
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-sm font-medium">Notification Types</h3>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="flex items-center justify-between space-x-2">
                    <Label htmlFor="notify-content">New content alerts</Label>
                    <Switch
                      id="notify-content"
                      checked={notifications.newContent}
                      onCheckedChange={(checked) => setNotifications({ ...notifications, newContent: checked })}
                    />
                  </div>
                  <div className="flex items-center justify-between space-x-2">
                    <Label htmlFor="notify-updates">Platform updates</Label>
                    <Switch
                      id="notify-updates"
                      checked={notifications.updates}
                      onCheckedChange={(checked) => setNotifications({ ...notifications, updates: checked })}
                    />
                  </div>
                  <div className="flex items-center justify-between space-x-2">
                    <Label htmlFor="notify-reminders">Study reminders</Label>
                    <Switch
                      id="notify-reminders"
                      checked={notifications.reminders}
                      onCheckedChange={(checked) => setNotifications({ ...notifications, reminders: checked })}
                    />
                  </div>
                  <div className="flex items-center justify-between space-x-2">
                    <Label htmlFor="notify-marketing">Marketing emails</Label>
                    <Switch
                      id="notify-marketing"
                      checked={notifications.marketing}
                      onCheckedChange={(checked) => setNotifications({ ...notifications, marketing: checked })}
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="accessibility" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Eye className="h-5 w-5 text-muted-foreground" />
                <div>
                  <CardTitle>Accessibility Settings</CardTitle>
                  <CardDescription>Customize your experience to make the platform more accessible</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="flex items-center justify-between space-x-2">
                  <Label htmlFor="high-contrast">High contrast mode</Label>
                  <Switch
                    id="high-contrast"
                    checked={accessibility.highContrast}
                    onCheckedChange={(checked) => setAccessibility({ ...accessibility, highContrast: checked })}
                  />
                </div>
                <div className="flex items-center justify-between space-x-2">
                  <Label htmlFor="large-text">Larger text</Label>
                  <Switch
                    id="large-text"
                    checked={accessibility.largeText}
                    onCheckedChange={(checked) => setAccessibility({ ...accessibility, largeText: checked })}
                  />
                </div>
                <div className="flex items-center justify-between space-x-2">
                  <Label htmlFor="reduced-motion">Reduced motion</Label>
                  <Switch
                    id="reduced-motion"
                    checked={accessibility.reducedMotion}
                    onCheckedChange={(checked) => setAccessibility({ ...accessibility, reducedMotion: checked })}
                  />
                </div>
                <div className="flex items-center justify-between space-x-2">
                  <Label htmlFor="screen-reader">Screen reader optimizations</Label>
                  <Switch
                    id="screen-reader"
                    checked={accessibility.screenReader}
                    onCheckedChange={(checked) => setAccessibility({ ...accessibility, screenReader: checked })}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="privacy" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-muted-foreground" />
                <div>
                  <CardTitle>Privacy Settings</CardTitle>
                  <CardDescription>Control your data and privacy preferences</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-4">
                <div className="flex items-center justify-between space-x-2">
                  <div>
                    <Label htmlFor="share-usage">Share usage data</Label>
                    <p className="text-sm text-muted-foreground">Help us improve by sharing anonymous usage data</p>
                  </div>
                  <Switch
                    id="share-usage"
                    checked={privacy.shareUsageData}
                    onCheckedChange={(checked) => setPrivacy({ ...privacy, shareUsageData: checked })}
                  />
                </div>
                <div className="flex items-center justify-between space-x-2">
                  <div>
                    <Label htmlFor="allow-cookies">Allow cookies</Label>
                    <p className="text-sm text-muted-foreground">Enable cookies for a better browsing experience</p>
                  </div>
                  <Switch
                    id="allow-cookies"
                    checked={privacy.allowCookies}
                    onCheckedChange={(checked) => setPrivacy({ ...privacy, allowCookies: checked })}
                  />
                </div>
                <div className="flex items-center justify-between space-x-2">
                  <div>
                    <Label htmlFor="show-profile">Show profile to others</Label>
                    <p className="text-sm text-muted-foreground">Allow other users to see your profile and activity</p>
                  </div>
                  <Switch
                    id="show-profile"
                    checked={privacy.showProfileToOthers}
                    onCheckedChange={(checked) => setPrivacy({ ...privacy, showProfileToOthers: checked })}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="display" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Palette className="h-5 w-5 text-muted-foreground" />
                <div>
                  <CardTitle>Display Settings</CardTitle>
                  <CardDescription>Customize how content is displayed</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-4">
                <div className="flex items-center justify-between space-x-2">
                  <Label htmlFor="show-thumbnails">Show video thumbnails</Label>
                  <Switch
                    id="show-thumbnails"
                    checked={display.showThumbnails}
                    onCheckedChange={(checked) => setDisplay({ ...display, showThumbnails: checked })}
                  />
                </div>
                <div className="flex items-center justify-between space-x-2">
                  <Label htmlFor="autoplay-videos">Autoplay videos</Label>
                  <Switch
                    id="autoplay-videos"
                    checked={display.autoplayVideos}
                    onCheckedChange={(checked) => setDisplay({ ...display, autoplayVideos: checked })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="default-view">Default model view</Label>
                  <RadioGroup
                    value={display.defaultView}
                    onValueChange={(value) => setDisplay({ ...display, defaultView: value })}
                    className="flex space-x-4"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="3d" id="view-3d" />
                      <Label htmlFor="view-3d">3D Model</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="2d" id="view-2d" />
                      <Label htmlFor="view-2d">2D Illustration</Label>
                    </div>
                  </RadioGroup>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="mobile" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Smartphone className="h-5 w-5 text-muted-foreground" />
                <div>
                  <CardTitle>Mobile Settings</CardTitle>
                  <CardDescription>Configure your mobile experience</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="download-cellular">Download over cellular</Label>
                  <p className="text-sm text-muted-foreground">Allow downloading content using cellular data</p>
                </div>
                <Switch id="download-cellular" checked={false} onCheckedChange={() => {}} />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="auto-download">Auto-download updates</Label>
                  <p className="text-sm text-muted-foreground">Automatically download app updates when available</p>
                </div>
                <Switch id="auto-download" checked={true} onCheckedChange={() => {}} />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="data-saver">Data saver mode</Label>
                  <p className="text-sm text-muted-foreground">Reduce data usage by loading lower quality images</p>
                </div>
                <Switch id="data-saver" checked={false} onCheckedChange={() => {}} />
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
              {t("settings.save")}
            </>
          )}
        </Button>
      </div>
    </div>
  )
}

