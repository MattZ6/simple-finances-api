import { TransactionCategory } from '@domain/entities/TransactionCategory';

interface IFindAllTransactionCategoriesRepository {
  findAll(
    data: IFindAllTransactionCategoriesRepository.Input
  ): Promise<IFindAllTransactionCategoriesRepository.Output>;
}

namespace IFindAllTransactionCategoriesRepository {
  export type Input = Pick<TransactionCategory, 'type'> & {
    sort_by: keyof Pick<TransactionCategory, 'title' | 'created_at'>;
    order_by: 'asc' | 'desc';
  };

  export type Output = TransactionCategory[];
}

export { IFindAllTransactionCategoriesRepository };
