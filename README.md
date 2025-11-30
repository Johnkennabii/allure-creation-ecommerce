# Allure Création - E-commerce de Robes Élégantes

Site e-commerce moderne pour la **location et la vente de robes haut de gamme**, construit avec Medusa.js et Next.js 15, inspiré du design élégant de Pronovias.

<p align="center">
  <img src="public/hero.jpg" alt="Allure Création" />
</p>

## Fonctionnalités

### E-commerce Complet (Medusa.js)
- ✅ **Catalogue produits** avec filtres avancés
- ✅ **Pages détail produit** avec galerie d'images
- ✅ **Gestion du panier** persistant
- ✅ **Processus de paiement** sécurisé (Stripe)
- ✅ **Comptes clients** avec historique de commandes
- ✅ **Collections** et catégories organisées
- ✅ **Dashboard admin** complet

### Fonctionnalités Métier
- 🔄 **Système de location** avec dates (à finaliser)
- 📅 **Prise de rendez-vous** en boutique (prévu)
- 🗺️ **Localisation des boutiques** (prévu)
- ❤️ **Wishlist** personnalisée (prévu)
- 👗 **Catégories spécialisées**:
  - Robes de Mariée
  - Robes de Soirée
  - Robes de Cocktail
  - Robes de Cérémonie

### Design & UX (Inspiré de Pronovias)
- 🎨 **Design élégant** noir et blanc
- 📱 **100% Responsive**
- ⚡ **Performance optimale** avec Next.js 15
- 🖼️ **Images haute résolution**
- ✨ **Animations fluides**

## Stack Technique

### Frontend
- **Next.js 15** - App Router, Server Components, Server Actions
- **React 19** - Dernière version avec RSC
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling utilitaire
- **@medusajs/ui** - Composants UI optimisés
- **Stripe** - Paiements sécurisés

### Backend
- **Medusa.js** - Framework e-commerce headless
- **PostgreSQL** - Base de données
- **Node.js** - Runtime

## Démarrage Rapide

### Prérequis

- Node.js 18+
- PostgreSQL
- Yarn (recommandé) ou npm

### 1. Installation du Backend Medusa

```bash
# Installation rapide
npx create-medusa-app@latest

# Suivez les instructions pour:
# - Nom du projet: allure-creation-backend
# - Template: Default (ou Demo store pour les données de test)
# - Database: PostgreSQL
```

Plus de détails dans **[SETUP.md](./SETUP.md)**

### 2. Configuration du Frontend

```bash
# Les dépendances sont déjà installées
# Vérifiez juste le fichier .env.local

yarn dev
```

Le site sera accessible sur **http://localhost:8000**

### 3. Dashboard Admin

Accédez à **http://localhost:9000/app** pour:
- Ajouter des produits
- Gérer les catégories
- Voir les commandes
- Configurer les paiements

## Configuration

### Variables d'environnement (.env.local)

```env
# Backend Medusa
MEDUSA_BACKEND_URL=http://localhost:9000

# Clés publiques
NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY=pk_test
NEXT_PUBLIC_BASE_URL=http://localhost:8000
NEXT_PUBLIC_DEFAULT_REGION=fr

# Stripe (à configurer)
NEXT_PUBLIC_STRIPE_KEY=pk_test_votre_cle
```

### Intégration avec votre API Hetzner

Si vous avez déjà un backend sur Hetzner, vous pouvez:

1. **Option A**: Migrer vers Medusa pour bénéficier de toutes les fonctionnalités
2. **Option B**: Créer un adaptateur pour connecter Medusa à votre API existante
3. **Option C**: Installer Medusa sur votre serveur Hetzner

Voir **[SETUP.md](./SETUP.md)** pour plus de détails.

## Structure du Projet

```
.
├── src/
│   ├── app/                      # Next.js App Router
│   │   └── [countryCode]/       # Routes par pays (fr, us, etc.)
│   │       ├── (main)/          # Pages principales
│   │       │   ├── page.tsx     # Page d'accueil
│   │       │   ├── store/       # Catalogue
│   │       │   ├── products/    # Détails produits
│   │       │   └── collections/ # Collections
│   │       ├── cart/            # Panier
│   │       ├── checkout/        # Paiement
│   │       └── account/         # Compte client
│   ├── modules/                  # Composants fonctionnels
│   │   ├── products/            # Carte produit, listes
│   │   ├── cart/                # Composants panier
│   │   ├── checkout/            # Formulaires paiement
│   │   ├── account/             # Profil utilisateur
│   │   └── layout/              # Header, Footer, Nav
│   ├── lib/                      # Utilitaires
│   │   ├── data/                # Appels API Medusa
│   │   ├── hooks/               # Custom React hooks
│   │   └── util/                # Fonctions utilitaires
│   └── styles/                   # Styles globaux
├── public/                       # Images et assets
├── SETUP.md                      # Guide de configuration détaillé
└── README.md                     # Ce fichier
```

