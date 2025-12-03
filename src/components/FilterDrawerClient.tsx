"use client"

import { useState } from "react"
import FilterDrawerPronovias from "./FilterDrawerPronovias"

interface FilterOption {
  id: string
  name: string
}

interface FilterDrawerClientProps {
  types: FilterOption[]
  sizes: FilterOption[]
  colors: FilterOption[]
  totalResults: number
}

export default function FilterDrawerClient({
  types,
  sizes,
  colors,
  totalResults,
}: FilterDrawerClientProps) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)

  return (
    <>
      {/* Toolbar - Results count & Filter button */}
      <div className="flex items-center justify-between gap-4 mb-6 lg:mb-8 pb-4 border-b border-pronovias-border">
        {/* Results count */}
        <p className="text-xs uppercase tracking-widest text-pronovias-text-secondary">
          {totalResults} résultat{totalResults > 1 ? "s" : ""}
        </p>

        {/* Filter button */}
        <button
          onClick={() => setIsDrawerOpen(true)}
          className="flex items-center gap-2 px-4 py-2 text-xs uppercase tracking-widest text-pronovias-black border border-pronovias-border hover:border-pronovias-black transition-colors duration-250"
          aria-label="Ouvrir les filtres"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5" />
          </svg>
          <span className="hidden sm:inline">Filtrer</span>
        </button>
      </div>

      {/* Filter Drawer */}
      <FilterDrawerPronovias
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        types={types}
        sizes={sizes}
        colors={colors}
      />
    </>
  )
}
