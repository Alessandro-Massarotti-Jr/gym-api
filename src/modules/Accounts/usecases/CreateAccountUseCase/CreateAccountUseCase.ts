import { hash } from "bcrypt";
import { ApiError } from "../../../../errors/ApiError";
import { inject, injectable } from "tsyringe";
import { IAccountsRepository, ICreateAccountDTO } from "../../../../database/repositories/IAccountsRepository";


@injectable()
class CreateAccountUseCase {

    constructor(
        @inject("AccountsRepository") private accountsRepository: IAccountsRepository,

    ) { };

    async execute({ email, password, name }: ICreateAccountDTO): Promise<void> {

        const accountAlreadyExists = await this.accountsRepository.findByEmail(email);

        if (accountAlreadyExists) {
            throw new ApiError("Email ja cadastrado", 400);
        }


        const passwordHash = await hash(password, 8);

        const account = await this.accountsRepository.create({ email, password: passwordHash, name });


        return;
    }

}

export { CreateAccountUseCase }