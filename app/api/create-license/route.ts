import { NextResponse } from "next/server"
import { z } from "zod"
import { generateLicenseKeyString } from "@/lib/license-generator"

// Secret API key for security
const API_SECRET = process.env.LICENSE_API_SECRET || "your-secret-key-here"

const requestSchema = z.object({
  customerName: z.string().min(2),
  customerEmail: z.string().email(),
  themeName: z.string().min(2),
  licenseType: z.enum(["standard", "extended", "unlimited"]),
  orderNumber: z.string().optional(),
  secretKey: z.string(),
})

export async function POST(request: Request) {
  try {
    const body = await request.json()

    // Validate request body
    const result = requestSchema.safeParse(body)
    if (!result.success) {
      return NextResponse.json({ error: "Invalid request data" }, { status: 400 })
    }

    const { customerName, customerEmail, themeName, licenseType, orderNumber, secretKey } = result.data

    // Validate secret key
    if (secretKey !== API_SECRET) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Generate a license key
    const licenseKey = generateLicenseKeyString()

    // In a real app, you would:
    // 1. Store the license key in the database
    // 2. Associate it with the customer
    // 3. Store purchase metadata (order number, etc.)

    // For now, let's assume we've saved it

    // Return the generated license key
    return NextResponse.json({
      success: true,
      licenseKey,
      customerName,
      customerEmail,
      themeName,
      licenseType,
      orderNumber,
      createdAt: new Date(),
      expiresAt: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000), // 1 year from now
    })
  } catch (error) {
    console.error("Error creating license:", error)
    return NextResponse.json({ error: "Failed to create license" }, { status: 500 })
  }
}
