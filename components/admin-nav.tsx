"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { LayoutDashboard, Users, Key, Settings, ShieldAlert } from "lucide-react"

export function AdminNav() {
  const pathname = usePathname()

  const navItems = [
    {
      title: "Dashboard",
      href: "/admin",
      icon: LayoutDashboard,
    },
    {
      title: "Customers",
      href: "/admin/customers",
      icon: Users,
    },
    {
      title: "Licenses",
      href: "/admin/licenses",
      icon: Key,
    },
    {
      title: "Settings",
      href: "/admin/settings",
      icon: Settings,
    },
  ]

  return (
    <nav className="hidden w-[220px] flex-col md:flex lg:w-[240px]">
      <div className="flex flex-col gap-1 py-2">
        {navItems.map((item) => (
          <Button
            key={item.href}
            variant={pathname === item.href ? "secondary" : "ghost"}
            className={cn("justify-start", pathname === item.href && "bg-muted font-medium")}
            asChild
          >
            <Link href={item.href}>
              <item.icon className="mr-2 h-4 w-4" />
              {item.title}
            </Link>
          </Button>
        ))}
        <div className="mt-4 pt-4 border-t">
          <Button variant="ghost" className="justify-start text-muted-foreground" asChild>
            <Link href="/dashboard">
              <ShieldAlert className="mr-2 h-4 w-4" />
              Switch to Customer View
            </Link>
          </Button>
        </div>
      </div>
    </nav>
  )
}
