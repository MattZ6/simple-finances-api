import { CreateTransactionUseCase } from '@application/usecases/transaction/Create';

import {
  makeTransactionsRepository,
  makeUsersRepository,
} from '@main/factories/repositories';

export function makeCreateTransactionUseCase() {
  const usersRepository = makeUsersRepository();
  const transactionsRepository = makeTransactionsRepository();

  return new CreateTransactionUseCase(usersRepository, transactionsRepository);
}
