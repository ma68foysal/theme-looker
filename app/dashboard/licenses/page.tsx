import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { DashboardShell } from "@/components/dashboard-shell"
import { LicenseList } from "@/components/license-list"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import Link from "next/link"

export default function LicensesPage() {
  return (
    <DashboardShell>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Licenses</h1>
          <p className="text-muted-foreground">Manage your theme licenses and generate authentication tokens</p>
        </div>
        <Link href="/dashboard/licenses/new">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            New License
          </Button>
        </Link>
      </div>
      <div className="mt-6">
        <Card>
          <CardHeader>
            <CardTitle>Your Licenses</CardTitle>
            <CardDescription>View and manage all your theme licenses.</CardDescription>
          </CardHeader>
          <CardContent>
            <LicenseList />
          </CardContent>
        </Card>
      </div>
    </DashboardShell>
  )
}
