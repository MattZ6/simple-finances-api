import { Transaction } from '@domain/entities/Transaction';

interface IListTransactionMonthsByUserUseCase {
  execute(
    data: IListTransactionMonthsByUserUseCase.Input
  ): Promise<IListTransactionMonthsByUserUseCase.Output>;
}

namespace IListTransactionMonthsByUserUseCase {
  export type Input = Pick<Transaction, 'user_id'>;

  export type Output = Pick<Transaction, 'date'>[];
}

export { IListTransactionMonthsByUserUseCase };
