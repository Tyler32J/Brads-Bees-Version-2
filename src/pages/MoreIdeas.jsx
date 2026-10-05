import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  Award,
  Bell,
  CakeSlice,
  CalendarDays,
  Coffee,
  Flame,
  Gift,
  Heart,
  MapPin,
  ShieldCheck,
  Sparkles,
  Star,
} from 'lucide-react'
import { products } from '../data/products'
import { siteInfo } from '../data/siteInfo'
import marketPhoto from '../assets/gallery/gallery-24.webp'
import flavorsPhoto from '../assets/gallery/gallery-05.webp'
import './MoreIdeas.css'

// Preview page for more site ideas. Not linked from the navbar.

const pint = products.find((product) => product.id === 'honey-pint')
const candles = products.find((product) => product.id === 'beeswax-candles')

function Idea({ number, title, where, why, ask, children }) {
  return (
    <section className="mi-idea">
      <header className="mi-idea-header">
        <span className="mi-idea-number">Idea {number}</span>
        <h2>{title}</h2>
        <p>
          <strong>Would go on:</strong> {where}
        </p>
        <p>
          <strong>Why:</strong> {why}
        </p>
        {ask && (
          <p className="mi-idea-ask">
            <strong>Confirm with Brad:</strong> {ask}
          </p>
        )}
      </header>
      <div className="mi-idea-stage">{children}</div>
    </section>
  )
}

const trustItems = [
  { icon: ShieldCheck, label: 'Fully Insured' },
  { icon: Heart, label: 'Bees Relocated, Never Killed' },
  { icon: Award, label: 'Since 2018' },
  { icon: Star, label: '5-Star Reviews' },
]

const flavors = [
  { name: 'Spring Wildflower', notes: 'Light, floral, and mild. Great in tea.', tone: 'light' },
  { name: 'Summer Blend', notes: 'Golden and balanced with a fruity finish.', tone: 'medium' },
  { name: 'Fall Harvest', notes: 'Dark, rich, and bold. Made for baking.', tone: 'dark' },
]

const honeyUses = [
  { icon: Coffee, title: 'In Your Tea', text: 'Stir a spoonful into hot tea or coffee in place of sugar.' },
  { icon: CakeSlice, title: 'Baking', text: 'Swap honey for sugar to keep breads and cakes moist.' },
  { icon: Sparkles, title: 'Lip Balm', text: 'Melt our beeswax with oil for a simple homemade balm.' },
  { icon: Flame, title: 'Candles', text: 'Beeswax candles burn clean with a light honey scent.' },
]

const marketDays = [
  { day: 'Saturday', time: '8:00 AM - 12:00 PM', place: 'Covington Farmers Market' },
  { day: 'Sunday', time: '9:00 AM - 1:00 PM', place: 'Folsom Community Market' },
]

function RestockSignup() {
  const [sent, setSent] = useState(false)

  return (
    <div className="mi-restock">
      <Bell aria-hidden="true" />
      <div>
        <h3>Get a Text When Fresh Honey Is Ready</h3>
        <p>Honey sells out fast after each harvest. We&rsquo;ll let you know the moment it&rsquo;s back.</p>
        {sent ? (
          <p className="mi-restock-done">You&rsquo;re on the list! (Demo only, nothing was sent.)</p>
        ) : (
          <form
            className="mi-restock-form"
            onSubmit={(event) => {
              event.preventDefault()
              setSent(true)
            }}
          >
            <label className="mi-visually-hidden" htmlFor="restock-phone">
              Phone number
            </label>
            <input id="restock-phone" type="tel" placeholder="(985) 555-0123" required />
            <button type="submit">Notify Me</button>
          </form>
        )}
      </div>
    </div>
  )
}

