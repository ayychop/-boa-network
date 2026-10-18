import { Link } from 'react-router-dom'
import CinematicImage from './CinematicImage'
import { Arrow } from './ui'
import { STATUS, productionMeta } from '../data/productions'

const STATUS_STYLE = {
  development: 'border-white/20 text-bone/80',
  production: 'border-hud/50 text-hud',
  post: 'border-amber/40 text-amber',
  released: 'border-gold bg-gold text-obsidian',
}

export function StatusBadge({ status }) {
  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 font-mono text-[0.625rem] uppercase tracking-[0.16em] backdrop-blur-md ${STATUS_STYLE[status]}`}
    >
      {status === 'production' && <span className="hud-pulse h-1.5 w-1.5 rounded-full bg-hud" />}
      {STATUS[status]}
    </span>
  )
}

export function ProductionCard({ production: p }) {
  const meta = productionMeta(p)
  return (
    <article className="group glow-border glass flex h-full flex-col overflow-hidden rounded-2xl">
      <CinematicImage
        src={p.image}
        alt={`${p.title} poster`}
        ratio="poster"
        tone={p.tone}
        label="Poster · 2:3"
        className="transition-transform duration-[1.4s] ease-[var(--ease-cine)] group-hover:scale-[1.03]"
      >
        <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/10 to-transparent" />
        {p.status && (
          <div className="absolute right-4 top-4">
            <StatusBadge status={p.status} />
          </div>
        )}
        <h3 className="absolute inset-x-5 bottom-5 text-3xl font-semibold leading-none tracking-[-0.04em] sm:text-4xl">
          {p.title}
        </h3>
      </CinematicImage>
      {(meta || p.logline) && (
        <div className="relative flex flex-1 flex-col gap-4 p-5">
          {meta && <p className="hud-label !text-mist">{meta}</p>}
          {p.logline && <p className="leading-relaxed text-bone/80">{p.logline}</p>}
        </div>
      )}
    </article>
  )
}

/**
 * Editorial portrait: the photograph is the whole tile. Name and discipline sit
 * on a dark gradient at the bottom left; hover pushes the frame in and brings
 * up the profile button.
 */
// `grow` lets the portrait stretch past its ratio to fill the space it is given.
export function TalentPortrait({ person: t, ratio = '4 / 5', priority = false, grow = false }) {
  return (
    <Link
      to={`/talent/${t.slug}`}
      className={`group relative ${grow ? 'flex flex-1 flex-col' : 'block'} overflow-hidden bg-charcoal outline-none focus-visible:outline focus-visible:outline-1 focus-visible:-outline-offset-4 focus-visible:outline-gold`}
      aria-label={`${t.name}, ${t.title ?? t.discipline}. View profile`}
    >
      <CinematicImage
        src={t.image}
        alt=""
        ratio={ratio}
        tone={t.tone}
        person
        priority={priority}
        className={`transition-transform duration-[1.2s] ease-[var(--ease-cine)] will-change-transform group-hover:scale-105 group-focus-visible:scale-105 ${grow ? 'flex-1' : ''}`}
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/90 via-black/25 via-40% to-transparent" />
      <div className="pointer-events-none absolute inset-0 bg-black/0 transition-colors duration-700 group-hover:bg-black/15" />

      <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-4 sm:p-6 lg:p-7">
        <div className="min-w-0">
          <p className="hud-label mb-2 !text-gold sm:mb-3">{t.title ?? t.discipline}</p>
          <h2 className="text-[clamp(1.35rem,2.6vw,2.5rem)] font-semibold leading-[0.95] tracking-[-0.04em]">{t.name}</h2>
        </div>
        <span
          aria-hidden="true"
          className="hidden shrink-0 translate-y-3 items-center gap-2 rounded-full border border-gold bg-gold px-4 py-2.5 text-sm font-semibold text-obsidian opacity-0 shadow-[0_12px_40px_-12px_rgb(226_168_75/0.8)] transition-[opacity,transform] duration-600 ease-[var(--ease-cine)] group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100 sm:inline-flex [@media(hover:none)]:hidden"
        >
          View Profile <Arrow />
        </span>
        <span
          aria-hidden="true"
          className="hidden h-10 w-10 shrink-0 place-items-center rounded-full border border-white/25 text-bone [@media(hover:none)]:grid"
        >
          <Arrow />
        </span>
      </div>
    </Link>
  )
}
