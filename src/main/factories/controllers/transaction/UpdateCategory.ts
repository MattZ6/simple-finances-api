import { UpdateCategoryFromTransactionController } from '@presentation/controllers/transaction/UpdateCategory';

import { makeControllerErrorHandlerDecorator } from '@main/factories/decorators';
import { makeUpdateCategoryFromTransactionUseCase } from '@main/factories/usecases/transaction';
import { makeUpdateCategoryFromTransactionControllerValidation } from '@main/factories/validators/controllers/transaction';

export function makeUpdateCategoryFromTransactionController() {
  const validation = makeUpdateCategoryFromTransactionControllerValidation();
  const updateCategoryFromTransactionUseCase =
    makeUpdateCategoryFromTransactionUseCase();

  const controller = new UpdateCategoryFromTransactionController(
    validation,
    updateCategoryFromTransactionUseCase
  );

  return makeControllerErrorHandlerDecorator(controller);
}
