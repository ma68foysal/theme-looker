"use server"

import { cookies } from "next/headers"
import { requireAuth } from "./auth-actions"
import { verifyLicenseInDatabase } from "./license-verification"

interface OnboardingStatus {
  currentStep: number
  completed: boolean
}

export async function getUserOnboardingStatus(): Promise<OnboardingStatus> {
  // Ensure user is authenticated
  await requireAuth()

  // In a real app, you would fetch this from a database
  // For demo purposes, we'll use a cookie
  const stepCookie = cookies().get("onboarding-step")
  const currentStep = stepCookie ? Number.parseInt(stepCookie.value) : 1

  return {
    currentStep,
    completed: currentStep > 4,
  }
}

export async function updateOnboardingStep(step: number) {
  // Ensure user is authenticated
  await requireAuth()

  // Validate step
  if (step < 1 || step > 4) {
    throw new Error("Invalid step")
  }

  // In a real app, you would update this in a database
  // For demo purposes, we'll use a cookie
  cookies().set("onboarding-step", step.toString(), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24 * 30, // 30 days
    path: "/",
  })

  return { success: true }
}

export async function verifyLicenseKey(licenseKey: string) {
  // Ensure user is authenticated
  await requireAuth()

  // Check license key in the database
  const result = await verifyLicenseInDatabase(licenseKey)

  if (!result.valid) {
    return {
      success: false,
      message: result.message || "Invalid license key",
    }
  }

  // Store the license key
  cookies().set("license-key", licenseKey, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24 * 365, // 1 year
    path: "/",
  })

  return {
    success: true,
    themeName: result.themeName,
    licenseType: result.licenseType,
  }
}

interface WhitelistUrlsParams {
  mainUrl: string
  secondaryUrl?: string
  shopifyUrl?: string
}

export async function whitelistUrls(params: WhitelistUrlsParams) {
  // Ensure user is authenticated
  await requireAuth()

  // Validate URLs
  const urlRegex = /^https:\/\/[a-zA-Z0-9][a-zA-Z0-9-]{1,61}[a-zA-Z0-9](?:\.[a-zA-Z]{2,})+(?:\/[^\s]*)?$/
  const shopifyUrlRegex = /^https:\/\/[a-zA-Z0-9][a-zA-Z0-9-]{1,61}[a-zA-Z0-9]\.myshopify\.com(?:\/[^\s]*)?$/

  if (!urlRegex.test(params.mainUrl)) {
    return {
      success: false,
      message: "Invalid main URL",
    }
  }

  if (params.secondaryUrl && !urlRegex.test(params.secondaryUrl)) {
    return {
      success: false,
      message: "Invalid secondary URL",
    }
  }

  if (params.shopifyUrl && !shopifyUrlRegex.test(params.shopifyUrl)) {
    return {
      success: false,
      message: "Invalid Shopify URL",
    }
  }

  // In a real app, you would store these in a database
  // For demo purposes, we'll use cookies
  cookies().set(
    "whitelisted-urls",
    JSON.stringify({
      mainUrl: params.mainUrl,
      secondaryUrl: params.secondaryUrl || "",
      shopifyUrl: params.shopifyUrl || "",
    }),
    {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 365, // 1 year
      path: "/",
    },
  )

  return { success: true }
}
