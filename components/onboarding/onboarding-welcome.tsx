"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { OnboardingProgress } from "@/components/onboarding/onboarding-progress"
import { updateOnboardingStep } from "@/lib/actions/user-actions"

export function OnboardingWelcome() {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleContinue = async () => {
    setIsLoading(true)
    try {
      await updateOnboardingStep(2) // Move to step 2
      router.push("/onboarding/license")
    } catch (error) {
      console.error("Failed to update onboarding step:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <OnboardingProgress currentStep={1} />

      <Card className="border-none shadow-lg">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Welcome!</CardTitle>
          <CardDescription>Thank you for purchasing our Shopify theme. Let's set up your license.</CardDescription>
        </CardHeader>
        <CardContent className="text-center px-6">
          <p className="text-muted-foreground mb-4">
            We'll guide you through a few quick steps to get your theme up and running:
          </p>
          <ul className="text-left space-y-2 mb-6">
            <li className="flex items-start gap-2">
              <span className="bg-primary text-primary-foreground rounded-full h-5 w-5 flex items-center justify-center text-xs mt-0.5">
                1
              </span>
              <span>Verify your license key (sent to your email)</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="bg-primary text-primary-foreground rounded-full h-5 w-5 flex items-center justify-center text-xs mt-0.5">
                2
              </span>
              <span>Whitelist your website URLs</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="bg-primary text-primary-foreground rounded-full h-5 w-5 flex items-center justify-center text-xs mt-0.5">
                3
              </span>
              <span>Download your theme with authentication token</span>
            </li>
          </ul>
        </CardContent>
        <CardFooter>
          <Button className="w-full" size="lg" onClick={handleContinue} disabled={isLoading}>
            {isLoading ? "Loading..." : "Get Started"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
