import { UserNotFoundByIdError } from '@domain/errors';
import { ICreateTransactionUseCase } from '@domain/usecases/transaction/Create';

import { created, badRequest, notFound } from '@presentation/helpers';
import {
  IController,
  IHttpRequest,
  IHttpResponse,
} from '@presentation/protocols';
import { ValidationError } from '@presentation/validations/errors';
import { IValidation } from '@presentation/validations/protocols';

class CreateTransactionController implements IController {
  constructor(
    private readonly validation: IValidation,
    private readonly createTransactionUseCase: ICreateTransactionUseCase
  ) {}

  async handle(
    request: CreateTransactionController.Request
  ): Promise<CreateTransactionController.Response> {
    try {
      const validationError = this.validation.validate(request.body);

      if (validationError) {
        throw validationError;
      }

      const { id } = request.user;
      const { title, value, date, type } = request.body;

      await this.createTransactionUseCase.execute({
        user_id: id,
        title,
        value,
        date,
        type,
      });

      return created<void>();
    } catch (error) {
      if (error instanceof ValidationError) {
        return badRequest(error);
      }

      if (error instanceof UserNotFoundByIdError) {
        return notFound(error);
      }

      throw error;
    }
  }
}

namespace CreateTransactionController {
  export type RequestBody = Omit<ICreateTransactionUseCase.Input, 'user_id'>;

  export type Request = IHttpRequest<RequestBody, void, void, void>;

  export type Response = IHttpResponse;
}

export { CreateTransactionController };
