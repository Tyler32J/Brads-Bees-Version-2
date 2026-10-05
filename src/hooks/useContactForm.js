import { useState } from 'react'
import { useMessage } from './useMessage'
import { submitContactForm } from '../lib/api'
import { isValidName, isValidPhone, isValidEmail } from '../lib/validation'

export const SERVICE_OPTIONS = ['Bee Removal', 'Pollination Service', 'Education Service', 'Hive Set-Up']

const INITIAL_VALUES = {
  name: '',
  email: '',
  phone: '',
  service: SERVICE_OPTIONS[0],
  message: '',
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

    setSubmitting(true)
    try {
      await submitContactForm({ ...values, images })
      showMessage('success', 'Form submitted successfully!')
      setValues(INITIAL_VALUES)
      setImages([])
    } catch {
      showMessage('error', 'Something went wrong. Please try again or call us directly.')
    } finally {
      setSubmitting(false)
    }
  }

  return { values, errors, update, images, setImages, submitting, handleSubmit }
}
