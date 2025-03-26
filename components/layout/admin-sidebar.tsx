"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { BarChart3, Users, FileVideo, Database, Settings, Home, Dumbbell } from "lucide-react"

export function AdminSidebar() {
  const pathname = usePathname()

  const sidebarNavItems = [
    {
      title: "Dashboard",
      href: "/admin",
      icon: <BarChart3 className="h-4 w-4 mr-2" />,
    },
    {
      title: "Users",
      href: "/admin/users",
      icon: <Users className="h-4 w-4 mr-2" />,
    },
    {
      title: "Muscles",
      href: "/admin/muscles",
      icon: <Dumbbell className="h-4 w-4 mr-2" />,
    },
    {
      title: "Videos",
      href: "/admin/videos",
      icon: <FileVideo className="h-4 w-4 mr-2" />,
    },
    {
      title: "Content",
      href: "/admin/content",
      icon: <Database className="h-4 w-4 mr-2" />,
    },
    {
      title: "Settings",
      href: "/admin/settings",
      icon: <Settings className="h-4 w-4 mr-2" />,
    },
  ]

  return (
    <div className="hidden md:block border-r h-[calc(100vh-4rem)] w-64 flex-shrink-0">
      <ScrollArea className="h-full py-6 pr-6">
        <div className="pl-6 pr-1">
          <div className="flex items-center mb-6">
            <Link href="/" className="flex items-center gap-2">
              <Home className="h-4 w-4" />
              <span className="font-medium">Back to Site</span>
            </Link>
          </div>
          <div className="space-y-1">
            {sidebarNavItems.map((item) => (
              <Button
                key={item.href}
                variant={pathname === item.href ? "default" : "ghost"}
                className={cn(
                  "w-full justify-start",
                  pathname === item.href ? "bg-primary text-primary-foreground" : "text-muted-foreground",
                )}
                asChild
              >
                <Link href={item.href}>
                  {item.icon}
                  {item.title}
                </Link>
              </Button>
            ))}
          </div>
        </div>
      </ScrollArea>
    </div>
  )
}

