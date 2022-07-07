import { GetTransactionsBalanceByUserUseCase } from '@application/usecases/transaction/GetBalanceByUser';

import {
  makeTransactionsRepository,
  makeUsersRepository,
} from '@main/factories/repositories';

export function makeGetTransactionsBalanceByUserUseCase() {
  const usersRepository = makeUsersRepository();
  const transactionsRepository = makeTransactionsRepository();

  return new GetTransactionsBalanceByUserUseCase(
    usersRepository,
    transactionsRepository
  );
}
