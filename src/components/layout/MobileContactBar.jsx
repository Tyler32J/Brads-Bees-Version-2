import { MessageSquare, Phone } from 'lucide-react'
import { siteInfo } from '../../data/siteInfo'
import './MobileContactBar.css'

// Call and Text buttons pinned to the bottom of the screen on phones
export default function MobileContactBar() {
  return (
    <nav className="mobile-contact-bar" aria-label="Contact Brad's Bees">
      <a className="mobile-contact-call" href={siteInfo.phoneHref}>
        <Phone aria-hidden="true" />
        Call
      </a>
      <a className="mobile-contact-text" href={siteInfo.smsHref}>
        <MessageSquare aria-hidden="true" />
        Text
      </a>
    </nav>
  )
}
