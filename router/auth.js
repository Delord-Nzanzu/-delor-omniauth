import { auth } from "../controller/auth.js";

export const authRouter = (appId) => {
  return {
    login: async (login, password) => {
      // Si l'ID est absent au moment de l'appel
      if (!appId) {
        return {
          success: false,
          message: "L'identifiant 'appId' est obligatoire pour OmniAuth.",
        };
      }
      return auth(appId, login, password);
    },
  };
};
