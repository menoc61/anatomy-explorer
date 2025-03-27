"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { useAuth } from "@/contexts/auth-context"
import { useLanguage } from "@/contexts/language-context"
import { useTheme } from "next-themes"
import { ArrowLeft, Bell, Globe, Moon, Sun, User } from "lucide-react"
import Link from "next/link"

const appearanceFormSchema = z.object({
  theme: z.enum(["light", "dark", "system"], {
    required_error: "Please select a theme.",
  }),
  fontSize: z.enum(["default", "comfortable", "compact"], {
    required_error: "Please select a font size.",
  }),
})

const notificationsFormSchema = z.object({
  emailNotifications: z.boolean().default(true),
  pushNotifications: z.boolean().default(false),
  newFeatures: z.boolean().default(true),
  marketingEmails: z.boolean().default(false),
})

const accountFormSchema = z.object({
  name: z
    .string()
    .min(2, {
      message: "Name must be at least 2 characters.",
    })
    .max(30, {
      message: "Name must not be longer than 30 characters.",
    }),
  email: z.string().min(1, { message: "This field is required." }).email("This is not a valid email."),
  bio: z
    .string()
    .max(160, {
      message: "Bio must not be longer than 160 characters.",
    })
    .optional(),
})

type AppearanceFormValues = z.infer<typeof appearanceFormSchema>
type NotificationsFormValues = z.infer<typeof notificationsFormSchema>
type AccountFormValues = z.infer<typeof accountFormSchema>

