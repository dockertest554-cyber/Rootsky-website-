import { useEffect, useRef, useState } from 'react'

/* ---- Brand logo: real RootSky artwork ---- */
export function Logo({ light = false }) {
  // Dark surfaces (footer): full lockup with its own text.
  if (light) {
    return (
      <span className="brand">
        <img className="brand-full" src="/rootsky-full.png" alt="RootSky System" />
      </span>
    )
  }
  // Light nav: tree mark + wordmark text.
  return (
    <span className="brand">
      <img className="brand-mark-img" src="/rootsky-mark.png" alt="" aria-hidden="true" />
      <span className="brand-text">ROOTSKY<span> SYSTEMS</span></span>
    </span>
  )
}

/* ---- Minimal stroke icons ---- */
export const Icon = {
  map: () => <Svg><path d="M9 4 3 6v14l6-2 6 2 6-2V4l-6 2-6-2Z" /><path d="M9 4v14M15 6v14" /></Svg>,
  network: () => <Svg><circle cx="6" cy="6" r="2.5" /><circle cx="18" cy="6" r="2.5" /><circle cx="12" cy="18" r="2.5" /><path d="M7.8 7.8 11 16M16.2 7.8 13 16M8 6h8" /></Svg>,
  shield: () => <Svg><path d="M12 3 5 6v5c0 5 3 7.5 7 9 4-1.5 7-4 7-9V6l-7-3Z" /><path d="m9 12 2 2 4-4" /></Svg>,
  cloud: () => <Svg><path d="M7 18a4 4 0 0 1-.5-7.97A6 6 0 0 1 18 9a4 4 0 0 1 0 9H7Z" /></Svg>,
  gear: () => <Svg><circle cx="12" cy="12" r="3.2" /><path d="M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M18.4 5.6l-2.1 2.1M7.7 16.3l-2.1 2.1" /></Svg>,
  pulse: () => <Svg><path d="M3 12h4l2 6 4-14 2 8h6" /></Svg>,
  arrow: () => <Svg><path d="M5 12h14M13 6l6 6-6 6" /></Svg>,
  check: () => <Svg sw="2.2"><path d="m5 12 4 4 10-10" /></Svg>,
  mail: () => <Svg><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 7 9 6 9-6" /></Svg>,
  phone: () => <Svg><path d="M4 5c0 9 6 15 15 15l-1-4-4-1-2 2c-2-1-4-3-5-5l2-2-1-4-4-1Z" /></Svg>,
  pin: () => <Svg><path d="M12 21s7-6 7-11a7 7 0 0 0-14 0c0 5 7 11 7 11Z" /><circle cx="12" cy="10" r="2.5" /></Svg>,
  monitor: () => <Svg><rect x="3" y="4" width="18" height="12" rx="2" /><path d="M8 20h8M12 16v4" /></Svg>,
  server: () => <Svg><rect x="3" y="4" width="18" height="7" rx="1.5" /><rect x="3" y="13" width="18" height="7" rx="1.5" /><path d="M7 7.5h.01M7 16.5h.01" /></Svg>,
  bell: () => <Svg><path d="M6 9a6 6 0 0 1 12 0c0 5 2 6 2 6H4s2-1 2-6Z" /><path d="M10 20a2 2 0 0 0 4 0" /></Svg>,
  chart: () => <Svg><path d="M4 20V4M4 20h16" /><path d="M8 16l3-4 3 2 4-6" /></Svg>,
  layers: () => <Svg><path d="m12 3 9 5-9 5-9-5 9-5Z" /><path d="m3 13 9 5 9-5" /></Svg>,
  camera: () => <Svg><path d="M4 8h3l1.5-2h7L17 8h3v11H4Z" /><circle cx="12" cy="13" r="3.2" /></Svg>,
  building: () => <Svg><rect x="5" y="3" width="14" height="18" rx="1.5" /><path d="M9 7h.01M15 7h.01M9 11h.01M15 11h.01M9 15h.01M15 15h.01" /></Svg>,
  city: () => <Svg><path d="M3 21V9l5-3v15M8 21V3l6 3v15M14 21V10l6 3v8M3 21h18" /></Svg>,
  bolt: () => <Svg><path d="M13 2 4 14h6l-1 8 9-12h-6l1-8Z" /></Svg>,
  lock: () => <Svg><rect x="4" y="10" width="16" height="10" rx="2" /><path d="M8 10V7a4 4 0 0 1 8 0v3" /></Svg>,
  plug: () => <Svg><path d="M12 2v6M9 8h6M7 8h10v3a5 5 0 0 1-10 0V8ZM12 16v6" /></Svg>,
  scale: () => <Svg><path d="M12 3v18M6 8l-3 6h6l-3-6ZM18 8l-3 6h6l-3-6ZM4 21h16" /></Svg>,
  eye: () => <Svg><path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12Z" /><circle cx="12" cy="12" r="3" /></Svg>,
  route: () => <Svg><circle cx="6" cy="6" r="2.5" /><circle cx="18" cy="18" r="2.5" /><path d="M8.5 6H14a4 4 0 0 1 0 8H10a4 4 0 0 0 0 4" /></Svg>,
}

function Svg({ children, sw = '1.7' }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {children}
    </svg>
  )
}

/* ---- Scroll reveal ---- */
export function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('.reveal')
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add('in')),
      { threshold: 0.12 }
    )
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])
}

/* ---- Animated connectivity network (the signature motif) ---- */
export function NetworkCanvas({ density = 1, className = '' }) {
  const ref = useRef(null)
  useEffect(() => {
    const canvas = ref.current
    const ctx = canvas.getContext('2d')
    let raf, w, h, nodes
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const resize = () => {
      const r = canvas.getBoundingClientRect()
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      w = canvas.width = r.width * dpr
      h = canvas.height = r.height * dpr
      ctx.scale(dpr, dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      const count = Math.floor((r.width * r.height) / 18000 * density)
      nodes = Array.from({ length: Math.max(14, count) }, () => ({
        x: Math.random() * r.width,
        y: Math.random() * r.height,
        vx: (Math.random() - 0.5) * 0.25,
        vy: (Math.random() - 0.5) * 0.25,
        r: Math.random() * 1.6 + 1,
      }))
    }

    const draw = () => {
      const r = canvas.getBoundingClientRect()
      ctx.clearRect(0, 0, r.width, r.height)
      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i]
        a.x += a.vx; a.y += a.vy
        if (a.x < 0 || a.x > r.width) a.vx *= -1
        if (a.y < 0 || a.y > r.height) a.vy *= -1
        for (let j = i + 1; j < nodes.length; j++) {
          const b = nodes[j]
          const dx = a.x - b.x, dy = a.y - b.y
          const dist = Math.hypot(dx, dy)
          if (dist < 130) {
            ctx.strokeStyle = `rgba(167,139,250,${0.16 * (1 - dist / 130)})`
            ctx.lineWidth = 1
            ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke()
          }
        }
        ctx.fillStyle = 'rgba(150,185,255,0.75)'
        ctx.beginPath(); ctx.arc(a.x, a.y, a.r, 0, Math.PI * 2); ctx.fill()
      }
      raf = requestAnimationFrame(draw)
    }

    resize()
    if (reduce) { draw(); cancelAnimationFrame(raf) } else draw()
    window.addEventListener('resize', resize)
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', resize) }
  }, [density])

  return <canvas ref={ref} className={className} />
}