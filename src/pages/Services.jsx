import { useState } from 'react'
import { Link } from 'react-router-dom'
import Tabs from '../components/ui/Tabs'
import { serviceTabs } from '../data/services'
import { siteInfo } from '../data/siteInfo'
import './Services.css'

function CheckItem({ children }) {
  return (
    <li>
      <span className="check-icon" aria-hidden="true">
        ✓
      </span>{' '}
      {children}
    </li>
  )
}

function ServiceHero({ title, text, image, alt }) {
  return (
    <div className="service-hero">
      <h1>{title}</h1>
      <p>{text}</p>
      <img src={image} alt={alt} className="service-hero-image" />
    </div>
  )
}

function FeatureGrid({ features, wide }) {
  return (
    <div className={`service-features${wide ? ' service-features-wide' : ''}`}>
      {features.map((feature) => (
        <div key={feature.title} className="service-feature-card">
          <span className="feature-icon-wrap">
            <img src={feature.icon} alt="" className="feature-icon" />
          </span>
          <h3>{feature.title}</h3>
          <p>{feature.text}</p>
        </div>
      ))}
    </div>
  )
}

function ProcessSteps({ title, steps }) {
  return (
    <section className="service-panel removal-process">
      <h2>{title}</h2>
      <div className="process-steps">
        {steps.map((step, i) => (
          <div key={step.title} className="process-step">
            <div className="step-number">{i + 1}</div>
            <h4>{step.title}</h4>
            <p>{step.text}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

function CropList({ title, text, groups }) {
  return (
    <section className="service-panel pollination-crops">
      <h2>{title}</h2>
      <p className="crops-intro">{text}</p>
      <div className="crop-columns">
        {groups.map((group) => (
          <div key={group.title} className="crop-col">
            <h3>{group.title}</h3>
            <ul>
              {group.items.map((item) => (
                <CheckItem key={item}>{item}</CheckItem>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <p className="crop-note">
        Don&rsquo;t see your crop listed?{' '}
        <strong>
          <Link to="/contact">Contact us!</Link>
        </strong>{' '}
        We&rsquo;re happy to discuss pollination services for any crop.
      </p>
    </section>
  )
}

function PackageCard({ heading, title, price, items }) {
  return (
    <section className="service-packages">
      <h2>{heading}</h2>
      <div className="package-card">
        <h3>{title}</h3>
        <h4>{price}</h4>
        <ul>
          {items.map((item) => (
            <CheckItem key={item}>{item}</CheckItem>
          ))}
        </ul>
      </div>
    </section>
  )
}

function ServiceCta({ title, text }) {
  return (
    <section className="service-contact">
      <h2>{title}</h2>
      <p>{text}</p>
      <div className="contact-actions">
        <a className="call-btn" href={siteInfo.phoneHref}>
          {siteInfo.phone}
        </a>
        <Link className="msg-btn" to="/contact">
          Send Us a Message
        </Link>
      </div>
    </section>
  )
}

export default function Services() {
  const [activeId, setActiveId] = useState(serviceTabs[0].id)
  const service = serviceTabs.find((tab) => tab.id === activeId)

  function handleTabChange(id) {
    setActiveId(id)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className="services-page">
      <title>Services - Brad&apos;s Bees</title>

      <Tabs
        label="Services"
        tabs={serviceTabs}
        activeId={activeId}
        onChange={handleTabChange}
      />

      <div
        className="service-content"
        role="tabpanel"
        id={`panel-${service.id}`}
        aria-labelledby={`tab-${service.id}`}
      >
        <ServiceHero {...service.hero} />
        <FeatureGrid features={service.features} wide={service.wideFeatures} />
        {service.process && <ProcessSteps {...service.process} />}
        {service.crops && <CropList {...service.crops} />}
        <PackageCard {...service.package} />
        <ServiceCta {...service.cta} />
      </div>
    </div>
  )
}
