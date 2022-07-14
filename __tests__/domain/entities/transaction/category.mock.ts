import { faker } from '@faker-js/faker';

import { EnumTransactionType } from '@domain/entities/Transaction';
import { TransactionCategory } from '@domain/entities/TransactionCategory';

export function makeTransactionCategoryMock(): TransactionCategory {
  const date = faker.datatype.datetime();

  return {
    id: faker.datatype.uuid(),
    title: faker.datatype.string(),
    description: faker.datatype.string(),
    type: faker.helpers.arrayElement<EnumTransactionType>([
      'INCOME',
      'OUTCOME',
    ]),
    slug: faker.datatype.string(),
    created_at: date,
    updated_at: date,
  };
}
