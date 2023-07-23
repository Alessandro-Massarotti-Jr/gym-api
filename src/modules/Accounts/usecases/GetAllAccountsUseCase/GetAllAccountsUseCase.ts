
import { inject, injectable } from "tsyringe";
import { IAccountsRepository } from "../../../../database/repositories/IAccountsRepository";


@injectable()
export class GetAllAccountsUseCase {

    constructor(@inject("AccountsRepository") private accountsRepository: IAccountsRepository) { }

    async execute() {

        const accounts = await this.accountsRepository.get();

        accounts.map((account) => {

            if (account.profile_image) {
                account.profile_image = `${process.env.APP_URL}${account.profile_image}`
            }

            return account
        });

        return accounts;
    }

}