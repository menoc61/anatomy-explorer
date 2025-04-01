import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import ClientLayout from "./client-layout"
// Import the service worker registration component
import ServiceWorkerRegistration from "./sw-register"
// ThemeProvider is now handled within ClientLayout

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Anatomy Explorer SaaS",
  description: "Interactive 3D human anatomy explorer with subscription plans",
    generator: 'v0.dev',
    icons: {
      icon: "/placeholder-logo.svg",
      apple: "/placeholder-logo.png", 
    },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className} suppressHydrationWarning>
        <ServiceWorkerRegistration />
        {/* ClientLayout now handles ThemeProvider internally */}
        <ClientLayout>
          {children}
        </ClientLayout>
      </body>
    </html>
  )
}
