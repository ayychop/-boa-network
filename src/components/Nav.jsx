import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { nav } from '../data/site'
import { MagneticButton } from './ui'

export function Wordmark({ className = '' }) {
  return (
    <span className={`inline-flex items-baseline gap-2 ${className}`}>
      <span className="text-2xl font-semibold tracking-[-0.06em]">BOA</span>
      <span className="hud-label !text-[0.5625rem] !text-gold">Network</span>
    </span>
  )
}

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const { pathname } = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => setOpen(false), [pathname])

  useEffect(() => {
    if (!open) return
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [open])

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50">
        <div
          className={`transition-[background-color,border-color,backdrop-filter] duration-700 ${
            scrolled && !open
              ? 'border-b border-white/[0.07] bg-obsidian/60 backdrop-blur-xl'
              : 'border-b border-transparent'
          }`}
        >
          <div className="container-x flex h-[4.5rem] items-center justify-between sm:h-20">
            <Link to="/" aria-label="BOA Network — home" className="relative z-10">
              <Wordmark />
            </Link>

            <nav aria-label="Primary" className="hidden items-center gap-9 lg:flex">
              {nav.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className={({ isActive }) =>
                    `group relative py-2 text-sm font-medium tracking-tight transition-colors duration-300 ${
                      isActive ? 'text-gold' : 'text-bone/75 hover:text-bone'
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      {item.label}
                      <span
                        className={`absolute inset-x-0 -bottom-0.5 h-px origin-left bg-gold transition-transform duration-500 ${
                          isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                        }`}
                      />
                    </>
                  )}
                </NavLink>
              ))}
            </nav>

            <div className="flex items-center gap-3">
              <MagneticButton to="/contact?form=talent" className="hidden !min-h-11 !px-5 !py-2 !text-sm sm:inline-flex">
                Get seen
              </MagneticButton>
              <button
                type="button"
                aria-label={open ? 'Close menu' : 'Open menu'}
                aria-expanded={open}
                aria-controls="mobile-menu"
                onClick={() => setOpen((v) => !v)}
                className="relative z-10 grid h-11 w-11 place-items-center rounded-full border border-white/15 lg:hidden"
              >
                <span className="relative block h-3 w-5">
                  <span className={`absolute inset-x-0 top-0 h-px bg-bone transition-transform duration-500 ${open ? 'translate-y-[6px] rotate-45' : ''}`} />
                  <span className={`absolute inset-x-0 bottom-0 h-px bg-bone transition-transform duration-500 ${open ? '-translate-y-[5px] -rotate-45' : ''}`} />
                </span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            className="fixed inset-0 z-[48] flex flex-col justify-between bg-obsidian/92 px-5 pb-10 pt-28 backdrop-blur-2xl sm:px-8 lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            <nav aria-label="Mobile" className="flex flex-col">
              {[{ to: '/', label: 'Home' }, ...nav].map((item, i) => (
                <motion.div
                  key={item.to}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 + i * 0.05, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                >
                  <NavLink
                    to={item.to}
                    end
                    className={({ isActive }) =>
                      `flex items-baseline gap-4 border-b border-white/[0.07] py-4 text-4xl font-semibold tracking-[-0.04em] ${
                        isActive ? 'text-gold' : 'text-bone'
                      }`
                    }
                  >
                    <span className="hud-label w-6">0{i}</span>
                    {item.label}
                  </NavLink>
                </motion.div>
              ))}
            </nav>
            <Link to="/contact?form=talent" className="btn btn-primary w-full">
              Get seen
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