export default function MoreIdeas() {
  const bundlePrice = pint.price + candles.price * 2

  return (
    <div className="mi-page">
      <title>More Ideas - Brad&apos;s Bees</title>
      <meta name="robots" content="noindex" />

      <section className="mi-intro">
        <h1>More Site Ideas</h1>
        <p>
          New ideas that haven&rsquo;t come up yet. All text, dates, and prices are placeholders to
          check with Brad.
        </p>
        <Link to="/ideas">&larr; Back to all ideas</Link>
      </section>

      <Idea
        number={1}
        title="Trust Bar Under the Hero"
        where="Home page, right under the big header"
        why="Answers “can I trust this guy?” in one glance, before anyone scrolls. Uses facts already on the site."
      >
        <ul className="mi-trust">
          {trustItems.map(({ icon: Icon, label }) => (
            <li key={label}>
              <Icon aria-hidden="true" />
              {label}
            </li>
          ))}
        </ul>
      </Idea>

      <Idea
        number={2}
        title="Find Us at the Market"
        where="Shop page or Home page"
        why="Lots of honey buyers would rather pick up a jar in person. This uses the market booth photo already in the gallery."
        ask="Which markets does he go to, and on what days? These are made up."
      >
        <div className="mi-market">
          <img src={marketPhoto} alt="Brad's Bees booth at a farmers market" />
          <div className="mi-market-info">
            <h3>Find Us at the Market</h3>
            <p>Stop by the booth to taste the honey and say hi.</p>
            <ul>
              {marketDays.map((market) => (
                <li key={market.place}>
                  <CalendarDays aria-hidden="true" />
                  <div>
                    <strong>
                      {market.day} &middot; {market.time}
                    </strong>
                    <span>
                      <MapPin aria-hidden="true" /> {market.place}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Idea>

      <Idea
        number={3}
        title="Honey Flavors"
        where="Shop page, above the products"
        why="Honey tastes different depending on the season and flowers. Tasting notes make the honey feel special, not just “a jar of honey.” The gallery already has a photo of three different honeys side by side."
        ask="What are his honey types? The photo jars are labeled “Pa, Wi, La.” These names and notes are placeholders."
      >
        <div className="mi-flavors">
          <img src={flavorsPhoto} alt="Three jars of honey in different shades" />
          <div className="mi-flavor-list">
            {flavors.map((flavor) => (
              <div key={flavor.name} className="mi-flavor">
                <span className={`mi-swatch is-${flavor.tone}`} aria-hidden="true" />
                <div>
                  <h3>{flavor.name}</h3>
                  <p>{flavor.notes}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Idea>

      <Idea
        number={4}
        title="Gift Bundle"
        where="Shop page, as its own product"
        why="Honey and candles make great gifts, especially around the holidays. A bundle raises the order size."
        ask="Would he sell a bundle, and at what price? The discount is a placeholder."
      >
        <article className="mi-bundle">
          <span className="mi-bundle-tag">
            <Gift aria-hidden="true" /> Great Gift
          </span>
          <div className="mi-bundle-photos">
            <img src={pint.image} alt="Honey pint" />
            <span aria-hidden="true">+</span>
            <img src={candles.image} alt="Beeswax candles" />
          </div>
          <div className="mi-bundle-body">
            <h3>The Sweet Gift Set</h3>
            <p>1 pint of raw honey + 2 beeswax candles, ready to give.</p>
            <div className="mi-bundle-price">
              <s>${bundlePrice.toFixed(2)}</s>
              <strong>${(bundlePrice - 6).toFixed(2)}</strong>
              <span>Save $6</span>
            </div>
          </div>
        </article>
      </Idea>

      <Idea
        number={5}
        title="Ways to Use Honey & Beeswax"
        where="Shop page, under the products"
        why="Gives people ideas (and reasons) to buy more. It also helps the site show up in searches like “uses for raw honey.”"
      >
        <div className="mi-uses">
          {honeyUses.map(({ icon: Icon, title, text }) => (
            <div key={title} className="mi-use">
              <span>
                <Icon aria-hidden="true" />
              </span>
              <h3>{title}</h3>
              <p>{text}</p>
            </div>
          ))}
        </div>
      </Idea>

      <Idea
        number={6}
        title="Restock Text Alerts"
        where="Shop page, or on a product when it sells out"
        why="When honey sells out between harvests, this keeps buyers instead of losing them."
        ask="Does he want to text people when honey is back? This would need a real texting service hooked up later."
      >
        <RestockSignup />
      </Idea>

      <Idea
        number={7}
        title="Hives for Heroes Spotlight"
        where="Home page or Education page"
        why="The footer already links to Hives for Heroes. A short section explains why it matters to Brad and shows the business gives back."
        ask="What's his connection to Hives for Heroes? This wording is a guess."
      >
        <div className="mi-heroes">
          <div className="mi-heroes-badge" aria-hidden="true">
            <Heart />
          </div>
          <div>
            <h3>Proud Supporter of Hives for Heroes</h3>
            <p>
              Hives for Heroes connects military veterans with beekeeping and mentors who help them
              find purpose and community. Brad&rsquo;s Bees is proud to support their mission.
            </p>
            <a href={siteInfo.community.url} target="_blank" rel="noopener noreferrer">
              Learn about Hives for Heroes &rarr;
            </a>
          </div>
        </div>
      </Idea>

      <Idea
        number={8}
        title="Follow Along on Social Media"
        where="Footer, and the Gallery page"
        why="Removal videos and hive photos do great on Facebook and Instagram. Linking them gives people a reason to come back."
        ask="Does he have Facebook or Instagram pages? Links would go here."
      >
        <div className="mi-social">
          <h3>Follow the Bees</h3>
          <p>Removal videos, hive check-ins, and honey harvest days.</p>
          <div className="mi-social-buttons">
            <a href="#facebook" className="is-facebook" onClick={(event) => event.preventDefault()}>
              <span aria-hidden="true">f</span> Facebook
            </a>
            <a href="#instagram" className="is-instagram" onClick={(event) => event.preventDefault()}>
              <span aria-hidden="true">◎</span> Instagram
            </a>
          </div>
        </div>
      </Idea>
    </div>
  )
}
