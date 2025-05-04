"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { OnboardingProgress } from "@/components/onboarding/onboarding-progress"
import { downloadTheme } from "@/lib/actions/theme-actions"
import { useToast } from "@/hooks/use-toast"
import { Download, ExternalLink } from "lucide-react"

export function OnboardingComplete() {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const { toast } = useToast()

  const handleDownload = async () => {
    setIsLoading(true)
    try {
      const result = await downloadTheme()

      if (result.success) {
        // In a real app, you would trigger a file download here
        // For demo purposes, we'll just show a success message
        toast({
          title: "Theme downloaded",
          description: "Your theme has been downloaded successfully with the authentication token.",
        })

        // Redirect to dashboard after a short delay
        setTimeout(() => {
          router.push("/dashboard")
        }, 2000)
      } else {
        toast({
          title: "Error",
          description: result.message || "Failed to download theme. Please try again.",
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to download theme. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <OnboardingProgress currentStep={4} />

      <Card className="border-none shadow-lg">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Your setup has now been saved!</CardTitle>
          <CardDescription>You're all set to download and install your theme</CardDescription>
        </CardHeader>
        <CardContent className="text-center px-6">
          <div className="bg-muted p-4 rounded-lg mb-6">
            <p className="text-sm font-medium">Your license has been activated for:</p>
            <ul className="text-sm mt-2 space-y-1">
              <li>yourdomain.com</li>
              <li>staging.yourdomain.com</li>
              <li>your-store.myshopify.com</li>
            </ul>
          </div>

          <div className="space-y-4">
            <Button className="w-full" size="lg" onClick={handleDownload} disabled={isLoading}>
              <Download className="mr-2 h-4 w-4" />
              {isLoading ? "Preparing download..." : "Download Theme"}
            </Button>

            <Button variant="outline" className="w-full" asChild>
              <a href="/docs" target="_blank" rel="noopener noreferrer">
                <ExternalLink className="mr-2 h-4 w-4" />
                View Installation Guide
              </a>
            </Button>
          </div>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Button variant="link" onClick={() => router.push("/dashboard")}>
            Skip to dashboard
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
