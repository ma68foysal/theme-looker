import { NextResponse } from "next/server"
import crypto from "crypto"
import { logger } from "@/lib/logger"
import { logError } from "@/lib/error-handling"
import { sendLicenseEmail, notifyAdminOfNewLicense } from "@/lib/email-service"

// Shopify webhook verification
const SHOPIFY_WEBHOOK_SECRET = process.env.SHOPIFY_WEBHOOK_SECRET || "your-shopify-webhook-secret"
// Your license API secret
const LICENSE_API_SECRET = process.env.LICENSE_API_SECRET || "your-secret-key-here"
// Your ThemeLock API endpoint
const LICENSE_API_ENDPOINT = process.env.LICENSE_API_ENDPOINT || "https://yourdomain.com/api/create-license"

export async function POST(request: Request) {
  try {
    // Verify Shopify webhook
    const hmac = request.headers.get("x-shopify-hmac-sha256")
    const body = await request.text()

    const generatedHash = crypto.createHmac("sha256", SHOPIFY_WEBHOOK_SECRET).update(body).digest("base64")

    if (hmac !== generatedHash) {
      logger.warn("Invalid webhook signature", { hmac, generatedHash })
      return NextResponse.json({ error: "Invalid webhook signature" }, { status: 401 })
    }

    // Parse the JSON body
    const data = JSON.parse(body)

    // Log the webhook receipt
    logger.info("Received Shopify webhook", {
      resource_type: data.resource_type,
      order_id: data.id,
      order_number: data.order_number,
    })

    // Ensure this is an order
    if (data.resource_type !== "order") {
      return NextResponse.json({ message: "Not an order webhook, ignoring" }, { status: 200 })
    }

    // Check if this contains a theme purchase
    // This logic will depend on how you've set up your products in Shopify
    const themeLineItems = data.line_items.filter((item) => {
      // Check if the product is a theme based on tags, product type, or other criteria
      return item.product_type === "Theme" || (item.properties && item.properties.some((p) => p.name === "theme_id"))
    })

    if (themeLineItems.length === 0) {
      logger.info("No theme products in order, ignoring", { order_number: data.order_number })
      return NextResponse.json({ message: "No theme products in order, ignoring" }, { status: 200 })
    }

    // For each theme purchased, generate a license
    const licensePromises = themeLineItems.map(async (item) => {
      // Extract theme details - this will depend on your product structure
      const themeName = item.title
      const licenseType = item.properties?.find((p) => p.name === "license_type")?.value || "standard"

      logger.info("Generating license for theme", {
        theme_name: themeName,
        license_type: licenseType,
        order_number: data.order_number,
      })

      // Create license by calling our own API
      const response = await fetch(LICENSE_API_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          customerName: `${data.customer.first_name} ${data.customer.last_name}`,
          customerEmail: data.customer.email,
          themeName,
          licenseType,
          orderNumber: data.order_number.toString(),
          secretKey: LICENSE_API_SECRET,
        }),
      })

      const licenseData = await response.json()

      if (!licenseData.success) {
        const errorMsg = `Failed to create license for theme: ${themeName}`
        logger.error(errorMsg, {
          theme_name: themeName,
          order_number: data.order_number,
          response: licenseData,
        })
        throw new Error(errorMsg)
      }

      return licenseData
    })

    const licenses = await Promise.all(licensePromises)

    logger.info("Licenses created successfully", {
      order_number: data.order_number,
      license_count: licenses.length,
      license_keys: licenses.map((l) => l.licenseKey),
    })

    // Send email with license keys to the customer
    await sendLicenseEmail(
      data.customer.email,
      `${data.customer.first_name} ${data.customer.last_name}`,
      data.order_number.toString(),
      licenses.map((l) => ({
        themeName: l.themeName,
        licenseKey: l.licenseKey,
        licenseType: l.licenseType,
      })),
    )

    // Notify admins of new licenses
    await notifyAdminOfNewLicense(
      licenses.map((l) => ({
        themeName: l.themeName,
        licenseKey: l.licenseKey,
        licenseType: l.licenseType,
      })),
      `${data.customer.first_name} ${data.customer.last_name}`,
      data.customer.email,
      data.order_number.toString(),
    )

    return NextResponse.json({ success: true, message: "Licenses created and emails sent" })
  } catch (error) {
    const err = error as Error
    await logError(err, {
      critical: true,
      source: "shopify-webhook",
      webhook_type: "order_creation",
    })

    return NextResponse.json({ error: "Failed to process webhook" }, { status: 500 })
  }
}
