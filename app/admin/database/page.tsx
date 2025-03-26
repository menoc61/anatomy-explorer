"use client"

import { useState } from "react"
import { useAuth } from "@/contexts/auth-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { useI18n } from "@/contexts/i18n-context"
import { Loader2, Save, Database, Server, Key, RefreshCw, CheckCircle, XCircle, AlertCircle } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export default function DatabaseSettingsPage() {
  const { user } = useAuth()
  const { toast } = useToast()
  const { t } = useI18n()
  const [isLoading, setIsLoading] = useState(false)
  const [isTesting, setIsTesting] = useState(false)
  const [connectionStatus, setConnectionStatus] = useState<"idle" | "success" | "error">("idle")

  const [prismaSettings, setPrismaSettings] = useState({
    databaseUrl: "postgresql://username:password@localhost:5432/mydb",
    directUrl: "",
    shadowDatabaseUrl: "",
    enableLogging: true,
    enableQueryCache: true,
    enableSoftDelete: false,
  })

  const [supabaseSettings, setSupabaseSettings] = useState({
    projectUrl: "https://your-project.supabase.co",
    apiKey: "your-supabase-api-key",
    serviceRoleKey: "",
    enableRealtime: true,
    enableStorage: true,
    enableAuth: true,
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
      title: t("app.success"),
      description: "Database settings have been saved successfully.",
      duration: 3000,
    })

    setIsLoading(false)
  }

  const handleTestConnection = async () => {
    setIsTesting(true)
    setConnectionStatus("idle")

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // Randomly succeed or fail for demo purposes
    const success = Math.random() > 0.3
    setConnectionStatus(success ? "success" : "error")

    toast({
      title: success ? "Connection Successful" : "Connection Failed",
      description: success
        ? "Successfully connected to the database."
        : "Failed to connect to the database. Please check your settings.",
      variant: success ? "default" : "destructive",
      duration: 5000,
    })

    setIsTesting(false)
  }

  return (
    <div className="container py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">{t("database.title")}</h1>
        <p className="text-muted-foreground mt-2">Configure your database connections for Prisma and Supabase</p>
      </div>

      <Tabs defaultValue="prisma" className="space-y-6">
        <TabsList className="w-full justify-start overflow-x-auto">
          <TabsTrigger value="prisma">Prisma</TabsTrigger>
          <TabsTrigger value="supabase">Supabase</TabsTrigger>
          <TabsTrigger value="migrations">Migrations</TabsTrigger>
          <TabsTrigger value="backups">Backups</TabsTrigger>
        </TabsList>

        <TabsContent value="prisma" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Database className="h-5 w-5 text-muted-foreground" />
                <div>
                  <CardTitle>{t("database.prisma")}</CardTitle>
                  <CardDescription>Configure your Prisma database connection</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="database-url">Database URL</Label>
                  <Input
                    id="database-url"
                    value={prismaSettings.databaseUrl}
                    onChange={(e) => setPrismaSettings({ ...prismaSettings, databaseUrl: e.target.value })}
                    placeholder="postgresql://username:password@localhost:5432/mydb"
                  />
                  <p className="text-xs text-muted-foreground">
                    The connection string to your database. Format: postgresql://username:password@localhost:5432/mydb
                  </p>
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="direct-url">Direct URL (optional)</Label>
                  <Input
                    id="direct-url"
                    value={prismaSettings.directUrl}
                    onChange={(e) => setPrismaSettings({ ...prismaSettings, directUrl: e.target.value })}
                    placeholder="postgresql://username:password@localhost:5432/mydb"
                  />
                  <p className="text-xs text-muted-foreground">
                    Direct connection URL, useful for environments with connection pooling
                  </p>
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="shadow-database-url">Shadow Database URL (optional)</Label>
                  <Input
                    id="shadow-database-url"
                    value={prismaSettings.shadowDatabaseUrl}
                    onChange={(e) => setPrismaSettings({ ...prismaSettings, shadowDatabaseUrl: e.target.value })}
                    placeholder="postgresql://username:password@localhost:5432/shadow_db"
                  />
                  <p className="text-xs text-muted-foreground">
                    Used for migrations in production. Can be the same as your development database.
                  </p>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="enable-logging">Enable Query Logging</Label>
                    <p className="text-sm text-muted-foreground">Log all database queries to the console</p>
                  </div>
                  <Switch
                    id="enable-logging"
                    checked={prismaSettings.enableLogging}
                    onCheckedChange={(checked) => setPrismaSettings({ ...prismaSettings, enableLogging: checked })}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="enable-query-cache">Enable Query Cache</Label>
                    <p className="text-sm text-muted-foreground">Cache database queries for better performance</p>
                  </div>
                  <Switch
                    id="enable-query-cache"
                    checked={prismaSettings.enableQueryCache}
                    onCheckedChange={(checked) => setPrismaSettings({ ...prismaSettings, enableQueryCache: checked })}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="enable-soft-delete">Enable Soft Delete</Label>
                    <p className="text-sm text-muted-foreground">Mark records as deleted instead of removing them</p>
                  </div>
                  <Switch
                    id="enable-soft-delete"
                    checked={prismaSettings.enableSoftDelete}
                    onCheckedChange={(checked) => setPrismaSettings({ ...prismaSettings, enableSoftDelete: checked })}
                  />
                </div>

                <div className="flex justify-between items-center pt-4">
                  <Button variant="outline" onClick={handleTestConnection} disabled={isTesting} className="gap-2">
                    {isTesting ? <Loader2 className="h-4 w-4 animate-spin" /> : <RefreshCw className="h-4 w-4" />}
                    {t("database.test")}
                  </Button>

                  {connectionStatus === "success" && (
                    <div className="flex items-center text-green-500 gap-1">
                      <CheckCircle className="h-4 w-4" />
                      <span className="text-sm">Connection successful</span>
                    </div>
                  )}

                  {connectionStatus === "error" && (
                    <div className="flex items-center text-red-500 gap-1">
                      <XCircle className="h-4 w-4" />
                      <span className="text-sm">Connection failed</span>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="supabase" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Server className="h-5 w-5 text-muted-foreground" />
                <div>
                  <CardTitle>{t("database.supabase")}</CardTitle>
                  <CardDescription>Configure your Supabase connection</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="project-url">Project URL</Label>
                  <Input
                    id="project-url"
                    value={supabaseSettings.projectUrl}
                    onChange={(e) => setSupabaseSettings({ ...supabaseSettings, projectUrl: e.target.value })}
                    placeholder="https://your-project.supabase.co"
                  />
                  <p className="text-xs text-muted-foreground">Your Supabase project URL</p>
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="api-key">API Key</Label>
                  <div className="flex gap-2">
                    <Input
                      id="api-key"
                      type="password"
                      value={supabaseSettings.apiKey}
                      onChange={(e) => setSupabaseSettings({ ...supabaseSettings, apiKey: e.target.value })}
                      placeholder="your-supabase-api-key"
                    />
                    <Button variant="outline" size="icon">
                      <Key className="h-4 w-4" />
                    </Button>
                  </div>
                  <p className="text-xs text-muted-foreground">Your Supabase API key (anon public)</p>
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="service-role-key">Service Role Key (optional)</Label>
                  <div className="flex gap-2">
                    <Input
                      id="service-role-key"
                      type="password"
                      value={supabaseSettings.serviceRoleKey}
                      onChange={(e) => setSupabaseSettings({ ...supabaseSettings, serviceRoleKey: e.target.value })}
                      placeholder="your-service-role-key"
                    />
                    <Button variant="outline" size="icon">
                      <Key className="h-4 w-4" />
                    </Button>
                  </div>
                  <p className="text-xs text-muted-foreground">Your Supabase service role key (for admin operations)</p>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="enable-realtime">Enable Realtime</Label>
                    <p className="text-sm text-muted-foreground">Enable realtime subscriptions</p>
                  </div>
                  <Switch
                    id="enable-realtime"
                    checked={supabaseSettings.enableRealtime}
                    onCheckedChange={(checked) => setSupabaseSettings({ ...supabaseSettings, enableRealtime: checked })}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="enable-storage">Enable Storage</Label>
                    <p className="text-sm text-muted-foreground">Enable Supabase Storage for file uploads</p>
                  </div>
                  <Switch
                    id="enable-storage"
                    checked={supabaseSettings.enableStorage}
                    onCheckedChange={(checked) => setSupabaseSettings({ ...supabaseSettings, enableStorage: checked })}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="enable-auth">Enable Auth</Label>
                    <p className="text-sm text-muted-foreground">Enable Supabase Authentication</p>
                  </div>
                  <Switch
                    id="enable-auth"
                    checked={supabaseSettings.enableAuth}
                    onCheckedChange={(checked) => setSupabaseSettings({ ...supabaseSettings, enableAuth: checked })}
                  />
                </div>

                <div className="flex justify-between items-center pt-4">
                  <Button variant="outline" onClick={handleTestConnection} disabled={isTesting} className="gap-2">
                    {isTesting ? <Loader2 className="h-4 w-4 animate-spin" /> : <RefreshCw className="h-4 w-4" />}
                    {t("database.test")}
                  </Button>

                  {connectionStatus === "success" && (
                    <div className="flex items-center text-green-500 gap-1">
                      <CheckCircle className="h-4 w-4" />
                      <span className="text-sm">Connection successful</span>
                    </div>
                  )}

                  {connectionStatus === "error" && (
                    <div className="flex items-center text-red-500 gap-1">
                      <XCircle className="h-4 w-4" />
                      <span className="text-sm">Connection failed</span>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="migrations" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Database Migrations</CardTitle>
              <CardDescription>Manage your database schema migrations</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <Alert>
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Migration Management</AlertTitle>
                <AlertDescription>
                  Migrations allow you to evolve your database schema over time. Be careful when running migrations in
                  production.
                </AlertDescription>
              </Alert>

              <div className="grid gap-4">
                <div className="grid grid-cols-2 gap-4">
                  <Button variant="outline" className="w-full">
                    Generate Migration
                  </Button>
                  <Button variant="outline" className="w-full">
                    Apply Migrations
                  </Button>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <Button variant="outline" className="w-full">
                    Reset Database
                  </Button>
                  <Button variant="outline" className="w-full">
                    View Migration History
                  </Button>
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="migration-name">Migration Name</Label>
                  <div className="flex gap-2">
                    <Input id="migration-name" placeholder="add_users_table" />
                    <Button>Create</Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="backups" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Database Backups</CardTitle>
              <CardDescription>Manage your database backups</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-4">
                <div className="grid grid-cols-2 gap-4">
                  <Button variant="outline" className="w-full">
                    Create Backup
                  </Button>
                  <Button variant="outline" className="w-full">
                    Restore Backup
                  </Button>
                </div>

                <div className="grid gap-2">
                  <Label>Backup Schedule</Label>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center space-x-2">
                      <Switch id="daily-backup" />
                      <Label htmlFor="daily-backup">Daily</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch id="weekly-backup" checked />
                      <Label htmlFor="weekly-backup">Weekly</Label>
                    </div>
                  </div>
                </div>

                <div className="grid gap-2">
                  <Label>Retention Policy</Label>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="flex items-center space-x-2">
                      <Input type="number" value="7" className="w-16" />
                      <Label>Days</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Input type="number" value="4" className="w-16" />
                      <Label>Weeks</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Input type="number" value="3" className="w-16" />
                      <Label>Months</Label>
                    </div>
                  </div>
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
              {t("actions.save")}
            </>
          )}
        </Button>
      </div>
    </div>
  )
}

