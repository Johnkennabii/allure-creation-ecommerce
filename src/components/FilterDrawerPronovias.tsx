"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"

interface FilterOption {
  id: string
  name: string
}

interface FilterDrawerPronoviasProps {
  isOpen: boolean
  onClose: () => void
  types: FilterOption[]
  sizes: FilterOption[]
  colors: FilterOption[]
}

export default function FilterDrawerPronovias({
  isOpen,
  onClose,
  types,
  sizes,
  colors,
}: FilterDrawerPronoviasProps) {
  const router = useRouter()
  const searchParams = useSearchParams()

  const [searchName, setSearchName] = useState(searchParams.get("search") || "")
  const [searchReference, setSearchReference] = useState(searchParams.get("reference") || "")
  const [selectedType, setSelectedType] = useState(searchParams.get("type") || "")
  const [selectedSize, setSelectedSize] = useState(searchParams.get("size") || "")
  const [selectedColor, setSelectedColor] = useState(searchParams.get("color") || "")

  useEffect(() => {
    setSearchName(searchParams.get("search") || "")
    setSearchReference(searchParams.get("reference") || "")
    setSelectedType(searchParams.get("type") || "")
    setSelectedSize(searchParams.get("size") || "")
    setSelectedColor(searchParams.get("color") || "")
  }, [searchParams])

  const applyFilters = () => {
    const params = new URLSearchParams()

    if (searchName) params.set("search", searchName)
    if (searchReference) params.set("reference", searchReference)
    if (selectedType) params.set("type", selectedType)
    if (selectedSize) params.set("size", selectedSize)
    if (selectedColor) params.set("color", selectedColor)

    router.push(`/robes?${params.toString()}`)
    onClose()
  }

  const resetFilters = () => {
    setSearchName("")
    setSearchReference("")
    setSelectedType("")
    setSelectedSize("")
    setSelectedColor("")
    router.push("/robes")
    onClose()
  }

  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-pronovias-black/50 z-40 transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
      />

      {/* Drawer - Opens from LEFT */}
      <div
        className={`fixed top-0 left-0 h-full w-full sm:w-96 bg-pronovias-white z-50 transform transition-transform duration-300 ease-in-out overflow-y-auto ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="sticky top-0 bg-pronovias-white border-b border-pronovias-border px-6 py-4 flex items-center justify-between">
          <h2 className="text-base uppercase tracking-widest font-medium text-pronovias-black">
            Filtrer
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:opacity-70 transition-opacity duration-250"
            aria-label="Fermer les filtres"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Filters Content */}
        <div className="px-6 py-6 space-y-8">

          {/* Search by Name */}
          <div className="space-y-3">
            <label className="block text-xs uppercase tracking-widest text-pronovias-black font-medium">
              Nom
            </label>
            <input
              type="text"
              value={searchName}
              onChange={(e) => setSearchName(e.target.value)}
              placeholder="Rechercher par nom"
              className="w-full px-4 py-3 text-sm border border-pronovias-border focus:outline-none focus:border-pronovias-black transition-colors duration-250"
            />
          </div>

          {/* Search by Reference */}
          <div className="space-y-3">
            <label className="block text-xs uppercase tracking-widest text-pronovias-black font-medium">
              Référence
            </label>
            <input
              type="text"
              value={searchReference}
              onChange={(e) => setSearchReference(e.target.value)}
              placeholder="Rechercher par référence"
              className="w-full px-4 py-3 text-sm border border-pronovias-border focus:outline-none focus:border-pronovias-black transition-colors duration-250"
            />
          </div>

          {/* Type Filter */}
          <div className="space-y-3">
            <label className="block text-xs uppercase tracking-widest text-pronovias-black font-medium">
              Type
            </label>
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="w-full px-4 py-3 text-sm border border-pronovias-border focus:outline-none focus:border-pronovias-black transition-colors duration-250 bg-pronovias-white"
            >
              <option value="">Tous les types</option>
              {types.map((type) => (
                <option key={type.id} value={type.name}>
                  {type.name}
                </option>
              ))}
            </select>
          </div>

          {/* Size Filter */}
          <div className="space-y-3">
            <label className="block text-xs uppercase tracking-widest text-pronovias-black font-medium">
              Taille
            </label>
            <select
              value={selectedSize}
              onChange={(e) => setSelectedSize(e.target.value)}
              className="w-full px-4 py-3 text-sm border border-pronovias-border focus:outline-none focus:border-pronovias-black transition-colors duration-250 bg-pronovias-white"
            >
              <option value="">Toutes les tailles</option>
              {sizes.map((size) => (
                <option key={size.id} value={size.name}>
                  {size.name}
                </option>
              ))}
            </select>
          </div>

          {/* Color Filter */}
          <div className="space-y-3">
            <label className="block text-xs uppercase tracking-widest text-pronovias-black font-medium">
              Couleur
            </label>
            <select
              value={selectedColor}
              onChange={(e) => setSelectedColor(e.target.value)}
              className="w-full px-4 py-3 text-sm border border-pronovias-border focus:outline-none focus:border-pronovias-black transition-colors duration-250 bg-pronovias-white"
            >
              <option value="">Toutes les couleurs</option>
              {colors.map((color) => (
                <option key={color.id} value={color.name}>
                  {color.name}
                </option>
              ))}
            </select>
          </div>

        </div>

        {/* Footer Actions */}
        <div className="sticky bottom-0 bg-pronovias-white border-t border-pronovias-border px-6 py-4 space-y-3">
          <button
            onClick={applyFilters}
            className="w-full px-6 py-3 text-sm uppercase tracking-widest font-medium bg-pronovias-black text-pronovias-white hover:bg-pronovias-black/90 transition-colors duration-250"
          >
            Appliquer les filtres
          </button>
          <button
            onClick={resetFilters}
            className="w-full px-6 py-3 text-sm uppercase tracking-widest font-medium border border-pronovias-border text-pronovias-black hover:border-pronovias-black transition-colors duration-250"
          >
            Réinitialiser
          </button>
        </div>
      </div>
    </>
  )
}
