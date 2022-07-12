import { RedisCacheProvider } from '@infra/providers/cache/Redis';

import { cacheConfig } from '@main/config/env';

let redisCacheProvider: RedisCacheProvider;

export function makeRedisCacheProvider() {
  if (!redisCacheProvider) {
    redisCacheProvider = new RedisCacheProvider(
      cacheConfig.HOST,
      cacheConfig.PORT,
      cacheConfig.PASSWORD
    );
  }

  return redisCacheProvider;
}
