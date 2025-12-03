const API_URL = "https://api.allure-creation.fr"
const API_KEY = process.env.NEXT_PUBLIC_API_KEY || ""

export interface Dress {
  id: string
  name: string
  reference: string
  price_ttc: string
  price_ht: string
  price_per_day_ttc: string
  price_per_day_ht: string
  images: string[]
  published_post: boolean
  type_id: string
  type_name: string
  type_description?: string
  size_id: string
  size_name: string
  color_id: string
  color_name: string
  hex_code: string
  condition_id?: string
  condition_name?: string
  description?: string
}

export interface DressFilters {
  page?: number
  limit?: number
  sizes?: string // ID de la taille
  types?: string // ID du type
  colors?: string // ID de la couleur
  priceMax?: number
  pricePerDayMax?: number
  search?: string
  id?: string // ID spécifique d'une robe
}

export interface DressesResponse {
  data: Dress[]
  total: number
  page: number
  limit: number
}

/**
 * Récupère la liste des robes depuis l'API Hetzner
 */
export const getDresses = async (
  filters?: DressFilters
): Promise<DressesResponse> => {
  const params = new URLSearchParams()

  if (filters) {
    if (filters.page) params.append("page", filters.page.toString())
    if (filters.limit) params.append("limit", filters.limit.toString())
    if (filters.sizes) params.append("sizes", filters.sizes) // ID de la taille
    if (filters.types) params.append("types", filters.types) // ID du type
    if (filters.colors) params.append("colors", filters.colors) // ID de la couleur
    if (filters.priceMax)
      params.append("priceMax", filters.priceMax.toString())
    if (filters.pricePerDayMax)
      params.append("pricePerDayMax", filters.pricePerDayMax.toString())
    if (filters.search) params.append("search", filters.search)
    if (filters.id) params.append("id", filters.id)
  }

  const url = `${API_URL}/dresses/details-view${params.toString() ? `?${params.toString()}` : ""}`

  console.log("API URL:", url)

  const response = await fetch(url, {
    headers: {
      "X-API-Key": API_KEY,
      "Content-Type": "application/json",
    },
    cache: "no-store", // Pas de cache pour les robes (données dynamiques)
  })

  if (!response.ok) {
    const errorText = await response.text()
    console.error("API Error:", response.status, errorText)
    throw new Error(`API Error: ${response.statusText}`)
  }

  const data = await response.json()

  // Vérifier la structure des données
  if (!data.success || !Array.isArray(data.data)) {
    console.error("Invalid API response:", data)
    return {
      data: [],
      total: 0,
      page: filters?.page || 1,
      limit: filters?.limit || 12,
    }
  }

  // Filtrer uniquement les robes publiées
  const publishedDresses = data.data.filter(
    (dress: Dress) => dress.published_post === true
  )

  return {
    data: publishedDresses,
    total: publishedDresses.length,
    page: filters?.page || 1,
    limit: filters?.limit || 12,
  }
}

/**
 * Récupère une robe par son ID
 */
export const getDressById = async (id: string): Promise<Dress | null> => {
  const response = await fetch(`${API_URL}/dresses/${id}`, {
    headers: {
      "X-API-Key": API_KEY,
      "Content-Type": "application/json",
    },
    next: { revalidate: 60 },
  })

  if (!response.ok) {
    return null
  }

  const result = await response.json()

  if (!result.success || !result.data) {
    return null
  }

  const apiDress = result.data

  // Ne retourner que si la robe est publiée
  if (!apiDress.published_post) {
    return null
  }

  // Transformer la structure de l'API vers notre interface Dress
  const dress: Dress = {
    id: apiDress.id,
    name: apiDress.name,
    reference: apiDress.reference,
    price_ttc: apiDress.price_ttc,
    price_ht: apiDress.price_ht,
    price_per_day_ttc: apiDress.price_per_day_ttc,
    price_per_day_ht: apiDress.price_per_day_ht,
    images: apiDress.images,
    published_post: apiDress.published_post,
    type_id: apiDress.type?.id || "",
    type_name: apiDress.type?.name || "",
    type_description: apiDress.type?.description,
    size_id: apiDress.size?.id || "",
    size_name: apiDress.size?.name || "",
    color_id: apiDress.color?.id || "",
    color_name: apiDress.color?.name || "",
    hex_code: apiDress.color?.hex_code || "#000000",
    condition_id: apiDress.condition?.id,
    condition_name: apiDress.condition?.name,
    description: apiDress.description,
  }

  return dress
}

/**
 * Récupère les types de robes disponibles UNIQUEMENT depuis les robes publiées
 */
export const getDressTypes = async (): Promise<
  Array<{ id: string; name: string; description?: string }>
> => {
  try {
    // Récupérer toutes les robes publiées
    const allDresses = await getDresses({ limit: 1000 })

    // Extraire les types uniques
    const typesMap = new Map<string, { id: string; name: string; description?: string }>()

    allDresses.data.forEach((dress) => {
      if (dress.type_id && dress.type_name && !typesMap.has(dress.type_id)) {
        typesMap.set(dress.type_id, {
          id: dress.type_id,
          name: dress.type_name,
          description: dress.type_description,
        })
      }
    })

    return Array.from(typesMap.values()).sort((a, b) => a.name.localeCompare(b.name))
  } catch (error) {
    console.error("Error fetching dress types:", error)
    return []
  }
}

/**
 * Récupère les tailles disponibles UNIQUEMENT depuis les robes publiées
 */
