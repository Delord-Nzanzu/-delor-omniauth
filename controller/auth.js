// src/controllers/auth.js
export const auth = async (appId, login, password) => {
  const baseUrl = "https://api.omniauth.taliasante.com";
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
  const baseUrl = "https://api.omniauth.taliasante.com";
  const response = await fetch(`${baseUrl}/refresh/application`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      refreshToken: refreshToken,
      appid: appId,
    }),
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
