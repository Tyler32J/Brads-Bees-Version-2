// A field people never see. Spam bots fill in every input, so the server
// quietly drops any submission where this has a value.
export default function HoneypotField({ value, onChange }) {
  return (
    <input
      type="text"
      name="website"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      tabIndex={-1}
      autoComplete="off"
      aria-hidden="true"
      style={{ position: 'absolute', left: '-9999px', width: 1, height: 1, opacity: 0 }}
    />
  )
}
