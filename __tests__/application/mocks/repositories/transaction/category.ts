import { IFindAllTransactionCategoriesRepository } from '@application/protocols/repositories/transaction';

import { makeTransactionCategoryMock } from '../../../../domain';

export function makeFindAllTransactionCategoriesRepositoryOutputMock() {
  return [makeTransactionCategoryMock()];
}

export class FindAllTransactionCategoriesRepositorySpy
  implements IFindAllTransactionCategoriesRepository
{
  async findAll(
    _: IFindAllTransactionCategoriesRepository.Input
  ): Promise<IFindAllTransactionCategoriesRepository.Output> {
    return makeFindAllTransactionCategoriesRepositoryOutputMock();
  }
}
