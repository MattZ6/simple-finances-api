import { TransactionCategory } from '@domain/entities/TransactionCategory';

interface IListAllTransactionCategoriesUseCase {
  execute(): Promise<IListAllTransactionCategoriesUseCase.Output>;
}

namespace IListAllTransactionCategoriesUseCase {
  export type Output = TransactionCategory[];
}

export { IListAllTransactionCategoriesUseCase };
