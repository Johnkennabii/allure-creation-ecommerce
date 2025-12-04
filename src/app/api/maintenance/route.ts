import { NextRequest, NextResponse } from 'next/server'
import { writeFile, readFile } from 'fs/promises'
import { join } from 'path'

// Fichier pour stocker l'état de maintenance
const MAINTENANCE_FILE = join(process.cwd(), '.maintenance')

// Secret pour sécuriser l'endpoint (à définir dans .env)
const MAINTENANCE_SECRET = process.env.MAINTENANCE_SECRET || 'change-me-in-production'

/**
 * GET /api/maintenance - Obtenir l'état actuel de la maintenance
 */
export async function GET(request: NextRequest) {
  try {
    const isMaintenanceMode = process.env.MAINTENANCE_MODE === 'true'

    return NextResponse.json({
      success: true,
      maintenance: isMaintenanceMode,
      message: isMaintenanceMode ? 'Site en mode maintenance' : 'Site en ligne'
    })
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: 'Erreur lors de la vérification du mode maintenance'
    }, { status: 500 })
  }
}

/**
 * POST /api/maintenance - Activer/désactiver le mode maintenance
 * Body: { enabled: boolean, secret: string }
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { enabled, secret } = body

    // Vérifier le secret
    if (secret !== MAINTENANCE_SECRET) {
      return NextResponse.json({
        success: false,
        error: 'Non autorisé'
      }, { status: 401 })
    }

    // Valider le paramètre enabled
    if (typeof enabled !== 'boolean') {
      return NextResponse.json({
        success: false,
        error: 'Le paramètre "enabled" doit être un booléen'
      }, { status: 400 })
    }

    // Créer ou supprimer le fichier .maintenance
    if (enabled) {
      await writeFile(MAINTENANCE_FILE, new Date().toISOString())
    } else {
      try {
        const { unlink } = await import('fs/promises')
        await unlink(MAINTENANCE_FILE)
      } catch (err) {
        // Fichier n'existe peut-être pas, pas grave
      }
    }

    return NextResponse.json({
      success: true,
      maintenance: enabled,
      message: enabled ? 'Mode maintenance activé' : 'Mode maintenance désactivé',
      timestamp: new Date().toISOString()
    })
  } catch (error) {
    console.error('Erreur API maintenance:', error)
    return NextResponse.json({
      success: false,
      error: 'Erreur lors de la modification du mode maintenance'
    }, { status: 500 })
  }
}
