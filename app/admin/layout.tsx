import type { ReactNode } from "react"
import { AdminNav } from "@/components/admin-nav"
import { DashboardHeader } from "@/components/dashboard-header"
import { requireAdmin } from "@/lib/actions/auth-actions"

export default async function AdminLayout({ children }: { children: ReactNode }) {
  // This ensures only admins can access these routes
  await requireAdmin()

  return (
    <div className="flex min-h-screen flex-col">
      <DashboardHeader isAdmin={true} />
      <div className="container flex-1 items-start md:grid md:grid-cols-[220px_minmax(0,1fr)] md:gap-6 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-10">
        <AdminNav />
        <main className="flex w-full flex-col overflow-hidden py-6">{children}</main>
      </div>
    </div>
  )
}
