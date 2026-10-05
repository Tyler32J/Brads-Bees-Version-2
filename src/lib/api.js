// Stubbed backend calls. Both currently simulate a network round-trip and
// resolve successfully — swap the bodies for real fetch() calls to a mail
// backend (Resend via Next.js route handlers, Vercel/Vite functions, etc.)
// once that architecture is decided.

function simulateRequest(payload) {
  return new Promise((resolve) => {
    setTimeout(() => resolve({ ok: true, payload }), 600)
  })
}

export function submitContactForm(formData) {
  return simulateRequest(formData)
}

export function submitOrder(order) {
  return simulateRequest(order)
}
