import { Link } from 'react-router-dom'
import { siteInfo } from '../data/siteInfo'
import './Ideas.css'

// Preview page for site ideas to run past Brad. Not linked from the navbar.
// Once an idea is approved, move it to its real page and delete it from here.

function IdeaBlock({ number, title, where, why, ask, children }) {
  return (
    <section className="idea-block">
      <header className="idea-header">
        <span className="idea-number">Idea {number}</span>
        <h2>{title}</h2>
        <p className="idea-meta">
          <strong>Would go on:</strong> {where}
        </p>
        <p className="idea-meta">
          <strong>Why:</strong> {why}
        </p>
        <p className="idea-ask">
          <strong>Confirm with Brad:</strong> {ask}
        </p>
      </header>
      <div className="idea-preview">{children}</div>
    </section>
  )
}

const faqs = [
  {
    q: 'Do you kill the bees?',
    a: 'No. We remove the colony alive and relocate it to one of our bee yards.',
  },
  {
    q: 'How much does a bee removal cost?',
    a: 'Every job is different, so we start with a free estimate. Price depends on where the hive is and how much needs to be opened up.',
  },
  {
    q: 'Can you fix the wall or soffit after?',
    a: 'Let us know when you call and we will talk through what repair looks like for your job.',
  },
  {
    q: 'Do you remove wasps or yellow jackets?',
    a: 'Our focus is honeybees. If you are not sure what you have, send us a photo and we will tell you.',
  },
  {
    q: 'How fast can you come out?',
    a: 'We offer 24/7 emergency service and same-day visits when we can.',
  },
]

const insects = [
  {
    name: 'Honeybee',
    looks: 'Fuzzy, golden-brown with darker bands, about the size of a fingernail.',
    nest: 'Wax comb inside walls, trees, soffits, or out in the open as a swarm cluster.',
    action: 'Call us. We remove them alive.',
    yes: true,
  },
  {
    name: 'Wasp / Yellow Jacket',
    looks: 'Smooth and shiny, bright yellow and black, with a thin waist.',
    nest: 'Papery gray nests, often under eaves or in the ground.',
    action: 'Not a honeybee. A pest control company is the right call.',
  },
  {
    name: 'Bumblebee',
    looks: 'Large, round, and very fuzzy, black and yellow.',
    nest: 'Small nests in the ground, old rodent holes, or insulation.',
    action: 'Usually gentle and best left alone if they are not in the way.',
  },
]

const areas = ['Sun', 'Covington', 'Folsom', 'Franklinton', 'Bush', 'Mandeville']

export default function Ideas() {
  return (
    <div className="ideas-page">
      <title>Site Ideas - Brad&apos;s Bees</title>
      <meta name="robots" content="noindex" />

      <section className="ideas-intro">
        <h1>Site Ideas Preview</h1>
        <p>
          Mockups to go over with Brad. Nothing here is live on the real pages yet, and the text is
          a first draft.
        </p>
        <p className="ideas-more">
          <Link to="/ideas/cart">See cart button ideas &rarr;</Link>
          {' · '}
          <Link to="/ideas/shop">See shop look ideas &rarr;</Link>
          {' · '}
          <Link to="/ideas/more">See more site ideas &rarr;</Link>
          {' · '}
          <Link to="/ideas/extra">See even more ideas &rarr;</Link>
        </p>
      </section>

      <IdeaBlock
        number={1}
        title="Removal FAQ"
        where="Services page, Bee Removal tab (or Contact page)"
        why="Answers the questions people ask on every call, before they pick up the phone. Also helps Google show the site for questions like “do bee removers kill bees.”"
        ask="Are these the right questions? Is the wording right on cost, repairs, and wasps?"
      >
        <div className="faq-list">
          {faqs.map((faq) => (
            <details key={faq.q} className="faq-item">
              <summary>{faq.q}</summary>
              <p>{faq.a}</p>
            </details>
          ))}
        </div>
      </IdeaBlock>

      <IdeaBlock
        number={2}
        title="“Is It a Honeybee?” Guide"
        where="Services page, Bee Removal tab"
        why="People often call a bee remover for wasps. This saves Brad wasted calls and points honeybee callers straight to him."
        ask="Does Brad ever handle wasps or bumblebees, or only honeybees?"
      >
        <div className="insect-grid">
          {insects.map((insect) => (
            <div key={insect.name} className={`insect-card${insect.yes ? ' is-yes' : ''}`}>
              <h3>{insect.name}</h3>
              <p>
                <strong>Looks:</strong> {insect.looks}
              </p>
              <p>
                <strong>Nest:</strong> {insect.nest}
              </p>
              <p className="insect-action">{insect.action}</p>
            </div>
          ))}
        </div>
      </IdeaBlock>

      <IdeaBlock
        number={3}
        title="“Found a Swarm?” Quick Steps"
        where="Home page, under the hero"
        why="Someone who just found a swarm is stressed and on their phone. Three clear steps calm them down and end with calling Brad."
        ask="Is this the advice he gives people on the phone?"
      >
        <div className="swarm-box">
          <h3>Found a Swarm? Here&rsquo;s What to Do</h3>
          <ol className="swarm-steps">
            <li>
              <span>1</span>
              <strong>Don&rsquo;t spray them.</strong> Bug spray kills the bees and makes removal
              harder.
            </li>
            <li>
              <span>2</span>
              <strong>Keep people and pets back.</strong> Swarms are usually calm, but give them
              space.
            </li>
            <li>
              <span>3</span>
              <strong>Call or text a photo.</strong> We can often tell from a photo what you have.
            </li>
          </ol>
          <a className="swarm-call" href={siteInfo.phoneHref}>
            Call {siteInfo.phone}
          </a>
        </div>
      </IdeaBlock>

      <IdeaBlock
        number={4}
        title="Service Area"
        where="Home page or Contact page"
        why="People search “bee removal near me” or “bee removal Covington.” Listing towns helps the site show up for those searches and tells visitors Brad comes to them."
        ask="Which towns and parishes does he actually cover? These are guesses based on where his reviews come from."
      >
        <div className="area-box">
          <h3>Proudly Serving the Northshore</h3>
          <ul className="area-list">
            {areas.map((area) => (
              <li key={area}>{area}</li>
            ))}
          </ul>
          <p>
            Not sure if we cover you? <Link to="/contact">Just ask.</Link>
          </p>
        </div>
      </IdeaBlock>

      <IdeaBlock
        number={5}
        title="Swarm Season Banner"
        where="Top of every page, only in spring"
        why="Spring is the busiest time for swarm calls. A banner that can be switched on and off makes the phone number impossible to miss."
        ask="What months is swarm season for him? Does he want this?"
      >
        <div className="season-banner">
          🐝 <strong>Swarm season is here.</strong> Seeing a cluster of bees?{' '}
          <a href={siteInfo.phoneHref}>Call {siteInfo.phone}</a>
        </div>
      </IdeaBlock>
    </div>
  )
}
