// A simple utility to generate authentication tokens
// In a real app, you would use a more secure method like JWT

export function generateAuthToken(): string {
  const prefix = "tk"
  const randomString = generateRandomString(20)

  return `${prefix}_${randomString}`
}

function generateRandomString(length: number): string {
  const characters = "abcdefghijklmnopqrstuvwxyz0123456789"
  let result = ""

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length)
    result += characters.charAt(randomIndex)
  }

  return result
}
