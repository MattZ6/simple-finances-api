import { ListAllTransactionCategoriesController } from '@presentation/controllers/transaction/category/ListAll';

import { makeControllerErrorHandlerDecorator } from '@main/factories/decorators';
import { makeListAllTransactionCategoriesUseCase } from '@main/factories/usecases/transaction';
import { makeListAllTransactionCategoriesControllerValidation } from '@main/factories/validators/controllers/transaction';

export function makeListAllTransactionCategoriesController() {
  const validation = makeListAllTransactionCategoriesControllerValidation();
  const listAllTransactionCategoriesUseCase =
    makeListAllTransactionCategoriesUseCase();

  const controller = new ListAllTransactionCategoriesController(
    validation,
    listAllTransactionCategoriesUseCase
  );

  return makeControllerErrorHandlerDecorator(controller);
}
