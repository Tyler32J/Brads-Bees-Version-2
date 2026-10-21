// Form submissions go to server.js, which emails them to Brad.

// Keep in sync with MAX_PHOTOS and MAX_PHOTO_BYTES in server.js
export const MAX_PHOTOS = 5
export const MAX_PHOTO_MB = 5

async function send(url, options) {
  const response = await fetch(url, { method: 'POST', ...options })
  if (!response.ok) {
    const body = await response.json().catch(() => ({}))
    throw new Error(body.error || 'Request failed')
  }
  return response.json()
}

export function submitContactForm({ images = [], ...fields }) {
  const form = new FormData()
  Object.entries(fields).forEach(([key, value]) => form.append(key, value))
  images.forEach((file) => form.append('photos', file))
  return send('/api/contact', { body: form })
}

export function submitOrder({ customer, items }) {
  return send('/api/order', {
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ customer, items: items.map(({ id, qty }) => ({ id, qty })) }),
  })
}
