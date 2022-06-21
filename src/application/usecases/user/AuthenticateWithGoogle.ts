import { IAuthenticateUserWithGoogleUseCase } from '@domain/usecases/user/AuthenticateWithGoogle';

import { IGenerateJWTProvider } from '@application/protocols/providers/jwt';
import { IRetriveGoogleProfileDataByAuthorizationCodeProvider } from '@application/protocols/providers/oauth2';
import { IGenerateUuidProvider } from '@application/protocols/providers/uuid';
import {
  ICreateOrUpdateUserWithGoogle,
  ICreateUserTokenRepository,
} from '@application/protocols/repositories/user';

export class AuthenticateUserWithGoogleUseCase
  implements IAuthenticateUserWithGoogleUseCase
{
  constructor(
    private readonly retriveGoogleProfileDataByAuthorizationCodeProvider: IRetriveGoogleProfileDataByAuthorizationCodeProvider,
    private readonly createOrUpdateUserWithGoogle: ICreateOrUpdateUserWithGoogle,
    private readonly generateJWTProvider: IGenerateJWTProvider,
    private readonly generateUuidProvider: IGenerateUuidProvider,
    private readonly refreshTokenExpiresTimeInMillisseconds: number,
    private readonly createUserTokenRepository: ICreateUserTokenRepository
  ) {}

  async execute(
    data: IAuthenticateUserWithGoogleUseCase.Input
  ): Promise<IAuthenticateUserWithGoogleUseCase.Output> {
    const { code } = data;

    const { google_account_id, name, email, picture } =
      await this.retriveGoogleProfileDataByAuthorizationCodeProvider.getProfileByCode(
        { code }
      );

    const user =
      await this.createOrUpdateUserWithGoogle.createOrUpdateWithGoogle({
        google_account_id,
        name,
        email,
        avatar_url: picture,
      });

    const accessToken = await this.generateJWTProvider.encrypt({
      subject: user.id,
      payload: {
        name: user.name,
        avatar_url: user.avatar_url,
      },
    });

    const randomUuid = await this.generateUuidProvider.generate();

    const expiresDate = new Date(
      Date.now() + this.refreshTokenExpiresTimeInMillisseconds
    );

    const userToken = await this.createUserTokenRepository.create({
      user_id: user.id,
      token: randomUuid,
      expires_in: expiresDate,
    });

    return {
      access_token: accessToken,
      refresh_token: userToken.token,
    };
  }
}
