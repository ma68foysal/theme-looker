import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { DashboardShell } from "@/components/dashboard-shell"
import { AdminLogViewer } from "@/components/admin-log-viewer"

export default function AdminLogsPage() {
  return (
    <DashboardShell>
      <div>
        <h1 className="text-2xl font-bold tracking-tight">System Logs</h1>
        <p className="text-muted-foreground">View system logs and error reports</p>
      </div>
      <div className="mt-6">
        <Card>
          <CardHeader>
            <CardTitle>Application Logs</CardTitle>
            <CardDescription>View and filter system logs for troubleshooting.</CardDescription>
          </CardHeader>
          <CardContent>
            <AdminLogViewer />
          </CardContent>
        </Card>
      </div>
    </DashboardShell>
  )
}
