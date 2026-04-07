const baseUrl = "https://api.omniauth.taliasante.com";

export const createPersonne = async (identite, genre, phone, email, file) => {
  const formData = new FormData();
  formData.append("identite", identite);
  formData.append("genre", genre);
  formData.append("phone", phone);
  formData.append("email", email);
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

export const createApplication = async (
  idpersonne,
  fkorg,
  appId,
  passwords,
) => {
  const response = await fetch(`${baseUrl}/admin/save/application`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      idpersonne: idpersonne,
      fkorg: fkorg,
      fkapp: appId,
      passwords: passwords,
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Erreur création application");
  }

  return data;
};
