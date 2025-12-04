import Link from "next/link"

export default function MaintenancePage() {
  return (
    <div className="min-h-screen bg-pronovias-white flex items-center justify-center px-4">
      <div className="max-w-2xl w-full text-center space-y-8">
        {/* Logo */}
        <div className="mb-8">
          <h1 className="text-4xl lg:text-5xl font-bold uppercase tracking-extra-wide text-pronovias-black">
            Allure Création
          </h1>
        </div>

        {/* Icône maintenance */}
        <div className="flex justify-center">
          <svg
            className="w-24 h-24 text-pronovias-text-secondary"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 004.486-6.336l-3.276 3.277a3.004 3.004 0 01-2.25-2.25l3.276-3.276a4.5 4.5 0 00-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437l1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008z"
            />
          </svg>
        </div>

        {/* Message principal */}
        <div className="space-y-4">
          <h2 className="text-3xl lg:text-4xl font-light text-pronovias-black uppercase tracking-wide">
            Site en maintenance
          </h2>
          <p className="text-base lg:text-lg text-pronovias-text-secondary font-light leading-relaxed max-w-xl mx-auto">
            Notre site est actuellement en maintenance pour vous offrir une meilleure expérience.
            Nous serons de retour très prochainement.
          </p>
        </div>

        {/* Informations de contact */}
        <div className="pt-8 border-t border-pronovias-border max-w-md mx-auto">
          <p className="text-sm uppercase tracking-widest text-pronovias-black font-medium mb-4">
            Besoin d'assistance ?
          </p>
          <div className="space-y-2 text-sm text-pronovias-text-secondary">
            <p>
              <a href="mailto:contact@allure-creation.fr" className="hover:text-pronovias-black transition-colors">
                contact@allure-creation.fr
              </a>
            </p>
            <p>
              <a href="tel:+33123456789" className="hover:text-pronovias-black transition-colors">
                +33 1 23 45 67 89
              </a>
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="pt-8">
          <p className="text-xs text-pronovias-text-light">
            © {new Date().getFullYear()} Allure Création. Tous droits réservés.
          </p>
        </div>
      </div>
    </div>
  )
}

// Force dynamic rendering pour que le middleware fonctionne correctement
export const dynamic = 'force-dynamic'
