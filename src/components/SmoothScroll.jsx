import { useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'
import Lenis from 'lenis'
import { gsap, ScrollTrigger, prefersReducedMotion } from '../lib/gsap'
import { useIntroPhase } from '../lib/intro'

let active = null

/** Pause or resume page scrolling (overlays use this; body overflow alone does not stop Lenis). */
export function lockScroll(locked) {
  if (active) locked ? active.stop() : active.start()
  document.documentElement.style.overflow = locked ? 'hidden' : ''
}

// Lenis smooth scroll, driven by GSAP's ticker so ScrollTrigger stays in sync.
// It starts only once the intro loader has finished and left the DOM, so the
// first scroll never competes with the iris or inherits its scroll lock.
export default function SmoothScroll() {
  const { pathname } = useLocation()
  const lenisRef = useRef(null)
  const ready = useIntroPhase() === 'done'

  useEffect(() => {
    if (!ready || prefersReducedMotion()) return
    window.scrollTo(0, 0)
    const lenis = new Lenis({ duration: 1.15, smoothWheel: true, anchors: true })
    lenisRef.current = lenis
    active = lenis
    lenis.on('scroll', ScrollTrigger.update)
    const tick = (time) => lenis.raf(time * 1000)
    gsap.ticker.add(tick)
    gsap.ticker.lagSmoothing(0)
    return () => {
      gsap.ticker.remove(tick)
      lenis.destroy()
      lenisRef.current = null
      active = null
    }
  }, [ready])

  // Keep trigger positions right as lazy pages and media change page height.
  useEffect(() => {
    let t
    const ro = new ResizeObserver(() => {
      clearTimeout(t)
      t = setTimeout(() => ScrollTrigger.refresh(), 200)
    })
    ro.observe(document.body)
    return () => {
      clearTimeout(t)
      ro.disconnect()
    }
  }, [])

  useEffect(() => {
    if (lenisRef.current) lenisRef.current.scrollTo(0, { immediate: true, force: true })
    else window.scrollTo(0, 0)
  }, [pathname])

  return null
}
