import { inject, injectable } from "tsyringe";
import {
  IAccountsRepository,
  IUpdatePasswordDTO,
} from "../../../../repositories/IAccountsRepository";
import { ApiError } from "../../../../errors/ApiError";
import { compare, hash } from "bcrypt";


interface IRequest extends IUpdatePasswordDTO {
  old_password: string
}

@injectable()
export class UpdatePasswordAccountUseCase {
  constructor(
    @inject("AccountsRepository")
    private accountsRepository: IAccountsRepository
  ) { }

  async execute({
    account_id,
    new_password,
    old_password,
  }: IRequest) {
    const account = await this.accountsRepository.findById(account_id);

    if (!account) {
      throw new ApiError("Conta não encontrada.");
    }

    const passwordMatch = await compare(old_password!, account.password!);

    if (!passwordMatch) {
      throw new ApiError("Senha inválida.");
    }

    const verifyIfPasswordIsSame = await compare(new_password, account.password!);

    if (verifyIfPasswordIsSame) {
      throw new ApiError('Você já utilizou essa senha.')
    }

    const password = await hash(new_password, 8);

    await this.accountsRepository.updatePassword({
      account_id,
      new_password: password,
    });

    return;
  }
}
