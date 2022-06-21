import { RefreshUserAccessTokenController } from '@presentation/controllers/user/RefreshAccessToken';
import {
  ValidationComposite,
  RequiredFieldValidation,
  UuidFieldValidation,
} from '@presentation/validations/validators';

export function makeRefreshUserAccessTokenControllerValidation(): ValidationComposite {
  type Input = RefreshUserAccessTokenController.RequestBody;

  return new ValidationComposite<Input>([
    new RequiredFieldValidation('refresh_token'),
    new UuidFieldValidation('refresh_token'),
  ]);
}
