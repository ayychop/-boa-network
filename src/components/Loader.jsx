import { useEffect, useState } from 'react'
import { prefersReducedMotion } from '../lib/gsap'
import { site } from '../data/site'

const KEY = 'boa-intro-seen'
const LOAD = 1700 // the aperture ring clicks through its stops
const OPEN = 1100 // the iris opens onto the site
const LINES = ['Loading film', 'Pulling focus', 'Opening shutter']
const STOPS = ['22', '16', '11', '8', '5.6', '4', '2.8', '2']
const STOP_GAP = 26 // degrees between f-stops on the ring

const BLADES = 8
const THETA = (2 * Math.PI) / BLADES
const FAR = 600
const FULL = 150 // apothem that clears the 200 unit viewBox corner to corner

const clamp = (v) => Math.min(1, Math.max(0, v))
const easeOut = (p) => 1 - (1 - p) ** 3
const easeInOut = (p) => (p < 0.5 ? 4 * p ** 3 : 1 - (-2 * p + 2) ** 3 / 2)

// One iris blade for an opening of apothem `d`. Eight of these, each rotated a
// further 45 degrees, tile everything outside the octagonal opening.
function bladePoints(d) {
  const vx = d
  const vy = d * Math.tan(THETA / 2)
  return [
    [vx, vy],
    [vx, vy - FAR],
    [vx + FAR * Math.sin(THETA), vy - FAR * Math.cos(THETA)],
  ]
    .map((p) => p.map((n) => n.toFixed(2)).join(','))
    .join(' ')
}

function shouldPlay() {
  try {
    return !sessionStorage.getItem(KEY) && !prefersReducedMotion()
  } catch {
    return false
  }
}

// Camera aperture intro, shown once per browser session.
export default function Loader() {
  const [show, setShow] = useState(shouldPlay)
  const [t, setT] = useState(0)

  useEffect(() => {
    if (!show) return
    const start = performance.now()
    let raf = 0
    const tick = (now) => {
      const elapsed = now - start
      if (elapsed < LOAD + OPEN) {
        setT(elapsed)
        raf = requestAnimationFrame(tick)
      } else {
        try {
          sessionStorage.setItem(KEY, '1')
        } catch {
          /* private mode */
        }
        setShow(false)
      }
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [show])

  if (!show) return null

  const load = easeOut(clamp(t / LOAD))
  const open = easeInOut(clamp((t - LOAD) / OPEN))
  const opening = t > LOAD
  const stop = Math.round(load * (STOPS.length - 1))
  const points = bladePoints(FULL * open)

  return (
    <div
      role="status"
      aria-label="Loading BOA Network"
      className={`fixed inset-0 z-[100] overflow-hidden ${opening ? 'pointer-events-none' : ''}`}
    >
      {/* Iris: the opening is see-through, so the site is revealed behind it. */}
      <svg
        viewBox="-100 -100 200 200"
        preserveAspectRatio="xMidYMid slice"
        className="absolute inset-0 h-full w-full"
        aria-hidden="true"
      >
        {!opening && <rect x="-200" y="-200" width="400" height="400" className="fill-ink" />}
        <g transform={`rotate(${-20 + 20 * load + 35 * open})`}>
          {Array.from({ length: BLADES }, (_, i) => (
            <polygon
              key={i}
              points={points}
              transform={`rotate(${(i * 360) / BLADES})`}
              className="fill-ink stroke-bone/15"
              strokeWidth="1"
              strokeLinejoin="round"
              vectorEffect="non-scaling-stroke"
            />
          ))}
        </g>
      </svg>

      <div className="absolute inset-0 grid place-items-center" style={{ opacity: 1 - clamp(open * 3) }}>
        <div className="relative grid aspect-square w-[min(78vw,420px)] place-items-center">
          {/* Lens barrel with a turning aperture ring */}
          <svg viewBox="-100 -100 200 200" className="absolute inset-0 h-full w-full" aria-hidden="true">
            <circle r="98" fill="none" className="stroke-bone/20" strokeWidth=".5" />
            <circle r="70" fill="none" className="stroke-bone/10" strokeWidth=".5" />
            <g transform={`rotate(${-load * (STOPS.length - 1) * STOP_GAP})`}>
              <circle r="92" fill="none" className="stroke-bone/35" strokeWidth="3" strokeDasharray=".4 3.614" />
              {STOPS.map((s, i) => (
                <text
                  key={s}
                  transform={`rotate(${i * STOP_GAP}) translate(0 -79)`}
                  textAnchor="middle"
                  fontSize="6.5"
                  className={`font-mono ${i === stop ? 'fill-gold' : 'fill-bone/55'}`}
                >
                  {s}
                </text>
              ))}
            </g>
            <path d="M0 -95.5l-2.6 -5h5.2z" className="fill-gold" />
          </svg>
          <div className="flex flex-col items-center gap-3 text-center">
            <span className="block text-5xl font-semibold leading-none tracking-[-0.06em] sm:text-6xl">BOA</span>
            <span className="block whitespace-nowrap font-mono text-[0.625rem] uppercase leading-none tracking-[0.22em] text-hud/80 sm:text-[0.6875rem]">
              {site.longName}
            </span>
          </div>
        </div>
        <div className="absolute inset-x-6 bottom-8 flex items-end justify-between sm:inset-x-12 sm:bottom-12">
          <span className="hud-label">{opening ? LINES[2] : LINES[load < 0.6 ? 0 : 1]}</span>
          <span className="font-mono text-sm tabular-nums text-gold">f/{STOPS[stop]}</span>
        </div>
      </div>
    </div>
  )
}
