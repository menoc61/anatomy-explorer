"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Maximize2,
  Dumbbell,
  Share,
  LogOut,
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
  CreditCard,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { muscleData } from "@/lib/muscle-data";
import VideoSection from "@/components/video-section";
import { useLanguage } from "@/contexts/language-context";
import { DownloadButton } from "./download-button";
import { useTheme } from "next-themes";
import { useAuth } from "@/contexts/auth-context";
import { useRouter } from "next/navigation";
import { useI18n } from "@/contexts/i18n-context";
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
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { useToast } from "@/components/ui/use-toast";
import { User as AuthUser } from "@/types"; 

interface InformationPanelProps {
  selectedMuscle: string | null;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  handleBackToMuscleGroups: () => void;
  handleShare: () => void;
  handleMuscleSelect: (id: string) => void; 
  showUserWidget: boolean;
  user: AuthUser | null;
  isAdmin: boolean;
  isSubscribed: boolean;
  isTrialActive: boolean;
  handleLogout: () => void;
  handleProfile: () => void;
  handleSubscription: () => void;
  handleHelp: () => void;
  handleAdmin: () => void;
  handleVideoManagement: () => void;
  handlePredictions: () => void;
  use3DModel: boolean; 
}

export default function InformationPanel({
  selectedMuscle,
  activeTab,
  setActiveTab,
  handleBackToMuscleGroups,
  handleShare,
  handleMuscleSelect,
  showUserWidget,
  user,
  isAdmin,
  isSubscribed,
  isTrialActive,
  handleLogout,
  handleProfile,
  handleSubscription,
  handleHelp,
  handleAdmin,
  handleVideoManagement,
  handlePredictions,
  use3DModel,
}: InformationPanelProps) {
  const { language, setLanguage, availableLanguages } = useLanguage();
  const { theme, setTheme } = useTheme();
  const { t } = useI18n();
  const { toast } = useToast(); 
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);

  useEffect(() => {
    const checkDeviceSize = () => {
      setIsMobile(window.innerWidth < 640);
      setIsTablet(window.innerWidth >= 640 && window.innerWidth < 1024);
    };

    checkDeviceSize();
    window.addEventListener("resize", checkDeviceSize);

    return () => {
      window.removeEventListener("resize", checkDeviceSize);
    };
  }, []);

  return (
    <div className="w-full md:w-1/3 h-[50vh] md:h-full overflow-y-auto bg-background/30 backdrop-blur-md border-l border-border/10 relative">
      <AnimatePresence mode="wait">
        {selectedMuscle ? (
          <motion.div
            key="muscle-details"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.3 }}
            className="p-6 h-full flex flex-col"
          >
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                  <Dumbbell className="h-5 w-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">
                  {muscleData[selectedMuscle]?.name || "Selected Muscle"}
                </h2>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={handleBackToMuscleGroups}
              >
                <X className="h-5 w-5" />
              </Button>
            </div>

            <Tabs
              value={activeTab}
              onValueChange={setActiveTab}
              className="flex-1 flex flex-col"
            >
              <TabsList className="grid grid-cols-4 mb-4">
                <TabsTrigger value="overview">
                  {t("muscles.overview")}
                </TabsTrigger>
                <TabsTrigger value="function">
                  {t("muscles.function")}
                </TabsTrigger>
                <TabsTrigger value="conditions">
                  {t("muscles.conditions")}
                </TabsTrigger>
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
                              src={
                                muscleData[selectedMuscle]?.image ||
                                "/placeholder.svg?height=300&width=500"
                              }
                              alt={muscleData[selectedMuscle]?.name}
                              className="w-full h-full object-cover transition-transform group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-start p-4">
                              <Button
                                variant="secondary"
                                size="sm"
                                className="gap-1"
                              >
                                <Maximize2 className="h-3 w-3" />
                                <span>View Larger</span>
                              </Button>
                            </div>
                          </div>
                        </DialogTrigger>
                        <DialogContent className="max-w-4xl">
                          <img
                            src={
                              muscleData[selectedMuscle]?.image ||
                              "/placeholder.svg?height=600&width=800"
                            }
                            alt={muscleData[selectedMuscle]?.name}
                            className="w-full h-auto rounded-lg"
                          />
                        </DialogContent>
                      </Dialog>

                      <div className="bg-primary/5 border border-primary/10 rounded-lg p-3 mb-2">
                        <p className="italic text-sm">
                          {muscleData[selectedMuscle]?.shortDescription}
                        </p>
                      </div>

                      <p>{muscleData[selectedMuscle]?.description}</p>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
                        <div className="bg-muted/50 p-3 rounded-lg">
                          <h4 className="font-medium text-muted-foreground mb-1">
                            {t("muscles.origin")}
                          </h4>
                          <p>{muscleData[selectedMuscle]?.origin}</p>
                        </div>
                        <div className="bg-muted/50 p-3 rounded-lg">
                          <h4 className="font-medium text-muted-foreground mb-1">
                            {t("muscles.insertion")}
                          </h4>
                          <p>{muscleData[selectedMuscle]?.insertion}</p>
                        </div>
                      </div>

                      <div className="flex justify-between items-center pt-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className="gap-1"
                          onClick={handleShare}
                        >
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
                        {muscleData[selectedMuscle]?.functions?.map(
                          (func, index) => (
                            <li key={index}>{func}</li>
                          )
                        )}
                      </ul>

                      <h3 className="text-lg font-medium mt-6">Movements</h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {muscleData[selectedMuscle]?.movements?.map(
                          (movement, index) => (
                            <div
                              key={index}
                              className="bg-muted/50 p-3 rounded-lg"
                            >
                              <p>{movement}</p>
                            </div>
                          )
                        )}
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
                        {muscleData[selectedMuscle]?.conditions?.map(
                          (condition, index) => (
                            <div
                              key={index}
                              className="bg-muted/50 p-3 rounded-lg"
                            >
                              <h4 className="font-medium mb-1">
                                {condition.name}
                              </h4>
                              <p className="text-sm">
                                {condition.description}
                              </p>
                            </div>
                          )
                        )}
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
            className="p-6 h-full flex flex-col pb-20 md:pb-24" // Add padding for user widget
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
              {Object.entries(muscleData).map(([id, muscle], index) => (
                <motion.div
                  key={id}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="bg-card/50 hover:bg-card/80 rounded-lg p-4 cursor-pointer transition-colors relative"
                  onClick={() => handleMuscleSelect(id)}
                >
                  <div className="absolute top-2 right-2 w-6 h-6 rounded-full bg-primary/90 flex items-center justify-center text-primary-foreground text-xs font-bold">
                    {index + 1}
                  </div>
                  <h3 className="font-medium">{muscle.name}</h3>
                  <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                    {muscle.shortDescription}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* User Options Bar at Bottom - Only visible on muscle groups screen */}
      {showUserWidget && user && (
        <div className="fixed bottom-0 left-0 right-0 bg-background/80 backdrop-blur-md border-t border-border/20 p-3 flex justify-between items-center z-50">
          {/* ^^^ Reverted to always fixed positioning ^^^ */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="h-10 gap-2 px-2 hover:bg-background/50"
              >
                <Avatar className="h-8 w-8">
                  <AvatarImage
                    src={`https://avatar.vercel.sh/${user.email}`}
                    alt={user.name}
                  />
                  <AvatarFallback>
                    {user.name?.charAt(0).toUpperCase() || "U"}
                  </AvatarFallback>
                </Avatar>
                <div className="flex flex-col items-start text-sm">
                  <span className="font-medium">{user.name}</span>
                  <span className="text-xs text-muted-foreground">
                    {user.role}
                  </span>
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
                <CreditCard className="mr-2 h-4 w-4" />
                <span>{t("user.subscription")}</span>
              </DropdownMenuItem>

              <DropdownMenuItem onClick={handleHelp}>
                <HelpCircle className="mr-2 w-4" />
                <span>{t("help.title")}</span>
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
                          className={
                            language === lang.code ? "bg-primary/10" : ""
                          }
                        >
                          {lang.name}
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuSubContent>
                  </DropdownMenuPortal>
                </DropdownMenuSub>

                <DropdownMenuSub>
                  <DropdownMenuSubTrigger>
                    {theme === "dark" ? (
                      <Moon className="mr-2 h-4 w-4" />
                    ) : (
                      <Sun className="mr-2 h-4 w-4" />
                    )}
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

                  <DropdownMenuItem onClick={handlePredictions}>
                    <Database className="mr-2 h-4 w-4" />
                    <span>{t("predictions.title")}</span>
                  </DropdownMenuItem>
                </>
              )}

              <DropdownMenuSeparator />

              <DropdownMenuItem
                onClick={handleLogout}
                className="text-red-500 focus:text-red-500"
              >
                <LogOut className="mr-2 h-4 w-4" />
                <span>{t("user.logout")}</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

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
                      onClick={() =>
                        setTheme(theme === "dark" ? "light" : "dark")
                      }
                    >
                      {theme === "dark" ? (
                        <Sun className="mr-2 h-4 w-4" />
                      ) : (
                        <Moon className="mr-2 h-4 w-4" />
                      )}
                      {theme === "dark" ? t("theme.light") : t("theme.dark")}
                    </Button>

                    <Button
                      variant="outline"
                      className="w-full justify-start"
                      onClick={handleHelp}
                    >
                      <HelpCircle className="mr-2 h-4 w-4" />
                      Help
                    </Button>

                    <div className="grid grid-cols-3 gap-2">
                      {availableLanguages.map((lang) => (
                        <Button
                          key={lang.code}
                          variant={
                            language === lang.code ? "default" : "outline"
                          }
                          className="w-full"
                          onClick={() => setLanguage(lang.code)}
                        >
                          {lang.code.toUpperCase()}
                        </Button>
                      ))}
                    </div>

                    {!isSubscribed && !isTrialActive && (
                      <Button
                        variant="default"
                        className="w-full justify-start"
                        onClick={handleSubscription}
                      >
                        <Crown className="mr-2 h-4 w-4" />
                        Subscribe for 3D
                      </Button>
                    )}

                    {user && (
                      <Button
                        variant="destructive"
                        className="w-full justify-start"
                        onClick={handleLogout}
                      >
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
                        className={
                          language === lang.code ? "bg-primary/10" : ""
                        }
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
                  {theme === "dark" ? (
                    <Sun className="h-4 w-4" />
                  ) : (
                    <Moon className="h-4 w-4" />
                  )}
                </Button>

                <Button
                  variant="outline"
                  size="sm"
                  className="gap-1"
                  onClick={handleHelp}
                >
                  <HelpCircle className="h-4 w-4" />
                  <span>Help</span>
                </Button>

                {!isSubscribed && !isTrialActive && (
                  <Button
                    variant="default"
                    size="sm"
                    className="gap-1"
                    onClick={handleSubscription}
                  >
                    <Crown className="h-4 w-4" />
                    <span>Subscribe</span>
                  </Button>
                )}
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
