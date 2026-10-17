import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { TalentPortrait } from '../components/cards'
import { ClosingCTA, EASE_EXPO, FilterBar, PageHeader } from '../components/ui'
import { DISCIPLINES, talent } from '../data/talent'

// Portrait crops cycle so the columns fall out of step, like a magazine spread.
const RATIOS = ['3 / 4', '2 / 3', '4 / 5', '3 / 4', '4 / 5', '2 / 3', '3 / 4', '5 / 7']
const heightOf = (ratio) => {
  const [w, h] = ratio.split('/').map(Number)
  return h / w
}

function useColumns() {
  const query = () => (window.matchMedia('(min-width: 1280px)').matches ? 4 : window.matchMedia('(min-width: 768px)').matches ? 3 : 2)
  const [cols, setCols] = useState(query)
  useEffect(() => {
    const onResize = () => setCols(query())
    const queries = ['(min-width: 1280px)', '(min-width: 768px)'].map((q) => window.matchMedia(q))
    queries.forEach((q) => q.addEventListener('change', onResize))
    return () => queries.forEach((q) => q.removeEventListener('change', onResize))
  }, [])
  return cols
}

// Place each portrait in the shortest column so the grid stays level.
function masonry(people, cols) {
  const columns = Array.from({ length: cols }, () => ({ height: 0, items: [] }))
  people.forEach((person, i) => {
    const ratio = RATIOS[i % RATIOS.length]
    const target = columns.reduce((a, b) => (b.height < a.height ? b : a))
    target.items.push({ person, ratio, order: i })
    target.height += heightOf(ratio)
  })
  return columns
}

export default function Talent() {
  const [filter, setFilter] = useState('All')
  const cols = useColumns()
  const options = ['All', ...DISCIPLINES]
  const counts = Object.fromEntries(
    options.map((o) => [o, o === 'All' ? talent.length : talent.filter((t) => t.discipline === o).length]),
  )
  const shown = filter === 'All' ? talent : talent.filter((t) => t.discipline === filter)
  const columns = masonry(shown, cols)

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

      <section className="pb-24 sm:pb-40">
        <div className="container-x mb-8 sm:mb-12">
          <FilterBar label="Filter by discipline" options={options} value={filter} onChange={setFilter} counts={counts} />
        </div>
        <p className="sr-only" aria-live="polite">
          Showing {shown.length} people
        </p>

        {/* Full bleed: edge to edge, hairline gutters */}
        <div key={`${filter}-${cols}`} className="flex gap-[3px] sm:gap-1">
          {columns.map((col, c) => (
            <div key={c} className="flex min-w-0 flex-1 flex-col gap-[3px] sm:gap-1">
              {col.items.map(({ person, ratio, order }) => (
                <motion.div
                  key={person.slug}
                  initial={{ clipPath: 'inset(100% 0 0 0)' }}
                  animate={{ clipPath: 'inset(0% 0 0 0)' }}
                  transition={{ duration: 1.3, ease: EASE_EXPO, delay: 0.1 + order * 0.07 }}
                >
                  <TalentPortrait person={person} ratio={ratio} priority={order < cols} />
                </motion.div>
              ))}
            </div>
          ))}
        </div>
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
