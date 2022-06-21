import { CryptoUuidProvider } from '@infra/providers/uuid/Crypto';

export function makeUuidProvider() {
  return new CryptoUuidProvider();
}
