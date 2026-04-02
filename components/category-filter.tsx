'use client'

import { useState } from 'react'

interface CategoryFilterProps {
  categories: string[]
  onSelect?: (category: string | null) => void
}

export default function CategoryFilter({ categories, onSelect }: CategoryFilterProps) {
  const [active, setActive] = useState<string | null>(null)

  function handleSelect(cat: string | null) {
    const next = cat === active ? null : cat
    setActive(next)
    onSelect?.(next)
  }

  return (
    <div className="relative">
      {/* Fade edge right */}
      <div className="pointer-events-none absolute right-0 top-0 h-full w-12 bg-gradient-to-l from-background to-transparent z-10" />

      <div
        role="listbox"
        aria-label="Filter by category"
        className="flex items-center gap-2 overflow-x-auto scrollbar-none pb-1 pr-12"
      >
        {/* "All" pill */}
        <button
          role="option"
          aria-selected={active === null}
          onClick={() => handleSelect(null)}
          className={[
            'shrink-0 inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-300 border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50',
            active === null
              ? 'bg-primary text-white border-primary shadow-[0_2px_12px_hsl(329_64%_55%_/_0.35)] scale-[1.03]'
              : 'bg-card text-muted-foreground border-border/60 hover:border-primary/40 hover:text-foreground hover:bg-primary/5',
          ].join(' ')}
        >
          <span
            className={[
              'w-1.5 h-1.5 rounded-full transition-colors',
              active === null ? 'bg-white' : 'bg-muted-foreground',
            ].join(' ')}
          />
          All
        </button>

        {/* Category pills */}
        {categories.map((cat) => {
          const isActive = active === cat
          return (
            <button
              key={cat}
              role="option"
              aria-selected={isActive}
              onClick={() => handleSelect(cat)}
              className={[
                'shrink-0 inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-300 border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50',
                isActive
                  ? 'bg-primary text-white border-primary shadow-[0_2px_12px_hsl(329_64%_55%_/_0.35)] scale-[1.03]'
                  : 'bg-card text-muted-foreground border-border/60 hover:border-primary/40 hover:text-foreground hover:bg-primary/5',
              ].join(' ')}
            >
              <span
                className={[
                  'w-1.5 h-1.5 rounded-full transition-colors duration-300',
                  isActive ? 'bg-white' : 'bg-primary/40',
                ].join(' ')}
              />
              {cat}
            </button>
          )
        })}
      </div>
    </div>
  )
}
