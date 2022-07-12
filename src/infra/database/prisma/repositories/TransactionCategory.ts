import { IFindAllTransactionCategoriesRepository } from '@application/protocols/repositories/transaction';

import { prisma } from '..';

export class PrismaTransactionCategoriesRepository
  implements IFindAllTransactionCategoriesRepository
{
  async findAll(
    data: IFindAllTransactionCategoriesRepository.Input
  ): Promise<IFindAllTransactionCategoriesRepository.Output> {
    const { sort_by, order_by } = data;

    const transactions = await prisma.transactionCategory.findMany({
      orderBy: {
        [sort_by]: order_by,
      },
    });

    return transactions;
  }
}
