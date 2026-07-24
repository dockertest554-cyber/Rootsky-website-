import { useState } from 'react'
import PageHero from '../components/PageHero.jsx'
import { Icon, useReveal } from '../components/ui.jsx'

const empty = { name: '', email: '', company: '', message: '' }

export default function Contact() {
  useReveal()
  const [form, setForm] = useState(empty)
  const [status, setStatus] = useState({ state: 'idle', msg: '' })

  const update = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const submit = async (e) => {
    e.preventDefault()
    setStatus({ state: 'loading', msg: '' })
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.message || 'Something went wrong.')
      setStatus({ state: 'ok', msg: 'Thanks — your message is in. We\'ll reply within one business day.' })
      setForm(empty)
    } catch (err) {
      setStatus({ state: 'err', msg: err.message })
    }
  }

  return (
    <>
      <PageHero
        crumb="Contact Us"
        eyebrow="Get in touch"
        title="Let's talk about your environment."
        intro="Tell us what you're running and what you're trying to fix. We'll point you to the right next step."
      />

      <section className="section">
        <div className="wrap split tight" style={{ alignItems: 'start' }}>
          <div className="reveal">
            <span className="eyebrow">Send a message</span>
            <h2 style={{ fontSize: '1.8rem', margin: '14px 0 24px' }}>We read every one.</h2>

            <form className="form-grid" onSubmit={submit} noValidate>
              {status.state === 'ok' && <div className="alert ok">{status.msg}</div>}
              {status.state === 'err' && <div className="alert err">{status.msg}</div>}

              <div className="row-2">
                <div className="field">
                  <label htmlFor="name">Full name</label>
                  <input id="name" name="name" value={form.name} onChange={update} required placeholder="Jane Doe" />
                </div>
                <div className="field">
                  <label htmlFor="email">Work email</label>
                  <input id="email" name="email" type="email" value={form.email} onChange={update} required placeholder="jane@company.com" />
                </div>
              </div>
              <div className="field">
                <label htmlFor="company">Company</label>
                <input id="company" name="company" value={form.company} onChange={update} placeholder="Company name" />
              </div>
              <div className="field">
                <label htmlFor="message">How can we help?</label>
                <textarea id="message" name="message" value={form.message} onChange={update} required placeholder="Tell us about your network, systems, or the problem you're seeing…" />
              </div>
              <button className="btn btn-primary" disabled={status.state === 'loading'}>
                {status.state === 'loading' ? 'Sending…' : <>Send message <span className="arrow"><Icon.arrow /></span></>}
              </button>
            </form>
          </div>

          <div className="reveal">
            <div className="info-card">
              <div className="info-row">
                <div className="ic"><Icon.mail /></div>
                <div><h4>Email</h4><a href="mailto:sales@rootskysystem.com">sales@rootskysystem.com</a></div>
              </div>
              <div className="info-row">
                <div className="ic"><Icon.phone /></div>
                <div><h4>Phone</h4><a href="tel:+919625564207">+91 96255 64207</a></div>
              </div>
              <div className="info-row">
                <div className="ic"><Icon.pin /></div>
                <div><h4>Office</h4><p>Gaur Saundaryam, Noida Ext.<br />Uttar Pradesh</p></div>
              </div>
            </div>
            <div className="info-card" style={{ marginTop: 22 }}>
              <h4 style={{ marginBottom: 8 }}>Support hours</h4>
              <p style={{ color: 'var(--steel)' }}>Managed clients get 24/7 monitoring and response. General enquiries are answered Mon–Fri, 9am–6pm.</p>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}