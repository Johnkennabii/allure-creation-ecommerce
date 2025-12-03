"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { useState, useTransition } from "react"

interface DressFiltersProps {
  types: Array<{ id: string; name: string; description?: string }>
  sizes: Array<{ id: string; name: string }>
  colors: Array<{ id: string; name: string; hex_code: string }>
}

export default function DressFilters({
  types,
  sizes,
  colors,
}: DressFiltersProps) {
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
    if (typeValue) params.set("type", typeValue) // On garde le nom dans l'URL (sera converti en ID côté serveur)
    if (sizeValue) params.set("size", sizeValue)
    if (colorValue) params.set("color", colorValue)

    const queryString = params.toString()
    console.log("Navigating to:", `/robes${queryString ? `?${queryString}` : ""}`)

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

  const hasActiveFilters =
    search || selectedType || selectedSize || selectedColor

  const activeFiltersCount = [selectedType, selectedSize, selectedColor, search].filter(Boolean).length

  return (
    <>
      {/* Bouton flottant filtres (Mobile) - Design ludique */}
      <button
        onClick={() => setIsOpen(true)}
        className="lg:hidden fixed bottom-24 right-4 z-40 flex items-center gap-2.5 px-6 py-3.5 bg-gradient-to-r from-accent via-accent to-accent/90 text-white rounded-full shadow-2xl active:scale-95 hover:shadow-accent/40 transition-all duration-300 group"
      >
        <svg className="w-5 h-5 group-hover:rotate-180 transition-transform duration-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
        </svg>
        <span className="font-bold text-sm tracking-wide">Filtres</span>
        {activeFiltersCount > 0 && (
          <span className="bg-white text-accent text-xs w-6 h-6 rounded-full flex items-center justify-center font-black shadow-md animate-pulse">
            {activeFiltersCount}
          </span>
        )}
      </button>

      {/* Bottom Sheet Mobile */}
      <div className={`lg:hidden fixed inset-0 z-[60] transition-all duration-300 ${
        isOpen ? 'visible' : 'invisible'
      }`}>
        {/* Overlay */}
        <div
          className={`absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300 ${
            isOpen ? 'opacity-100' : 'opacity-0'
          }`}
          onClick={() => setIsOpen(false)}
        />

        {/* Sheet */}
        <div className={`absolute bottom-0 left-0 right-0 bg-white rounded-t-3xl shadow-2xl max-h-[85vh] overflow-hidden transition-transform duration-300 ${
          isOpen ? 'translate-y-0' : 'translate-y-full'
        }`}>
          {/* Handle */}
          <div className="flex justify-center pt-3 pb-2">
            <div className="w-12 h-1 bg-gray-300 rounded-full" />
          </div>

          {/* Header - Design moderne */}
          <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100 bg-gradient-to-r from-accent/5 to-transparent">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center">
                <svg className="w-5 h-5 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                </svg>
              </div>
              <h3 className="text-xl font-heading font-bold text-gray-900">Affiner ma recherche</h3>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-2.5 hover:bg-accent/10 rounded-full transition-all duration-200 hover:rotate-90"
            >
              <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Content */}
          <div className="overflow-y-auto px-6 py-6 space-y-7" style={{ maxHeight: 'calc(85vh - 140px)' }}>
            {/* Recherche - Avec icône */}
            <div>
              <label className="flex items-center gap-2 text-sm font-bold text-gray-800 mb-3">
                <svg className="w-5 h-5 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                Rechercher
              </label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Nom, référence..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-12 pr-4 py-3.5 border-2 border-gray-200 rounded-2xl focus:outline-none focus:border-accent focus:ring-4 focus:ring-accent/10 transition-all duration-200 placeholder:text-gray-400"
                />
                <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>

            {/* Type - Avec icône */}
            {types.length > 0 && (
              <div>
                <label className="flex items-center gap-2 text-sm font-bold text-gray-800 mb-3">
                  <svg className="w-5 h-5 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                  </svg>
                  Type de robe
                </label>
                <div className="flex flex-wrap gap-2.5">
                  {types.map((type) => (
                    <button
                      key={type.id}
                      onClick={() => {
                        const newType = selectedType === type.name ? "" : type.name
                        setSelectedType(newType)
                      }}
                      className={`relative px-5 py-2.5 rounded-2xl text-sm font-semibold transition-all duration-200 ${
                        selectedType === type.name
                          ? 'bg-gradient-to-r from-accent to-accent/90 text-white shadow-lg shadow-accent/30 scale-105'
                          : 'bg-gray-100 text-gray-700 hover:bg-accent/10 hover:text-accent active:scale-95'
                      }`}
                    >
                      {type.name}
                      {selectedType === type.name && (
                        <svg className="absolute -top-1 -right-1 w-5 h-5 text-white bg-accent rounded-full p-0.5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Taille - Avec icône */}
            {sizes.length > 0 && (
              <div>
                <label className="flex items-center gap-2 text-sm font-bold text-gray-800 mb-3">
                  <svg className="w-5 h-5 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                  Taille
                </label>
                <div className="grid grid-cols-4 gap-2.5">
                  {sizes.map((size) => (
                    <button
                      key={size.id}
                      onClick={() => {
                        const newSize = selectedSize === size.name ? "" : size.name
                        setSelectedSize(newSize)
                      }}
                      className={`relative px-3 py-3.5 rounded-2xl text-sm font-bold transition-all duration-200 ${
                        selectedSize === size.name
                          ? 'bg-gradient-to-br from-accent to-accent/90 text-white shadow-lg shadow-accent/30 scale-110'
                          : 'bg-gray-100 text-gray-700 hover:bg-accent/10 hover:text-accent hover:scale-105 active:scale-95'
                      }`}
                    >
                      {size.name}
                      {selectedSize === size.name && (
                        <div className="absolute inset-0 rounded-2xl ring-2 ring-white ring-offset-2 ring-offset-transparent pointer-events-none"></div>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Couleur - Design amélioré */}
            {colors.length > 0 && (
              <div>
                <label className="flex items-center gap-2 text-sm font-bold text-gray-800 mb-3">
                  <svg className="w-5 h-5 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                  </svg>
                  Couleur
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {colors.map((color) => (
                    <button
                      key={color.id}
                      onClick={() => {
                        const newColor = selectedColor === color.name ? "" : color.name
                        setSelectedColor(newColor)
                      }}
                      className={`relative flex flex-col items-center gap-2.5 p-4 rounded-2xl border-2 transition-all duration-300 ${
                        selectedColor === color.name
                          ? 'border-accent bg-gradient-to-br from-accent/10 to-accent/5 scale-105 shadow-lg'
                          : 'border-gray-200 hover:border-accent/40 hover:bg-accent/5 hover:scale-102 active:scale-95'
                      }`}
                    >
                      <div className="relative">
                        <div
                          className={`w-10 h-10 rounded-full shadow-md transition-all duration-300 ${
                            selectedColor === color.name ? 'ring-4 ring-accent/30 scale-110' : 'ring-2 ring-gray-200'
                          }`}
                          style={{ backgroundColor: color.hex_code }}
                        />
                        {selectedColor === color.name && (
                          <div className="absolute inset-0 flex items-center justify-center">
                            <svg className="w-6 h-6 text-white drop-shadow-lg" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          </div>
                        )}
                      </div>
                      <span className={`text-xs font-semibold transition-colors ${
                        selectedColor === color.name ? 'text-accent' : 'text-gray-700'
                      }`}>{color.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Footer Actions - Design moderne */}
          <div className="px-6 py-5 border-t border-gray-100 bg-gradient-to-t from-gray-50 to-white flex gap-3 safe-area-bottom">
            {hasActiveFilters && (
              <button
                onClick={() => {
                  clearFilters()
                  setIsOpen(false)
                }}
                className="flex-1 px-6 py-3.5 bg-white text-gray-700 rounded-2xl font-bold text-sm border-2 border-gray-200 hover:border-accent hover:text-accent active:scale-95 transition-all duration-200 shadow-sm"
              >
                <div className="flex items-center justify-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                  Réinitialiser
                </div>
              </button>
            )}
            <button
              onClick={() => {
                updateFilters(search, selectedType, selectedSize, selectedColor)
                setIsOpen(false)
              }}
              className="flex-1 px-6 py-3.5 bg-gradient-to-r from-accent to-accent/90 text-white rounded-2xl font-bold text-sm active:scale-95 hover:shadow-xl hover:shadow-accent/40 transition-all duration-200 shadow-lg"
            >
              <div className="flex items-center justify-center gap-2">
                <span>Voir les résultats</span>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                </svg>
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Desktop Sidebar - Design amélioré */}
      <div className="hidden lg:block space-y-8 bg-white p-6 border-2 border-gray-100 rounded-2xl shadow-sm sticky top-24">
        <div>
          <h3 className="flex items-center gap-2 font-bold text-sm uppercase tracking-wider mb-4 text-gray-800">
            <svg className="w-5 h-5 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            Rechercher
          </h3>
          <div className="relative">
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
              className="w-full pl-11 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-accent focus:ring-4 focus:ring-accent/10 transition-all duration-200"
            />
            <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>

        {types.length > 0 && (
          <div>
            <h3 className="flex items-center gap-2 font-bold text-sm uppercase tracking-wider mb-4 text-gray-800">
              <svg className="w-5 h-5 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
              </svg>
              Type
            </h3>
            <div className="space-y-2">
              {types.map((type) => (
                <label key={type.id} className="flex items-center cursor-pointer group p-2.5 rounded-xl hover:bg-accent/5 transition-all duration-200">
                  <input
                    type="radio"
                    name="type"
                    value={type.name}
                    checked={selectedType === type.name}
                    onChange={(e) => {
                      setSelectedType(e.target.value)
                      updateFilters(undefined, e.target.value)
                    }}
                    className="w-4 h-4 text-accent focus:ring-accent focus:ring-2 mr-3"
                  />
                  <span className={`text-sm font-medium transition-colors ${
                    selectedType === type.name ? 'text-accent font-semibold' : 'text-gray-700 group-hover:text-accent'
                  }`} title={type.description}>
                    {type.name}
                  </span>
                </label>
              ))}
            </div>
          </div>
        )}

        {sizes.length > 0 && (
          <div>
            <h3 className="flex items-center gap-2 font-bold text-sm uppercase tracking-wider mb-4 text-gray-800">
              <svg className="w-5 h-5 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
              Taille
            </h3>
            <div className="space-y-2">
              {sizes.map((size) => (
                <label key={size.id} className="flex items-center cursor-pointer group p-2.5 rounded-xl hover:bg-accent/5 transition-all duration-200">
                  <input
                    type="radio"
                    name="size"
                    value={size.name}
                    checked={selectedSize === size.name}
                    onChange={(e) => {
                      setSelectedSize(e.target.value)
                      updateFilters(undefined, undefined, e.target.value)
                    }}
                    className="w-4 h-4 text-accent focus:ring-accent focus:ring-2 mr-3"
                  />
                  <span className={`text-sm font-medium transition-colors ${
                    selectedSize === size.name ? 'text-accent font-semibold' : 'text-gray-700 group-hover:text-accent'
                  }`}>{size.name}</span>
                </label>
              ))}
            </div>
          </div>
        )}

        {colors.length > 0 && (
          <div>
            <h3 className="flex items-center gap-2 font-bold text-sm uppercase tracking-wider mb-4 text-gray-800">
              <svg className="w-5 h-5 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
              </svg>
              Couleur
            </h3>
            <div className="space-y-2">
              {colors.map((color) => (
                <label key={color.id} className="flex items-center cursor-pointer group p-2.5 rounded-xl hover:bg-accent/5 transition-all duration-200">
                  <input
                    type="radio"
                    name="color"
                    value={color.name}
                    checked={selectedColor === color.name}
                    onChange={(e) => {
                      setSelectedColor(e.target.value)
                      updateFilters(undefined, undefined, undefined, e.target.value)
                    }}
                    className="w-4 h-4 text-accent focus:ring-accent focus:ring-2 mr-3"
                  />
                  <div className="flex items-center gap-2.5 flex-1">
                    <div
                      className={`w-5 h-5 rounded-full border-2 transition-all ${
                        selectedColor === color.name ? 'border-accent scale-110' : 'border-gray-300'
                      }`}
                      style={{ backgroundColor: color.hex_code }}
                    />
                    <span className={`text-sm font-medium transition-colors ${
                      selectedColor === color.name ? 'text-accent font-semibold' : 'text-gray-700 group-hover:text-accent'
                    }`}>{color.name}</span>
                  </div>
                </label>
              ))}
            </div>
          </div>
        )}

        {hasActiveFilters && (
          <button
            onClick={clearFilters}
            className="w-full py-3 text-sm font-bold uppercase tracking-wider border-2 border-accent text-accent hover:bg-accent hover:text-white transition-all duration-200 rounded-xl flex items-center justify-center gap-2"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Réinitialiser
          </button>
        )}

        {isPending && (
          <div className="text-center text-sm text-gray-500">Chargement...</div>
        )}
      </div>
    </>
  )
}
