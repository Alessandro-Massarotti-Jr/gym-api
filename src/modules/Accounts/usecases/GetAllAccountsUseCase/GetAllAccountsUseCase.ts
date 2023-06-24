
import { inject, injectable } from "tsyringe";
import { IAccountsRepository } from "../../../../repositories/IAccountsRepository";

@injectable()
export class GetAllAccountsUseCase {

    constructor(@inject("AccountsRepository") private accountsRepository: IAccountsRepository) { }

    async execute() {

        const accounts = await this.accountsRepository.get();

        return accounts;
    }

}