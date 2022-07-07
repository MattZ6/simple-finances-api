import { PrismaTransactionsRepository } from '@infra/database/prisma/repositories/Transaction';

export function makeTransactionsRepository() {
  return new PrismaTransactionsRepository();
}
