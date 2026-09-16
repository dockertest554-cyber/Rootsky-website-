import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'motion/react'
import { Particles, ParticlesProvider } from '@tsparticles/react'
import { loadSlim } from '@tsparticles/slim'
import { ArrowRight, ShieldCheck, CircleCheckBig, Server, Lock } from 'lucide-react'
import './hero.css'

/* Defined once, outside the component — ParticlesProvider throws if the
   init callback identity changes between renders. */
const initEngine = async (engine) => { await loadSlim(engine) }

const badges = [ShieldCheck, CircleCheckBig, Server, Lock]

/* Stagger: each child inherits `rise` and fires 0.09s after the last. */
const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.09, delayChildren: 0.1 } } }
const rise = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
}

export default function Hero() {
  const options = useMemo(() => ({
    fullScreen: { enable: false },
    fpsLimit: 60,
    detectRetina: true,
    particles: {
      number: { value: 170, density: { enable: true, width: 1600, height: 900 } },
      color: { value: ['#4ADE9A', '#5B8CFF', '#8FD8FF'] },
      links: { enable: true, distance: 106, color: '#2F7F86', opacity: 0.22, width: 1 },
      move: { enable: true, speed: 0.3, outModes: { default: 'bounce' } },
      opacity: { value: { min: 0.15, max: 0.65 } },
      size: { value: { min: 0.5, max: 1.5 } },
    },
    interactivity: {
      events: { onHover: { enable: true, mode: 'grab' } },
      modes: { grab: { distance: 170, links: { opacity: 0.5 } } },
    },
  }), [])

  return (
    <header className="hero-octet flex min-h-svh flex-col justify-center px-6 pt-36 pb-16">
      <ParticlesProvider init={initEngine}>
        <Particles id="hero-mesh" className="hero-mesh" options={options} />
      </ParticlesProvider>
      <div className="hero-veil" />

      {/* Two columns: video left, copy right. Mobile stacks video-first. */}
      <motion.div
        variants={stagger}
        initial="hidden"
        animate="show"
        className="relative z-10 mx-auto grid w-full max-w-[1240px] grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16"
      >
        {/* Video */}
        <motion.div variants={rise} className="hero-video-frame">
          <video
            className="hero-video"
            src="/octet-demo.mp4"
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            aria-label="OCTET product demo"
          />
        </motion.div>

        {/* Copy */}
        <div className="flex flex-col items-start text-left">
          {/* Lockup */}
          <motion.div variants={rise} className="mb-7 flex items-center gap-4">
            <span className="hero-lockup-glow relative">
              <img src="/octet-mark.png" alt="" aria-hidden="true" className="h-14 w-14" />
            </span>
            <span className="text-5xl font-bold tracking-tight text-white lg:text-6xl">
              OCTENIX
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            variants={rise}
            className="text-4xl font-normal leading-[1.14] tracking-tight text-white sm:text-5xl lg:text-[3.6rem] lg:leading-[1.1]"
          >
            Network <span style={{ color: 'var(--hero-mint)' }}>clarity.</span>
            <br />
            Operational <span style={{ color: 'var(--hero-mint)' }}>confidence.</span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            variants={rise}
            className="mt-6 max-w-xl text-pretty text-base leading-relaxed sm:text-lg"
            style={{ color: 'var(--hero-sub)' }}
          >
            OCTENIX gives you real-time visibility, intelligent insights,
            and instant control over your entire network.
          </motion.p>

          {/* Action */}
          <motion.div variants={rise} className="mt-9">
            <Link
              to="/contact"
              className="hero-cta group inline-flex items-center gap-2.5 rounded-full px-9 py-4 text-[1.02rem] font-medium text-[#052E24] transition-transform duration-200 hover:-translate-y-0.5"
            >
              Request a demo
              <ArrowRight size={18} className="transition-transform duration-200 group-hover:translate-x-1" />
            </Link>
          </motion.div>
        </div>
      </motion.div>

      {/* Trust line + certification badges, centered under both columns */}
      <motion.div
        variants={rise}
        initial="hidden"
        animate="show"
        className="relative z-10 mt-16 flex flex-col items-center"
      >
        <p className="text-[0.95rem]" style={{ color: 'var(--hero-trust)' }}>
          Trusted by IT teams who demand performance and reliability.
        </p>
        <ul className="mt-6 flex items-center gap-6" style={{ color: 'var(--hero-badge)' }}>
          {badges.map((Badge, i) => (
            <li key={i} className="flex items-center gap-6">
              <Badge size={30} strokeWidth={1.8} aria-hidden="true" />
              {i < badges.length - 1 && <span aria-hidden="true" className="h-6 w-px bg-white/10" />}
            </li>
          ))}
        </ul>
      </motion.div>
    </header>
  )
}