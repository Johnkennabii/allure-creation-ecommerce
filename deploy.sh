#!/bin/bash

# Script de déploiement Allure Création
# Usage: ./deploy.sh "message de commit"

set -e  # Arrêter en cas d'erreur

echo "🚀 Déploiement Allure Création"
echo "================================"

# Vérifier qu'un message de commit a été fourni
if [ -z "$1" ]; then
    echo "❌ Erreur: Veuillez fournir un message de commit"
    echo "Usage: ./deploy.sh \"votre message de commit\""
    exit 1
fi

COMMIT_MESSAGE="$1"
VPS_USER="root"
VPS_HOST="65.21.53.243"
VPS_PATH="/var/www/allure-creation-ecommerce"

echo ""
echo "📝 Étape 1: Git status"
git status

echo ""
echo "💾 Étape 2: Ajout des fichiers modifiés"
git add -A

echo ""
echo "📦 Étape 3: Commit avec le message: $COMMIT_MESSAGE"
git commit -m "$COMMIT_MESSAGE

🤖 Generated with [Claude Code](https://claude.com/claude-code)

Co-Authored-By: Claude <noreply@anthropic.com>"

echo ""
echo "🌐 Étape 4: Push vers GitHub"
git push origin main

echo ""
echo "📡 Étape 5: Connexion au VPS et déploiement"
ssh $VPS_USER@$VPS_HOST << 'ENDSSH'
    set -e

    echo "📥 Pull des dernières modifications..."
    cd /var/www/allure-creation-ecommerce
    git pull origin main

    echo "📦 Installation des dépendances..."
    npm install

    echo "🔨 Build de production..."
    npm run build

    echo "🔄 Redémarrage de l'application PM2..."
    pm2 restart allure-creation

    echo "✅ Déploiement terminé sur le VPS!"

    echo ""
    echo "📊 Status PM2:"
    pm2 status allure-creation

    echo ""
    echo "📝 Logs (dernières 10 lignes):"
    pm2 logs allure-creation --lines 10 --nostream
ENDSSH

echo ""
echo "✅ Déploiement complet terminé!"
echo "🌐 Site accessible sur: https://www.allure-creation.fr"
echo ""
