import { faker } from '@faker-js/faker';

import { EnumTransactionType } from '@domain/entities/Transaction';
import { IListAllTransactionCategoriesUseCase } from '@domain/usecases/transaction/category/ListAll';

export function makeListAllTransactionCategoriesUseCaseCacheKeyMock() {
  return faker.datatype.string();
}

export function makeListAllTransactionCategoriesUseCaseCacheExpirationInSecondsMock() {
  return faker.datatype.number({ min: 1 });
}

export function makeListAllTransactionCategoriesUseCaseInputMock(): IListAllTransactionCategoriesUseCase.Input {
  return {
    type: faker.helpers.arrayElement<EnumTransactionType>([
      'INCOME',
      'OUTCOME',
    ]),
  };
}
