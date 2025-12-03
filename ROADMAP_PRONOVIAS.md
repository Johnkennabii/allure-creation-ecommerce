# 🗺️ ROADMAP - Transformation Style Pronovias

**Objectif**: Transformer le site Allure Création pour adopter complètement le style et la charte graphique de Pronovias, tout en conservant la logique métier existante.

---

## 📋 Phase 1: Fondations & Design System

### 1.1 Configuration Tailwind (Charte graphique Pronovias)
- [ ] **Palette de couleurs**
  - Noir principal: `#000000`
  - Blanc: `#FFFFFF`
  - Gris léger: `#F5F5F5` (backgrounds)
  - Gris moyen: `#666666` (textes secondaires)
  - Gris foncé: `#333333` (textes)

- [ ] **Typographie**
  - Police principale: `font-sans` - Sans-serif élégante (similaire à Montserrat ou Poppins)
  - Titres: `font-light` (300) à `font-normal` (400)
  - Corps de texte: `font-light` (300)
  - Uppercase pour les labels et menus
  - Letter-spacing élargi: `tracking-wider` à `tracking-widest`

- [ ] **Espacements**
  - Espacements généreux entre sections: `py-16` à `py-24`
  - Gaps de grille: `gap-6` à `gap-8`
  - Padding conteneurs: `px-4` (mobile) à `px-8` (desktop)

---

## 🎨 Phase 2: Composants Globaux

### 2.1 Header
- [ ] **Structure**
  - Hauteur fixe: `h-20` (80px)
  - Fond blanc avec bordure subtile
  - Logo centré (desktop) / gauche (mobile)
  - Navigation horizontale (desktop)
  - Icônes minimalistes (recherche, compte, panier)

- [ ] **Top Bar** (au-dessus du header)
  - Liens utilitaires: "Aide", "Contact", "Livraison"
  - Texte: `text-xs uppercase tracking-widest`
  - Hauteur: `h-10`

- [ ] **Navigation**
  - Menu principal: ROBES, MARIÉE, SOIRÉE, COCKTAIL, À PROPOS, CONTACT
  - Hover: soulignement subtil
  - Mega-menu (dropdown) pour catégories

- [ ] **Mobile Menu**
  - Slide-in from left
  - Fond blanc
  - Navigation verticale
  - Close button (X) en haut à droite

### 2.2 Footer
- [ ] **Newsletter Section**
  - Fond légèrement gris (`bg-gray-50`)
  - Titre centré: "Restez informée"
  - Input email + bouton noir

- [ ] **Footer Links** (4 colonnes)
  - Collections
  - Services & Aide
  - L'Entreprise
  - Réseaux Sociaux

- [ ] **Bottom Bar**
  - Copyright
  - Liens légaux (CGV, Confidentialité)
  - Sélecteur de pays/langue

---

## 🏠 Phase 3: Pages Principales

### 3.1 Page d'Accueil
- [ ] **Hero Section**
  - Image/vidéo plein écran
  - Ratio 16:9 ou full viewport
  - Texte overlay (blanc) centré
  - CTA: bouton noir "Découvrir la collection"

- [ ] **Collections Highlights** (3 sections)
  - Layout: 2-3 colonnes
  - Images aspect-ratio 3:4
  - Titre + description + lien

- [ ] **Featured Products Carousel**
  - Swiper.js
  - 4 produits visibles (desktop)
  - Navigation arrows minimalistes

- [ ] **About Section**
  - Texte + image côte à côte
  - Fond blanc

- [ ] **CTA Final**
  - Fond noir
  - Texte blanc
  - Bouton blanc avec bordure

### 3.2 Page Catalogue (/robes)
- [ ] **Header de page**
  - Titre de catégorie centré
  - Breadcrumb subtil

- [ ] **Filtres** (Sidebar ou Top)
  - Type de robe
  - Taille
  - Couleur
  - Prix
  - Design: checkboxes minimalistes

- [ ] **Grille de produits**
  - 4 colonnes (desktop), 2 (mobile)
  - Cards sans bordure
  - Image aspect-ratio 3:4
  - Nom produit: `font-light text-sm`
  - Prix: `text-base font-normal`
  - Hover: légère opacité (0.8)

