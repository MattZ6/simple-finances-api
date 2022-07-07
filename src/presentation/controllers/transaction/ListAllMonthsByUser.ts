import { UserNotFoundByIdError } from '@domain/errors';
import { IListTransactionMonthsByUserUseCase } from '@domain/usecases/transaction/ListMonthsByUser';

import { notFound, ok } from '@presentation/helpers';
import {
  IController,
  IHttpRequest,
  IHttpResponse,
} from '@presentation/protocols';

class ListAllMonthsByUserController implements IController {
  constructor(
    private readonly listTransactionMonthsByUserUseCase: IListTransactionMonthsByUserUseCase
  ) {}

  async handle(
    request: ListAllMonthsByUserController.Request
  ): Promise<ListAllMonthsByUserController.Response> {
    try {
      const { id } = request.user;

      const results = await this.listTransactionMonthsByUserUseCase.execute({
        user_id: id,
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

namespace ListAllMonthsByUserController {
  export type Request = IHttpRequest<void, void, void, void>;

  export type Response = IHttpResponse;
}

export { ListAllMonthsByUserController };
