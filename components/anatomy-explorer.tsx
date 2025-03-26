"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Info,
  X,
  Maximize2,
  Minimize2,
  Dumbbell,
  Share,
  LogOut,
  Settings,
  Globe,
  User,
  ChevronUp,
  Database,
  HelpCircle,
  Moon,
  Sun,
  MoreVertical,
  Crown,
  Laptop,
  LayoutDashboard,
  Video,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { muscleData } from "@/lib/muscle-data"
import SketchfabViewer from "@/components/sketchfab-viewer"
import FallbackModel from "@/components/fallback-model"
import VideoSection from "@/components/video-section"
import SubscriptionBanner from "@/components/subscription-banner"
import { useLanguage } from "@/contexts/language-context"
import { DownloadButton } from "./download-button"
import { useTheme } from "next-themes"
import { useAuth } from "@/contexts/auth-context"
import { useRouter } from "next/navigation"
import { useI18n } from "@/contexts/i18n-context"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel,
  DropdownMenuGroup,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
  DropdownMenuPortal,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"

export default function AnatomyExplorer() {
  const [selectedMuscle, setSelectedMuscle] = useState<string | null>(null)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [activeTab, setActiveTab] = useState("overview")
  const [use3DModel, setUse3DModel] = useState(true)
  const [modelError, setModelError] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const { language, setLanguage, availableLanguages } = useLanguage()
  const { theme, setTheme } = useTheme()
  const { user, logout, isAdmin } = useAuth()
  const router = useRouter()
  const { t } = useI18n()
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)

    return () => {
      window.removeEventListener("resize", checkMobile)
    }
  }, [])

  const handleMuscleSelect = (muscleId: string) => {
    setSelectedMuscle(muscleId)
    setActiveTab("overview")
  }

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      containerRef.current?.requestFullscreen().catch((err) => {
        console.error(`Error attempting to enable fullscreen: ${err.message}`)
      })
    } else {
      document.exitFullscreen()
    }
    setIsFullscreen(!isFullscreen)
  }

  const handleModelError = () => {
    setModelError(true)
    setUse3DModel(false)
  }

  const toggleModelType = () => {
    setUse3DModel(!use3DModel)
  }

  const handleLogout = () => {
    logout()
  }

  const handleSettings = () => {
    router.push("/account/settings")
  }

  const handleProfile = () => {
    router.push("/account/profile")
  }

  const handleSubscription = () => {
    router.push("/account/subscription")
  }

  const handleAdmin = () => {
    router.push("/admin")
  }

  const handleDatabaseSettings = () => {
    router.push("/admin/database")
  }

  const handleVideoManagement = () => {
    router.push("/admin/videos")
  }

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement)
    }

    document.addEventListener("fullscreenchange", handleFullscreenChange)
    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange)
    }
  }, [])

  return (
    <div
      ref={containerRef}
      className="w-full h-screen flex flex-col md:flex-row bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-900 dark:to-slate-800 text-foreground overflow-hidden"
    >
      {/* 3D Viewer Section */}
      <div className="relative w-full h-[50vh] md:h-full md:w-2/3 flex-shrink-0">
        <div className="absolute top-4 right-4 z-10 flex gap-2">
          <Button
            variant="outline"
            size="icon"
            className="bg-background/30 backdrop-blur-sm border-border/20 hover:bg-background/50"
            onClick={toggleFullscreen}
          >
            {isFullscreen ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
          </Button>
          {modelError && (
            <Button
              variant="outline"
              className="bg-background/30 backdrop-blur-sm border-border/20 hover:bg-background/50 text-xs"
              onClick={toggleModelType}
            >
              {use3DModel ? "Use 2D Model" : "Try 3D Model"}
            </Button>
          )}
          <Button
            variant="outline"
            size="icon"
            className="bg-background/30 backdrop-blur-sm border-border/20 hover:bg-background/50"
            onClick={() => setSelectedMuscle(null)}
          >
            <Info className="h-4 w-4" />
          </Button>
        </div>

        {use3DModel ? (
          <SketchfabViewer
            modelId="31b40fd809b14665b93773936d67c52c"
            onAnnotationSelect={handleMuscleSelect}
            selectedMuscle={selectedMuscle}
            onError={handleModelError}
          />
        ) : (
          <FallbackModel onMuscleSelect={handleMuscleSelect} />
        )}
      </div>

      {/* Information Panel */}
      <div className="w-full md:w-1/3 h-[50vh] md:h-full overflow-y-auto bg-background/30 backdrop-blur-md border-l border-border/10 relative">
        <AnimatePresence mode="wait">
          {selectedMuscle ? (
            <motion.div
              key="muscle-details"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
              className="p-6 h-full flex flex-col pb-20 md:pb-24" // Add padding to bottom for user widget
            >
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                    <Dumbbell className="h-5 w-5 text-primary" />
                  </div>
                  <h2 className="text-2xl font-bold">{muscleData[selectedMuscle]?.name || "Selected Muscle"}</h2>
                </div>
                <Button variant="ghost" size="icon" onClick={() => setSelectedMuscle(null)}>
                  <X className="h-5 w-5" />
                </Button>
              </div>

              <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col">
                <TabsList className="grid grid-cols-4 mb-4">
                  <TabsTrigger value="overview">{t("muscles.overview")}</TabsTrigger>
                  <TabsTrigger value="function">{t("muscles.function")}</TabsTrigger>
                  <TabsTrigger value="conditions">{t("muscles.conditions")}</TabsTrigger>
                  <TabsTrigger value="videos">{t("muscles.videos")}</TabsTrigger>
                </TabsList>

                <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar">
                  <TabsContent value="overview" className="mt-0 h-full">
                    <Card className="border-none bg-card/50">
                      <CardContent className="p-4 space-y-4">
                        <Dialog>
                          <DialogTrigger asChild>
                            <div className="aspect-video rounded-lg overflow-hidden bg-muted mb-4 relative group cursor-pointer">
                              <img
                                src={muscleData[selectedMuscle]?.image || "/placeholder.svg?height=300&width=500"}
                                alt={muscleData[selectedMuscle]?.name}
                                className="w-full h-full object-cover transition-transform group-hover:scale-105"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-start p-4">
                                <Button variant="secondary" size="sm" className="gap-1">
                                  <Maximize2 className="h-3 w-3" />
                                  <span>View Larger</span>
                                </Button>
                              </div>
                            </div>
                          </DialogTrigger>
                          <DialogContent className="max-w-4xl">
                            <img
                              src={muscleData[selectedMuscle]?.image || "/placeholder.svg?height=600&width=800"}
                              alt={muscleData[selectedMuscle]?.name}
                              className="w-full h-auto rounded-lg"
                            />
                          </DialogContent>
                        </Dialog>

                        <div className="bg-primary/5 border border-primary/10 rounded-lg p-3 mb-2">
                          <p className="italic text-sm">{muscleData[selectedMuscle]?.shortDescription}</p>
                        </div>

                        <p>{muscleData[selectedMuscle]?.description}</p>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
                          <div className="bg-muted/50 p-3 rounded-lg">
                            <h4 className="font-medium text-muted-foreground mb-1">{t("muscles.origin")}</h4>
                            <p>{muscleData[selectedMuscle]?.origin}</p>
                          </div>
                          <div className="bg-muted/50 p-3 rounded-lg">
                            <h4 className="font-medium text-muted-foreground mb-1">{t("muscles.insertion")}</h4>
                            <p>{muscleData[selectedMuscle]?.insertion}</p>
                          </div>
                        </div>

                        <div className="flex justify-between items-center pt-2">
                          <Button variant="outline" size="sm" className="gap-1">
                            <Share className="h-3 w-3" />
                            {t("actions.share")}
                          </Button>
                          <DownloadButton
                            url={`/pdfs/${selectedMuscle}-anatomy.pdf`}
                            filename={`${muscleData[selectedMuscle]?.name.replace(/\s+/g, "-").toLowerCase()}-anatomy.pdf`}
                            type="pdf"
                            variant="outline"
                            size="sm"
                          />
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  <TabsContent value="function" className="mt-0">
                    <Card className="border-none bg-card/50">
                      <CardContent className="p-4 space-y-4">
                        <h3 className="text-lg font-medium">Primary Functions</h3>
                        <ul className="list-disc pl-5 space-y-2">
                          {muscleData[selectedMuscle]?.functions.map((func, index) => (
                            <li key={index}>{func}</li>
                          ))}
                        </ul>

                        <h3 className="text-lg font-medium mt-6">Movements</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          {muscleData[selectedMuscle]?.movements.map((movement, index) => (
                            <div key={index} className="bg-muted/50 p-3 rounded-lg">
                              <p>{movement}</p>
                            </div>
                          ))}
                        </div>

                        <div className="flex justify-end">
                          <DownloadButton
                            url={`/pdfs/${selectedMuscle}-function.pdf`}
                            filename={`${muscleData[selectedMuscle]?.name.replace(/\s+/g, "-").toLowerCase()}-function.pdf`}
                            type="pdf"
                            variant="outline"
                            size="sm"
                          />
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  <TabsContent value="conditions" className="mt-0">
                    <Card className="border-none bg-card/50">
                      <CardContent className="p-4 space-y-4">
                        <h3 className="text-lg font-medium">Common Conditions</h3>
                        <div className="space-y-4">
                          {muscleData[selectedMuscle]?.conditions.map((condition, index) => (
                            <div key={index} className="bg-muted/50 p-3 rounded-lg">
                              <h4 className="font-medium mb-1">{condition.name}</h4>
                              <p className="text-sm">{condition.description}</p>
                            </div>
                          ))}
                        </div>

                        <div className="flex justify-end">
                          <DownloadButton
                            url={`/pdfs/${selectedMuscle}-conditions.pdf`}
                            filename={`${muscleData[selectedMuscle]?.name.replace(/\s+/g, "-").toLowerCase()}-conditions.pdf`}
                            type="pdf"
                            variant="outline"
                            size="sm"
                          />
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  <TabsContent value="videos" className="mt-0">
                    <Card className="border-none bg-card/50">
                      <CardContent className="p-4">
                        <VideoSection selectedMuscle={selectedMuscle} />
                      </CardContent>
                    </Card>
                  </TabsContent>
                </div>
              </Tabs>
            </motion.div>
          ) : (
            <motion.div
              key="muscle-selection"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="p-6 h-full flex flex-col pb-20 md:pb-24" // Add padding to bottom for user widget
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground">
                  <Dumbbell className="h-5 w-5" />
                </div>
                <h2 className="text-2xl font-bold">{t("muscles.title")}</h2>
              </div>
              <p className="text-muted-foreground mb-6">
                {t("muscles.select")} {use3DModel ? "3D" : "2D"}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 overflow-y-auto pr-2 custom-scrollbar">
                {Object.entries(muscleData).map(([id, muscle]) => (
                  <motion.div
                    key={id}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="bg-card/50 hover:bg-card/80 rounded-lg p-4 cursor-pointer transition-colors"
                    onClick={() => handleMuscleSelect(id)}
                  >
                    <h3 className="font-medium">{muscle.name}</h3>
                    <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{muscle.shortDescription}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* User Options Bar at Bottom - Always visible and fixed */}
        <div className="fixed bottom-0 left-0 right-0 bg-background/80 backdrop-blur-md border-t border-border/20 p-3 flex justify-between items-center z-50">
          {user && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-10 gap-2 px-2 hover:bg-background/50">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={`https://avatar.vercel.sh/${user.email}`} alt={user.name} />
                    <AvatarFallback>{user.name.charAt(0).toUpperCase()}</AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col items-start text-sm">
                    <span className="font-medium">{user.name}</span>
                    <span className="text-xs text-muted-foreground">{user.role}</span>
                  </div>
                  <ChevronUp className="h-4 w-4 text-muted-foreground" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-56">
                <DropdownMenuLabel>{t("user.profile")}</DropdownMenuLabel>
                <DropdownMenuSeparator />

                <DropdownMenuItem onClick={handleProfile}>
                  <User className="mr-2 h-4 w-4" />
                  <span>{t("user.profile")}</span>
                </DropdownMenuItem>

                <DropdownMenuItem onClick={handleSubscription}>
                  <Crown className="mr-2 h-4 w-4" />
                  <span>{t("user.subscription")}</span>
                </DropdownMenuItem>

                <DropdownMenuItem onClick={handleSettings}>
                  <Settings className="mr-2 h-4 w-4" />
                  <span>{t("user.settings")}</span>
                </DropdownMenuItem>

                <DropdownMenuSeparator />

                <DropdownMenuGroup>
                  <DropdownMenuSub>
                    <DropdownMenuSubTrigger>
                      <Globe className="mr-2 h-4 w-4" />
                      <span>{t("user.language")}</span>
                    </DropdownMenuSubTrigger>
                    <DropdownMenuPortal>
                      <DropdownMenuSubContent>
                        {availableLanguages.map((lang) => (
                          <DropdownMenuItem
                            key={lang.code}
                            onClick={() => setLanguage(lang.code)}
                            className={language === lang.code ? "bg-primary/10" : ""}
                          >
                            {lang.name}
                          </DropdownMenuItem>
                        ))}
                      </DropdownMenuSubContent>
                    </DropdownMenuPortal>
                  </DropdownMenuSub>

                  <DropdownMenuSub>
                    <DropdownMenuSubTrigger>
                      {theme === "dark" ? <Moon className="mr-2 h-4 w-4" /> : <Sun className="mr-2 h-4 w-4" />}
                      <span>{t("user.theme")}</span>
                    </DropdownMenuSubTrigger>
                    <DropdownMenuPortal>
                      <DropdownMenuSubContent>
                        <DropdownMenuItem onClick={() => setTheme("light")}>
                          <Sun className="mr-2 h-4 w-4" />
                          <span>{t("theme.light")}</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setTheme("dark")}>
                          <Moon className="mr-2 h-4 w-4" />
                          <span>{t("theme.dark")}</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setTheme("system")}>
                          <Laptop className="mr-2 h-4 w-4" />
                          <span>{t("theme.system")}</span>
                        </DropdownMenuItem>
                      </DropdownMenuSubContent>
                    </DropdownMenuPortal>
                  </DropdownMenuSub>
                </DropdownMenuGroup>

                {isAdmin && (
                  <>
                    <DropdownMenuSeparator />
                    <DropdownMenuLabel>Admin</DropdownMenuLabel>

                    <DropdownMenuItem onClick={handleAdmin}>
                      <LayoutDashboard className="mr-2 h-4 w-4" />
                      <span>{t("admin.title")}</span>
                    </DropdownMenuItem>

                    <DropdownMenuItem onClick={handleVideoManagement}>
                      <Video className="mr-2 h-4 w-4" />
                      <span>{t("admin.videos")}</span>
                    </DropdownMenuItem>

                    <DropdownMenuItem onClick={handleDatabaseSettings}>
                      <Database className="mr-2 h-4 w-4" />
                      <span>{t("database.title")}</span>
                    </DropdownMenuItem>
                  </>
                )}

                <DropdownMenuSeparator />

                <DropdownMenuItem onClick={handleLogout} className="text-red-500 focus:text-red-500">
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>{t("user.logout")}</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}

          <div className="flex items-center gap-2">
            {isMobile ? (
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" size="icon" className="h-10 w-10">
                    <MoreVertical className="h-5 w-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="bottom" className="h-[60vh]">
                  <div className="grid gap-4 py-4">
                    <Button
                      variant="outline"
                      className="w-full justify-start"
                      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                    >
                      {theme === "dark" ? <Sun className="mr-2 h-4 w-4" /> : <Moon className="mr-2 h-4 w-4" />}
                      {theme === "dark" ? t("theme.light") : t("theme.dark")}
                    </Button>

                    <Button variant="outline" className="w-full justify-start" onClick={handleSettings}>
                      <Settings className="mr-2 h-4 w-4" />
                      {t("settings.title")}
                    </Button>

                    <Button variant="outline" className="w-full justify-start" onClick={() => router.push("/help")}>
                      <HelpCircle className="mr-2 h-4 w-4" />
                      Help
                    </Button>

                    <div className="grid grid-cols-3 gap-2">
                      {availableLanguages.map((lang) => (
                        <Button
                          key={lang.code}
                          variant={language === lang.code ? "default" : "outline"}
                          className="w-full"
                          onClick={() => setLanguage(lang.code)}
                        >
                          {lang.code.toUpperCase()}
                        </Button>
                      ))}
                    </div>

                    {user && (
                      <Button variant="destructive" className="w-full justify-start" onClick={handleLogout}>
                        <LogOut className="mr-2 h-4 w-4" />
                        {t("user.logout")}
                      </Button>
                    )}
                  </div>
                </SheetContent>
              </Sheet>
            ) : (
              <>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm" className="gap-1">
                      <Globe className="h-4 w-4" />
                      <span>{language.toUpperCase()}</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    {availableLanguages.map((lang) => (
                      <DropdownMenuItem
                        key={lang.code}
                        onClick={() => setLanguage(lang.code)}
                        className={language === lang.code ? "bg-primary/10" : ""}
                      >
                        {lang.name}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>

                <Button
                  variant="outline"
                  size="sm"
                  className="gap-1"
                  onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                >
                  {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
                </Button>

                <Button variant="outline" size="sm" className="gap-1" onClick={handleSettings}>
                  <Settings className="h-4 w-4" />
                  <span>{t("settings.title")}</span>
                </Button>

                {user && (
                  <Button variant="outline" size="sm" className="gap-1" onClick={handleLogout}>
                    <LogOut className="h-4 w-4" />
                    <span>{t("user.logout")}</span>
                  </Button>
                )}
              </>
            )}
          </div>
        </div>
      </div>

      {/* Subscription Banner */}
      <SubscriptionBanner />
    </div>
  )
}

