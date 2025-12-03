"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { useState, useTransition } from "react"
import ButtonPronovias from "./ButtonPronovias"

interface DressFiltersPronoviasProps {
  types: Array<{ id: string; name: string; description?: string }>
  sizes: Array<{ id: string; name: string }>
  colors: Array<{ id: string; name: string; hex_code: string }>
}

export default function DressFiltersPronovias({
  types,
  sizes,
  colors,
}: DressFiltersPronoviasProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [isPending, startTransition] = useTransition()
  const [isOpen, setIsOpen] = useState(false)

  const [search, setSearch] = useState(searchParams.get("search") || "")
  const [selectedType, setSelectedType] = useState(
    searchParams.get("type") || ""
  )
  const [selectedSize, setSelectedSize] = useState(
    searchParams.get("size") || ""
  )
  const [selectedColor, setSelectedColor] = useState(
    searchParams.get("color") || ""
  )

  const updateFilters = (
    newSearch?: string,
    newType?: string,
    newSize?: string,
    newColor?: string
  ) => {
    const params = new URLSearchParams()

    const searchValue = newSearch !== undefined ? newSearch : search
    const typeValue = newType !== undefined ? newType : selectedType
    const sizeValue = newSize !== undefined ? newSize : selectedSize
    const colorValue = newColor !== undefined ? newColor : selectedColor

    if (searchValue) params.set("search", searchValue)
    if (typeValue) params.set("type", typeValue)
    if (sizeValue) params.set("size", sizeValue)
    if (colorValue) params.set("color", colorValue)

    const queryString = params.toString()
    startTransition(() => {
      router.push(`/robes${queryString ? `?${queryString}` : ""}`)
    })
  }

  const clearFilters = () => {
    setSearch("")
    setSelectedType("")
    setSelectedSize("")
    setSelectedColor("")
    startTransition(() => {
      router.push("/robes")
    })
  }

  const hasActiveFilters = search || selectedType || selectedSize || selectedColor
  const activeFiltersCount = [selectedType, selectedSize, selectedColor, search].filter(Boolean).length

  return (
    <>
      {/* Mobile Filter Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="lg:hidden fixed bottom-6 right-6 z-40 px-6 py-3 bg-pronovias-black text-pronovias-white rounded-none text-xs uppercase tracking-widest font-medium shadow-lg hover:bg-gray-900 transition-all duration-250 flex items-center gap-2"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
        </svg>
        <span>Filtrer</span>
        {activeFiltersCount > 0 && (
          <span className="ml-1 bg-pronovias-white text-pronovias-black text-xs w-5 h-5 rounded-full flex items-center justify-center font-medium">
            {activeFiltersCount}
          </span>
        )}
      </button>

      {/* Mobile Filters Panel */}
      <div
        className={`lg:hidden fixed inset-0 z-[60] transition-all duration-300 ${
          isOpen ? 'visible' : 'invisible'
        }`}
      >
        {/* Overlay */}
        <div
          className={`absolute inset-0 bg-black/40 transition-opacity duration-300 ${
            isOpen ? 'opacity-100' : 'opacity-0'
          }`}
          onClick={() => setIsOpen(false)}
        />

        {/* Panel */}
        <div
          className={`absolute bottom-0 left-0 right-0 bg-pronovias-white max-h-[85vh] overflow-hidden transition-transform duration-300 ${
            isOpen ? 'translate-y-0' : 'translate-y-full'
          }`}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-5 border-b border-pronovias-border">
            <h3 className="text-base uppercase tracking-widest font-medium text-pronovias-black">
              Filtres
            </h3>
            <button
              onClick={() => setIsOpen(false)}
              className="p-2 hover:opacity-70 transition-opacity duration-250"
              aria-label="Fermer"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Content */}
          <div className="overflow-y-auto px-6 py-6 space-y-8" style={{ maxHeight: 'calc(85vh - 140px)' }}>
            {/* Search */}
            <div>
              <label className="block text-xs uppercase tracking-widest text-pronovias-black font-medium mb-3">
                Rechercher
              </label>
              <input
                type="text"
                placeholder="Nom, référence..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full px-4 py-3 border border-pronovias-border text-sm focus:outline-none focus:border-pronovias-black transition-colors duration-250"
              />
            </div>

            {/* Type */}
            {types.length > 0 && (
              <div>
                <label className="block text-xs uppercase tracking-widest text-pronovias-black font-medium mb-3">
                  Type de robe
                </label>
                <div className="space-y-2">
                  {types.map((type) => (
                    <label
                      key={type.id}
                      className="flex items-center cursor-pointer py-2 hover:opacity-70 transition-opacity duration-250"
                    >
                      <input
                        type="radio"
                        name="type-mobile"
                        value={type.name}
                        checked={selectedType === type.name}
                        onChange={(e) => setSelectedType(e.target.value)}
                        className="w-4 h-4 text-pronovias-black focus:ring-pronovias-black mr-3"
                      />
                      <span className="text-sm font-light text-pronovias-black">
                        {type.name}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            )}

            {/* Size */}
            {sizes.length > 0 && (
              <div>
                <label className="block text-xs uppercase tracking-widest text-pronovias-black font-medium mb-3">
                  Taille
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {sizes.map((size) => (
                    <button
                      key={size.id}
                      onClick={() => {
                        const newSize = selectedSize === size.name ? "" : size.name
                        setSelectedSize(newSize)
                      }}
                      className={`px-3 py-3 text-sm font-light transition-all duration-250 ${
                        selectedSize === size.name
                          ? 'bg-pronovias-black text-pronovias-white'
                          : 'bg-pronovias-white text-pronovias-black border border-pronovias-border hover:border-pronovias-black'
                      }`}
                    >
                      {size.name}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Color */}
            {colors.length > 0 && (
              <div>
                <label className="block text-xs uppercase tracking-widest text-pronovias-black font-medium mb-3">
                  Couleur
                </label>
                <div className="space-y-2">
                  {colors.map((color) => (
                    <label
                      key={color.id}
                      className="flex items-center cursor-pointer py-2 hover:opacity-70 transition-opacity duration-250"
                    >
                      <input
                        type="radio"
                        name="color-mobile"
                        value={color.name}
                        checked={selectedColor === color.name}
                        onChange={(e) => setSelectedColor(e.target.value)}
                        className="w-4 h-4 text-pronovias-black focus:ring-pronovias-black mr-3"
                      />
                      <div
                        className="w-5 h-5 border border-pronovias-border mr-2"
                        style={{ backgroundColor: color.hex_code }}
                      />
                      <span className="text-sm font-light text-pronovias-black">
                        {color.name}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Footer Actions */}
          <div className="px-6 py-5 border-t border-pronovias-border flex gap-3">
            {hasActiveFilters && (
              <ButtonPronovias
                variant="secondary"
                size="medium"
                fullWidth
                onClick={() => {
                  clearFilters()
                  setIsOpen(false)
                }}
              >
                Réinitialiser
              </ButtonPronovias>
            )}
            <ButtonPronovias
              variant="primary"
              size="medium"
              fullWidth
              onClick={() => {
                updateFilters(search, selectedType, selectedSize, selectedColor)
                setIsOpen(false)
              }}
            >
              Appliquer
            </ButtonPronovias>
          </div>
        </div>
      </div>

      {/* Desktop Sidebar */}
      <div className="hidden lg:block space-y-8 sticky top-24">
        {/* Search */}
        <div>
          <h3 className="text-xs uppercase tracking-widest text-pronovias-black font-medium mb-4">
            Rechercher
          </h3>
          <input
            type="text"
            placeholder="Nom, référence..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                updateFilters(search)
              }
            }}
            className="w-full px-4 py-3 border border-pronovias-border text-sm focus:outline-none focus:border-pronovias-black transition-colors duration-250"
          />
        </div>

        {/* Type */}
        {types.length > 0 && (
          <div>
            <h3 className="text-xs uppercase tracking-widest text-pronovias-black font-medium mb-4">
              Type
            </h3>
            <div className="space-y-3">
              {types.map((type) => (
                <label
                  key={type.id}
                  className="flex items-center cursor-pointer py-1 hover:opacity-70 transition-opacity duration-250"
                >
                  <input
                    type="radio"
                    name="type"
                    value={type.name}
                    checked={selectedType === type.name}
                    onChange={(e) => {
                      setSelectedType(e.target.value)
                      updateFilters(undefined, e.target.value)
                    }}
                    className="w-4 h-4 text-pronovias-black focus:ring-pronovias-black mr-3"
                  />
                  <span className="text-sm font-light text-pronovias-black">
                    {type.name}
                  </span>
                </label>
              ))}
            </div>
          </div>
        )}

        {/* Size */}
        {sizes.length > 0 && (
          <div>
            <h3 className="text-xs uppercase tracking-widest text-pronovias-black font-medium mb-4">
              Taille
            </h3>
            <div className="space-y-3">
              {sizes.map((size) => (
                <label
                  key={size.id}
                  className="flex items-center cursor-pointer py-1 hover:opacity-70 transition-opacity duration-250"
                >
                  <input
                    type="radio"
                    name="size"
                    value={size.name}
                    checked={selectedSize === size.name}
                    onChange={(e) => {
                      setSelectedSize(e.target.value)
                      updateFilters(undefined, undefined, e.target.value)
                    }}
                    className="w-4 h-4 text-pronovias-black focus:ring-pronovias-black mr-3"
                  />
                  <span className="text-sm font-light text-pronovias-black">
                    {size.name}
                  </span>
                </label>
              ))}
            </div>
          </div>
        )}

        {/* Color */}
        {colors.length > 0 && (
          <div>
            <h3 className="text-xs uppercase tracking-widest text-pronovias-black font-medium mb-4">
              Couleur
            </h3>
            <div className="space-y-3">
              {colors.map((color) => (
                <label
                  key={color.id}
                  className="flex items-center cursor-pointer py-1 hover:opacity-70 transition-opacity duration-250"
                >
                  <input
                    type="radio"
                    name="color"
                    value={color.name}
                    checked={selectedColor === color.name}
                    onChange={(e) => {
                      setSelectedColor(e.target.value)
                      updateFilters(undefined, undefined, undefined, e.target.value)
                    }}
                    className="w-4 h-4 text-pronovias-black focus:ring-pronovias-black mr-3"
                  />
                  <div
                    className="w-5 h-5 border border-pronovias-border mr-2"
                    style={{ backgroundColor: color.hex_code }}
                  />
                  <span className="text-sm font-light text-pronovias-black">
                    {color.name}
                  </span>
                </label>
              ))}
            </div>
          </div>
        )}

        {/* Clear Filters */}
        {hasActiveFilters && (
          <ButtonPronovias
            variant="secondary"
            size="small"
            fullWidth
            onClick={clearFilters}
          >
            Réinitialiser
          </ButtonPronovias>
        )}

        {isPending && (
          <div className="text-center text-xs uppercase tracking-widest text-pronovias-text-secondary">
            Chargement...
          </div>
        )}
      </div>
    </>
  )
}
