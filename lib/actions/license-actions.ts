"use server"

import { z } from "zod"
import { requireAuth } from "./auth-actions"
import { generateLicenseKey } from "../license-generator"

interface CreateLicenseParams {
  themeName: string
  shopDomain: string
  licenseType: string
}

export async function createLicense(params: CreateLicenseParams) {
  // Ensure user is authenticated
  const user = await requireAuth()

  // Validate input
  const schema = z.object({
    themeName: z.string().min(2),
    shopDomain: z.string().min(3),
    licenseType: z.enum(["standard", "extended", "unlimited"]),
  })

  const result = schema.safeParse(params)
  if (!result.success) {
    throw new Error("Invalid input")
  }

  // Generate a license key
  const licenseKey = generateLicenseKey()

  // In a real app, you would:
  // 1. Store the license in the database
  // 2. Associate it with the user

  // For demo purposes, we'll just return a success response
  return {
    success: true,
    licenseKey,
    themeName: params.themeName,
    shopDomain: params.shopDomain,
    licenseType: params.licenseType,
    createdAt: new Date(),
    expiresAt: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000), // 1 year from now
  }
}

export async function getLicenses() {
  // Ensure user is authenticated
  const user = await requireAuth()

  // In a real app, you would fetch licenses from the database
  // For demo purposes, we'll return mock data
  return [
    {
      id: "1",
      themeName: "Premium Theme",
      shopDomain: "mystore.myshopify.com",
      licenseKey: "LIC-PREM-1234-5678-ABCD",
      licenseType: "standard",
      status: "active",
      createdAt: new Date("2023-01-15"),
      expiresAt: new Date("2024-01-15"),
    },
    {
      id: "2",
      themeName: "Deluxe Theme",
      shopDomain: "store2.myshopify.com",
      licenseKey: "LIC-DELX-5678-1234-EFGH",
      licenseType: "extended",
      status: "active",
      createdAt: new Date("2023-03-10"),
      expiresAt: new Date("2024-03-10"),
    },
    {
      id: "3",
      themeName: "Basic Theme",
      shopDomain: "store3.myshopify.com",
      licenseKey: "LIC-BASIC-9876-5432-IJKL",
      licenseType: "standard",
      status: "expired",
      createdAt: new Date("2022-11-05"),
      expiresAt: new Date("2023-11-05"),
    },
  ]
}
