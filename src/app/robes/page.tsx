import HeaderPronovias from "@/components/HeaderPronovias"
import FooterPronovias from "@/components/FooterPronovias"
import { getDresses, getDressTypes, getDressSizes, getDressColors } from "@/lib/api"
import DressGridPronovias from "@/components/DressGridPronovias"
import FilterDrawerClient from "@/components/FilterDrawerClient"
import Link from "next/link"

interface SearchParams {
  search?: string
  reference?: string
  type?: string
  size?: string
  color?: string
  page?: string
}

export default async function RobesPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>
}) {
  const params = await searchParams
  const { search, reference, type, size, color, page = "1" } = params

  // Récupérer d'abord les listes pour faire le mapping nom -> ID
  const [types, sizes, colors] = await Promise.all([
    getDressTypes(),
    getDressSizes(),
    getDressColors(),
  ])

  // Convertir les noms en IDs pour l'API
  const typeId = type ? types.find(t => t.name === type)?.id : undefined
  const sizeId = size ? sizes.find(s => s.name === size)?.id : undefined
  const colorId = color ? colors.find(c => c.name === color)?.id : undefined

  console.log("Filters applied:", { search, reference, type, size, color, page })
  console.log("IDs for filters:", { typeId, sizeId, colorId })

  // Fetch dresses avec les IDs
  const dressesResponse = await getDresses({
    page: parseInt(page),
    limit: 1000, // Get all to filter by reference on client
    search,
    types: typeId,
    sizes: sizeId,
    colors: colorId,
  })

  // Filter by reference on client side if provided
  let filteredDresses = dressesResponse.data
  if (reference) {
    filteredDresses = dressesResponse.data.filter(dress =>
      dress.reference.toLowerCase().includes(reference.toLowerCase())
    )
  }

  // Apply pagination manually
  const pageNum = parseInt(page)
  const limit = 12
  const startIndex = (pageNum - 1) * limit
  const endIndex = startIndex + limit
  const paginatedDresses = filteredDresses.slice(startIndex, endIndex)

  const finalResponse = {
    data: paginatedDresses,
    total: filteredDresses.length,
    page: pageNum,
    limit: limit,
  }

  console.log("Dresses found:", finalResponse.total)

  return (
    <>
      <HeaderPronovias />
      <main className="min-h-screen bg-pronovias-white">
        {/* Breadcrumb */}
        <div className="border-b border-pronovias-border">
          <div className="container-pronovias py-4">
            <nav className="flex items-center gap-2 text-xs uppercase tracking-widest">
              <Link href="/" className="text-pronovias-text-secondary hover:text-pronovias-black transition-colors duration-250">
                Accueil
              </Link>
              <svg className="w-3 h-3 text-pronovias-text-light" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
              <span className="text-pronovias-black">Robes</span>
            </nav>
          </div>
        </div>

        {/* Page Title */}
        <div className="border-b border-pronovias-border">
          <div className="container-pronovias py-6 lg:py-8">
            <h1 className="text-2xl lg:text-3xl font-light text-pronovias-black uppercase tracking-wide">
              Notre Collection
            </h1>
          </div>
        </div>

        {/* Main Content */}
        <div className="container-pronovias py-8 lg:py-12">
          {/* Toolbar with Filter button */}
          <FilterDrawerClient
            types={types}
            sizes={sizes}
            colors={colors}
            totalResults={finalResponse.total}
          />

          {/* Products Grid */}
          <DressGridPronovias dresses={finalResponse.data} />

          {/* Pagination - placeholder */}
          {finalResponse.total > 12 && (
            <div className="mt-12 pt-8 border-t border-pronovias-border">
              <div className="flex justify-center items-center gap-2">
                <button className="px-4 py-2 text-xs uppercase tracking-wider border border-pronovias-border hover:border-pronovias-black transition-colors duration-250">
                  Précédent
                </button>
                <span className="px-4 py-2 text-xs uppercase tracking-wider bg-pronovias-black text-pronovias-white">
                  1
                </span>
                <button className="px-4 py-2 text-xs uppercase tracking-wider border border-pronovias-border hover:border-pronovias-black transition-colors duration-250">
                  Suivant
                </button>
              </div>
            </div>
          )}
        </div>
      </main>
      <FooterPronovias />
    </>
  )
}
