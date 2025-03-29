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

import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton } from "@/components/ui/sidebar"

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

interface AdminSidebarProps {
  children?: React.ReactNode
}

export function AdminSidebar({ children }: AdminSidebarProps) {
  return (
    <div className="flex">
      <Sidebar className="w-60">
      <SidebarHeader>
        {/* You can add a logo or title here */}
        <p className="text-xl font-semibold">Admin Panel</p>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {navItems.map((item) => (
            <SidebarMenuButton key={item.href} asChild>
              <a href={item.href} className="flex items-center gap-2">
                {item.icon}
                {item.title}
              </a>
            </SidebarMenuButton>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter>
        <p className="text-xs text-muted-foreground">Footer Content</p>
      </SidebarFooter>
      </Sidebar>
      <main className="flex-1 overflow-auto">
        {children}
      </main>
    </div>
  )
}
