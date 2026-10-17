import { useEffect, useRef, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { nav, site } from '../data/site'
import Logo from './Logo'
import { lockScroll } from './SmoothScroll'
import { EASE_EXPO, MagneticButton } from './ui'

const MENU_EASE = [0.76, 0, 0.24, 1]

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
      <header className={`fixed inset-x-0 top-0 ${open ? 'z-[60]' : 'z-50'}`}>
        <div
          className={`transition-[background-color,border-color,backdrop-filter] duration-700 ${
            scrolled && !open
              ? 'border-b border-white/[0.07] bg-obsidian/60 backdrop-blur-xl'
              : 'border-b border-transparent'
          }`}
        >
          <div className="container-x flex h-[4.5rem] items-center justify-between sm:h-20">
            <Link to="/" aria-label="BOA Network — home" className="relative z-10 block transition-opacity duration-300 hover:opacity-80">
              <Logo title="BOA Network" className="w-[5.5rem] sm:w-[6.5rem]" />
            </Link>

            <nav aria-label="Primary" className="hidden items-center gap-9 lg:flex">
              {nav.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className={({ isActive }) =>
                    `group relative py-2 text-xs font-bold uppercase tracking-[0.18em] transition-colors duration-300 ${
                      isActive ? 'text-gold' : 'text-bone/80 hover:text-bone'
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
              <MagneticButton to="/contact?form=talent" className="hidden !min-h-11 !px-5 !py-2 sm:inline-flex">
                Get seen
              </MagneticButton>
              <button
                ref={toggle}
                type="button"
                aria-label={open ? 'Close menu' : 'Open menu'}
                aria-expanded={open}
                aria-controls="mobile-menu"
                onClick={() => setOpen((v) => !v)}
                className={`relative z-[60] grid h-12 w-12 place-items-center rounded-sm border transition-[border-color,background-color,transform] duration-500 active:scale-90 lg:hidden ${
                  open ? 'border-gold bg-black' : 'border-white/25 bg-black/40 backdrop-blur-md'
                }`}
              >
                {/* Two lines that meet at their centres to form the cross */}
                <span className="relative block h-3 w-5">
                  <span
                    className={`absolute inset-x-0 top-0 h-[1.5px] origin-center ${open ? 'bg-gold' : 'bg-bone'} transition-transform duration-500 ease-[var(--ease-cine)] ${open ? 'translate-y-[5.5px] rotate-45' : ''}`}
                  />
                  <span
                    className={`absolute bottom-0 right-0 h-[1.5px] origin-center ${open ? 'bg-gold' : 'bg-bone'} transition-[transform,width] duration-500 ease-[var(--ease-cine)] ${open ? 'w-full -translate-y-[5.5px] -rotate-45' : 'w-3/5'}`}
                  />
                </span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <>
            {/* Scrim over the page; tapping it closes the menu */}
            <motion.div
              aria-hidden="true"
              className="fixed inset-0 z-[57] bg-black/60 lg:hidden"
              onClick={() => setOpen(false)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            />
            <motion.div
              ref={menu}
              id="mobile-menu"
              role="dialog"
              aria-modal="true"
              aria-label="Menu"
              className="fixed inset-y-0 right-0 z-[58] flex w-full flex-col overflow-y-auto bg-black px-6 pb-[max(2.5rem,env(safe-area-inset-bottom))] pt-28 shadow-[-40px_0_80px_rgb(0_0_0/0.8)] sm:w-[28rem] sm:border-l sm:border-white/10 sm:px-10 lg:hidden"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%', transition: { duration: 0.45, ease: MENU_EASE } }}
              transition={{ duration: 0.7, ease: MENU_EASE }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={{ left: 0, right: 0.6 }}
              onDragEnd={(_, info) => (info.offset.x > 90 || info.velocity.x > 500) && setOpen(false)}
            >
              <nav aria-label="Mobile" className="flex flex-col">
                {[{ to: '/', label: 'Home' }, ...nav].map((item, i) => (
                  <div key={item.to} className="overflow-hidden border-b border-white/[0.08]">
                    <motion.div
                      initial={{ x: 60, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.18 + i * 0.05, duration: 0.8, ease: EASE_EXPO }}
                    >
                      <NavLink
                        to={item.to}
                        end
                        onClick={() => setOpen(false)}
                        className={({ isActive }) =>
                          `group flex items-center justify-between py-4 font-display text-[clamp(2.25rem,10vw,3.25rem)] leading-[1.1] transition-colors duration-300 active:text-amber ${
                            isActive ? 'text-gold' : 'text-gold/85 hover:text-gold'
                          }`
                        }
                      >
                        {({ isActive }) => (
                          <>
                            <span className="transition-transform duration-500 ease-[var(--ease-cine)] group-hover:translate-x-2">
                              {item.label}
                            </span>
                            <span
                              aria-hidden="true"
                              className={`h-2 w-2 rounded-full bg-gold transition-opacity duration-300 ${isActive ? 'opacity-100' : 'opacity-0'}`}
                            />
                          </>
                        )}
                      </NavLink>
                    </motion.div>
                  </div>
                ))}
              </nav>
              <motion.div
                className="mt-auto space-y-6 pt-12"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.8, ease: EASE_EXPO }}
              >
                <a href={`mailto:${site.email}`} className="block text-sm text-bone/70 transition-colors hover:text-gold">
                  {site.email}
                </a>
                <MagneticButton to="/contact?form=talent" className="w-full" onClick={() => setOpen(false)}>
                  Get seen
                </MagneticButton>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
