import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";
import { IAccountsRepository } from "../../../../repositories/IAccountsRepository";
import { ApiError } from "../../../../errors/ApiError";
import "dotenv/config";
import { inject, injectable } from "tsyringe";
interface IRequest {
    email: string;
    password: string;
}

interface IResponse {
    account: {
        email: string;
    };
    token: string;
}

@injectable()
class AuthenticateAccountUseCase {


    constructor(
        @inject("AccountsRepository") private accountsRepository: IAccountsRepository) { }


    async execute({ email, password }: IRequest): Promise<IResponse> {

        const account = await this.accountsRepository.findByEmail(email);

        if (!account) {
            throw new ApiError("Email ou senha estão incorretos");
        }

        const passwordMatch = await compare(password, account.password as string);

        if (!passwordMatch) {
            throw new ApiError("Email ou senha estão incorretos");
        }

        const token = sign({}, process.env.JWT_SECRET as string, {
            subject: account.id,
            expiresIn: "1d",
        });

        await this.accountsRepository.updateLogin(account.id as string);

        delete account.password;

        const tokenReturn: IResponse = {
            token,
            account: account
        }

        return tokenReturn;

    }
}

export { AuthenticateAccountUseCase }