## Personnalisation du Design (Inspiration Pronovias)

### Déjà implémenté
- Navigation propre et élégante
- Mise en page épurée
- Cards produits élégantes

### À venir
- [ ] Hero section avec vidéo/slider
- [ ] Typographie personnalisée (Serif élégante)
- [ ] Filtres visuels avancés
- [ ] Animations au scroll
- [ ] Mode sombre élégant
- [ ] Galeries interactives

## Système de Location

Pour implémenter la location de robes:

### 1. Ajouter des métadonnées aux produits

Dans le dashboard admin, pour chaque produit:
```json
{
  "rental_available": true,
  "rental_price_per_day": 89,
  "rental_deposit": 200,
  "rental_min_days": 3
}
```

### 2. Créer un module de location personnalisé

```typescript
// src/modules/rental/
// - Sélecteur de dates
// - Calcul du prix
// - Vérification disponibilité
// - Gestion des réservations
```

Documentation complète dans **[SETUP.md](./SETUP.md)**

## Scripts Disponibles

### Frontend (Next.js)
```bash
yarn dev          # Développement (port 8000)
yarn build        # Build de production
yarn start        # Production
yarn lint         # Lint
```

### Backend (Medusa)
```bash
npm run dev       # Développement (port 9000)
npm run build     # Build
npm run seed      # Données de test
```

## Déploiement sur Hetzner

### 1. Backend Medusa

```bash
# Installation sur le serveur
ssh user@votre-serveur.com
git clone votre-repo-backend
cd allure-creation-backend
npm install
npm run build

# Avec PM2
pm2 start npm --name "allure-backend" -- start
pm2 save
pm2 startup
```

### 2. Frontend Next.js

```bash
# Build et déploiement
yarn build
pm2 start yarn --name "allure-frontend" -- start
```

### 3. Configuration Nginx

```nginx
server {
    server_name api.allure-creation.fr;
    location / {
        proxy_pass http://localhost:9000;
    }
}

server {
    server_name allure-creation.fr;
    location / {
        proxy_pass http://localhost:8000;
    }
}
```

Plus de détails dans **[SETUP.md](./SETUP.md)**

## Intégration Stripe

1. Créer un compte sur https://stripe.com
2. Récupérer les clés API (test puis production)
3. Ajouter dans `.env.local`:
   ```env
   NEXT_PUBLIC_STRIPE_KEY=pk_test_...
   ```
4. Configurer les webhooks Stripe → Medusa

Documentation: https://docs.medusajs.com/resources/commerce-modules/payment/payment-provider/stripe

## Prochaines Étapes

### Phase 1: Configuration Initiale ✅
- [x] Installer le starter Medusa
- [x] Configurer l'environnement
- [x] Créer la documentation

### Phase 2: Contenu & Produits ⏳
- [ ] Démarrer le backend Medusa
- [ ] Créer les catégories dans l'admin
- [ ] Ajouter les premiers produits
- [ ] Uploader les images haute résolution

### Phase 3: Personnalisation Design 🎨
- [ ] Personnaliser la page d'accueil (hero Pronovias-style)
- [ ] Adapter les composants produits
- [ ] Personnaliser la navigation
- [ ] Ajouter les animations

### Phase 4: Fonctionnalités Métier 👗
- [ ] Implémenter le système de location
- [ ] Ajouter le calendrier de réservation
- [ ] Créer le système de prise de rendez-vous
- [ ] Intégrer la wishlist

### Phase 5: Production 🚀
- [ ] Tests complets
- [ ] Optimisation SEO
- [ ] Déploiement sur Hetzner
- [ ] Configuration SSL
- [ ] Formation à l'utilisation

## Ressources

### Documentation
- **Medusa**: https://docs.medusajs.com
- **Next.js**: https://nextjs.org/docs
- **Tailwind**: https://tailwindcss.com/docs

### Support
- **Medusa Discord**: https://discord.gg/medusajs
- **GitHub Issues**: https://github.com/medusajs/nextjs-starter-medusa/issues

### Inspiration Design
- **Pronovias**: https://www.pronovias.com/fr/
- **Design élégant** avec focus sur les visuels
- **Navigation intuitive** par catégories

## Licence

© 2024 Allure Création. Tous droits réservés.

---

**Prêt à commencer ?** Suivez les instructions dans **[SETUP.md](./SETUP.md)** pour démarrer le backend Medusa et commencer à personnaliser votre site ! 👗✨
