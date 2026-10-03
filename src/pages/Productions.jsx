import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ProductionCard } from '../components/cards'
import { ClosingCTA, PageHeader } from '../components/ui'
import { FORMATS, productions } from '../data/productions'

export function FilterBar({ label, options, value, onChange, counts }) {
  return (
    <div role="group" aria-label={label} className="flex flex-wrap gap-2">
      {options.map((opt) => {
        const active = value === opt
        return (
          <button
            key={opt}
            type="button"
            aria-pressed={active}
            onClick={() => onChange(opt)}
            className={`rounded-full border px-5 py-2.5 text-sm font-medium transition-colors duration-300 ${
              active
                ? 'border-gold bg-gold text-obsidian'
                : 'border-white/15 text-bone/75 hover:border-gold/60 hover:text-bone'
            }`}
          >
            {opt}
            <span className={`ml-2 font-mono text-xs ${active ? 'text-obsidian/70' : 'text-mist'}`}>{counts[opt]}</span>
          </button>
        )
      })}
    </div>
  )
}

export default function Productions() {
  const [filter, setFilter] = useState('All')
  const options = ['All', ...FORMATS]
  const counts = Object.fromEntries(
    options.map((o) => [o, o === 'All' ? productions.length : productions.filter((p) => p.format === o).length]),
  )
  const shown = filter === 'All' ? productions : productions.filter((p) => p.format === filter)

  return (
    <>
      <title>Productions — BOA Network</title>
      <meta name="description" content="Films, series and television from BOA Network — in development, in production and released." />
      <PageHeader
        index="02"
        label="Productions"
        title={
          <>
            The <span className="accent">slate.</span>
          </>
        }
        lede="Film, series and television — each one built with roles for talent the industry has not met yet."
      />

      <section className="container-x pb-24 sm:pb-40">
        <FilterBar label="Filter by format" options={options} value={filter} onChange={setFilter} counts={counts} />
        <p className="sr-only" aria-live="polite">
          Showing {shown.length} productions
        </p>
        <motion.div layout className="mt-10 grid gap-6 sm:mt-14 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          <AnimatePresence mode="popLayout">
            {shown.map((p) => (
              <motion.div
                key={p.slug}
                layout
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              >
                <ProductionCard production={p} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </section>

      <ClosingCTA
        title={
          <>
            There is a role <span className="accent">with your name on it.</span>
          </>
        }
        body="Every production on this slate is casting, or will be. Get on our radar before the call goes out."
      />
    </>
  )
}
