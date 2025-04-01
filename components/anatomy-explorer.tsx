"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Maximize2,
  Minimize2,
  Crown,
} from "lucide-react";
import { Button } from "@/components/ui/button"; 
import { muscleData } from "@/lib/muscle-data";
import dynamic from "next/dynamic";
import FallbackModel from "@/components/fallback-model";
import SubscriptionBanner from "@/components/subscription-banner";
import { useAuth } from "@/contexts/auth-context"; 
import { useRouter } from "next/navigation";
import { useI18n } from "@/contexts/i18n-context"; 
import { useToast } from "@/components/ui/use-toast";
import InformationPanel from "./information-panel";
import { User as AuthUser } from "@/types";

// Dynamically import the Sketchfab viewer to avoid SSR issues
const SketchfabViewerWrapper = dynamic(
  () => import("@/components/sketchfab-viewer-wrapper"),
  {
    ssr: false,
  }
);

export default function AnatomyExplorer() {
  const [selectedMuscle, setSelectedMuscle] = useState<string | null>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");
  const [use3DModel, setUse3DModel] = useState(false);
  const [modelError, setModelError] = useState(false);
  const [showUserWidget, setShowUserWidget] = useState(true); 
  const containerRef = useRef<HTMLDivElement>(null);

  const {
    user,
    logout, 
    isAdmin, 
    isSubscribed,
    isTrialActive,
    trialDaysRemaining,
  } = useAuth();
  const router = useRouter();
  const { t } = useI18n(); 
  const { toast } = useToast(); 


  // Set default model type based on subscription status
  useEffect(() => {
    let shouldUse3D = false;
    if (isSubscribed || isTrialActive) {
      shouldUse3D = true;
    }
    setUse3DModel(shouldUse3D);
  }, [isSubscribed, isTrialActive]);

  const handleMuscleSelect = useCallback((muscleId: string) => {
    setSelectedMuscle(muscleId);
    setActiveTab("overview");
    setShowUserWidget(false); 
  }, []);

  const handleBackToMuscleGroups = useCallback(() => {
    setSelectedMuscle(null);
    setShowUserWidget(true);
  }, []);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      containerRef.current?.requestFullscreen().catch((err) => {
        console.error(`Error attempting to enable fullscreen: ${err.message}`);
      });
    } else {
      document.exitFullscreen();
    }
    setIsFullscreen(!isFullscreen);
  };

  const handleModelError = useCallback(() => {
    setModelError(true);
    setUse3DModel(false);
    toast({
      title: t("app.error"),
      description: t("error.modelLoad"),
      variant: "destructive",
    });
  }, [toast, t]);

  // Function to handle copying link to clipboard (Could be moved to panel if only used there)
  const handleShare = useCallback(async () => {
    const shareUrl = window.location.href;
    try {
      await navigator.clipboard.writeText(shareUrl);
      toast({
        title: t("app.success"),
        description: t("actions.copyLinkSuccess"),
      });
    } catch (err) {
      console.error("Failed to copy link: ", err);
      toast({
        title: t("app.error"),
        description: t("actions.copyLinkError"),
        variant: "destructive",
      });
    }
  }, [toast, t]);

  const toggleModelType = useCallback(() => {
    if (!use3DModel && !isSubscribed && !isTrialActive) {
      router.push("/account/subscription"); 
      return;
    }
    const newModelType = !use3DModel;
    setUse3DModel(newModelType);
    setModelError(false); 
  }, [use3DModel, isSubscribed, isTrialActive, router]);

  // Define handlers to pass down
  const handleLogout = useCallback(() => {
    logout();
  }, [logout]);

  const handleProfile = useCallback(() => {
    router.push("/account/profile");
  }, [router]);

  const handleSubscription = useCallback(() => {
    router.push("/account/subscription");
  }, [router]);

  const handleHelp = useCallback(() => {
    router.push("/help");
  }, [router]);

  const handleAdmin = useCallback(() => {
    router.push("/admin");
  }, [router]);

  const handleVideoManagement = useCallback(() => {
    router.push("/admin/videos");
  }, [router]);

  const handlePredictions = useCallback(() => {
    router.push("/predictions");
  }, [router]);

  // Fullscreen change listener
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="w-full h-screen flex flex-col md:flex-row bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-900 dark:to-slate-800 text-foreground overflow-hidden"
    >
      {/* 3D/2D Viewer Section */}
      <div className="relative w-full h-[50vh] md:h-full md:w-2/3 flex-shrink-0">
        <div className="absolute top-4 right-4 z-10 flex gap-2">
          <Button
            variant="outline"
            size="icon"
            className="bg-background/30 backdrop-blur-sm border-border/20 hover:bg-background/50"
            onClick={toggleFullscreen}
          >
            {isFullscreen ? (
              <Minimize2 className="h-4 w-4" />
            ) : (
              <Maximize2 className="h-4 w-4" />
            )}
          </Button>

          {/* Only show toggle button if user is subscribed or in trial */}
          {(isSubscribed || isTrialActive) && (
            <Button
              variant="outline"
              className="bg-background/30 backdrop-blur-sm border-border/20 hover:bg-background/50 text-xs"
              onClick={toggleModelType}
            >
              {use3DModel ? "Use 2D Model" : "Use 3D Model"}{" "}
            </Button>
          )}

          {/* Show subscription prompt for non-subscribed users */}
          {!isSubscribed && !isTrialActive && (
            <Button
              variant="default"
              className="bg-primary text-primary-foreground text-xs"
              onClick={() => router.push("/account/subscription")}
            >
              <Crown className="h-3 w-3 mr-1" /> Subscribe for 3D
            </Button>
          )}

          {selectedMuscle && (
            <Button
              variant="outline"
              size="icon"
              className="bg-background/30 backdrop-blur-sm border-border/20 hover:bg-background/50"
              onClick={handleBackToMuscleGroups}
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>

        {/* Trial notification for users in trial period */}
        {isTrialActive && (
          <div className="absolute top-4 left-4 z-10 bg-yellow-500/80 text-black px-3 py-1 rounded-full text-xs font-medium">
            Trial: {trialDaysRemaining} days left
          </div>
        )}

        {/* Conditional Rendering for Models */}
        {use3DModel ? (
          // Render 3D viewer directly
          <SketchfabViewerWrapper
            modelId="31b40fd809b14665b93773936d67c52c"
            onAnnotationSelect={handleMuscleSelect}
            selectedMuscle={selectedMuscle}
            onError={handleModelError}
          />
        ) : (
          // Fallback 2D Model
          <FallbackModel onMuscleSelect={handleMuscleSelect} />
        )}
      </div>

      {/* Render the Information Panel Component */}
      <InformationPanel
        selectedMuscle={selectedMuscle}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        handleBackToMuscleGroups={handleBackToMuscleGroups}
        handleShare={handleShare}
        handleMuscleSelect={handleMuscleSelect} 
        showUserWidget={showUserWidget}
        user={user}
        isAdmin={isAdmin}
        isSubscribed={isSubscribed}
        isTrialActive={isTrialActive}
        handleLogout={handleLogout}
        handleProfile={handleProfile}
        handleSubscription={handleSubscription}
        handleHelp={handleHelp}
        handleAdmin={handleAdmin}
        handleVideoManagement={handleVideoManagement}
        handlePredictions={handlePredictions}
        use3DModel={use3DModel} 
      />

      {/* Subscription Banner - Only show for non-subscribed users */}
      {!isSubscribed && !selectedMuscle && <SubscriptionBanner />}
    </div>
  );
}
