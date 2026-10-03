import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { prefersReducedMotion } from '../lib/gsap'

const KEY = 'boa-intro-seen'
const DURATION = 1900
const LINES = ['Calibrating light', 'Clearing the frame', 'Opening doors']

function shouldPlay() {
  try {
    return !sessionStorage.getItem(KEY) && !prefersReducedMotion()
  } catch {
    return false
  }
}

// HUD-style intro, shown once per browser session.
export default function Loader() {
  const [show, setShow] = useState(shouldPlay)
  const [n, setN] = useState(0)

  useEffect(() => {
    if (!show) return
    const start = performance.now()
    let raf = 0
    let done = 0
    const tick = (now) => {
      const p = Math.min(1, (now - start) / DURATION)
      setN(Math.round(100 * (1 - (1 - p) ** 3)))
      if (p < 1) raf = requestAnimationFrame(tick)
      else {
        try {
          sessionStorage.setItem(KEY, '1')
        } catch {
          /* private mode */
        }
        done = setTimeout(() => setShow(false), 320)
      }
    }
    raf = requestAnimationFrame(tick)
    return () => {
      cancelAnimationFrame(raf)
      clearTimeout(done)
    }
  }, [show])

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          role="status"
          aria-label="Loading BOA Network"
          className="fixed inset-0 z-[100] grid place-items-center bg-obsidian"
          exit={{ opacity: 0, scale: 1.06 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="relative grid aspect-square w-[min(72vw,420px)] place-items-center">
            <svg viewBox="0 0 200 200" className="absolute inset-0 h-full w-full" aria-hidden="true">
              <g className="hud-spin" style={{ animationDuration: '14s' }}>
                <circle cx="100" cy="100" r="96" fill="none" stroke="#5fe3f5" strokeOpacity=".35" strokeWidth=".5" strokeDasharray="1 5" />
                <path d="M100 2v10M100 188v10M2 100h10M188 100h10" stroke="#5fe3f5" strokeOpacity=".7" strokeWidth=".6" />
              </g>
              <circle cx="100" cy="100" r="82" fill="none" stroke="#fff" strokeOpacity=".07" strokeWidth="1" />
              <circle
                cx="100"
                cy="100"
                r="82"
                fill="none"
                stroke="#e2a84b"
                strokeWidth="1.2"
                strokeLinecap="round"
                pathLength="100"
                strokeDasharray={`${n} 100`}
                transform="rotate(-90 100 100)"
              />
              <g className="hud-spin" style={{ animationDuration: '9s', animationDirection: 'reverse' }}>
                <circle cx="100" cy="100" r="70" fill="none" stroke="#5fe3f5" strokeOpacity=".3" strokeWidth=".5" strokeDasharray="30 12 4 12" />
              </g>
            </svg>
            <div className="text-center">
              <div className="text-5xl font-semibold tracking-[-0.06em] sm:text-6xl">BOA</div>
              <div className="hud-label mt-2">Best Of All Networks</div>
            </div>
          </div>
          <div className="absolute inset-x-6 bottom-8 flex items-end justify-between sm:inset-x-12 sm:bottom-12">
            <span className="hud-label">{LINES[Math.min(LINES.length - 1, Math.floor(n / 34))]}</span>
            <span className="font-mono text-sm tabular-nums text-gold">{String(n).padStart(3, '0')}</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
