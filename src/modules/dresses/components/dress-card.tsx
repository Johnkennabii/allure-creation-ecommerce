import Link from "next/link"
import Image from "next/image"
import { Dress } from "@/lib/api/allure-api"

interface DressCardProps {
  dress: Dress
}

export default function DressCard({ dress }: DressCardProps) {
  const priceAchat = parseFloat(dress.price_ttc)
  const priceLocation = parseFloat(dress.price_per_day_ttc)

  return (
    <Link
      href={`/fr/robes/${dress.id}`}
      className="group block hover-lift bg-white"
    >
      {/* Image */}
      <div className="relative aspect-[3/4] overflow-hidden bg-gray-100 mb-4">
        <Image
          src={dress.images[0]}
          alt={dress.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />

        {/* Badge état */}
        {dress.condition_name && (
          <div className="absolute top-4 left-4">
            <span className="bg-white/90 backdrop-blur-sm px-3 py-1 text-xs font-medium rounded-full">
              {dress.condition_name}
            </span>
          </div>
        )}

        {/* Pastille couleur */}
        <div
          className="absolute top-4 right-4 w-8 h-8 rounded-full border-2 border-white shadow-md"
          style={{ backgroundColor: dress.hex_code }}
          title={dress.color_name}
        />
      </div>

      {/* Informations */}
      <div className="space-y-2">
        {/* Type de robe */}
        <p className="text-xs uppercase tracking-wider text-gray-500">
          {dress.type_name}
        </p>

        {/* Nom */}
        <h3 className="font-heading text-xl font-light group-hover:text-gray-600 transition-colors">
          {dress.name}
        </h3>

        {/* Taille */}
        <p className="text-sm text-gray-600">Taille {dress.size_name}</p>

        {/* Prix */}
        <div className="flex items-baseline gap-3 pt-2">
          <div>
            <p className="text-sm text-gray-500">Achat</p>
            <p className="font-semibold text-lg">{priceAchat.toFixed(0)} €</p>
          </div>
          <div className="w-px h-8 bg-gray-200" />
          <div>
            <p className="text-sm text-gray-500">Location/jour</p>
            <p className="font-semibold text-lg">
              {priceLocation.toFixed(0)} €
            </p>
          </div>
        </div>

        {/* Référence */}
        <p className="text-xs text-gray-400 font-mono">{dress.reference}</p>
      </div>
    </Link>
  )
}
