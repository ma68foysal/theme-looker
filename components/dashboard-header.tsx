import Link from "next/link"
import { ShieldCheck } from "lucide-react"
import { UserNav } from "@/components/user-nav"
import { MobileNav } from "@/components/mobile-nav"

interface DashboardHeaderProps {
  isAdmin?: boolean
}

export function DashboardHeader({ isAdmin = false }: DashboardHeaderProps) {
  return (
    <header className="sticky top-0 z-50 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
      <Link href="/" className="hidden items-center gap-2 md:flex">
        <ShieldCheck className="h-6 w-6" />
        <span className="text-lg font-semibold">ThemeLock {isAdmin && "Admin"}</span>
      </Link>
      <MobileNav isAdmin={isAdmin} />
      <div className="ml-auto flex items-center gap-4">
        <UserNav isAdmin={isAdmin} />
      </div>
    </header>
  )
}
