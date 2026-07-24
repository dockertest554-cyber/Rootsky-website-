import { useRef, useEffect } from 'react'
import gsap from 'gsap'

/* ---- Explosive text ----
   Words scatter in (random offset + rotation) and assemble into place
   when the heading enters view. Reveal is driven by IntersectionObserver
   with a hard failsafe so text NEVER stays hidden. */
export function ExplosiveText({ as = 'h2', text, className = '', stagger = 0.04, style }) {
  const ref = useRef(null)
  const Tag = as

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const words = el.querySelectorAll('.xw-inner')
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) return // leave fully visible

    gsap.set(words, {
      yPercent: 120,
      rotate: () => gsap.utils.random(-18, 18),
      opacity: 0,
    })

    let played = false
    const play = () => {
      if (played) return
      played = true
      gsap.to(words, {
        yPercent: 0, rotate: 0, opacity: 1,
        ease: 'power4.out', duration: 1, stagger,
      })
    }

    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) { play(); io.disconnect() } })
    }, { threshold: 0.15 })
    io.observe(el)

    // Failsafe: reveal no matter what, even if observer never fires.
    const t = setTimeout(play, 2600)

    return () => { io.disconnect(); clearTimeout(t) }
  }, [text, stagger])

  return (
    <Tag ref={ref} className={`xtext ${className}`} style={style}>
      {text.split(' ').map((w, i) => (
        <span className="xw" key={i}>
          <span className="xw-inner">{w}&nbsp;</span>
        </span>
      ))}
    </Tag>
  )
}

/* ---- Magnetic wrapper: element drifts toward cursor ---- */
export function Magnetic({ children, strength = 0.14 }) {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    if (!el || window.matchMedia('(pointer: coarse)').matches) return
    const move = (e) => {
      const r = el.getBoundingClientRect()
      const x = (e.clientX - (r.left + r.width / 2)) * strength
      const y = (e.clientY - (r.top + r.height / 2)) * strength
      gsap.to(el, { x, y, duration: 0.35, ease: 'power3.out' })
    }
    const reset = () => gsap.to(el, { x: 0, y: 0, duration: 0.45, ease: 'power3.out' })
    el.addEventListener('mousemove', move)
    el.addEventListener('mouseleave', reset)
    return () => { el.removeEventListener('mousemove', move); el.removeEventListener('mouseleave', reset) }
  }, [strength])
  return <span ref={ref} className="magnetic">{children}</span>
}

/* ---- Fade / slide-up on scroll for blocks (IntersectionObserver) ---- */
export function useScrollFade() {
  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const els = document.querySelectorAll('.fade-up')
    if (reduce) { els.forEach((e) => { e.style.opacity = 1 }); return }

    els.forEach((e) => { e.style.opacity = 0 })
    const reveal = (el) => gsap.to(el, { y: 0, opacity: 1, duration: 1, ease: 'power3.out', startAt: { y: 40 } })

    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) { reveal(e.target); io.unobserve(e.target) } })
    }, { threshold: 0.12 })
    els.forEach((e) => io.observe(e))

    // Failsafe: reveal everything after 3s regardless.
    const t = setTimeout(() => els.forEach((e) => { e.style.opacity = 1; e.style.transform = 'none' }), 3000)

    return () => { io.disconnect(); clearTimeout(t) }
  }, [])
}