export const getDressSizes = async (): Promise<
  Array<{ id: string; name: string }>
> => {
  try {
    // Récupérer toutes les robes publiées
    const allDresses = await getDresses({ limit: 1000 })

    // Extraire les tailles uniques
    const sizesMap = new Map<string, { id: string; name: string }>()

    allDresses.data.forEach((dress) => {
      if (dress.size_id && dress.size_name && !sizesMap.has(dress.size_id)) {
        sizesMap.set(dress.size_id, {
          id: dress.size_id,
          name: dress.size_name,
        })
      }
    })

    // Trier par ordre numérique
    return Array.from(sizesMap.values()).sort((a, b) => {
      const numA = parseInt(a.name)
      const numB = parseInt(b.name)
      if (!isNaN(numA) && !isNaN(numB)) {
        return numA - numB
      }
      return a.name.localeCompare(b.name)
    })
  } catch (error) {
    console.error("Error fetching dress sizes:", error)
    return []
  }
}

/**
 * Récupère les couleurs disponibles UNIQUEMENT depuis les robes publiées
 */
export const getDressColors = async (): Promise<
  Array<{ id: string; name: string; hex_code: string }>
> => {
  try {
    // Récupérer toutes les robes publiées
    const allDresses = await getDresses({ limit: 1000 })

    // Extraire les couleurs uniques
    const colorsMap = new Map<string, { id: string; name: string; hex_code: string }>()

    allDresses.data.forEach((dress) => {
      if (dress.color_id && dress.color_name && !colorsMap.has(dress.color_id)) {
        colorsMap.set(dress.color_id, {
          id: dress.color_id,
          name: dress.color_name,
          hex_code: dress.hex_code || "#000000",
        })
      }
    })

    return Array.from(colorsMap.values()).sort((a, b) => a.name.localeCompare(b.name))
  } catch (error) {
    console.error("Error fetching dress colors:", error)
    return []
  }
}

/**
 * Interface pour les réservations de robes dans un prospect
 */
export interface DressReservation {
  dress_id: string
  rental_start_date: string // Format: YYYY-MM-DD
  rental_end_date: string // Format: YYYY-MM-DD
  notes?: string
}

/**
 * Interface pour créer un prospect
 */
export interface CreateProspectData {
  firstname: string
  lastname: string
  email: string
  phone: string
  country: string
  city: string
  address: string
  postal_code: string
  status?: string
  source?: string
  notes?: string
  dress_reservations?: DressReservation[]
}

/**
 * Interface pour une réservation de robe dans la réponse
 */
export interface DressReservationResponse {
  id: string
  dress_id: string
  rental_start_date: string
  rental_end_date: string
  rental_days: number
  estimated_cost: number
  notes?: string
  dress: {
    id: string
    name: string
    reference: string
    price_per_day_ttc: string
    type_name?: string
    size_name?: string
    color_name?: string
    condition_name?: string
  }
}

export interface ProspectResponse {
  success: boolean
  data: {
    id: string
    firstname: string
    lastname: string
    email: string
    phone: string
    country: string
    city: string
    address: string
    postal_code: string
    status: string
    source: string
    notes?: string
    created_at: string
    dress_reservations?: DressReservationResponse[]
    total_estimated_cost?: number
  }
}

/**
 * Crée un nouveau prospect
 */
export const createProspect = async (
  prospectData: CreateProspectData
): Promise<ProspectResponse> => {
  try {
    const response = await fetch(`${API_URL}/prospects`, {
      method: "POST",
      headers: {
        "X-API-Key": API_KEY,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...prospectData,
        status: prospectData.status || "new",
        source: prospectData.source || "website",
      }),
      cache: "no-store",
    })

    if (!response.ok) {
      throw new Error(`API Error: ${response.statusText}`)
    }

    const data = await response.json()
    return data
  } catch (error) {
    console.error("Error creating prospect:", error)
    throw error
  }
}

/**
 * Récupère les détails d'un prospect par son ID
 */
export const getProspectById = async (
  prospectId: string
): Promise<ProspectResponse> => {
  try {
    const response = await fetch(`${API_URL}/prospects/${prospectId}`, {
      headers: {
        "X-API-Key": API_KEY,
        "Content-Type": "application/json",
      },
      cache: "no-store",
    })

    if (!response.ok) {
      throw new Error(`API Error: ${response.statusText}`)
    }

    const data = await response.json()
    return data
  } catch (error) {
    console.error("Error fetching prospect:", error)
    throw error
  }
}

/**
 * Vérifie la disponibilité d'une robe pour une période donnée
 */
export const checkDressAvailability = async (
  dressId: string,
  startDate: string,
  endDate: string
): Promise<{ isAvailable: boolean; currentContract: any | null }> => {
  try {
    const params = new URLSearchParams()
    params.append("start", startDate)
    params.append("end", endDate)

    const response = await fetch(`${API_URL}/dresses/availability?${params.toString()}`, {
      headers: {
        "X-API-Key": API_KEY,
        "Content-Type": "application/json",
      },
      cache: "no-store",
    })

    if (!response.ok) {
      throw new Error(`API Error: ${response.statusText}`)
    }

    const data = await response.json()

    // Trouver la robe spécifique dans les résultats
    const dress = data.data.find((d: any) => d.id === dressId)

    return {
      isAvailable: dress?.isAvailable ?? false,
      currentContract: dress?.current_contract ?? null,
    }
  } catch (error) {
    console.error("Error checking dress availability:", error)
    return {
      isAvailable: false,
      currentContract: null,
    }
  }
}
