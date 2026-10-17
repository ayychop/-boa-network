import { useCallback, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import CinematicImage from '../components/CinematicImage'
import VideoFacade from '../components/VideoFacade'
import { StatusBadge } from '../components/cards'
import { Smoke } from '../components/Fog'
import { Arrow, ClosingCTA, EASE_EXPO, MagneticButton, Reveal } from '../components/ui'
import { productionMeta, productions } from '../data/productions'
import { castingCalls } from '../data/access'
import { Theatre, TrailerButton } from './Productions'
import NotFound from './NotFound'

export default function ProductionDetail() {
  const { slug } = useParams()
  const [playing, setPlaying] = useState(null)
  const closeTheatre = useCallback(() => setPlaying(null), [])
  const p = productions.find((x) => x.slug === slug)
  if (!p) return <NotFound />

  const meta = productionMeta(p)
  const calls = p.series ? castingCalls.filter((c) => c.production === p.series) : []

  return (
    <>
      <title>{`${p.title} — BOA Network`}</title>
      {p.logline && <meta name="description" content={p.logline} />}

      <section className="relative overflow-hidden bg-obsidian pt-32 sm:pt-40">
        <div className="absolute inset-0">
          <div className="slow-zoom absolute inset-0">
            <CinematicImage src={p.still ?? p.image} alt="" ratio="fill" tone={p.tone} priority className="h-full w-full" />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/75 to-obsidian/50" />
          <Smoke />
        </div>
        <div className="above-fog container-x pb-16 sm:pb-24">
          <Link to="/productions" className="group mb-12 inline-flex items-center gap-3 text-xs font-bold uppercase tracking-[0.18em] text-bone/80 hover:text-gold">
            <Arrow className="rotate-180 transition-transform duration-500 group-hover:-translate-x-1" />
            All productions
          </Link>
          <h1 className="text-[clamp(4rem,14vw,14rem)] leading-[0.94]">
            <span className="block overflow-hidden">
              <motion.span
                className="block"
                initial={{ y: '105%' }}
                animate={{ y: 0 }}
                transition={{ duration: 1.4, ease: EASE_EXPO, delay: 0.15 }}
              >
                {p.title}
              </motion.span>
            </span>
          </h1>
          {(meta || p.status) && (
            <div className="mt-6 flex flex-wrap items-center gap-3">
              {meta && <span className="font-mono text-[0.6875rem] uppercase tracking-[0.16em] text-gold">{meta}</span>}
              {p.status && <StatusBadge status={p.status} />}
            </div>
          )}
          {p.logline && (
            <Reveal as="p" className="mt-8 max-w-2xl text-lg leading-relaxed text-bone/85 sm:text-xl" delay={0.3}>
              {p.logline}
            </Reveal>
          )}
          {p.trailer && (
            <Reveal className="mt-10" delay={0.4}>
              <TrailerButton onClick={() => setPlaying(p.trailer)} />
            </Reveal>
          )}
        </div>
      </section>

      {p.video && (
        <section className="section !pt-8">
          <div className="container-x">
            <Reveal>
              <VideoFacade {...p.video} />
            </Reveal>
          </div>
        </section>
      )}

      {calls.length > 0 && (
        <section className="section !pt-0">
          <div className="container-x">
            <h2 className="display-md mb-10 sm:mb-14">
              Now <span className="accent">casting.</span>
            </h2>
            <ul className="border-t border-white/[0.1]">
              {calls.map((c) => (
                <li key={c.id} className="border-b border-white/[0.1]">
                  <Link
                    to={`/contact?form=talent&role=${encodeURIComponent(`${c.id} — ${c.role} (${c.production})`)}`}
                    className="group flex flex-col gap-3 py-8 transition-colors duration-500 hover:bg-white/[0.03] sm:flex-row sm:items-center sm:justify-between sm:px-4"
                  >
                    <div>
                      <h3 className="text-3xl transition-colors duration-500 group-hover:text-gold sm:text-4xl">{c.role}</h3>
                      <p className="mt-2 text-mist">
                        {c.location} · {c.type}. {c.note}
                      </p>
                    </div>
                    <span className="inline-flex items-center gap-3 text-xs font-bold uppercase tracking-[0.18em] text-gold">
                      Apply <Arrow className="transition-transform duration-500 group-hover:translate-x-1" />
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-10">
              <MagneticButton to="/access" variant="ghost">
                How access works
              </MagneticButton>
            </div>
          </div>
        </section>
      )}

      <ClosingCTA />
      <Theatre video={playing} onClose={closeTheatre} />
    </>
  )
}
