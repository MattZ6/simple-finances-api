import { UserNotFoundByIdError } from '@domain/errors';
import { ICreateTransactionUseCase } from '@domain/usecases/transaction/Create';

import { ICreateTransactionRepository } from '@application/protocols/repositories/transaction';
import { ICheckIfUserExistsByIdRepository } from '@application/protocols/repositories/user';

export class CreateTransactionUseCase implements ICreateTransactionUseCase {
  constructor(
    private readonly checkIfUserExistsByIdRepository: ICheckIfUserExistsByIdRepository,
    private readonly createTransactionRepository: ICreateTransactionRepository
  ) {}

  async execute(
    data: ICreateTransactionUseCase.Input
  ): Promise<ICreateTransactionUseCase.Output> {
    const { user_id, title, value, date, type } = data;

    const userExists =
      await this.checkIfUserExistsByIdRepository.checkIfExistsById({
        id: user_id,
      });

    if (!userExists) {
      throw new UserNotFoundByIdError();
    }

    const transaction = await this.createTransactionRepository.create({
      user_id,
      title,
      value,
      date,
      type,
    });

    return transaction;
  }
}
