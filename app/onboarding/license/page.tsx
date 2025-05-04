import { redirect } from "next/navigation"
import { OnboardingLicense } from "@/components/onboarding/onboarding-license"
import { getUserOnboardingStatus } from "@/lib/actions/user-actions"

export default async function OnboardingLicensePage() {
  // Check if user has completed this step
  const status = await getUserOnboardingStatus()

  // If user hasn't completed the previous step, redirect to the first step
  if (status.currentStep < 2) {
    redirect("/onboarding")
  }

  // If user has already completed this step, redirect to the next step
  if (status.currentStep > 2) {
    redirect("/onboarding/urls")
  }

  return <OnboardingLicense />
}
