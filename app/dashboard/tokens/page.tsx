import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { DashboardShell } from "@/components/dashboard-shell"
import { TokenList } from "@/components/token-list"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import Link from "next/link"

export default function TokensPage() {
  return (
    <DashboardShell>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Authentication Tokens</h1>
          <p className="text-muted-foreground">Manage authentication tokens for your theme licenses</p>
        </div>
        <Link href="/dashboard/tokens/new">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            New Token
          </Button>
        </Link>
      </div>
      <div className="mt-6">
        <Card>
          <CardHeader>
            <CardTitle>Your Tokens</CardTitle>
            <CardDescription>View and manage all your authentication tokens.</CardDescription>
          </CardHeader>
          <CardContent>
            <TokenList />
          </CardContent>
        </Card>
      </div>
    </DashboardShell>
  )
}
