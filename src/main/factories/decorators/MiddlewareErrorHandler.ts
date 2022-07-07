import { IMiddleware } from '@presentation/protocols';

import { MiddlewareErrorHandlerDecorator } from '@main/decorators/MiddlewareErrorHandler';

import { makeErrorsRepository } from '../repositories';

export function makeMiddlewareErrorHandlerDecorator(middleware: IMiddleware) {
  const errorsRepository = makeErrorsRepository();

  return new MiddlewareErrorHandlerDecorator(middleware, errorsRepository);
}
