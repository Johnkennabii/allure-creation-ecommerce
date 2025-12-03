"use client"

import { useState, useEffect, useRef } from "react"
import { checkDressAvailability } from "@/lib/api"
import flatpickr from "flatpickr"
import { French } from "flatpickr/dist/l10n/fr"
import "flatpickr/dist/flatpickr.min.css"
import type { Instance } from "flatpickr/dist/types/instance"

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

  const startDateRef = useRef<HTMLInputElement>(null)
  const endDateRef = useRef<HTMLInputElement>(null)
  const startPickerRef = useRef<Instance | null>(null)
  const endPickerRef = useRef<Instance | null>(null)

  // Initialize Flatpickr
  useEffect(() => {
    const initPickers = () => {
      // Date de début
      if (startDateRef.current && !startPickerRef.current) {
        startPickerRef.current = flatpickr(startDateRef.current, {
          locale: French,
          dateFormat: "d/m/Y",
          minDate: "today",
          allowInput: false,
          clickOpens: true,
          mode: "single",
          inline: false,
          static: false,
          position: "auto",
          disableMobile: false,
          onChange: (selectedDates) => {
            if (selectedDates.length > 0) {
              const date = selectedDates[0].toISOString().split("T")[0]
              setStartDate(date)

              // Activer et mettre à jour le date picker de fin
              if (endPickerRef.current) {
                endPickerRef.current.set("minDate", selectedDates[0])
                if (endDateRef.current) {
                  endDateRef.current.disabled = false
                }
              }
            }
          },
        })
      }

      // Date de fin
      if (endDateRef.current && !endPickerRef.current) {
        endPickerRef.current = flatpickr(endDateRef.current, {
          locale: French,
          dateFormat: "d/m/Y",
          minDate: "today",
          allowInput: false,
          clickOpens: true,
          mode: "single",
          inline: false,
          static: false,
          position: "auto",
          disableMobile: false,
          onChange: (selectedDates) => {
            if (selectedDates.length > 0) {
              const date = selectedDates[0].toISOString().split("T")[0]
              setEndDate(date)
            }
          },
        })
      }
    }

    // Délai pour s'assurer que le DOM est prêt
    const timer = setTimeout(initPickers, 150)

    return () => {
      clearTimeout(timer)
      if (startPickerRef.current) {
        startPickerRef.current.destroy()
        startPickerRef.current = null
      }
      if (endPickerRef.current) {
        endPickerRef.current.destroy()
        endPickerRef.current = null
      }
    }
  }, [])

  // Calculate days and price when dates change
  useEffect(() => {
    if (startDate && endDate) {
      const start = new Date(startDate)
      const end = new Date(endDate)
      const diffTime = Math.abs(end.getTime() - start.getTime())
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

      setDays(diffDays)
      setTotalPrice(diffDays * pricePerDay)

      // Check availability
      checkAvailability(startDate, endDate)
    } else {
      setDays(0)
      setTotalPrice(0)
      setIsAvailable(null)
    }
  }, [startDate, endDate, dressId, pricePerDay])

  const checkAvailability = async (start: string, end: string) => {
    setIsChecking(true)
    try {
      // Convertir les dates au format ISO avec heure (midi UTC) pour éviter les décalages
      const startISO = `${start}T12:00:00.000Z`
      const endISO = `${end}T12:00:00.000Z`

      const result = await checkDressAvailability(dressId, startISO, endISO)
      setIsAvailable(result.isAvailable)

      if (result.isAvailable) {
        onDatesSelected(start, end, days, totalPrice)
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
              ref={startDateRef}
              type="text"
              placeholder="JJ/MM/AAAA"
              className="w-full px-4 py-3 text-sm border border-pronovias-border focus:outline-none focus:border-pronovias-black transition-colors duration-250 cursor-pointer bg-pronovias-white"
            />
          </div>

          {/* Date de fin */}
          <div>
            <label className="block text-xs uppercase tracking-widest text-pronovias-black font-medium mb-3">
              Date de fin
            </label>
            <input
              ref={endDateRef}
              type="text"
              placeholder="JJ/MM/AAAA"
              disabled={!startDate}
              className="w-full px-4 py-3 text-sm border border-pronovias-border focus:outline-none focus:border-pronovias-black transition-colors duration-250 cursor-pointer bg-pronovias-white disabled:bg-pronovias-gray-50 disabled:cursor-not-allowed"
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

      {/* Styles globaux pour Flatpickr - Style Pronovias */}
      <style jsx global>{`
        /* Calendrier principal */
        .flatpickr-calendar {
          background: white !important;
          border: 1px solid #e5e7eb !important;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06) !important;
          padding: 0 !important;
          font-family: inherit !important;
          z-index: 99999 !important;
        }

        .flatpickr-calendar.open {
          z-index: 99999 !important;
        }

        /* En-tête du mois */
        .flatpickr-months {
          background: transparent !important;
          padding: 16px !important;
          border-bottom: 1px solid #e5e7eb !important;
        }

        .flatpickr-current-month {
          font-size: 14px !important;
          font-weight: 500 !important;
          color: #000 !important;
          text-transform: uppercase !important;
          letter-spacing: 0.05em !important;
        }

        .flatpickr-current-month .flatpickr-monthDropdown-months {
          background: transparent !important;
          font-weight: 500 !important;
          color: #000 !important;
          padding: 4px 8px !important;
        }

        .flatpickr-current-month .flatpickr-monthDropdown-months:hover {
          background: #f9fafb !important;
        }

        /* Boutons navigation */
        .flatpickr-prev-month,
        .flatpickr-next-month {
          padding: 8px !important;
          transition: all 0.2s !important;
        }

        .flatpickr-prev-month:hover,
        .flatpickr-next-month:hover {
          background: #f9fafb !important;
        }

        .flatpickr-prev-month:hover svg,
        .flatpickr-next-month:hover svg {
          fill: #000 !important;
        }

        /* Jours de la semaine */
        .flatpickr-weekdays {
          background: transparent !important;
          padding: 12px 0 !important;
          margin-bottom: 8px !important;
        }

        .flatpickr-weekday {
          color: #6b7280 !important;
          font-weight: 500 !important;
          font-size: 11px !important;
          text-transform: uppercase !important;
          letter-spacing: 0.1em !important;
        }

        /* Conteneur des jours */
        .flatpickr-days {
          padding: 0 16px 16px !important;
        }

        .dayContainer {
          padding: 0 !important;
          gap: 2px !important;
        }

        /* Jours individuels */
        .flatpickr-day {
          color: #111827 !important;
          font-weight: 400 !important;
          border: 1px solid transparent !important;
          height: 40px !important;
          line-height: 38px !important;
          max-width: 40px !important;
          transition: all 0.15s !important;
        }

        .flatpickr-day:hover:not(.flatpickr-disabled):not(.selected) {
          background: #f9fafb !important;
          border-color: #e5e7eb !important;
          color: #000 !important;
        }

        /* Jour sélectionné */
        .flatpickr-day.selected {
          background: #000 !important;
          border-color: #000 !important;
          color: white !important;
          font-weight: 500 !important;
        }

        .flatpickr-day.selected:hover {
          background: #000 !important;
          border-color: #000 !important;
        }

        /* Jour actuel (aujourd'hui) */
        .flatpickr-day.today:not(.selected) {
          border-color: #000 !important;
          color: #000 !important;
          font-weight: 500 !important;
          background: transparent !important;
        }

        .flatpickr-day.today:hover:not(.selected) {
          background: #f9fafb !important;
          border-color: #000 !important;
        }

        /* Jours désactivés */
        .flatpickr-day.flatpickr-disabled {
          color: #d1d5db !important;
          background: transparent !important;
        }

        .flatpickr-day.flatpickr-disabled:hover {
          background: transparent !important;
          border-color: transparent !important;
          cursor: not-allowed !important;
        }

        /* Styles responsive mobile */
        @media (max-width: 768px) {
          .flatpickr-calendar {
            width: 95vw !important;
            max-width: 360px !important;
          }

          .flatpickr-day {
            height: 42px !important;
            line-height: 40px !important;
            max-width: 42px !important;
          }
        }
      `}</style>
    </div>
  )
}
