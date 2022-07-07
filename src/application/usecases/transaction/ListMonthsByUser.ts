import { UserNotFoundByIdError } from '@domain/errors';
import { IListTransactionMonthsByUserUseCase } from '@domain/usecases/transaction/ListMonthsByUser';

import { IFindAllMonthsByUserRepository } from '@application/protocols/repositories/transaction';
import { ICheckIfUserExistsByIdRepository } from '@application/protocols/repositories/user';

export class ListTransactionMonthsByUserUseCase
  implements IListTransactionMonthsByUserUseCase
{
  constructor(
    private readonly checkIfUserExistsByIdRepository: ICheckIfUserExistsByIdRepository,
    private readonly findAllMonthsByUserRepository: IFindAllMonthsByUserRepository
  ) {}

  async execute(
    data: IListTransactionMonthsByUserUseCase.Input
  ): Promise<IListTransactionMonthsByUserUseCase.Output> {
    const { user_id } = data;

    const userExists =
      await this.checkIfUserExistsByIdRepository.checkIfExistsById({
        id: user_id,
      });

    if (!userExists) {
      throw new UserNotFoundByIdError();
    }

    const dates = await this.findAllMonthsByUserRepository.findAllMonthsByUser({
      user_id,
    });

    const flatMonths = dates.map(({ date }) => ({ date: new Date(date) }));

    return flatMonths;
  }
}
