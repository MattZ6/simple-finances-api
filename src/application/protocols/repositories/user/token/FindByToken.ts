import { User } from '@domain/entities/User';
import { UserToken } from '@domain/entities/UserToken';

interface IFindUserTokenByTokenRepository {
  findByToken(
    data: IFindUserTokenByTokenRepository.Input
  ): Promise<IFindUserTokenByTokenRepository.Output>;
}

namespace IFindUserTokenByTokenRepository {
  export type Input = Pick<UserToken, 'token'> & {
    include?: {
      user?: boolean;
    };
  };

  type TokenWithUser = UserToken & {
    user?: User;
  };

  export type Output = TokenWithUser | null;
}

export { IFindUserTokenByTokenRepository };
