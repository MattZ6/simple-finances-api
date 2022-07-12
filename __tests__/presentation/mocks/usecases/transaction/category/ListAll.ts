import { IListAllTransactionCategoriesUseCase } from '@domain/usecases/transaction/category/ListAll';

import { makeTransactionCategoryMock } from '../../../../../domain';

export function makeListAllTransactionCategoriesUseCaseMock(): IListAllTransactionCategoriesUseCase.Output {
  return [
    makeTransactionCategoryMock(),
    makeTransactionCategoryMock(),
    makeTransactionCategoryMock(),
  ];
}

export class ListAllTransactionCategoriesUseCaseSpy
  implements IListAllTransactionCategoriesUseCase
{
  async execute(): Promise<IListAllTransactionCategoriesUseCase.Output> {
    return makeListAllTransactionCategoriesUseCaseMock();
  }
}
