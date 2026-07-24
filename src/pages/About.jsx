import { Link } from 'react-router-dom'
import PageHero from '../components/PageHero.jsx'
import { Icon, useReveal, NetworkCanvas } from '../components/ui.jsx'

const values = [
  { n: '01', t: 'Clarity first', d: 'We start every engagement by making the invisible visible. You can\'t fix what you can\'t see.' },
  { n: '02', t: 'Built to last', d: 'We design infrastructure for the long run — resilient, documented, and easy to hand off.' },
  { n: '03', t: 'Security by default', d: 'Hardening and monitoring aren\'t add-ons. They\'re baked into everything we deliver.' },
  { n: '04', t: 'Partners, not vendors', d: 'We stay close to your team, learn your environment, and grow with your roadmap.' },
]

export default function About() {
  useReveal()
  return (
    <>
      <PageHero
        crumb="About Us"
        eyebrow="Who we are"
        title="We make complex systems make sense."
        intro="Rootsky Systems is an IT solutions company helping technology teams see, secure, and scale the infrastructure they depend on."
      />

      <section className="section">
        <div className="wrap split">
          <div className="reveal">
            <span className="eyebrow">Our story</span>
            <h2>Born from one frustration: nobody could see the whole picture.</h2>
            <p>We kept watching capable IT teams firefight outages they couldn't trace — because their systems had grown faster than anyone could document. So we built a practice around one idea: map everything first, then everything else gets easier.</p>
            <p>Today we help organizations across the IT industry turn sprawling, undocumented environments into clear connectivity maps — and then design, secure, and run the infrastructure on top of them.</p>
          </div>
          <div className="panel reveal">
            <video
              src="/about-story.mp4"
              autoPlay
              muted
              loop
              playsInline
              preload="none"
              aria-hidden="true"
            />
          </div>
        </div>
      </section>

      <section className="section mist">
        <div className="wrap">
          <div className="section-head reveal">
            <span className="eyebrow">What drives us</span>
            <h2>Principles we don't compromise on.</h2>
          </div>
          <div className="grid grid-2">
            {values.map((v) => (
              <div className="value reveal" key={v.n}>
                <div className="num">{v.n}</div>
                <h3>{v.t}</h3>
                <p>{v.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section ink">
        <div className="wrap">
          <div className="grid grid-4" style={{ textAlign: 'center' }}>
            {[['2018', 'Founded'], ['80+', 'Specialists'], ['500+', 'Networks mapped'], ['12', 'Countries served']].map(([n, l]) => (
              <div className="reveal" key={l}>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: '2.6rem', fontWeight: 600 }}>{n}</div>
                <div style={{ color: '#93A2B8', fontSize: '0.9rem' }}>{l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section tight">
        <div className="wrap">
          <div className="cta-band reveal">
            <h2>Want to see how we work?</h2>
            <p>We're always happy to walk a team through what a connectivity-first approach looks like.</p>
            <Link to="/contact" className="btn btn-primary">Start a conversation <span className="arrow"><Icon.arrow /></span></Link>
          </div>
        </div>
      </section>
    </>
  )
}