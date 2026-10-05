import { useEffect, useState } from 'react'
import { useMessage } from '../../hooks/useMessage'
import { fireConfetti } from '../../lib/confetti'
import './MessageBanner.css'

const VISIBLE_MS = 5600
const FADE_MS = 350

export default function MessageBanner() {
  const { message, clearMessage } = useMessage()
  const [fadingId, setFadingId] = useState(null)

  useEffect(() => {
    if (!message) return
    if (message.type === 'success') fireConfetti()

    const fadeTimer = setTimeout(() => setFadingId(message.id), VISIBLE_MS)
    const clearTimer = setTimeout(clearMessage, VISIBLE_MS + FADE_MS)
    return () => {
      clearTimeout(fadeTimer)
      clearTimeout(clearTimer)
    }
  }, [message, clearMessage])

  if (!message) return null

  const fading = fadingId === message.id
  const tone = message.type === 'success' ? 'success' : 'warning'

  return (
    <div
      className={`site-messages${fading ? ' fade-out' : ''}`}
      role="status"
      aria-live="polite"
      aria-atomic="true"
    >
      <div className={`site-message ${tone}`}>
        <span className="site-message-text">{message.text}</span>
      </div>
    </div>
  )
}