export default function SettingsPage() {
  const { user, updateUser } = useAuth()
  const { language, setLanguage, availableLanguages, t } = useLanguage()
  const { theme, setTheme } = useTheme()
  const { toast } = useToast()
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const defaultAppearanceValues: Partial<AppearanceFormValues> = {
    theme: (theme as "light" | "dark" | "system") || "system",
    fontSize: "default",
  }

  const defaultNotificationValues: Partial<NotificationsFormValues> = {
    emailNotifications: true,
    pushNotifications: false,
    newFeatures: true,
    marketingEmails: false,
  }

  const defaultAccountValues: Partial<AccountFormValues> = {
    name: user?.name || "",
    email: user?.email || "",
    bio: "",
  }

  const appearanceForm = useForm<AppearanceFormValues>({
    resolver: zodResolver(appearanceFormSchema),
    defaultValues: defaultAppearanceValues,
  })

  const notificationsForm = useForm<NotificationsFormValues>({
    resolver: zodResolver(notificationsFormSchema),
    defaultValues: defaultNotificationValues,
  })

  const accountForm = useForm<AccountFormValues>({
    resolver: zodResolver(accountFormSchema),
    defaultValues: defaultAccountValues,
  })

  function onAppearanceSubmit(data: AppearanceFormValues) {
    setIsLoading(true)
    setTheme(data.theme)

    setTimeout(() => {
      setIsLoading(false)
      toast({
        title: "Appearance settings updated",
        description: "Your appearance settings have been updated.",
      })
    }, 500)
  }

  function onNotificationsSubmit(data: NotificationsFormValues) {
    setIsLoading(true)

    setTimeout(() => {
      setIsLoading(false)
      toast({
        title: "Notification settings updated",
        description: "Your notification preferences have been updated.",
      })
    }, 500)
  }

  function onAccountSubmit(data: AccountFormValues) {
    setIsLoading(true)

    if (user) {
      const updatedUser = {
        ...user,
        name: data.name,
        email: data.email,
        updatedAt: new Date().toISOString(),
      }

      updateUser(updatedUser)

      setTimeout(() => {
        setIsLoading(false)
        toast({
          title: "Account updated",
          description: "Your account information has been updated.",
        })
      }, 500)
    }
  }

  if (!user) {
    return (
      <div className="container max-w-6xl py-10">
        <div className="flex flex-col items-center justify-center min-h-[50vh]">
          <p className="text-muted-foreground mb-4">You need to be logged in to access this page.</p>
          <Button asChild>
            <Link href="/login">Log in</Link>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="container max-w-6xl py-10">
      <div className="flex items-center mb-8">
        <Button variant="ghost" size="icon" asChild className="mr-2">
          <Link href="/">
            <ArrowLeft className="h-4 w-4" />
            <span className="sr-only">Back</span>
          </Link>
        </Button>
        <h1 className="text-3xl font-bold">{t("settings.title")}</h1>
      </div>

      <Tabs defaultValue="account" className="space-y-8">
        <TabsList className="grid grid-cols-3 w-full max-w-md">
          <TabsTrigger value="account">
            <User className="h-4 w-4 mr-2" />
            {t("settings.account")}
          </TabsTrigger>
          <TabsTrigger value="appearance">
            <Sun className="h-4 w-4 mr-2" />
            {t("settings.appearance")}
          </TabsTrigger>
          <TabsTrigger value="notifications">
            <Bell className="h-4 w-4 mr-2" />
            {t("settings.notifications")}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="account" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>{t("settings.account_info")}</CardTitle>
              <CardDescription>{t("settings.account_description")}</CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...accountForm}>
                <form onSubmit={accountForm.handleSubmit(onAccountSubmit)} className="space-y-6">
                  <FormField
                    control={accountForm.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t("settings.name")}</FormLabel>
                        <FormControl>
                          <Input placeholder={t("settings.name_placeholder")} {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={accountForm.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t("settings.email")}</FormLabel>
                        <FormControl>
                          <Input placeholder={t("settings.email_placeholder")} {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={accountForm.control}
                    name="bio"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t("settings.bio")}</FormLabel>
                        <FormControl>
                          <Textarea placeholder={t("settings.bio_placeholder")} className="resize-none" {...field} />
                        </FormControl>
                        <FormDescription>{t("settings.bio_description")}</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="flex justify-end">
                    <Button type="submit" disabled={isLoading}>
                      {isLoading ? (
                        <>
                          <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                          {t("actions.saving")}
                        </>
                      ) : (
                        t("actions.save")
                      )}
                    </Button>
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>{t("settings.language")}</CardTitle>
              <CardDescription>{t("settings.language_description")}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                <div className="grid grid-cols-3 gap-2">
                  {availableLanguages.map((lang) => (
                    <Button
                      key={lang.code}
                      variant={language === lang.code ? "default" : "outline"}
                      className="w-full"
                      onClick={() => setLanguage(lang.code)}
                    >
                      <Globe className="mr-2 h-4 w-4" />
                      {lang.name}
                    </Button>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="appearance" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>{t("settings.appearance")}</CardTitle>
              <CardDescription>{t("settings.appearance_description")}</CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...appearanceForm}>
                <form onSubmit={appearanceForm.handleSubmit(onAppearanceSubmit)} className="space-y-6">
                  <FormField
                    control={appearanceForm.control}
                    name="theme"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t("settings.theme")}</FormLabel>
                        <div className="grid grid-cols-3 gap-4 pt-1">
                          <Button
                            type="button"
                            variant={field.value === "light" ? "default" : "outline"}
                            className="justify-start"
                            onClick={() => field.onChange("light")}
                          >
                            <Sun className="mr-2 h-4 w-4" />
                            {t("theme.light")}
                          </Button>
                          <Button
                            type="button"
                            variant={field.value === "dark" ? "default" : "outline"}
                            className="justify-start"
                            onClick={() => field.onChange("dark")}
                          >
                            <Moon className="mr-2 h-4 w-4" />
                            {t("theme.dark")}
                          </Button>
                          <Button
                            type="button"
                            variant={field.value === "system" ? "default" : "outline"}
                            className="justify-start"
                            onClick={() => field.onChange("system")}
                          >
                            <div className="mr-2 h-4 w-4 flex items-center justify-center">
                              <Sun className="h-3 w-3 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                              <Moon className="absolute h-3 w-3 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                            </div>
                            {t("theme.system")}
                          </Button>
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={appearanceForm.control}
                    name="fontSize"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t("settings.font_size")}</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder={t("settings.select_font_size")} />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="default">{t("settings.default")}</SelectItem>
                            <SelectItem value="comfortable">{t("settings.comfortable")}</SelectItem>
                            <SelectItem value="compact">{t("settings.compact")}</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormDescription>{t("settings.font_size_description")}</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="flex justify-end">
                    <Button type="submit" disabled={isLoading}>
                      {isLoading ? (
                        <>
                          <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                          {t("actions.saving")}
                        </>
                      ) : (
                        t("actions.save")
                      )}
                    </Button>
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>{t("settings.notifications")}</CardTitle>
              <CardDescription>{t("settings.notifications_description")}</CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...notificationsForm}>
                <form onSubmit={notificationsForm.handleSubmit(onNotificationsSubmit)} className="space-y-6">
                  <div className="space-y-4">
                    <FormField
                      control={notificationsForm.control}
                      name="emailNotifications"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                          <div className="space-y-0.5">
                            <FormLabel className="text-base">{t("settings.email_notifications")}</FormLabel>
                            <FormDescription>{t("settings.email_notifications_description")}</FormDescription>
                          </div>
                          <FormControl>
                            <Switch checked={field.value} onCheckedChange={field.onChange} />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={notificationsForm.control}
                      name="pushNotifications"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                          <div className="space-y-0.5">
                            <FormLabel className="text-base">{t("settings.push_notifications")}</FormLabel>
                            <FormDescription>{t("settings.push_notifications_description")}</FormDescription>
                          </div>
                          <FormControl>
                            <Switch checked={field.value} onCheckedChange={field.onChange} />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={notificationsForm.control}
                      name="newFeatures"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                          <div className="space-y-0.5">
                            <FormLabel className="text-base">{t("settings.new_features")}</FormLabel>
                            <FormDescription>{t("settings.new_features_description")}</FormDescription>
                          </div>
                          <FormControl>
                            <Switch checked={field.value} onCheckedChange={field.onChange} />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={notificationsForm.control}
                      name="marketingEmails"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                          <div className="space-y-0.5">
                            <FormLabel className="text-base">{t("settings.marketing_emails")}</FormLabel>
                            <FormDescription>{t("settings.marketing_emails_description")}</FormDescription>
                          </div>
                          <FormControl>
                            <Switch checked={field.value} onCheckedChange={field.onChange} />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="flex justify-end">
                    <Button type="submit" disabled={isLoading}>
                      {isLoading ? (
                        <>
                          <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                          {t("actions.saving")}
                        </>
                      ) : (
                        t("actions.save")
                      )}
                    </Button>
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

