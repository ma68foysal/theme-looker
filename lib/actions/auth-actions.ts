"use server"

import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { z } from "zod"

// In a real app, you would use a database and proper authentication
// This is a simplified mock implementation

interface RegisterUserParams {
  name: string
  email: string
  licenseKey: string
  password: string
}

interface LoginUserParams {
  email: string
  password: string
}

export async function registerUser(params: RegisterUserParams) {
  // Validate input
  const schema = z.object({
    name: z.string().min(2),
    email: z.string().email(),
    licenseKey: z.string().regex(/^ECOMPRIA-[A-Z0-9]{4}-[A-Z0-9]{4}-[A-Z0-9]{4}$/, "Invalid license key format"),
    password: z.string().min(8),
  })

  const result = schema.safeParse(params)
  if (!result.success) {
    throw new Error("Invalid input")
  }

  // In a real app, you would:
  // 1. Verify the license key against your database
  // 2. Check if user already exists
  // 3. Hash the password
  // 4. Store user in database

  // For demo purposes, we'll just set cookies
  cookies().set("auth-token", "demo-token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24 * 7, // 1 week
    path: "/",
  })

  cookies().set("user-role", "customer", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24 * 7, // 1 week
    path: "/",
  })

  cookies().set("license-key", params.licenseKey, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24 * 365, // 1 year
    path: "/",
  })

  // Set onboarding step to 1
  cookies().set("onboarding-step", "1", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24 * 30, // 30 days
    path: "/",
  })

  return { success: true }
}

export async function loginUser(params: LoginUserParams) {
  // Validate input
  const schema = z.object({
    email: z.string().email(),
    password: z.string().min(1),
  })

  const result = schema.safeParse(params)
  if (!result.success) {
    throw new Error("Invalid input")
  }

  // For demo purposes, we'll set a cookie and simulate different roles
  // In a real app, you would verify credentials against a database

  // Admin credentials check (for demo)
  const isAdmin = params.email.includes("admin")

  cookies().set("auth-token", "demo-token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24 * 7, // 1 week
    path: "/",
  })

  // Store the role in another cookie for demo purposes
  cookies().set("user-role", isAdmin ? "admin" : "customer", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24 * 7, // 1 week
    path: "/",
  })

  return {
    success: true,
    role: isAdmin ? "admin" : "customer",
  }
}

export async function logoutUser() {
  cookies().delete("auth-token")
  cookies().delete("user-role")
  return { success: true }
}

export async function getCurrentUser() {
  // In a real app, you would verify the session/token and return the user
  // For demo purposes, we'll just check if the cookie exists
  const token = cookies().get("auth-token")
  const role = cookies().get("user-role")

  if (!token) {
    return null
  }

  // Mock user data - in a real app, you would decode the JWT or fetch from DB
  return {
    id: "1",
    name: "John Doe",
    email: "john@example.com",
    role: role?.value || "customer",
  }
}

export async function requireAuth() {
  const user = await getCurrentUser()

  if (!user) {
    redirect("/login")
  }

  return user
}

export async function requireAdmin() {
  const user = await getCurrentUser()

  if (!user || user.role !== "admin") {
    redirect("/login")
  }

  return user
}
