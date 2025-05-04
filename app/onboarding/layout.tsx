import type { ReactNode } from "react"
import { ShieldCheck } from "lucide-react"
import Link from "next/link"
import { requireAuth } from "@/lib/actions/auth-actions"

export default async function OnboardingLayout({ children }: { children: ReactNode }) {
  // Ensure user is authenticated
  await requireAuth()

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      <div className="container mx-auto px-4 py-8">
        <Link href="/" className="flex items-center gap-2">
          <ShieldCheck className="h-6 w-6" />
          <span className="font-semibold">ThemeLock</span>
        </Link>
        <main className="flex justify-center py-12">
          <div className="w-full max-w-md">{children}</div>
        </main>
      </div>
    </div>
  )
}
