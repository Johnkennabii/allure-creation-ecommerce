'use client';

import { useState } from 'react';

interface FAQItem {
  question: string;
  answer: string;
  category: 'general' | 'reservation' | 'location' | 'paiement' | 'autre';
}

const faqData: FAQItem[] = [
  // GÉNÉRAL
  {
    category: 'general',
    question: 'Comment fonctionne la location de robes chez Allure Création ?',
    answer: 'Nous proposons exclusivement un service de location de robes. Vous prenez rendez-vous, essayez les robes en boutique, puis réservez celle de votre choix pour votre événement. Vous la retirez 2 jours avant l\'événement et la retournez le lendemain.',
  },
  {
    category: 'general',
    question: 'Puis-je acheter une robe au lieu de la louer ?',
    answer: 'Pour l\'instant, nous proposons uniquement un service de location. Certaines robes peuvent exceptionnellement être disponibles à l\'achat - renseignez-vous directement en boutique.',
  },
  {
    category: 'general',
    question: 'Quels types de robes proposez-vous ?',
    answer: 'Notre collection comprend des robes de mariée (occidentales et orientales), des caftans, takchitas, karakous, et des robes de soirée pour tous types d\'événements.',
  },
  {
    category: 'general',
    question: 'Où se trouve votre boutique ?',
    answer: '123 Avenue des Champs-Élysées, 75008 Paris, France. Ouvert du lundi au samedi (sur rendez-vous).',
  },

  // RÉSERVATION
  {
    category: 'reservation',
    question: 'Comment prendre rendez-vous pour un essayage ?',
    answer: 'Vous pouvez prendre rendez-vous par téléphone (+33 1 23 45 67 89), par email (contact@allure-creation.fr), ou via le formulaire de contact sur notre site. Les essayages se font uniquement sur rendez-vous.',
  },
  {
    category: 'reservation',
    question: 'Puis-je réserver une robe sans l\'avoir essayée ?',
    answer: 'Non, aucune robe ne peut être réservée sans essayage préalable en boutique. Cela garantit que la robe vous va parfaitement et correspond à vos attentes.',
  },
  {
    category: 'reservation',
    question: 'Combien de temps à l\'avance dois-je réserver ?',
    answer: 'Nous recommandons de réserver au moins 1 mois à l\'avance pour les robes de soirée, et 2-3 mois pour les robes de mariée. En haute saison (mai-septembre), réservez encore plus tôt.',
  },
  {
    category: 'reservation',
    question: 'Puis-je essayer plusieurs robes lors de mon rendez-vous ?',
    answer: 'Absolument ! Lors de votre rendez-vous, vous pouvez essayer autant de robes que vous le souhaitez dans votre taille. Nous vous accompagnons pour trouver LA robe parfaite.',
  },
  {
    category: 'reservation',
    question: 'Que se passe-t-il si je dois annuler ma réservation ?',
    answer: 'Plus de 30 jours avant l\'événement : remboursement de 80% de l\'acompte. Entre 15 et 30 jours : 50%. Moins de 15 jours : acompte non remboursable. En cas de force majeure justifiée, remboursement intégral.',
  },

  // LOCATION
  {
    category: 'location',
    question: 'Combien de jours dure la location ?',
    answer: 'La location standard est de 4 jours : retrait 2 jours avant l\'événement, jour J, et retour le lendemain. Des extensions sont possibles moyennant 50€/jour supplémentaire.',
  },
  {
    category: 'location',
    question: 'Que comprend le prix de location ?',
    answer: 'Le prix inclut : la location pour 4 jours, le nettoyage professionnel après retour, les retouches mineures si nécessaires, et un sac de transport.',
  },
  {
    category: 'location',
    question: 'Dois-je nettoyer la robe avant de la rendre ?',
    answer: 'Non, surtout pas ! Le nettoyage professionnel est inclus dans le prix. Retournez simplement la robe dans le sac fourni.',
  },
  {
    category: 'location',
    question: 'Que se passe-t-il si je tache ou abîme la robe ?',
    answer: 'Les taches légères (maquillage, fond de teint) sont incluses dans le service. Les taches importantes coûtent 80€. Les déchirures varient de 150€ à une retenue sur caution selon la gravité. Voir nos CGV pour le détail.',
  },
  {
    category: 'location',
    question: 'Puis-je faire des retouches sur la robe louée ?',
    answer: 'Les retouches mineures (ourlet, pinces) sont incluses et effectuées par nos soins lors du retrait. Toute modification de la robe par vos soins est interdite.',
  },
  {
    category: 'location',
    question: 'Que faire si la robe est volée ou perdue ?',
    answer: 'En cas de vol ou perte, la valeur totale de la robe sera retenue sur votre caution. Nous vous conseillons de souscrire une assurance personnelle si vous le jugez nécessaire.',
  },

  // PAIEMENT
  {
    category: 'paiement',
    question: 'Comment s\'effectue le paiement ?',
    answer: 'Paiement en 2 fois : 30% d\'acompte à la réservation, puis 70% restant + caution au retrait. Moyens acceptés : CB, espèces, virement.',
  },
  {
    category: 'paiement',
    question: 'Qu\'est-ce que la caution et à combien s\'élève-t-elle ?',
    answer: 'La caution représente 50% de la valeur d\'achat de la robe (entre 500€ et 2000€ selon la robe). Elle est restituée sous 7 jours après le retour en bon état, déduction faite des éventuels dommages.',
  },
  {
    category: 'paiement',
    question: 'Comment est restituée la caution ?',
    answer: 'La caution est restituée dans les 7 jours ouvrés suivant le retour de la robe en bon état, par le même moyen de paiement utilisé (remboursement CB ou retour de chèque).',
  },
  {
    category: 'paiement',
    question: 'Proposez-vous un paiement en plusieurs fois ?',
    answer: 'Oui, pour les locations supérieures à 500€, nous proposons un paiement en 2 ou 3 fois sans frais. Renseignez-vous en boutique.',
  },

  // AUTRE
  {
    category: 'autre',
    question: 'Proposez-vous des accessoires avec les robes ?',
    answer: 'Oui, nous proposons une sélection d\'accessoires (voiles, ceintures, bijoux) en location ou à l\'achat. Demandez conseil lors de votre essayage.',
  },
  {
    category: 'autre',
    question: 'Puis-je venir accompagnée lors de mon essayage ?',
    answer: 'Bien sûr ! Vous pouvez venir avec 2-3 personnes de confiance. Pour des groupes plus importants, prévenez-nous à l\'avance.',
  },
  {
    category: 'autre',
    question: 'Faites-vous de la création sur-mesure ?',
    answer: 'Oui, nous proposons un service de création sur-mesure. Prenez rendez-vous pour discuter de votre projet avec notre styliste.',
  },
  {
    category: 'autre',
    question: 'Combien de temps dure un rendez-vous d\'essayage ?',
    answer: 'Comptez entre 1h et 1h30 pour un essayage. Nous prenons le temps nécessaire pour que vous trouviez la robe parfaite en toute sérénité.',
  },
  {
    category: 'autre',
    question: 'Livrez-vous les robes à domicile ?',
    answer: 'Non, le retrait et le retour se font exclusivement en boutique. Cela nous permet de faire un état des lieux précis et de vous conseiller lors du retrait.',
  },
];

