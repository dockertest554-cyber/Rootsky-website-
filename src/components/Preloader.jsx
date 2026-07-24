import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'

export default function Preloader() {
  const root = useRef(null)
  const countRef = useRef(null)
  const [done, setDone] = useState(false)

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) { setDone(true); return }

    document.body.style.overflow = 'hidden'
    const counter = { v: 0 }
    const tl = gsap.timeline({
      onComplete: () => { document.body.style.overflow = ''; setDone(true) },
    })

    tl.to(counter, {
      v: 100, duration: 1.8, ease: 'power2.inOut',
      onUpdate: () => { if (countRef.current) countRef.current.textContent = Math.round(counter.v) },
    })
      .to('.pl-bar', { scaleX: 1, duration: 1.8, ease: 'power2.inOut' }, 0)
      .to('.pl-brand', { y: -20, opacity: 0, duration: 0.5, ease: 'power2.in' }, '-=0.2')
      .to('.pl-count', { y: -20, opacity: 0, duration: 0.5, ease: 'power2.in' }, '<')
      .to(root.current, { yPercent: -100, duration: 0.9, ease: 'power4.inOut' }, '+=0.05')

    return () => { tl.kill(); document.body.style.overflow = '' }
  }, [])

  if (done) return null
  return (
    <div className="preloader" ref={root}>
      <div className="pl-brand">
        ROOTSKY<span> SYSTEMS</span>
      </div>
      <div className="pl-count"><span ref={countRef}>0</span><i>%</i></div>
      <div className="pl-track"><div className="pl-bar" /></div>
    </div>
  )
}
