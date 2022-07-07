import { IVerifyJWTProvider } from '@application/protocols/providers/jwt';

import {
  AccessTokenNotProvidedError,
  InvalidAccessTokenError,
  AccessTokenExpiredError,
} from '@presentation/errors/token';
import { ok, unauthorized } from '@presentation/helpers';
import {
  IMiddleware,
  IHttpRequest,
  IHttpResponse,
} from '@presentation/protocols';

class AuthenticationMiddleware implements IMiddleware {
  constructor(private readonly verifyJWTProvider: IVerifyJWTProvider) {}

  async handle(
    request: AuthenticationMiddleware.Request
  ): Promise<AuthenticationMiddleware.Response> {
    try {
      const accessToken = request.headers['x-access-token'];

      if (!accessToken) {
        throw new AccessTokenNotProvidedError();
      }

      const { subject } = await this.verifyJWTProvider.verify({
        value: accessToken,
      });

      return ok<AuthenticationMiddleware.ResponseBody>({
        user: { id: subject },
      });
    } catch (error) {
      if (error instanceof AccessTokenNotProvidedError) {
        return unauthorized(error);
      }

      if (error instanceof InvalidAccessTokenError) {
        return unauthorized(error);
      }

      if (error instanceof AccessTokenExpiredError) {
        return unauthorized(error);
      }

      throw error;
    }
  }
}

namespace AuthenticationMiddleware {
  type RequestHeaders = {
    ['x-access-token']: string;
  };

  export type Request = IHttpRequest<unknown, unknown, unknown, RequestHeaders>;

  export type Response = IHttpResponse;

  export type ResponseBody = {
    user: {
      id: string;
    };
  };
}

export { AuthenticationMiddleware };
