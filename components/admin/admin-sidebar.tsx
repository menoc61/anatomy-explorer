import {
  Activity,
  CreditCard,
  HardDrive,
  Languages,
  LayoutDashboard,
  LineChart,
  MessageSquare,
  Settings,
  Users,
  Video,
} from "lucide-react"

import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarItem, SidebarNav } from "@/components/ui/sidebar"

const navItems = [
  {
    title: "Dashboard",
    href: "/admin",
    icon: <LayoutDashboard className="h-5 w-5" />,
  },
  {
    title: "Users",
    href: "/admin/users",
    icon: <Users className="h-5 w-5" />,
  },
  {
    title: "Muscles",
    href: "/admin/muscles",
    icon: <Activity className="h-5 w-5" />,
  },
  {
    title: "Videos",
    href: "/admin/videos",
    icon: <Video className="h-5 w-5" />,
  },
  {
    title: "Comments",
    href: "/admin/comments",
    icon: <MessageSquare className="h-5 w-5" />,
  },
  {
    title: "Predictions",
    href: "/admin/predictions",
    icon: <LineChart className="h-5 w-5" />,
  },
  {
    title: "Translations",
    href: "/admin/translations",
    icon: <Languages className="h-5 w-5" />,
  },
  {
    title: "Subscription",
    href: "/admin/subscription",
    icon: <CreditCard className="h-5 w-5" />,
  },
  {
    title: "Storage",
    href: "/admin/storage",
    icon: <HardDrive className="h-5 w-5" />,
  },
  {
    title: "Settings",
    href: "/admin/settings",
    icon: <Settings className="h-5 w-5" />,
  },
]

export function AdminSidebar() {
  return (
    <Sidebar className="w-60">
      <SidebarHeader>
        {/* You can add a logo or title here */}
        <p className="text-xl font-semibold">Admin Panel</p>
      </SidebarHeader>
      <SidebarContent>
        <SidebarNav>
          {navItems.map((item) => (
            <SidebarItem key={item.href} href={item.href} icon={item.icon}>
              {item.title}
            </SidebarItem>
          ))}
        </SidebarNav>
      </SidebarContent>
      <SidebarFooter>
        {/* Optional: Add a footer with user info or settings */}
        <p className="text-xs text-muted-foreground">Footer Content</p>
      </SidebarFooter>
    </Sidebar>
  )
}

