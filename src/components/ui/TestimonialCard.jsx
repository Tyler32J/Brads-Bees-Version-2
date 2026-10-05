import './TestimonialCard.css'

export default function TestimonialCard({ name, initials, location, rating, service, quote }) {
  return (
    <article className="review-card">
      {service && <span className="review-service">{service}</span>}
      <div className="review-stars" role="img" aria-label={`${rating} out of 5 stars`}>
        {Array.from({ length: rating }, (_, i) => (
          <span key={i} className="star" aria-hidden="true">
            ★
          </span>
        ))}
      </div>
      <p className="review-text">&quot;{quote}&quot;</p>
      <div className="review-author">
        <div className="review-avatar" aria-hidden="true">
          {initials}
        </div>
        <div>
          <p className="review-author-name">{name}</p>
          <p className="review-author-location">{location}</p>
        </div>
      </div>
    </article>
  )
}
