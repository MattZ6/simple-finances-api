import { IListAllTransactionCategoriesUseCase } from '@domain/usecases/transaction/category/ListAll';

import {
  IRetrieveCacheProvider,
  IStoreCacheProvider,
} from '@application/protocols/providers/cache';
import { IFindAllTransactionCategoriesRepository } from '@application/protocols/repositories/transaction';

export class ListAllTransactionCategoriesUseCase
  implements IListAllTransactionCategoriesUseCase
{
  constructor(
    private readonly categoriesCacheKey: string,
    private readonly categoriesCacheExpirationTimeInSeconds: number,
    private readonly retrieveCacheProvider: IRetrieveCacheProvider,
    private readonly storeCacheProvider: IStoreCacheProvider,
    private readonly findAllTransactionCategoriesRepository: IFindAllTransactionCategoriesRepository
  ) {}

  async execute(): Promise<IListAllTransactionCategoriesUseCase.Output> {
    let transactions =
      await this.retrieveCacheProvider.retrieve<IListAllTransactionCategoriesUseCase.Output>(
        { key: this.categoriesCacheKey }
      );

    if (!transactions) {
      transactions = await this.findAllTransactionCategoriesRepository.findAll({
        sort_by: 'title',
        order_by: 'asc',
      });

      await this.storeCacheProvider.store({
        key: this.categoriesCacheKey,
        expirationTimeInSeconds: this.categoriesCacheExpirationTimeInSeconds,
        payload: transactions,
      });
    }

    return transactions;
  }
}
