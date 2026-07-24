import { useEffect, useRef, useState } from 'react'
import { Icon } from './ui.jsx'

/* ---- Animated count-up (fires when scrolled into view) ---- */
export function Counter({ to, decimals = 0, suffix = '', prefix = '', duration = 1700 }) {
  const ref = useRef(null)
  const [val, setVal] = useState(0)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    let raf, started = false
    const run = () => {
      const t0 = performance.now()
      const tick = (t) => {
        const p = Math.min((t - t0) / duration, 1)
        const e = 1 - Math.pow(1 - p, 3)
        setVal(to * e)
        if (p < 1) raf = requestAnimationFrame(tick)
      }
      raf = requestAnimationFrame(tick)
    }
    const io = new IntersectionObserver((es) => es.forEach((en) => {
      if (en.isIntersecting && !started) { started = true; run(); io.disconnect() }
    }), { threshold: 0.4 })
    io.observe(el)
    return () => { io.disconnect(); cancelAnimationFrame(raf) }
  }, [to, duration])
  const shown = decimals ? val.toFixed(decimals) : Math.round(val).toLocaleString()
  return <span ref={ref}>{prefix}{shown}{suffix}</span>
}

/* ---- FAQ accordion ---- */
export function Faq({ items }) {
  const [open, setOpen] = useState(0)
  return (
    <div className="faq">
      {items.map((it, i) => (
        <div className={`faq-item ${open === i ? 'open' : ''}`} key={i}>
          <button className="faq-q" onClick={() => setOpen(open === i ? -1 : i)}>
            <span>{it.q}</span>
            <span className="faq-ic" aria-hidden="true"><Icon.arrow /></span>
          </button>
          <div className="faq-a"><p>{it.a}</p></div>
        </div>
      ))}
    </div>
  )
}

/* ---- Video placeholder card (until real demos are added) ---- */
export function VideoCard({ label, sub, tall = false }) {
  return (
    <div className={`glass video-card fade-up ${tall ? 'tall' : ''}`}>
      <span className="video-badge">Demo coming soon</span>
      <div className="video-play">
        <svg viewBox="0 0 24 24" width="26" height="26" fill="currentColor"><path d="M8 5v14l11-7z" /></svg>
      </div>
      <div className="video-cap">
        <div className="video-t">{label}</div>
        {sub && <div className="video-s">{sub}</div>}
      </div>
    </div>
  )
}

/* ---- Floating stat card for the hero ---- */
export function FloatCard({ icon, title, value, tone = 'accent', className = '', style }) {
  const I = Icon[icon] || Icon.pulse
  return (
    <div className={`glass float-card ${className}`} style={style}>
      <span className={`fc-ic tone-${tone}`}><I /></span>
      <div>
        <div className="fc-title">{title}</div>
        <div className="fc-value">{value}</div>
      </div>
    </div>
  )
}