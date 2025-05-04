"use server"

import { z } from "zod"
import { requireAdmin } from "./auth-actions"
import { generateLicenseKeyString } from "../license-generator"

interface GenerateLicenseKeyParams {
  customerName: string
  customerEmail: string
  themeName: string
  licenseType: string
}

export async function generateLicenseKey(params: GenerateLicenseKeyParams) {
  // Ensure user is an admin
  await requireAdmin()

  // Validate input
  const schema = z.object({
    customerName: z.string().min(2),
    customerEmail: z.string().email(),
    themeName: z.string().min(2),
    licenseType: z.enum(["standard", "extended", "unlimited"]),
  })

  const result = schema.safeParse(params)
  if (!result.success) {
    throw new Error("Invalid input")
  }

  // Generate a license key with the ECOMPRIA prefix
  const licenseKey = generateLicenseKeyString()

  // In a real app, you would:
  // 1. Store the license key in the database
  // 2. Associate it with the customer
  // 3. Send an email to the customer with the license key

  // For demo purposes, we'll just return the license key
  return {
    success: true,
    licenseKey,
    customerName: params.customerName,
    customerEmail: params.customerEmail,
    themeName: params.themeName,
    licenseType: params.licenseType,
    createdAt: new Date(),
    expiresAt: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000), // 1 year from now
  }
}
