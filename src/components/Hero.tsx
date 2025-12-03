import Link from "next/link"

export default function Hero() {
  return (
    <section className="relative h-screen flex items-center justify-center bg-black text-white overflow-hidden">
      {/* Background Image (placeholder) */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black/30 z-10" />
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=2000')",
        }}
      />

      {/* Content */}
      <div className="relative z-20 text-center max-w-4xl mx-auto px-4 fade-in">
        <h1 className="text-5xl md:text-7xl font-heading mb-6">
          L'Élégance à Votre Service
        </h1>
        <p className="text-lg md:text-xl mb-8 text-gray-200">
          Découvrez notre collection exclusive de robes de mariée, soirée et
          cocktail.
          <br />
          Location et vente pour tous vos événements exceptionnels.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/robes" className="btn-primary inline-block">
            Découvrir la Collection
          </Link>
          <Link href="/contact" className="btn-secondary inline-block">
            Prendre Rendez-vous
          </Link>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
        <div className="animate-bounce">
          <svg
            className="w-6 h-6 text-white"
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
    </section>
  )
}
