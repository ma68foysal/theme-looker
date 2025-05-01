import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { DashboardShell } from "@/components/dashboard-shell"
import { AdminLicenseList } from "@/components/admin-license-list"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import Link from "next/link"

export default function AdminLicensesPage() {
  return (
    <DashboardShell>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">All Licenses</h1>
          <p className="text-muted-foreground">Manage all customer licenses</p>
        </div>
        <Link href="/admin/licenses/new">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Create License
          </Button>
        </Link>
      </div>
      <div className="mt-6">
        <Card>
          <CardHeader>
            <CardTitle>License Management</CardTitle>
            <CardDescription>View and manage all customer licenses.</CardDescription>
          </CardHeader>
          <CardContent>
            <AdminLicenseList />
          </CardContent>
        </Card>
      </div>
    </DashboardShell>
  )
}
