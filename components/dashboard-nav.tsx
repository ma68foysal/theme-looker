"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { LayoutDashboard, Key, KeyRound, Settings, HelpCircle } from "lucide-react"

export function DashboardNav() {
  const pathname = usePathname()

  const navItems = [
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
      title: "Settings",
      href: "/dashboard/settings",
      icon: Settings,
    },
    {
      title: "Documentation",
      href: "/docs",
      icon: HelpCircle,
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
      </div>
    </nav>
  )
}
