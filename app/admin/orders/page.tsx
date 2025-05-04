import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { DashboardShell } from "@/components/dashboard-shell"
import { AdminOrderList } from "@/components/admin-order-list"

export default function AdminOrdersPage() {
  return (
    <DashboardShell>
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Order Management</h1>
        <p className="text-muted-foreground">View and manage all theme orders and associated licenses</p>
      </div>
      <div className="mt-6">
        <Card>
          <CardHeader>
            <CardTitle>All Orders</CardTitle>
            <CardDescription>View all orders and their associated license keys.</CardDescription>
          </CardHeader>
          <CardContent>
            <AdminOrderList />
          </CardContent>
        </Card>
      </div>
    </DashboardShell>
  )
}
