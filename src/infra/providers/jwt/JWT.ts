import { sign } from 'jsonwebtoken';

import { IGenerateJWTProvider } from '@application/protocols/providers/jwt';

export class JWTProvider implements IGenerateJWTProvider {
  constructor(
    private readonly secret: string,
    private readonly expiresInSeconds: number
  ) {}

  async encrypt(
    data: IGenerateJWTProvider.Input<any>
  ): Promise<IGenerateJWTProvider.Output> {
    const { subject, payload } = data;

    return sign(payload ?? {}, this.secret, {
      subject,
      expiresIn: this.expiresInSeconds,
    });
  }
}
