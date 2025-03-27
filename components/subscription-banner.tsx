"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, Crown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/contexts/auth-context"
import { useRouter } from "next/navigation"

export default function SubscriptionBanner() {
  const [isVisible, setIsVisible] = useState(false)
  const [isDismissed, setIsDismissed] = useState(false)
  const { user, isSubscribed, isTrialActive, trialDaysRemaining } = useAuth()
  const router = useRouter()

  useEffect(() => {
    // Only show banner for non-subscribed users after a delay
    if (user && !isSubscribed && !isDismissed) {
      const timer = setTimeout(() => {
        setIsVisible(true)
      }, 5000)

      return () => clearTimeout(timer)
    }
  }, [user, isSubscribed, isDismissed])

  const handleDismiss = () => {
    setIsVisible(false)
    setIsDismissed(true)
  }

  const handleSubscribe = () => {
    router.push("/account/subscription")
  }

  if (!user || isSubscribed || !isVisible) {
    return null
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", damping: 20 }}
          className="fixed bottom-0 left-0 right-0 z-50 p-4 pointer-events-none"
        >
          <div className="mx-auto max-w-md pointer-events-auto">
            <div className="bg-primary text-primary-foreground rounded-lg shadow-lg overflow-hidden">
              <div className="relative p-4">
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute top-2 right-2 text-primary-foreground/80 hover:text-primary-foreground hover:bg-primary-foreground/10"
                  onClick={handleDismiss}
                >
                  <X className="h-4 w-4" />
                </Button>

                <div className="flex items-start gap-4">
                  <div className="bg-primary-foreground/10 rounded-full p-2">
                    <Crown className="h-6 w-6" />
                  </div>

                  <div className="flex-1">
                    <h3 className="font-bold text-lg">
                      {isTrialActive ? `${trialDaysRemaining} days left in your trial` : "Unlock Premium Features"}
                    </h3>
                    <p className="mt-1 text-primary-foreground/80 text-sm">
                      {isTrialActive
                        ? "Subscribe now to continue accessing 3D models and premium content after your trial ends."
                        : "Subscribe to access 3D models, detailed anatomy guides, and premium content."}
                    </p>

                    <div className="mt-4 flex gap-3">
                      <Button variant="secondary" className="flex-1" onClick={handleSubscribe}>
                        View Plans
                      </Button>
                      <Button
                        variant="outline"
                        className="border-primary-foreground/20 hover:bg-primary-foreground/10"
                        onClick={handleDismiss}
                      >
                        Not Now
                      </Button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-primary-foreground/10 px-4 py-2 text-xs text-primary-foreground/70">
                {isTrialActive
                  ? "Your trial includes all premium features. Subscribe to continue access."
                  : "Start with a 14-day free trial. Cancel anytime."}
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

