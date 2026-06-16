const baseUrl = "https://api.omniauth.taliasante.com";

export const createPersonne = async (
  identite,
  genre,
  phone,
  email,
  file,
  typeutilisateur,
) => {
  const formData = new FormData();
  formData.append("identite", identite);
  formData.append("genre", genre);
  formData.append("phone", phone);
  formData.append("email", email);
  formData.append("typeutilisateur", typeutilisateur);
  // formData.append("file", file);
  formData.append("datecreate", new Date().toISOString());
  if (file && file.buffer) {
    const blob = new Blob([file.buffer], { type: file.mimetype });
    formData.append("file", blob, file.originalname);
  } else {
    formData.append("file", file);
  }

  const response = await fetch(`${baseUrl}/personne/save/application`, {
    method: "POST",
    // headers: { "Content-Type": "multipart/form-data" },
    body: formData,
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Erreur création personne");
  }

  return data;
};

export const getAllPersonne = async (appId, idOrganisation, token) => {
  try {
    const response = await fetch(
      `${baseUrl}/admin/${appId}/${idOrganisation}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      },
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Erreur de récupération des personnes");
    }

    return data;
  } catch (error) {
    throw new Error(error.message || "Impossible de contacter le serveur");
  }
};

export const affectToApplication = async (
  idpersonne,
  fkorg,
  appId,
  passwords,
  fkapp,
) => {
  const response = await fetch(`${baseUrl}/admin/save/application`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      idpersonne: idpersonne,
      fkorg: fkorg,
      fkapp: fkapp,
      passwords: passwords,
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Erreur création application");
  }

  return data;
};
