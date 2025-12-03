"use client"

import { useState } from "react"
import { useCart } from "@/context/CartContext"
import type { Dress } from "@/lib/api"

interface AddToCartButtonProps {
  dress: Dress
  variant: "buy" | "rent"
}

export default function AddToCartButton({
  dress,
  variant,
}: AddToCartButtonProps) {
  const [isAdded, setIsAdded] = useState(false)
  const { addItem } = useCart()

  const handleAddToCart = () => {
    addItem({
      dress,
      type: variant,
    })

    setIsAdded(true)
    setTimeout(() => setIsAdded(false), 2000)
  }

  if (variant === "buy") {
    return (
      <button
        onClick={handleAddToCart}
        className="w-full btn-primary"
        disabled={isAdded}
      >
        {isAdded ? "✓ Ajouté au panier" : "Acheter"}
      </button>
    )
  }

  return (
    <button
      onClick={handleAddToCart}
      className="w-full btn-secondary"
      disabled={isAdded}
    >
      {isAdded ? "✓ Ajouté au panier" : "Louer cette robe"}
    </button>
  )
}
