import { CreateTransactionController } from '@presentation/controllers/transaction/Create';

import { makeControllerErrorHandlerDecorator } from '@main/factories/decorators';
import { makeCreateTransactionUseCase } from '@main/factories/usecases/transaction';
import { makeCreateTransactionControllerValidation } from '@main/factories/validators/controllers/transaction';

export function makeCreateTransactionController() {
  const validation = makeCreateTransactionControllerValidation();
  const createTransactionUseCase = makeCreateTransactionUseCase();

  const controller = new CreateTransactionController(
    validation,
    createTransactionUseCase
  );

  return makeControllerErrorHandlerDecorator(controller);
}
