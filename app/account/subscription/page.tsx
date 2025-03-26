"use client"

import { useState } from "react"
import { useAuth } from "@/contexts/auth-context"
import { useLanguage } from "@/contexts/language-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Loader2, CheckCircle2, Crown } from "lucide-react"
import type { Subscription } from "@/types"

export default function SubscriptionPage() {
  const { user, updateSubscription } = useAuth()
  const { t } = useLanguage()
  const [selectedPlan, setSelectedPlan] = useState<"basic" | "premium" | "professional">("premium")
  const [isProcessing, setIsProcessing] = useState(false)

  if (!user) return null

  const currentPlan = user.subscription?.plan || "basic"
  const isActive = user.subscription?.status === "active"

  const plans = [
    {
      id: "basic",
      name: t("subscription.basic"),
      price: "$9.99",
      features: [
        "Access to basic anatomy content",
        "Limited video library",
        "Standard resolution models",
        "Web access only",
      ],
    },
    {
      id: "premium",
      name: t("subscription.premium"),
      price: "$19.99",
      features: [
        "Full access to all anatomy content",
        "Complete video library",
        "High resolution 3D models",
        "Download videos for offline viewing",
        "Mobile and web access",
      ],
    },
    {
      id: "professional",
      name: t("subscription.professional"),
      price: "$29.99",
      features: [
        "Everything in Premium",
        "Professional annotation tools",
        "Clinical case studies",
        "PDF resources and guides",
        "Priority support",
        "Team sharing features",
      ],
    },
  ]

  const handleUpgrade = async () => {
    setIsProcessing(true)

    // Simulate payment processing
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // Update subscription
    const newSubscription: Subscription = {
      id: `sub-${Date.now()}`,
      status: "active",
      plan: selectedPlan,
      startDate: new Date().toISOString(),
      expiresAt: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString(), // 1 year from now
      autoRenew: true,
    }

    updateSubscription(newSubscription)
    setIsProcessing(false)
  }

  return (
    <div className="container max-w-5xl py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">{t("subscription.title")}</h1>
        <p className="text-muted-foreground mt-2">Choose the plan that works best for you</p>
      </div>

      {isActive && (
        <Card className="mb-8 border-primary/50 bg-primary/5">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Crown className="h-5 w-5 mr-2 text-amber-500" />
              {t("subscription.current")}
            </CardTitle>
            <CardDescription>
              You are currently on the {currentPlan.charAt(0).toUpperCase() + currentPlan.slice(1)} plan
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-sm">
              <p>Your subscription will renew on {new Date(user.subscription?.expiresAt || "").toLocaleDateString()}</p>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid gap-6 md:grid-cols-3">
        {plans.map((plan) => (
          <Card key={plan.id} className={currentPlan === plan.id && isActive ? "border-primary shadow-md" : ""}>
            <CardHeader>
              <CardTitle>{plan.name}</CardTitle>
              <CardDescription>
                <span className="text-2xl font-bold">{plan.price}</span> / month
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-start">
                    <CheckCircle2 className="h-4 w-4 mr-2 text-green-500 mt-0.5" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
              {currentPlan === plan.id && isActive ? (
                <Button disabled className="w-full">
                  Current Plan
                </Button>
              ) : (
                <RadioGroup value={selectedPlan} onValueChange={(value: any) => setSelectedPlan(value)}>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value={plan.id as any} id={`plan-${plan.id}`} />
                    <Label htmlFor={`plan-${plan.id}`}>Select</Label>
                  </div>
                </RadioGroup>
              )}
            </CardFooter>
          </Card>
        ))}
      </div>

      {(!isActive || currentPlan !== selectedPlan) && (
        <div className="mt-8 flex justify-center">
          <Button size="lg" onClick={handleUpgrade} disabled={isProcessing}>
            {isProcessing ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Processing...
              </>
            ) : (
              t("subscription.upgrade")
            )}
          </Button>
        </div>
      )}
    </div>
  )
}

