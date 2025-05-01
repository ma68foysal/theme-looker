"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu, ShieldCheck, LayoutDashboard, Key, KeyRound, Settings, HelpCircle, Users } from "lucide-react"

interface MobileNavProps {
  isAdmin?: boolean
}

export function MobileNav({ isAdmin = false }: MobileNavProps) {
  const [open, setOpen] = React.useState(false)
  const pathname = usePathname()

  const navItems = isAdmin
    ? [
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
    : [
        {
          title: "Dashboard",
          href: "/dashboard",
          icon: LayoutDashboard,
        },
        {
          title: "Licenses",
          href: "/dashboard/licenses",
          icon: Key,
        },
        {
          title: "Tokens",
          href: "/dashboard/tokens",
          icon: KeyRound,
        },
        {
          title: "Documentation",
          href: "/docs",
          icon: HelpCircle,
        },
      ]

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          className="mr-2 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden"
        >
          <Menu className="h-6 w-6" />
          <span className="sr-only">Toggle Menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="pr-0">
        <div className="flex items-center gap-2 px-2">
          <ShieldCheck className="h-6 w-6" />
          <span className="text-lg font-semibold">ThemeLock {isAdmin && "Admin"}</span>
        </div>
        <div className="mt-6 flex flex-col gap-3 px-2">
          {navItems.map((item) => (
            <Button
              key={item.href}
              variant={pathname === item.href ? "secondary" : "ghost"}
              className={cn("justify-start", pathname === item.href && "bg-muted font-medium")}
              asChild
              onClick={() => setOpen(false)}
            >
              <Link href={item.href}>
                <item.icon className="mr-2 h-4 w-4" />
                {item.title}
              </Link>
            </Button>
          ))}
          {isAdmin && (
            <Button
              variant="ghost"
              className="justify-start text-muted-foreground mt-4 border-t pt-4"
              asChild
              onClick={() => setOpen(false)}
            >
              <Link href="/dashboard">
                <ShieldCheck className="mr-2 h-4 w-4" />
                Customer View
              </Link>
            </Button>
          )}
          {!isAdmin && (
            <Button
              variant="ghost"
              className="justify-start text-muted-foreground mt-4 border-t pt-4"
              asChild
              onClick={() => setOpen(false)}
            >
              <Link href="/admin">
                <Settings className="mr-2 h-4 w-4" />
                Admin Dashboard
              </Link>
            </Button>
          )}
        </div>
      </SheetContent>
    </Sheet>
  )
}
