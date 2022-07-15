import { UpdateCategoryFromTransactionController } from '@presentation/controllers/transaction/UpdateCategory';
import {
  RequiredFieldValidation,
  UuidFieldValidation,
  ValidationComposite,
} from '@presentation/validations/validators';

export function makeUpdateCategoryFromTransactionControllerValidation(): ValidationComposite {
  type Input = UpdateCategoryFromTransactionController.RequestBody &
    UpdateCategoryFromTransactionController.RequestParams;

  return new ValidationComposite<Input>([
    new RequiredFieldValidation('transaction_id'),
    new UuidFieldValidation('transaction_id'),
    new RequiredFieldValidation('category_id'),
    new UuidFieldValidation('category_id'),
  ]);
}
