import { Link } from 'react-router-dom'
import { Icon } from '../components/ui.jsx'

export default function NotFound() {
  return (
    <section className="ahero" style={{ minHeight: '80vh' }}>
      <div className="wrap" style={{ textAlign: 'center', position: 'relative', zIndex: 2 }}>
        <div className="display-xl" style={{ color: 'var(--accent)' }}>404</div>
        <h1 className="display-lg" style={{ color: '#fff', margin: '12px 0 16px' }}>Page not found.</h1>
        <p style={{ color: '#9FB0C9', maxWidth: '46ch', margin: '0 auto 28px' }}>
          The page you are looking for was moved, renamed, or never existed. Let us get you back on the map.
        </p>
        <Link to="/" className="btn btn-primary">Back to home <span className="arrow"><Icon.arrow /></span></Link>
      </div>
    </section>
  )
}