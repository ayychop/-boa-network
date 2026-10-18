import { useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import CinematicImage from '../components/CinematicImage'
import { StatusBadge } from '../components/cards'
import { LightBleed, Smoke, Spotlight } from '../components/Fog'
import { Arrow, ClosingCTA, EASE_EXPO, HudCorners, MagneticButton, Reveal } from '../components/ui'
import { STATUS, productionMeta, productions } from '../data/productions'
import { useIntroPhase } from '../lib/intro'

// Re-exported for anything still importing it from here.
export { FilterBar } from '../components/ui'

function PlayIcon() {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true">
      <path d="M7 4.5v15a.6.6 0 0 0 .9.5l12-7.5a.6.6 0 0 0 0-1l-12-7.5a.6.6 0 0 0-.9.5z" />
    </svg>
  )
}

/** Full-bleed featured title. The episode loads only when asked for. */
function FeaturedHero({ production: p }) {
  // Entrances wait for the loader's iris (a direct visit here also plays it).
  const go = useIntroPhase() !== 'pending'
  const [playing, setPlaying] = useState(false)
  const meta = productionMeta(p)

  return (
    <section aria-labelledby={`title-${p.slug}`} className="relative">
      <div className="relative min-h-[min(92svh,60rem)] overflow-hidden">
        <motion.div
          className="absolute inset-0"
          initial={{ scale: 1.15, opacity: 0 }}
          animate={go ? { scale: 1, opacity: 1 } : undefined}
          transition={{ duration: 2.2, ease: EASE_EXPO }}
        >
          <div className="push-in absolute inset-0">
            <CinematicImage src={p.still} alt="" ratio="fill" tone={p.tone} priority className="h-full w-full" />
          </div>
        </motion.div>
        {/* Two scrims: one lifts the copy off the frame, one hands over to the rail */}
        <div className="absolute inset-0 bg-gradient-to-r from-obsidian via-obsidian/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/20 to-obsidian/50" />
        <Smoke />
        <Spotlight className="-left-[40%] bottom-[-20%] h-[90%] w-[150vw] sm:-left-[15%] sm:w-[80vw]" />
        {/* Last atmospheric layer: fade every light and smoke layer into the page below */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 h-[30%] bg-gradient-to-t from-obsidian via-obsidian/70 to-transparent" />
        <HudCorners inset="inset-x-2 bottom-2 top-28 sm:inset-x-3 sm:top-32 lg:inset-x-5" />

        <div className="container-x relative flex min-h-[min(92svh,60rem)] flex-col justify-end pb-16 pt-44 sm:pb-24 sm:pt-52">
          <motion.div
            className="mb-6 flex flex-wrap items-center gap-3 sm:mb-8"
            initial={{ opacity: 0, y: 16 }}
            animate={go ? { opacity: 1, y: 0 } : undefined}
            transition={{ duration: 1.3, ease: EASE_EXPO, delay: 0.4 }}
          >
            <span className="hud-label !text-gold">Featured</span>
            <span className="hud-line w-12" />
            {meta && <span className="hud-label !text-mist">{meta}</span>}
            {p.status && <StatusBadge status={p.status} />}
          </motion.div>

          <h2 id={`title-${p.slug}`} className="title-serif max-w-[11ch] text-[clamp(4rem,14vw,14rem)]">
            <span className="block overflow-hidden pb-[0.12em]">
              <motion.span
                className="block"
                initial={{ y: '110%' }}
                animate={go ? { y: 0 } : undefined}
                transition={{ duration: 1.6, ease: EASE_EXPO, delay: 0.5 }}
              >
                {p.title}
              </motion.span>
            </span>
          </h2>

          <motion.div
            className="mt-6 grid gap-8 sm:mt-8 lg:grid-cols-[minmax(0,38rem)_auto] lg:items-end lg:justify-between"
            initial={{ opacity: 0, y: 24 }}
            animate={go ? { opacity: 1, y: 0 } : undefined}
            transition={{ duration: 1.4, ease: EASE_EXPO, delay: 0.85 }}
          >
            {p.logline && <p className="lede !text-bone/80">{p.logline}</p>}
            {p.video && (
              <div className="flex flex-wrap gap-4">
                <MagneticButton type="button" onClick={() => setPlaying(true)} aria-controls={`player-${p.slug}`}>
                  <PlayIcon /> Play {p.video.title.split(' - ').pop()}
                </MagneticButton>
              </div>
            )}
          </motion.div>
        </div>
      </div>

      {p.video && (
        <AnimatePresence initial={false}>
          {playing && (
            <motion.div
              id={`player-${p.slug}`}
              className="container-x"
              initial={{ opacity: 0, clipPath: 'inset(0 0 100% 0 round 1rem)' }}
              animate={{ opacity: 1, clipPath: 'inset(0 0 0% 0 round 1rem)' }}
              transition={{ duration: 1.1, ease: EASE_EXPO }}
            >
              <div className="glow-border relative overflow-hidden rounded-xl bg-black sm:rounded-2xl" style={{ aspectRatio: '16 / 9' }}>
                <iframe
                  src={`${p.video.url}?autoplay=1&rel=0`}
                  title={p.video.title}
                  referrerPolicy="strict-origin-when-cross-origin"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  className="absolute inset-0 h-full w-full border-0"
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      )}
    </section>
  )
}

/** Poster that grows out of the rail on hover and gives up its logline. */
function Poster({ production: p, index }) {
  const meta = productionMeta(p)
  const detail = p.logline || (p.status ? STATUS[p.status] : null)
  return (
    <motion.article
      tabIndex={0}
      aria-label={[p.title, meta, p.logline].filter(Boolean).join('. ')}
      className="group relative w-[clamp(14rem,62vw,22rem)] outline-none sm:w-[clamp(15rem,30vw,22rem)]"
      initial={{ opacity: 0, x: 60 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '0px -5% 0px 0px' }}
      transition={{ duration: 1.2, ease: EASE_EXPO, delay: index * 0.1 }}
    >
      <div className="relative origin-bottom transition-[transform,box-shadow] duration-700 ease-[var(--ease-cine)] group-hover:z-10 group-hover:scale-[1.06] group-hover:shadow-[0_40px_80px_-30px_rgb(0_0_0/0.9),0_0_60px_-20px_rgb(226_168_75/0.45)] group-focus-visible:scale-[1.06] group-focus-visible:outline group-focus-visible:outline-1 group-focus-visible:outline-gold">
        <CinematicImage
          src={p.image}
          alt=""
          ratio="poster"
          tone={p.tone}
          label="Poster · 2:3"
          className="rounded-xl sm:rounded-2xl"
        >
          <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/30 to-transparent transition-opacity duration-700 group-hover:opacity-100 sm:opacity-80" />
          {p.status && (
            <div className="absolute right-4 top-4">
              <StatusBadge status={p.status} />
            </div>
          )}
          <div className="absolute inset-x-5 bottom-5 sm:inset-x-6 sm:bottom-6">
            <h3 className="title-serif text-[clamp(2.75rem,5vw,4.25rem)] transition-transform duration-700 ease-[var(--ease-cine)] group-hover:-translate-y-1">
              {p.title}
            </h3>
            {(meta || detail) && (
              <div className="grid grid-rows-[0fr] opacity-0 transition-[grid-template-rows,opacity] duration-700 ease-[var(--ease-cine)] group-hover:grid-rows-[1fr] group-hover:opacity-100 group-focus-visible:grid-rows-[1fr] group-focus-visible:opacity-100 [@media(hover:none)]:grid-rows-[1fr] [@media(hover:none)]:opacity-100">
                <div className="overflow-hidden">
                  {meta && <p className="hud-label mt-4 !text-gold">{meta}</p>}
                  {detail && detail !== meta && (
                    <p className="mt-2 line-clamp-4 text-sm leading-relaxed text-bone/80">{detail}</p>
                  )}
                </div>
              </div>
            )}
          </div>
        </CinematicImage>
      </div>
    </motion.article>
  )
}

function Rail({ title, items }) {
  const track = useRef(null)
  const scroll = (dir) => {
    const el = track.current
    el.scrollBy({ left: dir * el.clientWidth * 0.8, behavior: 'smooth' })
  }
  return (
    <section aria-label={typeof title === 'string' ? title : 'More productions'} className="relative py-16 sm:py-24">
      <div className="container-x flex items-end justify-between gap-6">
        <Reveal as="h2" className="display-md">
          {title}
        </Reveal>
        <div className="hidden gap-2 sm:flex">
          {[-1, 1].map((dir) => (
            <button
              key={dir}
              type="button"
              aria-label={dir < 0 ? 'Scroll back' : 'Scroll forward'}
              onClick={() => scroll(dir)}
              className="chip chip-fill grid h-12 w-12 place-items-center !p-0"
            >
              <Arrow className={dir < 0 ? 'rotate-180' : ''} />
            </button>
          ))}
        </div>
      </div>
      <div
        ref={track}
        className="rail [--rail-pad:1.25rem] sm:[--rail-pad:2rem] lg:[--rail-pad:max(3.5rem,calc((100vw_-_1600px)/2_+_3.5rem))]"
      >
        {items.map((p, i) => (
          <Poster key={p.slug} production={p} index={i} />
        ))}
      </div>
    </section>
  )
}

export default function Productions() {
  const featured = productions.find((p) => p.featured) ?? productions[0]
  const rest = productions.filter((p) => p !== featured)

  return (
    <>
      <title>Productions — BOA Network</title>
      <meta name="description" content="Films, series and television from BOA Network: in development, in production and released." />

      <h1 className="sr-only">The slate</h1>
      <FeaturedHero production={featured} />

      <div className="relative overflow-hidden">
        <LightBleed className="-right-[30%] top-0 h-[90vh] w-[90vw] sm:w-[55vw]" />
        <div className="container-x relative pt-16 sm:pt-24">
          <Reveal as="p" className="lede max-w-2xl">
            Film, series and television, each one built with roles for talent the industry has not met yet.
          </Reveal>
        </div>
        <Rail
          title={
            <>
              The <span className="accent">slate.</span>
            </>
          }
          items={rest}
        />
      </div>

      <ClosingCTA
        title={
          <>
            There is a role <span className="accent">with your name on it.</span>
          </>
        }
        body="Every production on this slate is casting, or will be. Get on our radar before the call goes out."
      />
    </>
  )
}
