import nodemailer from "nodemailer"
import { getLicenseEmailTemplate, getAdminNotificationTemplate } from "./email-templates"
import { logger } from "./logger"

// In a production app, you would use a proper email service like SendGrid, Mailgun, etc.
// For development, we'll use a test account from Ethereal
let testAccount: any = null
let transporter: nodemailer.Transporter

async function getTransporter() {
  if (transporter) {
    return transporter
  }

  if (process.env.EMAIL_SMTP_HOST) {
    // Use configured SMTP server
    transporter = nodemailer.createTransport({
      host: process.env.EMAIL_SMTP_HOST,
      port: Number.parseInt(process.env.EMAIL_SMTP_PORT || "587"),
      secure: process.env.EMAIL_SMTP_SECURE === "true",
      auth: {
        user: process.env.EMAIL_SMTP_USER,
        pass: process.env.EMAIL_SMTP_PASSWORD,
      },
    })
  } else {
    // Use Ethereal for testing
    if (!testAccount) {
      testAccount = await nodemailer.createTestAccount()
    }

    transporter = nodemailer.createTransport({
      host: "smtp.ethereal.email",
      port: 587,
      secure: false,
      auth: {
        user: testAccount.user,
        pass: testAccount.pass,
      },
    })
  }

  return transporter
}

export async function sendLicenseEmail(
  email: string,
  customerName: string,
  orderNumber: string,
  licenses: Array<{
    themeName: string
    licenseKey: string
    licenseType: string
  }>,
) {
  try {
    const transport = await getTransporter()

    const siteUrl = process.env.SITE_URL || "https://themelock.yourdomain.com"

    const html = getLicenseEmailTemplate({
      customerName,
      orderNumber,
      licenses,
      siteUrl,
    })

    const info = await transport.sendMail({
      from: `"${process.env.EMAIL_FROM_NAME || "ThemeLock"}" <${process.env.EMAIL_FROM_ADDRESS || "noreply@themelock.yourdomain.com"}>`,
      to: email,
      subject: `Your Theme License Keys - Order #${orderNumber}`,
      html,
    })

    logger.info("License email sent", {
      messageId: info.messageId,
      email,
      orderNumber,
      licenseCount: licenses.length,
    })

    // For Ethereal test accounts, log the URL where the email can be viewed
    if (testAccount) {
      console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info))
    }

    return info
  } catch (error) {
    logger.error("Failed to send license email", {
      error: (error as Error).message,
      email,
      orderNumber,
    })
    throw error
  }
}

export async function sendAdminEmail(email: string, subject: string, html: string) {
  try {
    const transport = await getTransporter()

    const info = await transport.sendMail({
      from: `"${process.env.EMAIL_FROM_NAME || "ThemeLock"}" <${process.env.EMAIL_FROM_ADDRESS || "noreply@themelock.yourdomain.com"}>`,
      to: email,
      subject,
      html,
    })

    logger.info("Admin email sent", {
      messageId: info.messageId,
      email,
      subject,
    })

    // For Ethereal test accounts, log the URL where the email can be viewed
    if (testAccount) {
      console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info))
    }

    return info
  } catch (error) {
    logger.error("Failed to send admin email", {
      error: (error as Error).message,
      email,
      subject,
    })
    throw error
  }
}

export async function notifyAdminOfNewLicense(
  licenses: Array<{
    themeName: string
    licenseKey: string
    licenseType: string
  }>,
  customerName: string,
  customerEmail: string,
  orderNumber: string,
) {
  const adminEmails = process.env.ADMIN_EMAILS?.split(",") || ["admin@example.com"]
  const adminDashboardUrl = process.env.ADMIN_DASHBOARD_URL || "https://themelock.yourdomain.com"

  const html = getAdminNotificationTemplate({
    customerName,
    customerEmail,
    orderNumber,
    licenses,
    adminDashboardUrl,
  })

  for (const email of adminEmails) {
    await sendAdminEmail(email, `New License Keys Generated - Order #${orderNumber}`, html)
  }
}
