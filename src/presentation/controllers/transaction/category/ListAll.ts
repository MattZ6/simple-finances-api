import { IListAllTransactionCategoriesUseCase } from '@domain/usecases/transaction/category/ListAll';

import { TransactionCategoryMapper } from '@presentation/dtos';
import { badRequest, ok } from '@presentation/helpers';
import {
  IController,
  IHttpRequest,
  IHttpResponse,
} from '@presentation/protocols';
import { ValidationError } from '@presentation/validations/errors';
import { IValidation } from '@presentation/validations/protocols';

class ListAllTransactionCategoriesController implements IController {
  constructor(
    private readonly validation: IValidation,
    private readonly listAllTransactionCategoriesUseCase: IListAllTransactionCategoriesUseCase
  ) {}

  async handle(
    request: ListAllTransactionCategoriesController.Request
  ): Promise<ListAllTransactionCategoriesController.Response> {
    try {
      const validationError = this.validation.validate(request.query);

      if (validationError) {
        throw validationError;
      }

      const { type } = request.query;

      const output = await this.listAllTransactionCategoriesUseCase.execute({
        type,
      });

      return ok(TransactionCategoryMapper.toListItemsDTO(output));
    } catch (error) {
      if (error instanceof ValidationError) {
        return badRequest(error);
      }

      throw error;
    }
  }
}

namespace ListAllTransactionCategoriesController {
  export type RequestQuery = IListAllTransactionCategoriesUseCase.Input;

  export type Request = IHttpRequest<void, void, RequestQuery, void>;

  export type Response = IHttpResponse;
}

export { ListAllTransactionCategoriesController };
