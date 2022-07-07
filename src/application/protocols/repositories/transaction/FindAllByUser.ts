import { Transaction } from '@domain/entities/Transaction';

interface IFindAllTransactionsByUserRepository {
  findAllByUser(
    data: IFindAllTransactionsByUserRepository.Input
  ): Promise<IFindAllTransactionsByUserRepository.Output>;
}

namespace IFindAllTransactionsByUserRepository {
  export type Input = {
    date: Date;
    order_by: 'date';
    order: 'asc' | 'desc';
  } & Pick<Transaction, 'user_id'>;

  export type Output = Transaction[];
}

export { IFindAllTransactionsByUserRepository };
