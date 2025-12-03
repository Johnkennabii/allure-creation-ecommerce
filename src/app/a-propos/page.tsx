import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'À propos - Allure Création',
  description: 'Découvrez l\'histoire d\'Allure Création, votre maison de couture spécialisée dans les robes de mariée et de soirée.',
};

export default function AProposPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative h-[400px] bg-black">
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black/70 z-10" />
        <div className="absolute inset-0 flex items-center justify-center z-20">
          <div className="text-center text-white">
            <h1 className="font-serif text-5xl md:text-6xl mb-4">À Propos</h1>
            <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto px-4">
              L'excellence au service de votre élégance
            </p>
          </div>
        </div>
      </div>

      {/* Notre Histoire */}
      <section className="max-w-6xl mx-auto px-4 py-16 md:py-24">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="font-serif text-4xl mb-6">Notre Histoire</h2>
            <div className="space-y-4 text-gray-700 leading-relaxed">
              <p>
                Fondée avec passion et dévouement, <strong>Allure Création</strong> est née du rêve
                de créer des moments inoubliables à travers des créations d'exception.
              </p>
              <p>
                Spécialisés dans la haute couture orientale et occidentale, nous proposons
                un service de <strong>location de robes d'exception</strong> pour tous vos événements.
                Notre boutique vous accueille sur rendez-vous pour des essayages personnalisés.
              </p>
              <p>
                Chaque pièce de notre collection est soigneusement sélectionnée ou créée
                pour refléter l'élégance intemporelle et le raffinement qui caractérisent
                notre maison.
              </p>
            </div>
          </div>
          <div className="bg-gray-100 h-[400px] flex items-center justify-center">
            <p className="text-gray-400">Image de l'atelier</p>
          </div>
        </div>
      </section>

      {/* Nos Valeurs */}
      <section className="bg-gray-50 py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="font-serif text-4xl text-center mb-12">Nos Valeurs</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-[#D4AF37] rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="font-serif text-2xl mb-3">Excellence</h3>
              <p className="text-gray-600">
                Nous sélectionnons avec soin chaque création pour garantir une qualité irréprochable
                et des finitions parfaites.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-[#D4AF37] rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h3 className="font-serif text-2xl mb-3">Passion</h3>
              <p className="text-gray-600">
                Chaque robe est choisie avec amour et dévotion pour créer des moments uniques
                et inoubliables.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-[#D4AF37] rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <h3 className="font-serif text-2xl mb-3">Service Client</h3>
              <p className="text-gray-600">
                Nous accompagnons chaque cliente avec attention pour transformer son rêve
                en réalité.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Notre Savoir-Faire */}
      <section className="max-w-6xl mx-auto px-4 py-16 md:py-24">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="bg-gray-100 h-[400px] flex items-center justify-center order-2 md:order-1">
            <p className="text-gray-400">Image du showroom</p>
          </div>
          <div className="order-1 md:order-2">
            <h2 className="font-serif text-4xl mb-6">Notre Savoir-Faire</h2>
            <div className="space-y-4 text-gray-700 leading-relaxed">
              <p>
                Notre expertise s'étend à toutes les traditions et styles :
              </p>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <span className="text-[#D4AF37] mr-2">✦</span>
                  <span><strong>Robes de mariée</strong> - Collections occidentales et orientales</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#D4AF37] mr-2">✦</span>
                  <span><strong>Tenues traditionnelles</strong> - Caftans, Takchitas, Karakou</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#D4AF37] mr-2">✦</span>
                  <span><strong>Robes de soirée</strong> - Créations élégantes pour tous vos événements</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#D4AF37] mr-2">✦</span>
                  <span><strong>Service sur mesure</strong> - Créations personnalisées selon vos désirs</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#D4AF37] mr-2">✦</span>
                  <span><strong>Location de robes</strong> - Essayage en boutique et réservation sur rendez-vous</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-black text-white py-16 md:py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="font-serif text-4xl mb-6">Prête à trouver votre robe de rêve ?</h2>
          <p className="text-xl text-white/80 mb-8">
            Visitez notre showroom ou prenez rendez-vous pour une consultation personnalisée
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/robes"
              className="bg-white text-black px-8 py-4 hover:bg-gray-100 transition-colors font-medium"
            >
              Découvrir la collection
            </a>
            <a
              href="/contact"
              className="border border-white text-white px-8 py-4 hover:bg-white hover:text-black transition-colors font-medium"
            >
              Prendre rendez-vous
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
