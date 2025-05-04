import { redirect } from "next/navigation"
import { OnboardingComplete } from "@/components/onboarding/onboarding-complete"
import { getUserOnboardingStatus } from "@/lib/actions/user-actions"

export default async function OnboardingCompletePage() {
  // Check if user has completed all steps
  const status = await getUserOnboardingStatus()

  // If user hasn't completed the previous steps, redirect to the appropriate step
  if (status.currentStep < 4) {
    const routes = ["", "license", "urls"]
    redirect(`/onboarding/${routes[status.currentStep - 1] || ""}`)
  }

  return <OnboardingComplete />
}
