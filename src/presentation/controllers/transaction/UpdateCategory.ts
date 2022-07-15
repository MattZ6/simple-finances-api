import {
  DivergentTransactionTypesError,
  TransactionCategoryNotFoundByIdError,
  TransactionNotFoundByIdFromUserError,
} from '@domain/errors';
import { IUpdateCategoryFromTransactionUseCase } from '@domain/usecases/transaction/UpdateCategory';

import {
  created,
  badRequest,
  notFound,
  unprocessableEntity,
} from '@presentation/helpers';
import {
  IController,
  IHttpRequest,
  IHttpResponse,
} from '@presentation/protocols';
import { ValidationError } from '@presentation/validations/errors';
import { IValidation } from '@presentation/validations/protocols';

class UpdateCategoryFromTransactionController implements IController {
  constructor(
    private readonly validation: IValidation,
    private readonly updateCategoryFromTransactionUseCase: IUpdateCategoryFromTransactionUseCase
  ) {}

  async handle(
    request: UpdateCategoryFromTransactionController.Request
  ): Promise<UpdateCategoryFromTransactionController.Response> {
    try {
      const validationError = this.validation.validate({
        ...request.params,
        ...request.body,
      });

      if (validationError) {
        throw validationError;
      }

      const { id } = request.user;
      const { transaction_id } = request.params;
      const { category_id } = request.body;

      await this.updateCategoryFromTransactionUseCase.execute({
        user_id: id,
        transaction_id,
        category_id,
      });

      return created<void>();
    } catch (error) {
      if (error instanceof ValidationError) {
        return badRequest(error);
      }

      if (error instanceof TransactionNotFoundByIdFromUserError) {
        return notFound(error);
      }

      if (error instanceof TransactionCategoryNotFoundByIdError) {
        return notFound(error);
      }

      if (error instanceof DivergentTransactionTypesError) {
        return unprocessableEntity(error);
      }

      throw error;
    }
  }
}

namespace UpdateCategoryFromTransactionController {
  export type RequestParams = Pick<
    IUpdateCategoryFromTransactionUseCase.Input,
    'transaction_id'
  >;

  export type RequestBody = Pick<
    IUpdateCategoryFromTransactionUseCase.Input,
    'category_id'
  >;

  export type Request = IHttpRequest<RequestBody, RequestParams, void, void>;

  export type Response = IHttpResponse;
}

export { UpdateCategoryFromTransactionController };
