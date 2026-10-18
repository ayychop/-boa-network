import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { LightBleed } from './Fog'

// easeInOutExpo. Every entrance on the site runs on this curve: it holds,
// commits, then settles, which reads as deliberate rather than snappy.
export const EASE_EXPO = [0.87, 0, 0.13, 1]
const EASE = EASE_EXPO

// Hero title entrances are the exception: a quick fade and a short rise on
// easeOutExpo, so they land crisply the moment the frame is ready. Pieces
// follow each other by 100ms via `heroEnter(delay)`.
export const EASE_OUT_EXPO = [0.16, 1, 0.3, 1]
export const HERO_HIDDEN = { opacity: 0, y: 20 }
export const HERO_SHOWN = { opacity: 1, y: 0 }
export const heroEnter = (delay) => ({
  opacity: { duration: 0.4, ease: 'linear', delay },
  y: { duration: 0.9, ease: EASE_OUT_EXPO, delay },
})

/** Fade-and-rise on scroll into view. */
export function Reveal({ as = 'div', delay = 0, y = 44, className = '', children, ...rest }) {
  const Tag = motion[as] ?? motion.div
  return (
    <Tag
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -12% 0px' }}
      transition={{ duration: 1.2, ease: EASE, delay }}
      {...rest}
    >
      {children}
    </Tag>
  )
}

const MotionLink = motion.create(Link)

/**
 * Pointer pull for any element: returns spring-smoothed x/y and the handlers.
 * `strength` is how far toward the cursor the element travels.
 */
export function useMagnetic(strength = 0.35) {
  const ref = useRef(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const spring = { stiffness: 260, damping: 18, mass: 0.45 }
  const sx = useSpring(x, spring)
  const sy = useSpring(y, spring)

  const onPointerMove = (e) => {
    if (e.pointerType !== 'mouse') return
    const r = ref.current.getBoundingClientRect()
    x.set((e.clientX - (r.left + r.width / 2)) * strength)
    y.set((e.clientY - (r.top + r.height / 2)) * strength * 1.3)
  }
  const onPointerLeave = () => {
    x.set(0)
    y.set(0)
  }
  return { ref, x: sx, y: sy, onPointerMove, onPointerLeave }
}

/** Button that leans toward the cursor. Renders a Link (`to`), <a> (`href`) or <button>. */
export function MagneticButton({ to, href, variant = 'primary', className = '', children, ...rest }) {
  const { ref, x, y, onPointerMove, onPointerLeave } = useMagnetic(0.32)
  // The label travels further than the shell, so the button feels like it has depth.
  const lx = useTransform(x, (v) => v * 0.45)
  const ly = useTransform(y, (v) => v * 0.45)

  const Comp = to ? MotionLink : href ? motion.a : motion.button
  return (
    <Comp
      ref={ref}
      to={to}
      href={href}
      style={{ x, y }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: 'spring', stiffness: 500, damping: 26 }}
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
      className={`btn ${variant === 'primary' ? 'btn-primary' : 'btn-ghost'} ${className}`}
      {...rest}
    >
      <motion.span className="btn-label" style={{ x: lx, y: ly }}>
        {children}
      </motion.span>
    </Comp>
  )
}

/** Pill toggles for filtering a list. */
export function FilterBar({ label, options, value, onChange, counts }) {
  return (
    <div role="group" aria-label={label} className="flex flex-wrap gap-2">
      {options.map((opt) => {
        const active = value === opt
        return (
          <button key={opt} type="button" aria-pressed={active} onClick={() => onChange(opt)} className="chip">
            {opt}
            <span className={`ml-2 font-mono text-xs transition-colors duration-500 ${active ? 'text-obsidian/70' : 'text-mist'}`}>
              {counts[opt]}
            </span>
          </button>
        )
      })}
    </div>
  )
}

export function Arrow({ className = '' }) {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.6" className={className} aria-hidden="true">
      <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

/** Four thin off-white corner ticks around the parent (parent must be relative). */
export function HudCorners({ inset = 'inset-3' }) {
  return (
    <div aria-hidden="true" className={`pointer-events-none absolute ${inset}`}>
      <span className="hud-corner left-0 top-0 border-l border-t" />
      <span className="hud-corner right-0 top-0 border-r border-t" />
      <span className="hud-corner bottom-0 left-0 border-b border-l" />
      <span className="hud-corner bottom-0 right-0 border-b border-r" />
    </div>
  )
}

export function SectionLabel({ index, children }) {
  return (
    <div className="mb-10 flex items-center gap-5 sm:mb-16 sm:gap-6">
      <span className="hud-label section-label">{index}</span>
      <span className="hud-line w-16 sm:w-36" />
      <span className="hud-label section-label !text-hud">{children}</span>
    </div>
  )
}

/** Shared top-of-page header for the inner pages. */
export function PageHeader({ index, label, title, lede, children }) {
  return (
    <header className="relative overflow-hidden pb-16 pt-40 sm:pb-24 sm:pt-52 lg:pt-64">
      <LightBleed className="-right-[20%] -top-[30%] h-[90vh] w-[90vw] sm:w-[60vw]" />
      <div className="container-x relative">
        <Reveal y={20}>
          <SectionLabel index={index}>{label}</SectionLabel>
        </Reveal>
        <Reveal as="h1" className="display-xl max-w-[14ch]" delay={0.05}>
          {title}
        </Reveal>
        {lede && (
          <Reveal as="p" className="lede mt-10 max-w-2xl sm:mt-14" delay={0.15}>
            {lede}
          </Reveal>
        )}
        {children}
      </div>
    </header>
  )
}

/** Closing call-to-action band used at the foot of most pages. */
export function ClosingCTA({
  title = (
    <>
      Your face belongs <span className="accent">on screen.</span>
    </>
  ),
  body = 'No agent. No followers. No fee. Send us what you have and a real person will watch it.',
}) {
  return (
    <section className="section relative overflow-hidden">
      <LightBleed className="-bottom-[45%] left-1/2 h-[110vh] w-[120vw] -translate-x-1/2 sm:w-[80vw]" />
      <div className="container-x relative text-center">
        <Reveal as="h2" className="display-lg mx-auto max-w-[14ch]">
          {title}
        </Reveal>
        <Reveal as="p" className="lede mx-auto mt-8 max-w-xl" delay={0.1}>
          {body}
        </Reveal>
        <Reveal className="mt-12 flex flex-wrap items-center justify-center gap-4" delay={0.2}>
          <MagneticButton to="/contact?form=talent">
            Get seen <Arrow />
          </MagneticButton>
          <MagneticButton to="/access" variant="ghost">
            How access works
          </MagneticButton>
        </Reveal>
      </div>
    </section>
  )
}
