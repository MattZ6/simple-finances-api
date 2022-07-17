import {
  ICreateTransactionRepository,
  IFindAllMonthsByUserRepository,
  IFindAllTransactionsByUserRepository,
  IFindTransactionByIdFromUserRepository,
  IUpdateTransactionRepository,
} from '@application/protocols/repositories/transaction';

import { prisma } from '..';

export class PrismaTransactionsRepository
  implements
    ICreateTransactionRepository,
    IFindAllMonthsByUserRepository,
    IFindAllTransactionsByUserRepository,
    IFindTransactionByIdFromUserRepository,
    IUpdateTransactionRepository
{
  async update(
    data: IUpdateTransactionRepository.Input
  ): Promise<IUpdateTransactionRepository.Output> {
    const { id, title, date, value, type, category_id } = data;

    const transaction = await prisma.transaction.update({
      where: {
        id,
      },
      data: {
        title,
        date,
        value,
        type,
        category_id,
      },
    });

    return transaction;
  }

  async findByIdFromUser(
    data: IFindTransactionByIdFromUserRepository.Input
  ): Promise<IFindTransactionByIdFromUserRepository.Output> {
    const { id, user_id } = data;

    const transaction = await prisma.transaction.findFirst({
      where: {
        id,
        user_id,
      },
    });

    return transaction;
  }

  async findAllByUser(
    data: IFindAllTransactionsByUserRepository.Input
  ): Promise<IFindAllTransactionsByUserRepository.Output> {
    const { user_id, date, include, order_by, order } = data;

    const start = new Date(
      date.getUTCFullYear(),
      date.getUTCMonth(),
      1,
      0,
      0,
      0,
      0
    );
    const end = new Date(start);
    end.setMonth(end.getUTCMonth() + 1);

    const transactions = await prisma.transaction.findMany({
      where: {
        user_id,
        date: {
          gte: start,
          lt: end,
        },
      },
      include,
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
