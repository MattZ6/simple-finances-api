import { ListAllMonthsByUserController } from '@presentation/controllers/transaction/ListAllMonthsByUser';

import { makeControllerErrorHandlerDecorator } from '@main/factories/decorators';
import { makeListTransactionMonthsByUserUseCase } from '@main/factories/usecases/transaction';

export function makeListAllMonthsByUserController() {
  const listTransactionMonthsByUserUseCase =
    makeListTransactionMonthsByUserUseCase();

  const controller = new ListAllMonthsByUserController(
    listTransactionMonthsByUserUseCase
  );

  return makeControllerErrorHandlerDecorator(controller);
}
