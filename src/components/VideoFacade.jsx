import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { EASE_EXPO } from './ui'

/**
 * A YouTube embed that starts as its poster frame with the gold play disc.
 * The iframe only loads (and autoplays) once someone asks for it, so the page
 * stays light and always shows the frame instead of an empty black player.
 */
export default function VideoFacade({ url, title, poster, posterHasTitle = false, posterPosition = '50% 50%', ratio = '16 / 9', className = '', children }) {
  const [playing, setPlaying] = useState(false)
  return (
    <div className={`group relative overflow-hidden rounded-sm bg-black ${className}`} style={{ aspectRatio: ratio }}>
      <AnimatePresence initial={false}>
        {!playing && (
          <motion.button
            key="poster"
            type="button"
            onClick={() => setPlaying(true)}
            aria-label={`Play ${title}`}
            className="absolute inset-0 z-10 block h-full w-full cursor-pointer text-left"
            exit={{ opacity: 0, transition: { duration: 0.5 } }}
          >
            {poster && (
              <img
                src={poster}
                alt=""
                loading="lazy"
                decoding="async"
                style={{ objectPosition: posterPosition }}
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1.2s] ease-[var(--ease-cine)] group-hover:scale-105"
              />
            )}
            <span className="absolute inset-0 bg-black/35 transition-colors duration-700 group-hover:bg-black/50" />
            {/* A poster that prints its own title keeps the disc off it on small
                screens: smaller, in the corner. Centred once there is room. */}
            <span
              className={
                posterHasTitle
                  ? 'absolute right-3 top-3 sm:inset-0 sm:grid sm:place-items-center'
                  : 'absolute inset-0 grid place-items-center'
              }
            >
              <span
                className={`relative grid place-items-center sm:h-28 sm:w-28 ${posterHasTitle ? 'h-14 w-14' : 'h-20 w-20'}`}
              >
                <span aria-hidden="true" className="play-halo absolute inset-0 rounded-full bg-gold/40" />
                <span className="relative grid h-full w-full place-items-center rounded-full bg-gold text-black shadow-[0_0_50px_-6px_rgb(232_179_26/0.9),0_0_120px_-20px_rgb(232_179_26/0.7)] transition-[transform,background-color] duration-500 ease-[var(--ease-cine)] group-hover:scale-110 group-hover:bg-amber">
                  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={`ml-1 sm:h-9 sm:w-9 ${posterHasTitle ? 'h-5 w-5' : 'h-7 w-7'}`}>
                    <path d="M7 4.5v15a.6.6 0 0 0 .9.5l12-7.5a.6.6 0 0 0 0-1l-12-7.5a.6.6 0 0 0-.9.5z" />
                  </svg>
                </span>
              </span>
            </span>
            {!posterHasTitle && (
              <span className="absolute inset-x-5 bottom-4 text-[0.6875rem] font-bold uppercase tracking-[0.2em] text-bone sm:inset-x-8 sm:bottom-7">
                {title}
              </span>
            )}
          </motion.button>
        )}
      </AnimatePresence>
      {playing && (
        <motion.iframe
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, ease: EASE_EXPO }}
          src={`${url}?autoplay=1&rel=0`}
          title={title}
          referrerPolicy="strict-origin-when-cross-origin"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          className="absolute inset-0 h-full w-full border-0"
        />
      )}
      {children}
    </div>
  )
}
