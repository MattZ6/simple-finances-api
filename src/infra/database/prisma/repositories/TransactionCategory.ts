import {
  IFindAllTransactionCategoriesRepository,
  IFindTransactionCategoryByIdRepository,
} from '@application/protocols/repositories/transaction';

import { prisma } from '..';

export class PrismaTransactionCategoriesRepository
  implements
    IFindAllTransactionCategoriesRepository,
    IFindTransactionCategoryByIdRepository
{
  async findById(
    data: IFindTransactionCategoryByIdRepository.Input
  ): Promise<IFindTransactionCategoryByIdRepository.Output> {
    const { id } = data;

    const transactionCategory = await prisma.transactionCategory.findUnique({
      where: { id },
    });

    return transactionCategory;
  }

  async findAll(
    data: IFindAllTransactionCategoriesRepository.Input
  ): Promise<IFindAllTransactionCategoriesRepository.Output> {
    const { type, sort_by, order_by } = data;

    const transactionCategories = await prisma.transactionCategory.findMany({
      where: {
        type: {
          equals: type,
        },
      },
      orderBy: {
        [sort_by]: order_by,
      },
    });

    return transactionCategories;
  }
}
