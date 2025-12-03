"use client"

import Image from "next/image"
import { useState } from "react"

interface ImageGalleryPronoviasProps {
  images: string[]
  alt: string
}

export default function ImageGalleryPronovias({ images, alt }: ImageGalleryPronoviasProps) {
  const [selectedImage, setSelectedImage] = useState(0)

  // Si aucune image
  if (!images || images.length === 0) {
    return (
      <div className="flex items-center justify-center h-full bg-pronovias-gray-50 text-pronovias-text-light">
        <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      </div>
    )
  }

  return (
    <div className="flex flex-col lg:flex-row gap-4">
      {/* Thumbnails - Vertical sur desktop, horizontal sur mobile */}
      {images.length > 1 && (
        <div className="order-2 lg:order-1 flex lg:flex-col gap-3 overflow-x-auto lg:overflow-y-auto lg:max-h-[600px] scrollbar-thin">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => setSelectedImage(index)}
              className={`relative flex-shrink-0 w-20 h-24 lg:w-24 lg:h-32 border transition-all duration-250 ${
                selectedImage === index
                  ? 'border-pronovias-black'
                  : 'border-pronovias-border hover:border-pronovias-black/50'
              }`}
            >
              <Image
                src={image}
                alt={`${alt} - Miniature ${index + 1}`}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 80px, 96px"
              />
            </button>
          ))}
        </div>
      )}

      {/* Image principale */}
      <div className="order-1 lg:order-2 flex-1 relative aspect-[3/4] bg-pronovias-gray-50">
        <Image
          src={images[selectedImage]}
          alt={`${alt} - Image ${selectedImage + 1}`}
          fill
          className="object-cover"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 50vw"
          priority={selectedImage === 0}
        />

        {/* Navigation arrows - Desktop only */}
        {images.length > 1 && (
          <>
            <button
              onClick={() => setSelectedImage((prev) => (prev === 0 ? images.length - 1 : prev - 1))}
              className="hidden lg:flex absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 items-center justify-center bg-pronovias-white/90 hover:bg-pronovias-white transition-all duration-250 opacity-0 hover:opacity-100 group-hover:opacity-100"
              aria-label="Image précédente"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={() => setSelectedImage((prev) => (prev === images.length - 1 ? 0 : prev + 1))}
              className="hidden lg:flex absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 items-center justify-center bg-pronovias-white/90 hover:bg-pronovias-white transition-all duration-250 opacity-0 hover:opacity-100 group-hover:opacity-100"
              aria-label="Image suivante"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </>
        )}
      </div>
    </div>
  )
}
