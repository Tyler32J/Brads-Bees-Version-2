import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  ArrowUp,
  Camera,
  Flower2,
  Gift,
  Home as HomeIcon,
  Leaf,
  Package,
  Snowflake,
  Store,
  Sun,
  TreeDeciduous,
  Truck,
  Zap,
} from 'lucide-react'
import { siteInfo } from '../data/siteInfo'
import './ExtraIdeas.css'

// Preview page for even more site ideas. Not linked from the navbar.

function Idea({ number, title, where, why, ask, children }) {
  return (
    <section className="xi-idea">
      <header className="xi-idea-header">
        <span className="xi-idea-number">Idea {number}</span>
        <h2>{title}</h2>
        <p>
          <strong>Would go on:</strong> {where}
        </p>
        <p>
          <strong>Why:</strong> {why}
        </p>
        {ask && (
          <p className="xi-idea-ask">
            <strong>Confirm with Brad:</strong> {ask}
          </p>
        )}
      </header>
      <div className="xi-idea-stage">{children}</div>
    </section>
  )
}

/* 1. Where are the bees? */
const beeSpots = [
  {
    id: 'swarm',
    icon: TreeDeciduous,
    label: 'Hanging on a branch',
    title: 'Sounds like a swarm',
    text: 'A swarm is a cluster of bees resting while they look for a new home. They are usually calm and often move on within a day or two, so call soon.',
    steps: ['Usually no cutting or repairs needed', 'Keep people and pets back', 'Text us a photo for the fastest answer'],
  },
  {
    id: 'wall',
    icon: HomeIcon,
    label: 'In a wall, roof, or soffit',
    title: 'Sounds like an established hive',
    text: 'Bees living inside a building have usually built comb. Getting all of it out keeps new bees from moving back in later.',
    steps: ['We open the area to reach all the comb', 'Bees are relocated, never killed', 'We’ll talk about repairs before we start'],
  },
  {
    id: 'tree',
    icon: Leaf,
    label: 'Inside a tree or log',
    title: 'Sounds like a tree colony',
    text: 'Colonies in hollow trees can sometimes be moved with the section of log they live in, keeping the hive together.',
    steps: ['Depends on the tree and where the hive is', 'Text us a photo of the opening', 'We’ll figure out the best way to move them'],
  },
  {
    id: 'other',
    icon: Package,
    label: 'Somewhere else',
    title: 'Bees turn up in all kinds of places',
    text: 'Sheds, grills, water meter boxes, old furniture. If you are not sure what you are dealing with, a photo tells us a lot.',
    steps: ['Keep your distance', 'Don’t spray them', 'Call or text a photo'],
  },
]

function BeeFinder() {
  const [spotId, setSpotId] = useState(beeSpots[0].id)
  const spot = beeSpots.find((item) => item.id === spotId)

  return (
    <div className="xi-finder">
      <h3>Where are the bees?</h3>
      <div className="xi-finder-options">
        {beeSpots.map(({ id, icon: Icon, label }) => (
          <button key={id} type="button" aria-pressed={id === spotId} onClick={() => setSpotId(id)}>
            <Icon aria-hidden="true" />
            {label}
          </button>
        ))}
      </div>
      <div key={spot.id} className="xi-finder-result">
        <h4>{spot.title}</h4>
        <p>{spot.text}</p>
        <ul>
          {spot.steps.map((step) => (
            <li key={step}>{step}</li>
          ))}
        </ul>
        <a href={siteInfo.phoneHref}>Call {siteInfo.phone}</a>
      </div>
    </div>
  )
}

/* 2. Pickup or local delivery (no shipping) */
const DELIVERY_RADIUS_MILES = 50

