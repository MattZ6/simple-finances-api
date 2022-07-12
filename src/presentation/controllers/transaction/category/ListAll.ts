import { IListAllTransactionCategoriesUseCase } from '@domain/usecases/transaction/category/ListAll';

import { TransactionCategoryMapper } from '@presentation/dtos';
import { ok } from '@presentation/helpers';
import {
  IController,
  IHttpRequest,
  IHttpResponse,
} from '@presentation/protocols';

class ListAllTransactionCategoriesController implements IController {
  constructor(
    private readonly listAllTransactionCategoriesUseCase: IListAllTransactionCategoriesUseCase
  ) {}

  async handle(): Promise<ListAllTransactionCategoriesController.Response> {
    const output = await this.listAllTransactionCategoriesUseCase.execute();

    return ok(TransactionCategoryMapper.toListItemsDTO(output));
  }
}

namespace ListAllTransactionCategoriesController {
  export type Request = IHttpRequest<void, void, void, void>;

  export type Response = IHttpResponse;
}

export { ListAllTransactionCategoriesController };
