"use client"

import Link from "next/link"
import { useState, useEffect } from "react"
import { useCart } from "@/context/CartContext"
import { getDressTypes } from "@/lib/api"

export default function HeaderPronovias() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [dressTypes, setDressTypes] = useState<Array<{ id: string; name: string }>>([])
  const [isScrolled, setIsScrolled] = useState(false)
  const { itemCount } = useCart()

  // Charger les types de robes
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

  // Gérer le scroll du body quand le menu est ouvert
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
      <header className={`fixed top-0 left-0 right-0 z-50 bg-pronovias-white transition-all duration-300 ${isScrolled ? 'shadow-sm' : ''}`}>
        {/* Top Bar - Desktop uniquement - Visible uniquement après scroll */}
        <div className={`hidden lg:block border-b border-pronovias-border-light overflow-hidden transition-all duration-300 ${isScrolled ? 'max-h-[40px] opacity-100' : 'max-h-0 opacity-0'}`}>
          <div className="container-pronovias">
            <div className="h-topbar flex items-center justify-end gap-6">
              <Link
                href="/aide"
                className="text-xs uppercase tracking-extra-wide text-pronovias-text-secondary hover:text-pronovias-black transition-colors duration-250"
              >
                Aide
              </Link>
              <Link
                href="/contact"
                className="text-xs uppercase tracking-extra-wide text-pronovias-text-secondary hover:text-pronovias-black transition-colors duration-250"
              >
                Contact
              </Link>
              <Link
                href="/faq"
                className="text-xs uppercase tracking-extra-wide text-pronovias-text-secondary hover:text-pronovias-black transition-colors duration-250"
              >
                FAQ
              </Link>
            </div>
          </div>
        </div>

        {/* Main Header */}
        <div className="border-b border-pronovias-border-light">
          <div className="container-pronovias">
            <div className={`h-header-mobile flex items-center justify-between relative transition-all duration-300 ${
              isScrolled ? 'lg:h-header' : 'lg:h-[140px]'
            }`}>

              {/* Logo - Centré (Mobile) / Dynamique (Desktop) */}
              <div className={`transition-all duration-300 flex items-center ${
                isScrolled
                  ? 'absolute left-1/2 -translate-x-1/2 lg:relative lg:left-0 lg:translate-x-0 z-0'
                  : 'absolute left-1/2 -translate-x-1/2 lg:w-full lg:left-0 lg:translate-x-0 lg:justify-center z-10'
              }`}>
                <Link href="/" className="block">
                  <h1 className={`font-bold uppercase tracking-extra-wide text-pronovias-black transition-all duration-300 whitespace-nowrap ${
                    isScrolled ? 'text-lg lg:text-xl' : 'text-xl lg:text-5xl'
                  }`}>
                    Allure Création
                  </h1>
                </Link>
              </div>

              {/* Navigation Desktop */}
              <nav className={`hidden lg:flex items-center gap-8 transition-all duration-300 ${
                isScrolled ? 'mx-auto opacity-100' : 'mx-auto opacity-0 invisible'
              }`}>
                <Link
                  href="/robes"
                  className="text-xs uppercase tracking-widest font-medium text-pronovias-black hover:opacity-70 transition-opacity duration-250"
                >
                  Robes
                </Link>
                {dressTypes.slice(0, 4).map((type) => (
                  <Link
                    key={type.id}
                    href={`/robes?type=${encodeURIComponent(type.name)}`}
                    className="text-xs uppercase tracking-widest font-medium text-pronovias-black hover:opacity-70 transition-opacity duration-250"
                  >
                    {type.name}
                  </Link>
                ))}
                <Link
                  href="/a-propos"
                  className="text-xs uppercase tracking-widest font-medium text-pronovias-black hover:opacity-70 transition-opacity duration-250"
                >
                  À Propos
                </Link>
                <Link
                  href="/contact"
                  className="text-xs uppercase tracking-widest font-medium text-pronovias-black hover:opacity-70 transition-opacity duration-250"
                >
                  Contact
                </Link>
              </nav>

              {/* Actions Desktop */}
              <div className={`hidden lg:flex items-center gap-6 transition-all duration-300 ${
                isScrolled ? 'opacity-100' : 'opacity-0 invisible'
              }`}>
                <button
                  className="p-2 hover:opacity-70 transition-opacity duration-250"
                  aria-label="Recherche"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </button>

                <Link
                  href="/compte"
                  className="p-2 hover:opacity-70 transition-opacity duration-250"
                  aria-label="Mon compte"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </Link>

                <Link
                  href="/checkout"
                  className="relative p-2 hover:opacity-70 transition-opacity duration-250"
                  aria-label="Panier"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                  </svg>
                  {itemCount > 0 && (
                    <span className="absolute -top-1 -right-1 w-4 h-4 bg-pronovias-black text-pronovias-white text-xs font-medium rounded-full flex items-center justify-center">
                      {itemCount}
                    </span>
                  )}
                </Link>
              </div>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setMobileMenuOpen(true)}
                className="lg:hidden p-2 hover:opacity-70 transition-opacity duration-250"
                aria-label="Menu"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>

              {/* Cart Mobile */}
              <Link
                href="/checkout"
                className="lg:hidden relative p-2 hover:opacity-70 transition-opacity duration-250"
                aria-label="Panier"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
                {itemCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-pronovias-black text-pronovias-white text-xs font-medium rounded-full flex items-center justify-center">
                    {itemCount}
                  </span>
                )}
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 z-[60] lg:hidden transition-opacity duration-300 ${
          mobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        {/* Overlay */}
        <div
          className="absolute inset-0 bg-black/40"
          onClick={() => setMobileMenuOpen(false)}
        />

        {/* Menu Panel */}
        <div
          className={`absolute top-0 left-0 bottom-0 w-80 max-w-[85vw] bg-pronovias-white transform transition-transform duration-300 ${
            mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          {/* Header du menu */}
          <div className="flex items-center justify-between p-6 border-b border-pronovias-border">
            <h2 className="text-lg font-light uppercase tracking-wider">Menu</h2>
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 hover:opacity-70 transition-opacity"
              aria-label="Fermer"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex flex-col p-6 overflow-y-auto h-[calc(100%-88px)]">
            {/* Compte */}
            <Link
              href="/compte"
              className="flex items-center justify-between py-4 border-b border-pronovias-border hover:opacity-70 transition-opacity"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="text-sm uppercase tracking-wide font-medium">Mon Compte</span>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </Link>

            {/* Robes */}
            <div className="py-6 space-y-4">
              <p className="text-xs uppercase tracking-widest text-pronovias-text-secondary font-medium mb-4">
                Collections
              </p>
              <Link
                href="/robes"
                className="flex items-center justify-between py-3 hover:opacity-70 transition-opacity"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className="text-sm font-light">Toutes les Robes</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </Link>
              {dressTypes.map((type) => (
                <Link
                  key={type.id}
                  href={`/robes?type=${encodeURIComponent(type.name)}`}
                  className="flex items-center justify-between py-3 hover:opacity-70 transition-opacity"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <span className="text-sm font-light">{type.name}</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              ))}
            </div>

            {/* Liens */}
            <div className="py-6 space-y-4 border-t border-pronovias-border">
              <p className="text-xs uppercase tracking-widest text-pronovias-text-secondary font-medium mb-4">
                Informations
              </p>
              <Link
                href="/a-propos"
                className="flex items-center justify-between py-3 hover:opacity-70 transition-opacity"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className="text-sm font-light">À Propos</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </Link>
              <Link
                href="/contact"
                className="flex items-center justify-between py-3 hover:opacity-70 transition-opacity"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className="text-sm font-light">Contact</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </Link>
              <Link
                href="/faq"
                className="flex items-center justify-between py-3 hover:opacity-70 transition-opacity"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className="text-sm font-light">FAQ</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </Link>
              <Link
                href="/cgv"
                className="flex items-center justify-between py-3 hover:opacity-70 transition-opacity"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className="text-sm font-light">CGV</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </nav>
        </div>
      </div>

      {/* Spacer pour compenser le header fixe */}
      <div className="h-header-mobile lg:h-[140px]" />
    </>
  )
}
