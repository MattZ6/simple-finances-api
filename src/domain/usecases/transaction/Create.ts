import { Transaction } from '@domain/entities/Transaction';

interface ICreateTransactionUseCase {
  execute(
    data: ICreateTransactionUseCase.Input
  ): Promise<ICreateTransactionUseCase.Output>;
}

namespace ICreateTransactionUseCase {
  export type Input = Pick<
    Transaction,
    'user_id' | 'title' | 'value' | 'date' | 'type'
  >;

  export type Output = Transaction;
}

export { ICreateTransactionUseCase };
