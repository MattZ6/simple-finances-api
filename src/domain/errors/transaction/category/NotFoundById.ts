import { DomainError } from '@domain/errors/Domain';

export class TransactionCategoryNotFoundByIdError extends DomainError {
  constructor(
    message = 'Transaction category not found with provided id',
    code = 'transaction_category.not.exists'
  ) {
    super(message, code);
  }
}