const categories = {
  general: 'Général',
  reservation: 'Réservation',
  location: 'Location',
  paiement: 'Paiement & Caution',
  autre: 'Autres questions',
};

export default function FAQPage() {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredFAQs = faqData.filter((faq) => {
    const matchesCategory = activeCategory === 'all' || faq.category === activeCategory;
    const matchesSearch =
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative h-[300px] bg-black">
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black/70 z-10" />
        <div className="absolute inset-0 flex items-center justify-center z-20">
          <div className="text-center text-white px-4">
            <h1 className="font-serif text-5xl md:text-6xl mb-4">FAQ</h1>
            <p className="text-lg md:text-xl text-white/90">
              Questions fréquemment posées
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-16">
        {/* Recherche */}
        <div className="mb-8">
          <div className="relative">
            <input
              type="text"
              placeholder="Rechercher une question..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-5 py-4 border-2 border-gray-200 focus:border-[#D4AF37] outline-none transition-colors rounded-lg"
            />
            <svg
              className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>

        {/* Filtres par catégorie */}
        <div className="flex flex-wrap gap-2 mb-12">
          <button
            onClick={() => setActiveCategory('all')}
            className={`px-4 py-2 rounded-full transition-colors ${
              activeCategory === 'all'
                ? 'bg-black text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Toutes
          </button>
          {Object.entries(categories).map(([key, label]) => (
            <button
              key={key}
              onClick={() => setActiveCategory(key)}
              className={`px-4 py-2 rounded-full transition-colors ${
                activeCategory === key
                  ? 'bg-black text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Résultats */}
        {filteredFAQs.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500">Aucune question ne correspond à votre recherche.</p>
            <button
              onClick={() => {
                setSearchQuery('');
                setActiveCategory('all');
              }}
              className="mt-4 text-[#D4AF37] hover:underline"
            >
              Réinitialiser les filtres
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredFAQs.map((faq, index) => (
              <div
                key={index}
                className="border border-gray-200 rounded-lg overflow-hidden hover:border-[#D4AF37] transition-colors"
              >
                <button
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  className="w-full px-6 py-5 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                >
                  <div className="flex-1">
                    <span className="text-xs font-medium text-[#D4AF37] uppercase tracking-wide">
                      {categories[faq.category]}
                    </span>
                    <h3 className="font-medium text-lg mt-1">{faq.question}</h3>
                  </div>
                  <svg
                    className={`w-5 h-5 text-gray-400 transition-transform flex-shrink-0 ml-4 ${
                      openIndex === index ? 'transform rotate-180' : ''
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>
                {openIndex === index && (
                  <div className="px-6 pb-5 text-gray-700 leading-relaxed border-t border-gray-100 pt-4">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Contact CTA */}
        <div className="mt-16 bg-gray-50 rounded-lg p-8 text-center">
          <h2 className="font-serif text-2xl mb-3">Vous ne trouvez pas la réponse ?</h2>
          <p className="text-gray-600 mb-6">
            Notre équipe se fera un plaisir de répondre à toutes vos questions
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/contact"
              className="bg-black text-white px-6 py-3 hover:bg-gray-900 transition-colors inline-block"
            >
              Nous contacter
            </a>
            <a
              href="tel:+33123456789"
              className="border-2 border-black text-black px-6 py-3 hover:bg-black hover:text-white transition-colors inline-block"
            >
              +33 1 23 45 67 89
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
