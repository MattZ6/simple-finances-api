import { AuthenticateUserWithGoogleUseCase } from '@application/usecases/user/AuthenticateWithGoogle';

import { authConfig } from '@main/config/env';
import {
  makeGoogleOAuth2Provider,
  makeJWTProvider,
  makeUuidProvider,
} from '@main/factories/providers';
import {
  makeUsersRepository,
  makeUserTokensRepository,
} from '@main/factories/repositories';

export function makeAuthenticateUserWithGoogleUseCase() {
  const googleOAuth2Provider = makeGoogleOAuth2Provider();
  const usersRepository = makeUsersRepository();
  const jwtProvider = makeJWTProvider();
  const uuidProvider = makeUuidProvider();
  const userTokensRepository = makeUserTokensRepository();

  return new AuthenticateUserWithGoogleUseCase(
    googleOAuth2Provider,
    usersRepository,
    jwtProvider,
    uuidProvider,
    authConfig.REFRESH_TOKEN_EXPIRES_IN_MILLISSECONDS,
    userTokensRepository
  );
}
