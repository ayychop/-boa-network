import { HudCorners } from './ui'

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
        <span className="hud-label absolute inset-x-5 bottom-4 sm:inset-x-9 sm:bottom-8">Showreel · coming soon</span>
      )}
      <HudCorners inset="inset-4 sm:inset-6" />
    </div>
  )
}
