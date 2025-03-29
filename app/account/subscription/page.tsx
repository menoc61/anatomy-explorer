"use client"

import { useState } from "react"
import Link from "next/link"
import { useAuth } from "@/contexts/auth-context"
import { useLanguage } from "@/contexts/language-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Loader2, CheckCircle2, Crown, CreditCard, Calendar, AlertCircle, ArrowLeft } from "lucide-react"
import type { Subscription } from "@/types"
import { useToast } from "@/hooks/use-toast"

export default function SubscriptionPage() {
  const { user, updateSubscription } = useAuth()
  const { t } = useLanguage()
  const { toast } = useToast()
  const [selectedPlan, setSelectedPlan] = useState<"basic" | "premium" | "professional">("premium")
  const [isProcessing, setIsProcessing] = useState(false)
  const [paymentMethod, setPaymentMethod] = useState<"card" | "paypal">("card")

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

    try {
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

      toast({
        title: "Subscription upgraded",
        description: `You have successfully upgraded to the ${selectedPlan.charAt(0).toUpperCase() + selectedPlan.slice(1)} plan.`,
        duration: 5000,
      })
    } catch (error) {
      toast({
        title: "Upgrade failed",
        description: "There was an error processing your payment. Please try again.",
        variant: "destructive",
        duration: 5000,
      })
    } finally {
      setIsProcessing(false)
    }
  }

  return (
    <div className="container max-w-5xl py-10">
      <div className="mb-8">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" asChild>
            <Link href="/account">
              <ArrowLeft className="h-5 w-5" />
            </Link>
          </Button>
          <div>
            <h1 className="text-3xl font-bold">{t("subscription.title")}</h1>
            <p className="text-muted-foreground mt-2">Choose the plan that works best for you</p>
          </div>
        </div>
      </div>

      {isActive && (
        <Card className="mb-8 border-primary/50 bg-primary/5">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="flex items-center">
              <Crown className="h-5 w-5 mr-2 text-amber-500" />
              {t("subscription.current")}
            </CardTitle>
            <Button variant="outline" size="sm">
              Manage Billing
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-medium">{currentPlan.charAt(0).toUpperCase() + currentPlan.slice(1)} Plan</p>
                  <p className="text-sm text-muted-foreground">
                    Next billing date: {new Date(user.subscription?.expiresAt || "").toLocaleDateString()}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-medium">
                    {currentPlan === "basic" ? "$9.99" : currentPlan === "premium" ? "$19.99" : "$29.99"}
                    <span className="text-sm text-muted-foreground">/month</span>
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {user.subscription?.autoRenew ? "Auto-renews" : "Does not auto-renew"}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 text-sm">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span>Started on {new Date(user.subscription?.startDate || "").toLocaleDateString()}</span>
              </div>
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
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Payment Method</CardTitle>
            <CardDescription>Select your preferred payment method</CardDescription>
          </CardHeader>
          <CardContent>
            <RadioGroup value={paymentMethod} onValueChange={(value: any) => setPaymentMethod(value)}>
              <div className="grid gap-4">
                <div className="flex items-center space-x-2 border rounded-lg p-4">
                  <RadioGroupItem value="card" id="payment-card" />
                  <Label htmlFor="payment-card" className="flex items-center gap-2 cursor-pointer">
                    <CreditCard className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="font-medium">Credit or Debit Card</p>
                      <p className="text-sm text-muted-foreground">Pay with Visa, Mastercard, or other cards</p>
                    </div>
                  </Label>
                </div>

                <div className="flex items-center space-x-2 border rounded-lg p-4">
                  <RadioGroupItem value="paypal" id="payment-paypal" />
                  <Label htmlFor="payment-paypal" className="flex items-center gap-2 cursor-pointer">
                    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M19.5 8.25V16.5C19.5 17.3284 18.8284 18 18 18H6C5.17157 18 4.5 17.3284 4.5 16.5V8.25M19.5 8.25C19.5 7.42157 18.8284 6.75 18 6.75H6C5.17157 6.75 4.5 7.42157 4.5 8.25M19.5 8.25V9.75C19.5 10.5784 18.8284 11.25 18 11.25H6C5.17157 11.25 4.5 10.5784 4.5 9.75V8.25"
                        stroke="#64748b"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <div>
                      <p className="font-medium">PayPal</p>
                      <p className="text-sm text-muted-foreground">Pay with your PayPal account</p>
                    </div>
                  </Label>
                </div>
              </div>
            </RadioGroup>

            <div className="mt-6 flex items-center gap-2 p-4 bg-amber-50 text-amber-800 rounded-lg">
              <AlertCircle className="h-5 w-5 flex-shrink-0" />
              <p className="text-sm">
                For demo purposes, no actual payment will be processed. Click "Upgrade Now" to simulate a successful
                payment.
              </p>
            </div>
          </CardContent>
          <CardFooter className="flex justify-end">
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
          </CardFooter>
        </Card>
      )}
    </div>
  )
}
