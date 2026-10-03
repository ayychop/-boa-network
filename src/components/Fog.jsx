import { useEffect, useRef, useState } from 'react'
import { createFogTexture } from '../lib/fogTexture'
import { prefersReducedMotion } from '../lib/gsap'

// Site-wide volumetric fog.
//   1. .fog-haze   — static base haze
//   2. .fog-plume  — slow plumes on one wind direction (CSS transform loops),
//                    nudged by the pointer and lagging behind scroll
//   3. .light-bleed / .fog-bank — placed per section (see LightBleed, FogBank)
// The texture is shared with section-level fog through the --fog-tex variable.
export default function Fog() {
  const root = useRef(null)
  const lag = useRef(null)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const build = () => {
      document.documentElement.style.setProperty('--fog-tex', `url(${createFogTexture()})`)
      setReady(true)
    }
    const idle = window.requestIdleCallback
    const id = idle ? idle(build, { timeout: 600 }) : setTimeout(build, 80)
    return () => (idle ? window.cancelIdleCallback(id) : clearTimeout(id))
  }, [])

  useEffect(() => {
    if (!ready || prefersReducedMotion()) return
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
  }, [ready])

  return (
    <div ref={root} className={`fog ${ready ? 'is-ready' : ''}`} aria-hidden="true">
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
  return <div aria-hidden="true" className={`light-bleed ${className}`} />
}

/** Low-lying fog bank for a section: dense at the floor, thinning upward. */
export function FogBank({ className = '' }) {
  return (
    <div aria-hidden="true" className={`fog-bank ${className}`}>
      <div />
    </div>
  )
}
