import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, useScroll, useTransform } from 'framer-motion'
import CinematicImage from '../components/CinematicImage'
import Showreel from '../components/Showreel'
import { FogBank, LightBleed, LightCone, Smoke, Spotlight } from '../components/Fog'
import { ProductionCard, StatusBadge } from '../components/cards'
import { Arrow, ClosingCTA, EASE_EXPO, HudCorners, MagneticButton, Reveal, SectionLabel } from '../components/ui'
import { useScrollFx } from '../lib/gsap'
import { isLiteDevice, useIntroPhase } from '../lib/intro'
import { founders, site } from '../data/site'
import { productionMeta, productions } from '../data/productions'
import { barriers } from '../data/access'

// Swap for a real still, e.g. '/media/hero.jpg'
const HERO_IMAGE = null

const EASE = EASE_EXPO
const MISSION =
  'Talent is everywhere. Opportunity is not. BOA Network exists to close that gap with real roles, on real productions, for people who were never handed a way in.'

function Hero() {
  const root = useRef(null)
  // Entrances wait for the loader's iris, so they play into the reveal
  // instead of finishing unseen behind it.
  const go = useIntroPhase() !== 'pending'
  // Animating a blur filter on headline-sized text is costly on phone GPUs:
  // touch screens get the same rise without it.
  const [lite] = useState(isLiteDevice)

  // The headline is also capped by viewport height (19svh) so that on short
  // desktop windows the copy stays clear of the fixed header.
  // Scroll continues the slow camera push-in and lets the copy fall away.
  useScrollFx(root, (gsap) => {
    const scrollTrigger = { trigger: root.current, start: 'top top', end: 'bottom top', scrub: true }
    gsap.to('.hero-media', { scale: 1.22, yPercent: 8, ease: 'none', scrollTrigger })
    gsap.to('.hero-copy', { yPercent: -14, opacity: 0, ease: 'none', scrollTrigger })
  })

  return (
    <section ref={root} className="relative min-h-[100svh] overflow-hidden">
      <div className="hero-media absolute inset-0 will-change-transform">
        <div className="push-in absolute inset-0">
          <CinematicImage src={HERO_IMAGE} alt="" ratio="fill" tone="amber" priority className="h-full w-full" />
        </div>
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/45 to-obsidian/70" />
      <LightBleed className="-bottom-[35%] right-[-25%] h-[110vh] w-[130vw] sm:right-[-5%] sm:w-[70vw]" />
      {/* A rig light falls on the copy; the smoke catches it on the way down. */}
      <LightCone className="-top-[10%] left-[-30%] h-[120%] w-[130%] sm:left-[-35%] sm:w-[110%]" />
      <Smoke />
      <FogBank />

      <motion.div
        aria-hidden="true"
        className="absolute inset-0"
        initial={{ opacity: 0 }}
        animate={go ? { opacity: 1 } : undefined}
        transition={{ duration: 2.4, ease: EASE, delay: 0.1 }}
      >
        <Spotlight className="-left-[35%] bottom-[-15%] h-[95%] w-[150vw] sm:-left-[12%] sm:bottom-[-12%] sm:w-[85vw] lg:w-[72vw]" />
      </motion.div>
      {/* Last atmospheric layer: fade every light and smoke layer into the page below */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 h-[30%] bg-gradient-to-t from-obsidian via-obsidian/70 to-transparent" />

      <HudCorners inset="inset-x-2 bottom-2 top-28 sm:inset-x-3 sm:top-32 lg:inset-x-5" />
      <div aria-hidden="true" className="absolute right-5 top-28 hidden text-right sm:right-10 sm:top-48 md:block lg:right-16">
        <p className="hud-label flex items-center justify-end gap-2">
          <span className="hud-pulse h-1.5 w-1.5 rounded-full bg-gold" /> Scene 01 · Take 01
        </p>
        <p className="hud-label mt-2 !text-mist">2.39 : 1 · {site.location}</p>
      </div>

      <div className="hero-copy container-x relative flex min-h-[100svh] flex-col justify-end pb-10 pt-36 sm:pb-12 sm:pt-44 lg:pb-14">
        <motion.p
          className="hud-label mb-6 sm:mb-8"
          initial={{ opacity: 0, y: 12 }}
          animate={go ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: 1.4, ease: EASE, delay: 0.2 }}
        >
          Film · Series · Television
        </motion.p>
        <h1 className="hero-title text-[length:clamp(3.4rem,min(13.5vw,20svh),13.5rem)]">
          {['The door', 'is open.'].map((line, i) => (
            <span key={line} className="block overflow-hidden pb-[0.1em]">
              <motion.span
                className={`block ${i === 1 ? 'accent hero-accent' : ''}`}
                initial={lite ? { y: '110%' } : { y: '110%', filter: 'blur(14px)' }}
                animate={go ? (lite ? { y: 0 } : { y: 0, filter: 'blur(0px)' }) : undefined}
                transition={{ duration: 1.6, ease: EASE, delay: 0.3 + i * 0.16 }}
              >
                {line}
              </motion.span>
            </span>
          ))}
        </h1>
        <motion.div
          className="mt-8 flex flex-col gap-8 sm:mt-10 lg:flex-row lg:items-end lg:justify-between"
          initial={{ opacity: 0, y: 24 }}
          animate={go ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: 1.4, ease: EASE, delay: 0.75 }}
        >
          <p className="lede max-w-xl !text-bone/80">
            BOA Networks is a UK production company dedicated to creating cinematic film and television while casting
            creative talent from all walks of life.
          </p>
          <div className="flex flex-wrap gap-4">
            <MagneticButton to="/contact?form=talent">
              Get seen <Arrow />
            </MagneticButton>
            <MagneticButton href="#showreel" variant="ghost">
              Watch the reel
            </MagneticButton>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

const MISSION_WORDS = MISSION.split(' ')
const DIM = '#333333' // resting colour: dark grey on the dark ground, never invisible
const LIT = '#f3efe8' // bone, the site's white
const RAMP = 0.12 // share of the scroll range each word takes to light: short, so it reads as a wave

/** One word, lighting up as the reader's scroll reaches it. Colour only, so no layout work. */
function LitWord({ progress, index, count, children }) {
  const start = (index / count) * (1 - RAMP)
  const color = useTransform(progress, [start, start + RAMP], [DIM, LIT], { clamp: true })
  return <motion.span style={{ color }}>{children}</motion.span>
}

/**
 * The mission, lit as you read it. Lighting starts as soon as the paragraph's
 * top crosses into the bottom of the screen (90% down) and the last word
 * lights as the paragraph's end reaches 40% down. Past that it stays lit;
 * scrolling back up dims it again. It runs on every device: it is a colour
 * change, not movement.
 */
function MissionStatement() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.9', 'end 0.4'] })
  return (
    <p ref={ref} className="mission-statement text-bone">
      {MISSION_WORDS.map((word, i) => (
        <LitWord key={i} progress={scrollYProgress} index={i} count={MISSION_WORDS.length}>
          {word}
          {i < MISSION_WORDS.length - 1 ? ' ' : ''}
        </LitWord>
      ))}
    </p>
  )
}

