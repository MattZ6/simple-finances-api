import { faker } from '@faker-js/faker';

import {
  IRetrieveCacheProvider,
  IStoreCacheProvider,
} from '@application/protocols/providers/cache';

export class RetrieveCacheProviderSpy implements IRetrieveCacheProvider {
  async retrieve<O = unknown>(_: IRetrieveCacheProvider.Input): Promise<O> {
    return faker.datatype.string() as unknown as O;
  }
}

export class StoreCacheProviderSpy implements IStoreCacheProvider {
  async store(_: IStoreCacheProvider.Input): Promise<void> {
    // 👌
  }
}
