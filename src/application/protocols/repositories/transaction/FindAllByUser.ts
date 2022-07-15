import { Transaction } from '@domain/entities/Transaction';

interface IFindAllTransactionsByUserRepository {
  findAllByUser(
    data: IFindAllTransactionsByUserRepository.Input
  ): Promise<IFindAllTransactionsByUserRepository.Output>;
}

namespace IFindAllTransactionsByUserRepository {
  export type Input = Pick<Transaction, 'user_id'> & {
    date: Date;
    order_by: 'date';
    order: 'asc' | 'desc';
    include?: { category?: boolean };
  };

  export type Output = Transaction[];
}

export { IFindAllTransactionsByUserRepository };
