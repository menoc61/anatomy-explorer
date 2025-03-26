"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/contexts/auth-context"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { User, Settings, Download, CreditCard, Clock, Heart, BookOpen, Activity, Crown } from "lucide-react"
import Link from "next/link"

export default function AccountPage() {
  const { user } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!user) {
      router.push("/login")
    }
  }, [user, router])

  if (!user) return null

  // Calculate days left in subscription
  const getDaysLeft = () => {
    if (!user.subscription) return 0
    const expiryDate = new Date(user.subscription.expiresAt)
    const now = new Date()
    const diffTime = expiryDate.getTime() - now.getTime()
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  }

  // Mock statistics for the user
  const userStats = {
    videosWatched: 12,
    downloadedResources: 5,
    favoriteItems: 3,
    lastLogin: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toLocaleDateString(),
    daysLeft: getDaysLeft(),
    musclesExplored: 7,
  }

  return (
    <div className="container max-w-6xl py-10">
      <div className="flex flex-col md:flex-row justify-between items-start gap-6 mb-8">
        <div>
          <h1 className="text-3xl font-bold">My Account</h1>
          <p className="text-muted-foreground mt-2">Manage your account settings and preferences</p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <Button asChild variant="outline">
            <Link href="/account/downloads">
              <Download className="mr-2 h-4 w-4" />
              My Downloads
            </Link>
          </Button>
          <Button asChild>
            <Link href="/account/subscription">
              <Crown className="mr-2 h-4 w-4" />
              {user.subscription?.status === "active" ? "Manage Subscription" : "Upgrade to Premium"}
            </Link>
          </Button>
        </div>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="activity">Activity</TabsTrigger>
          <TabsTrigger value="settings">Quick Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Subscription Status Card */}
          <Card
            className={
              user.subscription?.status === "active"
                ? "border-primary/50 bg-primary/5"
                : "border-amber-500/50 bg-amber-500/5"
            }
          >
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center">
                <Crown
                  className={`h-5 w-5 mr-2 ${user.subscription?.status === "active" ? "text-primary" : "text-amber-500"}`}
                />
                Subscription Status
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col md:flex-row justify-between">
                <div>
                  <p className="font-medium text-lg">
                    {user.subscription?.status === "active"
                      ? `${user.subscription.plan.charAt(0).toUpperCase() + user.subscription.plan.slice(1)} Plan`
                      : "Free Trial"}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {user.subscription?.status === "active"
                      ? `Renews on ${new Date(user.subscription.expiresAt).toLocaleDateString()}`
                      : `Expires in ${userStats.daysLeft} days`}
                  </p>
                </div>
                <Button asChild className="mt-4 md:mt-0">
                  <Link href="/account/subscription">
                    {user.subscription?.status === "active" ? "Manage Plan" : "Upgrade Now"}
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Stats Grid */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Videos Watched</CardTitle>
                <BookOpen className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{userStats.videosWatched}</div>
                <p className="text-xs text-muted-foreground">+3 this week</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Downloads</CardTitle>
                <Download className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{userStats.downloadedResources}</div>
                <p className="text-xs text-muted-foreground">+2 this week</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Favorites</CardTitle>
                <Heart className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{userStats.favoriteItems}</div>
                <p className="text-xs text-muted-foreground">+1 this week</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Muscles Explored</CardTitle>
                <Activity className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{userStats.musclesExplored}</div>
                <p className="text-xs text-muted-foreground">Out of 10 total</p>
              </CardContent>
            </Card>
          </div>

          {/* Quick Links */}
          <div className="grid gap-4 md:grid-cols-3">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Profile</CardTitle>
                <CardDescription>Manage your personal information</CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <Button asChild variant="outline" className="w-full">
                  <Link href="/account/profile">
                    <User className="mr-2 h-4 w-4" />
                    Edit Profile
                  </Link>
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Settings</CardTitle>
                <CardDescription>Configure app preferences</CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <Button asChild variant="outline" className="w-full">
                  <Link href="/account/settings">
                    <Settings className="mr-2 h-4 w-4" />
                    App Settings
                  </Link>
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Billing</CardTitle>
                <CardDescription>Manage payment methods</CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <Button asChild variant="outline" className="w-full">
                  <Link href="/account/billing">
                    <CreditCard className="mr-2 h-4 w-4" />
                    Payment Methods
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="activity" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Your recent interactions with the platform</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start gap-4 border-b pb-4">
                  <div className="rounded-full bg-primary/10 p-2">
                    <BookOpen className="h-4 w-4 text-primary" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">Watched "Biceps Function & Movement"</p>
                    <p className="text-sm text-muted-foreground">2 days ago</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 border-b pb-4">
                  <div className="rounded-full bg-primary/10 p-2">
                    <Download className="h-4 w-4 text-primary" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">Downloaded "Quadriceps Anatomy PDF"</p>
                    <p className="text-sm text-muted-foreground">3 days ago</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 border-b pb-4">
                  <div className="rounded-full bg-primary/10 p-2">
                    <Heart className="h-4 w-4 text-primary" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">Added "Deltoid Muscle" to favorites</p>
                    <p className="text-sm text-muted-foreground">5 days ago</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="rounded-full bg-primary/10 p-2">
                    <Clock className="h-4 w-4 text-primary" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">Last login</p>
                    <p className="text-sm text-muted-foreground">{userStats.lastLogin}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Quick Settings</CardTitle>
              <CardDescription>Adjust your most common preferences</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Button asChild variant="outline" className="w-full justify-start">
                  <Link href="/account/settings">
                    <Settings className="mr-2 h-4 w-4" />
                    All Settings
                  </Link>
                </Button>

                <Button asChild variant="outline" className="w-full justify-start">
                  <Link href="/account/profile">
                    <User className="mr-2 h-4 w-4" />
                    Edit Profile
                  </Link>
                </Button>

                <Button asChild variant="outline" className="w-full justify-start">
                  <Link href="/account/downloads">
                    <Download className="mr-2 h-4 w-4" />
                    Manage Downloads
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

