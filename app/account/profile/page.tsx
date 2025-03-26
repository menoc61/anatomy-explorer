"use client"

import { useState } from "react"
import { useAuth } from "@/contexts/auth-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Loader2, Save, Upload, User, Mail, Phone, MapPin, Briefcase, Calendar, Globe } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function ProfilePage() {
  const { user } = useAuth()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)

  const [profile, setProfile] = useState({
    name: user?.name || "",
    email: user?.email || "",
    bio: "Anatomy enthusiast and medical student. Interested in musculoskeletal system and sports medicine.",
    phone: "+1 (555) 123-4567",
    location: "New York, USA",
    occupation: "Medical Student",
    birthdate: "1995-05-15",
    website: "https://example.com",
    publicProfile: true,
    showEmail: false,
    showPhone: false,
  })

  if (!user) return null

  const handleSaveProfile = async () => {
    setIsLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    toast({
      title: "Profile updated",
      description: "Your profile information has been saved successfully.",
      duration: 3000,
    })

    setIsLoading(false)
  }

  return (
    <div className="container max-w-4xl py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Edit Profile</h1>
        <p className="text-muted-foreground mt-2">Update your personal information and profile settings</p>
      </div>

      <div className="grid gap-6 md:grid-cols-[1fr_2fr]">
        <Card>
          <CardContent className="pt-6 flex flex-col items-center">
            <div className="relative mb-6">
              <Avatar className="h-32 w-32">
                <AvatarImage src={`https://avatar.vercel.sh/${user.email}`} alt={user.name} />
                <AvatarFallback className="text-4xl">{user.name.charAt(0).toUpperCase()}</AvatarFallback>
              </Avatar>
              <Button
                size="icon"
                className="absolute bottom-0 right-0 rounded-full h-8 w-8 bg-primary text-primary-foreground"
              >
                <Upload className="h-4 w-4" />
                <span className="sr-only">Upload avatar</span>
              </Button>
            </div>

            <h2 className="text-xl font-semibold">{user.name}</h2>
            <p className="text-sm text-muted-foreground">{user.email}</p>

            <div className="w-full mt-6 space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="public-profile">Public profile</Label>
                <Switch
                  id="public-profile"
                  checked={profile.publicProfile}
                  onCheckedChange={(checked) => setProfile({ ...profile, publicProfile: checked })}
                />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="show-email">Show email</Label>
                <Switch
                  id="show-email"
                  checked={profile.showEmail}
                  onCheckedChange={(checked) => setProfile({ ...profile, showEmail: checked })}
                />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="show-phone">Show phone</Label>
                <Switch
                  id="show-phone"
                  checked={profile.showPhone}
                  onCheckedChange={(checked) => setProfile({ ...profile, showPhone: checked })}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="personal" className="space-y-6">
          <TabsList>
            <TabsTrigger value="personal">Personal Info</TabsTrigger>
            <TabsTrigger value="contact">Contact</TabsTrigger>
            <TabsTrigger value="bio">Bio & Details</TabsTrigger>
          </TabsList>

          <TabsContent value="personal" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Personal Information</CardTitle>
                <CardDescription>Update your personal details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-2">
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4 text-muted-foreground" />
                    <Label htmlFor="name">Full Name</Label>
                  </div>
                  <Input
                    id="name"
                    value={profile.name}
                    onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                  />
                </div>

                <div className="grid gap-2">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <Label htmlFor="birthdate">Date of Birth</Label>
                  </div>
                  <Input
                    id="birthdate"
                    type="date"
                    value={profile.birthdate}
                    onChange={(e) => setProfile({ ...profile, birthdate: e.target.value })}
                  />
                </div>

                <div className="grid gap-2">
                  <div className="flex items-center gap-2">
                    <Briefcase className="h-4 w-4 text-muted-foreground" />
                    <Label htmlFor="occupation">Occupation</Label>
                  </div>
                  <Input
                    id="occupation"
                    value={profile.occupation}
                    onChange={(e) => setProfile({ ...profile, occupation: e.target.value })}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="contact" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
                <CardDescription>Update your contact details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-2">
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <Label htmlFor="email">Email Address</Label>
                  </div>
                  <Input
                    id="email"
                    type="email"
                    value={profile.email}
                    onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                  />
                </div>

                <div className="grid gap-2">
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <Label htmlFor="phone">Phone Number</Label>
                  </div>
                  <Input
                    id="phone"
                    value={profile.phone}
                    onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                  />
                </div>

                <div className="grid gap-2">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <Label htmlFor="location">Location</Label>
                  </div>
                  <Input
                    id="location"
                    value={profile.location}
                    onChange={(e) => setProfile({ ...profile, location: e.target.value })}
                  />
                </div>

                <div className="grid gap-2">
                  <div className="flex items-center gap-2">
                    <Globe className="h-4 w-4 text-muted-foreground" />
                    <Label htmlFor="website">Website</Label>
                  </div>
                  <Input
                    id="website"
                    value={profile.website}
                    onChange={(e) => setProfile({ ...profile, website: e.target.value })}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="bio" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Bio & Details</CardTitle>
                <CardDescription>Tell others about yourself</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-2">
                  <Label htmlFor="bio">Bio</Label>
                  <Textarea
                    id="bio"
                    rows={5}
                    value={profile.bio}
                    onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                    placeholder="Tell us about yourself, your interests, and your experience with anatomy..."
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      <div className="mt-8 flex justify-end">
        <Button onClick={handleSaveProfile} disabled={isLoading}>
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Saving...
            </>
          ) : (
            <>
              <Save className="mr-2 h-4 w-4" />
              Save Profile
            </>
          )}
        </Button>
      </div>
    </div>
  )
}

