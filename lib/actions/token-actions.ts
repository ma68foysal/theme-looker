"use server"

import { z } from "zod"
import { requireAuth } from "./auth-actions"
import { generateAuthToken } from "../token-generator"

interface CreateTokenParams {
  licenseId: string
  expiresIn: string
}

export async function createToken(params: CreateTokenParams) {
  // Ensure user is authenticated
  const user = await requireAuth()

  // Validate input
  const schema = z.object({
    licenseId: z.string().min(1),
    expiresIn: z.enum(["30", "90", "365", "never"]),
  })

  const result = schema.safeParse(params)
  if (!result.success) {
    throw new Error("Invalid input")
  }

  // Calculate expiration date
  let expiresAt: Date | null = null
  if (params.expiresIn !== "never") {
    const days = Number.parseInt(params.expiresIn)
    expiresAt = new Date(Date.now() + days * 24 * 60 * 60 * 1000)
  }

  // Generate a token
  const token = generateAuthToken()

  // In a real app, you would:
  // 1. Store the token in the database
  // 2. Associate it with the license

  // For demo purposes, we'll just return a success response
  return {
    success: true,
    token,
    licenseId: params.licenseId,
    createdAt: new Date(),
    expiresAt,
  }
}

export async function getTokens() {
  // Ensure user is authenticated
  const user = await requireAuth()

  // In a real app, you would fetch tokens from the database
  // For demo purposes, we'll return mock data
  return [
    {
      id: "1",
      token: "tk_1a2b3c4d5e6f7g8h9i0j",
      licenseId: "1",
      themeName: "Premium Theme",
      shopDomain: "mystore.myshopify.com",
      status: "active",
      createdAt: new Date("2023-06-15"),
      expiresAt: new Date("2024-06-15"),
    },
    {
      id: "2",
      token: "tk_2b3c4d5e6f7g8h9i0j1k",
      licenseId: "1",
      themeName: "Premium Theme",
      shopDomain: "mystore.myshopify.com",
      status: "active",
      createdAt: new Date("2023-08-10"),
      expiresAt: new Date("2024-08-10"),
    },
    {
      id: "3",
      token: "tk_3c4d5e6f7g8h9i0j1k2l",
      licenseId: "2",
      themeName: "Deluxe Theme",
      shopDomain: "store2.myshopify.com",
      status: "active",
      createdAt: new Date("2023-09-05"),
      expiresAt: new Date("2024-09-05"),
    },
  ]
}
