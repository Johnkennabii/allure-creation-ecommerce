"use client"

import Image from "next/image"
import Link from "next/link"
import { useState } from "react"

export interface ProductCardPronoviasProps {
  id: string
  name: string
  type?: string
  description?: string
  price?: number
  images: string[]
  href: string
  isNew?: boolean
}

export default function ProductCardPronovias({
  id,
  name,
  type,
  description,
  price,
  images,
  href,
  isNew = false,
}: ProductCardPronoviasProps) {
  const [currentImage, setCurrentImage] = useState(0)
  const hasMultipleImages = images && images.length > 1

  const nextImage = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setCurrentImage((prev) => (prev + 1) % images.length)
  }

  const prevImage = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setCurrentImage((prev) => (prev - 1 + images.length) % images.length)
  }

  return (
    <div className="group">
      {/* Top Section: Name + Wishlist */}
      <div className="flex items-start justify-between mb-3">
        <Link href={href} className="flex-1">
          <h3 className="text-sm font-medium uppercase tracking-wide text-pronovias-black hover:opacity-70 transition-opacity duration-250">
            {name}
          </h3>
        </Link>

        {/* Wishlist button */}
        <button
          className="ml-2 p-1 hover:opacity-70 transition-opacity duration-250"
          aria-label={`Add ${name} to wishlist`}
          onClick={(e) => {
            e.preventDefault()
            // TODO: Implement wishlist functionality
          }}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
          </svg>
        </button>
      </div>

      {/* Badge NEW IN */}
      {isNew && (
        <div className="mb-3">
          <span className="inline-block px-3 py-1 text-xs uppercase tracking-wider font-medium bg-pronovias-gray-200 text-pronovias-black">
            New In
          </span>
        </div>
      )}

      {/* Image Gallery */}
      <Link href={href} className="block relative">
        <div className="relative w-full aspect-[3/4] bg-pronovias-gray-50 overflow-hidden mb-4">
          {images && images.length > 0 ? (
            <>
              <Image
                src={images[currentImage]}
                alt={name}
                fill
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                className="object-cover"
              />

              {/* Navigation arrows - visible on hover if multiple images */}
              {hasMultipleImages && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center bg-pronovias-white/90 opacity-0 group-hover:opacity-100 transition-opacity duration-250"
                    aria-label="Previous image"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center bg-pronovias-white/90 opacity-0 group-hover:opacity-100 transition-opacity duration-250"
                    aria-label="Next image"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </>
              )}
            </>
          ) : (
            <div className="flex items-center justify-center h-full text-pronovias-text-light">
              <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
          )}
        </div>
      </Link>

      {/* Bottom Section: Description + Price */}
      <div className="space-y-2">
        {/* Description */}
        {description && (
          <p className="text-xs font-light text-pronovias-text-secondary leading-relaxed line-clamp-2">
            {description}
          </p>
        )}

        {/* Price */}
        {price && (
          <div>
            <p className="text-base font-normal text-pronovias-black">
              {new Intl.NumberFormat("fr-FR", {
                style: "currency",
                currency: "EUR",
              }).format(price)}
            </p>
            <p className="text-xs text-pronovias-text-secondary mt-1">À partir de</p>
          </div>
        )}
      </div>
    </div>
  )
}
