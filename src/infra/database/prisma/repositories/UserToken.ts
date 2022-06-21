import { ICreateUserTokenRepository } from '@application/protocols/repositories/user';

import { prisma } from '..';

export class PrismaUserTokensRepository implements ICreateUserTokenRepository {
  async create(
    data: ICreateUserTokenRepository.Input
  ): Promise<ICreateUserTokenRepository.Output> {
    const { user_id, expires_in, token } = data;

    const userToken = await prisma.userToken.create({
      data: {
        user_id,
        expires_in,
        token,
      },
    });

    return userToken;
  }
}
