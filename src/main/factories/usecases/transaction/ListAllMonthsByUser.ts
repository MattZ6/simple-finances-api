import { ListTransactionMonthsByUserUseCase } from '@application/usecases/transaction/ListMonthsByUser';

import {
  makeTransactionsRepository,
  makeUsersRepository,
} from '@main/factories/repositories';

export function makeListTransactionMonthsByUserUseCase() {
  const usersRepository = makeUsersRepository();
  const transactionsRepository = makeTransactionsRepository();

  return new ListTransactionMonthsByUserUseCase(
    usersRepository,
    transactionsRepository
  );
}
