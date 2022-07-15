import { DomainError } from '../Domain';

export class TransactionNotFoundByIdFromUserError extends DomainError {
  constructor(
    message = 'Transaction not found with provided id',
    code = 'transaction.not.exists'
  ) {
    super(message, code);
  }
}
