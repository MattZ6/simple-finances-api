import { UserNotFoundByIdError } from '@domain/errors';
import { IGetTransactionsBalanceByUserUseCase } from '@domain/usecases/transaction/GetBalanceByUser';

import { notFound, ok } from '@presentation/helpers';
import {
  IController,
  IHttpRequest,
  IHttpResponse,
} from '@presentation/protocols';

class GetBalanceByUserController implements IController {
  constructor(
    private readonly getTransactionsBalanceByUserUseCase: IGetTransactionsBalanceByUserUseCase
  ) {}

  async handle(
    request: GetBalanceByUserController.Request
  ): Promise<GetBalanceByUserController.Response> {
    try {
      // TODO: Adicionar validação

      const { date } = request.query;
      const { id } = request.user;

      const results = await this.getTransactionsBalanceByUserUseCase.execute({
        user_id: id,
        date,
      });

      return ok(results);
    } catch (error) {
      if (error instanceof UserNotFoundByIdError) {
        return notFound(error);
      }

      throw error;
    }
  }
}

namespace GetBalanceByUserController {
  export type RequestQuery = {
    date: Date;
  };

  export type Request = IHttpRequest<void, void, RequestQuery, void>;

  export type Response = IHttpResponse;
}

export { GetBalanceByUserController };
