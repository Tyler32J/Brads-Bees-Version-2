import { Plus } from 'lucide-react'
import './ProductCard.css'

const MAX_STARS = 5

export default function ProductCard({ product, onAdd }) {
  const filledStars = Math.floor(product.rating)
  const label = product.variant ? `${product.name} ${product.variant}` : product.name
  const price = `$${product.price.toFixed(2)}`

  return (
    <article className="product-card">
      <img
        src={product.image}
        alt={label}
        className={`product-image product-image-${product.imageFit}`}
      />

      <h3 className="product-name">{product.name}</h3>
      {product.variant && <p className="product-variant">{product.variant}</p>}

      <div className="product-badges">
        <span className="product-badge">Small Batch</span>
        <span className="product-badge">Local</span>
        {product.inStock && <span className="product-badge product-badge-stock">In Stock</span>}
      </div>

      <p className="product-description" title={product.description}>
        {product.description}
      </p>

      <div className="product-footer">
        <div className="product-rating" role="img" aria-label={`Rated ${product.rating} out of 5`}>
          {Array.from({ length: MAX_STARS }, (_, i) => (
            <span
              key={i}
              className={`product-star${i < filledStars ? ' filled' : ''}`}
              aria-hidden="true"
            >
              ★
            </span>
          ))}
          <span className="product-rating-value" aria-hidden="true">
            ({product.rating.toFixed(1)})
          </span>
        </div>
        {/* The price doubles as the add button */}
        <button
          type="button"
          className="add-to-cart-btn"
          onClick={() => onAdd(product)}
          aria-label={`Add ${label} to cart, ${price}`}
        >
          <span>{price}</span>
          <Plus aria-hidden="true" />
        </button>
      </div>
    </article>
  )
}
