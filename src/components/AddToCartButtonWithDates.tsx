"use client"

import { useState } from "react"
import { useCart } from "@/context/CartContext"
import type { Dress } from "@/lib/api"
import DateRangePicker from "./DateRangePicker"

interface AddToCartButtonWithDatesProps {
  dress: Dress
}

export default function AddToCartButtonWithDates({
  dress,
}: AddToCartButtonWithDatesProps) {
  const [isAdded, setIsAdded] = useState(false)
  const [rentalDates, setRentalDates] = useState<{
    startDate: string
    endDate: string
    days: number
  } | null>(null)
  const { addItem } = useCart()

  const handleDatesSelected = (startDate: string, endDate: string, days: number) => {
    setRentalDates({ startDate, endDate, days })
  }

  const handleAddToCart = () => {
    if (!rentalDates) return

    addItem({
      dress,
      type: "rent",
      rentalDates,
    })

    setIsAdded(true)
    setTimeout(() => setIsAdded(false), 2000)
  }

  // Calculer le prix total si des dates sont sélectionnées
  const totalPrice = rentalDates
    ? (parseFloat(dress.price_per_day_ttc) * rentalDates.days).toFixed(2)
    : null

  return (
    <div className="space-y-6">
      {/* Date Range Picker */}
      <DateRangePicker
        dressId={dress.id}
        onDatesSelected={handleDatesSelected}
      />

      {/* Prix total de la location */}
      {totalPrice && rentalDates && (
        <div className="bg-[#D4AF37]/10 border border-[#D4AF37]/30 p-5 rounded-lg">
          <div className="flex justify-between items-center">
            <div>
              <span className="text-sm font-medium text-gray-700">Prix de la location</span>
              <p className="text-xs text-gray-500 mt-1">
                {rentalDates.days} jour{rentalDates.days > 1 ? "s" : ""} × {parseFloat(dress.price_per_day_ttc).toFixed(2)} €/jour
              </p>
            </div>
            <div className="text-right">
              <span className="text-3xl font-bold text-[#D4AF37]">{totalPrice} €</span>
              <p className="text-xs text-gray-600 mt-1">TTC</p>
            </div>
          </div>
        </div>
      )}

      {/* Add to Cart Button */}
      <button
        onClick={handleAddToCart}
        className="w-full btn-secondary"
        disabled={!rentalDates || isAdded}
      >
        {isAdded ? "✓ Ajouté au panier" : "Louer cette robe"}
      </button>

      {!rentalDates && (
        <p className="text-sm text-gray-500 text-center">
          Veuillez sélectionner des dates disponibles pour continuer
        </p>
      )}
    </div>
  )
}