- [ ] **Pagination**
  - Numéros de page
  - Style minimaliste
  - Boutons prev/next

### 3.3 Page Détail Produit (/robes/[id])
- [ ] **Layout 2 colonnes**
  - Gauche: Carousel images (sticky)
  - Droite: Informations produit

- [ ] **Images**
  - Carousel vertical avec thumbnails
  - Lightbox au clic
  - Zoom on hover (optionnel)

- [ ] **Informations**
  - Type de robe (uppercase, small)
  - Nom du produit: `text-3xl font-light`
  - Référence: `text-sm text-gray-500`
  - Prix: `text-2xl font-light` avec séparateur horizontal
  - Description: paragraphe avec line-height généreux
  - Détails (taille, couleur): liste avec lignes séparatrices

- [ ] **Date Picker (Location)**
  - Design épuré
  - Calendrier Flatpickr stylisé
  - Résumé: durée + prix total

- [ ] **Bouton CTA**
  - "Ajouter au panier" ou "Réserver"
  - Fond noir, texte blanc
  - Pleine largeur
  - Hauteur: `h-14`

- [ ] **Sections supplémentaires**
  - Informations de livraison
  - Guide des tailles
  - Besoin d'aide ? (lien contact)

### 3.4 Page Panier/Checkout
- [ ] **Layout**
  - 2 colonnes: articles (gauche) + résumé (droite)
  - Design minimaliste

- [ ] **Items**
  - Image miniature
  - Nom + détails
  - Quantité/dates
  - Prix
  - Bouton supprimer

- [ ] **Résumé**
  - Sous-total
  - Livraison
  - Total
  - Sticky (scroll)

- [ ] **Formulaire**
  - Inputs avec labels flottants
  - Validation en temps réel
  - Autocomplete adresse

---

## 🎯 Phase 4: Composants UI

### 4.1 Buttons
- [ ] **Primary Button**
  - Fond noir (`bg-black`)
  - Texte blanc
  - Uppercase, tracking-wider
  - Padding: `px-8 py-4`
  - Hover: `bg-gray-900`

- [ ] **Secondary Button**
  - Bordure noire
  - Fond transparent
  - Texte noir
  - Hover: fond noir, texte blanc

- [ ] **Link Button**
  - Soulignement au hover
  - Pas de background

### 4.2 Cards
- [ ] **Product Card**
  - Fond blanc
  - Pas de bordure ni shadow
  - Image + texte
  - Hover: légère opacité

- [ ] **Info Card**
  - Bordure subtile
  - Padding généreux
  - Icône + titre + description

### 4.3 Forms
- [ ] **Input Fields**
  - Bordure fine grise
  - Pas de border-radius (ou très subtil: 2px)
  - Focus: bordure noire
  - Label: au-dessus ou flottant

- [ ] **Select Dropdowns**
  - Style natif épuré
  - Icône chevron custom

- [ ] **Checkboxes/Radio**
  - Design minimaliste
  - Checked: fond noir

### 4.4 Modal/Dialog
- [ ] **Overlay**
  - Fond: `bg-black/40`
  - Backdrop blur

- [ ] **Content**
  - Fond blanc
  - Padding généreux
  - Close button (X) en haut à droite

---

## 🚀 Phase 5: Animations & Interactions

### 5.1 Transitions
- [ ] **Hover Effects**
  - Opacity: `hover:opacity-80`
  - Transform: `hover:scale-[1.02]`
  - Duration: `transition-all duration-300`

### 5.2 Scroll Animations
- [ ] **Fade-in on scroll**
  - Utiliser Intersection Observer
  - Éléments qui apparaissent progressivement

### 5.3 Loading States
- [ ] **Skeleton loaders**
  - Pour images et textes
  - Animation pulse

---

## 📱 Phase 6: Responsive & Mobile

### 6.1 Breakpoints
- [ ] Mobile: `< 640px`
- [ ] Tablet: `640px - 1024px`
- [ ] Desktop: `> 1024px`

### 6.2 Mobile Optimizations
- [ ] Grille: 2 colonnes max
- [ ] Navigation: hamburger menu
- [ ] Touch-friendly buttons (min height 44px)
- [ ] Carousels: swipe gestures

---

## 🔧 Phase 7: Optimisations

