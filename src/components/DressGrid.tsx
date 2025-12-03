"use client"

import Link from "next/link"
import Image from "next/image"
import { Swiper, SwiperSlide } from "swiper/react"
import { Navigation, Pagination } from "swiper/modules"
import type { Dress } from "@/lib/api"
import "swiper/css"
import "swiper/css/navigation"
import "swiper/css/pagination"

interface DressGridProps {
  dresses: Dress[]
}

export default function DressGrid({ dresses }: DressGridProps) {
  if (dresses.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-xl text-gray-600">
          Aucune robe ne correspond à vos critères
        </p>
      </div>
    )
  }

  return (
    <>
      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
        {dresses.map((dress) => (
          <Link
            key={dress.id}
            href={`/robes/${dress.id}`}
            className="group bg-white overflow-hidden block"
          >
            {/* Carousel d'images avec navigation */}
            <div className="relative aspect-[3/4] bg-gray-50 overflow-hidden">
              {dress.images && dress.images.length > 0 ? (
                dress.images.length === 1 ? (
                  // Une seule image, pas de carousel
                  <Image
                    src={dress.images[0]}
                    alt={dress.name}
                    fill
                    className="object-cover group-hover:scale-[1.02] transition-transform duration-500 ease-out"
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  />
                ) : (
                  // Plusieurs images, carousel Swiper avec navigation
                  <Swiper
                    modules={[Navigation, Pagination]}
                    spaceBetween={0}
                    slidesPerView={1}
                    navigation={{
                      nextEl: `.swiper-button-next-${dress.id}`,
                      prevEl: `.swiper-button-prev-${dress.id}`,
                    }}
                    pagination={{
                      clickable: true,
                      bulletClass: "swiper-pagination-bullet-modern",
                      bulletActiveClass: "swiper-pagination-bullet-active-modern",
                    }}
                    className="h-full w-full dress-carousel"
                    loop={true}
                  >
                    {dress.images.map((image, index) => (
                      <SwiperSlide key={index}>
                        <div className="relative w-full h-full">
                          <Image
                            src={image}
                            alt={`${dress.name} - Image ${index + 1}`}
                            fill
                            className="object-cover"
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 50vw"
                            priority={index === 0}
                          />
                        </div>
                      </SwiperSlide>
                    ))}

                    {/* Boutons de navigation minimalistes */}
                    <button
                      className={`swiper-button-prev-${dress.id} absolute left-2 top-1/2 -translate-y-1/2 z-10 w-7 h-7 rounded-full bg-white/95 shadow-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                      onClick={(e) => e.stopPropagation()}
                    >
                      <svg className="w-3.5 h-3.5 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                      </svg>
                    </button>
                    <button
                      className={`swiper-button-next-${dress.id} absolute right-2 top-1/2 -translate-y-1/2 z-10 w-7 h-7 rounded-full bg-white/95 shadow-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                      onClick={(e) => e.stopPropagation()}
                    >
                      <svg className="w-3.5 h-3.5 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </Swiper>
                )
              ) : (
                <div className="flex items-center justify-center h-full text-gray-300">
                  <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
              )}

            </div>

            {/* Informations de la robe */}
            <div className="pt-4">
              {/* Nom de la robe */}
              <h3 className="font-light text-sm lg:text-base text-gray-900 mb-2 line-clamp-2 group-hover:opacity-70 transition-opacity">
                {dress.name}
              </h3>

              {/* Type */}
              {dress.type_name && (
                <p className="text-xs text-gray-500 mb-3 uppercase tracking-wider">
                  {dress.type_name}
                </p>
              )}

              {/* Prix */}
              {dress.price_per_day_ttc && (
                <div className="flex items-baseline gap-1.5">
                  <span className="text-base font-normal text-gray-900">
                    {parseFloat(dress.price_per_day_ttc).toFixed(0)}€
                  </span>
                  <span className="text-xs text-gray-500">/jour</span>
                </div>
              )}
            </div>
          </Link>
        ))}
      </div>

      {/* Styles globaux pour Swiper moderne */}
      <style jsx global>{`
        /* Pagination bullets modernes */
        .dress-carousel .swiper-pagination-bullet-modern {
          width: 6px;
          height: 6px;
          background: rgba(255, 255, 255, 0.5);
          opacity: 1;
          margin: 0 3px !important;
          border-radius: 50%;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .dress-carousel .swiper-pagination-bullet-active-modern {
          width: 20px;
          height: 6px;
          border-radius: 3px;
          background: rgba(255, 255, 255, 0.95);
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
        }

        .dress-carousel .swiper-pagination {
          bottom: 12px !important;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        /* Boutons de navigation */
        .dress-carousel button[class*="swiper-button"] {
          cursor: pointer;
        }

        .dress-carousel button[class*="swiper-button"]:active {
          transform: translateY(-50%) scale(0.95);
        }
      `}</style>
    </>
  )
}
