import { PrismaTransactionCategoriesRepository } from '@infra/database/prisma/repositories/TransactionCategory';

export function makeTransactionCategoriesRepository() {
  return new PrismaTransactionCategoriesRepository();
}
