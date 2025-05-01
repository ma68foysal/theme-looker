import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname

  // Check if path starts with /admin
  if (path.startsWith("/admin")) {
    // In a real app, you would check for admin role in the session/token
    // For now, we'll just check if the auth-token cookie exists
    const authToken = request.cookies.get("auth-token")?.value
    const userRole = request.cookies.get("user-role")?.value

    if (!authToken) {
      return NextResponse.redirect(new URL("/login", request.url))
    }

    // Check if user is admin
    if (userRole !== "admin") {
      return NextResponse.redirect(new URL("/dashboard", request.url))
    }
  }

  // Protect dashboard routes for regular users
  if (path.startsWith("/dashboard")) {
    const authToken = request.cookies.get("auth-token")?.value

    if (!authToken) {
      return NextResponse.redirect(new URL("/login", request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/admin/:path*", "/dashboard/:path*"],
}
