# 🚀 OmniAuth

[![NPM](NPM)](https://www.npmjs.com/package/@delord/omniauth)
[![License: MIT](https://img.shields.io)](https://opensource.org)

**OmniAuth** est un Identity Provider (IdP) centralisé. Ce SDK permet aux développeurs d'intégrer l'authentification multi-projets en quelques secondes, en gérant la communication sécurisée avec l'API OmniAuth.

---

## ✨ Points forts

- **Initialisation simplifiée** : Configurez votre `appId` une seule fois.
- **Léger & Natif** : Aucune dépendance externe (utilise `fetch`).
- **Sécurité** : Gestion robuste des erreurs et validation des types de contenu.
- **Moderne** : Support complet des ES Modules (`import/export`).

---

---

## 🛠️ Avant de commencer (Prérequis)

Avant d'installer le SDK, vous devez configurer votre environnement sur la console OmniAuth :

1.  **Créer un compte** : Rendez-vous sur [omniauth](https://omniauth.taliasante.com) pour vous inscrire.
2.  **Configurer votre Application** : Dans le menu **Applications**, créez un nouveau projet pour générer votre `appid` unique.
3.  **Définir les Accès** : Allez dans **Niveaux d'accès d'application** pour créer les rôles (Admin, User, etc.) propres à votre application.
4.  **Ajouter des Utilisateurs** : Dans le menu **Utilisateurs d'application**, liez vos comptes à l'application et attribuez-leur leurs niveaux d'accès.

---

## 📦 Installation

Installez le SDK via votre gestionnaire de paquets préféré :

```bash
npm install @delord/omniauth
# ou
yarn add @delord/omniauth
```

## 🚀 Utilisation Rapide

### Login

```bash
import omniauth from '@delord/omniauth';

// 1. Initialisation avec votre ID d'application
const auth = omniauth("votre_appid_unique");

// 2. Authentification directe
const handleLogin = async (email, password) => {
  try {
    const result = await auth.login(email, password);
    return result;
  } catch (error) {
    console.error("Erreur OmniAuth :", error.message);
  }
};

```

### RefreshToken

```bash
import omniauth from '@delord/omniauth';

// 1. Initialisation avec votre ID d'application
const auth = omniauth("votre_appid_unique");

// 2. RefreShToken directe
const handleRefresh = async (email, password) => {
  try {
     const result = await omniauthApp.refreshTokens(req.body.refreshToken);
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
