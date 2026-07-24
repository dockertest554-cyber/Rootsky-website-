import { Link } from 'react-router-dom'
import { Logo } from './ui.jsx'

export default function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="footer">
      <div className="wrap">
        <div className="footer-cols">
          <div className="footer-brand">
            <Logo light />
            <p>Connectivity mapping and IT infrastructure solutions that keep complex systems clear, secure, and online.</p>
            <div className="footer-social">
              <a href="https://linkedin.com/company/rootsky-system" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.34V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45z"/></svg>
              </a>
            </div>
          </div>

          <div>
            <h4>Company</h4>
            <ul>
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/products">Products</Link></li>
              <li><Link to="/careers">Careers</Link></li>
              <li><Link to="/contact">Contact Us</Link></li>
            </ul>
          </div>

          <div>
            <h4>OCTET</h4>
            <ul>
              <li><Link to="/products">Network Monitoring</Link></li>
              <li><Link to="/products">Infrastructure Health</Link></li>
              <li><Link to="/products">Alert Management</Link></li>
              <li><Link to="/products">SLA & Reporting</Link></li>
            </ul>
          </div>

          <div>
            <h4>Get in touch</h4>
            <ul>
              <li><a href="mailto:sales@rootskysystem.com">sales@rootskysystem.com</a></li>
              <li><a href="tel:+919625564207">+91 96255 64207</a></li>
              <li><Link to="/contact">Support</Link></li>
            </ul>
          </div>
        </div>

        <div className="footer-wordmark">ROOTSKY SYSTEM</div>

        <div className="footer-base">
          <span>© {year} RootSky System. All rights reserved.</span>
          <span>Privacy · Terms · Security</span>
        </div>
      </div>
    </footer>
  )
}