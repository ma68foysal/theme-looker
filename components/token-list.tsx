"use client"
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
const tokens = [
  {
    id: "1",
    token: "tk_1a2b3c4d5e6f7g8h9i0j",
    licenseId: "1",
    themeName: "Premium Theme",
    shopDomain: "mystore.myshopify.com",
    status: "active",
    createdAt: new Date("2023-06-15"),
    expiresAt: new Date("2024-06-15"),
  },
  {
    id: "2",
    token: "tk_2b3c4d5e6f7g8h9i0j1k",
    licenseId: "1",
    themeName: "Premium Theme",
    shopDomain: "mystore.myshopify.com",
    status: "active",
    createdAt: new Date("2023-08-10"),
    expiresAt: new Date("2024-08-10"),
  },
  {
    id: "3",
    token: "tk_3c4d5e6f7g8h9i0j1k2l",
    licenseId: "2",
    themeName: "Deluxe Theme",
    shopDomain: "store2.myshopify.com",
    status: "active",
    createdAt: new Date("2023-09-05"),
    expiresAt: new Date("2024-09-05"),
  },
  {
    id: "4",
    token: "tk_4d5e6f7g8h9i0j1k2l3m",
    licenseId: "3",
    themeName: "Basic Theme",
    shopDomain: "store3.myshopify.com",
    status: "expired",
    createdAt: new Date("2022-11-05"),
    expiresAt: new Date("2023-11-05"),
  },
  {
    id: "5",
    token: "tk_5e6f7g8h9i0j1k2l3m4n",
    licenseId: "2",
    themeName: "Deluxe Theme",
    shopDomain: "store2.myshopify.com",
    status: "revoked",
    createdAt: new Date("2023-01-20"),
    expiresAt: new Date("2024-01-20"),
  },
]

export function TokenList() {
  const { toast } = useToast()

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    toast({
      title: "Copied to clipboard",
      description: "Token has been copied to clipboard.",
    })
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
            <TableHead>Shop Domain</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Created</TableHead>
            <TableHead>Expires</TableHead>
            <TableHead className="w-[80px]"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tokens.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6} className="h-24 text-center">
                No tokens found.
              </TableCell>
            </TableRow>
          ) : (
            tokens.map((token) => (
              <TableRow key={token.id}>
                <TableCell className="font-medium">{token.themeName}</TableCell>
                <TableCell>{token.shopDomain}</TableCell>
                <TableCell>{getStatusBadge(token.status)}</TableCell>
                <TableCell>{format(token.createdAt, "MMM d, yyyy")}</TableCell>
                <TableCell>{format(token.expiresAt, "MMM d, yyyy")}</TableCell>
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
                      <DropdownMenuItem onClick={() => copyToClipboard(token.token)}>
                        <Copy className="mr-2 h-4 w-4" />
                        Copy Token
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>View Details</DropdownMenuItem>
                      {token.status === "active" && (
                        <DropdownMenuItem className="text-destructive focus:text-destructive">
                          Revoke Token
                        </DropdownMenuItem>
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
