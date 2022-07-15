import { DomainError } from '../Domain';

export class DivergentTransactionTypesError extends DomainError {
  constructor(
    message = 'This category can not be associated to this transaction',
    code = 'transaction.types.not_match'
  ) {
    super(message, code);
  }
}
