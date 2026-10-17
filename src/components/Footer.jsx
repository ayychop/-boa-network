import { Link } from 'react-router-dom'
import Logo from './Logo'
import { nav, site, founders } from '../data/site'

export default function Footer() {
  return (
    <footer className="relative border-t border-white/[0.07] bg-ink">
      <div className="hud-line absolute inset-x-0 top-0" />
      <div className="container-x py-16 sm:py-24">
        <div className="grid gap-14 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <p className="hud-label mb-5">{site.longName}</p>
            <p className="max-w-sm font-display text-3xl uppercase leading-none sm:text-4xl">
              A door opener, <span className="accent">not a gatekeeper.</span>
            </p>
          </div>

          <div>
            <p className="mb-5 text-xs font-bold uppercase tracking-[0.18em] text-gold">Explore</p>
            <ul className="space-y-3">
              {nav.map((item) => (
                <li key={item.to}>
                  <Link to={item.to} className="text-bone/85 transition-colors hover:text-gold">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="mb-5 text-xs font-bold uppercase tracking-[0.18em] text-gold">Get in touch</p>
            <ul className="space-y-3">
              <li>
                <a href={`mailto:${site.email}`} className="break-all text-bone/85 transition-colors hover:text-gold">
                  {site.email}
                </a>
              </li>
              <li>
                <Link to="/contact?form=talent" className="text-bone/85 transition-colors hover:text-gold">
                  Submit as talent
                </Link>
              </li>
              {site.socials.map((s) => (
                <li key={s.href}>
                  <a href={s.href} target="_blank" rel="noreferrer" className="text-bone/85 transition-colors hover:text-gold">
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="mb-5 text-xs font-bold uppercase tracking-[0.18em] text-gold">Founders</p>
            <ul className="space-y-3 text-bone/80">
              {founders.map((f) => (
                <li key={f.name}>{f.name}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* The lockup at full width closes every page */}
        <div aria-hidden="true" className="mt-20 select-none sm:mt-28">
          <Logo title="" className="w-full" />
        </div>

        <div className="mt-10 flex flex-col gap-3 border-t border-white/[0.07] pt-6 text-xs text-mist sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {site.name}. All rights reserved.
          </p>
          <p className="hud-label !text-mist">Made in the {site.location}</p>
        </div>
      </div>
    </footer>
  )
}
