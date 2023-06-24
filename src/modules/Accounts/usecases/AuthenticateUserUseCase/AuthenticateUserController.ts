import { Request, Response } from "express";
import { AuthenticateAccountUseCase } from "./AuthenticateUserUseCase";
import { container } from "tsyringe";
import { AuthenticateUserValidation } from "./AuthenticateUserValidation";


class AuthenticateUserController {

    async handle(req: Request, res: Response) {

        const { email, password } = AuthenticateUserValidation.validate(req.body);

        const authenticateAccountUseCase = container.resolve(AuthenticateAccountUseCase);

        const token = await authenticateAccountUseCase.execute({ password, email });

        return res.returnApi({ data: token, developerMessage: "authorized", message: "Authenticado com sucesso", statusHTTP: 200 });

    }

}

export { AuthenticateUserController }