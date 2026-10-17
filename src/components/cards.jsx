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
      className={`inline-flex items-center gap-2 rounded-sm border px-3 py-1 font-mono text-[0.625rem] uppercase tracking-[0.16em] backdrop-blur-md ${STATUS_STYLE[status]}`}
    >
      {status === 'production' && <span className="hud-pulse h-1.5 w-1.5 rounded-full bg-hud" />}
      {STATUS[status]}
    </span>
  )
}

/**
 * Production tile for the slate. The frame is the whole tile: on hover the
 * image pushes in to 1.05x, the frame darkens, and "View Project" fades up.
 */
export function ProductionCard({ production: p, ratio = 'poster', imageClassName = '', className = '' }) {
  const meta = productionMeta(p)
  return (
    <Link
      to={`/productions/${p.slug}`}
      className={`group relative block overflow-hidden rounded-sm bg-charcoal outline-none focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-4 focus-visible:outline-gold ${className}`}
      aria-label={`${p.title}${meta ? `, ${meta}` : ''}. View project`}
    >
      <CinematicImage
        src={p.image ?? p.still}
        alt=""
        ratio={ratio}
        tone={p.tone}
        className={`transition-transform duration-[1.1s] ease-[var(--ease-cine)] will-change-transform group-hover:scale-105 group-focus-visible:scale-105 ${imageClassName}`}
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 via-45% to-transparent" />
      <div className="pointer-events-none absolute inset-0 bg-black/0 transition-colors duration-700 ease-[var(--ease-cine)] group-hover:bg-black/45 group-focus-visible:bg-black/45" />
      {p.status && (
        <div className="absolute right-4 top-4">
          <StatusBadge status={p.status} />
        </div>
      )}
      <div className="absolute inset-x-0 bottom-0 p-5 sm:p-7">
        <h3 className="text-[clamp(2.25rem,4vw,3.5rem)] leading-none">{p.title}</h3>
        {meta && meta !== p.title && <p className="mt-3 font-mono text-[0.6875rem] uppercase tracking-[0.16em] text-gold">{meta}</p>}
        {/* Pointer devices: the button fades up on hover. */}
        <span
          aria-hidden="true"
          className="mt-5 inline-flex translate-y-3 items-center gap-3 whitespace-nowrap bg-gold px-5 py-3 text-xs font-bold uppercase tracking-[0.16em] text-black opacity-0 transition-[opacity,transform] duration-500 ease-[var(--ease-cine)] group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100 [@media(hover:none)]:hidden"
        >
          View Project <Arrow />
        </span>
        {/* Touch devices: always shown, never animated or faded. */}
        <span
          aria-hidden="true"
          className="mt-5 hidden items-center gap-3 whitespace-nowrap bg-gold px-5 py-3 text-xs font-bold uppercase tracking-[0.16em] text-black [@media(hover:none)]:inline-flex"
        >
          View Project <Arrow />
        </span>
      </div>
    </Link>
  )
}

/**
 * Editorial portrait: the photograph is the whole tile. Name and discipline sit
 * on a dark gradient at the bottom left; hover pushes the frame in and brings
 * up the profile button.
 */
export function TalentPortrait({ person: t, ratio = '4 / 5', priority = false }) {
  return (
    <Link
      to={`/talent/${t.slug}`}
      className="group relative block overflow-hidden bg-charcoal outline-none focus-visible:outline focus-visible:outline-1 focus-visible:-outline-offset-4 focus-visible:outline-gold"
      aria-label={`${t.name}, ${t.discipline}. View profile`}
    >
      <CinematicImage
        src={t.image}
        alt=""
        ratio={ratio}
        tone={t.tone}
        person
        priority={priority}
        className="transition-transform duration-[1.2s] ease-[var(--ease-cine)] will-change-transform group-hover:scale-105 group-focus-visible:scale-105"
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/90 via-black/25 via-40% to-transparent" />
      <div className="pointer-events-none absolute inset-0 bg-black/0 transition-colors duration-700 group-hover:bg-black/15" />

      <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-4 sm:p-6 lg:p-7">
        <div className="min-w-0">
          <h2 className="text-[clamp(1.6rem,2.8vw,2.6rem)] leading-none">{t.name}</h2>
          <p className="hud-label mt-2 !text-gold sm:mt-3">{t.discipline}</p>
        </div>
        <span
          aria-hidden="true"
          className="hidden shrink-0 translate-y-3 items-center gap-2 rounded-full border border-gold bg-gold px-4 py-2.5 text-sm font-semibold text-obsidian opacity-0 transition-[opacity,transform] duration-600 ease-[var(--ease-cine)] group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100 sm:inline-flex [@media(hover:none)]:hidden"
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
