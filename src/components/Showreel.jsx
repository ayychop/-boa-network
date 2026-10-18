import { HudCorners } from './ui'
import { PlaceholderArt } from './CinematicPlaceholder'

// Standard YouTube iframe embed inside the cinematic frame.
export default function Showreel({ url, title }) {
  return (
    <div className="glow-border relative aspect-video overflow-hidden rounded-2xl bg-black">
      {url ? (
        <iframe
          className="absolute inset-0 h-full w-full"
          src={url}
          title={title}
          loading="lazy"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        />
      ) : (
        <>
          <PlaceholderArt />
          <span className="hud-label absolute left-4 top-4 !text-[0.5625rem] !text-white/40">Showreel · coming soon</span>
        </>
      )}
      <HudCorners inset="inset-4 sm:inset-6" />
    </div>
  )
}
