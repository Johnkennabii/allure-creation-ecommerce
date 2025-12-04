import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // Vérifier si le mode maintenance est activé
  const maintenanceMode = process.env.MAINTENANCE_MODE === 'true'

  // Routes qui restent accessibles en mode maintenance
  const allowedPaths = [
    '/api/maintenance',
    '/_next',
    '/maintenance',
    '/favicon.ico',
  ]

  // Vérifier si la route actuelle est autorisée
  const isAllowedPath = allowedPaths.some(path =>
    request.nextUrl.pathname.startsWith(path)
  )

  // Si en mode maintenance et route non autorisée, rediriger vers page maintenance
  if (maintenanceMode && !isAllowedPath) {
    // Éviter la boucle de redirection
    if (request.nextUrl.pathname !== '/maintenance') {
      return NextResponse.rewrite(new URL('/maintenance', request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
}
