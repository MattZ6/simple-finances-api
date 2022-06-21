import { AuthenticateUserWithGoogleController } from '@presentation/controllers/user/AuthenticateWithGoogle';
import {
  RequiredFieldValidation,
  ValidationComposite,
} from '@presentation/validations/validators';

export function makeAuthenticateUserWithGoogleControllerValidation(): ValidationComposite {
  type Input = AuthenticateUserWithGoogleController.RequestBody;

  return new ValidationComposite<Input>([new RequiredFieldValidation('code')]);
}
