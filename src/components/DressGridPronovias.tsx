"use client"

import type { Dress } from "@/lib/api"
import ProductCardPronovias from "./ProductCardPronovias"

interface DressGridPronoviasProps {
  dresses: Dress[]
}

export default function DressGridPronovias({ dresses }: DressGridPronoviasProps) {
  if (dresses.length === 0) {
    return (
      <div className="text-center py-16 lg:py-24">
        <p className="text-base lg:text-lg font-light text-pronovias-text-secondary">
          Aucune robe ne correspond à vos critères
        </p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6 lg:gap-8">
      {dresses.map((dress) => (
        <ProductCardPronovias
          key={dress.id}
          id={dress.id}
          name={dress.name}
          type={dress.type_name}
          description={dress.description}
          price={dress.price_per_day_ttc ? parseFloat(dress.price_per_day_ttc) : undefined}
          images={dress.images || []}
          href={`/robes/${dress.id}`}
          isNew={false}
        />
      ))}
    </div>
  )
}
