"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useCart } from "@/context/CartContext"
import type { Dress } from "@/lib/api"
import RentalDatePickerPronovias from "./RentalDatePickerPronovias"
import ButtonPronovias from "./ButtonPronovias"

interface DressRentalFormPronoviasProps {
  dress: Dress
}

export default function DressRentalFormPronovias({ dress }: DressRentalFormPronoviasProps) {
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
      <RentalDatePickerPronovias
        dressId={dress.id}
        pricePerDay={pricePerDay}
        onDatesSelected={handleDatesSelected}
      />

      {/* CTA Buttons - Style Pronovias */}
      <div className="space-y-3 pt-6 border-t border-pronovias-border">
        <ButtonPronovias
          variant="primary"
          size="large"
          fullWidth
          onClick={handleAddToCart}
          disabled={!rentalDates || isAdding}
        >
          {isAdding ? (
            <>
              <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <span>Ajout en cours...</span>
            </>
          ) : (
            "Ajouter au panier"
          )}
        </ButtonPronovias>

        {!rentalDates && (
          <p className="text-center text-xs text-pronovias-text-secondary">
            Sélectionnez des dates pour ajouter au panier
          </p>
        )}
      </div>
    </div>
  )
}
