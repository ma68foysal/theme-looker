"use server"

import { cookies } from "next/headers"
import { requireAuth } from "./auth-actions"
import { generateAuthToken } from "../token-generator"

export async function downloadTheme() {
  // Ensure user is authenticated
  await requireAuth()

  // Check if user has completed onboarding
  const stepCookie = cookies().get("onboarding-step")
  const currentStep = stepCookie ? Number.parseInt(stepCookie.value) : 1

  if (currentStep < 4) {
    return {
      success: false,
      message: "Please complete the onboarding process first",
    }
  }

  // Generate a token for the theme
  const token = generateAuthToken()

  // In a real app, you would store this token in a database
  // For demo purposes, we'll use a cookie
  cookies().set("theme-token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24 * 365, // 1 year
    path: "/",
  })

  // In a real app, you would return a download URL or stream the file
  // For demo purposes, we'll just return success
  return {
    success: true,
    token,
  }
}
