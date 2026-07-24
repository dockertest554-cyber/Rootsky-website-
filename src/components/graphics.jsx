/* ============================================================
   ROOTSKY — Custom SVG graphics (no stock photos)
   ============================================================ */

/* ---- Live "connectivity map" dashboard mockup ---- */
export function DashboardMock() {
  return (
    <svg className="gfx-dash" viewBox="0 0 520 400" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Connectivity map dashboard">
      <defs>
        <linearGradient id="dashbg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#171531" />
          <stop offset="1" stopColor="#0B0A1A" />
        </linearGradient>
        <linearGradient id="line" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#7A5CFF" />
          <stop offset="1" stopColor="#A78BFA" />
        </linearGradient>
      </defs>

      {/* window */}
      <rect x="0" y="0" width="520" height="400" rx="16" fill="url(#dashbg)" stroke="rgba(255,255,255,0.08)" />
      {/* top bar */}
      <g>
        <circle cx="24" cy="26" r="5" fill="#FF5F57" />
        <circle cx="42" cy="26" r="5" fill="#FEBC2E" />
        <circle cx="60" cy="26" r="5" fill="#28C840" />
        <rect x="200" y="19" width="120" height="14" rx="7" fill="rgba(255,255,255,0.08)" />
        <line x1="0" y1="52" x2="520" y2="52" stroke="rgba(255,255,255,0.08)" />
      </g>

      {/* sidebar */}
      <g>
        <rect x="20" y="72" width="92" height="10" rx="5" fill="rgba(167,139,250,0.5)" />
        {[110, 134, 158, 182, 206].map((y, i) => (
          <rect key={y} x="20" y={y} width={i === 1 ? 70 : 84} height="8" rx="4" fill="rgba(255,255,255,0.1)" />
        ))}
        <rect x="14" y="128" width="100" height="20" rx="6" fill="rgba(122,92,255,0.18)" />
        <line x1="128" y1="64" x2="128" y2="392" stroke="rgba(255,255,255,0.07)" />
      </g>

      {/* node graph */}
      <g className="gfx-edges" stroke="url(#line)" strokeWidth="1.6" fill="none" opacity="0.8">
        <line x1="220" y1="120" x2="320" y2="100" />
        <line x1="320" y1="100" x2="410" y2="150" />
        <line x1="220" y1="120" x2="270" y2="220" />
        <line x1="270" y1="220" x2="380" y2="250" />
        <line x1="410" y1="150" x2="380" y2="250" />
        <line x1="320" y1="100" x2="270" y2="220" />
        <line x1="380" y1="250" x2="440" y2="320" />
        <line x1="270" y1="220" x2="200" y2="310" />
      </g>
      {[
        [220, 120, 1], [320, 100, 0], [410, 150, 1], [270, 220, 0],
        [380, 250, 1], [440, 320, 0], [200, 310, 0],
      ].map(([x, y, hot], i) => (
        <g key={i}>
          {hot ? <circle cx={x} cy={y} r="9" className="gfx-pulse" fill="none" stroke="#A78BFA" strokeWidth="1.4" /> : null}
          <circle cx={x} cy={y} r="6" fill={hot ? '#7A5CFF' : '#0B0A1A'} stroke={hot ? '#A78BFA' : '#A78BFA'} strokeWidth="2" />
        </g>
      ))}

      {/* stat chips */}
      <g>
        <rect x="148" y="330" width="110" height="46" rx="9" fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.08)" />
        <text x="160" y="350" fill="#A78BFA" fontFamily="Inter, sans-serif" fontSize="9">UPTIME</text>
        <text x="160" y="368" fill="#fff" fontFamily="Space Grotesk, sans-serif" fontSize="16" fontWeight="600">99.98%</text>
        <rect x="270" y="330" width="110" height="46" rx="9" fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.08)" />
        <text x="282" y="350" fill="#A78BFA" fontFamily="Inter, sans-serif" fontSize="9">NODES</text>
        <text x="282" y="368" fill="#fff" fontFamily="Space Grotesk, sans-serif" fontSize="16" fontWeight="600">1,284</text>
      </g>
    </svg>
  )
}

