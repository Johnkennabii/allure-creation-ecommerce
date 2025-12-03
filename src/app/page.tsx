import HeaderPronovias from "@/components/HeaderPronovias"
import Hero from "@/components/Hero"
import FooterPronovias from "@/components/FooterPronovias"
import Link from "next/link"
import { getDressTypes, getDresses } from "@/lib/api"

export default async function Home() {
  // Charger les types de robes depuis la base de données
  const dressTypes = await getDressTypes()

  // Pour chaque type, récupérer une robe exemple pour l'image
  const collectionsWithImages = await Promise.all(
    dressTypes.slice(0, 3).map(async (type) => {
      const dressesOfType = await getDresses({
        types: type.id,
        limit: 1
      })
      const sampleDress = dressesOfType.data[0]
      return {
        ...type,
        imageUrl: sampleDress?.images?.[0] ||
          "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1000"
      }
    })
  )
  return (
    <>
      <HeaderPronovias />
      <main>
        <Hero />

        {/* Collections - Style Pronovias */}
        <section className="py-16 lg:py-24 bg-pronovias-white">
          <div className="container-pronovias">
            {/* En-tête */}
            <div className="mb-12 lg:mb-16">
              <h2 className="text-center text-2xl lg:text-3xl font-light uppercase tracking-extra-wide text-pronovias-black mb-3">
                Nos Collections
              </h2>
              <p className="text-center text-sm text-pronovias-text-secondary">
                Découvrez nos robes de mariée
              </p>
            </div>

            {/* Grille de cartes - Style Pronovias Events */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {collectionsWithImages.map((collection) => (
                <Link
                  key={collection.id}
                  href={`/robes?type=${encodeURIComponent(collection.name)}`}
                  className="group block bg-pronovias-white border border-pronovias-border hover:border-pronovias-black transition-colors duration-250"
                >
                  {/* Image */}
                  <div className="relative aspect-square overflow-hidden">
                    <div
                      className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                      style={{
                        backgroundImage: `url('${collection.imageUrl}')`,
                      }}
                    />
                  </div>

                  {/* Contenu */}
                  <div className="p-6 lg:p-8">
                    <h3 className="text-lg lg:text-xl font-medium uppercase tracking-wider text-pronovias-black mb-4">
                      {collection.name}
                    </h3>
                    <button className="w-full px-6 py-3 text-xs uppercase tracking-widest font-medium text-pronovias-black border border-pronovias-black hover:bg-pronovias-black hover:text-pronovias-white transition-all duration-250">
                      Découvrir
                    </button>
                  </div>
                </Link>
              ))}
            </div>

            {/* Bouton voir toutes les collections */}
            <div className="mt-12 lg:mt-16 text-center">
              <Link
                href="/robes"
                className="inline-block px-8 py-4 text-xs uppercase tracking-widest font-medium text-pronovias-white bg-pronovias-black hover:bg-pronovias-gray-800 transition-colors duration-250"
              >
                Voir toutes les robes
              </Link>
            </div>
          </div>
        </section>

        {/* CTA Section - Design moderne mobile-first */}
        <section className="py-12 lg:py-20 px-4">
          <div className="max-w-4xl mx-auto">
            {/* Card CTA avec glass effect */}
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-accent/10 via-white to-accent/5 p-8 lg:p-12 shadow-xl">
              {/* Pattern décoratif */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-accent/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-accent/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

              <div className="relative text-center space-y-6">
                {/* Badge */}
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-sm">
                  <svg className="w-4 h-4 text-accent" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <span className="text-sm font-semibold text-gray-700">Service sur mesure</span>
                </div>

                <h2 className="text-3xl lg:text-4xl font-heading font-bold text-gray-900">
                  Une Expérience Unique
                </h2>
                <p className="text-base lg:text-lg text-gray-600 max-w-2xl mx-auto">
                  Prenez rendez-vous dans notre atelier parisien pour une séance
                  d'essayage personnalisée et découvrez la robe de vos rêves.
                </p>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
                  <Link
                    href="/contact"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 bg-black text-white rounded-full font-semibold text-sm active:scale-95 transition-all duration-200 shadow-lg hover:shadow-xl"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span>Prendre Rendez-vous</span>
                  </Link>

                  <Link
                    href="/robes"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-gray-900 rounded-full font-semibold text-sm active:scale-95 transition-all duration-200 shadow-md hover:shadow-lg border border-gray-200"
                  >
                    <span>Parcourir le catalogue</span>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <FooterPronovias />
    </>
  )
}
