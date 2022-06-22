import { Transaction } from '@domain/entities/Transaction';

interface ICreateTransactionRepository {
  create(
    data: ICreateTransactionRepository.Input
  ): Promise<ICreateTransactionRepository.Output>;
}

namespace ICreateTransactionRepository {
  export type Input = Pick<
    Transaction,
    'user_id' | 'title' | 'value' | 'date' | 'type'
  >;

  export type Output = Transaction;
}

export { ICreateTransactionRepository };
