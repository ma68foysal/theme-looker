import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { DashboardShell } from "@/components/dashboard-shell"
import { AdminCustomerList } from "@/components/admin-customer-list"

export default function AdminCustomersPage() {
  return (
    <DashboardShell>
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Customers</h1>
        <p className="text-muted-foreground">Manage customer accounts and view their licenses</p>
      </div>
      <div className="mt-6">
        <Card>
          <CardHeader>
            <CardTitle>All Customers</CardTitle>
            <CardDescription>View and manage all customer accounts.</CardDescription>
          </CardHeader>
          <CardContent>
            <AdminCustomerList />
          </CardContent>
        </Card>
      </div>
    </DashboardShell>
  )
}
