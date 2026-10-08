import { useRef } from 'react'
import { useScrollFx } from '../lib/gsap'

const TONES = {
  amber: ['#e2a84b', '#3a1f0a'],
  bone: ['#d9d4c8', '#1c1a17'],
  crimson: ['#d1513f', '#2a0a0c'],
  smoke: ['#a6a29b', '#141312'],
  moss: ['#9bb36a', '#141c0c'],
  rose: ['#e08aa0', '#2b0f1a'],
}

const RATIOS = {
  scope: '2.39 / 1', // anamorphic letterbox
  poster: '2 / 3',
  portrait: '4 / 5',
  fill: null, // parent sets the size
}

function placeholderArt(tone) {
  const [a, b] = TONES[tone] ?? TONES.amber
  return `radial-gradient(90% 70% at 72% 22%, ${a}66, transparent 60%),
    radial-gradient(70% 60% at 12% 100%, ${a}38, transparent 65%),
    linear-gradient(165deg, ${b} 0%, #08080a 78%)`
}

function Silhouette({ tone }) {
  const [a] = TONES[tone] ?? TONES.amber
  return (
    <svg viewBox="0 0 400 500" preserveAspectRatio="xMidYMax slice" className="absolute inset-0 h-full w-full">
      <defs>
        <linearGradient id={`rim-${tone}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#060607" />
          <stop offset="1" stopColor={a} stopOpacity="0.35" />
        </linearGradient>
      </defs>
      <g fill={`url(#rim-${tone})`} stroke={a} strokeOpacity="0.35" strokeWidth="1">
        <ellipse cx="200" cy="190" rx="68" ry="84" />
        <path d="M40 500c0-110 62-168 160-168s160 58 160 168z" />
      </g>
    </svg>
  )
}

/**
 * Image slot with a generated cinematic placeholder.
 * Pass `src` (e.g. '/media/still.jpg') to replace the placeholder with a
 * real, lazy-loaded image — nothing else needs to change.
 */
export default function CinematicImage({
  src,
  alt = '',
  ratio = 'scope',
  tone = 'amber',
  label,
  person = false,
  parallax = false,
  priority = false,
  className = '',
  children,
}) {
  const wrap = useRef(null)
  const inner = useRef(null)

  useScrollFx(
    wrap,
    (gsap) => {
      if (!parallax) return
      gsap.fromTo(
        inner.current,
        { yPercent: -7 },
        {
          yPercent: 7,
          ease: 'none',
          scrollTrigger: { trigger: wrap.current, start: 'top bottom', end: 'bottom top', scrub: true },
        },
      )
    },
    [parallax],
  )

  return (
    <div
      ref={wrap}
      className={`relative overflow-hidden bg-charcoal ${className}`}
      style={RATIOS[ratio] ? { aspectRatio: RATIOS[ratio] } : undefined}
    >
      <div ref={inner} className={`absolute inset-x-0 ${parallax ? '-inset-y-[9%]' : 'inset-y-0'}`}>
        {src ? (
          <img
            src={src}
            alt={alt}
            loading={priority ? 'eager' : 'lazy'}
            fetchPriority={priority ? 'high' : undefined}
            decoding="async"
            className="h-full w-full object-cover"
          />
        ) : (
          <div
            role={alt ? 'img' : undefined}
            aria-label={alt || undefined}
            className="absolute inset-0"
            style={{ backgroundImage: placeholderArt(tone) }}
          >
            {person && <Silhouette tone={tone} />}
          </div>
        )}
      </div>
      {!src && label && (
        <span className="hud-label absolute left-4 top-4 !text-[0.5625rem] !text-white/40">{label}</span>
      )}
      {children}
    </div>
  )
}
