"use client"

import { useState } from "react"
import { useAuth } from "@/contexts/auth-context"
import { Button } from "@/components/ui/button"
import { X, Crown, CheckCircle2 } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"

export default function SubscriptionBanner() {
  const { user, updateSubscription } = useAuth()
  const [isOpen, setIsOpen] = useState(false)
  const [selectedPlan, setSelectedPlan] = useState<"basic" | "premium" | "professional">("premium")
  const [isProcessing, setIsProcessing] = useState(false)
  const [isVisible, setIsVisible] = useState(true)

  if (!user || !isVisible) return null

  const subscription = user.subscription

  // If user has an active subscription, don't show the banner
  if (subscription?.status === "active") return null

  const handleUpgrade = async () => {
    setIsProcessing(true)

    // Simulate payment processing
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // Update subscription
    updateSubscription({
      status: "active",
      plan: selectedPlan,
      expiresAt: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString(), // 1 year from now
    })

    setIsProcessing(false)
    setIsOpen(false)
  }

  return (
    <>
      <div className="fixed bottom-0 left-0 right-0 bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-4 z-50">
        <div className="container mx-auto flex flex-col sm:flex-row items-center justify-between">
          <div className="flex items-center gap-3 mb-3 sm:mb-0">
            <Crown className="h-5 w-5 text-yellow-300 flex-shrink-0" />
            <div>
              <p className="font-medium">
                {subscription?.status === "trial"
                  ? `Your free trial ends in ${getRemainingDays(subscription.expiresAt)} days`
                  : "Unlock premium features"}
              </p>
              <p className="text-sm text-white/80">Get access to all educational videos and advanced features</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              className="bg-white/10 border-white/20 hover:bg-white/20 text-white"
              onClick={() => setIsOpen(true)}
            >
              Upgrade Now
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="text-white hover:bg-white/20"
              onClick={() => setIsVisible(false)}
              aria-label="Dismiss"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Upgrade Your Subscription</DialogTitle>
            <DialogDescription>
              Choose a plan that works for you and get access to all premium features.
            </DialogDescription>
          </DialogHeader>

          <div className="py-4">
            <RadioGroup value={selectedPlan} onValueChange={(value: any) => setSelectedPlan(value)}>
              <div className="space-y-4">
                <div className="flex items-center space-x-2 border rounded-lg p-4">
                  <RadioGroupItem value="basic" id="basic" />
                  <Label htmlFor="basic" className="flex-1 cursor-pointer">
                    <div className="font-medium">Basic Plan</div>
                    <div className="text-sm text-muted-foreground">$9.99/month</div>
                  </Label>
                  <div className="text-sm text-muted-foreground">Access to basic features</div>
                </div>

                <div className="flex items-center space-x-2 border rounded-lg p-4 bg-primary/5 border-primary/30">
                  <RadioGroupItem value="premium" id="premium" />
                  <Label htmlFor="premium" className="flex-1 cursor-pointer">
                    <div className="font-medium">Premium Plan</div>
                    <div className="text-sm text-muted-foreground">$19.99/month</div>
                  </Label>
                  <div className="text-sm text-primary">Most popular</div>
                </div>

                <div className="flex items-center space-x-2 border rounded-lg p-4">
                  <RadioGroupItem value="professional" id="professional" />
                  <Label htmlFor="professional" className="flex-1 cursor-pointer">
                    <div className="font-medium">Professional Plan</div>
                    <div className="text-sm text-muted-foreground">$29.99/month</div>
                  </Label>
                  <div className="text-sm text-muted-foreground">For healthcare professionals</div>
                </div>
              </div>
            </RadioGroup>

            <div className="mt-6 space-y-2">
              <h4 className="text-sm font-medium">Plan includes:</h4>
              <ul className="space-y-2">
                <li className="flex items-center text-sm">
                  <CheckCircle2 className="h-4 w-4 mr-2 text-green-500" />
                  Access to all educational videos
                </li>
                <li className="flex items-center text-sm">
                  <CheckCircle2 className="h-4 w-4 mr-2 text-green-500" />
                  Detailed muscle information
                </li>
                <li className="flex items-center text-sm">
                  <CheckCircle2 className="h-4 w-4 mr-2 text-green-500" />
                  Interactive 3D model annotations
                </li>
                <li className="flex items-center text-sm">
                  <CheckCircle2 className="h-4 w-4 mr-2 text-green-500" />
                  Download resources for offline use
                </li>
              </ul>
            </div>
          </div>

          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setIsOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleUpgrade} disabled={isProcessing}>
              {isProcessing ? "Processing..." : "Upgrade Now"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}

function getRemainingDays(expiresAt: string): number {
  const expiryDate = new Date(expiresAt)
  const now = new Date()
  const diffTime = expiryDate.getTime() - now.getTime()
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  return diffDays > 0 ? diffDays : 0
}

