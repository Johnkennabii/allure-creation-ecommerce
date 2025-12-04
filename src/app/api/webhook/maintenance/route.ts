import { NextRequest, NextResponse } from 'next/server'
import { exec } from 'child_process'
import { promisify } from 'util'

const execAsync = promisify(exec)

// Secret pour sécuriser le webhook (doit correspondre à celui de votre dashboard)
const WEBHOOK_SECRET = process.env.MAINTENANCE_WEBHOOK_SECRET || process.env.MAINTENANCE_SECRET

/**
 * POST /api/webhook/maintenance
 * Webhook appelé par votre dashboard admin pour activer/désactiver la maintenance
 *
 * Headers requis:
 * - X-Webhook-Secret: votre secret de webhook
 *
 * Body:
 * {
 *   "enabled": boolean,
 *   "message": string (optionnel)
 * }
 */
export async function POST(request: NextRequest) {
  try {
    // Vérifier le secret dans les headers
    const secret = request.headers.get('X-Webhook-Secret') || request.headers.get('Authorization')?.replace('Bearer ', '')

    if (!secret || secret !== WEBHOOK_SECRET) {
      return NextResponse.json({
        success: false,
        error: 'Non autorisé - Secret invalide'
      }, { status: 401 })
    }

    const body = await request.json()
    const { enabled, message } = body

    // Valider enabled
    if (typeof enabled !== 'boolean') {
      return NextResponse.json({
        success: false,
        error: 'Le paramètre "enabled" doit être un booléen'
      }, { status: 400 })
    }

    console.log(`[Webhook Maintenance] ${enabled ? 'Activation' : 'Désactivation'} demandée`)
    if (message) {
      console.log(`[Webhook Maintenance] Message: ${message}`)
    }

    // Mettre à jour la variable d'environnement dans le fichier .env
    const envPath = '/var/www/allure-creation-ecommerce/.env'
    const newValue = enabled ? 'true' : 'false'

    try {
      // Vérifier si on est sur le VPS (en production)
      if (process.env.NODE_ENV === 'production') {
        // Mettre à jour le fichier .env
        await execAsync(`sed -i 's/MAINTENANCE_MODE=.*/MAINTENANCE_MODE=${newValue}/' ${envPath}`)

        // Redémarrer PM2
        await execAsync('pm2 restart allure-creation')

        console.log(`[Webhook Maintenance] Mode maintenance ${enabled ? 'activé' : 'désactivé'} avec succès`)
      } else {
        console.log('[Webhook Maintenance] En développement, pas de modification réelle')
      }

      return NextResponse.json({
        success: true,
        maintenance: enabled,
        message: enabled
          ? 'Mode maintenance activé. Le site affiche maintenant la page de maintenance.'
          : 'Mode maintenance désactivé. Le site est de nouveau accessible.',
        timestamp: new Date().toISOString(),
        customMessage: message || null
      })
    } catch (error) {
      console.error('[Webhook Maintenance] Erreur lors de l\'exécution:', error)
      return NextResponse.json({
        success: false,
        error: 'Erreur lors de la mise à jour du mode maintenance',
        details: error instanceof Error ? error.message : 'Erreur inconnue'
      }, { status: 500 })
    }
  } catch (error) {
    console.error('[Webhook Maintenance] Erreur:', error)
    return NextResponse.json({
      success: false,
      error: 'Erreur lors du traitement de la requête'
    }, { status: 500 })
  }
}

/**
 * GET /api/webhook/maintenance
 * Vérifier l'état actuel de la maintenance
 */
export async function GET(request: NextRequest) {
  const secret = request.headers.get('X-Webhook-Secret') || request.headers.get('Authorization')?.replace('Bearer ', '')

  if (!secret || secret !== WEBHOOK_SECRET) {
    return NextResponse.json({
      success: false,
      error: 'Non autorisé'
    }, { status: 401 })
  }

  const isMaintenanceMode = process.env.MAINTENANCE_MODE === 'true'

  return NextResponse.json({
    success: true,
    maintenance: isMaintenanceMode,
    message: isMaintenanceMode ? 'Site en mode maintenance' : 'Site en ligne',
    timestamp: new Date().toISOString()
  })
}