/* ---- Global network globe with pulsing arcs ---- */
export function GlobeNetwork() {
  const arcs = [
    'M120,200 Q260,60 400,180',
    'M150,300 Q260,180 380,260',
    'M110,250 Q260,360 410,300',
    'M180,130 Q260,250 360,140',
  ]
  return (
    <svg className="gfx-globe" viewBox="0 0 520 420" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Global network">
      <defs>
        <radialGradient id="glow" cx="50%" cy="50%" r="50%">
          <stop offset="0" stopColor="rgba(122,92,255,0.25)" />
          <stop offset="1" stopColor="rgba(122,92,255,0)" />
        </radialGradient>
      </defs>
      <circle cx="260" cy="210" r="190" fill="url(#glow)" />
      {/* globe */}
      <circle cx="260" cy="210" r="150" fill="none" stroke="rgba(143,178,255,0.25)" strokeWidth="1.2" />
      {[40, 90, 110, 150].map((r, i) => (
        <ellipse key={i} cx="260" cy="210" rx={r} ry="150" fill="none" stroke="rgba(143,178,255,0.16)" strokeWidth="1" />
      ))}
      {[-100, -50, 0, 50, 100].map((o, i) => (
        <ellipse key={'h' + i} cx="260" cy={210 + o} rx="150" ry={Math.max(18, 150 - Math.abs(o))} fill="none" stroke="rgba(143,178,255,0.12)" strokeWidth="1" transform={`translate(0 0)`} />
      ))}
      {/* arcs */}
      {arcs.map((d, i) => (
        <path key={i} d={d} fill="none" stroke="#7A5CFF" strokeWidth="1.6" strokeLinecap="round"
          className="gfx-arc" style={{ animationDelay: `${i * 0.6}s` }} />
      ))}
      {/* nodes */}
      {[[120, 200], [400, 180], [150, 300], [380, 260], [410, 300], [180, 130], [360, 140]].map(([x, y], i) => (
        <g key={i}>
          <circle cx={x} cy={y} r="10" className="gfx-pulse" fill="none" stroke="#A78BFA" strokeWidth="1.2" style={{ animationDelay: `${i * 0.4}s` }} />
          <circle cx={x} cy={y} r="4.5" fill="#A78BFA" />
        </g>
      ))}
    </svg>
  )
}

/* ---- Stat card with mini chart ---- */
export function StatCard({ kind, value, label }) {
  return (
    <div className="statcard">
      <div className="statcard-chart">
        {kind === 'donut' && <Donut pct={99.98} />}
        {kind === 'bars' && <Bars />}
        {kind === 'line' && <Spark />}
      </div>
      <div className="n">{value}</div>
      <div className="l">{label}</div>
    </div>
  )
}

function Donut({ pct }) {
  const r = 22, c = 2 * Math.PI * r, on = c * (pct / 100)
  return (
    <svg viewBox="0 0 60 60" width="56" height="56">
      <circle cx="30" cy="30" r={r} fill="none" stroke="var(--line)" strokeWidth="6" />
      <circle cx="30" cy="30" r={r} fill="none" stroke="var(--accent)" strokeWidth="6"
        strokeLinecap="round" strokeDasharray={`${on} ${c}`} transform="rotate(-90 30 30)" />
    </svg>
  )
}
function Bars() {
  const hs = [16, 28, 22, 40, 32, 48]
  return (
    <svg viewBox="0 0 70 56" width="70" height="56">
      {hs.map((h, i) => (
        <rect key={i} x={i * 11 + 4} y={52 - h} width="7" height={h} rx="2"
          fill={i === hs.length - 1 ? 'var(--accent)' : '#C7D6F2'} />
      ))}
    </svg>
  )
}
function Spark() {
  return (
    <svg viewBox="0 0 70 56" width="70" height="56" fill="none">
      <polyline points="2,44 14,30 26,36 38,18 50,24 68,8" stroke="var(--accent)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="68" cy="8" r="3" fill="var(--accent)" />
    </svg>
  )
}

/* ---- Visual process flow ---- */
export function FlowDiagram({ steps }) {
  return (
    <div className="flow">
      {steps.map((s, i) => (
        <div className="flow-step" key={s.t}>
          <div className="flow-node">
            <span className="flow-ic">{s.icon}</span>
            {i < steps.length - 1 && <span className="flow-link" aria-hidden="true" />}
          </div>
          <div className="flow-num">{`0${i + 1}`}</div>
          <h3>{s.t}</h3>
          <p>{s.d}</p>
        </div>
      ))}
    </div>
  )
}