import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { TalentCard } from '../components/cards'
import { ClosingCTA, PageHeader } from '../components/ui'
import { FilterBar } from './Productions'
import { DISCIPLINES, talent } from '../data/talent'

export default function Talent() {
  const [filter, setFilter] = useState('All')
  const options = ['All', ...DISCIPLINES]
  const counts = Object.fromEntries(
    options.map((o) => [o, o === 'All' ? talent.length : talent.filter((t) => t.discipline === o).length]),
  )
  const shown = filter === 'All' ? talent : talent.filter((t) => t.discipline === filter)

  return (
    <>
      <title>Talent — BOA Network</title>
      <meta name="description" content="The BOA Network roster: actors and models discovered through open access, not connections." />
      <PageHeader
        index="03"
        label="Talent"
        title={
          <>
            The <span className="accent">roster.</span>
          </>
        }
        lede="Actors and models we believe in. Most of them came through an open call. None of them came through a favour."
      />

      <section className="container-x pb-24 sm:pb-40">
        <FilterBar label="Filter by discipline" options={options} value={filter} onChange={setFilter} counts={counts} />
        <p className="sr-only" aria-live="polite">
          Showing {shown.length} people
        </p>
        <motion.div layout className="mt-10 grid grid-cols-2 gap-4 sm:mt-14 sm:gap-6 lg:grid-cols-4 lg:gap-8">
          <AnimatePresence mode="popLayout">
            {shown.map((t) => (
              <motion.div
                key={t.slug}
                layout
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              >
                <TalentCard person={t} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </section>

      <ClosingCTA
        title={
          <>
            The next face here <span className="accent">could be yours.</span>
          </>
        }
      />
    </>
  )
}
