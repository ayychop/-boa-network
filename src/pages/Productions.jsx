import { useCallback, useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import CinematicImage from '../components/CinematicImage'
import { ProductionCard, StatusBadge } from '../components/cards'
import { FogBank, Smoke, Spotlight } from '../components/Fog'
import PlayMark from '../components/PlayMark'
import { lockScroll } from '../components/SmoothScroll'
import { Arrow, ClosingCTA, EASE_EXPO, MagneticButton, Reveal } from '../components/ui'
import { productionMeta, productions } from '../data/productions'
import { useIntroPhase } from '../lib/intro'

// Re-exported for anything still importing it from here.
export { FilterBar } from '../components/ui'

/** Full-screen theatre for a YouTube embed. Escape, the close button or the backdrop dismiss it. */
export function Theatre({ video, onClose }) {
  const close = useRef(null)
  useEffect(() => {
    if (!video) return
    const opener = document.activeElement
    lockScroll(true)
    close.current?.focus({ preventScroll: true })
    const onKey = (e) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    return () => {
      lockScroll(false)
      window.removeEventListener('keydown', onKey)
      opener?.focus?.({ preventScroll: true })
    }
  }, [video, onClose])

  return (
    <AnimatePresence>
      {video && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label={video.title}
          className="fixed inset-0 z-[70] grid place-items-center bg-black/95 p-4 sm:p-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.35 } }}
          transition={{ duration: 0.5 }}
          onClick={onClose}
        >
          <motion.div
            className="relative w-full max-w-[min(1400px,calc((100svh-8rem)*16/9))]"
            initial={{ scale: 0.92, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.96, opacity: 0 }}
            transition={{ duration: 0.8, ease: EASE_EXPO }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-4 flex items-center justify-between gap-4">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-gold">{video.title}</p>
              <button
                ref={close}
                type="button"
                onClick={onClose}
                aria-label="Close video"
                className="chip chip-fill grid h-11 w-11 place-items-center !p-0"
              >
                <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
                  <path d="M6 6l12 12M18 6L6 18" />
                </svg>
              </button>
            </div>
            <div className="relative aspect-video overflow-hidden rounded-sm bg-black shadow-[0_40px_120px_-30px_rgb(0_0_0/0.9)]">
              <iframe
                src={`${video.url}?autoplay=1&rel=0`}
                title={video.title}
                referrerPolicy="strict-origin-when-cross-origin"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className="absolute inset-0 h-full w-full border-0"
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

/** Watch-the-trailer control: the premiere play mark with a serif italic invitation. */
export function TrailerButton({ onClick, label = 'Watch the trailer' }) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      whileTap={{ scale: 0.97 }}
      className="group inline-flex items-center gap-5 text-left outline-none"
    >
      <PlayMark size="md" />
      <span className="font-display text-2xl italic text-bone transition-colors duration-500 group-hover:text-gold sm:text-[1.75rem]">
        {label}
      </span>
    </motion.button>
  )
}

function FeaturedHero({ production: p, onPlay }) {
  const meta = productionMeta(p)
  const go = useIntroPhase() !== 'pending'
  return (
    <section aria-labelledby={`title-${p.slug}`} className="relative min-h-[100svh] overflow-hidden bg-obsidian">
      <motion.div
        className="absolute inset-0"
        initial={{ opacity: 0, scale: 1.08 }}
        animate={go ? { opacity: 1, scale: 1 } : undefined}
        transition={{ duration: 2.2, ease: EASE_EXPO }}
      >
        <div className="slow-zoom absolute inset-0">
          <CinematicImage src={p.still} alt="" ratio="fill" tone={p.tone} priority className="h-full w-full" />
        </div>
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-r from-obsidian/90 via-obsidian/35 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/30 to-obsidian/40" />
      <Smoke />
      <FogBank />
      <Spotlight className="-left-[40%] bottom-[-25%] h-[80%] w-[160vw] opacity-60 sm:-left-[15%] sm:w-[85vw]" />
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 h-[35%] bg-gradient-to-t from-obsidian via-obsidian/80 to-transparent" />

      <div className="above-fog container-x flex min-h-[100svh] flex-col justify-end pb-14 pt-32 sm:pb-20">

        <h2 id={`title-${p.slug}`} className="text-[clamp(3.5rem,11vw,10rem)] leading-[0.98] text-bone">
          <span className="block overflow-hidden pb-[0.1em]">
            <motion.span
              className="block"
              initial={{ y: '110%' }}
              animate={go ? { y: 0 } : undefined}
              transition={{ duration: 1.5, ease: EASE_EXPO, delay: 0.35 }}
            >
              {p.title}
            </motion.span>
          </span>
        </h2>

        <motion.div
          className="mt-8 grid gap-10 lg:grid-cols-[minmax(0,36rem)_auto] lg:items-end lg:justify-between"
          initial={{ opacity: 0, y: 24 }}
          animate={go ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: 1.4, ease: EASE_EXPO, delay: 0.75 }}
        >
          <div>
            <p className="mb-4 flex flex-wrap items-center gap-3 text-[0.6875rem] font-bold uppercase tracking-[0.2em]">
              <span className="text-gold">Featured</span>
              <span aria-hidden="true" className="h-px w-8 bg-gold/60" />
              {meta && <span className="font-mono font-normal tracking-[0.16em] text-bone/80">{meta}</span>}
              {p.status && <StatusBadge status={p.status} />}
            </p>
            {p.logline && <p className="text-lg leading-relaxed text-bone/85 sm:text-xl">{p.logline}</p>}
          </div>
          <div className="flex flex-wrap items-center gap-x-10 gap-y-6">
            {p.trailer && <TrailerButton onClick={() => onPlay(p.trailer)} />}
            <MagneticButton to={`/productions/${p.slug}`} variant="ghost">
              View Project <Arrow />
            </MagneticButton>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

// Staggered editorial grid: alternating crops, with the middle column dropped
// so the row reads like a magazine spread rather than a shelf.
const LAYOUT = [
  { ratio: '4 / 5', className: 'lg:col-span-5' },
  { ratio: '3 / 4', className: 'lg:col-span-4 lg:col-start-7 lg:mt-40' },
  { ratio: '16 / 9', className: 'lg:col-span-7 lg:col-start-3 lg:mt-24' },
  { ratio: '4 / 5', className: 'lg:col-span-4 lg:col-start-9 lg:mt-24' },
]

export default function Productions() {
  const [playing, setPlaying] = useState(null)
  const closeTheatre = useCallback(() => setPlaying(null), [])
  const featured = productions.find((p) => p.featured) ?? productions[0]
  const rest = productions.filter((p) => p !== featured)

  return (
    <>
      <title>Productions — BOA Network</title>
      <meta name="description" content="Films, series and television from BOA Network: in development, in production and released." />

      <h1 className="sr-only">The slate</h1>
      <FeaturedHero production={featured} onPlay={setPlaying} />

      <section className="section relative !pt-16 sm:!pt-24">
        <div className="container-x">
          <div className="mb-14 flex flex-col gap-6 sm:mb-24 lg:flex-row lg:items-end lg:justify-between">
            <Reveal as="h2" className="display-lg">
              The <span className="accent">slate.</span>
            </Reveal>
            <Reveal as="p" className="lede max-w-md" delay={0.1}>
              Film, series and television, each one built with roles for talent the industry has not met yet.
            </Reveal>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 sm:gap-8 lg:grid-cols-12 lg:gap-x-10 lg:gap-y-0">
            {rest.map((p, i) => {
              const cell = LAYOUT[i % LAYOUT.length]
              return (
                <Reveal key={p.slug} delay={(i % 2) * 0.12} className={`${cell.className} ${i === 2 ? 'sm:col-span-2' : ''}`}>
                  <ProductionCard production={p} ratio={cell.ratio} />
                </Reveal>
              )
            })}
          </div>
        </div>
      </section>

      <ClosingCTA
        title={
          <>
            There is a role <span className="accent">with your name on it.</span>
          </>
        }
        body="Every production on this slate is casting, or will be. Get on our radar before the call goes out."
      />

      <Theatre video={playing} onClose={closeTheatre} />
    </>
  )
}
