import CinematicImage from '../components/CinematicImage'
import { ClosingCTA, HudCorners, PageHeader, Reveal, SectionLabel } from '../components/ui'
import { founders } from '../data/site'

const principles = [
  {
    title: 'Open the door',
    body: 'Every production we make carries roles for people with no credits, no agent and no way in. That is not a scheme on the side. It is the point.',
  },
  {
    title: 'Hold the standard',
    body: 'Access is not a lower bar. We shoot cinematic, we cast on merit, and we expect first timers to stand next to anyone.',
  },
  {
    title: 'Pay respect',
    body: 'Clear terms, honest feedback and a straight answer. Nobody should have to guess where they stand with us.',
  },
]

export default function About() {
  return (
    <>
      <title>About — BOA Network</title>
      <meta
        name="description"
        content="The story of BOA Network, Best Of All Networks, founded by Joseph Boat and David O to open the screen industry to overlooked talent."
      />
      <PageHeader
        index="01"
        label="About"
        title={
          <>
            Best of all. <span className="accent">Open to all.</span>
          </>
        }
        lede="BOA Network, Best Of All Networks, is a UK production company founded by Joseph Boat and David O. We make cinematic films, series and television, and we build every one of them around people the industry has shut out."
      />

      <section className="container-x">
        <Reveal>
          <CinematicImage tone="amber" parallax label="About still · 2.39:1" className="rounded-xl sm:rounded-2xl">
            <HudCorners inset="inset-3 sm:inset-5" />
          </CinematicImage>
        </Reveal>
      </section>

      <section className="section">
        <div className="container-x grid gap-12 lg:grid-cols-[1fr_1.4fr] lg:gap-24">
          <div>
            <SectionLabel index="02">The story</SectionLabel>
            <Reveal as="h2" className="display-md">
              The industry has a <span className="accent">door problem.</span>
            </Reveal>
          </div>
          <div className="space-y-8 text-xl leading-relaxed text-bone/80 sm:text-2xl sm:leading-relaxed">
            <Reveal as="p">
              Ask anyone who has tried to get into film, television or modelling without the right surname, the right
              postcode or the right follower count. The talent is there. The way in is not.
            </Reveal>
            <Reveal as="p">
              People are passed over because of their ethnicity. Because they do not know anyone. Because they have no
              clout. Because they cannot afford the headshots, the classes, the travel, or the months of unpaid waiting.
            </Reveal>
            <Reveal as="p" className="text-bone">
              BOA Network was built to be the opposite of that. A production company that goes looking for the people
              everyone else filters out and then puts them at the centre of the frame.
            </Reveal>
          </div>
        </div>
      </section>

      <section className="section border-y border-white/[0.07] bg-ink">
        <div className="container-x">
          <SectionLabel index="03">The founders</SectionLabel>
          <div className="grid gap-16 md:grid-cols-2 lg:gap-24">
            {founders.map((f, i) => (
              <Reveal key={f.name} as="article" delay={i * 0.12}>
                <CinematicImage
                  src={f.image}
                  alt={f.image ? f.name : ''}
                  ratio="portrait"
                  tone={f.tone}
                  person
                  label="Portrait · 4:5"
                  className="glow-border rounded-2xl"
                />
                <p className="hud-label mt-8 !text-gold">{f.role}</p>
                <h3 className="mt-3 text-5xl font-semibold tracking-[-0.045em] sm:text-6xl">{f.name}</h3>
                <p className="mt-6 max-w-lg text-lg leading-relaxed text-bone/75">{f.bio}</p>
                <p className="accent mt-6 max-w-md text-2xl leading-snug sm:text-3xl">“{f.line}”</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container-x">
          <SectionLabel index="04">Why it exists</SectionLabel>
          <Reveal as="h2" className="display-lg max-w-[14ch]">
            A door opener, <span className="accent">not a gatekeeper.</span>
          </Reveal>
          <div className="mt-16 grid gap-6 sm:mt-24 md:grid-cols-3">
            {principles.map((p, i) => (
              <Reveal key={p.title} delay={i * 0.1} className="glass glow-border rounded-2xl p-7 sm:p-9">
                <p className="hud-label mb-14 sm:mb-20">Principle · 0{i + 1}</p>
                <h3 className="text-3xl font-semibold tracking-[-0.035em]">{p.title}</h3>
                <p className="mt-4 leading-relaxed text-mist">{p.body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <ClosingCTA />
    </>
  )
}
