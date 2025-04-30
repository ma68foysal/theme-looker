import { type NextRequest, NextResponse } from "next/server"
import { validateToken } from "@/lib/token-validator"

export async function POST(request: NextRequest) {
  try {
    const { token, shopDomain } = await request.json()

    if (!token || !shopDomain) {
      return NextResponse.json({ error: "Token and shopDomain are required" }, { status: 400 })
    }

    const validationResult = await validateToken(token, shopDomain)

    if (!validationResult.valid) {
      return NextResponse.json({ valid: false, message: validationResult.message }, { status: 401 })
    }

    return NextResponse.json({
      valid: true,
      license: validationResult.license,
      expiresAt: validationResult.expiresAt,
    })
  } catch (error) {
    console.error("Token validation error:", error)
    return NextResponse.json({ error: "Failed to validate token" }, { status: 500 })
  }
}
