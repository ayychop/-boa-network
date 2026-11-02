import { useRef } from 'react'
import { useScrollFx } from '../lib/gsap'
import { PlaceholderArt } from './CinematicPlaceholder'

const RATIOS = {
  scope: '2.39 / 1', // anamorphic letterbox
  poster: '2 / 3',
  portrait: '4 / 5',
  fill: null, // parent sets the size
}
// Any other value is used as a raw CSS aspect-ratio, e.g. '3 / 4'.
const aspect = (ratio) => (ratio in RATIOS ? RATIOS[ratio] : ratio)

// Up to two initials, so "David O" reads DO and a long name stays balanced.
const initials = (name = '') =>
  name
    .split(/\s+/)
    .slice(0, 2)
    .map((word) => word[0])
    .join('')

/**
 * Image slot with a generated cinematic placeholder: a gold monogram of `name`
 * for people, the animated BOA lockup (PlaceholderArt) for everything else.
 * Pass `src` (e.g. '/media/still.jpg') to replace the placeholder with a
 * real, lazy-loaded image — nothing else needs to change.
 */
export default function CinematicImage({
  src,
  alt = '',
  ratio = 'scope',
  name,
  label,
  person = false,
  parallax = false,
  priority = false,
  className = '',
  children,
  ...rest
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
      style={aspect(ratio) ? { aspectRatio: aspect(ratio) } : undefined}
      {...rest}
    >
      <div ref={inner} className={`absolute inset-x-0 ${parallax ? '-inset-y-[9%]' : 'inset-y-0'}`}>
        {src ? (
          <img
            src={src}
            alt={alt}
            loading={priority ? 'eager' : 'lazy'}
            fetchPriority={priority ? 'high' : undefined}
            decoding="async"
            // Headshots crop from near the top, so a tall frame never loses the head.
            className={`h-full w-full object-cover ${person ? 'object-[50%_20%]' : ''}`}
          />
        ) : !person ? (
          <PlaceholderArt backdrop={ratio === 'fill'} />
        ) : (
          <div aria-hidden="true" className="portrait-blank absolute inset-0">
            <span className="portrait-monogram">{initials(name)}</span>
            <div className="cine-grain absolute inset-0" />
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
