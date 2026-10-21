// Production server for Railway: serves the built site from dist/ and turns the
// contact form and checkout into emails to Brad (sent through Resend, since
// Railway blocks regular SMTP email on its smaller plans).
//
// Environment variables (set these in Railway > Variables):
//   RESEND_API_KEY   - from resend.com > API Keys (required to send email)
//   CONTACT_TO_EMAIL - where submissions go (defaults to the site's email)
//   EMAIL_FROM       - sender; must be a domain verified in Resend, or the
//                      Resend test sender below
//   EMAIL_DRY_RUN    - "true" prints emails to the console instead of sending
//                      (local testing only)

import path from 'node:path'
import { fileURLToPath } from 'node:url'
import express from 'express'
import multer from 'multer'
import { Resend } from 'resend'
import { getCatalogProduct, productLabel, shippingFor } from './src/data/productCatalog.js'
import { isValidEmail, isValidName, isValidPhone } from './src/lib/validation.js'

const PORT = process.env.PORT || 3001
const TO_EMAIL = process.env.CONTACT_TO_EMAIL || 'bradbessetti@gmail.com'
const FROM_EMAIL = process.env.EMAIL_FROM || "Brad's Bees Website <onboarding@resend.dev>"
const DRY_RUN = process.env.EMAIL_DRY_RUN === 'true'
const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null

// Resend allows 40MB per email after encoding, so cap photos well under that
const MAX_PHOTOS = 5
const MAX_PHOTO_BYTES = 5 * 1024 * 1024

const distDir = path.join(path.dirname(fileURLToPath(import.meta.url)), 'dist')
const app = express()
app.set('trust proxy', 1)

// Some phones send photos (like iPhone HEIC) without an image type, so also check the extension
const IMAGE_EXTENSIONS = /\.(jpe?g|png|gif|webp|heic|heif|bmp|tiff?)$/i
const isImage = (file) => file.mimetype.startsWith('image/') || IMAGE_EXTENSIONS.test(file.originalname)

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { files: MAX_PHOTOS, fileSize: MAX_PHOTO_BYTES, fields: 20, fieldSize: 20_000 },
  fileFilter: (req, file, done) => done(null, isImage(file)),
})

/* ---------- Helpers ---------- */

// Each visitor gets a handful of submissions per window, to stop bots spamming Brad's inbox
const RATE_WINDOW_MS = 10 * 60 * 1000
const RATE_MAX = 5
const recentSubmissions = new Map()

function rateLimit(req, res, next) {
  const now = Date.now()
  const hits = (recentSubmissions.get(req.ip) ?? []).filter((time) => now - time < RATE_WINDOW_MS)
  if (hits.length >= RATE_MAX) {
    return res.status(429).json({ error: 'Too many submissions. Please call us instead.' })
  }
  hits.push(now)
  recentSubmissions.set(req.ip, hits)
  next()
}

const text = (value, max = 2000) => (typeof value === 'string' ? value.trim().slice(0, max) : '')

function escapeHtml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
}

const money = (value) => `$${value.toFixed(2)}`

function detailRows(rows) {
  return rows
    .filter(([, value]) => value)
    .map(
      ([label, value]) =>
        `<tr><td style="padding:4px 12px 4px 0;color:#666;vertical-align:top"><b>${label}</b></td>` +
        `<td style="padding:4px 0">${escapeHtml(value).replaceAll('\n', '<br>')}</td></tr>`,
    )
    .join('')
}

function emailLayout(title, body) {
  return `<div style="font-family:Segoe UI,Arial,sans-serif;max-width:600px;color:#101b34">
  <h2 style="margin:0 0 4px;color:#d98500">${escapeHtml(title)}</h2>
  <p style="margin:0 0 16px;color:#666">Sent from the Brad's Bees website. Hit Reply to answer the customer.</p>
  ${body}
</div>`
}

async function sendEmail(message) {
  if (DRY_RUN) {
    console.log('[email dry run]', {
      ...message,
      attachments: message.attachments?.map((file) => `${file.filename} (${file.content.length} bytes)`),
    })
    return
  }
  if (!resend) throw new Error('RESEND_API_KEY is not set')
  const { error } = await resend.emails.send({ from: FROM_EMAIL, to: TO_EMAIL, ...message })
  if (error) throw new Error(error.message)
}

/* ---------- Contact form ---------- */

