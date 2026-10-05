import { Link } from 'react-router-dom'
import { Mail } from 'lucide-react'
import { educationPrograms, learningTopics, missionIcon } from '../data/education'
import { siteInfo } from '../data/siteInfo'
import './Education.css'

export default function Education() {
  return (
    <div className="edu-page">
      <title>Education - Brad&apos;s Bees</title>

      <section className="edu-hero">
        <div className="edu-container">
          <h1 className="edu-hero-title">Education &amp; Outreach</h1>
          <p className="edu-hero-subtitle">
            Inspiring the next generation to appreciate and protect our vital pollinators through
            hands-on learning experiences
          </p>
        </div>
      </section>

      <section className="edu-mission-wrap">
        <div className="edu-container">
          <div className="edu-mission-card">
            <div className="edu-icon-circle edu-mission-icon" aria-hidden="true">
              <img src={missionIcon} alt="" />
            </div>
            <h2 className="edu-mission-title">Our Mission</h2>
            <p className="edu-mission-text">
              At Brad&apos;s Bees, we believe education is the key to conservation. Through
              interactive presentations, live demonstrations, and community workshops, we teach
              students and adults about the critical role bees play in our ecosystem and how we can
              all help protect these essential pollinators.
            </p>
          </div>
        </div>
      </section>

      <section className="edu-programs">
        <div className="edu-container">
          <h2 className="edu-section-title">Educational Programs</h2>
          <div className="edu-program-grid">
            {educationPrograms.map((program) => (
              <article key={program.title} className="edu-program-card">
                <div className="edu-icon-circle" aria-hidden="true">
                  <img src={program.icon} alt="" />
                </div>
                <h3>{program.title}</h3>
                <p>{program.description}</p>
                <ul>
                  {program.highlights.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="edu-learn">
        <div className="edu-container">
          <h2 className="edu-section-title">What You&apos;ll Learn</h2>
          <div className="edu-learn-grid">
            {learningTopics.map((topic) => (
              <article key={topic.title} className="edu-learn-card">
                <h3>{topic.title}</h3>
                <ul>
                  {topic.points.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="edu-cta">
        <div className="edu-container">
          <h2>Book an Educational Program</h2>
          <p>
            Interested in bringing Brad&apos;s Bees to your school, organization, or event? Get in
            touch to discuss custom programs and availability.
          </p>
          <div className="edu-cta-actions">
            <a className="edu-btn edu-btn-email" href={`mailto:${siteInfo.email}`}>
              <Mail className="edu-btn-icon" aria-hidden="true" />
              {siteInfo.email}
            </a>
            <Link className="edu-btn edu-btn-message" to="/contact">
              Send Us a Message
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
