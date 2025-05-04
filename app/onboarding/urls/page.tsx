import { redirect } from "next/navigation"
import { OnboardingUrls } from "@/components/onboarding/onboarding-urls"
import { getUserOnboardingStatus } from "@/lib/actions/user-actions"

export default async function OnboardingUrlsPage() {
  // Check if user has completed this step
  const status = await getUserOnboardingStatus()

  // If user hasn't completed the previous step, redirect to the license step
  if (status.currentStep < 3) {
    redirect("/onboarding/license")
  }

  // If user has already completed this step, redirect to the completion step
  if (status.currentStep > 3) {
    redirect("/onboarding/complete")
  }

  return <OnboardingUrls />
}
