#!/bin/bash

# Script de déploiement rapide avec message auto-généré
set -e

# Générer un message de commit automatique avec la date
COMMIT_MESSAGE="🚀 Déploiement automatique - $(date '+%Y-%m-%d %H:%M:%S')"

# Appeler le script de déploiement principal
./deploy.sh "$COMMIT_MESSAGE"
