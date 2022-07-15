import { UpdateCategoryFromTransactionUseCase } from '@application/usecases/transaction/UpdateCategory';

import {
  makeTransactionCategoriesRepository,
  makeTransactionsRepository,
} from '@main/factories/repositories';

export function makeUpdateCategoryFromTransactionUseCase() {
  const transactionsRepository = makeTransactionsRepository();
  const transactionCategoriesRepository = makeTransactionCategoriesRepository();

  return new UpdateCategoryFromTransactionUseCase(
    transactionsRepository,
    transactionCategoriesRepository,
    transactionsRepository
  );
}
