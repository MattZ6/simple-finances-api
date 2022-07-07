import { Transaction } from '@domain/entities/Transaction';

interface IFindAllMonthsByUserRepository {
  findAllMonthsByUser(
    data: IFindAllMonthsByUserRepository.Input
  ): Promise<IFindAllMonthsByUserRepository.Output>;
}

namespace IFindAllMonthsByUserRepository {
  export type Input = Pick<Transaction, 'user_id'>;

  export type Output = Pick<Transaction, 'date'>[];
}

export { IFindAllMonthsByUserRepository };
