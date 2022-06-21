import { User } from '@domain/entities/User';

interface ICreateOrUpdateUserWithGoogle {
  createOrUpdateWithGoogle(
    data: ICreateOrUpdateUserWithGoogle.Input
  ): Promise<ICreateOrUpdateUserWithGoogle.Output>;
}

namespace ICreateOrUpdateUserWithGoogle {
  export type Input = {
    name: string;
    email: string;
    google_account_id: string;
    avatar_url?: string;
  };

  export type Output = User;
}

export { ICreateOrUpdateUserWithGoogle };
