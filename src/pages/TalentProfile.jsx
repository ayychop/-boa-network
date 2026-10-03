import { Link, useParams } from 'react-router-dom'
import CinematicImage from '../components/CinematicImage'
import { StatusBadge } from '../components/cards'
import { LightBleed } from '../components/Fog'
import { Arrow, HudCorners, MagneticButton, Reveal } from '../components/ui'
import { talent } from '../data/talent'
import { productions } from '../data/productions'
import NotFound from './NotFound'

export default function TalentProfile() {
  const { slug } = useParams()
  const person = talent.find((t) => t.slug === slug)
  if (!person) return <NotFound />

  const credits = person.credits.map((c) => productions.find((p) => p.slug === c)).filter(Boolean)
  const enquiry = `/contact?subject=${encodeURIComponent(`Booking enquiry: ${person.name}`)}`

  return (
    <>
      <title>{`${person.name} — BOA Network talent`}</title>
      <section className="relative overflow-hidden pb-24 pt-32 sm:pb-40 sm:pt-44">
        <LightBleed className="-right-[25%] -top-[20%] h-[90vh] w-[90vw] sm:w-[55vw]" />
        <div className="container-x relative">
          <Link to="/talent" className="group mb-10 inline-flex items-center gap-3 text-sm text-mist hover:text-gold">
            <Arrow className="rotate-180 transition-transform duration-500 group-hover:-translate-x-1" />
            All talent
          </Link>
          <div className="grid gap-10 lg:grid-cols-[minmax(0,0.8fr)_1fr] lg:gap-20">
            <Reveal>
              <CinematicImage
                src={person.image}
                alt={person.image ? `${person.name} headshot` : ''}
                ratio="portrait"
                tone={person.tone}
                person
                priority
                label="Headshot · 4:5"
                className="glow-border rounded-2xl"
              >
                <HudCorners inset="inset-4" />
              </CinematicImage>
            </Reveal>

            <div className="flex flex-col justify-end">
              <Reveal as="p" className="hud-label mb-5" y={16}>
                {person.discipline} · {person.base}
              </Reveal>
              <Reveal as="h1" className="display-lg" delay={0.05}>
                {person.name}
              </Reveal>
              <Reveal as="p" className="lede mt-8 max-w-xl" delay={0.12}>
                {person.bio}
              </Reveal>

              {credits.length > 0 && (
                <Reveal className="mt-12" delay={0.18}>
                  <p className="hud-label mb-4 !text-mist">BOA credits</p>
                  <ul className="divide-y divide-white/[0.08] border-y border-white/[0.08]">
                    {credits.map((c) => (
                      <li key={c.slug} className="flex flex-wrap items-center justify-between gap-3 py-4">
                        <span className="text-xl font-medium tracking-tight">
                          {c.title} <span className="ml-2 text-sm text-mist">{c.format}</span>
                        </span>
                        <StatusBadge status={c.status} />
                      </li>
                    ))}
                  </ul>
                </Reveal>
              )}

              <Reveal className="mt-12 flex flex-wrap gap-4" delay={0.24}>
                <MagneticButton to={enquiry}>
                  Enquire about {person.name.split(' ')[0]} <Arrow />
                </MagneticButton>
              </Reveal>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
