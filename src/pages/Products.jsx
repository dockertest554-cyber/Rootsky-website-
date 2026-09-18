import { Link } from 'react-router-dom'
import { Icon, useReveal, NetworkCanvas } from '../components/ui.jsx'
import { DashboardMock, GlobeNetwork, FlowDiagram } from '../components/graphics.jsx'

const features = [
  { icon: 'map', t: 'Auto-discovery', d: 'Point OCTENIX at your environment and it finds every device, service, and link on its own.' },
  { icon: 'network', t: 'Dependency tracing', d: 'See exactly what depends on what - across on-prem, cloud, and hybrid.' },
  { icon: 'pulse', t: 'Live health & latency', d: 'Real-time status on every node and connection, updated continuously.' },
  { icon: 'shield', t: 'Impact analysis', d: 'Change one thing and instantly see everything it touches before it breaks.' },
  { icon: 'gear', t: 'Smart alerting', d: 'Get notified the moment a link degrades - not after users complain.' },
  { icon: 'cloud', t: 'Audit-ready exports', d: 'Export clean topology maps for compliance, planning, and reviews.' },
]

const flow = [
  { icon: <Icon.network />, t: 'Connect', d: 'Add your networks, cloud accounts, and devices in minutes.' },
  { icon: <Icon.map />, t: 'Discover', d: 'OCTENIX scans and draws your full live topology automatically.' },
  { icon: <Icon.pulse />, t: 'Monitor', d: 'Watch health, latency, and dependencies on one live canvas.' },
  { icon: <Icon.shield />, t: 'Act', d: 'Catch issues early and plan changes with confidence.' },
]


export default function Products() {
  useReveal()
  return (
    <>
      {/* PRODUCT HERO */}
      <header className="hero">
        <NetworkCanvas className="hero-canvas" density={1.1} />
        <div className="hero-fade" />
        <div className="wrap hero-inner" style={{ maxWidth: 'var(--maxw)' }}>
          <div className="hero-grid">
            <div>
              <div className="crumb" style={{ marginBottom: 14 }}>Home <span>/</span> Products</div>
              <div className="octenix-lockup" style={{ marginBottom: 20 }}>
                <img src="/octenix-full.png" alt="OCTENIX" style={{ height: 64, width: 'auto' }} />
              </div>
              <h1>Your network, <span className="accent">mapped in real time.</span></h1>
              <p>The connectivity-mapping platform that turns tangled infrastructure into one live, searchable map you can actually trust.</p>
              <div className="hero-actions">
                <Link to="/contact" className="btn btn-primary">Request a demo <span className="arrow"><Icon.arrow /></span></Link>
              </div>
            </div>
            <div className="hero-art"><DashboardMock /></div>
          </div>
        </div>
      </header>

      {/* WHAT IT IS */}
      <section className="section">
        <div className="wrap split tight">
          <div className="reveal">
            <span className="eyebrow">What is OCTENIX?</span>
            <h2 style={{ fontSize: 'clamp(1.9rem,3.6vw,2.7rem)', margin: '16px 0 18px' }}>One live map of everything you run.</h2>
            <p style={{ color: 'var(--steel)', marginBottom: 16 }}>Most teams only learn how their systems connect when something breaks. OCTENIX draws the full picture continuously - every server, service, link, and dependency on a single canvas that updates in real time.</p>
            <ul className="checklist">
              {['No manual diagrams to maintain', 'Works across on-prem, cloud, and hybrid', 'Always current, never out of date'].map((t) => (
                <li key={t}><span className="tick"><Icon.check /></span>{t}</li>
              ))}
            </ul>
          </div>
          <div className="reveal hero-art" style={{ animation: 'gfxFloat 8s ease-in-out infinite' }}>
            <GlobeNetwork />
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="section mist dotbg">
        <div className="wrap">
          <div className="section-head reveal">
            <span className="eyebrow">Capabilities</span>
            <h2>Everything you need to see and control your network.</h2>
          </div>
          <div className="grid grid-3">
            {features.map((f) => {
              const I = Icon[f.icon]
              return (
                <article className="card reveal" key={f.t}>
                  <div className="ic"><I /></div>
                  <h3>{f.t}</h3>
                  <p>{f.d}</p>
                </article>
              )
            })}
          </div>
        </div>
      </section>

      {/* LIVE MAP SHOWCASE */}
      <section className="section ink">
        <div className="wrap split">
          <div className="reveal">
            <span className="eyebrow on-dark">See it live</span>
            <h2>A canvas that moves with your infrastructure.</h2>
            <p>Nodes light up as traffic flows. Links change color as health shifts. Zoom from a whole data center down to a single dependency - without ever redrawing a thing.</p>
            <Link to="/contact" className="btn btn-primary" style={{ marginTop: 14 }}>Get a walkthrough <span className="arrow"><Icon.arrow /></span></Link>
          </div>
          <div className="panel reveal"><NetworkCanvas density={2} /></div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="section">
        <div className="wrap">
          <div className="section-head reveal">
            <span className="eyebrow">How it works</span>
            <h2>Live in four steps.</h2>
          </div>
          <div className="reveal"><FlowDiagram steps={flow} /></div>
        </div>
      </section>

      {/* CTA */}
      <section className="section tight">
        <div className="wrap">
          <div className="cta-band reveal">
            <span className="eyebrow on-dark">Ready to see your map?</span>
            <h2>Let's map your environment with OCTENIX.</h2>
            <p>Book a demo and we'll show you a live map of your own infrastructure - usually within a day.</p>
            <Link to="/contact" className="btn btn-primary">Request a demo <span className="arrow"><Icon.arrow /></span></Link>
          </div>
        </div>
      </section>
    </>
  )
}