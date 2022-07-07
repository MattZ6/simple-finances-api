import { Transaction } from '@domain/entities/Transaction';

interface IGetTransactionsBalanceByUserUseCase {
  execute(
    data: IGetTransactionsBalanceByUserUseCase.Input
  ): Promise<IGetTransactionsBalanceByUserUseCase.Output>;
}

namespace IGetTransactionsBalanceByUserUseCase {
  export type Input = {
    date: Date;
  } & Pick<Transaction, 'user_id'>;

  export type Output = {
    income: number;
    outcome: number;
    total: number;
    transactions: Transaction[];
  };
}

export { IGetTransactionsBalanceByUserUseCase };
