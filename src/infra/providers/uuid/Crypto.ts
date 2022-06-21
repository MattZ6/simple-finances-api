import { randomUUID } from 'node:crypto';

import { IGenerateUuidProvider } from '@application/protocols/providers/uuid';

export class CryptoUuidProvider implements IGenerateUuidProvider {
  async generate(): Promise<IGenerateUuidProvider.Output> {
    return randomUUID();
  }
}
