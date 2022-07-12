import { faker } from '@faker-js/faker';

import { TransactionCategory } from '@domain/entities/TransactionCategory';

export function makeTransactionCategoryMock(): TransactionCategory {
  const date = faker.datatype.datetime();

  return {
    id: faker.datatype.uuid(),
    title: faker.datatype.string(),
    description: faker.datatype.string(),
    slug: faker.datatype.string(),
    created_at: date,
    updated_at: date,
  };
}
