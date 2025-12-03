"use client"

import Link from "next/link"
import { useState, useEffect } from "react"
import { usePathname } from "next/navigation"
import { useCart } from "@/context/CartContext"
import { getDressTypes } from "@/lib/api"

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [dressTypes, setDressTypes] = useState<Array<{ id: string; name: string }>>([])
  const [isScrolled, setIsScrolled] = useState(false)
  const { itemCount } = useCart()

  // Charger les types de robes au montage
  useEffect(() => {
    getDressTypes().then(setDressTypes)
  }, [])

  // Détecter le scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Fermer le menu mobile au scroll
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }
    return () => {
      document.body.style.overflow = "unset"
    }
  }, [mobileMenuOpen])

  return (
    <>
      <header
        className={`sticky top-0 z-50 bg-white transition-all duration-300 ${
          isScrolled ? "shadow-sm" : ""
        }`}
      >
        <div className="max-w-[1920px] mx-auto">
          {/* Top bar - Desktop uniquement */}
          <div className="hidden lg:block border-b border-gray-100">
            <div className="px-8 py-3 flex justify-end items-center gap-6 text-xs uppercase tracking-wider">
              <Link href="/aide" className="text-gray-700 hover:text-black transition-colors">
                Aide
              </Link>
              <Link href="/contact" className="text-gray-700 hover:text-black transition-colors">
                Contact
              </Link>
            </div>
          </div>

          {/* Main header */}
          <div className="px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16 lg:h-20 relative">
              {/* Mobile menu button */}
              <button
                onClick={() => setMobileMenuOpen(true)}
                className="lg:hidden p-2 hover:opacity-70 transition-opacity"
                aria-label="Menu"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>

              {/* Logo mobile centré */}
              <div className="lg:hidden flex-1 flex justify-center">
                <Link href="/" className="inline-block">
                  <h1 className="font-heading font-light uppercase tracking-[0.25em] text-base">
                    ALLURE CRÉATION
                  </h1>
                </Link>
              </div>

              {/* Cart button mobile */}
              <Link
                href="/checkout"
                className="lg:hidden relative p-2 hover:opacity-70 transition-opacity"
                aria-label="Panier"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
                {itemCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-black text-white text-xs w-4 h-4 rounded-full flex items-center justify-center font-medium">
                    {itemCount}
                  </span>
                )}
              </Link>

              {/* Logo Desktop - Centré */}
              <Link
                href="/"
                className="hidden lg:absolute lg:left-1/2 lg:-translate-x-1/2 lg:flex items-center"
              >
                <h1 className="text-xl font-heading font-light uppercase tracking-[0.3em]">
                  ALLURE CRÉATION
                </h1>
              </Link>

              {/* Navigation Desktop - Gauche */}
              <nav className="hidden lg:flex items-center gap-8">
                <Link
                  href="/robes"
                  className="text-xs uppercase tracking-widest font-medium text-gray-900 hover:text-gray-600 transition-colors"
                >
                  Robes
                </Link>
                {dressTypes.slice(0, 3).map((type) => (
                  <Link
                    key={type.id}
                    href={`/robes?type=${encodeURIComponent(type.name)}`}
                    className="text-xs uppercase tracking-widest font-medium text-gray-900 hover:text-gray-600 transition-colors"
                  >
                    {type.name}
                  </Link>
                ))}
                <Link
                  href="/a-propos"
                  className="text-xs uppercase tracking-widest font-medium text-gray-900 hover:text-gray-600 transition-colors"
                >
                  À propos
                </Link>
              </nav>

              {/* Actions Desktop - Droite */}
              <div className="hidden lg:flex items-center gap-6 ml-auto">
                <button
                  className="p-1.5 hover:opacity-70 transition-opacity"
                  aria-label="Recherche"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </button>

                <button
                  className="p-1.5 hover:opacity-70 transition-opacity"
                  aria-label="Compte"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </button>

                <Link
                  href="/checkout"
                  className="p-1.5 hover:opacity-70 transition-opacity relative"
                  aria-label="Panier"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                  </svg>
                  {itemCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-black text-white text-xs w-4 h-4 rounded-full flex items-center justify-center font-medium">
                      {itemCount}
                    </span>
                  )}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Menu mobile plein écran type App Native */}
      <div
        className={`lg:hidden fixed inset-0 z-[60] transform transition-all duration-500 ease-out ${
          mobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Fond avec blur */}
        <div
          className={`absolute inset-0 bg-black/40 backdrop-blur-md transition-opacity duration-500 ${
            mobileMenuOpen ? "opacity-100" : "opacity-0"
          }`}
          onClick={() => setMobileMenuOpen(false)}
        />

        {/* Panneau de menu avec effet glass */}
        <div className={`absolute right-0 top-0 bottom-0 w-80 max-w-[85vw] glass-menu shadow-2xl transform transition-transform duration-500 ease-out ${
          mobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}>
          {/* Header du menu */}
          <div className="flex items-center justify-between p-6 border-b border-white/20">
            <h2 className="text-xl font-heading font-bold uppercase tracking-wider">Menu</h2>
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="p-2.5 rounded-xl bg-white/50 hover:bg-white/80 active:scale-90 transition-all duration-300 shadow-sm"
              aria-label="Fermer"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Contenu du menu */}
          <nav className="flex flex-col p-6 space-y-2 overflow-y-auto h-[calc(100%-88px)]">
            {/* Lien Compte */}
            <Link
              href="/compte"
              className="menu-link flex items-center space-x-4 p-4 rounded-2xl bg-white/30 hover:bg-white/60 active:scale-98 transition-all duration-300 shadow-sm"
              onClick={() => setMobileMenuOpen(false)}
            >
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-accent/20 to-accent/10 flex items-center justify-center shadow-sm">
                <svg className="w-6 h-6 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <div>
                <p className="font-semibold text-gray-900">Mon Compte</p>
                <p className="text-xs text-gray-600">Connexion / Inscription</p>
              </div>
            </Link>

            <div className="border-t border-white/30 my-4" />

            {/* Categories de robes */}
            <div className="space-y-2">
              <p className="px-4 text-[10px] uppercase tracking-widest text-gray-600 font-bold">Collections</p>
              <Link
                href="/robes"
                className="menu-link flex items-center justify-between p-3.5 rounded-xl bg-white/20 hover:bg-white/40 active:scale-98 transition-all duration-300"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className="font-semibold text-sm">Toutes les Robes</span>
                <svg className="w-4 h-4 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
              {dressTypes.map((type) => (
                <Link
                  key={type.id}
                  href={`/robes?type=${encodeURIComponent(type.name)}`}
                  className="menu-link flex items-center justify-between p-3.5 rounded-xl bg-white/20 hover:bg-white/40 active:scale-98 transition-all duration-300"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <span className="font-semibold text-sm">{type.name}</span>
                  <svg className="w-4 h-4 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              ))}
            </div>

            <div className="border-t border-white/30 my-4" />

            {/* Liens principaux */}
            <div className="space-y-2">
              <p className="px-4 text-[10px] uppercase tracking-widest text-gray-600 font-bold">Informations</p>
              <Link
                href="/a-propos"
                className="menu-link flex items-center justify-between p-3.5 rounded-xl bg-white/20 hover:bg-white/40 active:scale-98 transition-all duration-300"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className="font-semibold text-sm">À Propos</span>
                <svg className="w-4 h-4 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
              <Link
                href="/faq"
                className="menu-link flex items-center justify-between p-3.5 rounded-xl bg-white/20 hover:bg-white/40 active:scale-98 transition-all duration-300"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className="font-semibold text-sm">FAQ</span>
                <svg className="w-4 h-4 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
              <Link
                href="/cgv"
                className="menu-link flex items-center justify-between p-3.5 rounded-xl bg-white/20 hover:bg-white/40 active:scale-98 transition-all duration-300"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className="font-semibold text-sm">CGV</span>
                <svg className="w-4 h-4 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </nav>
        </div>
      </div>
    </>
  )
}
