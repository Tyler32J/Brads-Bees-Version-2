import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Check, Minus, Plus, ShoppingBag, Truck } from 'lucide-react'
import { products } from '../data/products'
import './ShopIdeas.css'

// Preview page for product card ideas. Not linked from the navbar.
// Buttons here only update this page, never the real cart.

const FREE_SHIPPING_AT = 50
const honeySizes = products.filter((product) => product.name === 'Honey')
const [pint, , gallon] = honeySizes
const beeswax = products.find((product) => product.id === 'beeswax-block')
const candles = products.find((product) => product.id === 'beeswax-candles')

const price = (value) => `$${value.toFixed(2)}`

function Stars({ rating }) {
  return (
    <span className="si-stars" role="img" aria-label={`Rated ${rating} out of 5`}>
      {'★★★★★'.slice(0, Math.floor(rating))}
      <span className="si-stars-empty">{'★★★★★'.slice(Math.floor(rating))}</span>
      <small>({rating.toFixed(1)})</small>
    </span>
  )
}

function Idea({ number, title, why, ask, children }) {
  return (
    <section className="si-idea">
      <header className="si-idea-header">
        <span className="si-idea-number">Idea {number}</span>
        <h2>{title}</h2>
        <p>{why}</p>
        {ask && (
          <p className="si-idea-ask">
            <strong>Confirm with Brad:</strong> {ask}
          </p>
        )}
      </header>
      <div className="si-idea-stage">{children}</div>
    </section>
  )
}

/* 1. One honey card with a size picker */
function SizePickerCard() {
  const [size, setSize] = useState(honeySizes[0])

  return (
    <article className="si-card si-card-wide">
      <div className="si-photo">
        <img key={size.id} src={size.image} alt={`Honey ${size.variant}`} className="si-fade" />
      </div>
      <div className="si-card-body">
        <h3>Raw Local Honey</h3>
        <Stars rating={size.rating} />
        <p className="si-desc">{size.description}</p>
        <p className="si-label">Choose a size</p>
        <div className="si-sizes" role="radiogroup" aria-label="Honey size">
          {honeySizes.map((option) => (
            <button
              key={option.id}
              type="button"
              role="radio"
              aria-checked={option.id === size.id}
              onClick={() => setSize(option)}
            >
              <span>{option.variant}</span>
              <small>{price(option.price)}</small>
            </button>
          ))}
        </div>
        <div className="si-footer">
          <span className="si-price">{price(size.price)}</span>
          <button type="button" className="si-add">
            Add to Cart
          </button>
        </div>
      </div>
    </article>
  )
}

/* 2. Free shipping progress */
function ShippingProgress() {
  const [subtotal, setSubtotal] = useState(14)
  const left = Math.max(FREE_SHIPPING_AT - subtotal, 0)
  const percent = Math.min((subtotal / FREE_SHIPPING_AT) * 100, 100)

  return (
    <div className="si-shipping-demo">
      <div className={`si-shipping${left === 0 ? ' is-free' : ''}`}>
        <Truck aria-hidden="true" />
        <div className="si-shipping-text">
          <p>
            {left === 0 ? (
              <strong>You&rsquo;ve unlocked free shipping! 🎉</strong>
            ) : (
              <>
                You&rsquo;re <strong>{price(left)}</strong> away from <strong>free shipping</strong>
              </>
            )}
          </p>
          <div className="si-shipping-track">
            <span style={{ width: `${percent}%` }} />
          </div>
        </div>
      </div>
      <div className="si-demo-buttons">
        <span>Try it:</span>
        {[pint, beeswax, gallon].map((product) => (
          <button
            key={product.id}
            type="button"
            onClick={() => setSubtotal((value) => value + product.price)}
          >
            + {product.variant === '1 lb Block' ? 'Beeswax' : `${product.variant} honey`} (
            {price(product.price)})
          </button>
        ))}
        <button type="button" className="si-reset" onClick={() => setSubtotal(14)}>
          Reset
        </button>
      </div>
    </div>
  )
}

/* 3. Quantity stepper with an "Added" state */
function StepperCard() {
  const [qty, setQty] = useState(1)
  const [added, setAdded] = useState(false)

  function add() {
    setAdded(true)
    setTimeout(() => setAdded(false), 1500)
  }

  return (
    <article className="si-card">
      <div className="si-photo">
        <img src={candles.image} alt={candles.name} />
      </div>
      <div className="si-card-body">
        <h3>{candles.name}</h3>
        <p className="si-variant">{candles.variant}</p>
        <div className="si-footer si-footer-stack">
          <span className="si-price">{price(candles.price * qty)}</span>
          <div className="si-buy-row">
            <div className="si-stepper">
              <button
                type="button"
                aria-label="Remove one"
                onClick={() => setQty((value) => Math.max(1, value - 1))}
              >
                <Minus />
              </button>
              <span aria-live="polite">{qty}</span>
              <button type="button" aria-label="Add one" onClick={() => setQty((value) => value + 1)}>
                <Plus />
              </button>
            </div>
            <button type="button" className={`si-add${added ? ' is-added' : ''}`} onClick={add}>
              {added ? (
                <>
                  <Check /> Added
                </>
              ) : (
                'Add to Cart'
              )}
            </button>
          </div>
        </div>
      </div>
    </article>
  )
}

