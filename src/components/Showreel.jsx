import { useState } from 'react'
import CinematicImage from './CinematicImage'
import { HudCorners } from './ui'
import { site } from '../data/site'

// Click-to-load facade: the video iframe is only requested once the visitor
// presses play, which keeps the initial page light.
export default function Showreel({ poster = null }) {
  const [playing, setPlaying] = useState(false)
  const url = site.showreelEmbedUrl

  return (
    <div className="glow-border relative overflow-hidden rounded-2xl bg-black">
      <CinematicImage src={poster} alt="" tone="amber" parallax={!playing} label="Showreel poster · 2.39:1">
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/30" />
        <HudCorners inset="inset-4 sm:inset-6" />

        {playing && url ? (
          <iframe
            className="absolute inset-0 h-full w-full"
            src={`${url}${url.includes('?') ? '&' : '?'}autoplay=1`}
            title="BOA Network showreel"
            allow="autoplay; fullscreen; picture-in-picture; encrypted-media"
            allowFullScreen
          />
        ) : (
          <div className="absolute inset-0 grid place-items-center">
            <button
              type="button"
              disabled={!url}
              onClick={() => setPlaying(true)}
              aria-label={url ? 'Play the BOA Network showreel' : 'Showreel coming soon'}
              className="group grid h-20 w-20 place-items-center rounded-full border border-gold/60 bg-black/30 text-gold backdrop-blur-md transition-all duration-500 enabled:hover:scale-110 enabled:hover:bg-gold enabled:hover:text-obsidian disabled:border-white/20 disabled:text-white/40 sm:h-28 sm:w-28"
            >
              <svg viewBox="0 0 24 24" className="ml-1 h-7 w-7 sm:h-9 sm:w-9" fill="currentColor" aria-hidden="true">
                <path d="M7 4.5v15l13-7.5z" />
              </svg>
            </button>
          </div>
        )}

        {!playing && (
          <div className="pointer-events-none absolute inset-x-5 bottom-4 flex items-end justify-between sm:inset-x-9 sm:bottom-8">
            <span className="hud-label">{url ? 'Showreel' : 'Showreel · coming soon'}</span>
            <span className="hud-label hidden sm:block">2.39 : 1</span>
          </div>
        )}
      </CinematicImage>
    </div>
  )
}
