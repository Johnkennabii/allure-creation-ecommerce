import { Button, Heading } from "@medusajs/ui"
import Link from "next/link"

const Hero = () => {
  return (
    <div className="relative h-screen w-full overflow-hidden bg-black">
      {/* Image de fond élégante (placeholder) */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-60"
        style={{
          backgroundImage: 'url(/images/hero-bg.jpg)',
          backgroundPosition: 'center',
        }}
      >
        {/* Gradient overlay pour meilleure lisibilité */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/70" />
      </div>

      {/* Contenu du Hero */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4">
        <div className="max-w-4xl mx-auto space-y-8 fade-in">
          {/* Logo ou nom de la marque */}
          <div className="space-y-4">
            <Heading
              level="h1"
              className="text-white font-heading font-light text-5xl md:text-7xl tracking-wide"
            >
              Allure Création
            </Heading>
            <div className="w-24 h-px bg-white/50 mx-auto" />
          </div>

          {/* Slogan */}
          <p className="text-white/90 text-lg md:text-2xl font-light tracking-wide max-w-2xl mx-auto font-heading">
            L'élégance intemporelle pour vos moments d'exception
          </p>

          <p className="text-white/70 text-base md:text-lg font-light max-w-xl mx-auto">
            Découvrez notre collection exclusive de robes de mariée, soirée et cocktail
          </p>

          {/* Call to Actions */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
            <Link href="/fr/robes">
              <button className="btn-primary bg-white text-black border-white hover:bg-transparent hover:text-white px-8 py-4 rounded-none transition-all duration-300">
                Découvrir la Collection
              </button>
            </Link>
            <Link href="/fr/robes">
              <button className="btn-secondary border-white text-white hover:bg-white hover:text-black px-8 py-4 rounded-none transition-all duration-300">
                Voir Toutes les Robes
              </button>
            </Link>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-6 justify-center pt-8 text-white/60 text-sm font-light">
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 bg-white/60 rounded-full" />
              Robes de Mariée
            </span>
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 bg-white/60 rounded-full" />
              Soirée & Cocktail
            </span>
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 bg-white/60 rounded-full" />
              Location & Vente
            </span>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10">
        <div className="flex flex-col items-center gap-2 text-white/60 cursor-pointer hover:text-white transition-colors">
          <span className="text-xs tracking-widest uppercase">Scroll</span>
          <svg
            className="w-6 h-6 animate-bounce"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </div>
      </div>
    </div>
  )
}

export default Hero
