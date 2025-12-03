"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useCart } from "@/context/CartContext"

export default function MobileBottomNav() {
  const pathname = usePathname()
  const { itemCount } = useCart()

  // Animation d'entrée pour la navbar
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setTimeout(() => setIsVisible(true), 100)
  }, [])

  const navItems = [
    {
      href: "/",
      label: "Accueil",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
      ),
    },
    {
      href: "/robes",
      label: "Robes",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h8m-8 0h8m0 0a4 4 0 004-4V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v12a4 4 0 004 4z" />
        </svg>
      ),
    },
    {
      href: "/checkout",
      label: "Panier",
      badge: itemCount,
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
        </svg>
      ),
    },
    {
      href: "/contact",
      label: "Contact",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
    },
    {
      href: "/compte",
      label: "Compte",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      ),
    },
  ]

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-50 px-6 pb-4 safe-area-bottom pointer-events-none">
      <div className={`pointer-events-auto glass-navbar-compact mx-auto max-w-xs rounded-full px-4 py-2 shadow-glass-heavy transition-all duration-700 ${
        isVisible ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-20 opacity-0 scale-95'
      }`}>
        <div className="flex items-center justify-between gap-2">
          {navItems.map((item) => {
            const isActive = pathname === item.href || (item.href !== "/" && pathname?.startsWith(item.href))

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`nav-item-compact flex items-center justify-center w-12 h-12 rounded-full transition-all duration-300 relative ${
                  isActive
                    ? "text-accent bg-white shadow-sm scale-110"
                    : "text-gray-500 hover:bg-white/40 active:scale-90"
                }`}
              >
                {/* Badge pour le panier */}
                {item.badge && item.badge > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 bg-gradient-to-br from-accent to-accent/80 text-white text-[10px] min-w-[18px] h-[18px] px-1 rounded-full flex items-center justify-center font-bold shadow-md animate-bounce-subtle ring-2 ring-white">
                    {item.badge}
                  </span>
                )}

                {/* Icône avec effet de scale */}
                <div className={`nav-icon transition-all duration-300 ${isActive ? "scale-105" : "scale-90"}`}>
                  {item.icon}
                </div>

                {/* Indicateur actif minimaliste */}
                {isActive && (
                  <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-accent rounded-full shadow-glow-accent" />
                )}
              </Link>
            )
          })}
        </div>
      </div>
    </nav>
  )
}
