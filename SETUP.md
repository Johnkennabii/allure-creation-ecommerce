# Guide de Configuration - Allure Création E-commerce

Ce projet utilise **Medusa.js** comme backend e-commerce et **Next.js 15** pour le frontend.

## Architecture

```
┌─────────────────────┐     ┌──────────────────────┐
│  Next.js Frontend   │────▶│  Medusa Backend API  │
│  (localhost:8000)   │     │  (localhost:9000)    │
└─────────────────────┘     └──────────────────────┘
                                       │
                                       ▼
                                 PostgreSQL DB
```

## Étape 1: Installation du Backend Medusa

Vous avez **deux options** pour le backend:

### Option A: Nouveau Backend Medusa Local (Recommandé pour commencer)

1. **Installation rapide avec create-medusa-app**

Ouvrez un nouveau terminal et exécutez:

```bash
cd ~
npx create-medusa-app@latest
```

Lors de l'installation, répondez:
- **Project name**: `allure-creation-backend`
- **Starter template**: Default (ou Demo store pour avoir des données de test)
- **Database**: PostgreSQL (recommandé)
- **PostgreSQL database name**: `allure_creation`
- **Admin user email**: votre-email@exemple.com
- **Admin password**: votre-mot-de-passe

2. **Démarrer le backend**

```bash
cd allure-creation-backend
npm run dev
```

Le backend sera accessible sur **http://localhost:9000**

3. **Accéder au dashboard admin**

Ouvrez **http://localhost:9000/app** dans votre navigateur
- Email: celui que vous avez configuré
- Mot de passe: celui que vous avez configuré

### Option B: Adapter votre API existante sur Hetzner

Si vous souhaitez utiliser votre API existante, vous devrez:

1. **Installer Medusa sur votre serveur Hetzner**
2. **Migrer vos données** (robes, clients, contrats) vers le format Medusa
3. **Configurer les endpoints** pour correspondre à l'API Medusa

Documentation: https://docs.medusajs.com/learn/deployment

## Étape 2: Configuration du Frontend

Le frontend est déjà configuré dans ce dossier.

1. **Vérifier la configuration**

Le fichier `.env.local` contient:
```env
MEDUSA_BACKEND_URL=http://localhost:9000
NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY=pk_test
NEXT_PUBLIC_BASE_URL=http://localhost:8000
NEXT_PUBLIC_DEFAULT_REGION=fr
```

2. **Démarrer le frontend**

```bash
yarn dev
```

Le site sera accessible sur **http://localhost:8000**

## Étape 3: Configuration des Produits (Admin Dashboard)

Une fois les deux serveurs démarrés:

1. **Connectez-vous au dashboard admin**: http://localhost:9000/app

2. **Créer les catégories**
   - Allez dans "Products" > "Categories"
   - Créez les catégories:
     - Robes de Mariée
     - Robes de Soirée
     - Robes de Cocktail
     - Robes de Cérémonie
     - Accessoires

3. **Créer les collections** (optionnel)
   - Collections Exclusives
   - Nouvelle Collection 2025
   - Best Sellers

4. **Ajouter des produits**
   - Allez dans "Products" > "Add Product"
   - Remplissez les informations:
     - Nom
     - Description
     - Prix
     - Images
     - Catégorie
     - Variants (tailles, couleurs)

## Étape 4: Configuration des Paiements (Stripe)

