"use client"

import React, { createContext, useContext, useState, useEffect } from "react"
import type { Dress } from "@/lib/api"

export interface CartItem {
  dress: Dress
  type: "buy" | "rent"
  rentalDates?: {
    startDate: string // ISO date string
    endDate: string   // ISO date string
    days: number      // Nombre de jours
  }
}

interface CartContextType {
  items: CartItem[]
  addItem: (item: CartItem) => void
  removeItem: (dressId: string) => void
  clearCart: () => void
  itemCount: number
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem("allure-cart")
    if (savedCart) {
      try {
        setItems(JSON.parse(savedCart))
      } catch (error) {
        console.error("Error loading cart:", error)
      }
    }
  }, [])

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("allure-cart", JSON.stringify(items))
  }, [items])

  const addItem = (item: CartItem) => {
    setItems((current) => {
      // Check if item already exists
      const existingIndex = current.findIndex(
        (i) => i.dress.id === item.dress.id && i.type === item.type
      )

      if (existingIndex >= 0) {
        // Update existing item
        const updated = [...current]
        updated[existingIndex] = item
        return updated
      }

      // Add new item
      return [...current, item]
    })
  }

  const removeItem = (dressId: string) => {
    setItems((current) => current.filter((item) => item.dress.id !== dressId))
  }

  const clearCart = () => {
    setItems([])
  }

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        clearCart,
        itemCount: items.length,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error("useCart must be used within CartProvider")
  }
  return context
}
