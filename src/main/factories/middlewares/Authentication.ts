import { AuthenticationMiddleware } from '@presentation/middlewares/Authentication';

import { makeMiddlewareErrorHandlerDecorator } from '../decorators';
import { makeJWTProvider } from '../providers';

export function makeAuthenticationMiddleware() {
  const jwtProvider = makeJWTProvider();

  const middleware = new AuthenticationMiddleware(jwtProvider);

  return makeMiddlewareErrorHandlerDecorator(middleware);
}
