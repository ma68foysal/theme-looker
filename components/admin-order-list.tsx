"use client"
import { useState } from "react"
import Link from "next/link"
import { format } from "date-fns"
import { Copy, MoreHorizontal, ChevronDown, ChevronRight, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Mock data - in a real app, this would be fetched from the API
const orders = [
  {
    id: "1",
    orderNumber: "1001",
    customerName: "John Smith",
    customerEmail: "john@example.com",
    totalAmount: "$99.00",
    status: "completed",
    createdAt: new Date("2023-05-15"),
    licenses: [
      {
        id: "101",
        themeName: "Premium Theme",
        licenseKey: "ECOMPRIA-ABCD-1234-EFGH",
        licenseType: "standard",
        status: "active",
      },
    ],
  },
  {
    id: "2",
    orderNumber: "1002",
    customerName: "Sarah Johnson",
    customerEmail: "sarah@company.com",
    totalAmount: "$149.00",
    status: "completed",
    createdAt: new Date("2023-06-22"),
    licenses: [
      {
        id: "102",
        themeName: "Deluxe Theme",
        licenseKey: "ECOMPRIA-WXYZ-5678-MNOP",
        licenseType: "extended",
        status: "active",
      },
    ],
  },
  {
    id: "3",
    orderNumber: "1003",
    customerName: "Michael Brown",
    customerEmail: "michael@store.com",
    totalAmount: "$198.00",
    status: "completed",
    createdAt: new Date("2023-07-10"),
    licenses: [
      {
        id: "103",
        themeName: "Premium Theme",
        licenseKey: "ECOMPRIA-QRST-9012-UVWX",
        licenseType: "standard",
        status: "active",
      },
      {
        id: "104",
        themeName: "Basic Theme",
        licenseKey: "ECOMPRIA-IJKL-3456-GHIJ",
        licenseType: "standard",
        status: "active",
      },
    ],
  },
  {
    id: "4",
    orderNumber: "1004",
    customerName: "Emily Davis",
    customerEmail: "emily@shop.com",
    totalAmount: "$249.00",
    status: "completed",
    createdAt: new Date("2023-08-05"),
    licenses: [
      {
        id: "105",
        themeName: "Ultimate Theme Bundle",
        licenseKey: "ECOMPRIA-DEFG-7890-HIJK",
        licenseType: "unlimited",
        status: "active",
      },
    ],
  },
  {
    id: "5",
    orderNumber: "1005",
    customerName: "Robert Wilson",
    customerEmail: "robert@business.com",
    totalAmount: "$99.00",
    status: "refunded",
    createdAt: new Date("2023-08-15"),
    licenses: [
      {
        id: "106",
        themeName: "Premium Theme",
        licenseKey: "ECOMPRIA-LMNO-1234-PQRS",
        licenseType: "standard",
        status: "revoked",
      },
    ],
  },
]

export function AdminOrderList() {
  const { toast } = useToast()
  const [expandedOrders, setExpandedOrders] = useState<Record<string, boolean>>({})
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    toast({
      title: "Copied to clipboard",
      description: "Text has been copied to clipboard.",
    })
  }

  const toggleOrderExpand = (orderId: string) => {
    setExpandedOrders((prev) => ({
      ...prev,
      [orderId]: !prev[orderId],
    }))
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge>Active</Badge>
      case "revoked":
        return <Badge variant="outline">Revoked</Badge>
      case "completed":
        return <Badge variant="default">Completed</Badge>
      case "refunded":
        return <Badge variant="destructive">Refunded</Badge>
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  // Filter orders based on search term and status
  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customerEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.licenses.some(
        (license) =>
          license.themeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          license.licenseKey.toLowerCase().includes(searchTerm.toLowerCase()),
      )

    const matchesStatus = statusFilter === "all" || order.status === statusFilter

    return matchesSearch && matchesStatus
  })

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2">
          <Search className="h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search orders..."
            className="w-full sm:w-[300px]"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">Status:</span>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="refunded">Refunded</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[30px]"></TableHead>
              <TableHead>Order #</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="w-[80px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredOrders.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="h-24 text-center">
                  No orders found.
                </TableCell>
              </TableRow>
            ) : (
              filteredOrders.map((order) => (
                <>
                  <TableRow
                    key={order.id}
                    className="cursor-pointer hover:bg-muted/50"
                    onClick={() => toggleOrderExpand(order.id)}
                  >
                    <TableCell>
                      {expandedOrders[order.id] ? (
                        <ChevronDown className="h-4 w-4" />
                      ) : (
                        <ChevronRight className="h-4 w-4" />
                      )}
                    </TableCell>
                    <TableCell className="font-medium">#{order.orderNumber}</TableCell>
                    <TableCell>
                      <div>{order.customerName}</div>
                      <div className="text-xs text-muted-foreground">{order.customerEmail}</div>
                    </TableCell>
                    <TableCell>{format(order.createdAt, "MMM d, yyyy")}</TableCell>
                    <TableCell>{order.totalAmount}</TableCell>
                    <TableCell>{getStatusBadge(order.status)}</TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuItem asChild>
                            <Link href={`/admin/orders/${order.id}`}>View Order Details</Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => copyToClipboard(order.orderNumber)}>
                            <Copy className="mr-2 h-4 w-4" />
                            Copy Order Number
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem asChild>
                            <Link href={`/admin/customers?email=${encodeURIComponent(order.customerEmail)}`}>
                              View Customer
                            </Link>
                          </DropdownMenuItem>
                          {order.status === "completed" && (
                            <DropdownMenuItem className="text-destructive focus:text-destructive">
                              Mark as Refunded
                            </DropdownMenuItem>
                          )}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                  {expandedOrders[order.id] && (
                    <TableRow>
                      <TableCell colSpan={7} className="bg-muted/50 p-0">
                        <div className="p-4">
                          <h4 className="mb-2 font-medium">License Keys</h4>
                          <Table>
                            <TableHeader>
                              <TableRow>
                                <TableHead>Theme</TableHead>
                                <TableHead>License Type</TableHead>
                                <TableHead>License Key</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead className="w-[80px]"></TableHead>
                              </TableRow>
                            </TableHeader>
                            <TableBody>
                              {order.licenses.map((license) => (
                                <TableRow key={license.id}>
                                  <TableCell>{license.themeName}</TableCell>
                                  <TableCell>
                                    {license.licenseType.charAt(0).toUpperCase() + license.licenseType.slice(1)}
                                  </TableCell>
                                  <TableCell className="font-mono text-sm">{license.licenseKey}</TableCell>
                                  <TableCell>{getStatusBadge(license.status)}</TableCell>
                                  <TableCell>
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      onClick={() => copyToClipboard(license.licenseKey)}
                                    >
                                      <Copy className="h-4 w-4" />
                                      <span className="sr-only">Copy</span>
                                    </Button>
                                  </TableCell>
                                </TableRow>
                              ))}
                            </TableBody>
                          </Table>
                        </div>
                      </TableCell>
                    </TableRow>
                  )}
                </>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
