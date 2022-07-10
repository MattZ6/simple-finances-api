import { ListAllMonthsByUserController } from '@presentation/controllers/transaction/ListAllMonthsByUser';
import {
  RequiredFieldValidation,
  ValidationComposite,
} from '@presentation/validations/validators';

export function makeListAllMonthsByUserControllerValidation(): ValidationComposite {
  return new ValidationComposite([]);
}
