# Images Allure Création

Ce dossier contient les images du site.

## Structure

```
images/
├── hero-bg.jpg              # Image de fond de la page d'accueil (1920x1080px recommandé)
└── categories/
    ├── mariee.jpg          # Catégorie Robes de Mariée (800x1000px)
    ├── soiree.jpg          # Catégorie Robes de Soirée (800x1000px)
    ├── cocktail.jpg        # Catégorie Robes de Cocktail (800x1000px)
    └── ceremonie.jpg       # Catégorie Robes de Cérémonie (800x1000px)
```

## Recommandations

### Images du Hero
- **Taille**: 1920x1080px minimum
- **Format**: JPG (optimisé pour le web)
- **Poids**: < 500KB
- **Style**: Élégante, fond sombre ou neutre, haute qualité

### Images des Catégories
- **Taille**: 800x1000px (ratio 4:5)
- **Format**: JPG (optimisé pour le web)
- **Poids**: < 300KB chaque
- **Style**: Professionnelle, fond propre, modèle bien éclairé

### Images des Produits
Les images des produits seront uploadées via le dashboard Medusa admin.

- **Taille**: 1000x1250px minimum (ratio 4:5)
- **Format**: JPG ou PNG
- **Poids**: < 500KB
- **Nombre**: 3-5 images par produit (face, dos, détails)

## Optimisation

Avant d'ajouter les images, optimisez-les avec:
- [TinyPNG](https://tinypng.com/) - Compression JPG/PNG
- [Squoosh](https://squoosh.app/) - Outil Google
- Ou via ligne de commande avec ImageMagick:
  ```bash
  convert input.jpg -resize 1920x1080 -quality 85 output.jpg
  ```

## Sources d'images temporaires

Pour le développement, vous pouvez utiliser:
- [Unsplash](https://unsplash.com/s/photos/wedding-dress) - Photos gratuites haute qualité
- [Pexels](https://www.pexels.com/search/elegant-dress/) - Photos libres de droits

## Notes importantes

- ⚠️ Assurez-vous d'avoir les droits sur toutes les images utilisées
- Les images doivent refléter votre marque et votre style
- Privilégiez la qualité à la quantité
- Gardez une cohérence visuelle (couleurs, éclairage, style)
