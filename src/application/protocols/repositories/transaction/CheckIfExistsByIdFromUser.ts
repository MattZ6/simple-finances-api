import { Transaction } from '@domain/entities/Transaction';

interface IFindTransactionByIdFromUserRepository {
  findByIdFromUser(
    data: IFindTransactionByIdFromUserRepository.Input
  ): Promise<IFindTransactionByIdFromUserRepository.Output>;
}

namespace IFindTransactionByIdFromUserRepository {
  export type Input = Pick<Transaction, 'id' | 'user_id'>;

  export type Output = Transaction | undefined;
}

export { IFindTransactionByIdFromUserRepository };
