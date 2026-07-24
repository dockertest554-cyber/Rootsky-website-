import { useEffect, useState } from 'react'
import { Icon } from './ui.jsx'

/* ---- Video carousel / shuffle ---- */
export function VideoCarousel({ slides }) {
  const [i, setI] = useState(0)
  const n = slides.length
  const go = (d) => setI((p) => (p + d + n) % n)

  // gentle auto-advance
  useEffect(() => {
    const t = setInterval(() => setI((p) => (p + 1) % n), 6000)
    return () => clearInterval(t)
  }, [n])

  return (
    <div className="vcar fade-up">
      <div className="vcar-stage">
        {slides.map((s, idx) => (
          <div className={`vcar-slide ${idx === i ? 'on' : ''}`} key={s.label}>
            <span className="vcar-badge">Watch Demo</span>
            <div className="vcar-play" role="button" aria-label={`Play ${s.label}`}>
              <svg viewBox="0 0 24 24" width="30" height="30" fill="currentColor"><path d="M8 5v14l11-7z" /></svg>
            </div>
            <div className="vcar-cap">
              <div className="vt">{s.label}</div>
              <div className="vs">{s.sub}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="vcar-controls">
        <div className="vcar-dots">
          {slides.map((s, idx) => (
            <button key={s.label} className={`vcar-dot ${idx === i ? 'on' : ''}`} aria-label={`Go to ${s.label}`} onClick={() => setI(idx)} />
          ))}
        </div>
        <div className="vcar-arrows">
          <button className="vcar-arrow" aria-label="Previous" onClick={() => go(-1)}><span style={{ transform: 'rotate(180deg)', display: 'inline-flex' }}><Icon.arrow /></span></button>
          <button className="vcar-arrow" aria-label="Next" onClick={() => go(1)}><Icon.arrow /></button>
        </div>
      </div>

      <div className="vcar-thumbs">
        {slides.map((s, idx) => (
          <button key={s.label} className={`vcar-thumb ${idx === i ? 'on' : ''}`} onClick={() => setI(idx)}>{s.label}</button>
        ))}
      </div>
    </div>
  )
}

/* ---- Floating product showcase (big parallax mockup + chips) ---- */
export function FloatingShowcase({ children }) {
  const [live, setLive] = useState({ dev: 4128, thr: 8.4 })
  useEffect(() => {
    const t = setInterval(() => setLive({
      dev: 4100 + Math.floor(Math.random() * 90),
      thr: +(7.9 + Math.random() * 0.9).toFixed(1),
    }), 2200)
    return () => clearInterval(t)
  }, [])
  return (
    <div className="showcase-stage">
      <div className="showcase-chip sc-1">
        <span className="sc-ic" style={{ background: 'rgba(34,211,238,0.2)', color: '#67E8F9' }}><Icon.pulse /></span>
        <div><div className="sc-t">Throughput</div><div className="sc-v">{live.thr} Gbps</div></div>
      </div>
      <div className="showcase-chip sc-2">
        <span className="sc-ic" style={{ background: 'rgba(196,255,53,0.16)', color: '#C4FF35' }}><Icon.check /></span>
        <div><div className="sc-t">Devices up</div><div className="sc-v">{live.dev.toLocaleString()}</div></div>
      </div>
      <div className="showcase-chip sc-3">
        <span className="sc-ic" style={{ background: 'rgba(122,92,255,0.25)', color: '#C4B5FF' }}><Icon.bell /></span>
        <div><div className="sc-t">AI Alerts</div><div className="sc-v">Prioritized</div></div>
      </div>
      <div className="showcase-frame">{children}</div>
    </div>
  )
}