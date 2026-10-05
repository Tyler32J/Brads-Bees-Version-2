import { useState } from 'react'
import { useCart } from '../../hooks/useCart'
import { useMessage } from '../../hooks/useMessage'
import { submitOrder } from '../../lib/api'
import { formatPhone, isValidName, isValidPhone, isValidEmail } from '../../lib/validation'

const INITIAL_STATE = {
  name: '',
  email: '',
  phone: '',
  address: '',
  city: '',
  state: '',
  zip: '',
  notes: '',
}

const REQUIRED_FIELDS = ['address', 'city', 'state', 'zip']

export default function CheckoutForm({ onSuccess }) {
  const { items, subtotal, shipping, total, clear } = useCart()
  const { showMessage } = useMessage()
  const [form, setForm] = useState(INITIAL_STATE)
  const [errors, setErrors] = useState({})
  const [submitting, setSubmitting] = useState(false)

  function update(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  function validate() {
    const next = {}
    if (!isValidName(form.name)) next.name = 'Enter a name using letters and spaces only.'
    if (!isValidEmail(form.email)) next.email = 'Enter a valid email address.'
    if (!isValidPhone(form.phone)) next.phone = 'Enter a 10-digit phone number.'
    REQUIRED_FIELDS.forEach((field) => {
      if (!form[field].trim()) next[field] = 'Required.'
    })
    setErrors(next)
    return Object.keys(next).length === 0
  }

  async function handleSubmit(e) {
    e.preventDefault()
    if (items.length === 0) {
      showMessage('error', 'Your cart is empty.')
      return
    }
    if (!validate()) return

    setSubmitting(true)
    try {
      await submitOrder({ billing: form, items, subtotal, shipping, total })
      clear()
      onSuccess?.()
    } catch {
      showMessage('error', 'Something went wrong placing your order. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  const inputClass =
    'w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-navy outline-none transition placeholder:text-gray-400 focus:border-gold focus:ring-1 focus:ring-gold'
  const labelClass = 'mb-1 block text-sm font-medium text-navy'
  const errorClass = 'mt-1 text-xs text-error'

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 rounded-xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8"
    >
      <h2 className="text-lg font-bold text-navy">Billing Details</h2>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className={labelClass} htmlFor="co-name">
            Name
          </label>
          <input
            id="co-name"
            className={inputClass}
            value={form.name}
            onChange={(e) => update('name', e.target.value)}
            placeholder="Jane Doe"
          />
          {errors.name && <p className={errorClass}>{errors.name}</p>}
        </div>
        <div>
          <label className={labelClass} htmlFor="co-email">
            Email
          </label>
          <input
            id="co-email"
            type="email"
            className={inputClass}
            value={form.email}
            onChange={(e) => update('email', e.target.value)}
            placeholder="jane@email.com"
          />
          {errors.email && <p className={errorClass}>{errors.email}</p>}
        </div>
      </div>

      <div>
        <label className={labelClass} htmlFor="co-phone">
          Phone
        </label>
        <input
          id="co-phone"
          type="tel"
          className={inputClass}
          maxLength={12}
          value={form.phone}
          onChange={(e) => update('phone', formatPhone(e.target.value))}
          placeholder="XXX-XXX-XXXX"
        />
        {errors.phone && <p className={errorClass}>{errors.phone}</p>}
      </div>

      <div>
        <label className={labelClass} htmlFor="co-address">
          Address
        </label>
        <input
          id="co-address"
          className={inputClass}
          value={form.address}
          onChange={(e) => update('address', e.target.value)}
          placeholder="123 Honey Lane"
        />
        {errors.address && <p className={errorClass}>{errors.address}</p>}
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <div>
          <label className={labelClass} htmlFor="co-city">
            City
          </label>
          <input
            id="co-city"
            className={inputClass}
            value={form.city}
            onChange={(e) => update('city', e.target.value)}
          />
          {errors.city && <p className={errorClass}>{errors.city}</p>}
        </div>
        <div>
          <label className={labelClass} htmlFor="co-state">
            State
          </label>
          <input
            id="co-state"
            className={inputClass}
            value={form.state}
            onChange={(e) => update('state', e.target.value)}
          />
          {errors.state && <p className={errorClass}>{errors.state}</p>}
        </div>
        <div>
          <label className={labelClass} htmlFor="co-zip">
            Zip
          </label>
          <input
            id="co-zip"
            className={inputClass}
            value={form.zip}
            onChange={(e) => update('zip', e.target.value)}
          />
          {errors.zip && <p className={errorClass}>{errors.zip}</p>}
        </div>
      </div>

      <div>
        <label className={labelClass} htmlFor="co-notes">
          Order Notes (optional)
        </label>
        <textarea
          id="co-notes"
          rows={3}
          className={inputClass}
          value={form.notes}
          onChange={(e) => update('notes', e.target.value)}
          placeholder="Delivery instructions, preferred pickup time, etc."
        />
      </div>

      <button
        type="submit"
        disabled={submitting}
        className="w-full rounded-lg bg-gold px-4 py-3 text-sm font-semibold text-white transition hover:bg-gold/90 disabled:opacity-60"
      >
        {submitting ? 'Placing Order...' : 'Place Order'}
      </button>
    </form>
  )
}