function Mission() {
  return (
    <section className="section mission-section">
      <div className="container-x">
        <SectionLabel index="01">The mission</SectionLabel>
        {/* Lights up word by word as it scrolls into the centre of the screen. */}
        <MissionStatement />

        <div className="mt-20 grid gap-px overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.08] sm:mt-28 sm:grid-cols-2 lg:grid-cols-4">
          {barriers.map((b, i) => (
            <Reveal key={b} delay={i * 0.08} className="bg-obsidian p-6 sm:p-8">
              <p className="hud-label section-label mb-10 sm:mb-16">Not a barrier · 0{i + 1}</p>
              <p className="text-3xl font-semibold tracking-[-0.04em] text-bone/40 line-through decoration-gold decoration-2 sm:text-4xl">
                {b}
              </p>
            </Reveal>
          ))}
        </div>
        <Reveal className="mt-10">
          <Link to="/access" className="group inline-flex items-center gap-3 text-gold">
            See how access works
            <Arrow className="transition-transform duration-500 group-hover:translate-x-1.5" />
          </Link>
        </Reveal>
      </div>
    </section>
  )
}

function Reel() {
  return (
    <section id="showreel" className="section scroll-mt-10 !pt-0">
      <div className="container-x">
        <SectionLabel index="02">Showreel</SectionLabel>
        <div className="space-y-16 sm:space-y-24">
          {site.showreel.map((video) => (
            <Reveal key={video.url}>
              <p className="hud-label mb-4 !text-gold sm:mb-5">{video.label}</p>
              <Showreel url={video.url} title={video.title} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

function Featured() {
  const featured = productions.filter((p) => p.featured)
  const upcoming = productions.filter((p) => !p.featured)
  return (
    <section className="section relative !pt-0">
      <div className="container-x">
        <SectionLabel index="03">Featured productions</SectionLabel>
        <div className="mb-14 flex flex-col gap-6 sm:mb-20 lg:flex-row lg:items-end lg:justify-between">
          <Reveal as="h2" className="display-lg max-w-[12ch]">
            Stories worth <span className="accent">the big screen.</span>
          </Reveal>
          <Reveal delay={0.1}>
            <MagneticButton to="/productions" variant="ghost">
              All productions <Arrow />
            </MagneticButton>
          </Reveal>
        </div>

        <div className="space-y-16 sm:space-y-28">
          {featured.map((p, i) => (
            <Reveal key={p.slug} as="article">
              {p.video && (
                <div
                  className="glow-border relative overflow-hidden rounded-xl bg-black sm:rounded-2xl"
                  style={{ aspectRatio: '2.39 / 1' }}
                >
                  <iframe
                    src={p.video.url}
                    title={p.video.title}
                    referrerPolicy="strict-origin-when-cross-origin"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    loading="lazy"
                    style={{ width: '100%', height: '100%', border: 0 }}
                  />
                  <HudCorners inset="inset-3 sm:inset-5" />
                </div>
              )}
              <Link to="/productions" className="group block" aria-label={`${p.title} — view productions`}>
                {!p.video && (
                  <CinematicImage
                    src={p.still}
                    alt=""
                    tone={p.tone}
                    parallax
                    label="Still · 2.39:1"
                    className="rounded-xl sm:rounded-2xl"
                  >
                    <div className="absolute inset-0 bg-gradient-to-t from-obsidian/85 via-transparent to-transparent" />
                    <HudCorners inset="inset-3 sm:inset-5" />
                    {p.status && (
                      <div className="absolute right-4 top-4 sm:right-8 sm:top-8">
                        <StatusBadge status={p.status} />
                      </div>
                    )}
                  </CinematicImage>
                )}
                <div className="mt-6 grid gap-4 sm:mt-8 lg:grid-cols-[auto_1fr_1fr] lg:items-baseline lg:gap-12">
                  <span className="hud-label">0{i + 1}</span>
                  <h3 className="text-4xl font-semibold tracking-[-0.045em] transition-colors duration-500 group-hover:text-gold sm:text-6xl">
                    {p.title}
                  </h3>
                  <div>
                    <p className="hud-label mb-3 !text-mist">{productionMeta(p)}</p>
                    <p className="max-w-md text-lg leading-relaxed text-bone/75">{p.logline}</p>
                  </div>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>

        <div className="mt-16 grid gap-6 sm:mt-28 sm:grid-cols-3 lg:gap-8">
          {upcoming.map((p, i) => (
            <Reveal key={p.slug} delay={i * 0.08}>
              <ProductionCard production={p} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

function Founders() {
  return (
    <section className="section relative overflow-hidden border-y border-white/[0.07] bg-ink">
      <LightBleed className="-left-[30%] top-[10%] h-[80vh] w-[90vw] sm:w-[55vw]" />
      <div className="container-x relative">
        <SectionLabel index="04">The founders</SectionLabel>
        <div className="grid gap-12 md:grid-cols-2 lg:gap-20">
          {founders.map((f, i) => (
            <Reveal key={f.name} delay={i * 0.12} className="grid grid-cols-[minmax(0,7.5rem)_1fr] gap-6 sm:grid-cols-[minmax(0,11rem)_1fr] sm:gap-8">
              <CinematicImage
                src={f.image}
                alt={f.image ? f.name : ''}
                ratio="portrait"
                tone={f.tone}
                person
                className="rounded-xl"
              />
              <div className="flex flex-col justify-between gap-6">
                <p className="text-2xl font-medium leading-tight tracking-[-0.03em] sm:text-3xl lg:text-4xl">
                  “{f.line}”
                </p>
                <div>
                  <p className="text-lg font-semibold tracking-tight">{f.name}</p>
                  <p className="hud-label mt-1 !text-gold">{f.role}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal className="mt-14 sm:mt-20">
          <Link to="/about" className="group inline-flex items-center gap-3 text-gold">
            Read the BOA story
            <Arrow className="transition-transform duration-500 group-hover:translate-x-1.5" />
          </Link>
        </Reveal>
      </div>
    </section>
  )
}

export default function Home() {
  return (
    <>
      <title>BOA Network — Best Of All Networks</title>
      <Hero />
      <Mission />
      <Reel />
      <Featured />
      <Founders />
      <ClosingCTA />
    </>
  )
}
