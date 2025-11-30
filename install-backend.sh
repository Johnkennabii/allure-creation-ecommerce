#!/bin/bash

# Script d'installation automatique du backend Medusa pour Allure Création
# Ce script installe et configure le backend Medusa avec PostgreSQL

set -e

echo "========================================="
echo "Installation Backend Medusa"
echo "Allure Création E-commerce"
echo "========================================="
echo ""

# Couleurs pour les messages
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Vérifier si PostgreSQL est installé
echo -e "${BLUE}Vérification de PostgreSQL...${NC}"
if ! command -v psql &> /dev/null; then
    echo -e "${RED}PostgreSQL n'est pas installé.${NC}"
    echo ""
    echo "Pour installer PostgreSQL:"
    echo "  macOS: brew install postgresql@15"
    echo "  Ubuntu: sudo apt install postgresql postgresql-contrib"
    echo ""
    exit 1
fi

echo -e "${GREEN}✓ PostgreSQL est installé${NC}"
echo ""

# Configuration
BACKEND_DIR="$HOME/allure-creation-backend"
DB_NAME="allure_creation_db"
DB_USER="postgres"
ADMIN_EMAIL="admin@allurecreation.fr"
ADMIN_PASSWORD="Admin123!"

echo -e "${BLUE}Configuration:${NC}"
echo "  Directory: $BACKEND_DIR"
echo "  Database: $DB_NAME"
echo "  Admin Email: $ADMIN_EMAIL"
echo "  Admin Password: $ADMIN_PASSWORD"
echo ""

# Demander confirmation
read -p "Voulez-vous continuer avec cette configuration? (y/n) " -n 1 -r
echo
if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo "Installation annulée."
    exit 0
fi

echo ""
echo -e "${BLUE}Création de la base de données PostgreSQL...${NC}"

# Créer la base de données
createdb $DB_NAME 2>/dev/null || echo "La base de données existe déjà"

echo -e "${GREEN}✓ Base de données prête${NC}"
echo ""

# Vérifier si le dossier existe déjà
if [ -d "$BACKEND_DIR" ]; then
    echo -e "${YELLOW}⚠ Le dossier $BACKEND_DIR existe déjà${NC}"
    read -p "Voulez-vous le supprimer et recommencer? (y/n) " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        rm -rf "$BACKEND_DIR"
        echo -e "${GREEN}✓ Dossier supprimé${NC}"
    else
        echo "Installation annulée."
        exit 0
    fi
fi

echo ""
echo -e "${BLUE}Installation du backend Medusa...${NC}"
echo "Cela peut prendre quelques minutes..."
echo ""

# Créer le dossier
mkdir -p "$BACKEND_DIR"
cd "$BACKEND_DIR"

# Installer Medusa CLI globalement
echo -e "${BLUE}Installation de Medusa CLI...${NC}"
npm install -g @medusajs/medusa-cli 2>&1 | grep -v "npm WARN" || true

# Créer le projet Medusa
echo -e "${BLUE}Création du projet Medusa...${NC}"
npx create-medusa-app@latest . --db-url postgres://localhost/$DB_NAME --with-nextjs-starter=false --skip-browser || {
    echo -e "${RED}Erreur lors de la création du projet${NC}"
    exit 1
}

echo -e "${GREEN}✓ Backend installé${NC}"
echo ""

# Configuration du fichier .env
echo -e "${BLUE}Configuration des variables d'environnement...${NC}"

cat > .env << EOF
# Database
DATABASE_URL=postgres://localhost/$DB_NAME

# JWT Secret
JWT_SECRET=$(openssl rand -base64 32)

# Cookie Secret
COOKIE_SECRET=$(openssl rand -base64 32)

# CORS Settings
STORE_CORS=http://localhost:8000,http://localhost:3000
ADMIN_CORS=http://localhost:9000,http://localhost:7001

# Admin Email
MEDUSA_ADMIN_EMAIL=$ADMIN_EMAIL
MEDUSA_ADMIN_PASSWORD=$ADMIN_PASSWORD
EOF

echo -e "${GREEN}✓ Configuration terminée${NC}"
echo ""

# Installer les dépendances supplémentaires
echo -e "${BLUE}Installation des dépendances...${NC}"
npm install 2>&1 | grep -v "npm WARN" || true

echo ""
echo -e "${GREEN}✓ Installation terminée avec succès!${NC}"
echo ""
echo "========================================="
echo -e "${GREEN}Backend Medusa installé!${NC}"
echo "========================================="
echo ""
echo "📍 Emplacement: $BACKEND_DIR"
echo "🗄️  Base de données: $DB_NAME"
echo "📧 Admin: $ADMIN_EMAIL"
echo "🔑 Password: $ADMIN_PASSWORD"
echo ""
echo "Pour démarrer le backend:"
echo -e "${BLUE}cd $BACKEND_DIR && npm run dev${NC}"
echo ""
echo "Le backend sera accessible sur: http://localhost:9000"
echo "Dashboard admin: http://localhost:9000/app"
echo ""
echo "========================================="
EOF
