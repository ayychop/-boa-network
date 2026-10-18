import { motion } from 'framer-motion'
import Logo from './Logo'
import { HudCorners } from './ui'

/**
 * A stand-in for footage: the gold lockup breathing on black under film
 * grain, with a glint of light crossing the frame every five seconds.
 * Swap the whole component for a <video> when the reel is ready. It owns the
 * 2.39:1 frame, so nothing around it moves.
 */
export default function CinematicPlaceholder({ label, className = '' }) {
  return (
    <div className={`relative overflow-hidden bg-[#0a0a0a] ${className}`} style={{ aspectRatio: '2.39 / 1' }}>
      {/* A faint pool of warm light behind the mark */}
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{ background: 'radial-gradient(45% 70% at 50% 50%, rgb(226 168 75 / 0.09), transparent 70%)' }}
      />

      <div className="absolute inset-0 grid place-items-center">
        <div className="relative w-[44%] sm:w-[34%]">
          <motion.div
            aria-hidden="true"
            className="will-change-[opacity,transform]"
            initial={{ opacity: 0.1, scale: 0.985 }}
            animate={{ opacity: 0.3, scale: 1.015 }}
            transition={{ duration: 4, ease: 'easeInOut', repeat: Infinity, repeatType: 'mirror' }}
          >
            <Logo className="h-auto w-full text-gold" />
          </motion.div>
          {/* Set in the clear band between BOA and NETWORK (63% down the lockup) */}
          <p className="absolute inset-x-0 top-[63%] -translate-y-1/2 text-center">
            <span className="whitespace-nowrap pl-[0.42em] font-mono text-[clamp(0.4375rem,1.05vw,0.9375rem)] uppercase tracking-[0.42em] text-bone/90 [text-shadow:0_0_18px_rgb(0_0_0/0.9)]">
              Best of All Networks
            </span>
          </p>
        </div>
      </div>

      {/* The glint: 1.8s from edge to edge, then 3.2s of rest, so one pass every 5s */}
      <motion.div
        aria-hidden="true"
        className="cine-sweep pointer-events-none absolute inset-y-0 left-0 w-3/4 will-change-transform"
        initial={{ x: '-70%' }}
        animate={{ x: '100%' }}
        transition={{ duration: 1.8, ease: [0.45, 0, 0.25, 1], repeat: Infinity, repeatDelay: 3.2, delay: 1 }}
      />
      <div aria-hidden="true" className="cine-grain pointer-events-none absolute inset-0" />

      {label && <span className="hud-label absolute left-4 top-4 !text-[0.5625rem] !text-white/40">{label}</span>}
      <HudCorners inset="inset-3 sm:inset-5" />
    </div>
  )
}
