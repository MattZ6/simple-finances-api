import { EnumTransactionType } from '@domain/entities/Transaction';

import { ListAllTransactionCategoriesUseCase } from '@application/usecases/transaction/category/ListAll';

import { makeErrorMock } from '../../../../domain';
import {
  FindAllTransactionCategoriesRepositorySpy,
  makeFindAllTransactionCategoriesRepositoryOutputMock,
  makeListAllTransactionCategoriesUseCaseCacheExpirationInSecondsMock,
  makeListAllTransactionCategoriesUseCaseCacheKeyMock,
  makeListAllTransactionCategoriesUseCaseInputMock,
  RetrieveCacheProviderSpy,
  StoreCacheProviderSpy,
} from '../../../mocks';

let listAllTransactionCategoriesUseCaseCacheKeyMock: string;
let listAllTransactionCategoriesUseCaseCacheExpirationInSecondsMock: number;
let retrieveCacheProviderSpy: RetrieveCacheProviderSpy;
let storeCacheProviderSpy: StoreCacheProviderSpy;
let findAllTransactionCategoriesRepositorySpy: FindAllTransactionCategoriesRepositorySpy;

let listAllTransactionCategoriesUseCase: ListAllTransactionCategoriesUseCase;

function makeCacheKey(baseKey: string, type: EnumTransactionType) {
  return `${baseKey}:${type}`;
}

