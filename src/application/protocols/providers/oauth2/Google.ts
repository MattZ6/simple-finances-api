interface IRetriveGoogleProfileDataByAuthorizationCodeProvider {
  getProfileByCode(
    data: IRetriveGoogleProfileDataByAuthorizationCodeProvider.Input
  ): Promise<IRetriveGoogleProfileDataByAuthorizationCodeProvider.Output>;
}

namespace IRetriveGoogleProfileDataByAuthorizationCodeProvider {
  export type Input = {
    code: string;
  };

  export type Output = {
    google_account_id: string;
    name: string;
    email: string;
    picture: string;
  };
}

export { IRetriveGoogleProfileDataByAuthorizationCodeProvider };
