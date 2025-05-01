"use client"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MoreHorizontal } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Link from "next/link"

// Mock data
const customers = [
  {
    id: "1",
    name: "John Smith",
    email: "john@example.com",
    licenseCount: 3,
    status: "active",
    joinedAt: new Date("2023-01-15"),
  },
  {
    id: "2",
    name: "Sarah Johnson",
    email: "sarah@company.com",
    licenseCount: 1,
    status: "active",
    joinedAt: new Date("2023-03-10"),
  },
  {
    id: "3",
    name: "Michael Brown",
    email: "michael@store.com",
    licenseCount: 2,
    status: "inactive",
    joinedAt: new Date("2022-11-05"),
  },
  {
    id: "4",
    name: "Emily Davis",
    email: "emily@shop.com",
    licenseCount: 5,
    status: "active",
    joinedAt: new Date("2023-05-22"),
  },
  {
    id: "5",
    name: "Robert Wilson",
    email: "robert@business.com",
    licenseCount: 0,
    status: "inactive",
    joinedAt: new Date("2023-02-08"),
  },
]

export function AdminCustomerList() {
  return (
    <div className="w-full overflow-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Licenses</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Joined</TableHead>
            <TableHead className="w-[80px]"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {customers.map((customer) => (
            <TableRow key={customer.id}>
              <TableCell className="font-medium">{customer.name}</TableCell>
              <TableCell>{customer.email}</TableCell>
              <TableCell>{customer.licenseCount}</TableCell>
              <TableCell>
                <Badge variant={customer.status === "active" ? "default" : "secondary"}>{customer.status}</Badge>
              </TableCell>
              <TableCell>{customer.joinedAt.toLocaleDateString()}</TableCell>
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
                    <DropdownMenuItem asChild>
                      <Link href={`/admin/customers/${customer.id}`}>View Details</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href={`/admin/customers/${customer.id}/licenses`}>View Licenses</Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>Reset Password</DropdownMenuItem>
                    {customer.status === "active" ? (
                      <DropdownMenuItem className="text-destructive focus:text-destructive">
                        Deactivate Account
                      </DropdownMenuItem>
                    ) : (
                      <DropdownMenuItem>Activate Account</DropdownMenuItem>
                    )}
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
