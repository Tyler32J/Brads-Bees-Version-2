import { Link } from 'react-router-dom'
import { useState } from 'react'
import { ChevronLeft, ChevronRight, Clock, Mail, MapPin, Phone } from 'lucide-react'
import StatCard from '../components/ui/StatCard'
import TestimonialCard from '../components/ui/TestimonialCard'
import ContactForm from '../components/forms/ContactForm'
import { testimonials } from '../data/testimonials'
import { siteInfo } from '../data/siteInfo'
import heroLogo from '../assets/images/hero-logo.webp'
import bradPhoto from '../assets/images/brad-with-bees.webp'
import honeyPreview from '../assets/images/honey-preview.webp'
import beeIcon from '../assets/images/icon-bee.webp'
import bagIcon from '../assets/images/icon-shopping-bag.webp'
import bookIcon from '../assets/images/icon-book.webp'
import cameraIcon from '../assets/images/icon-camera.webp'
import './Home.css'

const stats = [
  { title: 'Chemical', label: 'Free' },
  { title: 'Insured', label: 'Protected' },
  { title: 'Local', label: 'Business' },
]

const quickLinks = [
  { to: '/services', title: 'Services', icon: beeIcon, description: 'Your go-to bee service options' },
  { to: '/shop', title: 'Shop', icon: bagIcon, description: 'Pure honey & bee products' },
  { to: '/education', title: 'Educational Outreach', icon: bookIcon, description: 'Learn about bees and sustainability' },
  { to: '/gallery', title: 'Gallery', icon: cameraIcon, description: 'Photos from the field' },
]

export default function Home() {
  // The reviews loop: the arrows move one review along, and CSS decides how
  // many show at once (3 on desktop, 2 on tablets, 1 on phones).
  const [reviewStart, setReviewStart] = useState(0)
  const visibleReviews = [...testimonials.slice(reviewStart), ...testimonials.slice(0, reviewStart)]

  function showReview(step) {
    setReviewStart((start) => (start + step + testimonials.length) % testimonials.length)
  }

  return (
    <div className="home-page">
      <title>Home - Brad&apos;s Bees</title>

      <section className="hero-section">
        <div className="container hero-container">
          <div className="hero-grid">
            <div>
              <h1 className="hero-title">Honeybee Removal &amp; Premium Honey</h1>
              <p className="hero-subtitle">
                Professional bee removal services and locally sourced, treatment-free honey that
                brings nature&apos;s sweetness to your home.
              </p>
              <div className="stats-grid">
                {stats.map((stat) => (
                  <StatCard key={stat.title} {...stat} />
                ))}
              </div>
            </div>

            <div className="logo-container">
              <img src={heroLogo} alt="Brad's Bees logo" className="hero-logo" />
            </div>
          </div>
        </div>
      </section>

      <section className="about-section">
        <div className="container about-container">
          <h2 className="section-title">My Story</h2>
          <div className="about-grid">
            <div className="about-image-wrapper">
              <img src={bradPhoto} alt="Brad working with bees" className="about-image" />
            </div>

            <div className="about-text">
              <p>
                My beekeeping journey started in 2017, after my brother gave me the push I needed to
                just do it. A pile of OSB scraps became my first swarm traps that fall, and that one
                step opened the door to everything that came after.
              </p>
              <p>
                My &quot;bee lady,&quot; Mrs. Pichon, was also instrumental in developing my passion
                for beekeeping. She was like a grandma to me and gave me free reign over her little
                Slidell property full of wild honeybee colonies. I would set traps and then stay a
                while to chat. I brought her eggs, vegetables, and fruits from my garden, almost like
                trading my harvest for her wisdom and guidance during our visits. On March 31, 2018, I
                caught my first swarm, and it is because of her kindness and influence that I can pass
                along even a fraction of that helpfulness to others with the same interest.
              </p>
              <p>
                Treatment-free is the cornerstone of my management style. I rely on sustainable
                practices that begin with local genetics and avoid chemical treatments and
                supplemental feeding such as sugar water. In return, the bees produce 100% honey from
                the forage God provides. Bees do not need beekeepers to thrive.
              </p>
              <p>
                Please reach out for anything bee related: removals, hive setup, pollination
                services, educational outreach, and honey.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* One continuous honeycomb behind the quick links and the reviews */}
      <div className="honeycomb-band">
        <section className="services-section">
          <div className="container services-container">
            <div className="services-grid">
              {quickLinks.map((link) => (
                <Link key={link.to} to={link.to} className="service-card">
                  <img src={link.icon} alt="" className="service-icon" />
                  <h3 className="service-title">{link.title}</h3>
                  <p className="service-description">{link.description}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="reviews-section">
          <div className="container">
            <h2 className="section-heading">What Our Customers Say</h2>
            <p className="section-subtitle">
              Don&apos;t just take our word for it - hear from our satisfied customers
            </p>
            <div className="reviews-carousel">
              {testimonials.length > 1 && (
                <button
                  type="button"
                  className="reviews-arrow is-prev"
                  onClick={() => showReview(-1)}
                  aria-label="Previous review"
                >
                  <ChevronLeft aria-hidden="true" />
                </button>
              )}
              <div className="reviews-grid" aria-live="polite">
                {visibleReviews.map((testimonial) => (
                  <TestimonialCard key={`${testimonial.name}-${reviewStart}`} {...testimonial} />
                ))}
              </div>
              {testimonials.length > 1 && (
                <button
                  type="button"
                  className="reviews-arrow is-next"
                  onClick={() => showReview(1)}
                  aria-label="Next review"
                >
                  <ChevronRight aria-hidden="true" />
                </button>
              )}
            </div>
          </div>
        </section>
      </div>

      <section className="contact-section">
        <div className="container contact-container">
          <h2 className="section-heading">Get in Touch</h2>
          <p className="section-subtitle">
            Need bee removal service or have questions about our honey products?
            <br />
            Contact us today!
          </p>

          <div className="contact-grid">
            <ContactForm />

            <div className="contact-info-wrapper">
              <div className="contact-image-wrapper">
                <img src={honeyPreview} alt="Honey and bee products" className="contact-image" />
              </div>

              <ul className="contact-info-list">
                <li className="contact-info-item">
                  <span className="contact-icon" aria-hidden="true">
                    <Phone />
                  </span>
                  <div>
                    <a href={siteInfo.phoneHref}>{siteInfo.phone}</a>
                    <p className="contact-info-subtext">{siteInfo.phoneAvailability}</p>
                  </div>
                </li>
                <li className="contact-info-item">
                  <span className="contact-icon" aria-hidden="true">
                    <Mail />
                  </span>
                  <div>
                    <a href={`mailto:${siteInfo.email}`}>{siteInfo.email}</a>
                    <p className="contact-info-subtext">{siteInfo.emailResponse}</p>
                  </div>
                </li>
                <li className="contact-info-item">
                  <span className="contact-icon" aria-hidden="true">
                    <MapPin />
                  </span>
                  <div>
                    <p className="contact-info-text">{siteInfo.street}</p>
                    <a href={siteInfo.mapsUrl} target="_blank" rel="noopener noreferrer">
                      {siteInfo.cityStateZip}
                    </a>
                  </div>
                </li>
                <li className="contact-info-item">
                  <span className="contact-icon" aria-hidden="true">
                    <Clock />
                  </span>
                  <div>
                    <p className="contact-info-text">Business Hours</p>
                    <p className="contact-info-subtext">
                      {siteInfo.hours.map((h, i) => (
                        <span key={h.days}>
                          {i > 0 && <br />}
                          {h.days}: {h.time}
                        </span>
                      ))}
                    </p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
