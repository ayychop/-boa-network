import { useEffect, useRef, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { nav, site } from '../data/site'
import { lockScroll } from './SmoothScroll'
import { EASE_EXPO, MagneticButton } from './ui'

// Stacked lockup. Both lines are blocks with their own line height, so the
// subtitle can never ride up into the logo at any breakpoint.
export function Wordmark({ className = '' }) {
  return (
    <span className={`inline-flex flex-col items-start gap-1.5 whitespace-nowrap ${className}`}>
      <span className="block text-2xl font-semibold leading-none tracking-[-0.06em] sm:text-[1.75rem]">BOA</span>
      <span className="block font-mono text-[0.5rem] uppercase leading-none tracking-[0.2em] text-gold sm:text-[0.5625rem]">
        {site.longName}
      </span>
    </span>
  )
}

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const { pathname } = useLocation()
  const toggle = useRef(null)
  const menu = useRef(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => setOpen(false), [pathname])

  // Close if the viewport grows past the breakpoint where the menu exists.
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1024px)')
    const onChange = (e) => e.matches && setOpen(false)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  useEffect(() => {
    if (!open) return
    const button = toggle.current
    lockScroll(true)
    menu.current?.querySelector('a')?.focus({ preventScroll: true })

    // Keep Tab inside the menu and the toggle while it is open.
    const onKey = (e) => {
      if (e.key === 'Escape') return setOpen(false)
      if (e.key !== 'Tab' || !menu.current) return
      const items = [button, ...menu.current.querySelectorAll('a')]
      const i = items.indexOf(document.activeElement)
      const next = e.shiftKey ? (i <= 0 ? items.length - 1 : i - 1) : (i + 1) % items.length
      e.preventDefault()
      items[next].focus()
    }
    window.addEventListener('keydown', onKey)
    return () => {
      lockScroll(false)
      window.removeEventListener('keydown', onKey)
      button?.focus({ preventScroll: true })
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
                ref={toggle}
                type="button"
                aria-label={open ? 'Close menu' : 'Open menu'}
                aria-expanded={open}
                aria-controls="mobile-menu"
                onClick={() => setOpen((v) => !v)}
                className={`relative z-10 grid h-12 w-12 place-items-center rounded-full border transition-[border-color,background-color,transform] duration-500 active:scale-90 lg:hidden ${
                  open ? 'border-gold/60 bg-gold/10' : 'border-white/15 bg-obsidian/30 backdrop-blur-md'
                }`}
              >
                {/* Two lines that meet at their centres to form the cross */}
                <span className="relative block h-3 w-5">
                  <span
                    className={`absolute inset-x-0 top-0 h-px origin-center bg-bone transition-transform duration-500 ease-[var(--ease-cine)] ${open ? 'translate-y-[5.5px] rotate-45' : ''}`}
                  />
                  <span
                    className={`absolute bottom-0 right-0 h-px origin-center bg-bone transition-[transform,width] duration-500 ease-[var(--ease-cine)] ${open ? 'w-full -translate-y-[5.5px] -rotate-45' : 'w-3/5'}`}
                  />
                </span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            ref={menu}
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
            className="fixed inset-0 z-[48] flex flex-col overflow-y-auto bg-obsidian/95 px-5 pb-[max(2.5rem,env(safe-area-inset-bottom))] pt-28 backdrop-blur-2xl sm:px-8 lg:hidden"
            initial={{ clipPath: 'inset(0 0 100% 0)' }}
            animate={{ clipPath: 'inset(0 0 0% 0)' }}
            exit={{ clipPath: 'inset(0 0 100% 0)', transition: { duration: 0.5, ease: [0.7, 0, 0.84, 0] } }}
            transition={{ duration: 0.8, ease: EASE_EXPO }}
          >
            <div aria-hidden="true" className="spotlight -right-1/3 top-1/4 h-[70vh] w-[110vw] opacity-60" />
            <nav aria-label="Mobile" className="relative flex flex-col">
              {[{ to: '/', label: 'Home' }, ...nav].map((item, i) => (
                <div key={item.to} className="overflow-hidden border-b border-white/[0.07]">
                  <motion.div
                    initial={{ y: '110%' }}
                    animate={{ y: 0 }}
                    transition={{ delay: 0.25 + i * 0.05, duration: 0.9, ease: EASE_EXPO }}
                  >
                    <NavLink
                      to={item.to}
                      end
                      onClick={() => setOpen(false)}
                      className={({ isActive }) =>
                        `group flex items-baseline gap-4 py-4 text-[clamp(2.25rem,10vw,3.5rem)] font-semibold leading-none tracking-[-0.04em] transition-colors duration-300 active:text-gold ${
                          isActive ? 'text-gold' : 'text-bone'
                        }`
                      }
                    >
                      <span className="hud-label w-6 shrink-0">0{i}</span>
                      <span className="transition-transform duration-500 ease-[var(--ease-cine)] group-hover:translate-x-2">
                        {item.label}
                      </span>
                    </NavLink>
                  </motion.div>
                </div>
              ))}
            </nav>
            <motion.div
              className="relative mt-auto space-y-6 pt-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8, ease: EASE_EXPO }}
            >
              <a href={`mailto:${site.email}`} className="hud-label block !text-mist">
                {site.email}
              </a>
              <MagneticButton to="/contact?form=talent" className="w-full" onClick={() => setOpen(false)}>
                Get seen
              </MagneticButton>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
