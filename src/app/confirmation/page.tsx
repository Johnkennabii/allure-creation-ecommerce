"use client"

import { useSearchParams } from "next/navigation"
import { Suspense, useEffect, useState } from "react"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import Link from "next/link"
import { getProspectById } from "@/lib/api"
import type { ProspectResponse } from "@/lib/api"

function ConfirmationContent() {
  const searchParams = useSearchParams()
  const prospectId = searchParams.get("prospect")
  const [prospectData, setProspectData] = useState<ProspectResponse | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (prospectId) {
      getProspectById(prospectId)
        .then((data) => {
          setProspectData(data)
          setLoading(false)
        })
        .catch((err) => {
          console.error("Error fetching prospect:", err)
          setError("Impossible de récupérer les détails de votre demande")
          setLoading(false)
        })
    } else {
      setLoading(false)
    }
  }, [prospectId])

  if (loading) {
    return (
      <>
        <Header />
        <main className="min-h-screen bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
            <p>Chargement des détails...</p>
          </div>
        </main>
        <Footer />
      </>
    )
  }

  const prospect = prospectData?.data

  return (
    <>
      <Header />
      <main className="min-h-screen bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            {/* Icône de succès */}
            <div className="flex justify-center mb-8">
              <div className="bg-green-100 rounded-full p-6">
                <svg
                  className="w-16 h-16 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
            </div>

            {/* Titre */}
            <h1 className="text-4xl font-heading mb-4">
              Demande envoyée avec succès !
            </h1>

            {/* Message */}
            <div className="max-w-2xl mx-auto space-y-4 text-gray-700 mb-8">
              <p className="text-lg">
                Merci pour votre demande de rendez-vous chez Allure Création.
              </p>
              <p>
                Notre équipe va prendre contact avec vous dans les{" "}
                <strong>24 heures</strong> pour organiser votre rendez-vous en
                boutique et confirmer la disponibilité des robes sélectionnées.
              </p>
              {prospectId && (
                <p className="text-sm text-gray-500">
                  Référence de votre demande :{" "}
                  <code className="bg-gray-100 px-2 py-1 rounded font-mono">
                    {prospectId.slice(0, 8)}
                  </code>
                </p>
              )}
            </div>

            {/* Récapitulatif des robes réservées */}
            {prospect?.dress_reservations && prospect.dress_reservations.length > 0 && (
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 max-w-2xl mx-auto mb-8 text-left">
                <h2 className="font-semibold text-lg mb-4 text-center">
                  Robes sélectionnées
                </h2>
                <div className="space-y-4">
                  {prospect.dress_reservations.map((reservation) => (
                    <div
                      key={reservation.id}
                      className="bg-white p-4 rounded border border-gray-200"
                    >
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <p className="font-semibold">{reservation.dress.name}</p>
                          <p className="text-xs text-gray-600">
                            Réf: {reservation.dress.reference}
                          </p>
                          <p className="text-xs text-gray-600 mt-1">
                            {reservation.dress.type_name} • {reservation.dress.size_name} •{" "}
                            {reservation.dress.color_name}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-[#D4AF37] text-lg">
                            {reservation.estimated_cost.toFixed(2)} €
                          </p>
                        </div>
                      </div>
                      <div className="bg-gray-50 p-3 rounded mt-3">
                        <p className="text-sm text-gray-700">
                          📅 Du{" "}
                          {new Date(reservation.rental_start_date).toLocaleDateString(
                            "fr-FR"
                          )}{" "}
                          au{" "}
                          {new Date(reservation.rental_end_date).toLocaleDateString(
                            "fr-FR"
                          )}
                        </p>
                        <p className="text-xs text-gray-600 mt-1">
                          {reservation.rental_days} jour
                          {reservation.rental_days > 1 ? "s" : ""} × {parseFloat(reservation.dress.price_per_day_ttc).toFixed(2)} €/jour
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Total estimé */}
                {prospect.total_estimated_cost !== undefined && (
                  <div className="mt-6 pt-4 border-t border-gray-300">
                    <div className="flex justify-between items-center">
                      <span className="text-xl font-heading">Total estimé</span>
                      <span className="text-3xl font-heading text-[#D4AF37]">
                        {prospect.total_estimated_cost.toFixed(2)} €
                      </span>
                    </div>
                    <p className="text-xs text-gray-500 text-right mt-1">
                      Prix calculé automatiquement par nos systèmes
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* Informations complémentaires */}
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 max-w-2xl mx-auto mb-8">
              <h2 className="font-semibold text-lg mb-4">Prochaines étapes</h2>
              <div className="space-y-3 text-left">
                <div className="flex items-start space-x-3">
                  <div className="bg-black text-white rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 text-sm">
                    1
                  </div>
                  <div>
                    <p className="font-medium">Confirmation par email</p>
                    <p className="text-sm text-gray-600">
                      Vous allez recevoir un email de confirmation avec le
                      récapitulatif de votre demande
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="bg-black text-white rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 text-sm">
                    2
                  </div>
                  <div>
                    <p className="font-medium">Prise de contact</p>
                    <p className="text-sm text-gray-600">
                      Notre équipe vous contactera pour fixer un rendez-vous à
                      votre convenance
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="bg-black text-white rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 text-sm">
                    3
                  </div>
                  <div>
                    <p className="font-medium">Rendez-vous en boutique</p>
                    <p className="text-sm text-gray-600">
                      Essayage des robes, prise de mesures et finalisation de
                      votre location
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Informations de contact */}
            <div className="border-t border-gray-200 pt-8 mb-8">
              <h3 className="font-semibold mb-4">Besoin de nous contacter ?</h3>
              <div className="flex flex-col sm:flex-row justify-center gap-6 text-sm">
                <div>
                  <p className="text-gray-600">Email</p>
                  <a
                    href="mailto:contact@allure-creation.fr"
                    className="text-accent hover:underline"
                  >
                    contact@allure-creation.fr
                  </a>
                </div>
                <div>
                  <p className="text-gray-600">Téléphone</p>
                  <a
                    href="tel:+33123456789"
                    className="text-accent hover:underline"
                  >
                    +33 1 23 45 67 89
                  </a>
                </div>
              </div>
            </div>

            {/* Boutons d'action */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/robes" className="btn-primary inline-block">
                Continuer mes achats
              </Link>
              <Link href="/" className="btn-secondary inline-block">
                Retour à l'accueil
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}

export default function ConfirmationPage() {
  return (
    <Suspense
      fallback={
        <>
          <Header />
          <main className="min-h-screen bg-white">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
              <p>Chargement...</p>
            </div>
          </main>
          <Footer />
        </>
      }
    >
      <ConfirmationContent />
    </Suspense>
  )
}