### 7.1 Performance
- [ ] **Images**
  - Next.js Image component
  - Lazy loading
  - WebP format
  - Responsive sizes

- [ ] **Code Splitting**
  - Dynamic imports pour composants lourds
  - Swiper, Flatpickr chargés à la demande

### 7.2 SEO
- [ ] Meta tags
- [ ] Structured data (schema.org)
- [ ] Sitemap
- [ ] Alt texts sur toutes les images

### 7.3 Accessibilité
- [ ] ARIA labels
- [ ] Navigation au clavier
- [ ] Contraste des couleurs (WCAG AA)
- [ ] Focus visible

---

## 📦 Phase 8: Contenu & Assets

### 8.1 Images
- [ ] Photos professionnelles haute qualité
- [ ] Ratio uniforme pour les produits (3:4)
- [ ] Bannières hero (16:9 ou 21:9)
- [ ] Optimisées pour le web

### 8.2 Textes
- [ ] Descriptions produits élégantes
- [ ] Tonalité raffinée et luxueuse
- [ ] Copies pour CTA engageantes

---

## ✅ Phase 9: Tests & QA

### 9.1 Tests Fonctionnels
- [ ] Navigation
- [ ] Filtres de produits
- [ ] Panier (ajout, suppression, modification)
- [ ] Formulaires
- [ ] Date picker

### 9.2 Tests Cross-browser
- [ ] Chrome
- [ ] Safari
- [ ] Firefox
- [ ] Edge

### 9.3 Tests Mobile
- [ ] iOS Safari
- [ ] Android Chrome
- [ ] Responsive breakpoints

### 9.4 Tests Performance
- [ ] Lighthouse score > 90
- [ ] Core Web Vitals
- [ ] Temps de chargement < 3s

---

## 🎬 Phase 10: Déploiement

### 10.1 Pre-deployment
- [ ] Build production
- [ ] Tests finaux
- [ ] Backup base de données

### 10.2 Deployment
- [ ] Déploiement sur serveur de production
- [ ] Configuration DNS
- [ ] SSL/HTTPS

### 10.3 Post-deployment
- [ ] Monitoring erreurs
- [ ] Analytics setup (Google Analytics)
- [ ] Hotjar ou similaire pour heatmaps

---

## 📊 Priorités

### 🔴 Haute Priorité (Sprint 1 - Semaines 1-2)
1. Configuration Tailwind (Phase 1)
2. Header + Footer (Phase 2)
3. Page Catalogue (Phase 3.2)
4. Page Détail Produit (Phase 3.3)
5. Buttons & Forms (Phase 4.1, 4.3)

### 🟡 Moyenne Priorité (Sprint 2 - Semaines 3-4)
1. Page d'Accueil (Phase 3.1)
2. Page Panier (Phase 3.4)
3. Cards & Modals (Phase 4.2, 4.4)
4. Mobile Responsive (Phase 6)

### 🟢 Basse Priorité (Sprint 3 - Semaine 5+)
1. Animations avancées (Phase 5)
2. Optimisations performance (Phase 7)
3. Tests & QA (Phase 9)
4. Contenu final (Phase 8)

---

## 🛠️ Stack Technique (Conservée)

- **Framework**: Next.js 15
- **Styling**: Tailwind CSS
- **Carrousel**: Swiper.js
- **Date Picker**: Flatpickr
- **Backend**: Supabase (existant)
- **API**: https://api.allure-creation.fr
- **Images**: Next.js Image + Object Storage

---

## 📝 Notes Importantes

1. **Garder la logique existante**: Toutes les fonctionnalités actuelles (filtres, panier, date picker, API calls) doivent être conservées
2. **Approche progressive**: Transformer page par page pour éviter de casser le site
3. **Tests réguliers**: Tester après chaque phase
4. **Documentation**: Commenter le code pour expliquer les choix de design

---

## 🎯 Indicateurs de Succès

- ✅ Design visuellement identique à Pronovias
- ✅ Toutes les fonctionnalités existantes fonctionnent
- ✅ Performance Lighthouse > 90
- ✅ Site 100% responsive
- ✅ Temps de chargement < 3 secondes
- ✅ Aucune régression sur les fonctionnalités

---

**Date de création**: 3 Décembre 2025
**Dernière mise à jour**: 3 Décembre 2025
