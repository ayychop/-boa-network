import { useRef } from 'react'
import { useInView } from 'framer-motion'
import Logo from './Logo'
import { HudCorners } from './ui'

/**
 * The stand-in for missing footage: the gold lockup breathing on black under
 * film grain, with a glint of light crossing the frame every five seconds.
 * It fills whatever box it is placed in and sizes itself from that box
 * (container query units), so one version serves 2.39:1, 16:9, 2:3 and 1:1.
 *
 * The loops are CSS keyframes on opacity and transform only, so they run off
 * the main thread, and each instance pauses while it is off screen.
 *
 * `backdrop` drops the centred lockup for full-bleed heroes, where the page's
 * own copy sits on top.
 */
export function PlaceholderArt({ backdrop = false }) {
  const ref = useRef(null)
  const inView = useInView(ref, { margin: '200px' })
  return (
    <div ref={ref} aria-hidden="true" className={`cine-art absolute inset-0 overflow-hidden ${inView ? '' : 'is-paused'}`}>
      <div className="cine-pool absolute inset-0" />
      {!backdrop && (
        <div className="cine-stage absolute inset-0 grid place-items-center">
          <div className="cine-mark relative">
            <div className="cine-pulse">
              <Logo className="h-auto w-full text-gold" />
            </div>
            {/* Set in the clear band between BOA and NETWORK (63% down the lockup) */}
            <p className="cine-tagline">Best of All Networks</p>
          </div>
        </div>
      )}
      <div className="cine-sweep" />
      <div className="cine-grain absolute inset-0" />
    </div>
  )
}

/**
 * A framed placeholder for a slot that will later hold a <video>. Swap the
 * whole component out: it owns its aspect ratio, so nothing around it moves.
 */
export default function CinematicPlaceholder({ label, ratio = '2.39 / 1', className = '' }) {
  return (
    <div className={`relative overflow-hidden ${className}`} style={{ aspectRatio: ratio }}>
      <PlaceholderArt />
      {label && <span className="hud-label absolute left-4 top-4 !text-[0.5625rem] !text-white/40">{label}</span>}
      <HudCorners inset="inset-3 sm:inset-5" />
    </div>
  )
}
