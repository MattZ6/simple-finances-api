import { DomainError } from '../Domain';

export class UserNotFoundByIdError extends DomainError {
  constructor(
    message = 'User not found with provided id',
    code = 'user.not.exists'
  ) {
    super(message, code);
  }
}
