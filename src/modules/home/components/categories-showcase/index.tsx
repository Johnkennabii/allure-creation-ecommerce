import Link from "next/link"
import { Heading } from "@medusajs/ui"

const categories = [
  {
    title: "Robes de Mariée",
    description: "Des créations uniques pour le jour le plus important de votre vie",
    image: "/images/categories/mariee.jpg",
    href: "/fr/robes?type=mariee",
  },
  {
    title: "Robes de Soirée",
    description: "L'élégance absolue pour vos événements prestigieux",
    image: "/images/categories/soiree.jpg",
    href: "/fr/robes?type=soiree",
  },
  {
    title: "Robes de Cocktail",
    description: "Sophistication et charme pour toutes les occasions",
    image: "/images/categories/cocktail.jpg",
    href: "/fr/robes?type=cocktail",
  },
  {
    title: "Robes de Cérémonie",
    description: "Des pièces d'exception pour célébrer avec style",
    image: "/images/categories/ceremonie.jpg",
    href: "/fr/robes?type=ceremonie",
  },
]

const CategoriesShowcase = () => {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="content-container">
        {/* En-tête de section */}
        <div className="text-center mb-16 space-y-4">
          <Heading
            level="h2"
            className="font-heading font-light text-4xl md:text-5xl text-black"
          >
            Nos Collections
          </Heading>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Découvrez nos robes d'exception, disponibles à la location ou à l'achat
          </p>
        </div>

        {/* Grille de catégories */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          {categories.map((category, index) => (
            <Link
              key={category.title}
              href={category.href}
              className="group relative overflow-hidden bg-gray-100 aspect-[4/5] hover-lift"
            >
              {/* Image de fond */}
              <div
                className="absolute inset-0 bg-cover bg-center transform group-hover:scale-110 transition-transform duration-700"
                style={{
                  backgroundImage: `url(${category.image})`,
                }}
              >
                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/50 transition-all duration-500" />
              </div>

              {/* Contenu */}
              <div className="relative h-full flex flex-col justify-end p-8 md:p-12 text-white">
                <div className="transform translate-y-0 group-hover:-translate-y-2 transition-transform duration-500">
                  <div className="w-16 h-px bg-white/50 mb-6" />
                  <Heading
                    level="h3"
                    className="font-heading font-light text-3xl md:text-4xl mb-3"
                  >
                    {category.title}
                  </Heading>
                  <p className="text-white/90 text-sm md:text-base mb-4">
                    {category.description}
                  </p>
                  <span className="inline-flex items-center gap-2 text-sm uppercase tracking-wider">
                    Découvrir
                    <svg
                      className="w-4 h-4 transform group-hover:translate-x-2 transition-transform"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

export default CategoriesShowcase
