import { faker } from '@faker-js/faker';

import { ListAllTransactionCategoriesController } from '@presentation/controllers/transaction/category/ListAll';

export function makeListAllTransactionCategoriesControllerRequestMock(): ListAllTransactionCategoriesController.Request {
  return {
    original_url: faker.internet.url(),
    method: faker.internet.httpMethod(),
    query: {
      type: faker.helpers.arrayElement(['INCOME', 'OUTCOME']),
    },
    body: undefined,
    headers: undefined,
    params: undefined,
    user: {
      id: faker.datatype.uuid(),
    },
  };
}
