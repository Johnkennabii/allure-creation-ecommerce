"use client"

import { useState, useEffect, useRef } from "react"
import { checkDressAvailability } from "@/lib/api"
import flatpickr from "flatpickr"
import { French } from "flatpickr/dist/l10n/fr"
import "flatpickr/dist/flatpickr.min.css"
import type { Instance } from "flatpickr/dist/types/instance"

interface RentalDatePickerProps {
  dressId: string
  pricePerDay: number
  onDatesSelected: (startDate: string, endDate: string, days: number, totalPrice: number) => void
}

export default function RentalDatePicker({
  dressId,
  pricePerDay,
  onDatesSelected,
}: RentalDatePickerProps) {
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
      {/* Card principale avec design moderne */}
      <div className="bg-white rounded-3xl p-8 border-2 border-gray-100 shadow-lg shadow-gray-100/50">
        {/* En-tête */}
        <div className="flex items-center gap-3 mb-6 pb-6 border-b-2 border-gray-100">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-accent/10 to-accent/5 flex items-center justify-center">
            <svg className="w-7 h-7 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
          <div>
            <h3 className="text-2xl font-heading font-bold text-gray-900">
              Dates de location
            </h3>
            <p className="text-sm text-gray-500 mt-1">
              Sélectionnez vos dates pour vérifier la disponibilité
            </p>
          </div>
        </div>

        {/* Sélecteurs de dates */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* Date de début */}
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-3 uppercase tracking-wide">
              Date de début
            </label>
            <div className="relative group">
              <input
                ref={startDateRef}
                type="text"
                placeholder="JJ/MM/AAAA"
                className="w-full px-5 py-4 pl-14 border-2 border-gray-200 rounded-2xl focus:outline-none focus:border-accent focus:ring-4 focus:ring-accent/10 transition-all duration-300 cursor-pointer bg-white group-hover:border-gray-300 text-base font-medium"
              />
              <div className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none">
                <div className="w-8 h-8 rounded-xl bg-accent/10 flex items-center justify-center">
                  <svg className="w-5 h-5 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* Date de fin */}
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-3 uppercase tracking-wide">
              Date de fin
            </label>
            <div className="relative group">
              <input
                ref={endDateRef}
                type="text"
                placeholder="JJ/MM/AAAA"
                disabled={!startDate}
                className="w-full px-5 py-4 pl-14 border-2 border-gray-200 rounded-2xl focus:outline-none focus:border-accent focus:ring-4 focus:ring-accent/10 transition-all duration-300 cursor-pointer bg-white group-hover:border-gray-300 disabled:bg-gray-50 disabled:cursor-not-allowed disabled:group-hover:border-gray-200 text-base font-medium"
              />
              <div className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none">
                <div className="w-8 h-8 rounded-xl bg-accent/10 flex items-center justify-center">
                  <svg className="w-5 h-5 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Résumé de la location */}
        {days > 0 && (
          <div className="mt-6 p-6 bg-gradient-to-br from-gray-50 to-gray-100/50 rounded-2xl border-2 border-gray-100">
            <div className="grid grid-cols-2 gap-6">
              <div className="text-center">
                <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2">Durée</p>
                <p className="text-3xl font-bold text-gray-900">{days}</p>
                <p className="text-sm text-gray-600 mt-1">jour{days > 1 ? "s" : ""}</p>
              </div>
              <div className="text-center border-l-2 border-gray-200">
                <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2">Prix Total</p>
                <p className="text-3xl font-bold text-accent">{totalPrice.toFixed(0)}€</p>
                <p className="text-sm text-gray-600 mt-1">TTC</p>
              </div>
            </div>
          </div>
        )}

        {/* Statut de disponibilité */}
        {isChecking && (
          <div className="mt-6 flex items-center gap-4 px-6 py-4 bg-gradient-to-r from-blue-50 to-blue-100/50 border-2 border-blue-200 rounded-2xl">
            <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center flex-shrink-0">
              <svg className="w-6 h-6 text-blue-600 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            </div>
            <div>
              <p className="font-bold text-blue-900">Vérification en cours...</p>
              <p className="text-sm text-blue-700 mt-1">Nous vérifions la disponibilité de la robe</p>
            </div>
          </div>
        )}

        {!isChecking && isAvailable === true && days > 0 && (
          <div className="mt-6 flex items-start gap-4 px-6 py-4 bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200 rounded-2xl">
            <div className="w-10 h-10 rounded-xl bg-green-100 flex items-center justify-center flex-shrink-0">
              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <p className="font-bold text-green-900 text-lg">Disponible !</p>
              <p className="text-sm text-green-700 mt-1">Cette robe est disponible pour les dates sélectionnées. Vous pouvez procéder à la réservation.</p>
            </div>
          </div>
        )}

        {!isChecking && isAvailable === false && days > 0 && (
          <div className="mt-6 flex items-start gap-4 px-6 py-4 bg-gradient-to-r from-red-50 to-rose-50 border-2 border-red-200 rounded-2xl">
            <div className="w-10 h-10 rounded-xl bg-red-100 flex items-center justify-center flex-shrink-0">
              <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <p className="font-bold text-red-900 text-lg">Non disponible</p>
              <p className="text-sm text-red-700 mt-1">Cette robe n'est pas disponible pour les dates sélectionnées. Veuillez choisir d'autres dates ou nous contacter.</p>
            </div>
          </div>
        )}
      </div>

      {/* Styles globaux pour Flatpickr - Design moderne */}
      <style jsx global>{`
        /* Calendrier principal */
        .flatpickr-calendar {
          background: white !important;
          border-radius: 24px !important;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15), 0 0 0 1px rgba(0, 0, 0, 0.05) !important;
          border: none !important;
          padding: 8px !important;
          font-family: inherit !important;
          z-index: 99999 !important;
        }

        .flatpickr-calendar.open {
          z-index: 99999 !important;
        }

        /* En-tête du mois */
        .flatpickr-months {
          background: transparent !important;
          padding: 16px 12px 12px !important;
          border-radius: 20px 20px 0 0 !important;
        }

        .flatpickr-current-month {
          font-size: 18px !important;
          font-weight: 700 !important;
          color: #111827 !important;
          padding: 8px 0 !important;
        }

        .flatpickr-current-month .flatpickr-monthDropdown-months {
          background: transparent !important;
          font-weight: 700 !important;
          color: #111827 !important;
          border-radius: 12px !important;
          padding: 4px 8px !important;
        }

        .flatpickr-current-month .flatpickr-monthDropdown-months:hover {
          background: #f3f4f6 !important;
        }

        /* Boutons navigation */
        .flatpickr-prev-month,
        .flatpickr-next-month {
          padding: 8px !important;
          border-radius: 12px !important;
          transition: all 0.2s !important;
        }

        .flatpickr-prev-month:hover,
        .flatpickr-next-month:hover {
          background: #fae8ff !important;
        }

        .flatpickr-prev-month:hover svg,
        .flatpickr-next-month:hover svg {
          fill: #d946ef !important;
        }

        /* Jours de la semaine */
        .flatpickr-weekdays {
          background: transparent !important;
          padding: 8px 0 !important;
          margin-bottom: 4px !important;
        }

        .flatpickr-weekday {
          color: #6b7280 !important;
          font-weight: 700 !important;
          font-size: 13px !important;
          text-transform: uppercase !important;
        }

        /* Conteneur des jours */
        .flatpickr-days {
          padding: 0 !important;
        }

        .dayContainer {
          padding: 4px !important;
          gap: 4px !important;
        }

        /* Jours individuels */
        .flatpickr-day {
          border-radius: 12px !important;
          color: #374151 !important;
          font-weight: 600 !important;
          border: 2px solid transparent !important;
          height: 42px !important;
          line-height: 38px !important;
          max-width: 42px !important;
          transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1) !important;
        }

        .flatpickr-day:hover:not(.flatpickr-disabled):not(.selected) {
          background: #fae8ff !important;
          border-color: #f0abfc !important;
          color: #111827 !important;
          transform: scale(1.05) !important;
        }

        /* Jour sélectionné */
        .flatpickr-day.selected {
          background: linear-gradient(135deg, #d946ef 0%, #c026d3 100%) !important;
          border-color: #d946ef !important;
          color: white !important;
          font-weight: 700 !important;
          box-shadow: 0 4px 12px rgba(217, 70, 239, 0.3) !important;
          transform: scale(1.08) !important;
        }

        .flatpickr-day.selected:hover {
          background: linear-gradient(135deg, #c026d3 0%, #a21caf 100%) !important;
          border-color: #c026d3 !important;
        }

        /* Jour actuel (aujourd'hui) */
        .flatpickr-day.today:not(.selected) {
          border-color: #d946ef !important;
          color: #d946ef !important;
          font-weight: 700 !important;
          background: #fdf4ff !important;
        }

        .flatpickr-day.today:hover:not(.selected) {
          background: #fae8ff !important;
          border-color: #d946ef !important;
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
          transform: none !important;
        }

        /* Styles responsive mobile */
        @media (max-width: 768px) {
          .flatpickr-calendar {
            width: 95vw !important;
            max-width: 360px !important;
          }

          .flatpickr-day {
            height: 44px !important;
            line-height: 40px !important;
            max-width: 44px !important;
            font-size: 15px !important;
          }

          .flatpickr-current-month {
            font-size: 20px !important;
          }
        }
      `}</style>
    </div>
  )
}
