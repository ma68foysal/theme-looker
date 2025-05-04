// A utility to generate license keys
// In a real app, you would use a more secure method

export function generateLicenseKeyString(): string {
  const prefix = "ECOMPRIA"
  const segments = [generateRandomString(4), generateRandomString(4), generateRandomString(4)]

  return `${prefix}-${segments.join("-")}`
}

export function generateLicenseKey(): string {
  return generateLicenseKeyString()
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
