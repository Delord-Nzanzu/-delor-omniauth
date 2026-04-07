const baseUrl = "https://api.omniauth.taliasante.com";

export const createPersonne = async (identite, genre, phone, email, file) => {
  const formData = new FormData();
  formData.append("identite", identite);
  formData.append("genre", genre);
  formData.append("phone", phone);
  formData.append("email", email);
  formData.append("file", file);
  formData.append("datecreate", new Date().toISOString());

  const response = await fetch(`${baseUrl}/personne/save/application`, {
    method: "POST",
    body: formData,
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Erreur création personne");
  }

  return data?.data?.data?.idpersonne;
};

export const createApplication = async (idpersonne, fkorg, appId) => {
  const response = await fetch(`${baseUrl}/admin/save/application`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      idpersonne,
      fkorg,
      fkapp: appId,
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Erreur création application");
  }

  return data;
};
