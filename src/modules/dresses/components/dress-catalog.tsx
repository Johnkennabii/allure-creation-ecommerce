"use client"

import { useState } from "react"
import { Dress, DressType, DressSize, DressColor } from "@/lib/api/allure-api"
import DressCard from "./dress-card"
import DressFilters from "./dress-filters"
import { useRouter, useSearchParams } from "next/navigation"

interface DressCatalogProps {
  dresses: Dress[]
  total: number
  page: number
  limit: number
  types: DressType[]
  sizes: DressSize[]
  colors: DressColor[]
}

export default function DressCatalog({
  dresses,
  total,
  page,
  limit,
  types,
  sizes,
  colors,
}: DressCatalogProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [isFilterOpen, setIsFilterOpen] = useState(false)

  const totalPages = Math.ceil(total / limit)

  const handleFilterChange = (filters: Record<string, string>) => {
    const params = new URLSearchParams(searchParams.toString())

    Object.entries(filters).forEach(([key, value]) => {
      if (value) {
        params.set(key, value)
      } else {
        params.delete(key)
      }
    })

    params.set("page", "1") // Reset to first page when filtering

    router.push(`?${params.toString()}`)
  }

  return (
    <div className="content-container py-12">
      {/* En-tête */}
      <div className="mb-12">
        <h1 className="font-heading text-4xl md:text-5xl font-light mb-4">
          Notre Collection
        </h1>
        <p className="text-gray-600 text-lg">
          {total} {total > 1 ? "robes" : "robe"} disponible
          {total > 1 ? "s" : ""}
        </p>
      </div>

      <div className="flex gap-8">
        {/* Filtres - Desktop */}
        <aside className="hidden lg:block w-64 flex-shrink-0">
          <div className="sticky top-24">
            <DressFilters
              types={types}
              sizes={sizes}
              colors={colors}
              onFilterChange={handleFilterChange}
            />
          </div>
        </aside>

        {/* Grille de produits */}
        <div className="flex-1">
          {dresses.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-gray-500 text-lg">
                Aucune robe ne correspond à vos critères
              </p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                {dresses.map((dress) => (
                  <DressCard key={dress.id} dress={dress} />
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="mt-12 flex justify-center gap-2">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                    (pageNum) => (
                      <button
                        key={pageNum}
                        onClick={() => {
                          const params = new URLSearchParams(
                            searchParams.toString()
                          )
                          params.set("page", pageNum.toString())
                          router.push(`?${params.toString()}`)
                        }}
                        className={`px-4 py-2 rounded-md transition ${
                          pageNum === page
                            ? "bg-black text-white"
                            : "bg-gray-100 hover:bg-gray-200"
                        }`}
                      >
                        {pageNum}
                      </button>
                    )
                  )}
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {/* Bouton filtres - Mobile */}
      <button
        onClick={() => setIsFilterOpen(true)}
        className="lg:hidden fixed bottom-6 right-6 bg-black text-white px-6 py-3 rounded-full shadow-lg z-50"
      >
        Filtres
      </button>

      {/* Modal filtres - Mobile */}
      {isFilterOpen && (
        <div className="lg:hidden fixed inset-0 bg-black/50 z-50">
          <div className="absolute right-0 top-0 h-full w-full max-w-sm bg-white p-6 overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-heading">Filtres</h2>
              <button onClick={() => setIsFilterOpen(false)}>
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <DressFilters
              types={types}
              sizes={sizes}
              colors={colors}
              onFilterChange={(filters) => {
                handleFilterChange(filters)
                setIsFilterOpen(false)
              }}
            />
          </div>
        </div>
      )}
    </div>
  )
}
