import { Metadata } from "next"
import { getDresses, getDressTypes, getDressSizes, getDressColors } from "@/lib/api/allure-api"
import DressCatalog from "@/modules/dresses/components/dress-catalog"

export const metadata: Metadata = {
  title: "Catalogue de Robes - Allure Création",
  description: "Découvrez notre collection de robes élégantes disponibles à la location et à l'achat",
}

export default async function RobesPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const params = await searchParams

  // Extraire les paramètres de recherche
  const page = Number(params.page) || 1
  const search = typeof params.search === "string" ? params.search : undefined
  const type = typeof params.type === "string" ? params.type : undefined
  const size = typeof params.size === "string" ? params.size : undefined
  const color = typeof params.color === "string" ? params.color : undefined

  // Récupérer les données
  const [dressesResponse, types, sizes, colors] = await Promise.all([
    getDresses({
      page,
      limit: 12,
      search,
      types: type,
      sizes: size,
      colors: color,
    }),
    getDressTypes(),
    getDressSizes(),
    getDressColors(),
  ])

  return (
    <div className="min-h-screen bg-white">
      <DressCatalog
        dresses={dressesResponse.data}
        total={dressesResponse.total}
        page={dressesResponse.page}
        limit={dressesResponse.limit}
        types={types}
        sizes={sizes}
        colors={colors}
      />
    </div>
  )
}
