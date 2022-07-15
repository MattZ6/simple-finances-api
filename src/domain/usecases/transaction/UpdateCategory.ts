import { Transaction } from '@domain/entities/Transaction';

interface IUpdateCategoryFromTransactionUseCase {
  execute(
    data: IUpdateCategoryFromTransactionUseCase.Input
  ): Promise<IUpdateCategoryFromTransactionUseCase.Output>;
}

namespace IUpdateCategoryFromTransactionUseCase {
  export type Input = {
    transaction_id: string;
    category_id: string;
    user_id: string;
  };

  export type Output = Transaction;
}

export { IUpdateCategoryFromTransactionUseCase };
