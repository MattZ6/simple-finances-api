import { UserNotFoundByIdError } from '@domain/errors';
import { IGetTransactionsBalanceByUserUseCase } from '@domain/usecases/transaction/GetBalanceByUser';

import { IFindAllTransactionsByUserRepository } from '@application/protocols/repositories/transaction';
import { ICheckIfUserExistsByIdRepository } from '@application/protocols/repositories/user';

export class GetTransactionsBalanceByUserUseCase
  implements IGetTransactionsBalanceByUserUseCase
{
  constructor(
    private readonly checkIfUserExistsByIdRepository: ICheckIfUserExistsByIdRepository,
    private readonly findAllTransactionsByUserRepository: IFindAllTransactionsByUserRepository
  ) {}

  async execute(
    data: IGetTransactionsBalanceByUserUseCase.Input
  ): Promise<IGetTransactionsBalanceByUserUseCase.Output> {
    const { user_id, date } = data;

    const userExists =
      await this.checkIfUserExistsByIdRepository.checkIfExistsById({
        id: user_id,
      });

    if (!userExists) {
      throw new UserNotFoundByIdError();
    }

    const parsedDate = new Date(date);
    const startOfTheMonth = new Date(
      parsedDate.getUTCFullYear(),
      parsedDate.getUTCMonth()
    );

    const transactions =
      await this.findAllTransactionsByUserRepository.findAllByUser({
        user_id,
        date: startOfTheMonth,
        order_by: 'date',
        order: 'desc',
      });

    const balance = transactions.reduce(
      (balance, transaction) => {
        let { income, outcome, total } = balance;
        const { value } = transaction;

        if (transaction.type === 'INCOME') {
          income += value;
          total += value;
        }

        if (transaction.type === 'OUTCOME') {
          outcome -= value;
          total -= value;
        }

        return { income, outcome, total };
      },
      {
        income: 0,
        outcome: 0,
        total: 0,
      }
    );

    const parsedTransactions = transactions.map(transaction => {
      const multiplier = transaction.type === 'INCOME' ? 1 : -1;

      return {
        ...transaction,
        value: multiplier * transaction.value,
      };
    });

    return {
      ...balance,
      transactions: parsedTransactions,
    };
  }
}
