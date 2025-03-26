"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Download, FileDown, Loader2, Crown } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"
import { useToast } from "@/hooks/use-toast"

interface DownloadButtonProps {
  url: string
  filename: string
  type: "video" | "pdf"
  variant?: "default" | "outline" | "secondary" | "ghost" | "link" | "destructive"
  size?: "default" | "sm" | "lg" | "icon"
  className?: string
  isPremiumFeature?: boolean
  userIsPremium?: boolean
}

export function DownloadButton({
  url,
  filename,
  type,
  variant = "outline",
  size = "default",
  className,
  isPremiumFeature,
  userIsPremium,
}: DownloadButtonProps) {
  const [isDownloading, setIsDownloading] = useState(false)
  const { t } = useLanguage()
  const { toast } = useToast()

  const handleDownload = async () => {
    // Check if this is a premium feature and user doesn't have premium
    if (isPremiumFeature && !userIsPremium) {
      toast({
        title: "Premium Feature",
        description: "Please upgrade to a premium plan to download content.",
        variant: "destructive",
        duration: 5000,
      })
      return
    }

    setIsDownloading(true)

    try {
      // In a real app, you might want to check if the user has permission to download
      // For example, if it's premium content, check their subscription

      // Create a link element and trigger download
      const link = document.createElement("a")
      link.href = url
      link.download = filename
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)

      toast({
        title: "Download started",
        description: `${filename} is downloading to your device.`,
        duration: 3000,
      })
    } catch (error) {
      console.error("Download error:", error)
      toast({
        title: "Download failed",
        description: "There was a problem downloading the file. Please try again.",
        variant: "destructive",
        duration: 5000,
      })
    } finally {
      setIsDownloading(false)
    }
  }

  return (
    <Button variant={variant} size={size} onClick={handleDownload} disabled={isDownloading} className={className}>
      {isDownloading ? (
        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
      ) : type === "video" ? (
        <Download className="h-4 w-4 mr-2" />
      ) : (
        <FileDown className="h-4 w-4 mr-2" />
      )}
      {type === "video" ? t("download.video") : t("download.pdf")}
      {isPremiumFeature && !userIsPremium && <Crown className="h-3 w-3 ml-1 text-amber-400" />}
    </Button>
  )
}

