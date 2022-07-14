import { TransactionCategory } from '@domain/entities/TransactionCategory';

interface IListAllTransactionCategoriesUseCase {
  execute(
    data: IListAllTransactionCategoriesUseCase.Input
  ): Promise<IListAllTransactionCategoriesUseCase.Output>;
}

namespace IListAllTransactionCategoriesUseCase {
  export type Input = Pick<TransactionCategory, 'type'>;

  export type Output = TransactionCategory[];
}

export { IListAllTransactionCategoriesUseCase };
