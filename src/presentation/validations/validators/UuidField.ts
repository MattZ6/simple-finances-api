import { InvalidUuidFieldError } from '../errors';
import { IValidation } from '../protocols';

export class UuidFieldValidation<I = unknown> implements IValidation<I> {
  private readonly uuidRegExp =
    /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

  constructor(private readonly fieldName: keyof I) {}

  validate(input: I) {
    if (input[this.fieldName] === undefined || input[this.fieldName] === null) {
      return null;
    }

    const uuid = String(input[this.fieldName]).trim();

    const isValidUuid = this.uuidRegExp.test(uuid);

    if (!isValidUuid) {
      return new InvalidUuidFieldError(String(this.fieldName));
    }

    return null;
  }
}
