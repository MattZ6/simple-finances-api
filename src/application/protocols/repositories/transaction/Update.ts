import { Transaction } from '@domain/entities/Transaction';

interface IUpdateTransactionRepository {
  update(
    data: IUpdateTransactionRepository.Input
  ): Promise<IUpdateTransactionRepository.Output>;
}

namespace IUpdateTransactionRepository {
  export type Input = Pick<Transaction, 'id'> &
    Pick<
      Partial<Transaction>,
      'title' | 'date' | 'value' | 'type' | 'category_id'
    >;

  export type Output = Transaction;
}

export { IUpdateTransactionRepository };
