import {
  ICreateTransactionRepository,
  IFindAllMonthsByUserRepository,
  IFindAllTransactionsByUserRepository,
} from '@application/protocols/repositories/transaction';

import { prisma } from '..';

export class PrismaTransactionsRepository
  implements
    ICreateTransactionRepository,
    IFindAllMonthsByUserRepository,
    IFindAllTransactionsByUserRepository
{
  async findAllByUser(
    data: IFindAllTransactionsByUserRepository.Input
  ): Promise<IFindAllTransactionsByUserRepository.Output> {
    const { user_id, date, order_by, order } = data;

    const start = new Date(date.getUTCFullYear(), date.getUTCMonth(), 1);
    const end = new Date(start);
    end.setMonth(end.getUTCMonth() + 1);
    end.setDate(end.getUTCDate() - 1);

    const transactions = await prisma.transaction.findMany({
      where: {
        user_id,
        date: {
          gte: start,
          lte: end,
        },
      },
      orderBy: {
        [order_by]: order,
      },
    });

    return transactions;
  }

  async findAllMonthsByUser(
    data: IFindAllMonthsByUserRepository.Input
  ): Promise<IFindAllMonthsByUserRepository.Output> {
    const { user_id } = data;

    const results =
      await prisma.$queryRaw<IFindAllMonthsByUserRepository.Output>`
      SELECT DATE_TRUNC('month', transactions.date) AS date FROM transactions
        WHERE transactions.user_id = ${user_id}
      GROUP BY DATE_TRUNC('month', transactions.date)
      ORDER BY DATE_TRUNC('month', transactions.date);
    `;

    return results;
  }

  async create(
    data: ICreateTransactionRepository.Input
  ): Promise<ICreateTransactionRepository.Output> {
    const { user_id, title, value, date, type } = data;

    const transaction = await prisma.transaction.create({
      data: {
        user_id,
        title,
        value,
        date,
        type,
      },
    });

    return transaction;
  }
}
