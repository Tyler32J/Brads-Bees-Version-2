import './Toast.css'

export default function Toast({ text }) {
  if (!text) return null

  return (
    <div className="toast" role="status" aria-live="polite">
      {text}
    </div>
  )
}
