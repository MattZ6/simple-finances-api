import {
  UserTokenNotFoundByTokenError,
  UserTokenExpiredError,
} from '@domain/errors';
import { IRefreshUserAccessTokenUseCase } from '@domain/usecases/user/RefreshAccessToken';

import { IGenerateJWTProvider } from '@application/protocols/providers/jwt';
import { IGenerateUuidProvider } from '@application/protocols/providers/uuid';
import {
  IFindUserTokenByTokenRepository,
  ICreateUserTokenRepository,
  IDeleteUserTokenByIdRepository,
} from '@application/protocols/repositories/user';

export class RefreshUserAccessTokenUseCase
  implements IRefreshUserAccessTokenUseCase
{
  constructor(
    private readonly findUserTokenByTokenRepository: IFindUserTokenByTokenRepository,
    private readonly generateJWTProvider: IGenerateJWTProvider,
    private readonly generateUuidProvider: IGenerateUuidProvider,
    private readonly refreshTokenExpiresTimeInMillisseconds: number,
    private readonly createUserTokenRepository: ICreateUserTokenRepository,
    private readonly deleteUserTokenByIdRepository: IDeleteUserTokenByIdRepository
  ) {}

  async execute(
    data: IRefreshUserAccessTokenUseCase.Input
  ): Promise<IRefreshUserAccessTokenUseCase.Output> {
    const { refresh_token } = data;

    const userToken = await this.findUserTokenByTokenRepository.findByToken({
      token: refresh_token,
      include: { user: true },
    });

    if (!userToken) {
      throw new UserTokenNotFoundByTokenError();
    }

    const hasExpired = userToken.expires_in.getTime() < Date.now();

    if (hasExpired) {
      throw new UserTokenExpiredError();
    }

    const accessToken = await this.generateJWTProvider.generate({
      subject: userToken.user_id,
      payload: {
        name: userToken.user.name,
        avatar_url: userToken.user.avatar_url,
      },
    });

    const randomUuid = await this.generateUuidProvider.generate();

    const expiresIn = new Date(
      Date.now() + this.refreshTokenExpiresTimeInMillisseconds
    );

    const newUserToken = await this.createUserTokenRepository.create({
      token: randomUuid,
      user_id: userToken.user_id,
      expires_in: expiresIn,
    });

    await this.deleteUserTokenByIdRepository.deleteById({ id: userToken.id });

    return {
      access_token: accessToken,
      refresh_token: newUserToken.token,
    };
  }
}
