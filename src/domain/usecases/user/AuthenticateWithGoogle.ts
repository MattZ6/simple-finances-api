import { Authentication } from '@domain/entities/Authentication';

interface IAuthenticateUserWithGoogleUseCase {
  execute(
    data: IAuthenticateUserWithGoogleUseCase.Input
  ): Promise<IAuthenticateUserWithGoogleUseCase.Output>;
}

namespace IAuthenticateUserWithGoogleUseCase {
  export type Input = {
    code: string;
  };

  export type Output = Authentication;
}

export { IAuthenticateUserWithGoogleUseCase };
