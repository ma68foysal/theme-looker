export function getLicenseEmailTemplate(params: {
  customerName: string
  orderNumber: string
  licenses: Array<{
    themeName: string
    licenseKey: string
    licenseType: string
  }>
  siteUrl: string
}) {
  const { customerName, orderNumber, licenses, siteUrl } = params

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Your Theme License Keys</title>
      <style>
        body {
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          line-height: 1.6;
          color: #333;
          margin: 0;
          padding: 0;
        }
        .container {
          max-width: 600px;
          margin: 0 auto;
          padding: 20px;
        }
        .header {
          background-color: #f8f9fa;
          padding: 20px;
          text-align: center;
          border-radius: 5px 5px 0 0;
        }
        .content {
          background-color: #ffffff;
          padding: 20px;
          border-radius: 0 0 5px 5px;
          border: 1px solid #eaeaea;
        }
        .logo {
          max-width: 150px;
          margin-bottom: 20px;
        }
        .license-key {
          background-color: #f1f5f9;
          padding: 10px;
          border-radius: 5px;
          font-family: monospace;
          font-size: 16px;
          margin: 10px 0;
          border: 1px solid #e2e8f0;
        }
        .button {
          display: inline-block;
          background-color: #4f46e5;
          color: white;
          text-decoration: none;
          padding: 10px 20px;
          border-radius: 5px;
          margin-top: 20px;
        }
        .footer {
          margin-top: 20px;
          text-align: center;
          font-size: 12px;
          color: #6b7280;
        }
        table {
          width: 100%;
          border-collapse: collapse;
          margin: 20px 0;
        }
        th, td {
          padding: 10px;
          text-align: left;
          border-bottom: 1px solid #eaeaea;
        }
        th {
          background-color: #f8f9fa;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <img src="${siteUrl}/images/logo.png" alt="ThemeLock Logo" class="logo">
          <h1>Your Theme License Keys</h1>
        </div>
        <div class="content">
          <p>Hello ${customerName},</p>
          <p>Thank you for your purchase! Below are your license keys for the themes you ordered (Order #${orderNumber}):</p>
          
          <table>
            <tr>
              <th>Theme</th>
              <th>License Type</th>
              <th>License Key</th>
            </tr>
            ${licenses
              .map(
                (license) => `
              <tr>
                <td>${license.themeName}</td>
                <td>${license.licenseType.charAt(0).toUpperCase() + license.licenseType.slice(1)}</td>
                <td class="license-key">${license.licenseKey}</td>
              </tr>
            `,
              )
              .join("")}
          </table>
          
          <p>To activate your theme, please register at our licensing portal using your license key:</p>
          
          <div style="text-align: center;">
            <a href="${siteUrl}/register" class="button">Register Now</a>
          </div>
          
          <p>After registration, you'll be guided through our simple onboarding process to set up your theme.</p>
          
          <p>If you have any questions, please don't hesitate to contact our support team.</p>
          
          <p>Best regards,<br>The Ecomprenia Team</p>
        </div>
        <div class="footer">
          <p>&copy; ${new Date().getFullYear()} Ecomprenia. All rights reserved.</p>
          <p>This email was sent to you because you purchased a theme from our store.</p>
        </div>
      </div>
    </body>
    </html>
  `
}

export function getAdminNotificationTemplate(params: {
  customerName: string
  customerEmail: string
  orderNumber: string
  licenses: Array<{
    themeName: string
    licenseKey: string
    licenseType: string
  }>
  adminDashboardUrl: string
}) {
  const { customerName, customerEmail, orderNumber, licenses, adminDashboardUrl } = params

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>New License Keys Generated</title>
      <style>
        body {
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          line-height: 1.6;
          color: #333;
          margin: 0;
          padding: 0;
        }
        .container {
          max-width: 600px;
          margin: 0 auto;
          padding: 20px;
        }
        .header {
          background-color: #f0fdf4;
          padding: 20px;
          text-align: center;
          border-radius: 5px 5px 0 0;
        }
        .content {
          background-color: #ffffff;
          padding: 20px;
          border-radius: 0 0 5px 5px;
          border: 1px solid #eaeaea;
        }
        .button {
          display: inline-block;
          background-color: #10b981;
          color: white;
          text-decoration: none;
          padding: 10px 20px;
          border-radius: 5px;
          margin-top: 20px;
        }
        table {
          width: 100%;
          border-collapse: collapse;
          margin: 20px 0;
        }
        th, td {
          padding: 10px;
          text-align: left;
          border-bottom: 1px solid #eaeaea;
        }
        th {
          background-color: #f8f9fa;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>New License Keys Generated</h1>
        </div>
        <div class="content">
          <p><strong>Customer:</strong> ${customerName} (${customerEmail})</p>
          <p><strong>Order Number:</strong> ${orderNumber}</p>
          
          <table>
            <tr>
              <th>Theme</th>
              <th>License Type</th>
              <th>License Key</th>
            </tr>
            ${licenses
              .map(
                (license) => `
              <tr>
                <td>${license.themeName}</td>
                <td>${license.licenseType.charAt(0).toUpperCase() + license.licenseType.slice(1)}</td>
                <td>${license.licenseKey}</td>
              </tr>
            `,
              )
              .join("")}
          </table>
          
          <div style="text-align: center;">
            <a href="${adminDashboardUrl}/admin/licenses" class="button">View in Dashboard</a>
          </div>
        </div>
      </div>
    </body>
    </html>
  `
}
