import { EnumTransactionType } from '@domain/entities/Transaction';

import { CreateTransactionController } from '@presentation/controllers/transaction/Create';
import {
  MinLengthFieldValidation,
  OneOfValuesFieldValidation,
  RequiredFieldValidation,
  ValidationComposite,
} from '@presentation/validations/validators';

export function makeCreateTransactionControllerValidation(): ValidationComposite {
  type Input = CreateTransactionController.RequestBody;

  return new ValidationComposite<Input>([
    new RequiredFieldValidation('title'),
    new MinLengthFieldValidation('title', 3, true),
    new RequiredFieldValidation('value'),
    new RequiredFieldValidation('date'),
    new RequiredFieldValidation('type'),
    new OneOfValuesFieldValidation<Input, EnumTransactionType>('type', [
      'INCOME',
      'OUTCOME',
    ]),
  ]);
}
