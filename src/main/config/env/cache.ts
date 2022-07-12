export const cacheConfig = {
  /** Redis Cache */

  HOST: process.env.CACHE_HOST,
  PORT: Number(process.env.CACHE_PORT),
  PASSWORD: process.env.CACHE_PASSWORD,

  TRANSACTION_CATEGORY_CACHE: {
    KEY: 'categories',
    EXPIRATION_IN_SECONDS: 1 * 24 * 60 * 60, // 👈 1 day
  },
};
