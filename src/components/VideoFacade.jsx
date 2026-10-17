import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import PlayMark from './PlayMark'
import { EASE_EXPO } from './ui'

/**
 * A YouTube embed staged like a screening: the poster frame between thin
 * letterbox bars, the premiere play mark, and a serif title card. The iframe
 * only loads (and autoplays) once someone asks for it, so the page stays light
 * and always shows the frame instead of an empty black player.
 */
export default function VideoFacade({
  url,
  title,
  poster,
  posterHasTitle = false,
  posterPosition = '50% 50%',
  ratio = '16 / 9',
  className = '',
  children,
}) {
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
            className="absolute inset-0 z-10 block h-full w-full cursor-pointer text-left outline-none focus-visible:outline focus-visible:outline-1 focus-visible:-outline-offset-4 focus-visible:outline-gold"
            exit={{ opacity: 0, transition: { duration: 0.6 } }}
          >
            {poster && (
              <img
                src={poster}
                alt=""
                loading="lazy"
                decoding="async"
                style={{ objectPosition: posterPosition }}
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1.6s] ease-[var(--ease-cine)] group-hover:scale-[1.03]"
              />
            )}
            <span className="absolute inset-0 bg-black/30 transition-colors duration-700 group-hover:bg-black/45" />
            {/* Letterbox bars: the frame is presented, not just embedded */}
            <span aria-hidden="true" className="absolute inset-x-0 top-0 h-[6%] bg-black" />
            <span aria-hidden="true" className="absolute inset-x-0 bottom-0 h-[6%] bg-black" />

            {/* A poster that prints its own title keeps the mark off it on small
                screens: smaller, in the corner. Centred once there is room. */}
            <span
              className={
                posterHasTitle
                  ? 'absolute right-3 top-[calc(6%+0.75rem)] sm:inset-0 sm:grid sm:place-items-center'
                  : 'absolute inset-0 grid place-items-center'
              }
            >
              <PlayMark size={posterHasTitle ? 'sm' : 'lg'} className={posterHasTitle ? 'sm:h-24 sm:w-24' : ''} />
            </span>

            {!posterHasTitle && (
              <span className="absolute inset-x-5 bottom-[calc(6%+0.75rem)] font-display text-lg italic text-bone sm:inset-x-8 sm:bottom-[calc(6%+1.75rem)] sm:text-3xl">
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