describe('ListAllTransactionCategoriesUseCase', () => {
  beforeEach(() => {
    listAllTransactionCategoriesUseCaseCacheKeyMock =
      makeListAllTransactionCategoriesUseCaseCacheKeyMock();
    listAllTransactionCategoriesUseCaseCacheExpirationInSecondsMock =
      makeListAllTransactionCategoriesUseCaseCacheExpirationInSecondsMock();
    retrieveCacheProviderSpy = new RetrieveCacheProviderSpy();
    storeCacheProviderSpy = new StoreCacheProviderSpy();
    findAllTransactionCategoriesRepositorySpy =
      new FindAllTransactionCategoriesRepositorySpy();

    listAllTransactionCategoriesUseCase =
      new ListAllTransactionCategoriesUseCase(
        listAllTransactionCategoriesUseCaseCacheKeyMock,
        listAllTransactionCategoriesUseCaseCacheExpirationInSecondsMock,
        retrieveCacheProviderSpy,
        storeCacheProviderSpy,
        findAllTransactionCategoriesRepositorySpy
      );
  });

  it('should call RetrieveCacheProvider once with correct values', async () => {
    const retrieveSpy = jest.spyOn(retrieveCacheProviderSpy, 'retrieve');

    const input = makeListAllTransactionCategoriesUseCaseInputMock();

    await listAllTransactionCategoriesUseCase.execute(input);

    expect(retrieveSpy).toHaveBeenCalledTimes(1);
    expect(retrieveSpy).toHaveBeenCalledWith({
      key: makeCacheKey(
        listAllTransactionCategoriesUseCaseCacheKeyMock,
        input.type
      ),
    });
  });

  it('should throw if RetrieveCacheProvider throws', async () => {
    const errorMock = makeErrorMock();

    jest
      .spyOn(retrieveCacheProviderSpy, 'retrieve')
      .mockRejectedValueOnce(errorMock);

    const input = makeListAllTransactionCategoriesUseCaseInputMock();

    const promise = listAllTransactionCategoriesUseCase.execute(input);

    await expect(promise).rejects.toThrowError(errorMock);
  });

  it('should return RetrieveCacheProvider output if it returns a value', async () => {
    const retrieveCacheProviderOutputMock = [];

    jest
      .spyOn(retrieveCacheProviderSpy, 'retrieve')
      .mockResolvedValueOnce(retrieveCacheProviderOutputMock as any);

    const input = makeListAllTransactionCategoriesUseCaseInputMock();

    const output = await listAllTransactionCategoriesUseCase.execute(input);

    expect(output).toEqual(retrieveCacheProviderOutputMock);
  });

  it('should not call FindAllTransactionCategoriesRepository if RetrieveCacheProvider returns a value', async () => {
    const findAllSpy = jest.spyOn(
      findAllTransactionCategoriesRepositorySpy,
      'findAll'
    );

    const input = makeListAllTransactionCategoriesUseCaseInputMock();

    await listAllTransactionCategoriesUseCase.execute(input);

    expect(findAllSpy).not.toHaveBeenCalled();
  });

  it('should call FindAllTransactionCategoriesRepository with correct values only if RetrieveCacheProvider returns null', async () => {
    jest
      .spyOn(retrieveCacheProviderSpy, 'retrieve')
      .mockResolvedValueOnce(null);

    const findAllSpy = jest.spyOn(
      findAllTransactionCategoriesRepositorySpy,
      'findAll'
    );

    const input = makeListAllTransactionCategoriesUseCaseInputMock();

    await listAllTransactionCategoriesUseCase.execute(input);

    expect(findAllSpy).toHaveBeenCalledTimes(1);
    expect(findAllSpy).toHaveBeenCalledWith({
      type: input.type,
      sort_by: 'title',
      order_by: 'asc',
    });
  });

  it('should throw if FindAllTransactionCategoriesRepository throws', async () => {
    jest
      .spyOn(retrieveCacheProviderSpy, 'retrieve')
      .mockResolvedValueOnce(null);

    const errorMock = makeErrorMock();

    jest
      .spyOn(findAllTransactionCategoriesRepositorySpy, 'findAll')
      .mockRejectedValueOnce(errorMock);

    const input = makeListAllTransactionCategoriesUseCaseInputMock();

    const promise = listAllTransactionCategoriesUseCase.execute(input);

    await expect(promise).rejects.toThrowError(errorMock);
  });

  it('should return FindAllTransactionCategoriesRepository output if RetrieveCacheProvider returns null', async () => {
    jest
      .spyOn(retrieveCacheProviderSpy, 'retrieve')
      .mockResolvedValueOnce(null);

    const findAllTransactionCategoriesRepositoryOutputMock =
      makeFindAllTransactionCategoriesRepositoryOutputMock();

    jest
      .spyOn(findAllTransactionCategoriesRepositorySpy, 'findAll')
      .mockResolvedValueOnce(findAllTransactionCategoriesRepositoryOutputMock);

    const input = makeListAllTransactionCategoriesUseCaseInputMock();

    const output = await listAllTransactionCategoriesUseCase.execute(input);

    expect(output).toEqual(findAllTransactionCategoriesRepositoryOutputMock);
  });

  it('should not call StoreCacheProvider if RetrieveCacheProvider returns a value', async () => {
    const storeSpy = jest.spyOn(storeCacheProviderSpy, 'store');

    const input = makeListAllTransactionCategoriesUseCaseInputMock();

    await listAllTransactionCategoriesUseCase.execute(input);

    expect(storeSpy).not.toHaveBeenCalled();
  });

  it('should call StoreCacheProvider with correct values only if RetrieveCacheProvider returns null', async () => {
    jest
      .spyOn(retrieveCacheProviderSpy, 'retrieve')
      .mockResolvedValueOnce(null);

    const categoriesMock =
      makeFindAllTransactionCategoriesRepositoryOutputMock();

    jest
      .spyOn(findAllTransactionCategoriesRepositorySpy, 'findAll')
      .mockResolvedValueOnce(categoriesMock);

    const storeSpy = jest.spyOn(storeCacheProviderSpy, 'store');

    const input = makeListAllTransactionCategoriesUseCaseInputMock();

    await listAllTransactionCategoriesUseCase.execute(input);

    expect(storeSpy).toHaveBeenCalledTimes(1);
    expect(storeSpy).toHaveBeenCalledWith({
      key: makeCacheKey(
        listAllTransactionCategoriesUseCaseCacheKeyMock,
        input.type
      ),
      expirationTimeInSeconds:
        listAllTransactionCategoriesUseCaseCacheExpirationInSecondsMock,
      payload: categoriesMock,
    });
  });

  it('should throw if StoreCacheProvider throws', async () => {
    jest
      .spyOn(retrieveCacheProviderSpy, 'retrieve')
      .mockResolvedValueOnce(null);

    const errorMock = makeErrorMock();

    jest.spyOn(storeCacheProviderSpy, 'store').mockRejectedValueOnce(errorMock);

    const input = makeListAllTransactionCategoriesUseCaseInputMock();

    const promise = listAllTransactionCategoriesUseCase.execute(input);

    await expect(promise).rejects.toThrowError(errorMock);
  });
});
