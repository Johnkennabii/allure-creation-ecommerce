// Service API pour Allure Création Backend (Hetzner)

const API_URL = "https://api.allure-creation.fr"

export interface DressFilters {
  page?: number
  limit?: number
  sizes?: string
  types?: string
  colors?: string
  priceMax?: number
  pricePerDayMax?: number
  search?: string
}

export interface Dress {
  id: string
  name: string
  reference: string
  price_ht: string
  price_ttc: string
  price_per_day_ht: string
  price_per_day_ttc: string
  images: string[]
  created_at: string
  updated_at: string
  published_post: boolean
  type_id: string
  type_name: string
  type_description: string
  size_id: string
  size_name: string
  condition_id: string
  condition_name: string
  color_id: string
  color_name: string
  hex_code: string
}

export interface DressesResponse {
  success: boolean
  total: number
  page: number
  limit: number
  data: Dress[]
}

export interface DressType {
  id: string
  name: string
  description: string
}

export interface DressSize {
  id: string
  name: string
}

export interface DressColor {
  id: string
  name: string
  hex_code: string
}

// Récupérer le token depuis le localStorage ou les cookies
const getAuthToken = (): string | null => {
  if (typeof window === "undefined") return null
  return localStorage.getItem("allure_auth_token")
}

// Headers pour les requêtes API
const getHeaders = () => {
  const token = getAuthToken()
  const headers: HeadersInit = {
    "Content-Type": "application/json",
    Accept: "application/json",
  }

  if (token) {
    headers["Authorization"] = `Bearer ${token}`
  }

  return headers
}

/**
 * Récupérer la liste des robes publiées
 */
export const getDresses = async (
  filters?: DressFilters
): Promise<DressesResponse> => {
  const params = new URLSearchParams()

  // Ajouter les filtres
  if (filters?.page) params.append("page", filters.page.toString())
  if (filters?.limit) params.append("limit", filters.limit.toString())
  if (filters?.sizes) params.append("sizes", filters.sizes)
  if (filters?.types) params.append("types", filters.types)
  if (filters?.colors) params.append("colors", filters.colors)
  if (filters?.priceMax) params.append("priceMax", filters.priceMax.toString())
  if (filters?.pricePerDayMax)
    params.append("pricePerDayMax", filters.pricePerDayMax.toString())
  if (filters?.search) params.append("search", filters.search)

  const url = `${API_URL}/dresses/details-view?${params.toString()}`

  const response = await fetch(url, {
    method: "GET",
    headers: getHeaders(),
    cache: "no-store", // Pour toujours avoir les données à jour
  })

  if (!response.ok) {
    throw new Error(`Erreur API: ${response.status}`)
  }

  const data: DressesResponse = await response.json()

  // Filtrer uniquement les robes publiées
  return {
    ...data,
    data: data.data.filter((dress) => dress.published_post === true),
    total: data.data.filter((dress) => dress.published_post === true).length,
  }
}

/**
 * Récupérer une robe par son ID
 */
export const getDressById = async (id: string): Promise<Dress | null> => {
  const response = await getDresses({ limit: 1 })
  const dress = response.data.find((d) => d.id === id)
  return dress || null
}

/**
 * Récupérer les types de robes disponibles
 */
export const getDressTypes = async (): Promise<DressType[]> => {
  // Pour l'instant, on extrait les types depuis les robes
  // TODO: Créer un endpoint dédié dans votre API backend
  const response = await getDresses({ limit: 100 })

  const typesMap = new Map<string, DressType>()

  response.data.forEach((dress) => {
    if (!typesMap.has(dress.type_id)) {
      typesMap.set(dress.type_id, {
        id: dress.type_id,
        name: dress.type_name,
        description: dress.type_description,
      })
    }
  })

  return Array.from(typesMap.values())
}

/**
 * Récupérer les tailles disponibles
 */
export const getDressSizes = async (): Promise<DressSize[]> => {
  const response = await getDresses({ limit: 100 })

  const sizesMap = new Map<string, DressSize>()

  response.data.forEach((dress) => {
    if (!sizesMap.has(dress.size_id)) {
      sizesMap.set(dress.size_id, {
        id: dress.size_id,
        name: dress.size_name,
      })
    }
  })

  return Array.from(sizesMap.values()).sort((a, b) =>
    a.name.localeCompare(b.name, undefined, { numeric: true })
  )
}

/**
 * Récupérer les couleurs disponibles
 */
export const getDressColors = async (): Promise<DressColor[]> => {
  const response = await getDresses({ limit: 100 })

  const colorsMap = new Map<string, DressColor>()

  response.data.forEach((dress) => {
    if (!colorsMap.has(dress.color_id)) {
      colorsMap.set(dress.color_id, {
        id: dress.color_id,
        name: dress.color_name,
        hex_code: dress.hex_code,
      })
    }
  })

  return Array.from(colorsMap.values())
}

/**
 * Mapper une robe vers le format Medusa (pour compatibilité avec les composants existants)
 */
export const mapDressToMedusaProduct = (dress: Dress) => {
  return {
    id: dress.id,
    title: dress.name,
    subtitle: dress.type_name,
    description: dress.type_description,
    handle: dress.reference.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
    thumbnail: dress.images[0] || null,
    images: dress.images.map((url, index) => ({
      id: `${dress.id}-img-${index}`,
      url,
      alt: `${dress.name} - Image ${index + 1}`,
    })),
    variants: [
      {
        id: dress.id,
        title: `${dress.size_name} - ${dress.color_name}`,
        prices: [
          {
            amount: parseFloat(dress.price_ttc) * 100, // Convertir en centimes
            currency_code: "eur",
          },
        ],
        options: [
          {
            value: dress.size_name,
            option: { title: "Taille" },
          },
          {
            value: dress.color_name,
            option: { title: "Couleur" },
          },
        ],
      },
    ],
    metadata: {
      reference: dress.reference,
      condition: dress.condition_name,
      rental_price_per_day: dress.price_per_day_ttc,
      hex_code: dress.hex_code,
      type: dress.type_name,
    },
  }
}

export default {
  getDresses,
  getDressById,
  getDressTypes,
  getDressSizes,
  getDressColors,
  mapDressToMedusaProduct,
}
