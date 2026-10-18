import { useEffect, useRef, useState } from 'react'
import { prefersReducedMotion } from '../lib/gsap'
import { FOG_TEX, useAtmosphereReady } from '../lib/intro'

// The smoke tile (FOG_TEX) is baked once to a static PNG and shared through
// --fog-tex in index.css. Nothing is generated on the phone.

// Site-wide volumetric fog.
//   1. .fog-haze   — static base haze
//   2. .fog-plume  — slow plumes on one wind direction (CSS transform loops),
//                    nudged by the pointer and lagging behind scroll on desktop
//   3. .light-bleed / .fog-bank / .smoke — placed per section
// Every layer waits until the loader is gone and the browser is idle, then
// fades in, so the iris never competes with the atmosphere for frames.
export default function Fog() {
  const ready = useAtmosphereReady(2)
  const root = useRef(null)
  const lag = useRef(null)
  const [shown, setShown] = useState(false)

  useEffect(() => {
    if (!ready) return
    const img = new Image()
    img.src = FOG_TEX
    img
      .decode()
      .catch(() => {})
      .then(() => setShown(true))
  }, [ready])

  // Pointer drift and scroll lag are desktop-only: on touch screens the loop
  // would cost a composite every frame for an effect nobody can steer.
  useEffect(() => {
    if (!shown || prefersReducedMotion()) return
    if (!window.matchMedia('(hover: hover) and (pointer: fine) and (min-width: 1025px)').matches) return
    const tileH = Math.max(window.innerHeight, 600)
    root.current.style.setProperty('--fog-tile-h', `${tileH}px`)

    let tx = 0
    let ty = 0
    let x = 0
    let y = 0
    let last = ''
    let raf = 0
    const onMove = (e) => {
      if (e.pointerType && e.pointerType !== 'mouse') return
      // Smoke leans away from the pointer.
      tx = (e.clientX / window.innerWidth - 0.5) * -40
      ty = (e.clientY / window.innerHeight - 0.5) * -22
    }
    const frame = () => {
      x += (tx - x) * 0.025
      y += (ty - y) * 0.025
      // Fog travels at 12% of scroll speed, so it hangs behind the content.
      const s = (window.scrollY * 0.12) % tileH
      const next = `translate3d(${x.toFixed(1)}px, ${(y - s).toFixed(1)}px, 0)`
      if (next !== last) {
        lag.current.style.transform = next
        last = next
      }
      raf = requestAnimationFrame(frame)
    }
    window.addEventListener('pointermove', onMove, { passive: true })
    raf = requestAnimationFrame(frame)
    return () => {
      window.removeEventListener('pointermove', onMove)
      cancelAnimationFrame(raf)
    }
  }, [shown])

  if (!ready) return null
  return (
    <div ref={root} className={`fog ${shown ? 'is-ready' : ''}`} aria-hidden="true">
      <div className="fog-haze" />
      <div className="fog-plumes">
        <div ref={lag} className="fog-lag">
          <div className="fog-plume fog-plume-a" />
          <div className="fog-plume fog-plume-b" />
        </div>
      </div>
    </div>
  )
}

/** Gold-amber light bleeding through the fog. Position with className. */
export function LightBleed({ className = '' }) {
  const ready = useAtmosphereReady(1)
  return ready ? <div aria-hidden="true" className={`light-bleed atmos-in ${className}`} /> : null
}

/** Light falling from the rig onto the copy. Position with className. */
export function LightCone({ className = '' }) {
  const ready = useAtmosphereReady(1)
  return ready ? <div aria-hidden="true" className={`light-cone atmos-in ${className}`} /> : null
}

/** Low-lying fog bank for a section: dense at the floor, thinning upward. */
export function FogBank({ className = '' }) {
  const ready = useAtmosphereReady(1)
  if (!ready) return null
  return (
    <div aria-hidden="true" className={`fog-bank atmos-in ${className}`}>
      <div />
    </div>
  )
}

/**
 * Volumetric smoke for a full-bleed section: three drifting depths of the fog
 * texture on opposing winds, and soft plumes rolling up from the floor.
 */
const PLUMES = [
  { className: '-left-[15%] bottom-[-25%] h-[70%] w-[70%]', t: '38s', d: '0s' },
  { className: 'left-[30%] bottom-[-30%] h-[80%] w-[60%]', t: '46s', d: '-12s' },
  { className: '-right-[10%] bottom-[-20%] h-[75%] w-[55%]', t: '42s', d: '-24s' },
  { className: 'left-[5%] top-[20%] h-[55%] w-[45%] hidden md:block', t: '56s', d: '-8s' },
]

export function Smoke({ className = '' }) {
  const ready = useAtmosphereReady(0)
  if (!ready) return null
  return (
    <div aria-hidden="true" className={`smoke atmos-in ${className}`}>
      <div className="smoke-depth smoke-far" />
      <div className="smoke-depth smoke-mid" />
      {PLUMES.map((p) => (
        <div key={p.className} className={`smoke-plume ${p.className}`} style={{ '--t': p.t, '--d': p.d }} />
      ))}
      <div className="smoke-depth smoke-near" />
    </div>
  )
}

/** Warm key light, sized and placed with className. */
export function Spotlight({ className = '' }) {
  const ready = useAtmosphereReady(1)
  return ready ? <div aria-hidden="true" className={`spotlight atmos-in ${className}`} /> : null
}
