import Redis from 'ioredis';

import {
  IRetrieveCacheProvider,
  IStoreCacheProvider,
} from '@application/protocols/providers/cache';

export class RedisCacheProvider
  implements IStoreCacheProvider, IRetrieveCacheProvider
{
  private readonly client: Redis;

  constructor(
    private readonly host: string,
    private readonly port: number,
    private readonly password?: string
  ) {
    this.client = new Redis({
      host: this.host,
      port: this.port,
      password: this.password,
    });
  }

  async store(data: IStoreCacheProvider.Input): Promise<void> {
    const { key, expirationTimeInSeconds, payload } = data;

    await this.client.setex(
      key,
      expirationTimeInSeconds,
      JSON.stringify(payload)
    );
  }

  async retrieve<O = unknown>(data: IRetrieveCacheProvider.Input): Promise<O> {
    const { key } = data;

    const value = await this.client.get(key);

    if (!value) {
      return null;
    }

    return JSON.parse(value) as O;
  }
}
