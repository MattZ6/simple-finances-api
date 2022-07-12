import { ListAllTransactionCategoriesUseCase } from '@application/usecases/transaction/category/ListAll';

import { cacheConfig } from '@main/config/env';
import { makeRedisCacheProvider } from '@main/factories/providers';
import { makeTransactionCategoriesRepository } from '@main/factories/repositories';

export function makeListAllTransactionCategoriesUseCase() {
  const transactionCategoriesRepository = makeTransactionCategoriesRepository();
  const cacheProvider = makeRedisCacheProvider();

  return new ListAllTransactionCategoriesUseCase(
    cacheConfig.TRANSACTION_CATEGORY_CACHE.KEY,
    cacheConfig.TRANSACTION_CATEGORY_CACHE.EXPIRATION_IN_SECONDS,
    cacheProvider,
    cacheProvider,
    transactionCategoriesRepository
  );
}
