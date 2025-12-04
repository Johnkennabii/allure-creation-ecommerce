"use client"

import { useState, useEffect } from "react"
import { checkDressAvailability } from "@/lib/api"

interface RentalDatePickerPronoviasProps {
  dressId: string
  pricePerDay: number
  onDatesSelected: (startDate: string, endDate: string, days: number, totalPrice: number) => void
}

export default function RentalDatePickerPronovias({
  dressId,
  pricePerDay,
  onDatesSelected,
}: RentalDatePickerPronoviasProps) {
  const [startDate, setStartDate] = useState("")
  const [endDate, setEndDate] = useState("")
  const [isChecking, setIsChecking] = useState(false)
  const [isAvailable, setIsAvailable] = useState<boolean | null>(null)
  const [days, setDays] = useState(0)
  const [totalPrice, setTotalPrice] = useState(0)

  // Date minimale = aujourd'hui
  const today = new Date().toISOString().split("T")[0]

  // Calculate days and price when dates change
  useEffect(() => {
    if (startDate && endDate) {
      const start = new Date(startDate)
      const end = new Date(endDate)
      const diffTime = end.getTime() - start.getTime()
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

      setDays(diffDays)
      setTotalPrice(diffDays * pricePerDay)

      // Check availability
      checkAvailability(startDate, endDate, diffDays, diffDays * pricePerDay)
    } else {
      setDays(0)
      setTotalPrice(0)
      setIsAvailable(null)
    }
  }, [startDate, endDate, dressId, pricePerDay])

  const checkAvailability = async (start: string, end: string, calculatedDays: number, calculatedTotal: number) => {
    setIsChecking(true)
    try {
      // Convertir les dates au format ISO avec heure (midi UTC) pour éviter les décalages
      const startISO = `${start}T12:00:00.000Z`
      const endISO = `${end}T12:00:00.000Z`

      const result = await checkDressAvailability(dressId, startISO, endISO)
      setIsAvailable(result.isAvailable)

      if (result.isAvailable) {
        onDatesSelected(start, end, calculatedDays, calculatedTotal)
      }
    } catch (error) {
      console.error("Error checking availability:", error)
      setIsAvailable(false)
    } finally {
      setIsChecking(false)
    }
  }

  return (
    <div className="space-y-6">
      {/* Card principale - Style Pronovias */}
      <div className="bg-pronovias-white border border-pronovias-border p-6 lg:p-8">
        {/* En-tête */}
        <div className="mb-6 pb-6 border-b border-pronovias-border">
          <h3 className="text-sm uppercase tracking-extra-wide text-pronovias-black font-medium mb-2">
            Dates de location
          </h3>
          <p className="text-xs font-light text-pronovias-text-secondary">
            Sélectionnez vos dates pour vérifier la disponibilité
          </p>
        </div>

        {/* Sélecteurs de dates */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {/* Date de début */}
          <div>
            <label className="block text-xs uppercase tracking-widest text-pronovias-black font-medium mb-3">
              Date de début
            </label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              min={today}
              className="w-full px-4 py-3 text-sm border border-pronovias-border focus:outline-none focus:border-pronovias-black transition-colors duration-250 bg-pronovias-white appearance-none"
              style={{ colorScheme: 'light' }}
            />
          </div>

          {/* Date de fin */}
          <div>
            <label className="block text-xs uppercase tracking-widest text-pronovias-black font-medium mb-3">
              Date de fin
            </label>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              min={startDate || today}
              disabled={!startDate}
              className="w-full px-4 py-3 text-sm border border-pronovias-border focus:outline-none focus:border-pronovias-black transition-colors duration-250 bg-pronovias-white disabled:bg-pronovias-gray-50 disabled:cursor-not-allowed appearance-none"
              style={{ colorScheme: 'light' }}
            />
          </div>
        </div>

        {/* Résumé de la location */}
        {days > 0 && (
          <div className="mt-6 p-6 bg-pronovias-gray-50 border border-pronovias-border">
            <div className="grid grid-cols-2 gap-6 divide-x divide-pronovias-border">
              <div className="text-center">
                <p className="text-xs uppercase tracking-widest text-pronovias-text-secondary mb-2">Durée</p>
                <p className="text-2xl font-light text-pronovias-black">{days}</p>
                <p className="text-xs text-pronovias-text-secondary mt-1">jour{days > 1 ? "s" : ""}</p>
              </div>
              <div className="text-center pl-6">
                <p className="text-xs uppercase tracking-widest text-pronovias-text-secondary mb-2">Prix Total</p>
                <p className="text-2xl font-light text-pronovias-black">{totalPrice.toFixed(0)}€</p>
                <p className="text-xs text-pronovias-text-secondary mt-1">TTC</p>
              </div>
            </div>
          </div>
        )}

        {/* Statut de disponibilité */}
        {isChecking && (
          <div className="mt-6 flex items-center gap-4 px-6 py-4 bg-pronovias-gray-50 border border-pronovias-border">
            <svg className="w-5 h-5 text-pronovias-black animate-spin" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <div>
              <p className="text-sm font-medium text-pronovias-black">Vérification en cours...</p>
              <p className="text-xs text-pronovias-text-secondary mt-1">Nous vérifions la disponibilité de la robe</p>
            </div>
          </div>
        )}

        {!isChecking && isAvailable === true && days > 0 && (
          <div className="mt-6 flex items-start gap-4 px-6 py-4 bg-pronovias-gray-50 border border-pronovias-black">
            <svg className="w-5 h-5 text-pronovias-black flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div>
              <p className="text-sm font-medium text-pronovias-black">Disponible</p>
              <p className="text-xs font-light text-pronovias-text-secondary mt-1">Cette robe est disponible pour les dates sélectionnées.</p>
            </div>
          </div>
        )}

        {!isChecking && isAvailable === false && days > 0 && (
          <div className="mt-6 flex items-start gap-4 px-6 py-4 bg-pronovias-gray-50 border border-pronovias-black">
            <svg className="w-5 h-5 text-pronovias-black flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div>
              <p className="text-sm font-medium text-pronovias-black">Non disponible</p>
              <p className="text-xs font-light text-pronovias-text-secondary mt-1">Cette robe n'est pas disponible pour les dates sélectionnées. Veuillez choisir d'autres dates ou nous contacter.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
