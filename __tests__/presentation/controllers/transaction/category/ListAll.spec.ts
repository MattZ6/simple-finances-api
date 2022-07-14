import { ListAllTransactionCategoriesController } from '@presentation/controllers/transaction/category/ListAll';
import { TransactionCategoryMapper } from '@presentation/dtos';
import { badRequest, ok } from '@presentation/helpers';

import { makeErrorMock } from '../../../../domain';
import {
  ListAllTransactionCategoriesUseCaseSpy,
  makeListAllTransactionCategoriesControllerRequestMock,
  makeListAllTransactionCategoriesUseCaseMock,
  makeValidationErrorMock,
  ValidationSpy,
} from '../../../mocks';

let validationSpy: ValidationSpy;
let listAllTransactionCategoriesUseCaseSpy: ListAllTransactionCategoriesUseCaseSpy;

let listAllTransactionCategoriesController: ListAllTransactionCategoriesController;

describe('ListAllTransactionCategoriesController', () => {
  beforeEach(() => {
    validationSpy = new ValidationSpy();
    listAllTransactionCategoriesUseCaseSpy =
      new ListAllTransactionCategoriesUseCaseSpy();

    listAllTransactionCategoriesController =
      new ListAllTransactionCategoriesController(
        validationSpy,
        listAllTransactionCategoriesUseCaseSpy
      );
  });

  it('should call Validation once with correct values', async () => {
    const validateSpy = jest.spyOn(validationSpy, 'validate');

    const request = makeListAllTransactionCategoriesControllerRequestMock();

    await listAllTransactionCategoriesController.handle(request);

    expect(validateSpy).toHaveBeenCalledTimes(1);
    expect(validateSpy).toHaveBeenCalledWith(request.query);
  });

  it('should throw if Validation throws', async () => {
    const errorMock = makeErrorMock();

    jest.spyOn(validationSpy, 'validate').mockImplementationOnce(() => {
      throw errorMock;
    });

    const request = makeListAllTransactionCategoriesControllerRequestMock();

    const promise = listAllTransactionCategoriesController.handle(request);

    await expect(promise).rejects.toThrowError(errorMock);
  });

  it('should return bad request (400) if Validation throws ValidationError', async () => {
    const error = makeValidationErrorMock();

    jest.spyOn(validationSpy, 'validate').mockReturnValueOnce(error);

    const request = makeListAllTransactionCategoriesControllerRequestMock();

    const response = await listAllTransactionCategoriesController.handle(
      request
    );

    expect(response).toEqual(badRequest(error));
  });

  it('should call ListAllTransactionCategoriesUseCase once with correct values', async () => {
    const executeSpy = jest.spyOn(
      listAllTransactionCategoriesUseCaseSpy,
      'execute'
    );

    const request = makeListAllTransactionCategoriesControllerRequestMock();

    await listAllTransactionCategoriesController.handle(request);

    expect(executeSpy).toHaveBeenCalledTimes(1);
    expect(executeSpy).toHaveBeenCalledWith({
      type: request.query.type,
    });
  });

  it('should throw if ListAllTransactionCategoriesUseCase throws', async () => {
    const errorMock = makeErrorMock();

    jest
      .spyOn(listAllTransactionCategoriesUseCaseSpy, 'execute')
      .mockRejectedValueOnce(errorMock);

    const request = makeListAllTransactionCategoriesControllerRequestMock();

    const promise = listAllTransactionCategoriesController.handle(request);

    await expect(promise).rejects.toThrowError(errorMock);
  });

  it('should return ok (200) on success', async () => {
    const outputMock = makeListAllTransactionCategoriesUseCaseMock();

    jest
      .spyOn(listAllTransactionCategoriesUseCaseSpy, 'execute')
      .mockResolvedValueOnce(outputMock);

    const request = makeListAllTransactionCategoriesControllerRequestMock();

    const response = await listAllTransactionCategoriesController.handle(
      request
    );

    expect(response).toEqual(
      ok(TransactionCategoryMapper.toListItemsDTO(outputMock))
    );
  });
});
