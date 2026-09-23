import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Icon, useReveal } from '../components/ui.jsx'
import { Magnetic, useScrollFade } from '../components/anim.jsx'
import { Counter, Faq } from '../components/Sections.jsx'
import { FloatingShowcase } from '../components/carousel.jsx'
import Hero from '../components/Hero.jsx'

/* ─── data ────────────────────────────────────────────── */
const clients = [
  'NetServ Global', 'ClearPath Telecom', 'Axon Infrastructure',
  'VistaBridge Networks', 'Meridian IT Solutions', 'TowerLink Systems',
]

const features = [
  {
    icon: 'pulse', label: 'Real-time visibility',
    body: 'Every device, link, and bandwidth metric — mapped and live.',
    media: 'packet',
  },
  {
    icon: 'bolt', label: 'AI-driven intelligence',
    body: 'Predicts failures, surfaces root causes, cuts alert noise.',
    media: 'ai',
  },
  {
    icon: 'gear', label: 'Automated resolution',
    body: 'From detection to fix — automated workflows, zero guesswork.',
    media: 'globe',
  },
]

const stats = [
  { to: 5000, suffix: '+', label: 'Devices monitored' },
  { to: 100,  suffix: '+', label: 'Enterprise customers' },
  { to: 99.99, decimals: 2, suffix: '%', label: 'Uptime SLA' },
  { to: 10,   suffix: 'M+', label: 'Metrics / day' },
]

const industries = [
  ['route', 'ISPs'], ['network', 'Telecom'], ['server', 'Data Centers'],
  ['camera', 'Surveillance'], ['building', 'Enterprise'], ['city', 'Smart City'],
]

const testimonials = [
  {
    quote: 'OCTENIX catches outages before customers notice. Our uptime has never been better.',
    name: 'Rajesh Mehta', role: 'VP of Operations', company: 'NetServ Global',
  },
  {
    quote: 'One view for our entire core and access network. Fault management in minutes, not hours.',
    name: 'Priya Sharma', role: 'Network Manager', company: 'ClearPath Telecom',
  },
  {
    quote: 'Rack, server, and environmental monitoring in one place made SLA reporting effortless.',
    name: 'Ankit Desai', role: 'Data Center Lead', company: 'Axon Infrastructure',
  },
]

const faqs = [
  { q: 'What can OCTENIX monitor?',        a: 'Network devices, routers, switches, firewalls, servers, applications, bandwidth, performance, logs, availability, and full topology — across multiple vendors.' },
  { q: 'Cloud or on-premise?',              a: 'Both. OCTENIX supports cloud, on-premise, and hybrid deployments to fit your infrastructure and compliance needs.' },
  { q: 'How does the AI engine work?',      a: 'It predicts failures, finds root causes, prioritises alerts, detects anomalies, and recommends fixes — reducing noise and speeding resolution.' },
  { q: 'Multi-vendor support?',             a: 'Yes — via SNMP and open APIs across routers, switches, firewalls, wireless controllers, cameras, and telecom devices.' },
  { q: 'How quickly can we be up?',         a: 'Auto-discovery maps your environment fast. Most teams are monitoring within a single deployment cycle.' },
]

const FEATURE_VIDEO = {
  packet: '/feat-visibility.mp4',
  ai: '/feat-intelligence.mp4',
  globe: '/feat-resolution.mp4',
}

function FeatureMedia({ kind }) {
  return (
    <video
      className="hp-feat-video"
      src={FEATURE_VIDEO[kind]}
      autoPlay
      muted
      loop
      playsInline
      preload="none"
      aria-hidden="true"
    />
  )
}

