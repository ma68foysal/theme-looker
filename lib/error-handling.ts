import { sendAdminEmail } from "./email-service"

interface ErrorDetails {
  message: string
  context?: Record<string, any>
  stack?: string
}

export async function logError(error: Error, context?: Record<string, any>) {
  const errorDetails: ErrorDetails = {
    message: error.message,
    context,
    stack: error.stack,
  }

  // Log to console in development
  console.error("Error:", errorDetails)

  // In a production app, you would log to a service like Sentry, LogRocket, etc.
  // Example: await sentryClient.captureException(error);

  // Store in database for admin review
  await storeErrorInDatabase(errorDetails)

  // Notify admins of critical errors
  if (context?.critical) {
    await notifyAdminsOfError(errorDetails)
  }
}

async function storeErrorInDatabase(errorDetails: ErrorDetails) {
  // In a real app, you would store this in your database
  // Example:
  // await prisma.errorLog.create({
  //   data: {
  //     message: errorDetails.message,
  //     context: errorDetails.context ? JSON.stringify(errorDetails.context) : null,
  //     stack: errorDetails.stack,
  //     timestamp: new Date(),
  //   },
  // });

  // For now, we'll just log it
  console.log("Storing error in database:", errorDetails)
}

async function notifyAdminsOfError(errorDetails: ErrorDetails) {
  const adminEmails = process.env.ADMIN_EMAILS?.split(",") || ["admin@example.com"]

  const emailSubject = `[CRITICAL] ThemeLock Error: ${errorDetails.message.substring(0, 50)}`
  const emailBody = `
    <h1>Critical Error in ThemeLock</h1>
    <p><strong>Message:</strong> ${errorDetails.message}</p>
    <p><strong>Context:</strong> ${JSON.stringify(errorDetails.context || {})}</p>
    <p><strong>Stack Trace:</strong></p>
    <pre>${errorDetails.stack || "No stack trace available"}</pre>
    <p><a href="${process.env.ADMIN_DASHBOARD_URL || "https://yourdomain.com"}/admin/logs">View Error Logs</a></p>
  `

  for (const email of adminEmails) {
    await sendAdminEmail(email, emailSubject, emailBody)
  }
}
