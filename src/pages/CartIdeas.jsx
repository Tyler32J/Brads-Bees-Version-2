import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ShoppingBag, ShoppingCart } from 'lucide-react'
import './CartIdeas.css'

// Preview page for floating cart button styles. Not linked from the navbar.

const SAMPLE_TOTAL_PER_ITEM = 12

function CurrentStyle({ count }) {
  return (
    <span className="cart-demo cart-current">
      <span aria-hidden="true">🛒</span>
      <span className="demo-badge badge-red">{count}</span>
    </span>
  )
}

function HexagonStyle({ count }) {
  return (
    <span className="cart-demo cart-hex">
      <span className="cart-hex-shape">
        <ShoppingCart />
      </span>
      <span className="demo-badge badge-navy">{count}</span>
    </span>
  )
}

function PillStyle({ count }) {
  return (
    <span className="cart-demo cart-pill">
      <ShoppingCart />
      <span>View Cart</span>
      <span className="cart-pill-count">{count}</span>
    </span>
  )
}

function TotalPillStyle({ count }) {
  return (
    <span className="cart-demo cart-total">
      <span className="cart-total-icon">
        <ShoppingBag />
        <span className="demo-badge badge-gold">{count}</span>
      </span>
      <span className="cart-total-text">
        <small>Your cart</small>
        <strong>${(count * SAMPLE_TOTAL_PER_ITEM).toFixed(2)}</strong>
      </span>
    </span>
  )
}

function NavyStyle({ count }) {
  return (
    <span className="cart-demo cart-navy">
      <ShoppingBag />
      <span className="demo-badge badge-gold">{count}</span>
    </span>
  )
}

function HoneyJarStyle({ count }) {
  return (
    <span className="cart-demo cart-jar">
      <span aria-hidden="true">🍯</span>
      <span className="demo-badge badge-hex">{count}</span>
    </span>
  )
}

function SideTabStyle({ count }) {
  return (
    <span className="cart-demo cart-tab">
      <ShoppingCart />
      <span className="cart-tab-label">Cart ({count})</span>
    </span>
  )
}

function DripStyle({ count }) {
  return (
    <span className="cart-demo cart-drip">
      <ShoppingCart />
      <span className="demo-badge badge-white">{count}</span>
    </span>
  )
}

const styles = [
  {
    id: 'current',
    name: 'Current',
    note: 'What the shop has today, for comparison.',
    Component: CurrentStyle,
  },
  {
    id: 'hex',
    name: 'Honeycomb Hexagon',
    note: 'A gold hexagon that matches the honeycomb pattern used across the site.',
    Component: HexagonStyle,
  },
  {
    id: 'pill',
    name: 'Labeled Pill',
    note: 'Spells out “View Cart” so nobody has to guess what the button does.',
    Component: PillStyle,
  },
  {
    id: 'total',
    name: 'Cart Total',
    note: 'Shows the running total so shoppers see what they are spending as they add items.',
    Component: TotalPillStyle,
    sample: true,
  },
  {
    id: 'navy',
    name: 'Navy & Gold',
    note: 'Uses the footer’s navy with a gold count, so it stands out against the honey colors.',
    Component: NavyStyle,
  },
  {
    id: 'jar',
    name: 'Honey Jar',
    note: 'A honey jar instead of a cart, with a hexagon count. Playful and on brand.',
    Component: HoneyJarStyle,
  },
  {
    id: 'tab',
    name: 'Side Tab',
    note: 'A tab tucked against the right edge. Stays out of the way of the products.',
    Component: SideTabStyle,
    edge: true,
  },
  {
    id: 'drip',
    name: 'Honey Drip',
    note: 'The current circle with a honey drip running off the bottom, like the shop header.',
    Component: DripStyle,
  },
]

export default function CartIdeas() {
  const [count, setCount] = useState(3)
  const [bump, setBump] = useState(0)

  function addItem() {
    setCount((value) => value + 1)
    setBump((value) => value + 1)
  }

  return (
    <div className="cart-ideas-page">
      <title>Cart Button Ideas - Brad&apos;s Bees</title>
      <meta name="robots" content="noindex" />

      <section className="cart-ideas-intro">
        <h1>Cart Button Ideas</h1>
        <p>
          Each box is the bottom-right corner of the shop page. Hover over a button to see its
          hover effect, and add items to see how the count reacts.
        </p>
        <div className="cart-ideas-controls">
          <button type="button" className="cart-ideas-add" onClick={addItem}>
            + Add item
          </button>
          <button type="button" className="cart-ideas-reset" onClick={() => setCount(3)}>
            Reset
          </button>
          <span className="cart-ideas-count">Items in cart: {count}</span>
        </div>
        <Link to="/ideas" className="cart-ideas-back">
          &larr; Back to all ideas
        </Link>
      </section>

      <div className="cart-ideas-grid">
        {styles.map(({ id, name, note, Component, sample, edge }, index) => (
          <article key={id} className="cart-idea">
            <div className={`cart-idea-stage${edge ? ' is-edge' : ''}`}>
              <div className="stage-lines" aria-hidden="true">
                <span />
                <span />
                <span />
              </div>
              {/* key replays the pop animation each time an item is added */}
              <span key={bump} className={`cart-idea-slot${bump ? ' is-bumped' : ''}`}>
                <Component count={count} />
              </span>
            </div>
            <div className="cart-idea-info">
              <h2>
                <span>{index + 1}</span> {name}
              </h2>
              <p>{note}</p>
              {sample && <p className="cart-idea-sample">Total uses a sample $12 per item.</p>}
            </div>
          </article>
        ))}
      </div>
    </div>
  )
}
