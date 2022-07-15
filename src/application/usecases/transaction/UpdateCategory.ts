import {
  DivergentTransactionTypesError,
  TransactionCategoryNotFoundByIdError,
  TransactionNotFoundByIdFromUserError,
} from '@domain/errors';
import { IUpdateCategoryFromTransactionUseCase } from '@domain/usecases/transaction/UpdateCategory';

import {
  IFindTransactionByIdFromUserRepository,
  IFindTransactionCategoryByIdRepository,
  IUpdateTransactionRepository,
} from '@application/protocols/repositories/transaction';

export class UpdateCategoryFromTransactionUseCase
  implements IUpdateCategoryFromTransactionUseCase
{
  constructor(
    private readonly findTransactionByIdFromUserRepository: IFindTransactionByIdFromUserRepository,
    private readonly findTransactionCategoryByIdRepository: IFindTransactionCategoryByIdRepository,
    private readonly updateTransactionRepository: IUpdateTransactionRepository
  ) {}

  async execute(
    data: IUpdateCategoryFromTransactionUseCase.Input
  ): Promise<IUpdateCategoryFromTransactionUseCase.Output> {
    const { transaction_id, user_id, category_id } = data;

    const transaction =
      await this.findTransactionByIdFromUserRepository.findByIdFromUser({
        id: transaction_id,
        user_id,
      });

    if (!transaction) {
      throw new TransactionNotFoundByIdFromUserError();
    }

    const category = await this.findTransactionCategoryByIdRepository.findById({
      id: category_id,
    });

    if (!category) {
      throw new TransactionCategoryNotFoundByIdError();
    }

    const isSameType = category.type === transaction.type;

    if (!isSameType) {
      throw new DivergentTransactionTypesError();
    }

    const updatedTransaction = await this.updateTransactionRepository.update({
      id: transaction_id,
      category_id: category.id,
    });

    return updatedTransaction;
  }
}
