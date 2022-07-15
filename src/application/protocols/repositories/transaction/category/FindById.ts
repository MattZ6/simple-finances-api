import { TransactionCategory } from '@domain/entities/TransactionCategory';

interface IFindTransactionCategoryByIdRepository {
  findById(
    data: IFindTransactionCategoryByIdRepository.Input
  ): Promise<IFindTransactionCategoryByIdRepository.Output>;
}

namespace IFindTransactionCategoryByIdRepository {
  export type Input = Pick<TransactionCategory, 'id'>;

  export type Output = TransactionCategory | undefined;
}

export { IFindTransactionCategoryByIdRepository };
