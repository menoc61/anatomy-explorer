"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  BarChart3,
  Users,
  FileVideo,
  Database,
  Settings,
  Home,
  Dumbbell,
  Cloud,
  HardDrive,
  LineChart,
} from "lucide-react";
import { useSidebar } from "@/components/ui/sidebar";

export function AdminSidebar({ mobile = false }) {
  const pathname = usePathname();
  const { state } = useSidebar();
  const isCollapsed = state === "collapsed";

  const sidebarNavItems = [
    {
      title: "Dashboard",
      href: "/admin",
      icon: <BarChart3 className="h-4 w-4" />,
    },
    {
      title: "Users",
      href: "/admin/users",
      icon: <Users className="h-4 w-4" />,
    },
    {
      title: "Muscles",
      href: "/admin/muscles",
      icon: <Dumbbell className="h-4 w-4" />,
    },
    {
      title: "Videos",
      href: "/admin/videos",
      icon: <FileVideo className="h-4 w-4" />,
    },
    {
      title: "Database",
      href: "/admin/database",
      icon: <Database className="h-4 w-4" />,
    },
    {
      title: "Content Storage",
      href: "/admin/content-storage",
      icon: <HardDrive className="h-4 w-4" />,
    },
    {
      title: "Analytics",
      href: "/admin/predictions",
      icon: <LineChart className="h-4 w-4" />,
    },
    {
      title: "Environment",
      href: "/admin/settings/environment",
      icon: <Cloud className="h-4 w-4" />,
    },
    {
      title: "Settings",
      href: "/admin/settings",
      icon: <Settings className="h-4 w-4" />,
    },
  ];

  return (
    <div
      className={cn(
        mobile ? "block" : "hidden md:block",
        "border-r h-[calc(100vh-4rem)] flex-shrink-0 transition-all duration-300",
        isCollapsed && !mobile ? "w-16" : "w-64"
      )}
    >
      <ScrollArea className="h-full py-6 pr-6">
        <div className="pl-6 pr-1">
          <div className="flex items-center mb-6">
            <Link
              href="/"
              className={cn(
                "flex items-center gap-2",
                isCollapsed ? "justify-center" : "justify-start"
              )}
            >
              <Home className="h-4 w-4" />
              {!isCollapsed && (
                <span className="font-medium">Back to Site</span>
              )}
            </Link>
          </div>
          <div className="space-y-1">
            {sidebarNavItems.map((item) => (
              <Button
                key={item.href}
                variant={pathname === item.href ? "default" : "ghost"}
                className={cn(
                  "w-full justify-start transition-all",
                  pathname === item.href
                    ? "bg-primary/90"
                    : "hover:bg-secondary",
                  isCollapsed ? "justify-center px-0" : "justify-start px-3"
                )}
                asChild
              >
                <Link href={item.href} className="flex items-center">
                  <span className={cn(isCollapsed ? "mr-0" : "mr-2")}>
                    {item.icon}
                  </span>
                  {!isCollapsed && item.title}
                </Link>
              </Button>
            ))}
          </div>
        </div>
      </ScrollArea>
    </div>
  );
}
