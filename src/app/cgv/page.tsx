import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'CGV & Mentions Légales - Allure Création',
  description: 'Conditions générales de location et mentions légales d\'Allure Création',
};

export default function CGVPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative h-[250px] bg-black">
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black/70 z-10" />
        <div className="absolute inset-0 flex items-center justify-center z-20">
          <div className="text-center text-white">
            <h1 className="font-serif text-4xl md:text-5xl">CGV & Mentions Légales</h1>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-16">
        {/* Navigation rapide */}
        <nav className="bg-gray-50 p-6 mb-12 rounded-lg">
          <h2 className="font-semibold mb-4">Navigation rapide</h2>
          <ul className="grid md:grid-cols-2 gap-2 text-sm">
            <li>
              <a href="#mentions-legales" className="text-[#D4AF37] hover:underline">1. Mentions Légales</a>
            </li>
            <li>
              <a href="#cgv" className="text-[#D4AF37] hover:underline">2. Conditions Générales de Location</a>
            </li>
            <li>
              <a href="#reservations" className="text-[#D4AF37] hover:underline">3. Réservations</a>
            </li>
            <li>
              <a href="#location" className="text-[#D4AF37] hover:underline">4. Location de Robes</a>
            </li>
            <li>
              <a href="#caution" className="text-[#D4AF37] hover:underline">5. Caution et Paiement</a>
            </li>
            <li>
              <a href="#responsabilite" className="text-[#D4AF37] hover:underline">6. Responsabilité</a>
            </li>
            <li>
              <a href="#donnees" className="text-[#D4AF37] hover:underline">7. Protection des Données</a>
            </li>
            <li>
              <a href="#litiges" className="text-[#D4AF37] hover:underline">8. Litiges</a>
            </li>
          </ul>
        </nav>

        {/* Mentions Légales */}
        <section id="mentions-legales" className="mb-12">
          <h2 className="font-serif text-3xl mb-6 border-b pb-3">1. Mentions Légales</h2>

          <div className="space-y-4 text-gray-700 leading-relaxed">
            <div>
              <h3 className="font-semibold text-lg mb-2">Raison sociale</h3>
              <p>Allure Création SARL</p>
            </div>

            <div>
              <h3 className="font-semibold text-lg mb-2">Siège social</h3>
              <p>123 Avenue des Champs-Élysées<br />75008 Paris, France</p>
            </div>

            <div>
              <h3 className="font-semibold text-lg mb-2">Informations légales</h3>
              <ul className="space-y-1">
                <li>SIRET : 123 456 789 00012</li>
                <li>RCS Paris : 123 456 789</li>
                <li>TVA intracommunautaire : FR12 123456789</li>
                <li>Capital social : 10 000 €</li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-lg mb-2">Contact</h3>
              <ul className="space-y-1">
                <li>Email : <a href="mailto:contact@allure-creation.fr" className="text-[#D4AF37] hover:underline">contact@allure-creation.fr</a></li>
                <li>Téléphone : <a href="tel:+33123456789" className="text-[#D4AF37] hover:underline">+33 1 23 45 67 89</a></li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-lg mb-2">Directeur de publication</h3>
              <p>Directeur Général : [Nom du directeur]</p>
            </div>

            <div>
              <h3 className="font-semibold text-lg mb-2">Hébergement</h3>
              <p>
                Hetzner Online GmbH<br />
                Industriestr. 25<br />
                91710 Gunzenhausen, Allemagne
              </p>
            </div>
          </div>
        </section>

        {/* CGV */}
        <section id="cgv" className="mb-12">
          <h2 className="font-serif text-3xl mb-6 border-b pb-3">2. Conditions Générales de Location</h2>

          <div className="space-y-4 text-gray-700 leading-relaxed">
            <p>
              Les présentes conditions générales de location (CGL) régissent les relations contractuelles
              entre Allure Création SARL et ses clients pour la location de robes.
            </p>
            <p>
              <strong>Allure Création propose exclusivement un service de location de robes.</strong> Toute
              réservation implique l'acceptation sans réserve des présentes CGL.
            </p>
            <p>
              Les essayages et retraits se font uniquement en boutique sur rendez-vous.
            </p>
          </div>
        </section>

        {/* Réservations */}
        <section id="reservations" className="mb-12">
          <h2 className="font-serif text-3xl mb-6 border-b pb-3">3. Réservations et Rendez-vous</h2>

          <div className="space-y-4 text-gray-700 leading-relaxed">
            <h3 className="font-semibold text-lg">3.1 Prise de rendez-vous</h3>
            <p>
              Tous les essayages et retraits de robes se font sur rendez-vous uniquement. Vous pouvez
              prendre rendez-vous :
            </p>
            <ul className="list-disc list-inside space-y-1 ml-4">
              <li>Par téléphone : +33 1 23 45 67 89</li>
              <li>Par email : contact@allure-creation.fr</li>
              <li>Via le formulaire de contact sur notre site</li>
            </ul>

            <h3 className="font-semibold text-lg mt-6">3.2 Réservation de robe</h3>
            <p>
              Après avoir essayé une robe en boutique, vous pouvez la réserver pour votre événement
              en versant un acompte de 30% du prix de location.
            </p>
            <p className="mt-2">
              La réservation est ferme et définitive dès réception de l'acompte. Aucune robe ne peut
              être réservée sans essayage préalable en boutique.
            </p>

            <h3 className="font-semibold text-lg mt-6">3.3 Annulation de rendez-vous</h3>
            <p>
              En cas d'annulation de rendez-vous, merci de nous prévenir au moins 48h à l'avance.
              Les annulations tardives répétées pourront entraîner le refus de nouveaux rendez-vous.
            </p>

            <h3 className="font-semibold text-lg mt-6">3.4 Annulation de réservation</h3>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Plus de 30 jours avant l'événement : remboursement de l'acompte à hauteur de 80%</li>
              <li>Entre 15 et 30 jours : remboursement à hauteur de 50%</li>
              <li>Moins de 15 jours : acompte non remboursable</li>
            </ul>
          </div>
        </section>

        {/* Location */}
        <section id="location" className="mb-12">
          <h2 className="font-serif text-3xl mb-6 border-b pb-3">4. Modalités de Location</h2>

          <div className="space-y-4 text-gray-700 leading-relaxed">
            <h3 className="font-semibold text-lg">4.1 Durée de location</h3>
            <p>
              La durée standard de location est de <strong>4 jours</strong> :
            </p>
            <ul className="list-disc list-inside space-y-1 ml-4">
              <li>Retrait : 2 jours avant l'événement</li>
              <li>Jour de l'événement</li>
              <li>Retour : maximum 1 jour après l'événement</li>
            </ul>
            <p className="mt-3">
              Des extensions sont possibles sur demande avec supplément de 50€ par jour supplémentaire
              (sous réserve de disponibilité).
            </p>

            <h3 className="font-semibold text-lg mt-6">4.2 Retrait en boutique</h3>
            <p>
              Le retrait de la robe se fait exclusivement en boutique aux horaires suivants :
            </p>
            <ul className="list-disc list-inside space-y-1 ml-4">
              <li>Lundi - Vendredi : 12h - 19h</li>
              <li>Samedi : 12h - 18h</li>
              <li>Dimanche : Fermé (sauf sur rendez-vous exceptionnel)</li>
            </ul>
            <p className="mt-3">
              Lors du retrait, un état des lieux détaillé sera effectué et signé par les deux parties.
            </p>

            <h3 className="font-semibold text-lg mt-6">4.3 Retour en boutique</h3>
            <p>
              La robe doit impérativement être retournée en boutique le lendemain de l'événement
              pendant nos horaires d'ouverture. Un retard entraîne des pénalités :
            </p>
            <ul className="list-disc list-inside space-y-1 ml-4">
              <li>Retard de 1 jour : 50€</li>
              <li>Retard de 2-3 jours : 100€</li>
              <li>Au-delà de 3 jours : 100€ + 50€ par jour supplémentaire</li>
            </ul>

            <h3 className="font-semibold text-lg mt-6">4.4 État de la robe</h3>
            <p>
              La robe doit être retournée dans l'état où elle a été remise (usure normale acceptée).
              <strong> Ne pas nettoyer la robe vous-même.</strong> Le nettoyage professionnel est inclus
              dans le prix de location.
            </p>
            <p className="mt-3 font-medium text-gray-900">
              En cas de dommage constaté lors du retour :
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4 mt-2">
              <li>Taches légères (fond de teint, maquillage) : inclus dans le service</li>
              <li>Taches importantes (vin, boue, herbe) : 80€ de frais de nettoyage</li>
              <li>Déchirure mineure (couture) : 150€ de réparation</li>
              <li>Déchirure importante ou brûlure : retenue sur caution au prorata du dommage</li>
              <li>Perte ou vol : valeur totale de la robe retenue sur caution</li>
            </ul>
          </div>
        </section>

        {/* Caution et Paiement */}
        <section id="caution" className="mb-12">
          <h2 className="font-serif text-3xl mb-6 border-b pb-3">5. Caution et Paiement</h2>

          <div className="space-y-4 text-gray-700 leading-relaxed">
            <h3 className="font-semibold text-lg">5.1 Tarifs</h3>
            <p>
              Les prix de location sont indiqués sur notre site et en boutique. Ils comprennent :
            </p>
            <ul className="list-disc list-inside space-y-1 ml-4">
              <li>La location de la robe pour 4 jours</li>
              <li>Le nettoyage professionnel après retour</li>
              <li>Les retouches mineures si nécessaires</li>
              <li>Un sac de transport</li>
            </ul>

            <h3 className="font-semibold text-lg mt-6">5.2 Modalités de paiement</h3>
            <p>Le paiement s'effectue en 2 fois :</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li><strong>À la réservation :</strong> acompte de 30% du prix de location (non remboursable sous 15 jours)</li>
              <li><strong>Au retrait :</strong> solde restant (70%) + caution</li>
            </ul>
            <p className="mt-3">
              Moyens de paiement acceptés : Carte bancaire, espèces, virement bancaire.
            </p>

            <h3 className="font-semibold text-lg mt-6">5.3 Caution</h3>
            <p>
              Une caution est obligatoire pour toute location. Son montant correspond à <strong>50% de
              la valeur d'achat de la robe</strong> (généralement entre 500€ et 2000€ selon la robe).
            </p>
            <p className="mt-3">
              La caution peut être versée par :
            </p>
            <ul className="list-disc list-inside space-y-1 ml-4">
              <li>Empreinte carte bancaire (préféré)</li>
              <li>Chèque de caution (encaissé uniquement en cas de dommage)</li>
              <li>Virement bancaire</li>
            </ul>
            <p className="mt-3 font-medium text-gray-900">
              La caution sera restituée dans un délai de <strong>7 jours ouvrés</strong> après le
              retour de la robe en bon état, déduction faite des éventuels dommages constatés.
            </p>

            <h3 className="font-semibold text-lg mt-6">5.4 Pièces justificatives</h3>
            <p>
              Lors du retrait de la robe, vous devrez présenter :
            </p>
            <ul className="list-disc list-inside space-y-1 ml-4">
              <li>Pièce d'identité en cours de validité</li>
              <li>Justificatif de domicile de moins de 3 mois</li>
              <li>Carte bancaire pour la caution</li>
            </ul>
          </div>
        </section>

        {/* Responsabilité */}
        <section id="responsabilite" className="mb-12">
          <h2 className="font-serif text-3xl mb-6 border-b pb-3">6. Responsabilité du Client</h2>

          <div className="space-y-4 text-gray-700 leading-relaxed">
            <p>
              En louant une robe chez Allure Création, vous vous engagez à :
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Prendre soin de la robe comme si elle vous appartenait</li>
              <li>Ne pas modifier, couper ou altérer la robe de quelque manière que ce soit</li>
              <li>Ne pas sous-louer ou prêter la robe à une tierce personne</li>
              <li>Éviter tout contact avec des produits pouvant tacher (huile, alcool, cosmétiques foncés)</li>
              <li>Ranger la robe dans le sac fourni après utilisation</li>
              <li>Signaler immédiatement tout dommage survenu pendant la location</li>
              <li>Souscrire une assurance personnelle si vous le jugez nécessaire</li>
            </ul>
            <p className="mt-4">
              Allure Création décline toute responsabilité en cas de dommage causé à des tiers par
              le port de la robe louée.
            </p>
          </div>
        </section>

        {/* Protection des données */}
        <section id="donnees" className="mb-12">
          <h2 className="font-serif text-3xl mb-6 border-b pb-3">7. Protection des Données Personnelles</h2>

          <div className="space-y-4 text-gray-700 leading-relaxed">
            <h3 className="font-semibold text-lg">7.1 Collecte des données</h3>
            <p>
              Conformément au RGPD, nous collectons uniquement les données nécessaires à la gestion
              de votre location : nom, prénom, adresse, email, téléphone, copie de pièce d'identité.
            </p>

            <h3 className="font-semibold text-lg mt-6">7.2 Utilisation des données</h3>
            <p>Vos données sont utilisées pour :</p>
            <ul className="list-disc list-inside space-y-1 ml-4">
              <li>Gérer votre réservation et location</li>
              <li>Vous contacter concernant votre rendez-vous</li>
              <li>Gérer la caution et le paiement</li>
              <li>Améliorer nos services</li>
            </ul>

            <h3 className="font-semibold text-lg mt-6">7.3 Vos droits</h3>
            <p>Vous disposez des droits suivants :</p>
            <ul className="list-disc list-inside space-y-1 ml-4">
              <li>Droit d'accès à vos données</li>
              <li>Droit de rectification</li>
              <li>Droit à l'effacement</li>
              <li>Droit d'opposition</li>
              <li>Droit à la portabilité</li>
            </ul>
            <p className="mt-4">
              Pour exercer ces droits, contactez-nous à :
              <a href="mailto:rgpd@allure-creation.fr" className="text-[#D4AF37] hover:underline ml-1">
                rgpd@allure-creation.fr
              </a>
            </p>

            <h3 className="font-semibold text-lg mt-6">7.4 Conservation</h3>
            <p>
              Vos données sont conservées pendant 3 ans à compter de votre dernière location,
              conformément aux obligations légales et comptables.
            </p>
          </div>
        </section>

        {/* Litiges */}
        <section id="litiges" className="mb-12">
          <h2 className="font-serif text-3xl mb-6 border-b pb-3">8. Litiges et Réclamations</h2>

          <div className="space-y-4 text-gray-700 leading-relaxed">
            <h3 className="font-semibold text-lg">8.1 Règlement amiable</h3>
            <p>
              En cas de litige, nous vous invitons à nous contacter en priorité pour trouver
              une solution amiable : <a href="mailto:reclamation@allure-creation.fr" className="text-[#D4AF37] hover:underline">reclamation@allure-creation.fr</a>
            </p>

            <h3 className="font-semibold text-lg mt-6">8.2 Médiation</h3>
            <p>
              Conformément à l'article L.612-1 du Code de la consommation, vous pouvez recourir
              gratuitement au médiateur de la consommation :
            </p>
            <p className="mt-2">
              Médiateur de la consommation CNPM - MEDIATION DE LA CONSOMMATION<br />
              27 avenue de la Libération, 42400 Saint-Chamond<br />
              <a href="https://cnpm-mediation-consommation.eu" className="text-[#D4AF37] hover:underline">
                cnpm-mediation-consommation.eu
              </a>
            </p>

            <h3 className="font-semibold text-lg mt-6">8.3 Droit applicable</h3>
            <p>
              Les présentes CGL sont soumises au droit français. En cas de litige non résolu à l'amiable,
              les tribunaux français seront seuls compétents.
            </p>
          </div>
        </section>

        {/* Force majeure */}
        <section className="mb-12">
          <h2 className="font-serif text-3xl mb-6 border-b pb-3">9. Force Majeure</h2>

          <div className="space-y-4 text-gray-700 leading-relaxed">
            <p>
              En cas de force majeure (catastrophe naturelle, pandémie, guerre, etc.) empêchant
              la tenue de votre événement ou la location de la robe, les modalités suivantes s'appliquent :
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Report de la location sans frais sur une autre date (sous réserve de disponibilité)</li>
              <li>Annulation avec remboursement intégral de l'acompte et de la caution</li>
            </ul>
            <p className="mt-3">
              La force majeure doit être justifiée par un document officiel (interdiction gouvernementale,
              certificat médical, etc.).
            </p>
          </div>
        </section>

        {/* Mise à jour */}
        <div className="bg-gray-50 p-6 rounded-lg text-sm text-gray-600">
          <p><strong>Dernière mise à jour :</strong> 30 novembre 2025</p>
          <p className="mt-2">
            Ces conditions peuvent être modifiées à tout moment. Nous vous invitons à les consulter
            régulièrement. Les modifications entrent en vigueur dès leur publication sur le site.
          </p>
        </div>
      </div>
    </div>
  );
}
