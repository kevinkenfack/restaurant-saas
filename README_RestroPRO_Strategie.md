# 🧠 Stratégie de gestion multi-dépôts – RestroPRO

Ce document décrit la stratégie adoptée pour **maintenir un code personnalisé** basé sur le script RestroPRO, tout en intégrant facilement les mises à jour officielles sans conflit ni perte de modifications.

---

## 🎯 Objectif

- **Séparer** les versions officielles des versions personnalisées
- Pouvoir **analyser et intégrer** chaque mise à jour proprement
- Garder un historique clair, stable et sans risque de réécriture accidentelle

---

## 🗃️ Structure des dépôts

### 📁 1. `restropro-core`

> Ce dépôt sert de **référence officielle** pour les versions fournies par l’éditeur.

| Branche       | Contenu                                 |
|---------------|------------------------------------------|
| `v1.8`        | Code officiel RestroPRO version 1.8      |
| `v1.9`        | Code officiel RestroPRO version 1.9      |
| `vX.X`        | Etc.                                     |

🔒 Aucune modification ne se fait ici. Ce dépôt est **en lecture seule**.

---

### 🛠️ 2. `restropro-custom`

> C’est ici que je développe ma version **personnalisée**, avec mes ajustements UI, UX, fonctionnalités spécifiques, etc.

- Basé initialement sur `v1.8`
- Toute évolution se fait ici
- La production ou le staging part de ce dépôt

---

## 🔁 Processus de mise à jour

### Étape 1 – Télécharger et commiter la version officielle

Dans `restropro-core` :

```bash
git checkout -b v1.9
# Copier/coller le code officiel v1.9 dans le dépôt
git add .
git commit -m "Ajout de RestroPRO v1.9 officielle"
```

---

### Étape 2 – Comparer les versions

Toujours dans `restropro-core`, comparer v1.8 et v1.9 :

```bash
git diff --name-status v1.8 v1.9 > changes.txt
```

Cela donne un aperçu rapide des changements :
```
M       backend/routes/order.js
A       backend/utils/reportGenerator.js
D       frontend/components/OldBanner.vue
```

---

### Étape 3 – Intégration ciblée dans `restropro-custom`

Dans `restropro-custom` :

- Identifier les fichiers concernés
- Intégrer **manuellement** les modifications utiles
- Adapter le code aux personnalisations existantes
- Tester chaque étape

---

## ✅ Avantages de cette méthode

- 🔒 Aucun risque de perdre les personnalisations
- 🧠 Contrôle total sur ce que tu intègres ou ignores
- 🛠️ Facilité de debug et maintenance dans le temps
- 🧩 Intégration modulaire et progressive

---

## 📦 Astuce bonus – Script de comparaison

Tu peux créer un petit fichier `compare.sh` dans `restropro-core` :

```bash
#!/bin/bash
echo "Comparaison entre v1.8 et v1.9..."
git diff --name-status v1.8 v1.9 > changes.txt
echo "Liste enregistrée dans changes.txt"
```

---

## 👤 Auteur & Contact

**Joël Kevin Kenfack**  
💼 Agence : [uirrom.pro](https://uirrom.pro)  
📧 contact@uirrom.pro

---