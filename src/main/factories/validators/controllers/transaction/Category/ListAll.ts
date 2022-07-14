import { EnumTransactionType } from '@domain/entities/Transaction';

import { ListAllTransactionCategoriesController } from '@presentation/controllers/transaction/category/ListAll';
import {
  OneOfValuesFieldValidation,
  RequiredFieldValidation,
  ValidationComposite,
} from '@presentation/validations/validators';

export function makeListAllTransactionCategoriesControllerValidation(): ValidationComposite {
  type Input = ListAllTransactionCategoriesController.RequestQuery;

  return new ValidationComposite<Input>([
    new RequiredFieldValidation('type'),
    new OneOfValuesFieldValidation<Input, EnumTransactionType>('type', [
      'INCOME',
      'OUTCOME',
    ]),
  ]);
}
