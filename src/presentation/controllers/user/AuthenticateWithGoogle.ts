import { IAuthenticateUserWithGoogleUseCase } from '@domain/usecases/user/AuthenticateWithGoogle';

import { badRequest, ok } from '@presentation/helpers';
import {
  IController,
  IHttpRequest,
  IHttpResponse,
} from '@presentation/protocols';
import { ValidationError } from '@presentation/validations/errors';
import { IValidation } from '@presentation/validations/protocols';

class AuthenticateUserWithGoogleController implements IController {
  constructor(
    private readonly validation: IValidation,
    private readonly authenticateUserWithGoogleUseCase: IAuthenticateUserWithGoogleUseCase
  ) {}

  async handle(
    request: AuthenticateUserWithGoogleController.Request
  ): Promise<AuthenticateUserWithGoogleController.Response> {
    try {
      const validationError = this.validation.validate(request.body);

      if (validationError) {
        throw validationError;
      }

      const { code } = request.body;

      const authentication =
        await this.authenticateUserWithGoogleUseCase.execute({ code });

      return ok(authentication);
    } catch (error) {
      if (error instanceof ValidationError) {
        return badRequest(error);
      }

      throw error;
    }
  }
}

namespace AuthenticateUserWithGoogleController {
  export type RequestBody = IAuthenticateUserWithGoogleUseCase.Input;

  export type Request = IHttpRequest<RequestBody, void, void, void>;

  export type Response = IHttpResponse;
}

export { AuthenticateUserWithGoogleController };
