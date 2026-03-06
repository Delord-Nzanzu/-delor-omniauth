# 🚀 OmniAuth JS SDK

[![version](https://img.shields.io)](https://www.npmjs.com)
[![License: MIT](https://img.shields.io)](https://opensource.org)

**OmniAuth** est un Identity Provider (IdP) centralisé. Ce SDK permet aux développeurs d'intégrer l'authentification multi-projets en quelques secondes, en gérant la communication sécurisée avec l'API OmniAuth de Talia Santé.

---

## ✨ Points forts

- **Initialisation simplifiée** : Configurez votre `appId` une seule fois.
- **Léger & Natif** : Aucune dépendance externe (utilise `fetch`).
- **Sécurité** : Gestion robuste des erreurs et validation des types de contenu.
- **Moderne** : Support complet des ES Modules (`import/export`).

---

## 📦 Installation

Installez le SDK via votre gestionnaire de paquets préféré :

```bash
npm install omniauth
# ou
yarn add omniauth
```

## 🚀 Utilisation Rapide

```bash
import omniauth from 'omniauth';

// 1. Initialisation avec votre ID d'application
const auth = omniauth("votre_appid_unique");

// 2. Authentification directe
const handleLogin = async (email, password) => {
  try {
    const result = await auth.login(email, password);

    console.log("Connexion réussie !");
    console.log("Token JWT :", result.token);
    console.log("Données utilisateur :", result.user);

    return result;
  } catch (error) {
    console.error("Erreur OmniAuth :", error.message);
  }
};

```

## 🛠️ Référence de l'API

### `omniauth(appId)`

Initialise le service.

- **appId (String)** : L'identifiant unique généré dans le menu "Applications" de votre console OmniAuth. _Obligatoire._

### `auth.login(login, password)`

Authentifie un utilisateur pour l'application configurée.

- **login (String)** : Email ou identifiant de l'utilisateur.
- **password (String)** : Mot de passe de l'utilisateur.
- **Retourne** : Une `Promise` contenant l'objet de réponse (Token, User Info, etc.).

---

## 🌐 Architecture

OmniAuth repose sur une structure en **trois couches** pour garantir l'étanchéité de vos données :

1.  **Applications** : Identifiées par un `appid` unique servant d'audience pour les jetons.
2.  **Niveaux d'accès** : Définition des rôles (Admin, Éditeur, etc.) spécifiques à chaque application.
3.  **Utilisateurs** : Base centrale reliée dynamiquement aux applications via leurs niveaux d'accès.

---

**Développé par Nzanzu Wayire Delord**
