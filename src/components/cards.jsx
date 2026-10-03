import { Link } from 'react-router-dom'
import CinematicImage from './CinematicImage'
import { Arrow } from './ui'
import { STATUS } from '../data/productions'

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
        <div className="absolute right-4 top-4">
          <StatusBadge status={p.status} />
        </div>
        <h3 className="absolute inset-x-5 bottom-5 text-3xl font-semibold leading-none tracking-[-0.04em] sm:text-4xl">
          {p.title}
        </h3>
      </CinematicImage>
      <div className="relative flex flex-1 flex-col gap-4 p-5">
        <p className="hud-label !text-mist">
          {p.format} · {p.genre} · {p.year}
        </p>
        <p className="leading-relaxed text-bone/80">{p.logline}</p>
      </div>
    </article>
  )
}

export function TalentCard({ person: t }) {
  return (
    <Link
      to={`/talent/${t.slug}`}
      className="group glow-border relative block overflow-hidden rounded-2xl"
      aria-label={`${t.name}, ${t.discipline} — view profile`}
    >
      <CinematicImage
        src={t.image}
        alt=""
        ratio="portrait"
        tone={t.tone}
        person
        label="Headshot · 4:5"
        className="transition-transform duration-[1.4s] ease-[var(--ease-cine)] group-hover:scale-[1.04]"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/20 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 p-5">
        <p className="hud-label mb-2">{t.discipline}</p>
        <div className="flex items-end justify-between gap-3">
          <h3 className="text-2xl font-semibold leading-none tracking-[-0.035em] sm:text-3xl">{t.name}</h3>
          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-white/20 text-bone transition-colors duration-500 group-hover:border-gold group-hover:bg-gold group-hover:text-obsidian">
            <Arrow />
          </span>
        </div>
      </div>
    </Link>
  )
}
