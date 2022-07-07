import {
  JsonWebTokenError,
  JwtPayload,
  TokenExpiredError as JWTTokenExpiredError,
  sign,
  verify,
} from 'jsonwebtoken';

import {
  IGenerateJWTProvider,
  IVerifyJWTProvider,
} from '@application/protocols/providers/jwt';

import {
  AccessTokenExpiredError,
  InvalidAccessTokenError,
} from '@presentation/errors/token';

export class JWTProvider implements IGenerateJWTProvider, IVerifyJWTProvider {
  constructor(
    private readonly secret: string,
    private readonly expiresInSeconds: number
  ) {}

  async generate(
    data: IGenerateJWTProvider.Input<any>
  ): Promise<IGenerateJWTProvider.Output> {
    const { subject, payload } = data;

    return sign(payload ?? {}, this.secret, {
      subject,
      expiresIn: this.expiresInSeconds,
    });
  }

  async verify<T = unknown>(
    data: IVerifyJWTProvider.Input
  ): Promise<IVerifyJWTProvider.Output<T>> {
    const { value } = data;

    try {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { sub, aud, exp, iat, iss, jti, nbf, ...rest } = verify(
        value,
        this.secret
      ) as JwtPayload;

      return { subject: sub, payload: rest as T };
    } catch (error) {
      if (error instanceof JWTTokenExpiredError) {
        throw new AccessTokenExpiredError();
      }

      if (error instanceof JsonWebTokenError) {
        throw new InvalidAccessTokenError();
      }

      throw error;
    }
  }
}
