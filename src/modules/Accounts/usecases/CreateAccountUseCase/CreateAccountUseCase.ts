import { hash } from "bcrypt";
import { ApiError } from "../../../../errors/ApiError";
import { inject, injectable } from "tsyringe";
import { IAccountsRepository } from "../../../../repositories/IAccountsRepository";


interface ICreateAccountUseCaseData {
    email: string;
    password: string;
    ascending_account_id?: string;
}

@injectable()
class CreateAccountUseCase {

    constructor(
        @inject("AccountsRepository") private accountsRepository: IAccountsRepository,

    ) { };

    async execute({ email, password }: ICreateAccountUseCaseData): Promise<void> {

        const accountAlreadyExists = await this.accountsRepository.findByEmail(email);

        if (accountAlreadyExists) {
            throw new ApiError("Email ja cadastrado", 400);
        }


        const passwordHash = await hash(password, 8);

        const account = await this.accountsRepository.create({ email, password: passwordHash });


        return;
    }

}

export { CreateAccountUseCase }