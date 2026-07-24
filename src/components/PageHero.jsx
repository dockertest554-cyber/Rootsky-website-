import { NetworkCanvas } from './ui.jsx'

export default function PageHero({ crumb, eyebrow, title, intro }) {
  return (
    <header className="page-hero">
      <NetworkCanvas className="hero-canvas" density={0.9} />
      <div className="hero-fade" />
      <div className="wrap page-hero-inner">
        {crumb && <div className="crumb">Home <span>/</span> {crumb}</div>}
        {eyebrow && <span className="eyebrow on-dark">{eyebrow}</span>}
        <h1>{title}</h1>
        {intro && <p>{intro}</p>}
      </div>
    </header>
  )
}
