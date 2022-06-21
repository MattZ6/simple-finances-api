import { RefreshUserAccessTokenController } from '@presentation/controllers/user/RefreshAccessToken';

import { makeControllerErrorHandlerDecorator } from '@main/factories/decorators';
import { makeRefreshUserAccessTokenUseCase } from '@main/factories/usecases/user';
import { makeRefreshUserAccessTokenControllerValidation } from '@main/factories/validators/controllers/user';

export function makeRefreshUserAccessTokenController() {
  const validation = makeRefreshUserAccessTokenControllerValidation();
  const refreshUserAccessTokenUseCase = makeRefreshUserAccessTokenUseCase();

  const controller = new RefreshUserAccessTokenController(
    validation,
    refreshUserAccessTokenUseCase
  );

  return makeControllerErrorHandlerDecorator(controller);
}
