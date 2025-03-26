"use client"

import { useState } from "react"
import { useAuth } from "@/contexts/auth-context"
import { useLanguage } from "@/contexts/language-context"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Loader2, Save, Smartphone, Download, Bell, Eye } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export default function MobileSettings() {
  const { user } = useAuth()
  const { t, language, setLanguage, availableLanguages } = useLanguage()
  const { theme, setTheme } = useTheme()
  const { toast } = useToast()

  const [isLoading, setIsLoading] = useState(false)
  const [mobileSettings, setMobileSettings] = useState({
    downloadOverCellular: false,
    autoDownloadUpdates: true,
    enablePushNotifications: true,
    enableBackgroundSync: true,
    enableOfflineMode: true,
    enableDataSaver: false,
    screenTimeout: "5min",
  })

  if (!user) return null

  const handleSaveSettings = async () => {
    setIsLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    toast({
      title: "Mobile settings saved",
      description: "Your mobile preferences have been updated successfully.",
      duration: 3000,
    })

    setIsLoading(false)
  }

  return (
    <div className="container max-w-4xl py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Mobile Settings</h1>
        <p className="text-muted-foreground mt-2">Configure your mobile experience</p>
      </div>

      <Accordion type="single" collapsible className="space-y-4">
        <AccordionItem value="data" className="border rounded-lg overflow-hidden">
          <AccordionTrigger className="px-4 py-2 hover:no-underline">
            <div className="flex items-center gap-2">
              <Download className="h-5 w-5" />
              <span>Data & Downloads</span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-4 pb-4">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="download-cellular">Download over cellular</Label>
                  <p className="text-sm text-muted-foreground">Allow downloading content using cellular data</p>
                </div>
                <Switch
                  id="download-cellular"
                  checked={mobileSettings.downloadOverCellular}
                  onCheckedChange={(checked) => setMobileSettings({ ...mobileSettings, downloadOverCellular: checked })}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="auto-download">Auto-download updates</Label>
                  <p className="text-sm text-muted-foreground">Automatically download app updates when available</p>
                </div>
                <Switch
                  id="auto-download"
                  checked={mobileSettings.autoDownloadUpdates}
                  onCheckedChange={(checked) => setMobileSettings({ ...mobileSettings, autoDownloadUpdates: checked })}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="data-saver">Data saver mode</Label>
                  <p className="text-sm text-muted-foreground">Reduce data usage by loading lower quality images</p>
                </div>
                <Switch
                  id="data-saver"
                  checked={mobileSettings.enableDataSaver}
                  onCheckedChange={(checked) => setMobileSettings({ ...mobileSettings, enableDataSaver: checked })}
                />
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="notifications" className="border rounded-lg overflow-hidden">
          <AccordionTrigger className="px-4 py-2 hover:no-underline">
            <div className="flex items-center gap-2">
              <Bell className="h-5 w-5" />
              <span>Notifications</span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-4 pb-4">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="push-notifications">Push notifications</Label>
                  <p className="text-sm text-muted-foreground">Receive push notifications on your device</p>
                </div>
                <Switch
                  id="push-notifications"
                  checked={mobileSettings.enablePushNotifications}
                  onCheckedChange={(checked) =>
                    setMobileSettings({ ...mobileSettings, enablePushNotifications: checked })
                  }
                />
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="display" className="border rounded-lg overflow-hidden">
          <AccordionTrigger className="px-4 py-2 hover:no-underline">
            <div className="flex items-center gap-2">
              <Eye className="h-5 w-5" />
              <span>Display & Appearance</span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-4 pb-4">
            <div className="space-y-4">
              <div>
                <Label htmlFor="theme-select">Theme</Label>
                <Select value={theme || "system"} onValueChange={setTheme}>
                  <SelectTrigger id="theme-select" className="mt-1">
                    <SelectValue placeholder="Select theme" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="light">{t("theme.light")}</SelectItem>
                    <SelectItem value="dark">{t("theme.dark")}</SelectItem>
                    <SelectItem value="system">{t("theme.system")}</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="language-select">Language</Label>
                <Select value={language} onValueChange={(value: any) => setLanguage(value)}>
                  <SelectTrigger id="language-select" className="mt-1">
                    <SelectValue placeholder="Select language" />
                  </SelectTrigger>
                  <SelectContent>
                    {availableLanguages.map((lang) => (
                      <SelectItem key={lang.code} value={lang.code}>
                        {lang.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="screen-timeout">Screen timeout</Label>
                <Select
                  value={mobileSettings.screenTimeout}
                  onValueChange={(value) => setMobileSettings({ ...mobileSettings, screenTimeout: value })}
                >
                  <SelectTrigger id="screen-timeout" className="mt-1">
                    <SelectValue placeholder="Select timeout" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="2min">2 minutes</SelectItem>
                    <SelectItem value="5min">5 minutes</SelectItem>
                    <SelectItem value="10min">10 minutes</SelectItem>
                    <SelectItem value="never">Never</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="offline" className="border rounded-lg overflow-hidden">
          <AccordionTrigger className="px-4 py-2 hover:no-underline">
            <div className="flex items-center gap-2">
              <Smartphone className="h-5 w-5" />
              <span>Offline Access</span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-4 pb-4">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="offline-mode">Offline mode</Label>
                  <p className="text-sm text-muted-foreground">Enable access to downloaded content when offline</p>
                </div>
                <Switch
                  id="offline-mode"
                  checked={mobileSettings.enableOfflineMode}
                  onCheckedChange={(checked) => setMobileSettings({ ...mobileSettings, enableOfflineMode: checked })}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="background-sync">Background sync</Label>
                  <p className="text-sm text-muted-foreground">Sync content in the background when app is closed</p>
                </div>
                <Switch
                  id="background-sync"
                  checked={mobileSettings.enableBackgroundSync}
                  onCheckedChange={(checked) => setMobileSettings({ ...mobileSettings, enableBackgroundSync: checked })}
                />
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

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

