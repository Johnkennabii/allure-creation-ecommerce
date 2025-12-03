import { notFound } from "next/navigation"
import HeaderPronovias from "@/components/HeaderPronovias"
import FooterPronovias from "@/components/FooterPronovias"
import ImageGalleryPronovias from "@/components/ImageGalleryPronovias"
import DressRentalFormPronovias from "@/components/DressRentalFormPronovias"
import { getDressById } from "@/lib/api"
import Link from "next/link"
import ButtonPronovias from "@/components/ButtonPronovias"

interface PageProps {
  params: Promise<{ id: string }>
}

export default async function DressDetailPage({ params }: PageProps) {
  const { id } = await params
  const dress = await getDressById(id)

  if (!dress) {
    notFound()
  }

  const pricePerDay = parseFloat(dress.price_per_day_ttc)

  return (
    <>
      <HeaderPronovias />
      <main className="min-h-screen bg-pronovias-white">
        {/* Breadcrumb Pronovias */}
        <div className="bg-pronovias-white border-b border-pronovias-border">
          <div className="container-pronovias py-4">
            <nav className="flex items-center gap-2 text-xs uppercase tracking-widest">
              <Link href="/" className="text-pronovias-text-secondary hover:text-pronovias-black transition-colors duration-250">
                Accueil
              </Link>
              <svg className="w-3 h-3 text-pronovias-text-light" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
              <Link href="/robes" className="text-pronovias-text-secondary hover:text-pronovias-black transition-colors duration-250">
                Robes
              </Link>
              <svg className="w-3 h-3 text-pronovias-text-light" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
              <span className="text-pronovias-black truncate">{dress.name}</span>
            </nav>
          </div>
        </div>

        {/* Contenu principal - Layout Pronovias */}
        <div className="container-pronovias py-8 lg:py-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">

            {/* Colonne gauche - Galerie d'images */}
            <div className="order-1 group">
              <div className="lg:sticky lg:top-24">
                <ImageGalleryPronovias images={dress.images || []} alt={dress.name} />
              </div>
            </div>

            {/* Colonne droite - Informations produit */}
            <div className="order-2 space-y-8 lg:space-y-10">

              {/* En-tête produit */}
              <div className="space-y-4">
                {/* Type de robe - Badge style Pronovias */}
                {dress.type_name && (
                  <p className="text-xs uppercase tracking-extra-wide text-pronovias-text-secondary font-medium">
                    {dress.type_name}
                  </p>
                )}

                {/* Nom de la robe */}
                <h1 className="text-3xl lg:text-4xl xl:text-5xl font-light text-pronovias-black leading-tight uppercase tracking-wide">
                  {dress.name}
                </h1>

                {/* Référence */}
                {dress.reference && (
                  <p className="text-xs uppercase tracking-widest text-pronovias-text-secondary">
                    Réf: {dress.reference}
                  </p>
                )}
              </div>

              {/* Prix */}
              <div className="py-6 border-y border-pronovias-border">
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl lg:text-4xl font-light text-pronovias-black">
                    {pricePerDay.toFixed(0)}€
                  </span>
                  <span className="text-sm uppercase tracking-wider text-pronovias-text-secondary">/jour TTC</span>
                </div>
              </div>

              {/* Description */}
              {dress.description && (
                <div className="space-y-4">
                  <p className="text-sm lg:text-base font-light text-pronovias-text-secondary leading-relaxed whitespace-pre-wrap">
                    {dress.description}
                  </p>
                </div>
              )}

              {/* Caractéristiques - Table style Pronovias */}
              <div className="space-y-4">
                <h2 className="text-xs uppercase tracking-extra-wide text-pronovias-black font-medium">
                  Caractéristiques
                </h2>

                <div className="divide-y divide-pronovias-border">
                  {/* Taille */}
                  {dress.size_name && (
                    <div className="flex justify-between py-4">
                      <span className="text-xs uppercase tracking-wider text-pronovias-text-secondary">Taille</span>
                      <span className="text-sm font-light text-pronovias-black">{dress.size_name}</span>
                    </div>
                  )}

                  {/* Couleur */}
                  {dress.color_name && (
                    <div className="flex justify-between py-4">
                      <span className="text-xs uppercase tracking-wider text-pronovias-text-secondary">Couleur</span>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-light text-pronovias-black">{dress.color_name}</span>
                        {dress.hex_code && (
                          <div
                            className="w-4 h-4 border border-pronovias-border"
                            style={{ backgroundColor: dress.hex_code }}
                          />
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Formulaire de location */}
              <div className="pt-8 border-t border-pronovias-border">
                <DressRentalFormPronovias dress={dress} />
              </div>

              {/* CTA Contact - Style Pronovias */}
              <div className="pt-8 border-t border-pronovias-border space-y-4">
                <h3 className="text-xs uppercase tracking-extra-wide text-pronovias-black font-medium">
                  Besoin de conseils ?
                </h3>
                <p className="text-sm font-light text-pronovias-text-secondary leading-relaxed">
                  Notre équipe est à votre disposition pour vous accompagner dans le choix de votre robe.
                </p>
                <Link href="/contact">
                  <ButtonPronovias
                    variant="secondary"
                    size="medium"
                  >
                    Prendre rendez-vous
                  </ButtonPronovias>
                </Link>
              </div>

            </div>
          </div>
        </div>
      </main>
      <FooterPronovias />
    </>
  )
}
