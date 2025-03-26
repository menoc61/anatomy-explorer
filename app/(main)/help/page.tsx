"use client"

import { Label } from "@/components/ui/label"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import {
  HelpCircle,
  Mail,
  MessageSquare,
  Phone,
  FileQuestion,
  BookOpen,
  Heart,
  Github,
  Linkedin,
  Twitter,
  Globe,
  Send,
} from "lucide-react"

export default function HelpPage() {
  const { toast } = useToast()
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    toast({
      title: "Message sent",
      description: "Thank you for your message. We'll get back to you soon.",
      duration: 5000,
    })

    setContactForm({
      name: "",
      email: "",
      subject: "",
      message: "",
    })

    setIsSubmitting(false)
  }

  return (
    <div className="container max-w-6xl py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Help & Support</h1>
        <p className="text-muted-foreground mt-2">Find answers to common questions and get support</p>
      </div>

      <Tabs defaultValue="faq" className="space-y-6">
        <TabsList>
          <TabsTrigger value="faq">
            <FileQuestion className="h-4 w-4 mr-2" />
            FAQ
          </TabsTrigger>
          <TabsTrigger value="contact">
            <MessageSquare className="h-4 w-4 mr-2" />
            Contact Us
          </TabsTrigger>
          <TabsTrigger value="about">
            <BookOpen className="h-4 w-4 mr-2" />
            About
          </TabsTrigger>
          <TabsTrigger value="credits">
            <Heart className="h-4 w-4 mr-2" />
            Credits
          </TabsTrigger>
        </TabsList>

        <TabsContent value="faq" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Frequently Asked Questions</CardTitle>
              <CardDescription>Find answers to the most common questions about Anatomy Explorer</CardDescription>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger>What is Anatomy Explorer?</AccordionTrigger>
                  <AccordionContent>
                    Anatomy Explorer is an interactive 3D platform for exploring human anatomy. It provides detailed
                    information about muscle groups, their functions, and related medical conditions. The platform is
                    designed for students, healthcare professionals, and anyone interested in learning about human
                    anatomy.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-2">
                  <AccordionTrigger>How do I navigate the 3D model?</AccordionTrigger>
                  <AccordionContent>
                    You can rotate the 3D model by clicking and dragging. Use the mouse wheel or pinch gestures to zoom
                    in and out. Click on any muscle group to view detailed information about it. The model is fully
                    interactive and allows you to explore the human muscular system from any angle.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-3">
                  <AccordionTrigger>What subscription plans are available?</AccordionTrigger>
                  <AccordionContent>
                    We offer three subscription plans: Basic, Premium, and Professional. The Basic plan provides access
                    to essential features, while Premium and Professional plans offer additional content, offline
                    access, and advanced features. Visit the Subscription page for detailed information about each plan.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-4">
                  <AccordionTrigger>Can I download content for offline use?</AccordionTrigger>
                  <AccordionContent>
                    Yes, premium subscribers can download videos and PDF resources for offline use. Downloaded content
                    is stored on your device and can be accessed through the "My Downloads" section in your account.
                    This feature is particularly useful for studying without an internet connection.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-5">
                  <AccordionTrigger>How do I change the language or theme?</AccordionTrigger>
                  <AccordionContent>
                    You can change the language and theme in the Settings section of your account. We currently support
                    English, French, and Russian languages, and offer Light, Dark, and System themes. Your preferences
                    will be saved and applied across all your devices.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-6">
                  <AccordionTrigger>Is my data secure?</AccordionTrigger>
                  <AccordionContent>
                    Yes, we take data security seriously. All personal information is encrypted and stored securely. We
                    do not share your data with third parties without your consent. You can review and adjust your
                    privacy settings in your account at any time.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-7">
                  <AccordionTrigger>How do I cancel my subscription?</AccordionTrigger>
                  <AccordionContent>
                    You can cancel your subscription at any time from the Subscription section in your account settings.
                    Your access will continue until the end of your current billing period. There are no cancellation
                    fees, and you can resubscribe at any time.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="contact" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Contact Us</CardTitle>
              <CardDescription>Have a question or need help? Reach out to our support team</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div className="flex items-start gap-3">
                    <Mail className="h-5 w-5 text-primary mt-0.5" />
                    <div>
                      <h3 className="font-medium">Email Support</h3>
                      <p className="text-sm text-muted-foreground mb-1">For general inquiries and support</p>
                      <a href="mailto:support@anatomyexplorer.com" className="text-primary hover:underline">
                        support@anatomyexplorer.com
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Phone className="h-5 w-5 text-primary mt-0.5" />
                    <div>
                      <h3 className="font-medium">Phone Support</h3>
                      <p className="text-sm text-muted-foreground mb-1">Available Monday-Friday, 9am-5pm EST</p>
                      <a href="tel:+1-555-123-4567" className="text-primary hover:underline">
                        +1 (555) 123-4567
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <HelpCircle className="h-5 w-5 text-primary mt-0.5" />
                    <div>
                      <h3 className="font-medium">Help Center</h3>
                      <p className="text-sm text-muted-foreground mb-1">Browse our knowledge base</p>
                      <a href="#" className="text-primary hover:underline">
                        Visit Help Center
                      </a>
                    </div>
                  </div>
                </div>

                <form onSubmit={handleContactSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Name</Label>
                      <Input
                        id="name"
                        value={contactForm.name}
                        onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={contactForm.email}
                        onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject</Label>
                    <Input
                      id="subject"
                      value={contactForm.subject}
                      onChange={(e) => setContactForm({ ...contactForm, subject: e.target.value })}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Message</Label>
                    <Textarea
                      id="message"
                      rows={5}
                      value={contactForm.message}
                      onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                      required
                    />
                  </div>

                  <Button type="submit" className="w-full" disabled={isSubmitting}>
                    {isSubmitting ? (
                      <>Sending Message...</>
                    ) : (
                      <>
                        <Send className="mr-2 h-4 w-4" />
                        Send Message
                      </>
                    )}
                  </Button>
                </form>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="about" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>About Anatomy Explorer</CardTitle>
              <CardDescription>Learn more about our platform and mission</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="prose max-w-none dark:prose-invert">
                <p>
                  Anatomy Explorer is an interactive 3D platform designed to make learning human anatomy engaging,
                  accessible, and effective. Our mission is to provide high-quality educational resources for students,
                  healthcare professionals, and anyone interested in understanding the human body.
                </p>

                <h3>Our Vision</h3>
                <p>
                  We believe that understanding human anatomy should be intuitive and engaging. By combining
                  cutting-edge 3D visualization technology with comprehensive educational content, we aim to transform
                  how people learn and teach anatomy.
                </p>

                <h3>Key Features</h3>
                <ul>
                  <li>Interactive 3D models with detailed annotations</li>
                  <li>Comprehensive information about muscle groups and their functions</li>
                  <li>Educational videos explaining anatomical concepts</li>
                  <li>Downloadable resources for offline study</li>
                  <li>Multi-language support for global accessibility</li>
                </ul>

                <h3>Educational Focus</h3>
                <p>
                  Our content is developed by a team of medical professionals and educational experts to ensure accuracy
                  and pedagogical effectiveness. We continuously update our platform based on the latest research and
                  educational best practices.
                </p>

                <h3>Accessibility</h3>
                <p>
                  We are committed to making anatomy education accessible to everyone. Our platform includes features
                  designed to accommodate different learning styles and accessibility needs, including screen reader
                  support, high contrast mode, and text size adjustments.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="credits" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Credits & Acknowledgments</CardTitle>
              <CardDescription>The people and resources behind Anatomy Explorer</CardDescription>
            </CardHeader>
            <CardContent className="space-y-8">
              <div>
                <h3 className="text-xl font-bold mb-4">Development Team</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="flex items-start gap-4">
                    <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <span className="text-xl font-bold text-primary">GM</span>
                    </div>
                    <div>
                      <h4 className="text-lg font-medium">Gilles Momeni (menoc61)</h4>
                      <p className="text-sm text-muted-foreground mb-2">Lead Developer & Creator</p>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" asChild>
                          <a href="https://github.com/menoc61" target="_blank" rel="noopener noreferrer">
                            <Github className="h-4 w-4 mr-1" />
                            GitHub
                          </a>
                        </Button>
                        <Button variant="outline" size="sm" asChild>
                          <a href="https://linkedin.com/in/gilles-momeni" target="_blank" rel="noopener noreferrer">
                            <Linkedin className="h-4 w-4 mr-1" />
                            LinkedIn
                          </a>
                        </Button>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <span className="text-xl font-bold text-primary">AT</span>
                    </div>
                    <div>
                      <h4 className="text-lg font-medium">Anatomy Team</h4>
                      <p className="text-sm text-muted-foreground mb-2">Medical Content & Research</p>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" asChild>
                          <a href="#" target="_blank" rel="noopener noreferrer">
                            <Globe className="h-4 w-4 mr-1" />
                            Website
                          </a>
                        </Button>
                        <Button variant="outline" size="sm" asChild>
                          <a href="#" target="_blank" rel="noopener noreferrer">
                            <Twitter className="h-4 w-4 mr-1" />
                            Twitter
                          </a>
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-4">Technologies Used</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="p-4 border rounded-lg text-center">
                    <h4 className="font-medium">Next.js</h4>
                    <p className="text-sm text-muted-foreground">React Framework</p>
                  </div>
                  <div className="p-4 border rounded-lg text-center">
                    <h4 className="font-medium">Tailwind CSS</h4>
                    <p className="text-sm text-muted-foreground">Styling</p>
                  </div>
                  <div className="p-4 border rounded-lg text-center">
                    <h4 className="font-medium">Shadcn/ui</h4>
                    <p className="text-sm text-muted-foreground">UI Components</p>
                  </div>
                  <div className="p-4 border rounded-lg text-center">
                    <h4 className="font-medium">TypeScript</h4>
                    <p className="text-sm text-muted-foreground">Language</p>
                  </div>
                  <div className="p-4 border rounded-lg text-center">
                    <h4 className="font-medium">Framer Motion</h4>
                    <p className="text-sm text-muted-foreground">Animations</p>
                  </div>
                  <div className="p-4 border rounded-lg text-center">
                    <h4 className="font-medium">Zustand</h4>
                    <p className="text-sm text-muted-foreground">State Management</p>
                  </div>
                  <div className="p-4 border rounded-lg text-center">
                    <h4 className="font-medium">Vercel</h4>
                    <p className="text-sm text-muted-foreground">Deployment</p>
                  </div>
                  <div className="p-4 border rounded-lg text-center">
                    <h4 className="font-medium">Sketchfab</h4>
                    <p className="text-sm text-muted-foreground">3D Models</p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-4">Special Thanks</h3>
                <p className="mb-4">
                  We would like to express our gratitude to the following individuals and organizations:
                </p>
                <ul className="space-y-2 list-disc pl-5">
                  <li>The open source community for their invaluable contributions</li>
                  <li>Medical professionals who reviewed and validated our content</li>
                  <li>Beta testers who provided feedback during development</li>
                  <li>Our users who continue to support and improve the platform</li>
                </ul>
              </div>

              <div className="border-t pt-6">
                <p className="text-center text-sm text-muted-foreground">
                  © 2023-2024 Anatomy Explorer. All rights reserved.
                  <br />
                  Developed with ❤️ by Gilles Momeni (menoc61)
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