/* ─── component ───────────────────────────────────────── */
export default function Home() {
  useReveal()
  useScrollFade()

  /* mouse-glow on glass cards */
  useEffect(() => {
    const cards = document.querySelectorAll('.h-glass')
    const move = (e) => {
      const r = e.currentTarget.getBoundingClientRect()
      e.currentTarget.style.setProperty('--mx', `${e.clientX - r.left}px`)
      e.currentTarget.style.setProperty('--my', `${e.clientY - r.top}px`)
    }
    cards.forEach(c => c.addEventListener('mousemove', move))
    return () => cards.forEach(c => c.removeEventListener('mousemove', move))
  }, [])

  return (
    <div className="hp">

      <Hero />

      {/* ═══════════════════════════════════════
          BEFORE / AFTER — floating card layout
      ═══════════════════════════════════════ */}
      <section className="hp-section">
        <div className="wrap">
          <div className="hp-ba-wrap">

            {/* left — headline + description */}
            <div className="hp-ba-copy fade-up">
              <span className="hp-kicker">The shift</span>
              <h2 className="hp-title">
                Legacy tools react.<br />OCTENIX predicts.
              </h2>
              <p className="hp-body">
                Stop fighting fires. OCTENIX learns normal behaviour
                across your entire network and warns your team before
                anything breaks — turning firefighting into foresight.
              </p>
              <Link to="/products" className="hp-link">
                Explore the platform <Icon.arrow />
              </Link>
            </div>

            {/* right — two stacked floating glass cards */}
            <div className="hp-ba-cards">
              <div className="h-glass hp-ba-card hp-card-old fade-up">
                <span className="hp-card-tag">Traditional NMS</span>
                <h3>Reactive & manual</h3>
                <ul className="hp-card-list">
                  {['Alerts fire after users complain', 'Hours of manual root-cause work', 'Blind spots across vendors', 'Noise drowns signal'].map(t => (
                    <li key={t}><span className="hp-x"><Icon.arrow /></span>{t}</li>
                  ))}
                </ul>
              </div>

              <div className="h-glass hp-ba-card hp-card-new fade-up">
                <span className="hp-card-tag hp-tag-new">OCTENIX</span>
                <h3>Predictive & automated</h3>
                <ul className="hp-card-list">
                  {['Failures caught before impact', 'AI narrows to root cause in seconds', 'Full multi-vendor coverage', 'Only what matters, nothing else'].map(t => (
                    <li key={t}><span className="hp-check"><Icon.check /></span>{t}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          PRODUCT SHOWCASE — floating video
      ═══════════════════════════════════════ */}
      <section className="hp-section hp-showcase-section" id="showcase">
        <div className="wrap" style={{ textAlign: 'center' }}>
          <span className="hp-kicker" style={{ justifyContent: 'center', display: 'inline-flex' }}>The platform</span>
          <h2 className="hp-title" style={{ margin: '16px auto 48px', maxWidth: '22ch' }}>
            One console for your whole network.
          </h2>
          <FloatingShowcase>
            <video src="/octenix-demo.mp4" autoPlay muted loop playsInline preload="metadata" />
          </FloatingShowcase>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          FEATURES — 3-column cards with live canvas
      ═══════════════════════════════════════ */}
      <section className="hp-section">
        <div className="wrap">
          <div className="hp-feat-header fade-up">
            <span className="hp-kicker">Capabilities</span>
            <h2 className="hp-title" style={{ maxWidth: '22ch' }}>
              Built for every layer of your stack.
            </h2>
          </div>

          <div className="hp-feat-grid">
            {features.map((f, i) => {
              const I = Icon[f.icon]
              return (
                <div className="h-glass hp-feat-card fade-up" key={f.label} style={{ '--delay': `${i * 0.12}s` }}>
                  <div className="hp-feat-media">
                    <FeatureMedia kind={f.media} />
                  </div>
                  <div className="hp-feat-body">
                    <span className="hp-feat-ic"><I /></span>
                    <h3>{f.label}</h3>
                    <p>{f.body}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          STATS — 4 floating counters
      ═══════════════════════════════════════ */}
      <section className="hp-section hp-stats-section">
        <div className="wrap">
          <div className="hp-stats-grid">
            {stats.map(s => (
              <div className="h-glass hp-stat fade-up" key={s.label}>
                <div className="hp-stat-num">
                  <Counter to={s.to} suffix={s.suffix} decimals={s.decimals || 0} />
                </div>
                <div className="hp-stat-label">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          INDUSTRIES — pill strip
      ═══════════════════════════════════════ */}
      <section className="hp-section">
        <div className="wrap" style={{ textAlign: 'center' }}>
          <span className="hp-kicker" style={{ justifyContent: 'center', display: 'inline-flex' }}>Built for</span>
          <h2 className="hp-title" style={{ margin: '16px auto 40px', maxWidth: '24ch' }}>
            The networks that keep the world running.
          </h2>
          <div className="hp-ind-strip fade-up">
            {industries.map(([ic, t]) => {
              const I = Icon[ic]
              return (
                <div className="hp-ind-pill" key={t}>
                  <span className="hp-ind-ic"><I /></span>
                  <span>{t}</span>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          TESTIMONIALS
      ═══════════════════════════════════════ */}
      <section className="hp-section">
        <div className="wrap">
          <div className="hp-tst-header fade-up">
            <span className="hp-kicker">Customer voices</span>
            <h2 className="hp-title">Teams that sleep better.</h2>
          </div>
          <div className="hp-tst-grid">
            {testimonials.map((t, i) => (
              <div className="h-glass hp-tst-card fade-up" key={t.name} style={{ '--delay': `${i * 0.1}s` }}>
                <div className="hp-tst-stars" aria-hidden="true">★★★★★</div>
                <p className="hp-tst-quote">&ldquo;{t.quote}&rdquo;</p>
                <div className="hp-tst-who">
                  <span className="hp-tst-ava" aria-hidden="true">{t.name[0]}</span>
                  <div>
                    <div className="hp-tst-name">{t.name}</div>
                    <div className="hp-tst-role">{t.role}, {t.company}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          INTEGRATIONS
      ═══════════════════════════════════════ */}
      <section className="hp-section">
        <div className="wrap">
          <div className="hp-feat-header fade-up">
            <span className="hp-kicker">Integrations</span>
            <h2 className="hp-title" style={{ maxWidth: '20ch' }}>Works with your entire stack.</h2>
            <p className="hp-body" style={{ marginTop: 14, maxWidth: '54ch' }}>
              OCTENIX connects to the vendors and platforms you already run — via SNMP, open APIs, and native connectors.
            </p>
          </div>
          <div className="hp-integ-grid fade-up">
            {['Cisco', 'Juniper', 'MikroTik', 'Ubiquiti', 'Fortinet', 'Aruba', 'Huawei', 'VMware', 'AWS', 'Azure', 'Allied Telesis', 'D-Link'].map(n => (
              <div className="hp-integ-item" key={n}>{n}</div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          SECURITY & COMPLIANCE
      ═══════════════════════════════════════ */}
      <section className="hp-section">
        <div className="wrap">
          <div className="hp-feat-header fade-up">
            <span className="hp-kicker">Security &amp; compliance</span>
            <h2 className="hp-title" style={{ maxWidth: '22ch' }}>Trusted where downtime is not an option.</h2>
          </div>
          <div className="hp-sec-grid">
            {[
              ['lock', 'Enterprise Security', 'Role-based access, encryption, and hardened controls.'],
              ['shield', 'Compliance Ready', 'Built to support your audit and regulatory needs.'],
              ['pulse', '99.99% Availability', 'Redundant, highly available architecture.'],
              ['gear', '24/7 Support', 'Expert engineers whenever you need them.'],
            ].map(([ic, t, d], i) => {
              const I = Icon[ic]
              return (
                <div className="h-glass hp-sec-card fade-up" key={t} style={{ '--delay': `${i * 0.1}s` }}>
                  <span className="hp-sec-ic"><I /></span>
                  <h3>{t}</h3>
                  <p>{d}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          FAQ
      ═══════════════════════════════════════ */}
      <section className="hp-section">
        <div className="wrap">
          <div className="hp-faq-wrap">
            <div className="hp-faq-left fade-up">
              <span className="hp-kicker">FAQ</span>
              <h2 className="hp-title">Questions,<br />answered.</h2>
              <p className="hp-body" style={{ marginTop: 16 }}>
                Still have questions?{' '}
                <Link to="/contact" className="hp-inline-link">Talk to our team →</Link>
              </p>
            </div>
            <div className="hp-faq-right fade-up">
              <Faq items={faqs} />
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          CTA — dark band
      ═══════════════════════════════════════ */}
      <section className="hp-cta-section">
        <div className="wrap">
          <div className="hp-cta-inner">
            <div className="hp-cta-glow" aria-hidden="true" />
            <span className="hp-kicker hp-kicker-light" style={{ justifyContent: 'center', display: 'inline-flex' }}>Get started</span>
            <h2 className="hp-cta-title">Give your network intelligence.</h2>
            <p className="hp-cta-sub">
              See OCTENIX map, monitor, and predict across your entire infrastructure — live, on your network.
            </p>
            <div className="hp-cta-actions">
              <Magnetic>
                <Link to="/contact" className="btn btn-primary">
                  Request a live demo <span className="arrow"><Icon.arrow /></span>
                </Link>
              </Magnetic>
              <Magnetic>
                <Link to="/contact" className="btn hp-ghost-dark">
                  Talk to an engineer
                </Link>
              </Magnetic>
            </div>
          </div>
        </div>
      </section>

    </div>
  )
}