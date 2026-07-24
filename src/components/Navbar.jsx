import { useState } from 'react'
import { NavLink, Link } from 'react-router-dom'
import { ArrowRight, Menu, X } from 'lucide-react'

const links = [
  { to: '/', label: 'Home', end: true },
  { to: '/about', label: 'About Us' },
  { to: '/products', label: 'Products' },
  { to: '/services', label: 'Services' },
  { to: '/careers', label: 'Careers' },
  { to: '/contact', label: 'Contact Us' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const close = () => setOpen(false)

  /* `absolute`, not `fixed`. The pill still floats over the hero, but it is
     anchored to the document rather than the viewport — so it scrolls up and
     out of view along with the rest of the page. */
  return (
    <nav className="absolute inset-x-0 top-6 z-50 px-6">
      <div className="mx-auto max-w-[1310px] rounded-[2.4rem] border border-white/[0.07] bg-[#0E0E16]/85 backdrop-blur-xl">
        <div className="flex items-center justify-between gap-6 px-6 py-4 sm:px-8">
          {/* Brand */}
          <Link to="/" onClick={close} className="flex shrink-0 items-center gap-3">
            <img src="/rootsky-mark.png" alt="" aria-hidden="true" className="h-8 w-auto" />
            <span className="text-[1.05rem] font-bold tracking-tight text-white">
              ROOTSKY<span className="text-[#5B6DFF]">SYSTEM</span>
            </span>
          </Link>

          {/* Desktop links */}
          <div className="hidden items-center gap-9 lg:flex">
            {links.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                end={l.end}
                onClick={close}
                className={({ isActive }) =>
                  `text-[0.95rem] transition-colors duration-200 ${
                    isActive ? 'text-white' : 'text-white/70 hover:text-white'
                  }`
                }
              >
                {l.label}
              </NavLink>
            ))}
          </div>

          {/* CTA */}
          <Link
            to="/contact"
            onClick={close}
            className="group hidden shrink-0 items-center gap-2.5 rounded-full border border-[#5B6DFF]/55 px-6 py-2.5 text-[0.95rem] text-white transition-colors duration-200 hover:bg-[#5B6DFF]/10 sm:inline-flex"
          >
            Talk to us
            <ArrowRight size={17} className="transition-transform duration-200 group-hover:translate-x-1" />
          </Link>

          {/* Mobile toggle */}
          <button
            onClick={() => setOpen(!open)}
            aria-label="Menu"
            aria-expanded={open}
            className="text-white lg:hidden"
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile drawer */}
        {open && (
          <div className="flex flex-col gap-1 border-t border-white/[0.07] px-6 py-4 lg:hidden">
            {links.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                end={l.end}
                onClick={close}
                className={({ isActive }) =>
                  `py-2.5 text-[0.95rem] ${isActive ? 'text-white' : 'text-white/70'}`
                }
              >
                {l.label}
              </NavLink>
            ))}
            <Link
              to="/contact"
              onClick={close}
              className="mt-3 inline-flex w-fit items-center gap-2 rounded-full border border-[#5B6DFF]/55 px-6 py-2.5 text-[0.95rem] text-white"
            >
              Talk to us <ArrowRight size={17} />
            </Link>
          </div>
        )}
      </div>
    </nav>
  )
}