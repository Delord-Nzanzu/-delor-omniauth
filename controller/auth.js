// src/controllers/auth.js
const baseUrl = "https://api.omniauth.taliasante.com";
export const auth = async (appId, login, password) => {
  const response = await fetch(`${baseUrl}/auth/application`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ login, passwords: password, appid: appId }),
  });

  // Vérification du type de contenu
  const contentType = response.headers.get("content-type");
  if (!contentType || !contentType.includes("application/json")) {
    throw new Error("Le serveur n'a pas renvoyé de JSON.");
  }

  const data = await response.json();
  if (!response.ok) throw new Error(data.message || "Erreur d'auth");

  return data;
};

export const refreshToken = async (appId, refreshToken) => {
  const url = `${baseUrl}/refresh/application`;

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ refreshToken, appid: appId }),
    });

    // 1. On récupère le texte brut d'abord pour ne pas perdre l'erreur
    const rawText = await response.text();

    // 2. Diagnostic si ce n'est pas du JSON
    const contentType = response.headers.get("content-type");
    if (!contentType || !contentType.includes("application/json")) {
      if (response.status === 404) {
        throw new Error(
          `[404 Not Found] L'URL ${url} n'existe pas sur le serveur.`,
        );
      }
      if (response.status === 500) {
        throw new Error(
          `[500 Server Error] Ton code API a crashé. Vérifie les logs de ton serveur.`,
        );
      }

      console.error("Détail du texte reçu :", rawText);
      throw new Error(
        `Le serveur a renvoyé du HTML au lieu de JSON (Status: ${response.status}).`,
      );
    }

    // 3. Si c'est du JSON, on le parse
    const data = JSON.parse(rawText);

    if (!response.ok) {
      throw new Error(data.message || `Erreur ${response.status}`);
    }

    return data;
  } catch (error) {
    // 4. Erreur de connexion (Coupure internet, mauvais domaine)
    if (error.message.includes("fetch failed")) {
      throw new Error(
        "Impossible de contacter le serveur. Vérifie ta connexion ou l'URLBase.",
      );
    }
    throw error;
  }
};
