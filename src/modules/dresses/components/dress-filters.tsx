"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { DressType, DressSize, DressColor } from "@/lib/api/allure-api"

interface DressFiltersProps {
  types: DressType[]
  sizes: DressSize[]
  colors: DressColor[]
  onFilterChange: (filters: Record<string, string>) => void
}

export default function DressFilters({
  types,
  sizes,
  colors,
  onFilterChange,
}: DressFiltersProps) {
  const searchParams = useSearchParams()

  const [selectedType, setSelectedType] = useState(searchParams.get("type") || "")
  const [selectedSize, setSelectedSize] = useState(searchParams.get("size") || "")
  const [selectedColor, setSelectedColor] = useState(searchParams.get("color") || "")
  const [search, setSearch] = useState(searchParams.get("search") || "")

  useEffect(() => {
    onFilterChange({
      type: selectedType,
      size: selectedSize,
      color: selectedColor,
      search,
    })
  }, [selectedType, selectedSize, selectedColor, search])

  const clearFilters = () => {
    setSelectedType("")
    setSelectedSize("")
    setSelectedColor("")
    setSearch("")
  }

  const hasActiveFilters = selectedType || selectedSize || selectedColor || search

  return (
    <div className="space-y-6">
      {/* Recherche */}
      <div>
        <label className="block text-sm font-medium mb-2">Rechercher</label>
        <input
          type="text"
          placeholder="Nom, référence..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-black focus:border-transparent"
        />
      </div>

      {/* Type de robe */}
      <div>
        <label className="block text-sm font-medium mb-3">Type de robe</label>
        <div className="space-y-2">
          {types.map((type) => (
            <button
              key={type.id}
              onClick={() =>
                setSelectedType(selectedType === type.id ? "" : type.id)
              }
              className={`w-full text-left px-4 py-3 rounded-md border transition-colors ${
                selectedType === type.id
                  ? "bg-black text-white border-black"
                  : "bg-white border-gray-200 hover:border-gray-400"
              }`}
            >
              <div className="font-medium">{type.name}</div>
              {type.description && (
                <div className="text-xs opacity-70 mt-1">
                  {type.description}
                </div>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Tailles */}
      <div>
        <label className="block text-sm font-medium mb-3">Taille</label>
        <div className="grid grid-cols-4 gap-2">
          {sizes.map((size) => (
            <button
              key={size.id}
              onClick={() =>
                setSelectedSize(selectedSize === size.id ? "" : size.id)
              }
              className={`px-3 py-2 rounded-md border text-sm font-medium transition-colors ${
                selectedSize === size.id
                  ? "bg-black text-white border-black"
                  : "bg-white border-gray-200 hover:border-gray-400"
              }`}
            >
              {size.name}
            </button>
          ))}
        </div>
      </div>

      {/* Couleurs */}
      <div>
        <label className="block text-sm font-medium mb-3">Couleur</label>
        <div className="grid grid-cols-4 gap-3">
          {colors.map((color) => (
            <button
              key={color.id}
              onClick={() =>
                setSelectedColor(selectedColor === color.id ? "" : color.id)
              }
              className={`group relative aspect-square rounded-full border-2 transition-all ${
                selectedColor === color.id
                  ? "border-black scale-110"
                  : "border-gray-300 hover:border-gray-500"
              }`}
              style={{ backgroundColor: color.hex_code }}
              title={color.name}
            >
              {selectedColor === color.id && (
                <svg
                  className="absolute inset-0 m-auto w-4 h-4 text-white drop-shadow-lg"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={3}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Réinitialiser */}
      {hasActiveFilters && (
        <button
          onClick={clearFilters}
          className="w-full px-4 py-3 bg-gray-100 hover:bg-gray-200 rounded-md text-sm font-medium transition-colors"
        >
          Réinitialiser les filtres
        </button>
      )}
    </div>
  )
}
