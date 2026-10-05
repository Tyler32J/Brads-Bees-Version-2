import { Link } from 'react-router-dom'
import { Mail, Phone, MapPin } from 'lucide-react'
import { siteInfo, navLinks } from '../../data/siteInfo'
import brandLogo from '../../assets/images/brand-logo.webp'
import './Footer.css'

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-brand">
        <div className="footer-brand-row">
          <img src={brandLogo} alt="Brad's Bees logo" className="footer-logo" />
          <h3>{siteInfo.name}</h3>
        </div>
        <p>{siteInfo.summary}</p>
        <p>{siteInfo.tagline}</p>
      </div>

      <div>
        <h4>Quick Links</h4>
        {navLinks.map((link) => (
          <p key={link.to}>
            <Link to={link.to}>{link.label}</Link>
          </p>
        ))}
      </div>

      <div>
        <h4>Get In Touch</h4>
        <div className="footer-contact-list">
          <div className="footer-contact-row">
            <Mail className="footer-contact-icon" aria-hidden="true" />
            <a href={`mailto:${siteInfo.email}`}>{siteInfo.email}</a>
          </div>
          <div className="footer-contact-row">
            <Phone className="footer-contact-icon" aria-hidden="true" />
            <a href={siteInfo.phoneHref}>{siteInfo.phone}</a>
          </div>
          <div className="footer-contact-row">
            <MapPin className="footer-contact-icon" aria-hidden="true" />
            <a href={siteInfo.mapsUrl} target="_blank" rel="noopener noreferrer">
              {siteInfo.cityStateZip}
            </a>
          </div>
        </div>

        <h4 className="footer-follow-title">Follow Us</h4>
        <a
          href={siteInfo.facebook}
          target="_blank"
          rel="noopener noreferrer"
          className="footer-social-link"
        >
          <svg className="footer-social-icon" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M14 13.5h2.5l1-4H14v-2c0-1.03 0-2 2-2h1.5V2.14c-.326-.043-1.557-.14-2.857-.14C11.928 2 10 3.657 10 6.7v2.8H7v4h3V22h4v-8.5z" />
          </svg>
          Facebook
        </a>

        <h4 className="footer-community-title">Community Links</h4>
        <p>
          <a href={siteInfo.community.url} target="_blank" rel="noopener noreferrer">
            {siteInfo.community.label}
          </a>
        </p>
      </div>

      <p className="footer-copyright">{siteInfo.footerNote}</p>
    </footer>
  )
}
