"use client"

import { Textarea } from "@/components/ui/textarea"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge"
import { Search, Book, Video, MessageSquare, Mail, Phone, FileText, Dumbbell, Crown } from "lucide-react"

export default function HelpPage() {
  const [searchQuery, setSearchQuery] = useState("")

  return (
    <div className="container py-10 max-w-5xl mx-auto">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold tracking-tight mb-2">How can we help you?</h1>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          Find answers to common questions about the Anatomy Explorer or contact our support team
        </p>

        <div className="relative max-w-xl mx-auto mt-6">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            placeholder="Search for help topics..."
            className="pl-10 h-12"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <Tabs defaultValue="faq" className="space-y-8">
        <TabsList className="w-full justify-start overflow-x-auto">
          <TabsTrigger value="faq" className="flex items-center gap-2">
            <Book className="h-4 w-4" />
            FAQ
          </TabsTrigger>
          <TabsTrigger value="tutorials" className="flex items-center gap-2">
            <Video className="h-4 w-4" />
            Tutorials
          </TabsTrigger>
          <TabsTrigger value="community" className="flex items-center gap-2">
            <MessageSquare className="h-4 w-4" />
            Community
          </TabsTrigger>
          <TabsTrigger value="contact" className="flex items-center gap-2">
            <Mail className="h-4 w-4" />
            Contact Us
          </TabsTrigger>
        </TabsList>

        <TabsContent value="faq">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Getting Started</CardTitle>
                <CardDescription>Basic information about using the Anatomy Explorer</CardDescription>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="item-1">
                    <AccordionTrigger>What is the Anatomy Explorer?</AccordionTrigger>
                    <AccordionContent>
                      The Anatomy Explorer is an interactive 3D platform designed to help students, medical
                      professionals, and fitness enthusiasts learn about human anatomy. It provides detailed 3D models
                      of muscles, bones, and other anatomical structures with comprehensive information about their
                      functions and relationships.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-2">
                    <AccordionTrigger>How do I navigate the 3D models?</AccordionTrigger>
                    <AccordionContent>
                      You can rotate the model by clicking and dragging with your mouse. Zoom in and out using the
                      scroll wheel or pinch gestures on touchscreens. To focus on specific muscles or structures, simply
                      click on them in the model or select them from the sidebar menu.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-3">
                    <AccordionTrigger>Can I use Anatomy Explorer on mobile devices?</AccordionTrigger>
                    <AccordionContent>
                      Yes! The Anatomy Explorer is fully responsive and works on smartphones and tablets. The interface
                      automatically adjusts to provide the best experience on smaller screens, though we recommend using
                      a larger screen for more detailed study.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-4">
                    <AccordionTrigger>Is my data secure?</AccordionTrigger>
                    <AccordionContent>
                      We take data security very seriously. All user data is encrypted and stored securely. We never
                      share your personal information with third parties without your explicit consent. For more
                      details, please review our Privacy Policy.
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Subscription & Billing</CardTitle>
                <CardDescription>Information about plans, payments, and account management</CardDescription>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="item-1">
                    <AccordionTrigger>What subscription plans are available?</AccordionTrigger>
                    <AccordionContent>
                      We offer three subscription tiers:
                      <ul className="list-disc pl-6 mt-2 space-y-1">
                        <li>
                          <strong>Basic:</strong> Access to essential anatomy models and information.
                        </li>
                        <li>
                          <strong>Premium:</strong> Includes all basic features plus high-resolution models, animation
                          sequences, and downloadable content.
                        </li>
                        <li>
                          <strong>Professional:</strong> Our most comprehensive plan with all premium features plus
                          specialized medical and clinical content, teaching tools, and priority support.
                        </li>
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-2">
                    <AccordionTrigger>How do I upgrade or downgrade my subscription?</AccordionTrigger>
                    <AccordionContent>
                      You can change your subscription plan at any time by going to your Account page and selecting the
                      "Subscription" tab. Changes to a higher tier take effect immediately, while downgrades will take
                      effect at the end of your current billing cycle.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-3">
                    <AccordionTrigger>Can I cancel my subscription?</AccordionTrigger>
                    <AccordionContent>
                      Yes, you can cancel your subscription at any time from your Account page. After cancellation,
                      you'll continue to have access to your subscription benefits until the end of your current billing
                      period. We don't offer prorated refunds for partial months.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-4">
                    <AccordionTrigger>Do you offer educational discounts?</AccordionTrigger>
                    <AccordionContent>
                      Yes! We offer special pricing for students, educators, and educational institutions. Contact our
                      sales team with your academic credentials to learn more about our educational discount programs.
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Technical Support</CardTitle>
                <CardDescription>Help with technical issues and troubleshooting</CardDescription>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="item-1">
                    <AccordionTrigger>The 3D models aren't loading properly. What should I do?</AccordionTrigger>
                    <AccordionContent>
                      If you're experiencing issues with 3D models:
                      <ol className="list-decimal pl-6 mt-2 space-y-1">
                        <li>Make sure you're using a supported browser (Chrome, Firefox, Safari, or Edge).</li>
                        <li>Check your internet connection - 3D models require a stable connection.</li>
                        <li>Try clearing your browser cache and cookies.</li>
                        <li>Ensure your graphics drivers are up to date.</li>
                        <li>If you're on a mobile device, try switching to WiFi if you're using cellular data.</li>
                      </ol>
                      If problems persist, please contact our support team with details about your device and browser.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-2">
                    <AccordionTrigger>How do I download content for offline use?</AccordionTrigger>
                    <AccordionContent>
                      Premium and Professional subscribers can download content for offline use. Navigate to the model
                      or resource you want to download and click the download button. Downloaded content will be
                      available in your "Downloads" section under your account. Note that downloaded content is for
                      personal use only and subject to our terms of service.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-3">
                    <AccordionTrigger>What are the system requirements?</AccordionTrigger>
                    <AccordionContent>
                      For optimal performance:
                      <ul className="list-disc pl-6 mt-2 space-y-1">
                        <li>
                          <strong>Desktop:</strong> Modern browser (Chrome, Firefox, Safari, Edge), 8GB RAM, dedicated
                          graphics card recommended for best performance.
                        </li>
                        <li>
                          <strong>Mobile:</strong> iOS 14+ or Android 9+, minimum 3GB RAM recommended.
                        </li>
                        <li>
                          <strong>Internet:</strong> Broadband connection (5+ Mbps) for streaming 3D content.
                        </li>
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Content & Features</CardTitle>
                <CardDescription>Information about available content and platform features</CardDescription>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="item-1">
                    <AccordionTrigger>What anatomical systems are covered?</AccordionTrigger>
                    <AccordionContent>
                      Our platform currently covers:
                      <ul className="list-disc pl-6 mt-2 space-y-1">
                        <li>Muscular system (complete)</li>
                        <li>Skeletal system (complete)</li>
                        <li>Nervous system (major structures)</li>
                        <li>Cardiovascular system (major structures)</li>
                        <li>Respiratory system (major structures)</li>
                        <li>Digestive system (major structures)</li>
                      </ul>
                      We regularly add new content and expand our coverage based on user feedback and educational needs.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-2">
                    <AccordionTrigger>Can I use the content for teaching or presentations?</AccordionTrigger>
                    <AccordionContent>
                      Yes! Professional subscribers can use our content for educational purposes, including classroom
                      teaching, presentations, and patient education. You can export images and animations for use in
                      your materials, with attribution as specified in our terms of service. For commercial use or
                      publication, please contact us for licensing information.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-3">
                    <AccordionTrigger>How accurate are the anatomical models?</AccordionTrigger>
                    <AccordionContent>
                      Our models are developed in collaboration with medical professionals and anatomists to ensure high
                      accuracy. They are based on medical imaging data, anatomical references, and expert review. While
                      we strive for maximum accuracy, our models are primarily educational tools and may simplify some
                      complex structures for clarity. For clinical applications, always refer to medical textbooks and
                      professional resources.
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="tutorials">
          <div className="grid gap-6 md:grid-cols-3">
            <Card>
              <CardHeader className="pb-0">
                <div className="aspect-video bg-muted rounded-md mb-3 flex items-center justify-center">
                  <Video className="h-10 w-10 text-muted-foreground" />
                </div>
                <CardTitle className="flex items-center gap-2">
                  Getting Started
                  <Badge>Beginner</Badge>
                </CardTitle>
                <CardDescription>Learn the basics of navigating the Anatomy Explorer</CardDescription>
              </CardHeader>
              <CardContent className="pt-4">
                <Button className="w-full">Watch Tutorial</Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-0">
                <div className="aspect-video bg-muted rounded-md mb-3 flex items-center justify-center">
                  <Dumbbell className="h-10 w-10 text-muted-foreground" />
                </div>
                <CardTitle className="flex items-center gap-2">
                  Muscular System Deep Dive
                  <Badge variant="outline">Intermediate</Badge>
                </CardTitle>
                <CardDescription>Explore the muscular system in detail</CardDescription>
              </CardHeader>
              <CardContent className="pt-4">
                <Button className="w-full">Watch Tutorial</Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-0">
                <div className="aspect-video bg-muted rounded-md mb-3 flex items-center justify-center">
                  <Crown className="h-10 w-10 text-muted-foreground" />
                </div>
                <CardTitle className="flex items-center gap-2">
                  Advanced Features
                  <Badge variant="secondary">Premium</Badge>
                </CardTitle>
                <CardDescription>Learn about premium features and tools</CardDescription>
              </CardHeader>
              <CardContent className="pt-4">
                <Button className="w-full">Watch Tutorial</Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-0">
                <div className="aspect-video bg-muted rounded-md mb-3 flex items-center justify-center">
                  <FileText className="h-10 w-10 text-muted-foreground" />
                </div>
                <CardTitle>Using Notes & Annotations</CardTitle>
                <CardDescription>Learn how to create and manage study notes</CardDescription>
              </CardHeader>
              <CardContent className="pt-4">
                <Button className="w-full">Watch Tutorial</Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-0">
                <div className="aspect-video bg-muted rounded-md mb-3 flex items-center justify-center">
                  <Video className="h-10 w-10 text-muted-foreground" />
                </div>
                <CardTitle>Creating Custom Views</CardTitle>
                <CardDescription>Save and share custom anatomical views</CardDescription>
              </CardHeader>
              <CardContent className="pt-4">
                <Button className="w-full">Watch Tutorial</Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-0">
                <div className="aspect-video bg-muted rounded-md mb-3 flex items-center justify-center">
                  <Video className="h-10 w-10 text-muted-foreground" />
                </div>
                <CardTitle>Mobile App Tutorial</CardTitle>
                <CardDescription>Using Anatomy Explorer on mobile devices</CardDescription>
              </CardHeader>
              <CardContent className="pt-4">
                <Button className="w-full">Watch Tutorial</Button>
              </CardContent>
            </Card>
          </div>

          <div className="mt-6 text-center">
            <Button variant="outline" className="gap-2">
              <Video className="h-4 w-4" />
              View All Tutorials
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="community">
          <Card>
            <CardHeader>
              <CardTitle>Community Resources</CardTitle>
              <CardDescription>Connect with other users and access community resources</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-6 md:grid-cols-2">
                <div className="border rounded-lg p-6">
                  <h3 className="text-lg font-medium mb-2">Discussion Forums</h3>
                  <p className="text-muted-foreground mb-4">
                    Join conversations with students, educators, and healthcare professionals. Ask questions, share
                    insights, and discuss anatomy topics.
                  </p>
                  <Button>Visit Forums</Button>
                </div>

                <div className="border rounded-lg p-6">
                  <h3 className="text-lg font-medium mb-2">User Guides & Resources</h3>
                  <p className="text-muted-foreground mb-4">
                    Access user-created guides, study materials, and resources shared by our community members.
                  </p>
                  <Button>Browse Resources</Button>
                </div>

                <div className="border rounded-lg p-6">
                  <h3 className="text-lg font-medium mb-2">Feature Requests</h3>
                  <p className="text-muted-foreground mb-4">
                    Suggest new features or improvements to the Anatomy Explorer. Vote on ideas from other users.
                  </p>
                  <Button>Submit Ideas</Button>
                </div>

                <div className="border rounded-lg p-6">
                  <h3 className="text-lg font-medium mb-2">Community Events</h3>
                  <p className="text-muted-foreground mb-4">
                    Join webinars, Q&A sessions, and other events hosted by our team and community experts.
                  </p>
                  <Button>View Calendar</Button>
                </div>
              </div>

              <div className="bg-muted p-6 rounded-lg">
                <h3 className="text-lg font-medium mb-2">Community Guidelines</h3>
                <p className="text-muted-foreground">
                  Our community is dedicated to creating a respectful, inclusive environment for everyone. Please review
                  our community guidelines before participating.
                </p>
                <Button variant="outline" className="mt-4">
                  Read Guidelines
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="contact">
          <Card>
            <CardHeader>
              <CardTitle>Contact Support</CardTitle>
              <CardDescription>Get in touch with our support team for personalized assistance</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-4">
                  <div className="border rounded-lg p-6">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="bg-primary/10 p-2 rounded-full">
                        <Mail className="h-5 w-5 text-primary" />
                      </div>
                      <h3 className="text-lg font-medium">Email Support</h3>
                    </div>
                    <p className="text-muted-foreground mb-4">
                      Send us an email and we'll respond within 24 hours (business days).
                    </p>
                    <Button className="w-full">Email Us</Button>
                  </div>

                  <div className="border rounded-lg p-6">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="bg-primary/10 p-2 rounded-full">
                        <MessageSquare className="h-5 w-5 text-primary" />
                      </div>
                      <h3 className="text-lg font-medium">Live Chat</h3>
                    </div>
                    <p className="text-muted-foreground mb-4">
                      Chat with our support team in real-time during business hours.
                    </p>
                    <Button className="w-full">Start Chat</Button>
                  </div>

                  <div className="border rounded-lg p-6">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="bg-primary/10 p-2 rounded-full">
                        <Phone className="h-5 w-5 text-primary" />
                      </div>
                      <h3 className="text-lg font-medium">Phone Support</h3>
                    </div>
                    <p className="text-muted-foreground mb-4">
                      Premium and Professional subscribers can access phone support.
                    </p>
                    <Button className="w-full">Call Support</Button>
                  </div>
                </div>

                <div className="border rounded-lg p-6">
                  <h3 className="text-lg font-medium mb-4">Send a Message</h3>
                  <div className="space-y-4">
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <label htmlFor="name" className="text-sm font-medium">
                          Name
                        </label>
                        <Input id="name" placeholder="Your name" />
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="email" className="text-sm font-medium">
                          Email
                        </label>
                        <Input id="email" type="email" placeholder="Your email" />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="subject" className="text-sm font-medium">
                        Subject
                      </label>
                      <Input id="subject" placeholder="What's this about?" />
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="message" className="text-sm font-medium">
                        Message
                      </label>
                      <Textarea id="message" placeholder="How can we help you?" className="min-h-[150px]" />
                    </div>

                    <Button className="w-full">Send Message</Button>
                  </div>
                </div>
              </div>

              <div className="mt-6 p-4 bg-muted rounded-lg text-center">
                <p className="text-sm text-muted-foreground">
                  Our support hours are Monday to Friday, 9am to 5pm EST. We aim to respond to all inquiries within 24
                  business hours.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