app.post('/api/contact', rateLimit, upload.array('photos', MAX_PHOTOS), async (req, res) => {
  const body = req.body ?? {}
  // Hidden "website" field: people never see it, bots fill it in
  if (text(body.website)) return res.json({ ok: true })

  const contact = {
    name: text(body.name, 100),
    email: text(body.email, 200),
    phone: text(body.phone, 20),
    service: text(body.service, 100),
    message: text(body.message, 5000),
  }
  if (
    !isValidName(contact.name) ||
    !isValidEmail(contact.email) ||
    !isValidPhone(contact.phone) ||
    !contact.message
  ) {
    return res.status(400).json({ error: 'Please check the form and try again.' })
  }

  const photos = req.files ?? []
  const table = detailRows([
    ['Name', contact.name],
    ['Phone', contact.phone],
    ['Email', contact.email],
    ['Service', contact.service],
    ['Message', contact.message],
    ['Photos', photos.length ? `${photos.length} attached` : ''],
  ])

  try {
    await sendEmail({
      replyTo: contact.email,
      subject: `New ${contact.service || 'website'} request from ${contact.name}`,
      html: emailLayout('New Message', `<table>${table}</table>`),
      attachments: photos.map((file) => ({ filename: file.originalname, content: file.buffer })),
    })
    res.json({ ok: true })
  } catch (error) {
    console.error('Contact email failed:', error.message)
    res.status(500).json({ error: 'Could not send. Please call us directly.' })
  }
})

/* ---------- Orders ---------- */

app.post('/api/order', rateLimit, express.json({ limit: '50kb' }), async (req, res) => {
  const { customer = {}, items = [] } = req.body ?? {}

  const buyer = {
    name: text(customer.name, 100),
    email: text(customer.email, 200),
    phone: text(customer.phone, 20),
    address: text(customer.address, 200),
    city: text(customer.city, 100),
    state: text(customer.state, 50),
    zip: text(customer.zip, 20),
    notes: text(customer.notes, 2000),
  }

  // Prices always come from the catalog, never from the browser
  const lines = (Array.isArray(items) ? items : [])
    .slice(0, 50)
    .map(({ id, qty } = {}) => ({ product: getCatalogProduct(id), qty: Number(qty) }))
    .filter(({ product, qty }) => product && Number.isInteger(qty) && qty > 0 && qty <= 100)

  if (
    lines.length === 0 ||
    !isValidName(buyer.name) ||
    !isValidEmail(buyer.email) ||
    !isValidPhone(buyer.phone) ||
    !buyer.address ||
    !buyer.city ||
    !buyer.state ||
    !buyer.zip
  ) {
    return res.status(400).json({ error: 'Please check the order and try again.' })
  }

  const subtotal = lines.reduce((sum, { product, qty }) => sum + product.price * qty, 0)
  const shipping = shippingFor(subtotal)
  const total = subtotal + shipping

  const itemRows = lines
    .map(
      ({ product, qty }) =>
        `<tr><td style="padding:6px 0">${escapeHtml(productLabel(product))}</td>` +
        `<td style="padding:6px 12px;text-align:center">${qty}</td>` +
        `<td style="padding:6px 0;text-align:right">${money(product.price * qty)}</td></tr>`,
    )
    .join('')
  const totals = [
    ['Subtotal', money(subtotal)],
    ['Shipping', shipping ? money(shipping) : 'Free'],
    ['Total', money(total)],
  ]
    .map(
      ([label, value]) =>
        `<tr><td colspan="2" style="padding:4px 12px 4px 0;text-align:right">${label}</td>` +
        `<td style="padding:4px 0;text-align:right"><b>${value}</b></td></tr>`,
    )
    .join('')

  const customerTable = detailRows([
    ['Name', buyer.name],
    ['Phone', buyer.phone],
    ['Email', buyer.email],
    ['Address', `${buyer.address}\n${buyer.city}, ${buyer.state} ${buyer.zip}`],
    ['Notes', buyer.notes],
  ])

  try {
    await sendEmail({
      replyTo: buyer.email,
      subject: `New order from ${buyer.name} - ${money(total)}`,
      html: emailLayout(
        'New Order',
        `<table style="width:100%;border-collapse:collapse;margin-bottom:16px">
          <tr style="border-bottom:1px solid #ddd"><th style="text-align:left">Item</th><th>Qty</th><th style="text-align:right">Price</th></tr>
          ${itemRows}${totals}
        </table>
        <h3 style="margin:16px 0 8px">Customer</h3>
        <table>${customerTable}</table>
        <p style="color:#666">Payment hasn't been taken. Contact the customer to arrange payment and pickup or delivery.</p>`,
      ),
    })
    res.json({ ok: true })
  } catch (error) {
    console.error('Order email failed:', error.message)
    res.status(500).json({ error: 'Could not place the order. Please call us directly.' })
  }
})

// Too many or too large photos
app.use('/api', (error, req, res, next) => {
  if (error instanceof multer.MulterError) {
    return res.status(413).json({
      error: `Please attach up to ${MAX_PHOTOS} photos, each under ${MAX_PHOTO_BYTES / 1024 / 1024}MB.`,
    })
  }
  next(error)
})

/* ---------- Website ---------- */

app.use(express.static(distDir, { index: false, maxAge: '1h' }))

// Any other page loads the React app, which handles the route itself
app.get('/{*page}', (req, res) => {
  res.sendFile(path.join(distDir, 'index.html'))
})

app.listen(PORT, () => {
  console.log(`Brad's Bees server running on port ${PORT}${DRY_RUN ? ' (email dry run)' : ''}`)
  if (!resend && !DRY_RUN) console.warn('RESEND_API_KEY is not set: form emails will fail.')
})
