import { useState } from 'react'
import { useMessage } from './useMessage'
import { MAX_PHOTOS, MAX_PHOTO_MB, submitContactForm } from '../lib/api'
import { isValidName, isValidPhone, isValidEmail } from '../lib/validation'

export const SERVICE_OPTIONS = ['Bee Removal', 'Pollination Service', 'Education Service', 'Hive Set-Up']

const INITIAL_VALUES = {
  name: '',
  email: '',
  phone: '',
  service: SERVICE_OPTIONS[0],
  message: '',
  website: '',
}

function validate(values) {
  const errors = {}
  if (!isValidName(values.name)) errors.name = 'This field must contain letters and spaces only.'
  if (!isValidEmail(values.email)) errors.email = 'Enter a valid email address.'
  if (!isValidPhone(values.phone)) errors.phone = 'Enter a 10-digit phone number.'
  if (!values.message.trim()) errors.message = 'This field is required.'
  return errors
}

// State, validation and submission for the contact form. The home page and the
// Contact page render different markup on top of this same logic.
export function useContactForm() {
  const { showMessage } = useMessage()
  const [values, setValues] = useState(INITIAL_VALUES)
  const [images, setImages] = useState([])
  const [errors, setErrors] = useState({})
  const [submitting, setSubmitting] = useState(false)

  function update(field, value) {
    setValues((prev) => ({ ...prev, [field]: value }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    const nextErrors = validate(values)
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length > 0) return

    if (images.length > MAX_PHOTOS) {
      showMessage('error', `Please attach up to ${MAX_PHOTOS} photos.`)
      return
    }
    if (images.some((file) => file.size > MAX_PHOTO_MB * 1024 * 1024)) {
      showMessage('error', `Each photo must be under ${MAX_PHOTO_MB}MB. Please remove the larger ones.`)
      return
    }

    setSubmitting(true)
    try {
      await submitContactForm({ ...values, images })
      showMessage('success', 'Thanks! Your message was sent. Brad will be in touch soon.')
      setValues(INITIAL_VALUES)
      setImages([])
    } catch (error) {
      showMessage('error', error.message || 'Something went wrong. Please try again or call us directly.')
    } finally {
      setSubmitting(false)
    }
  }

  return { values, errors, update, images, setImages, submitting, handleSubmit }
}
