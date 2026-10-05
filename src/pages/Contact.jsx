import { useContactForm, SERVICE_OPTIONS } from '../hooks/useContactForm'
import { formatPhone } from '../lib/validation'
import PhotoUpload from '../components/forms/PhotoUpload'
import './Contact.css'

function FieldErrors({ id, message }) {
  if (!message) return null
  return (
    <ul className="contact-field-errors" id={id}>
      <li>{message}</li>
    </ul>
  )
}

export default function Contact() {
  const { values, errors, update, images, setImages, submitting, handleSubmit } =
    useContactForm()

  function inputProps(field) {
    return {
      id: `contact-page-${field}`,
      value: values[field],
      onChange: (e) => update(field, e.target.value),
      'aria-invalid': Boolean(errors[field]),
      'aria-describedby': errors[field] ? `contact-page-${field}-error` : undefined,
    }
  }

  return (
    <section className="contact-page">
      <title>Contact - Brad&apos;s Bees</title>

      <div className="contact-card">
        <h1>Contact Us</h1>
        <p>Call us any time for bee removal or service questions.</p>

        <form className="contact-card-form" onSubmit={handleSubmit} noValidate>
          <div className="contact-field">
            <label htmlFor="contact-page-name">Name:</label>
            <input type="text" maxLength={50} placeholder="Your Name" {...inputProps('name')} />
            <FieldErrors id="contact-page-name-error" message={errors.name} />
          </div>

          <div className="contact-field">
            <label htmlFor="contact-page-email">Email:</label>
            <input type="email" maxLength={50} placeholder="Your Email" {...inputProps('email')} />
            <FieldErrors id="contact-page-email-error" message={errors.email} />
          </div>

          <div className="contact-field">
            <label htmlFor="contact-page-phone">Phone:</label>
            <input
              type="tel"
              maxLength={12}
              placeholder="XXX-XXX-XXXX"
              {...inputProps('phone')}
              onChange={(e) => update('phone', formatPhone(e.target.value))}
            />
            <FieldErrors id="contact-page-phone-error" message={errors.phone} />
          </div>

          <div className="contact-field">
            <label htmlFor="contact-page-service">Service:</label>
            <select {...inputProps('service')}>
              {SERVICE_OPTIONS.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>

          <div className="contact-field">
            <label htmlFor="contact-page-message">Message:</label>
            <textarea rows={10} placeholder="Tell us about your needs..." {...inputProps('message')} />
            <FieldErrors id="contact-page-message-error" message={errors.message} />
          </div>

          <div className="contact-field">
            <label htmlFor="contact-page-images">Images:</label>
            <PhotoUpload id="contact-page-images" images={images} onChange={setImages} />
          </div>

          <button className="contact-submit" type="submit" disabled={submitting}>
            {submitting ? 'Sending...' : 'Submit'}
          </button>
        </form>
      </div>
    </section>
  )
}
