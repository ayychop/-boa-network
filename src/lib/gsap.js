import { useLayoutEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

/**
 * Run scroll-driven GSAP setup scoped to `scope`, only when the visitor
 * hasn't asked for reduced motion. Everything is reverted on unmount.
 */
export function useScrollFx(scope, setup, deps = []) {
  useLayoutEffect(() => {
    const mm = gsap.matchMedia(scope)
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      setup(gsap, ScrollTrigger)
    })
    return () => mm.revert()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)
}

export { gsap, ScrollTrigger }
