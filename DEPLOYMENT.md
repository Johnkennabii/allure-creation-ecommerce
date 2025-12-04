# 🚀 Guide de Déploiement - Allure Création

## Scripts de déploiement disponibles

### 1. Déploiement avec message personnalisé

```bash
./deploy.sh "Message de commit personnalisé"
```

**Exemple :**
```bash
./deploy.sh "Ajout du système de filtres pour les robes"
```

**Ce script fait :**
- ✅ `git add -A` - Ajoute tous les fichiers modifiés
- ✅ `git commit` - Commit avec votre message
- ✅ `git push` - Push vers GitHub
- ✅ Connexion SSH au VPS
- ✅ `git pull` sur le VPS
- ✅ `npm install` - Installation des dépendances
- ✅ `npm run build` - Build de production
- ✅ `pm2 restart` - Redémarrage de l'application
- ✅ Affichage du status et des logs

---

### 2. Déploiement rapide (message automatique)

```bash
./deploy-quick.sh
```

**Ce script fait :**
- Même chose que `deploy.sh` mais génère automatiquement un message avec la date/heure
- Utile pour des déploiements rapides

---

### 3. Mise à jour manuelle sur le VPS

Si vous êtes déjà connecté au VPS :

```bash
cd /var/www/allure-creation-ecommerce
./update.sh
```

**Ce script fait :**
- `git pull` - Récupère les dernières modifications
- `npm install` - Met à jour les dépendances
- `npm run build` - Rebuild
- `pm2 restart` - Redémarre l'application

---

## Configuration SSH

Pour que le script fonctionne sans mot de passe, configurez une clé SSH :

### Sur votre machine locale :

```bash
# Générer une clé SSH (si vous n'en avez pas)
ssh-keygen -t ed25519 -C "votre-email@example.com"

# Copier la clé sur le VPS
ssh-copy-id root@65.21.53.243
```

### Créer un alias SSH (optionnel)

Éditez `~/.ssh/config` :

```
Host allurecreation-server
    HostName 65.21.53.243
    User root
    IdentityFile ~/.ssh/id_ed25519
```

Ensuite vous pourrez juste faire : `ssh allurecreation-server`

---

## Commandes utiles sur le VPS

### Voir les logs en temps réel
```bash
pm2 logs allure-creation
```

### Voir le statut de l'application
```bash
pm2 status
```

### Redémarrer l'application
```bash
pm2 restart allure-creation
```

### Voir les 50 dernières lignes de logs
```bash
pm2 logs allure-creation --lines 50
```

### Vérifier que l'app répond
```bash
curl http://localhost:3001
```

### Recharger Nginx
```bash
sudo systemctl reload nginx
```

### Voir les logs Nginx
```bash
# Logs d'accès
sudo tail -f /var/log/nginx/access.log

# Logs d'erreur
sudo tail -f /var/log/nginx/error.log
```

---

## Résolution de problèmes

### L'application ne démarre pas

```bash
# Voir les logs d'erreur
pm2 logs allure-creation --err

# Rebuild
cd /var/www/allure-creation-ecommerce
npm run build

# Redémarrer
pm2 restart allure-creation
```

### Erreur "Port déjà utilisé"

```bash
# Voir quel processus utilise le port
sudo lsof -i :3001

# Redémarrer l'application
pm2 restart allure-creation
```

### Site inaccessible

```bash
# Vérifier Nginx
sudo nginx -t
sudo systemctl status nginx

# Vérifier les certificats SSL
sudo certbot certificates

# Vérifier PM2
pm2 status
```

---

## Variables d'environnement

Les variables sont dans `/var/www/allure-creation-ecommerce/.env` :

```env
NEXT_PUBLIC_API_TOKEN=ak_d86c86401b00d3bdcac3eb0ee43b319fba1e605661a16f180bbab2e40ada41ff
NEXT_PUBLIC_SITE_URL=https://www.allure-creation.fr
```

Après modification, rebuild et redémarrer :

```bash
npm run build
pm2 restart allure-creation
```

---

## URLs

- 🌐 **Site web** : https://www.allure-creation.fr
- 🔧 **API** : https://api.allure-creation.fr
- 📧 **Email** : contact@allure-creation.fr

---

## Architecture

```
Machine locale (Mac)
    ↓ git push
GitHub (Repository)
    ↓ git pull
VPS (65.21.53.243)
    ├── /var/www/allure-creation-ecommerce (Next.js)
    ├── PM2 (Process manager) - Port 3001
    ├── Nginx (Reverse proxy) - Port 80/443
    └── Let's Encrypt (SSL/TLS)
```

---

## Workflow de développement recommandé

1. **Développement local** : Travailler sur votre machine avec `npm run dev`
2. **Test** : Vérifier que tout fonctionne localement
3. **Déploiement** : `./deploy.sh "Description des modifications"`
4. **Vérification** : Visiter https://www.allure-creation.fr pour vérifier

---

## Maintenance

### Renouvellement SSL (automatique)

Les certificats Let's Encrypt se renouvellent automatiquement. Pour vérifier :

```bash
sudo certbot renew --dry-run
```

### Backup

Il est recommandé de faire des backups réguliers :

```bash
# Sur le VPS
tar -czf ~/backup-allure-$(date +%Y%m%d).tar.gz /var/www/allure-creation-ecommerce
```

### Mises à jour de sécurité

```bash
# Sur le VPS
sudo apt update
sudo apt upgrade
```

---

**Dernière mise à jour** : $(date '+%Y-%m-%d')
