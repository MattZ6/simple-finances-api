import { ListAllMonthsByUserController } from '@presentation/controllers/transaction/ListAllMonthsByUser';
import {
  RequiredFieldValidation,
  ValidationComposite,
} from '@presentation/validations/validators';

export function makeListAllMonthsByUserControllerValidation(): ValidationComposite {
  type Input = ListAllMonthsByUserController.RequestQuery;

  return new ValidationComposite<Input>([
    new RequiredFieldValidation('user_id'),
  ]);
}
