import { useEffect, useRef, useState } from 'react'
import { Icon } from './ui.jsx'

/* ============================================================
   PacketMap - a living network: nodes pulse, packets flow
   along links, one node raises an alert now and then.
   ============================================================ */
export function PacketMap({ className = '' }) {
  const ref = useRef(null)
  const started = useRef(false)
  useEffect(() => {
    const canvas = ref.current
    if (!canvas) return
    let cleanup = null

    const initCanvas = () => {
      if (started.current) return
      started.current = true
      const ctx = canvas.getContext('2d')
      const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      let raf, w, h, dpr, nodes, edges, packets, alertT = 0, alertNode = -1

      const build = () => {
        const r = canvas.getBoundingClientRect()
        dpr = Math.min(window.devicePixelRatio || 1, 2)
        w = canvas.width = r.width * dpr; h = canvas.height = r.height * dpr
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
        const W = r.width, H = r.height
        const count = Math.max(16, Math.floor((W * H) / 26000))
        nodes = Array.from({ length: count }, () => ({
          x: Math.random() * W, y: Math.random() * H,
          vx: (Math.random() - 0.5) * 0.12, vy: (Math.random() - 0.5) * 0.12,
          r: Math.random() * 2 + 2, ph: Math.random() * Math.PI * 2,
        }))
        edges = []
        nodes.forEach((a, i) => {
          const near = nodes.map((b, j) => ({ j, d: Math.hypot(a.x - b.x, a.y - b.y) }))
            .filter((o) => o.j !== i).sort((p, q) => p.d - q.d).slice(0, 2)
          near.forEach((o) => { if (!edges.some((e) => (e.a === o.j && e.b === i))) edges.push({ a: i, b: o.j }) })
        })
        packets = edges.slice(0, Math.min(edges.length, 18)).map((e) => ({
          e, t: Math.random(), sp: 0.004 + Math.random() * 0.006,
          col: ['#C4FF35', '#22D3EE', '#A78BFA'][Math.floor(Math.random() * 3)],
        }))
      }

      const frame = (time) => {
        const r = canvas.getBoundingClientRect(); const W = r.width, H = r.height
        ctx.clearRect(0, 0, W, H)
        nodes.forEach((n) => {
          n.x += n.vx; n.y += n.vy
          if (n.x < 0 || n.x > W) n.vx *= -1
          if (n.y < 0 || n.y > H) n.vy *= -1
        })
        ctx.lineWidth = 1
        edges.forEach((e) => {
          const a = nodes[e.a], b = nodes[e.b]
          ctx.strokeStyle = 'rgba(167,139,250,0.14)'
          ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke()
        })
        packets.forEach((p) => {
          p.t += p.sp; if (p.t > 1) { p.t = 0 }
          const a = nodes[p.e.a], b = nodes[p.e.b]
          const x = a.x + (b.x - a.x) * p.t, y = a.y + (b.y - a.y) * p.t
          ctx.fillStyle = p.col
          ctx.shadowColor = p.col; ctx.shadowBlur = 8
          ctx.beginPath(); ctx.arc(x, y, 2.2, 0, Math.PI * 2); ctx.fill()
          ctx.shadowBlur = 0
        })
        alertT -= 1
        if (alertT <= 0) { alertNode = Math.floor(Math.random() * nodes.length); alertT = 220 + Math.random() * 200 }
        nodes.forEach((n, i) => {
          const pulse = 1 + Math.sin(time * 0.003 + n.ph) * 0.25
          const isAlert = i === alertNode && alertT > 140
          ctx.fillStyle = isAlert ? '#FF6B6B' : '#A78BFA'
          if (isAlert) {
            ctx.strokeStyle = 'rgba(255,107,107,0.5)'; ctx.lineWidth = 1.4
            ctx.beginPath(); ctx.arc(n.x, n.y, n.r * 3.4 * pulse, 0, Math.PI * 2); ctx.stroke()
          }
          ctx.beginPath(); ctx.arc(n.x, n.y, n.r * pulse, 0, Math.PI * 2); ctx.fill()
        })
        raf = requestAnimationFrame(frame)
      }

      build()
      if (reduce) frame(0)
      else raf = requestAnimationFrame(frame)
      const ro = new ResizeObserver(build); ro.observe(canvas)
      cleanup = () => { cancelAnimationFrame(raf); ro.disconnect() }
    }

    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) { initCanvas(); io.disconnect() } })
    }, { threshold: 0.1 })
    io.observe(canvas)

    return () => { io.disconnect(); if (cleanup) cleanup() }
  }, [])
  return <canvas ref={ref} className={className} />
}

/* ============================================================
   AICore - data flowing into an intelligent core.
   ============================================================ */
