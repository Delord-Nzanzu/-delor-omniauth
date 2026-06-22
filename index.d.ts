declare module "@delord/omniauth" {
  export interface CreateCompteRouter {
    create(
      identite: string,
      genre: string,
      phone: string,
      email: string,
      file: any,
    ): Promise<any>;

    affecetToApp(
      idpersonne: string,
      fkorg: string,
      passwords: string,
      fkapp: string,
    ): Promise<any>;
    getAllPersonnes(
      idOrganisation: string,
      fkapplication: string,
    ): Promise<any>;
  }

  export interface AuthRouter {
    login(login: string, password: string): Promise<any>;
    refreshTokens(refreshToken: string): Promise<any>;
  }

  const omniAuth: {
    createComppteRouter(appId: string): CreateCompteRouter;
    authRouter(appId: string): AuthRouter;
  };

  export default omniAuth;
}