function PickupChoice() {
  const [method, setMethod] = useState('pickup')

  return (
    <div className="xi-pickup">
      <h3>How would you like to get your honey?</h3>
      <div className="xi-pickup-options" role="radiogroup" aria-label="Pickup or delivery">
        <button
          type="button"
          role="radio"
          aria-checked={method === 'pickup'}
          onClick={() => setMethod('pickup')}
        >
          <Store aria-hidden="true" />
          <span>
            <strong>Pick Up</strong>
            <small>From Brad in Sun, LA</small>
          </span>
        </button>
        <button
          type="button"
          role="radio"
          aria-checked={method === 'delivery'}
          onClick={() => setMethod('delivery')}
        >
          <Truck aria-hidden="true" />
          <span>
            <strong>Local Delivery</strong>
            <small>Within {DELIVERY_RADIUS_MILES} miles</small>
          </span>
        </button>
      </div>

      <div key={method} className="xi-pickup-details">
        {method === 'pickup' ? (
          <p>
            After you order, Brad will text you to set up a pickup time and send the address.
          </p>
        ) : (
          <>
            <p>
              Brad delivers personally to homes within {DELIVERY_RADIUS_MILES} miles of Sun, LA.
              He&rsquo;ll text you to set up a delivery time.
            </p>
            <label htmlFor="delivery-address">Delivery address</label>
            <input id="delivery-address" type="text" placeholder="Street, city, ZIP" />
          </>
        )}
      </div>
    </div>
  )
}

/* 3. Adopt a hive */
const adoptPerks = [
  { icon: Gift, text: 'A jar of honey from your hive' },
  { icon: Camera, text: 'Photo updates through the season' },
  { icon: Flower2, text: 'A personalized adoption certificate' },
]

/* 4. Beekeeping year */
const seasons = [
  { icon: Flower2, name: 'Spring', text: 'Colonies grow fast and swarm season peaks. Busiest time for removals.' },
  { icon: Sun, name: 'Summer', text: 'The honey flow is on. Bees fill the comb and harvest begins.' },
  { icon: Leaf, name: 'Fall', text: 'Last harvest and getting the hives ready for cooler weather.' },
  { icon: Snowflake, name: 'Winter', text: 'Bees cluster to stay warm. Time to repair gear and plan.' },
]

/* 5. Bee facts */
const facts = [
  { big: '1/12', unit: 'teaspoon', text: 'of honey is all one worker bee makes in her whole life.' },
  { big: '2 million', unit: 'flowers', text: 'are visited to make a single pound of honey.' },
  { big: '200+', unit: 'beats per second', text: 'is how fast a honeybee flaps her wings. That is the buzz.' },
  { big: '∞', unit: 'shelf life', text: 'Sealed honey doesn’t spoil. Edible honey has been found in ancient tombs.' },
]

function FactCard({ big, unit, text }) {
  const [flipped, setFlipped] = useState(false)

  return (
    <button
      type="button"
      className={`xi-fact${flipped ? ' is-flipped' : ''}`}
      onClick={() => setFlipped((value) => !value)}
      aria-label={flipped ? `${big} ${unit} ${text}` : `Bee fact: ${big} ${unit}. Tap to reveal.`}
    >
      <span className="xi-fact-inner">
        <span className="xi-fact-front">
          <strong>{big}</strong>
          <small>{unit}</small>
          <em>Tap to reveal</em>
        </span>
        <span className="xi-fact-back">{text}</span>
      </span>
    </button>
  )
}

/* 8. Back to top */
function BackToTopDemo() {
  return (
    <div className="xi-totop-stage">
      <div className="xi-totop-lines" aria-hidden="true">
        {Array.from({ length: 7 }, (_, i) => (
          <span key={i} />
        ))}
      </div>
      <button type="button" className="xi-totop" aria-label="Back to top">
        <ArrowUp aria-hidden="true" />
      </button>
    </div>
  )
}

