import { ListAllTransactionCategoriesController } from '@presentation/controllers/transaction/category/ListAll';

import { makeControllerErrorHandlerDecorator } from '@main/factories/decorators';
import { makeListAllTransactionCategoriesUseCase } from '@main/factories/usecases/transaction';

export function makeListAllTransactionCategoriesController() {
  const listAllTransactionCategoriesUseCase =
    makeListAllTransactionCategoriesUseCase();

  const controller = new ListAllTransactionCategoriesController(
    listAllTransactionCategoriesUseCase
  );

  return makeControllerErrorHandlerDecorator(controller);
}
