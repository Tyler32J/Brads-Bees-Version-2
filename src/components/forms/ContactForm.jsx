import { useContactForm, SERVICE_OPTIONS } from '../../hooks/useContactForm'
import { formatPhone } from '../../lib/validation'
import PhotoUpload from './PhotoUpload'
import './ContactForm.css'

export default function ContactForm() {
  const { values, errors, update, images, setImages, submitting, handleSubmit } =
    useContactForm()

  return (
    <div className="contact-form-wrapper">
      <h3 className="contact-form-title">Send Us a Message</h3>

      <form className="contact-form" onSubmit={handleSubmit} noValidate>
        <div className="form-group">
          <label className="form-label" htmlFor="contact-name">
            Name
          </label>
          <input
            id="contact-name"
            type="text"
            className="form-input"
            maxLength={50}
            placeholder="Your name"
            value={values.name}
            onChange={(e) => update('name', e.target.value)}
            aria-invalid={Boolean(errors.name)}
          />
          {errors.name && <div className="error-text">{errors.name}</div>}
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="contact-email">
            Email
          </label>
          <input
            id="contact-email"
            type="email"
            className="form-input"
            maxLength={50}
            placeholder="Your Email"
            value={values.email}
            onChange={(e) => update('email', e.target.value)}
            aria-invalid={Boolean(errors.email)}
          />
          {errors.email && <div className="error-text">{errors.email}</div>}
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="contact-phone">
            Phone
          </label>
          <input
            id="contact-phone"
            type="tel"
            className="form-input"
            maxLength={12}
            placeholder="XXX-XXX-XXXX"
            value={values.phone}
            onChange={(e) => update('phone', formatPhone(e.target.value))}
            aria-invalid={Boolean(errors.phone)}
          />
          {errors.phone && <div className="error-text">{errors.phone}</div>}
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="contact-service">
            Service Needed
          </label>
          <select
            id="contact-service"
            className="form-select"
            value={values.service}
            onChange={(e) => update('service', e.target.value)}
          >
            {SERVICE_OPTIONS.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="contact-message">
            Message
          </label>
          <textarea
            id="contact-message"
            className="form-textarea"
            rows={4}
            placeholder="Tell us about your needs..."
            value={values.message}
            onChange={(e) => update('message', e.target.value)}
            aria-invalid={Boolean(errors.message)}
          />
          {errors.message && <div className="error-text">{errors.message}</div>}
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="contact-images">
            Upload Images
          </label>
          <PhotoUpload id="contact-images" images={images} onChange={setImages} />
        </div>

        <button className="submit-button" type="submit" disabled={submitting}>
          {submitting ? 'Sending...' : 'Send Message'}
        </button>
      </form>
    </div>
  )
}
