"use client"

import { usePathname } from "next/navigation"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { useAuth } from "@/contexts/auth-context"
import { useLanguage } from "@/contexts/language-context"
import { ThemeToggle } from "@/components/theme-toggle"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import {
  BarChart3,
  Crown,
  Database,
  Dumbbell,
  FileVideo,
  Home,
  LogOut,
  Settings,
  User,
  Users,
  BookOpen,
  Video,
} from "lucide-react"

export function MainNav() {
  const pathname = usePathname()
  const { user, logout, isAdmin } = useAuth()
  const { t, language, setLanguage } = useLanguage()

  const isActive = (path: string) => {
    if (path === "/" && pathname === "/") return true
    if (path !== "/" && pathname.startsWith(path)) return true
    return false
  }

  const navItems = [
    {
      name: t("nav.home"),
      href: "/",
      icon: <Home className="h-4 w-4 mr-2" />,
    },
    {
      name: t("nav.learn"),
      href: "/account/downloads",
      icon: <BookOpen className="h-4 w-4 mr-2" />,
    },
  ]

  // Admin-specific nav items
  const adminNavItems = [
    {
      name: "Dashboard",
      href: "/admin",
      icon: <BarChart3 className="h-4 w-4 mr-2" />,
    },
    {
      name: "Users",
      href: "/admin/users",
      icon: <Users className="h-4 w-4 mr-2" />,
    },
    {
      name: "Content",
      href: "/admin/content",
      icon: <Database className="h-4 w-4 mr-2" />,
    },
    {
      name: "Videos",
      href: "/admin/videos",
      icon: <FileVideo className="h-4 w-4 mr-2" />,
    },
  ]

  // Use admin nav items if user is admin and on admin pages
  const displayNavItems = isAdmin && pathname.startsWith("/admin") ? adminNavItems : navItems

  return (
    <div className="flex items-center justify-between px-4 py-3 md:px-6">
      <div className="flex items-center gap-4 md:gap-8">
        <Link href="/" className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground">
            <Dumbbell className="h-4 w-4" />
          </div>
          <span className="font-bold text-lg md:text-xl hidden sm:inline-block">{t("app.title")}</span>
          <span className="font-bold text-lg md:text-xl sm:hidden">AE</span>
        </Link>
        <nav className="hidden md:flex items-center gap-4">
          {displayNavItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center text-sm font-medium transition-colors hover:text-primary",
                isActive(item.href) ? "text-primary" : "text-muted-foreground",
              )}
            >
              {item.icon}
              {item.name}
            </Link>
          ))}
        </nav>
      </div>

      <div className="flex items-center gap-2 md:gap-3">
        <div className="border rounded-full overflow-hidden flex items-center shrink-0">
          <Button
            variant={language === "en" ? "default" : "ghost"}
            size="sm"
            className="rounded-none px-2 h-8"
            onClick={() => setLanguage("en")}
          >
            EN
          </Button>
          <Button
            variant={language === "fr" ? "default" : "ghost"}
            size="sm"
            className="rounded-none px-2 h-8"
            onClick={() => setLanguage("fr")}
          >
            FR
          </Button>
          <Button
            variant={language === "ru" ? "default" : "ghost"}
            size="sm"
            className="rounded-none px-2 h-8"
            onClick={() => setLanguage("ru")}
          >
            RU
          </Button>
        </div>

        <ThemeToggle />

        {user ? (
          <div className="flex items-center gap-2">
            {user.subscription?.status === "active" && (
            <div className="hidden md:flex items-center gap-1 text-amber-400 px-2 py-1 rounded-md bg-amber-400/10">
              <Crown className="h-4 w-4" />
              <span className="text-xs font-medium tracking-tight">{user.subscription.plan}</span>
            </div>
            )}

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="secondary"
                  className="relative h-8 rounded-full flex items-center gap-2 pr-2 cursor-pointer"
                >
                  <Avatar className="h-6 w-6">
                    <AvatarImage src={`https://avatar.vercel.sh/${user.email}`} alt={user.name} />
                    <AvatarFallback>{user.name.charAt(0).toUpperCase()}</AvatarFallback>
                  </Avatar>
                  <span className="text-sm hidden sm:inline-block">{user.name}</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end">
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">{user.name}</p>
                    <p className="text-xs leading-none text-muted-foreground">{user.email}</p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/account/profile" className="cursor-pointer flex items-center">
                    <User className="h-4 w-4 mr-2" />
                    Edit Profile
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/account/subscription" className="cursor-pointer flex items-center">
                    <Crown className="h-4 w-4 mr-2" />
                    {t("subscription.title")}
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/account/settings" className="cursor-pointer flex items-center">
                    <Settings className="h-4 w-4 mr-2" />
                    {t("nav.settings")}
                  </Link>
                </DropdownMenuItem>
                {isAdmin && (
                  <>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link href="/admin" className="cursor-pointer flex items-center">
                        <BarChart3 className="h-4 w-4 mr-2" />
                        Admin Dashboard
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/admin/settings" className="cursor-pointer flex items-center">
                        <Settings className="h-4 w-4 mr-2" />
                        Admin Settings
                      </Link>
                    </DropdownMenuItem>
                  </>
                )}
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={logout} className="cursor-pointer flex items-center">
                  <LogOut className="h-4 w-4 mr-2" />
                  {t("nav.logout")}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" asChild className="hidden sm:flex">
              <Link href="/login">{t("auth.login")}</Link>
            </Button>
            <Button size="sm" asChild>
              <Link href="/signup">{t("auth.signup")}</Link>
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
