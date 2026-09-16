import { Routes, Route, useLocation } from 'react-router-dom'
import { useEffect, lazy, Suspense } from 'react'
import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'
import Preloader from './components/Preloader.jsx'

// Lazy-loaded pages -> smaller initial bundle, faster first load.
const Home = lazy(() => import('./pages/Home.jsx'))
const About = lazy(() => import('./pages/About.jsx'))
const Products = lazy(() => import('./pages/Products.jsx'))
const Services = lazy(() => import('./pages/Services.jsx'))
const Contact = lazy(() => import('./pages/Contact.jsx'))
const Careers = lazy(() => import('./pages/Careers.jsx'))
const NotFound = lazy(() => import('./pages/NotFound.jsx'))

const SITE = 'Rootsky Systems'
const META = {
  '/':         { t: `${SITE} | IT & Connectivity Solutions`, d: 'Rootsky Systems turns tangled IT environments into living connectivity maps you can see, secure, and scale.' },
  '/about':    { t: `About Us | ${SITE}`, d: 'We help IT teams see, secure, and scale the infrastructure they depend on.' },
  '/products': { t: `OCTENIX | ${SITE}`, d: 'OCTENIX: the connectivity-mapping platform that maps your whole network in real time.' },
  '/services': { t: `Services | ${SITE}`, d: 'IT infrastructure services — network management, monitoring deployment, and connectivity consulting.' },
  '/careers':  { t: `Careers | ${SITE}`, d: 'Join Rootsky Systems and help make complex infrastructure make sense.' },
  '/contact':  { t: `Contact Us | ${SITE}`, d: 'Tell us about your environment. We will point you to the right next step.' },
}

function setMeta(name, content) {
  let el = document.querySelector(`meta[name="${name}"]`)
  if (!el) { el = document.createElement('meta'); el.setAttribute('name', name); document.head.appendChild(el) }
  el.setAttribute('content', content)
}

function RouteEffects() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
    const m = META[pathname] || { t: `${SITE}`, d: META['/'].d }
    document.title = m.t
    setMeta('description', m.d)
  }, [pathname])
  return null
}

export default function App() {
  return (
    <>
      <Preloader />
      <RouteEffects />
      <Navbar />
      <main id="main">
        <Suspense fallback={<div style={{ minHeight: '70vh' }} />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/products" element={<Products />} />
            <Route path="/services" element={<Services />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/careers" element={<Careers />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </main>
      <Footer />
    </>
  )
}