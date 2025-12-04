#!/bin/bash

# Script de gestion du mode maintenance
# Usage: ./maintenance.sh [on|off|status]

set -e

VPS_USER="root"
VPS_HOST="65.21.53.243"
VPS_PATH="/var/www/allure-creation-ecommerce"

# Fonction pour afficher l'usage
usage() {
    echo "Usage: $0 [on|off|status]"
    echo ""
    echo "Commandes:"
    echo "  on      - Activer le mode maintenance"
    echo "  off     - Désactiver le mode maintenance"
    echo "  status  - Vérifier l'état actuel"
    exit 1
}

# Vérifier les arguments
if [ $# -eq 0 ]; then
    usage
fi

COMMAND=$1

case $COMMAND in
    on)
        echo "🔧 Activation du mode maintenance..."
        ssh $VPS_USER@$VPS_HOST << 'ENDSSH'
            cd /var/www/allure-creation-ecommerce

            # Créer le fichier .env s'il n'existe pas
            if [ ! -f .env ]; then
                cp .env.example .env
            fi

            # Ajouter ou mettre à jour MAINTENANCE_MODE
            if grep -q "MAINTENANCE_MODE" .env; then
                sed -i 's/MAINTENANCE_MODE=.*/MAINTENANCE_MODE=true/' .env
            else
                echo "MAINTENANCE_MODE=true" >> .env
            fi

            # Redémarrer l'application
            pm2 restart allure-creation

            echo "✅ Mode maintenance activé"
ENDSSH
        echo "🌐 Le site affiche maintenant la page de maintenance"
        ;;

    off)
        echo "✅ Désactivation du mode maintenance..."
        ssh $VPS_USER@$VPS_HOST << 'ENDSSH'
            cd /var/www/allure-creation-ecommerce

            # Mettre à jour MAINTENANCE_MODE
            if grep -q "MAINTENANCE_MODE" .env; then
                sed -i 's/MAINTENANCE_MODE=.*/MAINTENANCE_MODE=false/' .env
            else
                echo "MAINTENANCE_MODE=false" >> .env
            fi

            # Redémarrer l'application
            pm2 restart allure-creation

            echo "✅ Mode maintenance désactivé"
ENDSSH
        echo "🌐 Le site est de nouveau accessible"
        ;;

    status)
        echo "📊 Vérification de l'état..."
        ssh $VPS_USER@$VPS_HOST << 'ENDSSH'
            cd /var/www/allure-creation-ecommerce

            if [ -f .env ]; then
                if grep -q "MAINTENANCE_MODE=true" .env; then
                    echo "🔧 Mode maintenance: ACTIVÉ"
                else
                    echo "✅ Mode maintenance: DÉSACTIVÉ"
                fi
            else
                echo "⚠️  Fichier .env non trouvé"
            fi

            echo ""
            echo "Status PM2:"
            pm2 status allure-creation
ENDSSH
        ;;

    *)
        echo "❌ Commande invalide: $COMMAND"
        usage
        ;;
esac
