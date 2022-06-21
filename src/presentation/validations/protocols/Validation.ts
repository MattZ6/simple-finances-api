import { ValidationError } from '../errors';

export interface IValidation<I = unknown> {
  validate(input: I): ValidationError | null;
}
