import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { Award, Droplet, Leaf, ShoppingBag } from 'lucide-react'
import ProductCard from '../components/ui/ProductCard'
import Toast from '../components/ui/Toast'
import { products } from '../data/products'
import { useCart } from '../hooks/useCart'
import './Shop.css'

const TOAST_MS = 2000

const reasons = [
  {
    icon: Award,
    title: 'Premium Quality',
    text: 'All our products are produced with care and quality in mind',
  },
  {
    icon: Leaf,
    title: 'Local & Sustainable',
    text: 'Supporting local beekeeping and sustainable practices',
  },
  {
    icon: Droplet,
    title: '100% Natural',
    text: 'No additives, pure honey and beeswax products',
  },
]

export default function Shop() {
  const { addItem, itemCount, subtotal } = useCart()
  const [toastText, setToastText] = useState('')
  const toastTimer = useRef(null)

  useEffect(() => () => clearTimeout(toastTimer.current), [])

  function handleAdd(product) {
    addItem(product, 1)
    setToastText('Added to cart! ✓')
    clearTimeout(toastTimer.current)
    toastTimer.current = setTimeout(() => setToastText(''), TOAST_MS)
  }

  return (
    <div className="shop-page">
      <title>Shop - Brad&apos;s Bees</title>

      <section className="shop-hero">
        <h1>Brad&apos;s Honey Shop</h1>
        <p>
          Premium, locally-sourced honey and bee products. All natural, no additives, just pure
          goodness from our hives to your home.
        </p>
      </section>

      <section className="shop-section">
        <h2>Our Products</h2>
        <div className="products-grid">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} onAdd={handleAdd} />
          ))}
        </div>
      </section>

      <section className="why-shop">
        <h2>Why Shop With Us</h2>
        <div className="why-shop-grid">
          {reasons.map((reason) => (
            <div key={reason.title} className="why-shop-card">
              <div className="why-shop-icon" aria-hidden="true">
                <reason.icon />
              </div>
              <h3>{reason.title}</h3>
              <p>{reason.text}</p>
            </div>
          ))}
        </div>
      </section>

      <Link
        to="/shop/cart"
        className="floating-cart-btn"
        aria-label={`View cart (${itemCount} items, $${subtotal.toFixed(2)})`}
      >
        <span className="cart-icon" aria-hidden="true">
          <ShoppingBag />
          {/* key replays the pop animation whenever the count changes */}
          <span key={itemCount} className="cart-badge">
            {itemCount}
          </span>
        </span>
        <span className="cart-summary" aria-hidden="true">
          <small>Your cart</small>
          <strong>${subtotal.toFixed(2)}</strong>
        </span>
      </Link>

      <Toast text={toastText} />
    </div>
  )
}
