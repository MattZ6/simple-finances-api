import { OAuth2Client } from 'google-auth-library';

import { IRetriveGoogleProfileDataByAuthorizationCodeProvider } from '@application/protocols/providers/oauth2';

export class GoogleOAuth2Provider
  implements IRetriveGoogleProfileDataByAuthorizationCodeProvider
{
  private readonly client: OAuth2Client;

  constructor(
    private readonly clientId: string,
    private readonly clientSecret: string,
    private readonly redirectUrl: string
  ) {
    this.client = new OAuth2Client({
      clientId: this.clientId,
      clientSecret: this.clientSecret,
      redirectUri: this.redirectUrl,
    });
  }

  async getProfileByCode(
    data: IRetriveGoogleProfileDataByAuthorizationCodeProvider.Input
  ): Promise<IRetriveGoogleProfileDataByAuthorizationCodeProvider.Output> {
    const { code } = data;

    const token = await this.client.getToken(code);

    const grant = await this.client.verifyIdToken({
      idToken: token.tokens.id_token,
      audience: this.clientId,
    });

    const payload = grant.getPayload();

    await this.client.revokeToken(token.tokens.access_token);

    const { sub, name, email, picture } = payload;

    return {
      google_account_id: sub,
      name,
      email,
      picture,
    };
  }
}
