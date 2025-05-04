import { redirect } from "next/navigation"
import { OnboardingWelcome } from "@/components/onboarding/onboarding-welcome"
import { getUserOnboardingStatus } from "@/lib/actions/user-actions"

export default async function OnboardingPage() {
  // Check if user has completed onboarding
  const status = await getUserOnboardingStatus()

  // If user has already started onboarding, redirect to the appropriate step
  if (status.currentStep > 1) {
    const routes = ["", "license", "urls", "complete"]
    redirect(`/onboarding/${routes[status.currentStep - 1] || "complete"}`)
  }

  return <OnboardingWelcome />
}
