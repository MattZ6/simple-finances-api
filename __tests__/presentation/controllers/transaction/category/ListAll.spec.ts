import { ListAllTransactionCategoriesController } from '@presentation/controllers/transaction/category/ListAll';
import { TransactionCategoryMapper } from '@presentation/dtos';
import { ok } from '@presentation/helpers';

import { makeErrorMock } from '../../../../domain';
import {
  ListAllTransactionCategoriesUseCaseSpy,
  makeListAllTransactionCategoriesUseCaseMock,
} from '../../../mocks';

let listAllTransactionCategoriesUseCaseSpy: ListAllTransactionCategoriesUseCaseSpy;

let listAllTransactionCategoriesController: ListAllTransactionCategoriesController;

describe('ListAllTransactionCategoriesController', () => {
  beforeEach(() => {
    listAllTransactionCategoriesUseCaseSpy =
      new ListAllTransactionCategoriesUseCaseSpy();

    listAllTransactionCategoriesController =
      new ListAllTransactionCategoriesController(
        listAllTransactionCategoriesUseCaseSpy
      );
  });

  it('should call ListAllTransactionCategoriesUseCase once', async () => {
    const executeSpy = jest.spyOn(
      listAllTransactionCategoriesUseCaseSpy,
      'execute'
    );

    await listAllTransactionCategoriesController.handle();

    expect(executeSpy).toHaveBeenCalledTimes(1);
  });

  it('should throw if ListAllTransactionCategoriesUseCase throws', async () => {
    const errorMock = makeErrorMock();

    jest
      .spyOn(listAllTransactionCategoriesUseCaseSpy, 'execute')
      .mockRejectedValueOnce(errorMock);

    const promise = listAllTransactionCategoriesController.handle();

    await expect(promise).rejects.toThrowError(errorMock);
  });

  it('should return ok (200) on success', async () => {
    const outputMock = makeListAllTransactionCategoriesUseCaseMock();

    jest
      .spyOn(listAllTransactionCategoriesUseCaseSpy, 'execute')
      .mockResolvedValueOnce(outputMock);

    const response = await listAllTransactionCategoriesController.handle();

    expect(response).toEqual(
      ok(TransactionCategoryMapper.toListItemsDTO(outputMock))
    );
  });
});
