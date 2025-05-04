"use client"
import { useState } from "react"
import { format } from "date-fns"
import { Search, Filter, Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Mock data - in a real app, this would be fetched from the API
const logs = [
  {
    id: "1",
    level: "info",
    message: "License email sent",
    data: { messageId: "abc123", email: "john@example.com", orderNumber: "1001", licenseCount: 1 },
    timestamp: new Date("2023-08-15T14:30:00"),
    userId: null,
    action: "email.send",
  },
  {
    id: "2",
    level: "info",
    message: "Licenses created successfully",
    data: {
      order_number: "1002",
      license_count: 1,
      license_keys: ["ECOMPRIA-WXYZ-5678-MNOP"],
    },
    timestamp: new Date("2023-08-15T14:29:45"),
    userId: null,
    action: "license.create",
  },
  {
    id: "3",
    level: "info",
    message: "Received Shopify webhook",
    data: {
      resource_type: "order",
      order_id: "2",
      order_number: "1002",
    },
    timestamp: new Date("2023-08-15T14:29:30"),
    userId: null,
    action: "webhook.receive",
  },
  {
    id: "4",
    level: "error",
    message: "Failed to send license email",
    data: {
      error: "SMTP connection failed",
      email: "invalid@example.com",
      orderNumber: "1003",
    },
    timestamp: new Date("2023-08-14T10:15:22"),
    userId: null,
    action: "email.send",
  },
  {
    id: "5",
    level: "warn",
    message: "Invalid webhook signature",
    data: {
      hmac: "abc123",
      generatedHash: "def456",
    },
    timestamp: new Date("2023-08-14T09:45:12"),
    userId: null,
    action: "webhook.validate",
  },
  {
    id: "6",
    level: "debug",
    message: "License verification attempt",
    data: {
      licenseKey: "ECOMPRIA-ABCD-1234-EFGH",
      result: "valid",
    },
    timestamp: new Date("2023-08-13T16:22:45"),
    userId: "user_123",
    action: "license.verify",
  },
  {
    id: "7",
    level: "error",
    message: "Database connection error",
    data: {
      error: "Connection timeout",
      database: "licenses",
    },
    timestamp: new Date("2023-08-13T15:10:30"),
    userId: null,
    action: "system.database",
  },
]

export function AdminLogViewer() {
  const [searchTerm, setSearchTerm] = useState("")
  const [levelFilter, setLevelFilter] = useState("all")
  const [actionFilter, setActionFilter] = useState("all")

  // Get unique actions for filter
  const uniqueActions = Array.from(new Set(logs.map((log) => log.action)))

  // Filter logs based on search term, level, and action
  const filteredLogs = logs.filter((log) => {
    const matchesSearch =
      log.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (log.userId && log.userId.toLowerCase().includes(searchTerm.toLowerCase())) ||
      JSON.stringify(log.data).toLowerCase().includes(searchTerm.toLowerCase())

    const matchesLevel = levelFilter === "all" || log.level === levelFilter
    const matchesAction = actionFilter === "all" || log.action === actionFilter

    return matchesSearch && matchesLevel && matchesAction
  })

  const getLevelBadge = (level: string) => {
    switch (level) {
      case "info":
        return (
          <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
            info
          </Badge>
        )
      case "warn":
        return (
          <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
            warn
          </Badge>
        )
      case "error":
        return (
          <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
            error
          </Badge>
        )
      case "debug":
        return (
          <Badge variant="outline" className="bg-gray-50 text-gray-700 border-gray-200">
            debug
          </Badge>
        )
      default:
        return <Badge variant="outline">{level}</Badge>
    }
  }

  const downloadLogs = () => {
    const jsonStr = JSON.stringify(filteredLogs, null, 2)
    const dataUri = `data:application/json;charset=utf-8,${encodeURIComponent(jsonStr)}`

    const link = document.createElement("a")
    link.setAttribute("href", dataUri)
    link.setAttribute("download", `themelock-logs-${format(new Date(), "yyyy-MM-dd")}.json`)
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2">
          <Search className="h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search logs..."
            className="w-full sm:w-[300px]"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-muted-foreground" />
            <Select value={levelFilter} onValueChange={setLevelFilter}>
              <SelectTrigger className="w-[120px]">
                <SelectValue placeholder="Level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Levels</SelectItem>
                <SelectItem value="debug">Debug</SelectItem>
                <SelectItem value="info">Info</SelectItem>
                <SelectItem value="warn">Warning</SelectItem>
                <SelectItem value="error">Error</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center gap-2">
            <Select value={actionFilter} onValueChange={setActionFilter}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Action" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Actions</SelectItem>
                {uniqueActions.map((action) => (
                  <SelectItem key={action} value={action}>
                    {action}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <Button variant="outline" size="sm" onClick={downloadLogs}>
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Level</TableHead>
              <TableHead className="w-[180px]">Timestamp</TableHead>
              <TableHead>Message</TableHead>
              <TableHead className="w-[150px]">Action</TableHead>
              <TableHead className="w-[100px]">User ID</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredLogs.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="h-24 text-center">
                  No logs found.
                </TableCell>
              </TableRow>
            ) : (
              filteredLogs.map((log) => (
                <TableRow key={log.id} className="group cursor-pointer hover:bg-muted/50">
                  <TableCell>{getLevelBadge(log.level)}</TableCell>
                  <TableCell className="font-mono text-xs">{format(log.timestamp, "yyyy-MM-dd HH:mm:ss")}</TableCell>
                  <TableCell>
                    <div>{log.message}</div>
                    <div className="mt-1 hidden rounded bg-muted p-2 text-xs font-mono group-hover:block">
                      {JSON.stringify(log.data, null, 2)}
                    </div>
                  </TableCell>
                  <TableCell className="text-sm">{log.action}</TableCell>
                  <TableCell className="text-sm">{log.userId || "-"}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
