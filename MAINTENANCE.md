# 🔧 Système de Maintenance - Allure Création

## Vue d'ensemble

Ce système permet de mettre le site en mode maintenance via plusieurs méthodes :
1. **Script local** (ligne de commande)
2. **API Webhook** (depuis votre dashboard admin)
3. **API REST** (intégration personnalisée)

---

## 🚀 Méthodes d'activation

### 1. Via script local (recommandé pour déploiements)

```bash
# Activer le mode maintenance
./maintenance.sh on

# Désactiver le mode maintenance
./maintenance.sh off

# Vérifier l'état
./maintenance.sh status
```

### 2. Via API Webhook (pour dashboard admin)

**Endpoint:** `POST https://www.allure-creation.fr/api/webhook/maintenance`

**Headers:**
```
X-Webhook-Secret: votre-secret-ici
Content-Type: application/json
```

**Body pour activer:**
```json
{
  "enabled": true,
  "message": "Maintenance programmée pour mise à jour"
}
```

**Body pour désactiver:**
```json
{
  "enabled": false
}
```

**Réponse:**
```json
{
  "success": true,
  "maintenance": true,
  "message": "Mode maintenance activé. Le site affiche maintenant la page de maintenance.",
  "timestamp": "2025-12-04T10:30:00.000Z",
  "customMessage": "Maintenance programmée pour mise à jour"
}
```

### 3. Via API REST simple

**Endpoint:** `POST https://www.allure-creation.fr/api/maintenance`

**Body:**
```json
{
  "enabled": true,
  "secret": "votre-secret-ici"
}
```

---

## 🔐 Configuration

### 1. Variables d'environnement

Ajoutez dans votre `.env` sur le VPS :

```env
# Mode maintenance
MAINTENANCE_MODE=false

# Secret pour l'API (générer un secret sécurisé)
MAINTENANCE_SECRET=votre-secret-super-securise-ici
MAINTENANCE_WEBHOOK_SECRET=votre-secret-super-securise-ici
```

### 2. Générer un secret sécurisé

```bash
# Sur votre machine locale ou le VPS
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

Copiez le résultat dans votre `.env`.

---

## 📱 Intégration avec votre Dashboard Admin

### Option A : Appel API direct depuis le frontend

```typescript
// Dans votre dashboard admin (React/Next.js/etc)
async function toggleMaintenance(enabled: boolean) {
  const response = await fetch('https://www.allure-creation.fr/api/webhook/maintenance', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Webhook-Secret': 'VOTRE_SECRET_ICI' // À stocker de manière sécurisée
    },
    body: JSON.stringify({
      enabled: enabled,
      message: enabled ? 'Maintenance en cours' : 'Fin de maintenance'
    })
  })

  const data = await response.json()
  return data
}

// Utilisation
await toggleMaintenance(true)  // Activer
await toggleMaintenance(false) // Désactiver
```

### Option B : Via votre API backend

Si votre dashboard a sa propre API, créez un endpoint qui appellera le webhook :

```typescript
// Dans votre API backend (Hetzner)
import axios from 'axios'

