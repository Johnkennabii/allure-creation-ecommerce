# Allure Création - E-commerce

Site e-commerce moderne pour la location et vente de robes de mariée, soirée et cocktail. Inspiré du design élégant de Pronovias.

## 🚀 Technologies

- **Next.js 15** - Framework React avec App Router
- **TypeScript** - Typage statique
- **Tailwind CSS** - Styling moderne et responsive
- **API Hetzner** - Backend existant pour la gestion des robes

## 📁 Structure du Projet

```
src/
├── app/                    # Pages Next.js (App Router)
│   ├── layout.tsx         # Layout principal
│   ├── page.tsx           # Page d'accueil
│   ├── globals.css        # Styles globaux
│   └── robes/
│       └── page.tsx       # Catalogue des robes
├── components/            # Composants réutilisables
│   ├── Header.tsx        # En-tête avec navigation
│   ├── Hero.tsx          # Section hero
│   ├── Footer.tsx        # Pied de page
│   ├── DressGrid.tsx     # Grille de robes
│   └── DressFilters.tsx  # Filtres de recherche
└── lib/
    └── api.ts            # Service API Hetzner
```

## 🎨 Design

Le design s'inspire de Pronovias avec :
- **Typographie élégante** : Cormorant Garamond pour les titres, Inter pour le corps
- **Palette noir/blanc** : Élégance et sophistication
- **Accent doré** : Touches de luxe (#D4AF37)
- **Animations fluides** : Transitions et hover effects
- **Responsive** : Optimisé mobile, tablette et desktop

## 🔧 Installation

1. Cloner le repository :
```bash
git clone https://github.com/Johnkennabii/allure-creation-ecommerce.git
cd allure-creation-ecommerce
```

2. Installer les dépendances :
```bash
npm install
```

3. Configurer les variables d'environnement :
```bash
cp .env.example .env.local
```

Éditer `.env.local` et ajouter votre token API :
```env
NEXT_PUBLIC_API_TOKEN=your_api_token_here
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

4. Lancer le serveur de développement :
```bash
npm run dev
```

Le site sera accessible sur [http://localhost:3000](http://localhost:3000)

## 📡 API Hetzner

L'application se connecte à l'API existante sur Hetzner :

**Endpoint principal :** `https://api.allure-creation.fr/dresses/details-view`

### Filtres disponibles :
- `page` - Numéro de page
- `limit` - Nombre de résultats
- `search` - Recherche par nom/référence
- `types` - Filtrer par type (mariée, soirée, cocktail)
- `sizes` - Filtrer par taille
- `colors` - Filtrer par couleur
- `priceMax` - Prix maximum d'achat
- `pricePerDayMax` - Prix maximum de location/jour

### Authentification :
Toutes les requêtes nécessitent un Bearer token dans le header :
```
Authorization: Bearer YOUR_TOKEN
```

## 📄 Pages

### Page d'accueil (`/`)
- Hero section avec call-to-actions
- Showcase des 3 catégories principales
- Section CTA pour prise de rendez-vous

### Catalogue (`/robes`)
- Grille de robes avec images
- Filtres par type, taille, couleur
- Recherche par nom/référence
- Prix d'achat et location affichés
- Seules les robes avec `published_post: true` sont affichées

## 🎯 Fonctionnalités Principales

✅ **Catalogue complet** avec filtres avancés
✅ **Design responsive** mobile-first
✅ **Intégration API** Hetzner existante
✅ **Navigation élégante** inspirée de Pronovias
✅ **Affichage prix** achat et location
✅ **Filtres couleurs** avec swatches visuels
✅ **Images optimisées** avec Next.js Image

## 🔜 À venir

- [ ] Page détail d'une robe (`/robes/[id]`)
- [ ] Système de panier
- [ ] Sélection de dates de location
- [ ] Authentification utilisateur
- [ ] Paiement Stripe
- [ ] Système de favoris
- [ ] Recherche avancée
- [ ] Pages statiques (À propos, Contact, CGV)

## 🛠 Commandes

```bash
# Développement
npm run dev

# Build production
npm run build

# Démarrer en production
npm start

# Linting
npm run lint
```

## 📝 Notes

- L'ancien projet basé sur Medusa a été sauvegardé dans `allure-creation-ecommerce-backup-medusa/`
- Ce nouveau projet est créé from scratch pour s'adapter à votre API Hetzner existante
- Les images de placeholder utilisent Unsplash, à remplacer par vos vraies images

## 👤 Auteur

Allure Création

## 📄 License

Propriétaire - Tous droits réservés
