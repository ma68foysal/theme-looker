"use client"
import Link from "next/link"
import { format } from "date-fns"
import { Copy, MoreHorizontal, Plus } from "lucide-react"
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
    createdAt: new Date("2022-11-05"),
    expiresAt: new Date("2023-11-05"),
  },
]

export function LicenseList() {
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

  return (
    <div className="w-full overflow-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Theme</TableHead>
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
              <TableCell colSpan={6} className="h-24 text-center">
                No licenses found.
              </TableCell>
            </TableRow>
          ) : (
            licenses.map((license) => (
              <TableRow key={license.id}>
                <TableCell className="font-medium">{license.themeName}</TableCell>
                <TableCell>{license.shopDomain}</TableCell>
                <TableCell>{getLicenseTypeLabel(license.licenseType)}</TableCell>
                <TableCell>
                  <Badge variant={license.status === "active" ? "default" : "destructive"}>
                    {license.status === "active" ? "Active" : "Expired"}
                  </Badge>
                </TableCell>
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
                        <Link href={`/dashboard/tokens/new?licenseId=${license.id}`}>
                          <Plus className="mr-2 h-4 w-4" />
                          Generate Token
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link href={`/dashboard/licenses/${license.id}`}>View Details</Link>
                      </DropdownMenuItem>
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
