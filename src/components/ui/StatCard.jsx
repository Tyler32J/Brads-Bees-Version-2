import './StatCard.css'

export default function StatCard({ title, label }) {
  return (
    <div className="stat-box">
      <div className="stat-number">{title}</div>
      <div className="stat-label">{label}</div>
    </div>
  )
}