export async function toggleSiteMaintenance(enabled: boolean) {
  try {
    const response = await axios.post(
      'https://www.allure-creation.fr/api/webhook/maintenance',
      {
        enabled: enabled,
        message: `Maintenance ${enabled ? 'activée' : 'désactivée'} depuis le dashboard`
      },
      {
        headers: {
          'X-Webhook-Secret': process.env.MAINTENANCE_SECRET
        }
      }
    )

    return response.data
  } catch (error) {
    console.error('Erreur lors de la modification du mode maintenance:', error)
    throw error
  }
}
```

---

## 🎨 Page de Maintenance

La page de maintenance est accessible à `/maintenance` et affiche :
- Logo Allure Création
- Message d'information
- Coordonnées de contact
- Design cohérent avec le reste du site (style Pronovias)

**Routes toujours accessibles en mode maintenance :**
- `/api/maintenance` - API de gestion
- `/api/webhook/maintenance` - Webhook
- `/maintenance` - Page de maintenance
- `/_next/*` - Assets Next.js
- `/favicon.ico` - Favicon

---

## 🧪 Tests

### Test en local

```bash
# Terminal 1: Démarrer le dev server
npm run dev

# Terminal 2: Créer un .env.local
echo "MAINTENANCE_MODE=true" > .env.local
echo "MAINTENANCE_SECRET=test-secret" >> .env.local

# Relancer le dev server
# Visiter http://localhost:3000 → devrait afficher la page de maintenance
```

### Test avec curl

```bash
# Vérifier l'état
curl https://www.allure-creation.fr/api/maintenance

# Activer (nécessite le secret)
curl -X POST https://www.allure-creation.fr/api/webhook/maintenance \
  -H "Content-Type: application/json" \
  -H "X-Webhook-Secret: votre-secret" \
  -d '{"enabled": true, "message": "Test"}'

# Désactiver
curl -X POST https://www.allure-creation.fr/api/webhook/maintenance \
  -H "Content-Type: application/json" \
  -H "X-Webhook-Secret: votre-secret" \
  -d '{"enabled": false}'
```

---

## 🛡️ Sécurité

1. **Secret fort** : Utilisez un secret long et aléatoire (minimum 32 caractères)
2. **HTTPS uniquement** : L'API ne devrait être accessible qu'en HTTPS
3. **Rate limiting** : Considérez ajouter un rate limiting sur l'endpoint webhook
4. **Logs** : Les activations/désactivations sont loggées dans PM2

```bash
# Voir les logs de maintenance
ssh root@65.21.53.243
pm2 logs allure-creation | grep Maintenance
```

---

## 🔄 Workflow recommandé

### Maintenance planifiée

1. **Annoncer** : Informer les utilisateurs à l'avance
2. **Activer** :
   ```bash
   ./maintenance.sh on
   ```
3. **Effectuer les modifications** : Deploy, updates, etc.
4. **Tester** : Vérifier que tout fonctionne
5. **Désactiver** :
   ```bash
   ./maintenance.sh off
   ```

### Maintenance d'urgence depuis le dashboard

1. Se connecter au dashboard admin
2. Cliquer sur "Activer maintenance"
3. Le webhook est appelé automatiquement
4. Le site passe en maintenance immédiatement
5. Résoudre le problème
6. Cliquer sur "Désactiver maintenance"

---

## 📊 Monitoring

### Vérifier si le site est en maintenance

```bash
# Via curl
curl -s https://www.allure-creation.fr/api/maintenance | jq

# Ou visitez simplement
# https://www.allure-creation.fr
```

### Logs

```bash
# Sur le VPS
pm2 logs allure-creation

# Rechercher les événements de maintenance
pm2 logs allure-creation | grep -i maintenance
```

---

## 🐛 Troubleshooting

### Le mode maintenance ne s'active pas

1. Vérifier le fichier `.env` :
   ```bash
   ssh root@65.21.53.243
   cat /var/www/allure-creation-ecommerce/.env | grep MAINTENANCE
   ```

2. Vérifier les logs PM2 :
   ```bash
   pm2 logs allure-creation --err
   ```

3. Redémarrer l'application :
   ```bash
   cd /var/www/allure-creation-ecommerce
   pm2 restart allure-creation
   ```

### L'API webhook retourne 401

- Vérifier que le secret dans votre dashboard correspond à celui du `.env`
- Vérifier les headers (doit être `X-Webhook-Secret` ou `Authorization: Bearer xxx`)

### Le site reste en maintenance après désactivation

```bash
# Forcer la désactivation
ssh root@65.21.53.243
cd /var/www/allure-creation-ecommerce
sed -i 's/MAINTENANCE_MODE=.*/MAINTENANCE_MODE=false/' .env
pm2 restart allure-creation
```

---

## 🎯 Exemples d'intégration

### Dashboard React/Next.js

```tsx
'use client'

import { useState } from 'react'

export function MaintenanceToggle() {
  const [isMaintenanceMode, setIsMaintenanceMode] = useState(false)
  const [loading, setLoading] = useState(false)

  const toggleMaintenance = async () => {
    setLoading(true)
    try {
      const response = await fetch('/api/your-backend-endpoint', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action: 'toggle_maintenance',
          enabled: !isMaintenanceMode
        })
      })

      if (response.ok) {
        setIsMaintenanceMode(!isMaintenanceMode)
        alert(`Maintenance ${!isMaintenanceMode ? 'activée' : 'désactivée'}`)
      }
    } catch (error) {
      console.error('Erreur:', error)
      alert('Erreur lors de la modification du mode maintenance')
    } finally {
      setLoading(false)
    }
  }

  return (
    <button
      onClick={toggleMaintenance}
      disabled={loading}
      className={`px-4 py-2 rounded ${
        isMaintenanceMode ? 'bg-green-600' : 'bg-orange-600'
      } text-white`}
    >
      {loading ? 'Chargement...' : isMaintenanceMode ? 'Désactiver maintenance' : 'Activer maintenance'}
    </button>
  )
}
```

### API Backend (Node.js/Express)

```javascript
// Dans votre API Hetzner
const axios = require('axios')

app.post('/api/site/maintenance', async (req, res) => {
  try {
    const { enabled } = req.body

    // Appeler le webhook du site
    const response = await axios.post(
      'https://www.allure-creation.fr/api/webhook/maintenance',
      {
        enabled: enabled,
        message: `Action depuis le dashboard admin`
      },
      {
        headers: {
          'X-Webhook-Secret': process.env.SITE_MAINTENANCE_SECRET
        }
      }
    )

    res.json(response.data)
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    })
  }
})
```

---

**Dernière mise à jour** : 2025-12-04