1. **Créer un compte Stripe** (si vous n'en avez pas): https://stripe.com

2. **Récupérer vos clés API**
   - Allez dans votre dashboard Stripe
   - Copiez votre clé publique de test

3. **Ajouter dans `.env.local`**:
```env
NEXT_PUBLIC_STRIPE_KEY=pk_test_votre_cle_publique
```

4. **Configurer Stripe dans Medusa**
   - Documentation: https://docs.medusajs.com/resources/commerce-modules/payment/payment-provider/stripe

## Étape 5: Personnalisation du Design (Inspiré de Pronovias)

Les modifications à venir incluront:

### Design Visuel
- [x] Fond noir/blanc élégant
- [ ] Typographie raffinée
- [ ] Espacement généreux
- [ ] Visuels haute résolution
- [ ] Sliders vidéo

### Fonctionnalités
- [x] Navigation par catégories
- [x] Filtres avancés
- [ ] Système de wishlist
- [ ] Prise de rendez-vous
- [ ] Localisation boutiques
- [ ] Système de location avec dates

## Structure du Projet

```
.
├── src/
│   ├── app/                    # Pages Next.js (App Router)
│   │   └── [countryCode]/     # Routes dynamiques par pays
│   ├── lib/                    # Utilitaires et configurations
│   │   ├── config.ts          # Configuration générale
│   │   ├── data/              # Appels API Medusa
│   │   └── hooks/             # Custom React hooks
│   ├── modules/               # Modules fonctionnels
│   │   ├── account/           # Espace client
│   │   ├── cart/              # Panier
│   │   ├── checkout/          # Processus de paiement
│   │   ├── products/          # Produits
│   │   └── collections/       # Collections
│   ├── styles/                # Styles globaux
│   └── types/                 # Types TypeScript
├── public/                     # Fichiers statiques
└── .env.local                 # Variables d'environnement
```

## Commandes Utiles

### Frontend (Next.js)
```bash
yarn dev          # Démarrer en développement
yarn build        # Build de production
yarn start        # Démarrer en production
yarn lint         # Linter le code
```

### Backend (Medusa)
```bash
npm run dev       # Démarrer en développement
npm run build     # Build
npm run start     # Démarrer en production
npm run seed      # Peupler la base avec des données de test
```

## Système de Location - À Implémenter

Pour le système de location spécifique à votre cas d'usage:

1. **Créer un variant "Location"** pour chaque produit
2. **Ajouter des métadonnées**:
   - `rental_price_per_day`
   - `available_for_rental`
   - `rental_deposit`

3. **Créer un module custom** pour gérer:
   - Les dates de location
   - La disponibilité
   - Les réservations

Documentation: https://docs.medusajs.com/learn/customization

## Déploiement sur Hetzner

### Backend Medusa

1. **Avec Docker**:
```bash
# Créer Dockerfile dans votre backend
docker build -t allure-backend .
docker run -p 9000:9000 allure-backend
```

2. **Avec PM2**:
```bash
npm install -g pm2
pm2 start npm --name "allure-backend" -- start
pm2 save
pm2 startup
```

### Frontend Next.js

1. **Build**:
```bash
yarn build
```

2. **Démarrer avec PM2**:
```bash
pm2 start yarn --name "allure-frontend" -- start
```

### Configuration Nginx

```nginx
# Backend API
server {
    listen 80;
    server_name api.votre-domaine.com;

    location / {
        proxy_pass http://localhost:9000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}

# Frontend
server {
    listen 80;
    server_name votre-domaine.com;

    location / {
        proxy_pass http://localhost:8000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

## Prochaines Étapes

1. ✅ Backend Medusa installé et démarré
2. ✅ Frontend Next.js configuré
3. ⏳ Ajouter les produits via le dashboard admin
4. ⏳ Personnaliser le design (inspiration Pronovias)
5. ⏳ Implémenter le système de location
6. ⏳ Configurer Stripe pour les paiements
7. ⏳ Tester tout le parcours client
8. ⏳ Déployer sur Hetzner

## Support

- **Medusa Docs**: https://docs.medusajs.com
- **Next.js Docs**: https://nextjs.org/docs
- **Medusa Discord**: https://discord.gg/medusajs
- **Votre API existante**: Contactez votre équipe backend pour l'intégration

## Problèmes Courants

### Le backend ne démarre pas
- Vérifiez que PostgreSQL est installé et démarré
- Vérifiez les credentials dans le fichier `.env` du backend

### Le frontend ne se connecte pas au backend
- Vérifiez que `MEDUSA_BACKEND_URL` dans `.env.local` est correct
- Vérifiez que le backend est bien démarré sur le port 9000

### Erreurs CORS
- Ajoutez votre URL frontend dans la config CORS du backend
- Fichier: `medusa-config.js` > `http.storeCors`

---

**Besoin d'aide ?** Consultez la documentation ou demandez de l'assistance !
