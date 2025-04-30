// A simple utility to generate license keys
// In a real app, you would use a more secure method

export function generateLicenseKey(): string {
  const prefix = "LIC"
  const segments = [generateRandomString(4), generateRandomString(4), generateRandomString(4), generateRandomString(4)]

  return `${prefix}-${segments.join("-")}`
}

function generateRandomString(length: number): string {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
  let result = ""

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length)
    result += characters.charAt(randomIndex)
  }

  return result
}
