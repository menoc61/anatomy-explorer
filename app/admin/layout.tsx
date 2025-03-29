import type React from "react"
import { AdminHeader } from "@/components/layout/admin-header"
import { AdminSidebar } from "@/components/layout/admin-sidebar"
import AdminGuard from "@/components/admin-guard"

export default function AdminSidebar({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <AdminGuard>
      <div className="relative flex min-h-screen flex-col">
        <AdminHeader />
        <div className="flex h-[calc(100vh-4rem)]">
          <AdminSidebar />
          <main className="flex-1 overflow-y-auto p-6">{children}</main>
        </div>
      </div>
    </AdminGuard>
  )
}

