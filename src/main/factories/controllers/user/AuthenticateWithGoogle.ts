import { AuthenticateUserWithGoogleController } from '@presentation/controllers/user/AuthenticateWithGoogle';

import { makeControllerErrorHandlerDecorator } from '@main/factories/decorators';
import { makeAuthenticateUserWithGoogleUseCase } from '@main/factories/usecases/user';
import { makeAuthenticateUserWithGoogleControllerValidation } from '@main/factories/validators/controllers/user';

export function makeAuthenticateUserWithGoogleController() {
  const validation = makeAuthenticateUserWithGoogleControllerValidation();
  const authenticateUserWithGoogleUseCase =
    makeAuthenticateUserWithGoogleUseCase();

  const controller = new AuthenticateUserWithGoogleController(
    validation,
    authenticateUserWithGoogleUseCase
  );

  return makeControllerErrorHandlerDecorator(controller);
}
