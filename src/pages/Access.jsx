import { useState } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { LightBleed } from '../components/Fog'
import { Arrow, ClosingCTA, MagneticButton, PageHeader, Reveal, SectionLabel } from '../components/ui'
import { castingCalls, faqs, pathways, steps } from '../data/access'

const dateFmt = new Intl.DateTimeFormat('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })

function Faq({ item, open, onToggle, id }) {
  return (
    <div className="border-b border-white/[0.08]">
      <h3>
        <button
          type="button"
          aria-expanded={open}
          aria-controls={id}
          onClick={onToggle}
          className="flex w-full items-center justify-between gap-6 py-6 text-left text-xl font-medium tracking-tight sm:text-2xl"
        >
          {item.q}
          <span
            aria-hidden="true"
            className={`grid h-9 w-9 shrink-0 place-items-center rounded-full border border-white/15 text-gold transition-transform duration-500 ${open ? 'rotate-45' : ''}`}
          >
            +
          </span>
        </button>
      </h3>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={id}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <p className="max-w-2xl pb-7 text-lg leading-relaxed text-mist">{item.a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function Access() {
  const [openFaq, setOpenFaq] = useState(0)

  return (
    <>
      <title>Access — BOA Network</title>
      <meta
        name="description"
        content="How BOA Network opens the door: no-clout and no-money pathways, open casting calls, and how to be seen."
      />
      <PageHeader
        index="04"
        label="Access"
        title={
          <>
            No clout. No money. <span className="accent">No problem.</span>
          </>
        }
        lede="This is the mission in practice. Four pathways in, a list of what we are casting right now, and exactly what happens after you press send."
      />

      <section className="container-x pb-24 sm:pb-40">
        <SectionLabel index="01">Pathways</SectionLabel>
        <div className="grid gap-6 md:grid-cols-2">
          {pathways.map((p, i) => (
            <Reveal key={p.code} delay={(i % 2) * 0.1} className="glass glow-border rounded-2xl p-7 sm:p-10">
              <div className="mb-16 flex items-center justify-between sm:mb-24">
                <span className="hud-label">{p.code}</span>
                <span className="hud-label !text-mist">Pathway</span>
              </div>
              <h2 className="text-5xl font-semibold tracking-[-0.05em] sm:text-6xl">{p.title}</h2>
              <p className="accent mt-4 text-2xl leading-snug sm:text-3xl">{p.promise}</p>
              <p className="mt-5 max-w-lg leading-relaxed text-mist">{p.body}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="section relative overflow-hidden border-y border-white/[0.07] bg-ink">
        <LightBleed className="-right-[30%] top-0 h-[90vh] w-[90vw] sm:w-[55vw]" />
        <div className="container-x relative">
          <SectionLabel index="02">How to be seen</SectionLabel>
          <Reveal as="h2" className="display-lg max-w-[12ch]">
            Four steps. <span className="accent">No secret handshake.</span>
          </Reveal>
          <ol className="mt-16 grid gap-10 sm:mt-24 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
            {steps.map((s, i) => (
              <Reveal as="li" key={s.title} delay={i * 0.08} className="relative border-t border-hud/25 pt-6">
                <span className="absolute -top-px left-0 h-px w-10 bg-gold" />
                <p className="font-mono text-sm text-gold">0{i + 1}</p>
                <h3 className="mt-6 text-2xl font-semibold tracking-[-0.03em]">{s.title}</h3>
                <p className="mt-3 leading-relaxed text-mist">{s.body}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <section className="section">
        <div className="container-x">
          <SectionLabel index="03">Casting calls</SectionLabel>
          <div className="mb-12 flex flex-col gap-6 sm:mb-16 lg:flex-row lg:items-end lg:justify-between">
            <Reveal as="h2" className="display-lg">
              Open <span className="accent">now.</span>
            </Reveal>
            <Reveal as="p" className="max-w-sm text-mist" delay={0.1}>
              Free to apply. First rounds are by self-tape, so a train fare never decides who gets seen.
            </Reveal>
          </div>

          <ul className="border-t border-white/[0.08]">
            {castingCalls.map((c) => (
              <Reveal as="li" key={c.id} y={24} className="border-b border-white/[0.08]">
                <Link
                  to={`/contact?form=talent&role=${encodeURIComponent(`${c.id} — ${c.role} (${c.production})`)}`}
                  className="group grid gap-4 py-7 transition-colors duration-500 hover:bg-white/[0.025] sm:px-4 lg:grid-cols-[6rem_1.5fr_1fr_auto] lg:items-center lg:gap-8"
                >
                  <span className="hud-label">{c.id}</span>
                  <div>
                    <h3 className="text-2xl font-semibold tracking-[-0.03em] transition-colors duration-500 group-hover:text-gold sm:text-3xl">
                      {c.role}
                    </h3>
                    <p className="mt-2 text-mist">{c.note}</p>
                  </div>
                  <dl className="grid grid-cols-2 gap-x-6 gap-y-1 text-sm lg:grid-cols-1">
                    <div className="flex gap-2">
                      <dt className="text-mist">For</dt>
                      <dd>{c.production}</dd>
                    </div>
                    <div className="flex gap-2">
                      <dt className="text-mist">Where</dt>
                      <dd>{c.location}</dd>
                    </div>
                    <div className="flex gap-2">
                      <dt className="text-mist">Type</dt>
                      <dd>{c.type}</dd>
                    </div>
                    <div className="flex gap-2">
                      <dt className="text-mist">Closes</dt>
                      <dd className="text-gold">{c.closes ? dateFmt.format(new Date(c.closes)) : 'Always open'}</dd>
                    </div>
                  </dl>
                  <span className="inline-flex items-center gap-3 text-sm font-semibold text-gold">
                    Apply
                    <Arrow className="transition-transform duration-500 group-hover:translate-x-1.5" />
                  </span>
                </Link>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <section className="section !pt-0">
        <div className="container-x grid gap-12 lg:grid-cols-[1fr_1.5fr] lg:gap-24">
          <div>
            <SectionLabel index="04">Straight answers</SectionLabel>
            <Reveal as="h2" className="display-md">
              Things people are <span className="accent">afraid to ask.</span>
            </Reveal>
            <Reveal className="mt-10" delay={0.1}>
              <MagneticButton to="/contact" variant="ghost">
                Ask us something else
              </MagneticButton>
            </Reveal>
          </div>
          <Reveal className="border-t border-white/[0.08]">
            {faqs.map((f, i) => (
              <Faq
                key={f.q}
                id={`faq-${i}`}
                item={f}
                open={openFaq === i}
                onToggle={() => setOpenFaq(openFaq === i ? -1 : i)}
              />
            ))}
          </Reveal>
        </div>
      </section>

      <ClosingCTA />
    </>
  )
}
