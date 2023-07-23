import { Request, Response } from "express";
import { CreateAccountUseCase } from "./CreateAccountUseCase";
import { CreateAccountValidation } from "./CreateAccountValidation";
import { container } from "tsyringe";

export class CreateAccountController {

    async handle(req: Request, res: Response) {

        const { email, password, name } = CreateAccountValidation.validate(req.body);

        const createAccountUseCase = container.resolve(CreateAccountUseCase);

        await createAccountUseCase.execute({ email, password, name });

        return res.returnApi({ data: null, message: "Conta criada com sucesso", developerMessage: "account created", statusHTTP: 201 });
    }
}