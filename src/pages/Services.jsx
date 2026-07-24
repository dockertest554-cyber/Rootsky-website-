import { Link } from 'react-router-dom'
import PageHero from '../components/PageHero.jsx'
import { Icon, useReveal } from '../components/ui.jsx'

const services = [
  { icon: 'map', title: 'Connectivity Mapping', text: 'Continuous, auto-discovered maps of every device, service, and dependency across your environment — the foundation for everything else.', points: ['Auto-discovery & topology', 'Dependency tracing', 'Impact analysis', 'Audit-ready exports'] },
  { icon: 'network', title: 'Network Infrastructure', text: 'We design and deploy resilient wired, wireless, and SD-WAN networks engineered to scale without surprises.', points: ['Architecture & design', 'Deployment & migration', 'Performance tuning', 'Documentation'] },
  { icon: 'cloud', title: 'Cloud & Hosting', text: 'Plan and run workloads across public, private, and hybrid cloud — optimized for cost, speed, and reliability.', points: ['Cloud migration', 'Hybrid architecture', 'Cost optimization', 'Backup & recovery'] },
  { icon: 'shield', title: 'Security & Compliance', text: 'Continuous hardening, monitoring, and controls that keep you audit-ready and ahead of threats.', points: ['Threat monitoring', 'Hardening & patching', 'Access controls', 'Compliance support'] },
  { icon: 'gear', title: 'Managed IT', text: 'A dedicated team keeping your systems patched, monitored, and supported around the clock.', points: ['24/7 helpdesk', 'Proactive maintenance', 'Asset management', 'SLA-backed response'] },
  { icon: 'pulse', title: 'Monitoring & Insight', text: 'Live dashboards and intelligent alerting that turn telemetry into clear, actionable decisions.', points: ['Real-time dashboards', 'Smart alerting', 'Capacity planning', 'Reporting'] },
]

export default function Services() {
  useReveal()
  return (
    <>
      <PageHero
        crumb="Services"
        eyebrow="What we do"
        title="Everything your infrastructure needs, under one roof."
        intro="From mapping a tangled environment to running it day to day, our services cover the full lifecycle of modern IT."
      />

      <section className="section">
        <div className="wrap grid grid-2">
          {services.map((s) => {
            const I = Icon[s.icon]
            return (
              <article className="card reveal" key={s.title}>
                <div className="ic"><I /></div>
                <h3>{s.title}</h3>
                <p>{s.text}</p>
                <ul className="checklist">
                  {s.points.map((p) => (
                    <li key={p}><span className="tick"><Icon.check /></span>{p}</li>
                  ))}
                </ul>
              </article>
            )
          })}
        </div>
      </section>

      <section className="section mist">
        <div className="wrap">
          <div className="section-head reveal">
            <span className="eyebrow">How an engagement runs</span>
            <h2>A predictable process, every time.</h2>
          </div>
          <div className="grid grid-4">
            {[
              { n: '01', t: 'Discover', d: 'We map your environment and surface what\'s really there.' },
              { n: '02', t: 'Design', d: 'We plan the fixes, upgrades, and architecture with your team.' },
              { n: '03', t: 'Deliver', d: 'We implement with minimal disruption and full documentation.' },
              { n: '04', t: 'Operate', d: 'We monitor and manage so it keeps running and improving.' },
            ].map((v) => (
              <div className="value reveal" key={v.t}>
                <h3>{v.t}</h3>
                <p>{v.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section tight">
        <div className="wrap">
          <div className="cta-band reveal">
            <h2>Not sure where to start?</h2>
            <p>Tell us what you're running. We'll recommend where mapping and managed support would help most.</p>
            <Link to="/contact" className="btn btn-primary">Request a consultation <span className="arrow"><Icon.arrow /></span></Link>
          </div>
        </div>
      </section>
    </>
  )
}