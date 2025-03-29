"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { toast } from "@/components/ui/use-toast"
import { Loader2, Plus, Edit, Trash, Check, X } from "lucide-react"
import AdminSidebar from "@/app/admin/layout"

// Mock subscription plans data
const subscriptionPlans = [
  {
    id: "plan_basic",
    name: "Basic",
    price: 9.99,
    interval: "month",
    features: ["Access to basic anatomy models", "Standard video quality", "Community support"],
    isActive: true,
  },
  {
    id: "plan_pro",
    name: "Professional",
    price: 19.99,
    interval: "month",
    features: ["Access to all anatomy models", "HD video quality", "Priority support", "Download resources"],
    isActive: true,
  },
  {
    id: "plan_edu",
    name: "Educational",
    price: 49.99,
    interval: "month",
    features: [
      "Access to all anatomy models",
      "4K video quality",
      "Dedicated support",
      "Download resources",
      "Multiple user accounts",
    ],
    isActive: true,
  },
]

// Mock subscribers data
const subscribers = [
  {
    id: "user_1",
    name: "John Doe",
    email: "john@example.com",
    plan: "Professional",
    status: "active",
    startDate: "2023-01-15",
    endDate: "2024-01-15",
  },
  {
    id: "user_2",
    name: "Jane Smith",
    email: "jane@example.com",
    plan: "Basic",
    status: "active",
    startDate: "2023-03-10",
    endDate: "2024-03-10",
  },
  {
    id: "user_3",
    name: "Medical School XYZ",
    email: "admin@medschool.edu",
    plan: "Educational",
    status: "active",
    startDate: "2023-02-01",
    endDate: "2024-02-01",
  },
  {
    id: "user_4",
    name: "Robert Johnson",
    email: "robert@example.com",
    plan: "Professional",
    status: "cancelled",
    startDate: "2023-01-05",
    endDate: "2023-07-05",
  },
]

export default function SubscriptionPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [editingPlan, setEditingPlan] = useState<string | null>(null)
  const [plans, setPlans] = useState(subscriptionPlans)
  const [subscribersList, setSubscribersList] = useState(subscribers)
  const [searchTerm, setSearchTerm] = useState("")

  // Filter subscribers based on search term
  const filteredSubscribers = subscribersList.filter(
    (subscriber) =>
      subscriber.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      subscriber.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      subscriber.plan.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handlePlanToggle = (planId: string, isActive: boolean) => {
    setPlans(plans.map((plan) => (plan.id === planId ? { ...plan, isActive } : plan)))

    toast({
      title: isActive ? "Plan activated" : "Plan deactivated",
      description: `The subscription plan has been ${isActive ? "activated" : "deactivated"}.`,
    })
  }

  const handleEditPlan = (planId: string) => {
    setEditingPlan(planId)
  }

  const handleSavePlan = () => {
    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      setEditingPlan(null)
      setIsLoading(false)

      toast({
        title: "Plan updated",
        description: "The subscription plan has been updated successfully.",
      })
    }, 1000)
  }

  const handleCancelSubscription = (userId: string) => {
    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      setSubscribersList(
        subscribersList.map((subscriber) =>
          subscriber.id === userId ? { ...subscriber, status: "cancelled" } : subscriber,
        ),
      )

      setIsLoading(false)

      toast({
        title: "Subscription cancelled",
        description: "The user's subscription has been cancelled.",
      })
    }, 1000)
  }

  const handleReactivateSubscription = (userId: string) => {
    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      setSubscribersList(
        subscribersList.map((subscriber) =>
          subscriber.id === userId ? { ...subscriber, status: "active" } : subscriber,
        ),
      )

      setIsLoading(false)

      toast({
        title: "Subscription reactivated",
        description: "The user's subscription has been reactivated.",
      })
    }, 1000)
  }

  return (
    <AdminSidebar>
      <div className="container mx-auto py-6">
        <h1 className="text-3xl font-bold mb-6">Subscription Management</h1>

        <Tabs defaultValue="plans" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="plans">Subscription Plans</TabsTrigger>
            <TabsTrigger value="subscribers">Subscribers</TabsTrigger>
          </TabsList>

          <TabsContent value="plans" className="space-y-4">
            <div className="flex justify-end mb-4">
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Add New Plan
              </Button>
            </div>

            {plans.map((plan) => (
              <Card key={plan.id}>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <div>
                      <CardTitle>{plan.name}</CardTitle>
                      <CardDescription>
                        ${plan.price}/{plan.interval}
                      </CardDescription>
                    </div>
                    <div className="flex items-center gap=2">
                      <Switch
                        checked={plan.isActive}
                        onCheckedChange={(checked) => handlePlanToggle(plan.id, checked)}
                      />
                      <Badge variant={plan.isActive ? "default" : "secondary"}>
                        {plan.isActive ? "Active" : "Inactive"}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="list-disc pl-5 space-y-1">
                    {plan.features.map((feature, index) => (
                      <li key={index}>{feature}</li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter className="flex justify-end gap-2">
                  {editingPlan === plan.id ? (
                    <>
                      <Button variant="outline" onClick={() => setEditingPlan(null)}>
                        Cancel
                      </Button>
                      <Button onClick={handleSavePlan} disabled={isLoading}>
                        {isLoading ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Saving...
                          </>
                        ) : (
                          "Save Changes"
                        )}
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button variant="outline" onClick={() => handleEditPlan(plan.id)}>
                        <Edit className="mr-2 h-4 w-4" />
                        Edit
                      </Button>
                      <Button variant="destructive">
                        <Trash className="mr=2 h-4 w-4" />
                        Delete
                      </Button>
                    </>
                  )}
                </CardFooter>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="subscribers" className="space-y-4">
            <div className="flex justify-between items-center mb-4">
              <Input
                placeholder="Search subscribers..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="max-w-sm"
              />
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Add Subscription
              </Button>
            </div>

            <Card>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Plan</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Start Date</TableHead>
                      <TableHead>End Date</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredSubscribers.length > 0 ? (
                      filteredSubscribers.map((subscriber) => (
                        <TableRow key={subscriber.id}>
                          <TableCell className="font-medium">{subscriber.name}</TableCell>
                          <TableCell>{subscriber.email}</TableCell>
                          <TableCell>{subscriber.plan}</TableCell>
                          <TableCell>
                            <Badge variant={subscriber.status === "active" ? "default" : "secondary"}>
                              {subscriber.status}
                            </Badge>
                          </TableCell>
                          <TableCell>{subscriber.startDate}</TableCell>
                          <TableCell>{subscriber.endDate}</TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-2">
                              <Button size="sm" variant="outline">
                                <Edit className="h-4 w-4" />
                              </Button>
                              {subscriber.status === "active" ? (
                                <Button
                                  size="sm"
                                  variant="destructive"
                                  onClick={() => handleCancelSubscription(subscriber.id)}
                                  disabled={isLoading}
                                >
                                  <X className="h-4 w-4" />
                                </Button>
                              ) : (
                                <Button
                                  size="sm"
                                  variant="default"
                                  onClick={() => handleReactivateSubscription(subscriber.id)}
                                  disabled={isLoading}
                                >
                                  <Check className="h-4 w-4" />
                                </Button>
                              )}
                            </div>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={7} className="text-center py-4">
                          No subscribers found
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AdminSidebar>
  )
}
