import {
  createPersonne,
  affectToApplication,
} from "../controller/NewCompte.js";

export const createComppteRouter = (appId) => {
  return {
    create: async (identite, genre, phone, email, file) => {
      if (!appId) {
        return {
          success: false,
          message: "L'identifiant 'appId' est obligatoire pour OmniAuth.",
        };
      } else {
        return createPersonne(identite, genre, phone, email, file);
      }
    },
    affecetToApp: async (idpersonne, fkorg, passwords, fkapp) => {
      if (!appId) {
        return {
          success: false,
          message: "L'identifiant 'appId' est obligatoire pour OmniAuth.",
        };
      } else if (!fkorg) {
        return {
          success: false,
          message:
            "L'identifiant 'fkorg' est obligatoire l'affectation de l'utilisateur sur OmniAuth.",
        };
      } else {
        return affectToApplication(idpersonne, fkorg, appId, passwords, fkapp);
      }
    },
  };
};
