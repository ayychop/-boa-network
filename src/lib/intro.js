import { useEffect, useState } from 'react'
import { prefersReducedMotion } from './gsap'

// The loader's timeline, shared so the page can choreograph around it:
//   'pending' → the aperture is closed, nothing behind it should animate yet
//   'opening' → the iris is opening; hero entrances play into the reveal
//   'done'    → the loader is gone; heavy atmosphere may mount and fade in
export const INTRO_KEY = 'boa-intro-seen'

function willPlay() {
  try {
    return typeof window !== 'undefined' && !sessionStorage.getItem(INTRO_KEY) && !prefersReducedMotion()
  } catch {
    return false
  }
}

const playing = willPlay()
let phase = playing ? 'pending' : 'done'
const listeners = new Set()

export const introWillPlay = () => playing

export function setIntroPhase(next) {
  if (next === phase) return
  phase = next
  listeners.forEach((fn) => fn(next))
}

export function useIntroPhase() {
  const [value, setValue] = useState(phase)
  useEffect(() => {
    listeners.add(setValue)
    setValue(phase)
    return () => listeners.delete(setValue)
  }, [])
  return value
}

/**
 * True once the loader is gone and the browser has had a moment to settle.
 * `stage` staggers the heavy layers so they never all rasterise in one frame:
 * 0 hero smoke, 1 section light, 2 site-wide fog.
 */
const STAGE_GAP = 350

export function useAtmosphereReady(stage = 0) {
  const intro = useIntroPhase()
  const [ready, setReady] = useState(false)
  useEffect(() => {
    if (intro !== 'done') return
    let timer = 0
    const idle = window.requestIdleCallback
    const arm = () => (timer = setTimeout(() => setReady(true), stage * STAGE_GAP))
    const id = idle ? idle(arm, { timeout: 700 }) : setTimeout(arm, 250)
    return () => {
      idle ? window.cancelIdleCallback(id) : clearTimeout(id)
      clearTimeout(timer)
    }
  }, [intro, stage])
  return ready
}

/** The baked fog tile every fog layer draws with. */
export const FOG_TEX = '/media/fog.png'

/**
 * True once a hero's titles may play: the loader has unmounted, the hero's
 * own smoke (stage 0) has mounted, the webfonts are in and two frames have
 * painted. The site-wide fog is not waited for; it finishes behind the
 * titles. CUE_CAP bounds the wait, so the titles never sit out a slow idle
 * callback or font request.
 */
const CUE_CAP = 150

export function useEntranceCue() {
  const intro = useIntroPhase()
  const smoke = useAtmosphereReady(0)
  const [cue, setCue] = useState(false)
  // The cap counts from the loader's exit, whatever else is still loading.
  useEffect(() => {
    if (intro !== 'done') return
    const timer = setTimeout(() => setCue(true), CUE_CAP)
    return () => clearTimeout(timer)
  }, [intro])
  useEffect(() => {
    if (!smoke) return
    let live = true
    let raf = 0
    Promise.resolve(document.fonts?.ready).then(() => {
      raf = requestAnimationFrame(() => (raf = requestAnimationFrame(() => live && setCue(true))))
    })
    return () => {
      live = false
      cancelAnimationFrame(raf)
    }
  }, [smoke])
  return cue
}

/** Touch screens and tablet widths get the lighter atmosphere and entrances. */
export const isLiteDevice = () =>
  typeof window !== 'undefined' && window.matchMedia('(max-width: 1024px), (pointer: coarse)').matches