/* 4. Clean photo backgrounds */
function PhotoCompare() {
  return (
    <div className="si-compare">
      <figure>
        <div className="si-photo-now">
          <img src={pint.image} alt="Honey pint, current look" />
        </div>
        <figcaption>Now: white box shows</figcaption>
      </figure>
      <figure>
        <div className="si-photo">
          <img src={pint.image} alt="Honey pint, new look" />
        </div>
        <figcaption>New: warm glow, no box, zooms on hover</figcaption>
      </figure>
    </div>
  )
}

/* 5. Ribbons */
function RibbonCards() {
  const items = [
    { product: pint, ribbon: 'Fan Favorite', tone: 'gold' },
    { product: gallon, ribbon: 'Best Value', tone: 'navy' },
  ]

  return (
    <div className="si-row">
      {items.map(({ product, ribbon, tone }) => (
        <article key={product.id} className="si-card">
          <span className={`si-ribbon is-${tone}`}>{ribbon}</span>
          <div className="si-photo">
            <img src={product.image} alt={`${product.name} ${product.variant}`} />
          </div>
          <div className="si-card-body">
            <h3>
              {product.name} <span className="si-variant-inline">{product.variant}</span>
            </h3>
            <div className="si-footer">
              <span className="si-price">{price(product.price)}</span>
              <button type="button" className="si-add">
                Add to Cart
              </button>
            </div>
          </div>
        </article>
      ))}
    </div>
  )
}

/* 6. Hover to reveal the description */
function QuickViewCard() {
  return (
    <div className="si-row">
      {[beeswax, candles].map((product) => (
        <article key={product.id} className="si-card si-quick">
          <div className="si-photo">
            <img src={product.image} alt={product.name} />
            <div className="si-quick-overlay">
              <p>{product.description}</p>
              <Stars rating={product.rating} />
            </div>
          </div>
          <div className="si-card-body si-quick-body">
            <div>
              <h3>{product.name}</h3>
              <p className="si-variant">{product.variant}</p>
            </div>
            <button type="button" className="si-quick-add" aria-label={`Add ${product.name}`}>
              <span>{price(product.price)}</span>
              <Plus />
            </button>
          </div>
        </article>
      ))}
    </div>
  )
}

/* 7. Featured product banner */
function FeaturedBanner() {
  return (
    <article className="si-featured">
      <div className="si-featured-text">
        <span className="si-featured-tag">Fresh This Season</span>
        <h3>Raw, Local Honey</h3>
        <p>
          Straight from Brad&rsquo;s hives in Sun, LA. Never heated, never filtered, just the way
          the bees made it.
        </p>
        <button type="button" className="si-add si-add-lg">
          <ShoppingBag /> Shop Honey
        </button>
      </div>
      <div className="si-featured-photo">
        <img src={gallon.image} alt="" className="is-back" />
        <img src={pint.image} alt="Jars of Brad's honey" />
      </div>
    </article>
  )
}

export default function ShopIdeas() {
  return (
    <div className="si-page">
      <title>Shop Ideas - Brad&apos;s Bees</title>
      <meta name="robots" content="noindex" />

      <section className="si-intro">
        <h1>Shop Look Ideas</h1>
        <p>
          Ways to make the products more appealing. Everything is clickable, but nothing here
          touches the real cart.
        </p>
        <Link to="/ideas">&larr; Back to all ideas</Link>
      </section>

      <Idea
        number={1}
        title="One Honey Card With a Size Picker"
        why="Right now Pint, Quart, and Gallon are three cards that all say “Honey.” One card with size buttons is easier to compare and leaves room for other products. The photo and price change as you pick."
      >
        <SizePickerCard />
      </Idea>

      <Idea
        number={2}
        title="Free Shipping Progress Bar"
        why="The cart already gives free shipping over $50. Showing how close they are nudges people to add one more jar. This would sit at the top of the shop or in the cart."
      >
        <ShippingProgress />
      </Idea>

      <Idea
        number={3}
        title="Quantity Picker + “Added” Check"
        why="Shoppers can pick how many before adding, and the button turns green with a check so they know it worked."
      >
        <div className="si-row si-row-single">
          <StepperCard />
        </div>
      </Idea>

      <Idea
        number={4}
        title="Cleaner Product Photos"
        why="The jar photos have white backgrounds that show up as boxes on the gray. A soft honey glow behind every photo hides the box and makes all five products match."
      >
        <PhotoCompare />
      </Idea>

      <Idea
        number={5}
        title="Ribbon Labels"
        why="A small ribbon draws the eye to the products Brad wants to push."
        ask="Which products are actually the favorites or best value? These two are placeholders."
      >
        <RibbonCards />
      </Idea>

      <Idea
        number={6}
        title="Hover to See Details"
        why="Shorter, cleaner cards. The description and rating slide up over the photo on hover, and the price doubles as the add button."
      >
        <QuickViewCard />
      </Idea>

      <Idea
        number={7}
        title="Featured Product Banner"
        why="A big banner above the product grid that tells the story of the honey before people start shopping."
        ask="Is the honey raw and unfiltered? Adjust the wording to match how he processes it."
      >
        <FeaturedBanner />
      </Idea>
    </div>
  )
}
