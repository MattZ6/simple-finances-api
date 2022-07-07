import {
  ICheckIfUserExistsByIdRepository,
  ICreateOrUpdateUserWithGoogle,
} from '@application/protocols/repositories/user';

import { prisma } from '..';

export class PrismaUsersRepository
  implements ICreateOrUpdateUserWithGoogle, ICheckIfUserExistsByIdRepository
{
  async checkIfExistsById(
    data: ICheckIfUserExistsByIdRepository.Input
  ): Promise<ICheckIfUserExistsByIdRepository.Output> {
    const { id } = data;

    const count = await prisma.user.count({
      where: {
        id: {
          equals: id,
        },
      },
    });

    return count >= 1;
  }

  async createOrUpdateWithGoogle(
    data: ICreateOrUpdateUserWithGoogle.Input
  ): Promise<ICreateOrUpdateUserWithGoogle.Output> {
    const { name, email, google_account_id, avatar_url } = data;

    const { user } = await prisma.googleProfile.upsert({
      where: { google_account_id },
      create: {
        google_account_id,
        email,
        avatar_url,
        user: {
          create: {
            name,
            avatar_url,
          },
        },
      },
      update: {
        google_account_id,
        email,
        avatar_url,
        user: {
          update: {
            name,
            avatar_url,
          },
        },
      },
      include: { user: true },
    });

    return user;
  }
}
