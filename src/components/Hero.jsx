import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'motion/react'
import { Particles, ParticlesProvider } from '@tsparticles/react'
import { loadSlim } from '@tsparticles/slim'
import { ArrowRight, ShieldCheck, CircleCheckBig, Server, Lock } from 'lucide-react'
import './hero.css'

const initEngine = async (engine) => { await loadSlim(engine) }

const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.09, delayChildren: 0.1 } } }
const badges = [ShieldCheck, CircleCheckBig, Server, Lock]

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
      number: { value: 90, density: { enable: true, width: 1600, height: 900 } },
      color: { value: ['#0A0A0A', '#1F2937', '#374151'] },
      links: { enable: true, distance: 130, color: '#000000', opacity: 0.55, width: 1 },
      move: { enable: true, speed: 0.3, outModes: { default: 'bounce' } },
      opacity: { value: { min: 0.15, max: 0.5 } },
      size: { value: { min: 0.6, max: 2 } },
    },
    interactivity: {
      events: { onHover: { enable: true, mode: 'grab' } },
      modes: { grab: { distance: 160, links: { opacity: 0.55 } } },
    },
  }), [])

  return (
    <header className="hero-octenix flex min-h-svh flex-col justify-center px-6 pt-40 pb-16">
      <ParticlesProvider init={initEngine}>
        <Particles id="h-mesh" className="h-mesh" options={options} />
      </ParticlesProvider>

      <motion.div
        variants={stagger}
        initial="hidden"
        animate="show"
        className="h-inner mx-auto grid w-full max-w-[1240px] grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16"
      >
        {/* Video (left) */}
        <motion.div variants={rise} className="h-video-frame order-2 lg:order-1">
          <video
            className="h-video"
            src="/octenix-demo.mp4"
            autoPlay muted loop playsInline preload="auto"
            aria-label="OCTENIX network monitoring demo"
          />
        </motion.div>

        {/* Copy (right) */}
        <div className="order-1 flex flex-col items-start text-left lg:order-2">
          <motion.img
            variants={rise}
            src="/octenix-logo.png"
            alt="OCTENIX — Monitoring Simplified"
            className="h-logo mb-2"
          />

          <motion.h1
            variants={rise}
            className="h-title text-4xl sm:text-5xl lg:text-[3.4rem]"
          >
            Network <span className="accent">clarity.</span>
            <br />
            Operational <span className="accent">confidence.</span>
          </motion.h1>

          <motion.p
            variants={rise}
            className="h-sub mt-5 max-w-xl text-base leading-relaxed sm:text-[1.05rem]"
          >
            OCTENIX gives you real-time visibility, intelligent insights,
            and instant control over your entire network.
          </motion.p>

          <motion.div variants={rise} className="mt-8 flex flex-wrap items-center gap-4">
            <Link
              to="/contact"
              className="h-cta group inline-flex items-center gap-2.5 rounded-full px-9 py-4 text-[1.02rem] font-semibold transition-transform duration-200 hover:-translate-y-0.5"
            >
              Request a demo
              <ArrowRight size={18} className="transition-transform duration-200 group-hover:translate-x-1" />
            </Link>
            <Link
              to="/products"
              className="h-cta-2 inline-flex items-center rounded-full px-8 py-4 text-[1.02rem] font-medium transition-colors duration-200"
            >
              Explore OCTENIX
            </Link>
          </motion.div>
        </div>
      </motion.div>

      <motion.div
        variants={rise}
        initial="hidden"
        animate="show"
        className="h-inner mt-16 flex flex-col items-center"
      >
        <p className="h-trust text-center text-[0.95rem]">
          Trusted by IT teams who demand performance and reliability.
        </p>
        <ul className="mt-6 flex items-center gap-6 text-[#0A0A0A]">
          {badges.map((Badge, i) => (
            <li key={i} className="flex items-center gap-6">
              <Badge size={28} strokeWidth={1.8} aria-hidden="true" />
              {i < badges.length - 1 && <span aria-hidden="true" className="h-6 w-px bg-slate-300/70" />}
            </li>
          ))}
        </ul>
      </motion.div>

      <div className="h-blend" aria-hidden="true" />
    </header>
  )
}