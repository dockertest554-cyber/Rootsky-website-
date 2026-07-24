import { useState } from 'react'
import PageHero from '../components/PageHero.jsx'
import { Icon, useReveal } from '../components/ui.jsx'

const roles = [
  { title: 'Network Infrastructure Engineer', dept: 'Engineering', type: 'Full-time', loc: 'Remote' },
  { title: 'Connectivity Mapping Specialist', dept: 'Engineering', type: 'Full-time', loc: 'Hybrid' },
  { title: 'Cloud Solutions Architect', dept: 'Cloud', type: 'Full-time', loc: 'Remote' },
  { title: 'Security Operations Analyst', dept: 'Security', type: 'Full-time', loc: 'On-site' },
  { title: 'IT Support Technician', dept: 'Managed IT', type: 'Full-time', loc: 'On-site' },
]

const perks = [
  { t: 'Remote-friendly', d: 'Work where you do your best thinking. Most roles are remote or hybrid.' },
  { t: 'Real ownership', d: 'Small teams, big scope. Your work ships and your name is on it.' },
  { t: 'Always learning', d: 'Certifications, labs, and conference budgets are on us.' },
  { t: 'Health & balance', d: 'Comprehensive cover and genuine respect for time off.' },
]

const empty = { name: '', email: '', role: roles[0].title, message: '' }

export default function Careers() {
  useReveal()
  const [form, setForm] = useState(empty)
  const [status, setStatus] = useState({ state: 'idle', msg: '' })
  const update = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const apply = (roleTitle) => {
    setForm((f) => ({ ...f, role: roleTitle }))
    document.getElementById('apply')?.scrollIntoView({ behavior: 'smooth' })
  }

  const submit = async (e) => {
    e.preventDefault()
    setStatus({ state: 'loading', msg: '' })
    try {
      const res = await fetch('/api/careers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.message || 'Something went wrong.')
      setStatus({ state: 'ok', msg: 'Application received. If it\'s a fit, we\'ll be in touch soon.' })
      setForm(empty)
    } catch (err) {
      setStatus({ state: 'err', msg: err.message })
    }
  }

  return (
    <>
      <PageHero
        crumb="Careers"
        eyebrow="Join us"
        title="Help us make complex systems make sense."
        intro="We're a team of infrastructure people who like hard problems and clear maps. If that's you, let's talk."
      />

      <section className="section">
        <div className="wrap">
          <div className="section-head reveal">
            <span className="eyebrow">Why Rootsky</span>
            <h2>A place to do your best infrastructure work.</h2>
          </div>
          <div className="grid grid-4">
            {perks.map((p) => (
              <div className="value reveal" key={p.t}>
                <h3 style={{ marginTop: 0 }}>{p.t}</h3>
                <p>{p.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section mist">
        <div className="wrap">
          <div className="section-head reveal">
            <span className="eyebrow">Open roles</span>
            <h2>Where we need you.</h2>
          </div>
          <div className="grid" style={{ gap: 16 }}>
            {roles.map((r) => (
              <div className="job reveal" key={r.title}>
                <div>
                  <h3 style={{ fontSize: '1.15rem' }}>{r.title}</h3>
                  <div className="meta">
                    <span className="tag">{r.dept}</span>
                    <span className="tag">{r.type}</span>
                    <span className="tag">{r.loc}</span>
                  </div>
                </div>
                <button className="btn btn-ghost" onClick={() => apply(r.title)}>
                  Apply <span className="arrow"><Icon.arrow /></span>
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section" id="apply">
        <div className="wrap" style={{ maxWidth: 720 }}>
          <div className="section-head reveal" style={{ marginBottom: 32 }}>
            <span className="eyebrow">Apply</span>
            <h2>Send us your application.</h2>
            <p>Don't see a perfect match? Pick the closest role and tell us what you do — we keep great people in mind.</p>
          </div>
          <form className="form-grid reveal" onSubmit={submit} noValidate>
            {status.state === 'ok' && <div className="alert ok">{status.msg}</div>}
            {status.state === 'err' && <div className="alert err">{status.msg}</div>}
            <div className="row-2">
              <div className="field">
                <label htmlFor="cname">Full name</label>
                <input id="cname" name="name" value={form.name} onChange={update} required placeholder="Jane Doe" />
              </div>
              <div className="field">
                <label htmlFor="cemail">Email</label>
                <input id="cemail" name="email" type="email" value={form.email} onChange={update} required placeholder="jane@email.com" />
              </div>
            </div>
            <div className="field">
              <label htmlFor="role">Role</label>
              <select id="role" name="role" value={form.role} onChange={update}>
                {roles.map((r) => <option key={r.title}>{r.title}</option>)}
              </select>
            </div>
            <div className="field">
              <label htmlFor="cmsg">Tell us about yourself</label>
              <textarea id="cmsg" name="message" value={form.message} onChange={update} required placeholder="Your experience, a link to your work or LinkedIn, and why this role…" />
            </div>
            <button className="btn btn-primary" disabled={status.state === 'loading'}>
              {status.state === 'loading' ? 'Submitting…' : <>Submit application <span className="arrow"><Icon.arrow /></span></>}
            </button>
          </form>
        </div>
      </section>
    </>
  )
}
