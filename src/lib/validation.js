export const NAME_REGEX = /^[A-Za-z\s]+$/
export const PHONE_REGEX = /^\d{3}-\d{3}-\d{4}$/
export const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export function isValidName(value) {
  return NAME_REGEX.test(value.trim())
}

export function isValidPhone(value) {
  return PHONE_REGEX.test(value.trim())
}

// Keeps only digits and adds dashes as the user types: "9856120241" -> "985-612-0241".
// Dashes only appear once the next digit is typed, so backspacing works naturally.
export function formatPhone(value) {
  const digits = value.replace(/\D/g, '').slice(0, 10)
  if (digits.length <= 3) return digits
  if (digits.length <= 6) return `${digits.slice(0, 3)}-${digits.slice(3)}`
  return `${digits.slice(0, 3)}-${digits.slice(3, 6)}-${digits.slice(6)}`
}

export function isValidEmail(value) {
  return EMAIL_REGEX.test(value.trim())
}
