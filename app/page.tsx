import Link from "next/link"
import { ArrowRight, CheckCircle, ShieldCheck } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="border-b">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2 font-semibold">
            <ShieldCheck className="h-6 w-6" />
            <span>ThemeLock</span>
          </div>
          <nav className="flex items-center gap-4">
            <Link href="/login" className="text-sm font-medium hover:underline">
              Login
            </Link>
            <Link href="/register">
              <Button>Get Started</Button>
            </Link>
          </nav>
        </div>
      </header>
      <main className="flex-1">
        <section className="container py-24 md:py-32">
          <div className="grid gap-10 md:grid-cols-2 md:gap-16">
            <div className="flex flex-col justify-center space-y-4">
              <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
                Secure Your Shopify Themes
              </h1>
              <p className="max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                Protect your premium Shopify themes with our robust licensing system. Prevent unauthorized use and
                manage your customers with ease.
              </p>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Link href="/register">
                  <Button size="lg" className="gap-1.5">
                    Get Started
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/docs">
                  <Button size="lg" variant="outline">
                    Documentation
                  </Button>
                </Link>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <div className="relative w-full max-w-[500px] rounded-lg border bg-background p-6 shadow-lg">
                <div className="space-y-4">
                  <div className="flex items-center gap-2 font-semibold">
                    <ShieldCheck className="h-5 w-5 text-primary" />
                    <span>License Management</span>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-start gap-2">
                      <CheckCircle className="mt-0.5 h-4 w-4 text-primary" />
                      <div>
                        <p className="font-medium">Secure Token Authentication</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Protect your themes with secure, time-limited tokens
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle className="mt-0.5 h-4 w-4 text-primary" />
                      <div>
                        <p className="font-medium">Domain Binding</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Bind licenses to specific Shopify store domains
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle className="mt-0.5 h-4 w-4 text-primary" />
                      <div>
                        <p className="font-medium">Customer Dashboard</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Let customers manage their licenses and tokens
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle className="mt-0.5 h-4 w-4 text-primary" />
                      <div>
                        <p className="font-medium">Admin Controls</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Comprehensive admin panel for license management
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="border-t bg-muted/40">
          <div className="container py-12 md:py-16">
            <div className="grid gap-8 md:grid-cols-3">
              <div className="space-y-2">
                <h3 className="text-xl font-bold">Easy Integration</h3>
                <p className="text-gray-500 dark:text-gray-400">
                  Simple API endpoints for validating licenses in your themes
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-bold">Secure by Design</h3>
                <p className="text-gray-500 dark:text-gray-400">
                  Built with security best practices to protect your intellectual property
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-bold">Detailed Analytics</h3>
                <p className="text-gray-500 dark:text-gray-400">
                  Track license usage and customer activity with detailed reports
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="border-t py-6 md:py-8">
        <div className="container flex flex-col items-center justify-between gap-4 md:flex-row">
          <div className="flex items-center gap-2 text-sm">
            <ShieldCheck className="h-4 w-4" />
            <span>ThemeLock</span>
          </div>
          <p className="text-center text-sm text-gray-500 dark:text-gray-400 md:text-left">
            © {new Date().getFullYear()} ThemeLock. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}
