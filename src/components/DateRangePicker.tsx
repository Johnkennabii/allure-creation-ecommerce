"use client"

import { useState, useEffect } from "react"
import { checkDressAvailability } from "@/lib/api"

interface DateRangePickerProps {
  dressId: string
  onDatesSelected: (startDate: string, endDate: string, days: number) => void
  initialStartDate?: string
  initialEndDate?: string
}

export default function DateRangePicker({
  dressId,
  onDatesSelected,
  initialStartDate = "",
  initialEndDate = "",
}: DateRangePickerProps) {
  const [startDate, setStartDate] = useState(initialStartDate)
  const [endDate, setEndDate] = useState(initialEndDate)
  const [isChecking, setIsChecking] = useState(false)
  const [isAvailable, setIsAvailable] = useState<boolean | null>(null)
  const [days, setDays] = useState(0)

  // Date minimale = aujourd'hui
  const today = new Date().toISOString().split("T")[0]

  // Calculer le nombre de jours de location (1 déc → 5 déc = 4 jours, 5 déc → 6 déc = 1 jour)
  useEffect(() => {
    if (startDate && endDate) {
      const start = new Date(startDate)
      const end = new Date(endDate)
      const diffTime = end.getTime() - start.getTime()
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
      setDays(diffDays)
    } else {
      setDays(0)
    }
  }, [startDate, endDate])

  // Vérifier la disponibilité
  const checkAvailability = async () => {
    if (!startDate || !endDate) return

    setIsChecking(true)
    setIsAvailable(null)

    try {
      // Calculer le nombre de jours
      const start = new Date(startDate)
      const end = new Date(endDate)
      const diffTime = end.getTime() - start.getTime()
      const calculatedDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

      // Convertir en ISO avec l'heure pour l'API (12h = heure d'ouverture)
      // Utiliser UTC pour éviter les décalages de fuseau horaire
      const startISO = `${startDate}T12:00:00.000Z`
      const endISO = `${endDate}T12:00:00.000Z`

      const { isAvailable: available } = await checkDressAvailability(
        dressId,
        startISO,
        endISO
      )

      setIsAvailable(available)
    } catch (error) {
      console.error("Error checking availability:", error)
      setIsAvailable(false)
    } finally {
      setIsChecking(false)
    }
  }

  // Auto-vérifier quand les deux dates sont sélectionnées
  useEffect(() => {
    if (startDate && endDate && new Date(endDate) >= new Date(startDate)) {
      checkAvailability()
    }
  }, [startDate, endDate])

  const handleConfirm = () => {
    if (startDate && endDate && days > 0) {
      onDatesSelected(startDate, endDate, days)
    }
  }

  return (
    <div className="space-y-4">
      <div>
        <h3 className="font-semibold mb-3">Sélectionner les dates de location</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Date de début */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Date de début
            </label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              min={today}
              max={endDate || undefined}
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-black"
            />
          </div>

          {/* Date de fin */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Date de fin
            </label>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              min={startDate || today}
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-black"
            />
          </div>
        </div>
      </div>

      {/* Informations */}
      {startDate && endDate && (
        <div className="bg-gray-50 p-4 rounded">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm">Durée de location</span>
            <span className="font-semibold">{days} jour{days > 1 ? "s" : ""}</span>
          </div>

          {/* Statut de disponibilité */}
          {isChecking && (
            <div className="text-sm text-gray-600 mt-2">
              ⏳ Vérification de la disponibilité...
            </div>
          )}

          {!isChecking && isAvailable === true && (
            <div className="text-sm text-green-600 mt-2 flex items-center">
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              ✓ Disponible pour ces dates
            </div>
          )}

          {!isChecking && isAvailable === false && (
            <div className="text-sm text-red-600 mt-2 flex items-center">
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                  clipRule="evenodd"
                />
              </svg>
              ✗ Non disponible pour ces dates
            </div>
          )}
        </div>
      )}

      {/* Message si dates non sélectionnées */}
      {(!startDate || !endDate) && (
        <p className="text-sm text-gray-500">
          Sélectionnez une date de début et une date de fin pour vérifier la disponibilité
        </p>
      )}

      {/* Bouton de confirmation */}
      {startDate && endDate && days > 0 && (
        <button
          onClick={handleConfirm}
          disabled={isChecking}
          className="w-full px-4 py-2 bg-black text-white font-medium hover:bg-gray-800 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
        >
          {isChecking ? "Vérification..." : "Confirmer ces dates"}
        </button>
      )}
    </div>
  )
}
