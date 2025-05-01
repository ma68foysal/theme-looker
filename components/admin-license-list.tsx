"use client"
import Link from "next/link"
import { format } from "date-fns"
import { Copy, MoreHorizontal } from "lucide-react"
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

// Mock data - in a real app, this would be fetched from the API
const licenses = [
  {
    id: "1",
    themeName: "Premium Theme",
    shopDomain: "mystore.myshopify.com",
    licenseKey: "LIC-PREM-1234-5678-ABCD",
    licenseType: "standard",
    status: "active",
    customerName: "John Smith",
    customerEmail: "john@example.com",
    createdAt: new Date("2023-01-15"),
    expiresAt: new Date("2024-01-15"),
  },
  {
    id: "2",
    themeName: "Deluxe Theme",
    shopDomain: "store2.myshopify.com",
    licenseKey: "LIC-DELX-5678-1234-EFGH",
    licenseType: "extended",
    status: "active",
    customerName: "Sarah Johnson",
    customerEmail: "sarah@company.com",
    createdAt: new Date("2023-03-10"),
    expiresAt: new Date("2024-03-10"),
  },
  {
    id: "3",
    themeName: "Basic Theme",
    shopDomain: "store3.myshopify.com",
    licenseKey: "LIC-BASIC-9876-5432-IJKL",
    licenseType: "standard",
    status: "expired",
    customerName: "Michael Brown",
    customerEmail: "michael@store.com",
    createdAt: new Date("2022-11-05"),
    expiresAt: new Date("2023-11-05"),
  },
  {
    id: "4",
    themeName: "Premium Theme",
    shopDomain: "shop4.myshopify.com",
    licenseKey: "LIC-PREM-ABCD-EFGH-1234",
    licenseType: "unlimited",
    status: "active",
    customerName: "Emily Davis",
    customerEmail: "emily@shop.com",
    createdAt: new Date("2023-05-22"),
    expiresAt: new Date("2024-05-22"),
  },
  {
    id: "5",
    themeName: "Deluxe Theme",
    shopDomain: "store5.myshopify.com",
    licenseKey: "LIC-DELX-WXYZ-7890-MNOP",
    licenseType: "extended",
    status: "revoked",
    customerName: "Robert Wilson",
    customerEmail: "robert@business.com",
    createdAt: new Date("2023-02-08"),
    expiresAt: new Date("2024-02-08"),
  },
]

export function AdminLicenseList() {
  const { toast } = useToast()

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    toast({
      title: "Copied to clipboard",
      description: "License key has been copied to clipboard.",
    })
  }

  const getLicenseTypeLabel = (type: string) => {
    switch (type) {
      case "standard":
        return "Standard"
      case "extended":
        return "Extended"
      case "unlimited":
        return "Unlimited"
      default:
        return type
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge>Active</Badge>
      case "expired":
        return <Badge variant="destructive">Expired</Badge>
      case "revoked":
        return <Badge variant="outline">Revoked</Badge>
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  return (
    <div className="w-full overflow-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Theme</TableHead>
            <TableHead>Customer</TableHead>
            <TableHead>Shop Domain</TableHead>
            <TableHead>License Type</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Expiration</TableHead>
            <TableHead className="w-[80px]"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {licenses.length === 0 ? (
            <TableRow>
              <TableCell colSpan={7} className="h-24 text-center">
                No licenses found.
              </TableCell>
            </TableRow>
          ) : (
            licenses.map((license) => (
              <TableRow key={license.id}>
                <TableCell className="font-medium">{license.themeName}</TableCell>
                <TableCell>{license.customerName}</TableCell>
                <TableCell>{license.shopDomain}</TableCell>
                <TableCell>{getLicenseTypeLabel(license.licenseType)}</TableCell>
                <TableCell>{getStatusBadge(license.status)}</TableCell>
                <TableCell>{format(license.expiresAt, "MMM d, yyyy")}</TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuItem onClick={() => copyToClipboard(license.licenseKey)}>
                        <Copy className="mr-2 h-4 w-4" />
                        Copy License Key
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem asChild>
                        <Link href={`/admin/licenses/${license.id}`}>View Details</Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link href={`/admin/licenses/${license.id}/tokens`}>Manage Tokens</Link>
                      </DropdownMenuItem>
                      {license.status === "active" ? (
                        <DropdownMenuItem className="text-destructive focus:text-destructive">
                          Revoke License
                        </DropdownMenuItem>
                      ) : (
                        <DropdownMenuItem>Reactivate License</DropdownMenuItem>
                      )}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  )
}
