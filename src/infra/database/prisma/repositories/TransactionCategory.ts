import { IFindAllTransactionCategoriesRepository } from '@application/protocols/repositories/transaction';

import { prisma } from '..';

export class PrismaTransactionCategoriesRepository
  implements IFindAllTransactionCategoriesRepository
{
  async findAll(
    data: IFindAllTransactionCategoriesRepository.Input
  ): Promise<IFindAllTransactionCategoriesRepository.Output> {
    const { type, sort_by, order_by } = data;

    const transactions = await prisma.transactionCategory.findMany({
      where: {
        type: {
          equals: type,
        },
      },
      orderBy: {
        [sort_by]: order_by,
      },
    });

    return transactions;
  }
}
