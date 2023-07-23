
import { inject, injectable } from "tsyringe";
import { ApiError } from "../../../../errors/ApiError";
import { IAccountsRepository } from "../../../../database/repositories/IAccountsRepository";


@injectable()
export class GetAccountUseCase {

    constructor(@inject("AccountsRepository") private accountsRepository: IAccountsRepository) { }

    async execute(account_id: string) {


        const account = await this.accountsRepository.findById(account_id);

        if (!account) {
            throw new ApiError("Conta não encontrada");
        }


        if (account.profile_image) {
            account.profile_image = `${process.env.APP_URL}${account.profile_image}`
        }


        return account;
    }

}