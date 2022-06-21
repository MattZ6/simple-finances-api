import { RefreshUserAccessTokenUseCase } from '@application/usecases/user/RefreshAccessToken';

import { authConfig } from '@main/config/env';
import { makeJWTProvider, makeUuidProvider } from '@main/factories/providers';
import { makeUserTokensRepository } from '@main/factories/repositories';

export function makeRefreshUserAccessTokenUseCase() {
  const jwtProvider = makeJWTProvider();
  const uuidProvider = makeUuidProvider();
  const userTokensRepository = makeUserTokensRepository();

  return new RefreshUserAccessTokenUseCase(
    userTokensRepository,
    jwtProvider,
    uuidProvider,
    authConfig.REFRESH_TOKEN_EXPIRES_IN_MILLISSECONDS,
    userTokensRepository,
    userTokensRepository
  );
}
