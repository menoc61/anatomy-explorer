"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { ArrowLeft, Search, Mail, MessageSquare, FileText, Video, Book, HelpCircle } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"

export default function HelpPage() {
  const { user } = useAuth()
  const [searchQuery, setSearchQuery] = useState("")

  const faqs = [
    {
      question: "How do I access the 3D model?",
      answer:
        "3D models are available to premium subscribers and users in their trial period. If you're eligible, you'll see a toggle button to switch between 2D and 3D views in the top right corner of the anatomy explorer.",
    },
    {
      question: "How do I download anatomy PDFs?",
      answer:
        "When viewing a specific muscle, you'll find download buttons in each tab (Overview, Function, Conditions). Click these buttons to download the corresponding PDF for that muscle.",
    },
    {
      question: "Can I use this application offline?",
      answer:
        "Currently, our application requires an internet connection to function properly, especially for accessing 3D models and videos. We're working on offline capabilities for future updates.",
    },
    {
      question: "How do I cancel my subscription?",
      answer:
        "You can cancel your subscription by going to Account > Subscription and clicking on 'Cancel Subscription'. Your access will continue until the end of your current billing period.",
    },
    {
      question: "Can I share muscle information with others?",
      answer:
        "Yes! When viewing a muscle, look for the 'Share' button. This allows you to copy a direct link to that specific muscle that you can share with others.",
    },
    {
      question: "What's the difference between the subscription plans?",
      answer:
        "Our Basic plan provides access to 2D models and limited content. Premium plans unlock 3D models, all educational videos, downloadable resources, and regular content updates.",
    },
    {
      question: "How do I report an issue with the application?",
      answer:
        "You can report issues through the 'Contact Support' tab on this help page. Provide as much detail as possible, including screenshots if applicable.",
    },
    {
      question: "Can I suggest new features or content?",
      answer:
        "We welcome user feedback. Use the 'Contact Support' form and select 'Feature Request' as the category to share your ideas with our team.",
    },
  ]

  const filteredFaqs = searchQuery
    ? faqs.filter(
        (faq) =>
          faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
          faq.answer.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    : faqs

  return (
    <div className="container max-w-4xl py-10">
      <div className="flex items-center gap-2 mb-8">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <h1 className="text-3xl font-bold">Help Center</h1>
      </div>

      <div className="relative mb-8">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search for help..."
          className="pl-10"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <Tabs defaultValue="faq" className="space-y-6">
        <TabsList className="grid grid-cols-4 w-full">
          <TabsTrigger value="faq">
            <HelpCircle className="h-4 w-4 mr-2" />
            FAQ
          </TabsTrigger>
          <TabsTrigger value="guides">
            <Book className="h-4 w-4 mr-2" />
            Guides
          </TabsTrigger>
          <TabsTrigger value="videos">
            <Video className="h-4 w-4 mr-2" />
            Tutorials
          </TabsTrigger>
          <TabsTrigger value="contact">
            <MessageSquare className="h-4 w-4 mr-2" />
            Contact
          </TabsTrigger>
        </TabsList>

        <TabsContent value="faq">
          <Card>
            <CardHeader>
              <CardTitle>Frequently Asked Questions</CardTitle>
              <CardDescription>Find answers to common questions about using the Anatomy Explorer.</CardDescription>
            </CardHeader>
            <CardContent>
              {searchQuery && filteredFaqs.length === 0 ? (
                <div className="text-center py-8">
                  <HelpCircle className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium mb-2">No results found</h3>
                  <p className="text-muted-foreground">
                    We couldn't find any FAQs matching "{searchQuery}".
                    <br />
                    Try a different search term or contact support.
                  </p>
                  <Button variant="outline" className="mt-4" onClick={() => setSearchQuery("")}>
                    Clear search
                  </Button>
                </div>
              ) : (
                <Accordion type="single" collapsible className="w-full">
                  {filteredFaqs.map((faq, index) => (
                    <AccordionItem key={index} value={`item-${index}`}>
                      <AccordionTrigger>{faq.question}</AccordionTrigger>
                      <AccordionContent>
                        <p>{faq.answer}</p>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="guides">
          <Card>
            <CardHeader>
              <CardTitle>User Guides</CardTitle>
              <CardDescription>
                Comprehensive guides to help you get the most out of the Anatomy Explorer.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                <Card className="border border-muted">
                  <CardHeader className="p-4">
                    <CardTitle className="text-base">Getting Started Guide</CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 pt-0">
                    <p className="text-sm text-muted-foreground mb-4">
                      Learn the basics of navigating and using the Anatomy Explorer.
                    </p>
                    <Button variant="outline" className="w-full" asChild>
                      <Link href="/docs/getting-started">
                        <FileText className="h-4 w-4 mr-2" />
                        Read Guide
                      </Link>
                    </Button>
                  </CardContent>
                </Card>

                <Card className="border border-muted">
                  <CardHeader className="p-4">
                    <CardTitle className="text-base">3D Model Navigation</CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 pt-0">
                    <p className="text-sm text-muted-foreground mb-4">
                      Master the controls for exploring the 3D anatomical models.
                    </p>
                    <Button variant="outline" className="w-full" asChild>
                      <Link href="/docs/3d-navigation">
                        <FileText className="h-4 w-4 mr-2" />
                        Read Guide
                      </Link>
                    </Button>
                  </CardContent>
                </Card>

                <Card className="border border-muted">
                  <CardHeader className="p-4">
                    <CardTitle className="text-base">Subscription Benefits</CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 pt-0">
                    <p className="text-sm text-muted-foreground mb-4">
                      Understand the features available with different subscription plans.
                    </p>
                    <Button variant="outline" className="w-full" asChild>
                      <Link href="/docs/subscription-benefits">
                        <FileText className="h-4 w-4 mr-2" />
                        Read Guide
                      </Link>
                    </Button>
                  </CardContent>
                </Card>

                <Card className="border border-muted">
                  <CardHeader className="p-4">
                    <CardTitle className="text-base">Educational Resources</CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 pt-0">
                    <p className="text-sm text-muted-foreground mb-4">
                      Discover how to use our educational content for learning anatomy.
                    </p>
                    <Button variant="outline" className="w-full" asChild>
                      <Link href="/docs/educational-resources">
                        <FileText className="h-4 w-4 mr-2" />
                        Read Guide
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="videos">
          <Card>
            <CardHeader>
              <CardTitle>Video Tutorials</CardTitle>
              <CardDescription>Watch step-by-step tutorials on using the Anatomy Explorer.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                <Card className="border border-muted overflow-hidden">
                  <div className="aspect-video bg-muted relative">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Button variant="outline" size="icon" className="rounded-full h-12 w-12">
                        <Video className="h-6 w-6" />
                      </Button>
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-medium mb-1">Getting Started with Anatomy Explorer</h3>
                    <p className="text-sm text-muted-foreground">
                      A complete walkthrough of the application's main features.
                    </p>
                  </CardContent>
                </Card>

                <Card className="border border-muted overflow-hidden">
                  <div className="aspect-video bg-muted relative">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Button variant="outline" size="icon" className="rounded-full h-12 w-12">
                        <Video className="h-6 w-6" />
                      </Button>
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-medium mb-1">Navigating 3D Models</h3>
                    <p className="text-sm text-muted-foreground">
                      Learn how to rotate, zoom, and interact with 3D anatomical models.
                    </p>
                  </CardContent>
                </Card>

                <Card className="border border-muted overflow-hidden">
                  <div className="aspect-video bg-muted relative">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Button variant="outline" size="icon" className="rounded-full h-12 w-12">
                        <Video className="h-6 w-6" />
                      </Button>
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-medium mb-1">Understanding Muscle Functions</h3>
                    <p className="text-sm text-muted-foreground">
                      A detailed explanation of how to use the function tab for each muscle.
                    </p>
                  </CardContent>
                </Card>

                <Card className="border border-muted overflow-hidden">
                  <div className="aspect-video bg-muted relative">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Button variant="outline" size="icon" className="rounded-full h-12 w-12">
                        <Video className="h-6 w-6" />
                      </Button>
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-medium mb-1">Managing Your Subscription</h3>
                    <p className="text-sm text-muted-foreground">
                      How to upgrade, downgrade, or manage your subscription settings.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="contact">
          <Card>
            <CardHeader>
              <CardTitle>Contact Support</CardTitle>
              <CardDescription>Need more help? Reach out to our support team.</CardDescription>
            </CardHeader>
            <CardContent>
              <form className="space-y-6">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium">
                      Name
                    </label>
                    <Input id="name" defaultValue={user?.name || ""} />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium">
                      Email
                    </label>
                    <Input id="email" type="email" defaultValue={user?.email || ""} />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="subject" className="text-sm font-medium">
                    Subject
                  </label>
                  <Input id="subject" placeholder="What's your inquiry about?" />
                </div>

                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-medium">
                    Message
                  </label>
                  <textarea
                    id="message"
                    className="w-full min-h-[150px] p-3 border rounded-md bg-background"
                    placeholder="Please describe your issue or question in detail..."
                  ></textarea>
                </div>

                <div className="flex justify-between items-center">
                  <div className="text-sm text-muted-foreground">
                    <Mail className="h-4 w-4 inline mr-1" />
                    We typically respond within 24 hours.
                  </div>
                  <Button type="submit">Send Message</Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

