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

  return (
    <nav className="absolute inset-x-0 top-5 z-50 px-6">
      <div className="mx-auto max-w-[1310px] rounded-[2.4rem] border border-[#D4E2F2] bg-[#F4F9FE]/90 shadow-[0_10px_40px_-18px_rgba(31,90,170,0.35)] backdrop-blur-xl">
        <div className="flex items-center justify-between gap-6 px-6 py-4 sm:px-8">
          {/* Brand */}
          <Link to="/" onClick={close} className="flex shrink-0 items-center gap-3">
            <img src="/rootsky-mark.png" alt="" aria-hidden="true" className="h-8 w-auto" />
            <span className="text-[1.05rem] font-bold tracking-tight text-[#142450]">
              ROOTSKY<span className="text-[#1F7FFD]">SYSTEM</span>
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
                  `relative text-[0.95rem] transition-colors duration-200 ${
                    isActive
                      ? 'font-semibold text-[#1F7FFD] after:absolute after:-bottom-1.5 after:left-0 after:h-0.5 after:w-full after:rounded-full after:bg-[#1F7FFD] after:content-[""]'
                      : 'text-[#5A6B82] hover:text-[#142450]'
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
            className="group hidden shrink-0 items-center gap-2.5 rounded-full border-[1.5px] border-[#1F7FFD]/55 px-6 py-2.5 text-[0.95rem] font-semibold text-[#142450] transition-colors duration-200 hover:bg-[#1F7FFD]/8 sm:inline-flex"
          >
            Talk to us
            <ArrowRight size={17} className="text-[#1F7FFD] transition-transform duration-200 group-hover:translate-x-1" />
          </Link>

          {/* Mobile toggle */}
          <button
            onClick={() => setOpen(!open)}
            aria-label="Menu"
            aria-expanded={open}
            className="text-[#142450] lg:hidden"
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile drawer */}
        {open && (
          <div className="flex flex-col gap-1 border-t border-[#D4E2F2] px-6 py-4 lg:hidden">
            {links.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                end={l.end}
                onClick={close}
                className={({ isActive }) =>
                  `py-2.5 text-[0.95rem] ${isActive ? 'font-semibold text-[#1F7FFD]' : 'text-[#5A6B82]'}`
                }
              >
                {l.label}
              </NavLink>
            ))}
            <Link
              to="/contact"
              onClick={close}
              className="mt-3 inline-flex w-fit items-center gap-2 rounded-full border-[1.5px] border-[#1F7FFD]/55 px-6 py-2.5 text-[0.95rem] font-semibold text-[#142450]"
            >
              Talk to us <ArrowRight size={17} className="text-[#1F7FFD]" />
            </Link>
          </div>
        )}
      </div>
    </nav>
  )
}