export function AICore({ className = '' }) {
  const ref = useRef(null)
  const started = useRef(false)
  useEffect(() => {
    const canvas = ref.current
    if (!canvas) return
    let cleanup = null

    const initCanvas = () => {
      if (started.current) return
      started.current = true
      const ctx = canvas.getContext('2d')
      const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      let raf, dpr, W, H, cx, cy, sats, packets

      const build = () => {
        const r = canvas.getBoundingClientRect()
        dpr = Math.min(window.devicePixelRatio || 1, 2)
        canvas.width = r.width * dpr; canvas.height = r.height * dpr
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
        W = r.width; H = r.height; cx = W / 2; cy = H / 2
        const R = Math.min(W, H) * 0.38
        sats = Array.from({ length: 10 }, (_, i) => {
          const a = (i / 10) * Math.PI * 2
          return { a, r: R * (0.8 + Math.random() * 0.35), sp: 0.0006 + Math.random() * 0.0008 }
        })
        packets = sats.map((s, i) => ({ s: i, t: Math.random(), sp: 0.006 + Math.random() * 0.006 }))
      }

      const frame = (time) => {
        ctx.clearRect(0, 0, W, H)
        sats.forEach((s) => { s.a += s.sp })
        const pos = sats.map((s) => ({ x: cx + Math.cos(s.a) * s.r, y: cy + Math.sin(s.a) * s.r * 0.62 }))
        pos.forEach((p) => {
          const g = ctx.createLinearGradient(p.x, p.y, cx, cy)
          g.addColorStop(0, 'rgba(34,211,238,0.05)'); g.addColorStop(1, 'rgba(34,211,238,0.35)')
          ctx.strokeStyle = g; ctx.lineWidth = 1
          ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(cx, cy); ctx.stroke()
        })
        packets.forEach((p) => {
          p.t += p.sp; if (p.t > 1) p.t = 0
          const a = pos[p.s]
          const x = a.x + (cx - a.x) * p.t, y = a.y + (cy - a.y) * p.t
          ctx.fillStyle = '#C4FF35'; ctx.shadowColor = '#C4FF35'; ctx.shadowBlur = 8
          ctx.beginPath(); ctx.arc(x, y, 2, 0, Math.PI * 2); ctx.fill(); ctx.shadowBlur = 0
        })
        pos.forEach((p) => {
          ctx.fillStyle = 'rgba(143,178,255,0.9)'
          ctx.beginPath(); ctx.arc(p.x, p.y, 3, 0, Math.PI * 2); ctx.fill()
        })
        const pulse = 1 + Math.sin(time * 0.003) * 0.12
        const cr = Math.min(W, H) * 0.13 * pulse
        const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, cr * 2.2)
        grad.addColorStop(0, 'rgba(34,211,238,0.55)'); grad.addColorStop(0.5, 'rgba(122,92,255,0.25)'); grad.addColorStop(1, 'rgba(122,92,255,0)')
        ctx.fillStyle = grad; ctx.beginPath(); ctx.arc(cx, cy, cr * 2.2, 0, Math.PI * 2); ctx.fill()
        ctx.fillStyle = '#EAFBFA'; ctx.shadowColor = '#22D3EE'; ctx.shadowBlur = 24
        ctx.beginPath(); ctx.arc(cx, cy, cr * 0.5, 0, Math.PI * 2); ctx.fill(); ctx.shadowBlur = 0
        raf = requestAnimationFrame(frame)
      }
      build()
      if (reduce) frame(0); else raf = requestAnimationFrame(frame)
      const ro = new ResizeObserver(build); ro.observe(canvas)
      cleanup = () => { cancelAnimationFrame(raf); ro.disconnect() }
    }

    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) { initCanvas(); io.disconnect() } })
    }, { threshold: 0.1 })
    io.observe(canvas)

    return () => { io.disconnect(); if (cleanup) cleanup() }
  }, [])
  return <canvas ref={ref} className={className} />
}

/* ============================================================
   LiveFloatCard - hero card whose value ticks (feels alive).
   ============================================================ */
export function LiveFloatCard({ icon, tone = 'accent', title, className = '', mode }) {
  const I = Icon[icon] || Icon.pulse
  const [val, setVal] = useState(seed(mode))
  useEffect(() => {
    const t = setInterval(() => setVal(seed(mode)), 2200 + Math.random() * 800)
    return () => clearInterval(t)
  }, [mode])
  return (
    <div className={`glass float-card ${className}`}>
      <span className={`fc-ic tone-${tone}`}><I /></span>
      <div>
        <div className="fc-title">{title}</div>
        <div className="fc-value">{val}</div>
      </div>
    </div>
  )
}
function seed(mode) {
  if (mode === 'health') return `${(99.7 + Math.random() * 0.3).toFixed(1)}% OK`
  if (mode === 'alerts') return `${2 + Math.floor(Math.random() * 3)} active`
  if (mode === 'bw') return `${(7.8 + Math.random() * 0.9).toFixed(1)} Gbps`
  return '--'
}