export default function ExtraIdeas() {
  return (
    <div className="xi-page">
      <title>Extra Ideas - Brad&apos;s Bees</title>
      <meta name="robots" content="noindex" />

      <section className="xi-intro">
        <h1>Even More Site Ideas</h1>
        <p>
          Eight new ideas that haven&rsquo;t come up before. Everything is clickable. Prices and
          details are placeholders to check with Brad.
        </p>
        <Link to="/ideas">&larr; Back to all ideas</Link>
      </section>

      <Idea
        number={1}
        title="“Where Are the Bees?” Helper"
        where="Services page, Bee Removal tab"
        why="People tap where the bees are and instantly see what to expect. It answers their first questions and ends with the phone number."
        ask="Is this how he'd describe each kind of job?"
      >
        <BeeFinder />
      </Idea>

      <Idea
        number={2}
        title="Pickup or Local Delivery at Checkout"
        where="Checkout page (replaces shipping)"
        why="Brad doesn't ship. Customers either pick up from his house or he delivers within 50 miles. The pickup address is only sent after someone orders, so his home address isn't posted on the site."
        ask="Is there a delivery fee or an order minimum for delivery?"
      >
        <PickupChoice />
      </Idea>

      <Idea
        number={3}
        title="Adopt a Hive"
        where="Shop page, as a gift option"
        why="A popular gift idea at other beekeepers. People “sponsor” a hive for a year and get honey and updates. It brings in money outside of honey season."
        ask="Would he do this, and at what price? $75 is a placeholder."
      >
        <article className="xi-adopt">
          <div className="xi-adopt-hex" aria-hidden="true">
            🐝
          </div>
          <div>
            <span className="xi-adopt-tag">Perfect Gift</span>
            <h3>Adopt a Hive</h3>
            <p>Sponsor one of Brad&rsquo;s hives for a year and follow along as your bees make honey.</p>
            <ul>
              {adoptPerks.map(({ icon: Icon, text }) => (
                <li key={text}>
                  <Icon aria-hidden="true" />
                  {text}
                </li>
              ))}
            </ul>
            <div className="xi-adopt-buy">
              <strong>$75</strong>
              <span>/ year</span>
              <button type="button">Adopt Now</button>
            </div>
          </div>
        </article>
      </Idea>

      <Idea
        number={4}
        title="A Year in the Hive"
        where="Education page"
        why="Shows what happens with the bees each season. It's educational and explains why removals spike in spring and honey runs out in winter."
        ask="Adjust the timing to match Louisiana's seasons."
      >
        <ol className="xi-seasons">
          {seasons.map(({ icon: Icon, name, text }) => (
            <li key={name}>
              <span className="xi-season-icon">
                <Icon aria-hidden="true" />
              </span>
              <h3>{name}</h3>
              <p>{text}</p>
            </li>
          ))}
        </ol>
      </Idea>

      <Idea
        number={5}
        title="Tap-to-Reveal Bee Facts"
        where="Education page or Home page"
        why="A fun, hands-on bit that kids on school visits (and adults) will play with. Tap a card to flip it."
      >
        <div className="xi-facts">
          {facts.map((fact) => (
            <FactCard key={fact.unit} {...fact} />
          ))}
        </div>
      </Idea>

      <Idea
        number={6}
        title="Map on the Contact Page"
        where="Contact page"
        why="Shows at a glance where Brad is based so people know if he's nearby. Tapping it opens directions."
        ask="Should it show the town only (safer for privacy) or an exact address?"
      >
        <div className="xi-map">
          <iframe
            title="Map of Sun, Louisiana"
            src="https://maps.google.com/maps?q=Sun%2C%20LA%2070463&z=10&output=embed"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
          <div className="xi-map-card">
            <strong>Based in Sun, LA</strong>
            <span>Serving the surrounding area</span>
          </div>
        </div>
      </Idea>

      <Idea
        number={7}
        title="Wholesale & Bulk Orders"
        where="Shop page, at the bottom"
        why="Coffee shops, restaurants, and gift stores love local honey. One small section could land a regular big customer."
        ask="Is he able to sell honey in bulk to businesses?"
      >
        <div className="xi-wholesale">
          <Zap aria-hidden="true" />
          <div>
            <h3>Local Business? Let&rsquo;s Talk Honey.</h3>
            <p>
              We supply local honey for cafés, restaurants, and gift shops. Ask about bulk pricing.
            </p>
          </div>
          <Link to="/contact">Ask About Wholesale</Link>
        </div>
      </Idea>

      <Idea
        number={8}
        title="Back-to-Top Button"
        where="Every page, shown after scrolling down"
        why="The home and gallery pages are very long on phones. A small button takes people back to the menu with one tap."
      >
        <BackToTopDemo />
      </Idea>
    </div>
  )
}
