import { IValidation } from '@presentation/validations/protocols';

export * from './errors';

export class ValidationSpy implements IValidation<any> {
  validate(_: any) {
    return null;
  }
}
