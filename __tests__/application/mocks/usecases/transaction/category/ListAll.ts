import { faker } from '@faker-js/faker';

export function makeListAllTransactionCategoriesUseCaseCacheKeyMock() {
  return faker.datatype.string();
}

export function makeListAllTransactionCategoriesUseCaseCacheExpirationInSecondsMock() {
  return faker.datatype.number({ min: 1 });
}
