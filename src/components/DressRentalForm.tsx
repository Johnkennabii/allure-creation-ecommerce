"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useCart } from "@/context/CartContext"
import type { Dress } from "@/lib/api"
import RentalDatePicker from "./RentalDatePicker"
import Link from "next/link"

interface DressRentalFormProps {
  dress: Dress
}

export default function DressRentalForm({ dress }: DressRentalFormProps) {
  const router = useRouter()
  const { addItem } = useCart()
  const [rentalDates, setRentalDates] = useState<{
    startDate: string
    endDate: string
    days: number
    totalPrice: number
  } | null>(null)
  const [isAdding, setIsAdding] = useState(false)

  const pricePerDay = parseFloat(dress.price_per_day_ttc)

  const handleDatesSelected = (
    startDate: string,
    endDate: string,
    days: number,
    totalPrice: number
  ) => {
    setRentalDates({ startDate, endDate, days, totalPrice })
  }

  const handleAddToCart = () => {
    if (!rentalDates) return

    setIsAdding(true)

    try {
      addItem({
        dress,
        type: "rent",
        rentalDates: {
          startDate: rentalDates.startDate,
          endDate: rentalDates.endDate,
          days: rentalDates.days,
        },
      })

      // Redirect to checkout after a short delay
      setTimeout(() => {
        router.push("/checkout")
      }, 500)
    } catch (error) {
      console.error("Error adding to cart:", error)
      setIsAdding(false)
    }
  }

  return (
    <div className="space-y-6">
      {/* Date Picker */}
      <RentalDatePicker
        dressId={dress.id}
        pricePerDay={pricePerDay}
        onDatesSelected={handleDatesSelected}
      />

      {/* CTA Buttons */}
      <div className="sticky bottom-20 lg:bottom-0 space-y-3 pt-6 border-t-2 border-gray-100">
        <button
          onClick={handleAddToCart}
          disabled={!rentalDates || isAdding}
          className="w-full px-8 py-4 bg-gradient-to-r from-accent to-accent/90 text-white rounded-2xl font-bold text-lg shadow-xl hover:shadow-2xl hover:shadow-accent/40 active:scale-95 transition-all duration-200 flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-xl disabled:active:scale-100"
        >
          {isAdding ? (
            <>
              <svg className="w-6 h-6 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <span>Ajout en cours...</span>
            </>
          ) : (
            <>
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <span>Ajouter au panier</span>
            </>
          )}
        </button>

        <Link
          href="/contact"
          className="w-full px-8 py-4 bg-white text-gray-900 border-2 border-gray-200 rounded-2xl font-bold text-lg hover:border-accent hover:bg-accent/5 active:scale-95 transition-all duration-200 flex items-center justify-center gap-3"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          Prendre rendez-vous
        </Link>

        {!rentalDates && (
          <p className="text-center text-sm text-gray-500">
            Sélectionnez des dates pour ajouter au panier
          </p>
        )}
      </div>
    </div>
  )
}
