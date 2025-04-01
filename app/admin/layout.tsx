import type React from "react"
import { AdminHeader } from "@/components/layout/admin-header"
import { AdminSidebar } from "@/components/layout/admin-sidebar"
import AdminGuard from "@/components/admin-guard"
import { SidebarProvider } from "@/components/ui/sidebar"

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <AdminGuard>
      <SidebarProvider>
        <div className="relative flex flex-col min-h-screen">
          <AdminHeader />
          <div className="flex flex-1 min-h-0">
            <div className="hidden md:flex h-full">
              <AdminSidebar />
            </div>
            <div role="main" className="flex-1 min-h-0 flex flex-col">
              <div className="flex-1 min-h-0 p-4 md:p-6 overflow-y-auto">
                <div className="mx-auto w-full max-w-7xl"> 
                  {children}
                </div>
              </div>
            </div>
          </div>
        </div>
      </SidebarProvider>
    </AdminGuard>
  )
}
