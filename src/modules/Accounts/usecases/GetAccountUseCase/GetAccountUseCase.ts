
import { inject, injectable } from "tsyringe";
import { ApiError } from "../../../../errors/ApiError";
import { IAccountsRepository } from "../../../../repositories/IAccountsRepository";

@injectable()
export class GetAccountUseCase {

    constructor(@inject("AccountsRepository") private accountsRepository: IAccountsRepository) { }

    async execute(account_id: string) {


        const account = await this.accountsRepository.findById(account_id);

        if (!account) {
            throw new ApiError("Conta não encontrada");
        }

        return account;
    }

}