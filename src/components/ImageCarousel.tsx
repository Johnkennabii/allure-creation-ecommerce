"use client"

import Image from "next/image"
import { Swiper, SwiperSlide } from "swiper/react"
import { Pagination, Navigation } from "swiper/modules"
import "swiper/css"
import "swiper/css/pagination"
import "swiper/css/navigation"

interface ImageCarouselProps {
  images: string[]
  alt: string
  className?: string
}

export default function ImageCarousel({ images, alt, className = "" }: ImageCarouselProps) {
  // Si aucune image
  if (!images || images.length === 0) {
    return (
      <div className="flex items-center justify-center h-full text-gray-400">
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      </div>
    )
  }

  // Si une seule image, pas besoin de carousel
  if (images.length === 1) {
    return (
      <Image
        src={images[0]}
        alt={alt}
        fill
        className={`object-cover ${className}`}
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
      />
    )
  }

  return (
    <div className="relative w-full h-full swiper-container">
      <Swiper
        modules={[Pagination]}
        spaceBetween={0}
        slidesPerView={1}
        pagination={{
          clickable: true,
          bulletClass: "swiper-pagination-bullet-custom",
          bulletActiveClass: "swiper-pagination-bullet-active-custom",
        }}
        className="h-full w-full"
      >
        {images.map((image, index) => (
          <SwiperSlide key={index}>
            <div className="relative w-full h-full">
              <Image
                src={image}
                alt={`${alt} - Image ${index + 1}`}
                fill
                className={`object-cover ${className}`}
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                priority={index === 0}
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <style jsx global>{`
        .swiper-pagination-bullet-custom {
          width: 2px;
          height: 2px;
          background: rgba(255, 255, 255, 0.4);
          opacity: 1;
          margin: 0 2px !important;
          border-radius: 0;
          transition: all 0.2s;
        }

        .swiper-pagination-bullet-active-custom {
          width: 12px;
          height: 2px;
          background: rgba(255, 255, 255, 0.9);
        }

        .swiper-pagination {
          bottom: 6px !important;
        }
      `}</style>
    </div>
  )
}
