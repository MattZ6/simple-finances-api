import { GetBalanceByUserController } from '@presentation/controllers/transaction/GetBalanceByUser';

import { makeControllerErrorHandlerDecorator } from '@main/factories/decorators';
import { makeGetTransactionsBalanceByUserUseCase } from '@main/factories/usecases/transaction';

export function makeGetBalanceByUserController() {
  const getTransactionsBalanceByUserUseCase =
    makeGetTransactionsBalanceByUserUseCase();

  const controller = new GetBalanceByUserController(
    getTransactionsBalanceByUserUseCase
  );

  return makeControllerErrorHandlerDecorator(controller);
}
